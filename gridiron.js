(() => {
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const huddle = document.getElementById("huddle");
  const whistle = document.getElementById("whistle");
  const end = document.getElementById("end");
  const hint = document.getElementById("hint");
  const offensePlays = document.getElementById("offensePlays");
  const defensePlays = document.getElementById("defensePlays");

  const FIELD_YARDS = 100;
  const ENDZONE = 10;
  const TOTAL = FIELD_YARDS + ENDZONE * 2;

  let W = 420, H = 740, dpr = 1, yardPx = 6;
  const keys = Object.create(null);
  const pointer = { active: false, x: 0, y: 0 };

  const state = {
    mode: "menu", you: 0, cpu: 0, qtr: 1, clock: 120,
    possession: "you", ballYd: 25, down: 1, toGo: 10,
    play: null, defense: null, entities: [], ball: null,
    carrier: null, user: null, playTime: 0,
    last: performance.now(), flash: "", flashT: 0, hikeLock: 0
  };

  const PLAYS = {
    draw:   { name: "Draw", kind: "run", vx: 0, target: 8, throwAt: 99 },
    sweep:  { name: "Sweep", kind: "run", vx: 1, target: 6, throwAt: 99 },
    slant:  { name: "Slant", kind: "pass", air: 0.9, target: 12, spread: 0.32, throwAt: 1.15 },
    go:     { name: "Go Route", kind: "pass", air: 1.35, target: 24, spread: 0.18, throwAt: 1.45 },
    screen: { name: "Screen", kind: "pass", air: 0.7, target: 5, spread: 0.55, throwAt: 0.95 },
    hail:   { name: "Hail Mary", kind: "pass", air: 1.8, target: 42, spread: 0.16, throwAt: 1.7 }
  };

  const DEFENSES = {
    fortythree: { name: "4-3", rush: 4, lbs: 1, cbs: 1, safeties: 1, rushAgg: 0.85, coverAgg: 0.7 },
    nickel:     { name: "Nickel", rush: 3, lbs: 1, cbs: 2, safeties: 1, rushAgg: 0.7, coverAgg: 1.05 },
    blitz:      { name: "Blitz", rush: 5, lbs: 0, cbs: 1, safeties: 1, rushAgg: 1.2, coverAgg: 0.75 },
    cover2:     { name: "Cover 2", rush: 3, lbs: 1, cbs: 1, safeties: 2, rushAgg: 0.55, coverAgg: 1.1 },
    goalline:   { name: "Goal Line", rush: 5, lbs: 1, cbs: 1, safeties: 0, rushAgg: 1.05, coverAgg: 0.55 },
    spy:        { name: "QB Spy", rush: 3, lbs: 2, cbs: 1, safeties: 1, rushAgg: 0.65, coverAgg: 0.9 }
  };

  function resize() {
    const stage = document.getElementById("stage");
    const r = stage.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(280, Math.floor(r.width));
    H = Math.max(420, Math.floor(r.height));
    yardPx = H / TOTAL;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);

  function yardToY(yd) { return H - (yd / TOTAL) * H; }
  function yToYard(y) { return ((H - y) / H) * TOTAL; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function choice(arr) { return arr[(Math.random() * arr.length) | 0]; }
  function spd(yardsPerSec) { return yardsPerSec * yardPx; }

  function fmtClock(s) {
    s = Math.max(0, Math.ceil(s));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  function downLabel() {
    return ["1st", "2nd", "3rd", "4th"][state.down - 1] + " & " + (state.toGo <= 0 ? "Goal" : state.toGo);
  }
  function spotLabel() {
    const y = state.ballYd;
    if (y <= 0) return "Own EZ";
    if (y >= 100) return "Opp EZ";
    if (y < 50) return "Own " + Math.round(y);
    if (y === 50) return "50";
    return "Opp " + Math.round(100 - y);
  }
  function refreshHud() {
    document.getElementById("score").textContent = state.you + " – " + state.cpu;
    document.getElementById("down").innerHTML = downLabel();
    document.getElementById("spot").textContent = spotLabel();
    document.getElementById("clock").textContent = fmtClock(state.clock);
    document.getElementById("qtr").textContent = String(state.qtr);
  }

  function makePlayer(side, role, x, y, extra) {
    return Object.assign({
      side, role, x, y, vx: 0, vy: 0, r: 10, speed: 22, stick: 0, user: false
    }, extra || {});
  }

  function pickCpuOffense() {
    if (state.down === 4 || state.clock < 25 || state.toGo >= 12) return choice(["go", "hail", "slant"]);
    if (state.toGo <= 3) return choice(["draw", "sweep", "screen"]);
    return choice(Object.keys(PLAYS));
  }
  function pickCpuDefense() {
    if (state.ballYd >= 90 || state.ballYd <= 10) return "goalline";
    if (state.toGo >= 10) return choice(["nickel", "cover2", "spy"]);
    if (state.toGo <= 3) return choice(["fortythree", "goalline", "blitz"]);
    return choice(Object.keys(DEFENSES));
  }

  function setupPlay(offKey, defKey) {
    const play = PLAYS[offKey];
    const defense = DEFENSES[defKey];
    state.play = play;
    state.defense = defense;
    state.playTime = 0;
    state.hikeLock = 0.7;
    state.flash = "HIKE!";
    state.flashT = 0.7;

    const midX = W * 0.5;
    const losY = yardToY(state.ballYd + ENDZONE);
    const towardOpp = state.possession === "you" ? -1 : 1;
    const offense = state.possession;
    const defSide = offense === "you" ? "cpu" : "you";
    const ents = [];

    const qb = makePlayer(offense, "qb", midX, losY + towardOpp * -yardPx * 1.2, { speed: spd(4.4) });
    ents.push(qb);
    const wrSide = play.vx === 1 || (play.spread || 0) > 0.3 ? 1 : -1;
    const wr = makePlayer(offense, "wr", midX + wrSide * 88, losY + towardOpp * -yardPx * 0.4, { speed: spd(5.1) });
    ents.push(wr);
    const rb = makePlayer(offense, "rb", midX - 28, losY + towardOpp * -yardPx * 2.4, { speed: spd(4.8) });
    ents.push(rb);
    const ol = makePlayer(offense, "ol", midX + 22, losY + towardOpp * 1.4 * yardPx, { speed: spd(2.2) });
    ents.push(ol);

    for (let i = 0; i < defense.rush; i++) {
      const t = defense.rush === 1 ? 0 : (i / (defense.rush - 1) - 0.5);
      ents.push(makePlayer(defSide, "dl", midX + t * 170, losY + towardOpp * yardPx * 5.5, {
        speed: spd(3.1 * defense.rushAgg), assign: "rush"
      }));
    }
    for (let i = 0; i < defense.lbs; i++) {
      const t = defense.lbs === 1 ? 0 : (i / (defense.lbs - 1) - 0.5);
      ents.push(makePlayer(defSide, "mlb", midX + t * 70, losY + towardOpp * yardPx * 9, {
        speed: spd(3.6), assign: defKey === "spy" ? "spy" : "box"
      }));
    }
    for (let i = 0; i < defense.cbs; i++) {
      ents.push(makePlayer(defSide, "cb", wr.x + (i ? -40 : 10), losY + towardOpp * yardPx * 8, {
        speed: spd(4.6 * defense.coverAgg), assign: "wr"
      }));
    }
    for (let i = 0; i < defense.safeties; i++) {
      const t = defense.safeties === 1 ? 0 : (i / (defense.safeties - 1) - 0.5);
      const deep = defKey === "cover2" ? 18 : 14;
      ents.push(makePlayer(defSide, "s", midX + t * 110, losY + towardOpp * yardPx * deep, {
        speed: spd(4.1 * defense.coverAgg), assign: "deep"
      }));
    }

    state.entities = ents;
    state.carrier = qb;
    state.ball = { x: qb.x, y: qb.y, inAir: false, t: 0, dur: 0, sx: 0, sy: 0, tx: 0, ty: 0 };
    state.user = offense === "you" ? qb : (ents.find(e => e.side === "you" && e.role === "mlb") || ents.find(e => e.side === "you"));
    if (state.user) state.user.user = true;

    state.mode = "play";
    huddle.classList.add("hidden");
    hint.classList.remove("hidden");
    hint.textContent = offense === "you"
      ? "Steer the ball · Space / tap to throw on pass plays"
      : "You are defense · steer your highlighted player";
  }

  function throwBall(target, air) {
    const b = state.ball;
    if (!state.carrier || b.inAir || state.hikeLock > 0) return;
    b.inAir = true; b.t = 0; b.dur = air;
    b.sx = state.carrier.x; b.sy = state.carrier.y;
    b.tx = target.x; b.ty = target.y;
    state.carrier = null;
    state.flash = "BALL OUT";
    state.flashT = 0.4;
  }

  function catchOrDrop() {
    const wr = state.entities.find(e => e.role === "wr" && e.side === state.possession);
    const cover = state.entities.find(e => e.role === "cb");
    const sep = wr && cover ? Math.hypot(wr.x - cover.x, wr.y - cover.y) : 50;
    const drop = 0.1 + (sep < 16 ? 0.28 : 0) + (state.play.name === "Hail Mary" ? 0.12 : 0);
    if (wr && Math.random() > drop) {
      state.carrier = wr;
      if (state.possession === "you") { state.user = wr; wr.user = true; }
      state.ball.inAir = false;
      state.flash = "CATCH!";
      state.flashT = 0.55;
    } else endPlay("incomplete");
  }

  function fieldSpot() {
    return clamp(yToYard(state.carrier ? state.carrier.y : state.ball.y) - ENDZONE, 0, 100);
  }

  function endPlay(reason) {
    if (state.mode !== "play") return;
    state.clock -= reason === "incomplete" ? rand(5, 8) : rand(7, 13);
    let spot = reason === "incomplete" ? state.ballYd : fieldSpot();
    hint.classList.add("hidden");

    if (reason === "td") {
      if (state.possession === "you") { state.you += 7; announce("TOUCHDOWN!", "You take it in. Kick is good. +7"); }
      else { state.cpu += 7; announce("CPU TOUCHDOWN", "They walk into the end zone."); }
      resetDrive(state.possession === "you" ? "cpu" : "you");
      checkPeriod();
      return;
    }
    if (reason === "safety") {
      if (state.possession === "you") { state.cpu += 2; announce("SAFETY", "Tackled in your end zone. CPU +2"); resetDrive("cpu"); }
      else { state.you += 2; announce("SAFETY", "You drop them in their end zone. +2"); resetDrive("you"); }
      checkPeriod();
      return;
    }

    const gained = Math.round(state.possession === "you" ? (spot - state.ballYd) : (state.ballYd - spot));
    state.ballYd = Math.round(spot);
    state.toGo -= gained;
    if (state.toGo <= 0) {
      state.down = 1;
      state.toGo = Math.min(10, state.possession === "you" ? (100 - state.ballYd) : state.ballYd);
      announce(reason === "incomplete" ? "Incomplete" : gained + " yard gain", "FIRST DOWN at " + spotLabel());
    } else {
      state.down += 1;
      if (state.down > 4) {
        announce("TURNOVER ON DOWNS", "Ball goes the other way at " + spotLabel());
        flipPossession();
      } else {
        const txt = reason === "incomplete" ? "Incomplete pass" : (gained >= 0 ? gained + " yards" : Math.abs(gained) + " yard loss");
        announce(txt, downLabel() + " · " + spotLabel());
      }
    }
    checkPeriod();
  }

  function flipPossession() {
    state.possession = state.possession === "you" ? "cpu" : "you";
    state.down = 1;
    state.toGo = Math.min(10, state.possession === "you" ? (100 - state.ballYd) : state.ballYd);
  }
  function resetDrive(who) {
    state.possession = who;
    state.ballYd = who === "you" ? 25 : 75;
    state.down = 1;
    state.toGo = 10;
  }
  function announce(title, help) {
    state.mode = "whistle";
    document.getElementById("whistleMsg").textContent = title;
    document.getElementById("whistleHelp").textContent = help;
    whistle.classList.remove("hidden");
    refreshHud();
  }
  function checkPeriod() {
    if (state.clock <= 0) {
      if (state.qtr >= 4) finish();
      else { state.qtr += 1; state.clock = 120; state.flash = "Q" + state.qtr; state.flashT = 1; }
    }
  }
  function finish() {
    state.mode = "end";
    whistle.classList.add("hidden");
    huddle.classList.add("hidden");
    hint.classList.add("hidden");
    const tie = state.you === state.cpu;
    document.getElementById("endTitle").textContent = tie ? "TIE GAME" : (state.you > state.cpu ? "YOU WIN" : "CPU WINS");
    document.getElementById("endHelp").textContent = "Final  " + state.you + " – " + state.cpu;
    end.classList.remove("hidden");
  }

  function openHuddle() {
    if (state.clock <= 0 && state.qtr >= 4) { finish(); return; }
    whistle.classList.add("hidden");
    end.classList.add("hidden");
    state.mode = "huddle";
    document.getElementById("huddleTag").textContent = downLabel() + " · " + spotLabel();
    const onOffense = state.possession === "you";
    document.getElementById("huddleMsg").textContent = onOffense ? "Call your play" : "Call your defense";
    document.getElementById("huddleHint").textContent = onOffense
      ? "You have the ball. Pick a run or a pass."
      : "CPU has the ball. Pick a front, then chase.";
    offensePlays.classList.toggle("hidden", !onOffense);
    defensePlays.classList.toggle("hidden", onOffense);
    huddle.classList.remove("hidden");
    refreshHud();
  }

  function seek(e, tx, ty, speed) {
    const dx = tx - e.x, dy = ty - e.y;
    const d = Math.hypot(dx, dy) || 1;
    e.vx = (dx / d) * speed;
    e.vy = (dy / d) * speed;
  }

  function readMove() {
    let ix = 0, iy = 0;
    if (keys.a || keys.arrowleft) ix -= 1;
    if (keys.d || keys.arrowright) ix += 1;
    if (keys.w || keys.arrowup) iy -= 1;
    if (keys.s || keys.arrowdown) iy += 1;
    if (pointer.active && state.user) {
      ix = pointer.x - state.user.x;
      iy = pointer.y - state.user.y;
    }
    return { ix, iy, m: Math.hypot(ix, iy) };
  }

  function updatePlay(dt) {
    state.playTime += dt;
    state.clock -= dt * 0.22;
    if (state.clock < 0) state.clock = 0;
    if (state.hikeLock > 0) state.hikeLock -= dt;

    const play = state.play;
    const wr = state.entities.find(e => e.role === "wr" && e.side === state.possession);
    const qb = state.entities.find(e => e.role === "qb" && e.side === state.possession);
    const rb = state.entities.find(e => e.role === "rb" && e.side === state.possession);
    const towardOpp = state.possession === "you" ? -1 : 1;
    const locked = state.hikeLock > 0;

    if (wr && !locked) {
      const ty = yardToY(clamp(
        state.ballYd + ENDZONE + (state.possession === "you" ? (play.target || 8) : -(play.target || 8)),
        2, TOTAL - 2
      ));
      const tx = W * (0.5 + (play.spread || 0.12) * (wr.x > W / 2 ? 1 : -1));
      seek(wr, tx, ty, wr.speed * 0.92);
    }
    if (rb && !locked && play.kind === "run") {
      const tx = play.vx === 1 ? W * 0.82 : W * 0.5;
      const ty = qb ? qb.y + towardOpp * yardPx * 4 : wr.y;
      seek(rb, tx, ty, rb.speed * 0.7);
    }

    for (const e of state.entities) {
      if (e.user) continue;
      if (e.side === state.possession) {
        if (e.role === "ol") {
          const rusher = state.entities.find(d => d.assign === "rush");
          if (rusher && !locked) seek(e, rusher.x, rusher.y, e.speed);
        }
        continue;
      }
      if (locked) { e.vx *= 0.4; e.vy *= 0.4; continue; }
      const ballTarget = state.ball.inAir ? { x: state.ball.tx, y: state.ball.ty } : (state.carrier || state.ball);
      if (e.assign === "rush") {
        const tgt = state.carrier && state.carrier.role === "qb" ? state.carrier : ballTarget;
        seek(e, tgt.x, tgt.y, e.speed);
      } else if (e.assign === "wr" && wr) {
        seek(e, wr.x, wr.y + towardOpp * yardPx * 1.5, e.speed);
      } else if (e.assign === "deep") {
        const holdY = yardToY(clamp(state.ballYd + ENDZONE + towardOpp * -16, 8, TOTAL - 8));
        if (state.ball.inAir) seek(e, state.ball.tx, state.ball.ty, e.speed);
        else seek(e, ballTarget.x * 0.4 + W * 0.3, holdY, e.speed * 0.75);
      } else if (e.assign === "spy" && qb) {
        seek(e, qb.x, qb.y + towardOpp * yardPx * 3, e.speed * 0.85);
      } else {
        seek(e, ballTarget.x, ballTarget.y, e.speed * 0.72);
      }
    }

    if (state.user) {
      const move = readMove();
      if (move.m > 2) {
        const boost = state.user.side === "you" && state.carrier === state.user ? 1.08 : 1;
        state.user.vx = (move.ix / move.m) * state.user.speed * boost;
        state.user.vy = (move.iy / move.m) * state.user.speed * boost;
      } else {
        state.user.vx *= 0.82;
        state.user.vy *= 0.82;
      }
    }

    if (state.carrier && state.carrier.side === "cpu" && !state.carrier.user) {
      const goalY = state.possession === "cpu" ? H - 20 : 20;
      seek(state.carrier, W * 0.5 + Math.sin(state.playTime * 1.3) * 36, goalY, state.carrier.speed * 0.9);
    }

    if (play.kind === "pass" && !state.ball.inAir && state.carrier && state.carrier.role === "qb" && wr) {
      const wantThrow = keys[" "] || keys.enter || (pointer.active && state.playTime > 0.85);
      if (!locked && (wantThrow || state.playTime > play.throwAt + 0.8)) throwBall(wr, play.air);
    }

    if (play.kind === "run" && state.carrier && state.carrier.role === "qb" && rb && state.playTime > 0.85 && !locked) {
      if (state.possession === "cpu" || keys[" "] || keys.enter) {
        state.carrier = rb;
        if (state.possession === "you") { qb.user = false; rb.user = true; state.user = rb; }
        state.flash = "HANDOFF";
        state.flashT = 0.4;
      }
    }

    for (const e of state.entities) {
      e.x = clamp(e.x + e.vx * dt, 14, W - 14);
      e.y = clamp(e.y + e.vy * dt, 10, H - 10);
    }

    if (state.ball.inAir) {
      state.ball.t += dt;
      const u = clamp(state.ball.t / state.ball.dur, 0, 1);
      const arc = Math.sin(u * Math.PI) * 55;
      state.ball.x = state.ball.sx + (state.ball.tx - state.ball.sx) * u;
      state.ball.y = state.ball.sy + (state.ball.ty - state.ball.sy) * u - arc;
      if (wr) { state.ball.tx = wr.x; state.ball.ty = wr.y; }
      if (u >= 1) catchOrDrop();
    } else if (state.carrier) {
      state.ball.x = state.carrier.x;
      state.ball.y = state.carrier.y;
    }

    if (state.carrier && !state.ball.inAir && state.hikeLock <= 0) {
      for (const e of state.entities) {
        if (e.side === state.carrier.side) continue;
        const d = Math.hypot(e.x - state.carrier.x, e.y - state.carrier.y);
        if (d < 13) {
          e.stick += dt;
          if (e.stick > 0.22) { endPlay("tackle"); return; }
        } else e.stick = 0;
      }
      const yd = fieldSpot();
      if (state.possession === "you" && yd >= 100) { endPlay("td"); return; }
      if (state.possession === "cpu" && yd <= 0) { endPlay("td"); return; }
      if (state.possession === "you" && yd <= 0 && state.ballYd < 8) { endPlay("safety"); return; }
      if (state.possession === "cpu" && yd >= 100 && state.ballYd > 92) { endPlay("safety"); return; }
    }
    if (state.playTime > 14) endPlay("tackle");
  }

  function drawField() {
    ctx.fillStyle = "#0b6a38";
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.035)";
      ctx.fillRect(0, (i / 12) * H, W, H / 12);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.82)";
    ctx.lineWidth = 2;
    for (let yd = 0; yd <= 100; yd += 10) {
      const y = yardToY(yd + ENDZONE);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "600 12px Space Grotesk";
      const label = yd === 0 || yd === 100 ? "G" : String(yd > 50 ? 100 - yd : yd);
      ctx.fillText(label, 8, y - 4);
      ctx.fillText(label, W - 24, y - 4);
    }
    ctx.fillStyle = "rgba(0,240,255,0.16)";
    ctx.fillRect(0, yardToY(ENDZONE), W, H - yardToY(ENDZONE));
    ctx.fillStyle = "rgba(255,61,138,0.16)";
    ctx.fillRect(0, 0, W, yardToY(100 + ENDZONE));
    ctx.textAlign = "center";
    ctx.font = "800 22px Orbitron";
    ctx.fillStyle = "rgba(0,240,255,0.75)";
    ctx.fillText("YOU", W / 2, H - 22);
    ctx.fillStyle = "rgba(255,61,138,0.85)";
    ctx.fillText("CPU", W / 2, 28);
    const los = yardToY(state.ballYd + ENDZONE);
    ctx.strokeStyle = "#ffe566";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(0, los); ctx.lineTo(W, los); ctx.stroke();
    ctx.setLineDash([]);
    const fdYd = state.possession === "you"
      ? clamp(state.ballYd + state.toGo, 0, 100)
      : clamp(state.ballYd - state.toGo, 0, 100);
    const fd = yardToY(fdYd + ENDZONE);
    ctx.strokeStyle = "rgba(0,240,255,0.7)";
    ctx.beginPath(); ctx.moveTo(0, fd); ctx.lineTo(W, fd); ctx.stroke();
  }

  function drawEntity(e) {
    const you = e.side === "you";
    if (e.user) {
      ctx.beginPath();
      ctx.strokeStyle = "#ffe566";
      ctx.lineWidth = 2;
      ctx.arc(e.x, e.y, e.r + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.fillStyle = you ? "#00e7ff" : "#ff3d8a";
    ctx.shadowColor = you ? "#00e7ff" : "#ff3d8a";
    ctx.shadowBlur = 12;
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#041018";
    ctx.font = "800 9px Orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const tag = e.role === "qb" ? "QB" : e.role === "wr" ? "WR" : e.role === "rb" ? "RB" : e.role === "cb" ? "CB" : e.role === "s" ? "S" : e.role === "mlb" ? "LB" : e.role === "ol" ? "OL" : "DL";
    ctx.fillText(tag, e.x, e.y);
  }

  function draw() {
    drawField();
    if (state.mode === "play" || state.mode === "whistle") {
      for (const e of state.entities) drawEntity(e);
      if (state.ball) {
        ctx.beginPath();
        ctx.fillStyle = "#f4d7a1";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.ellipse(state.ball.x, state.ball.y, 5, 3.2, 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (state.flashT > 0) {
        ctx.fillStyle = "rgba(255,229,102," + clamp(state.flashT, 0, 1) + ")";
        ctx.font = "800 28px Orbitron";
        ctx.textAlign = "center";
        ctx.fillText(state.flash, W / 2, H * 0.42);
      }
      if (state.mode === "play" && state.play && state.defense) {
        ctx.fillStyle = "rgba(232,251,255,0.8)";
        ctx.font = "600 11px Space Grotesk";
        ctx.textAlign = "left";
        ctx.fillText(state.play.name + " vs " + state.defense.name, 10, 18);
      }
    }
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - state.last) / 1000);
    state.last = now;
    if (state.mode === "play") updatePlay(dt);
    if (state.flashT > 0) state.flashT -= dt;
    refreshHud();
    draw();
    requestAnimationFrame(loop);
  }

  function resetGame() {
    state.you = 0; state.cpu = 0; state.qtr = 1; state.clock = 120;
    resetDrive("you");
    end.classList.add("hidden");
    document.getElementById("menu").classList.add("hidden");
    openHuddle();
  }

  document.getElementById("startBtn").onclick = resetGame;
  document.getElementById("againBtn").onclick = resetGame;
  document.getElementById("nextBtn").onclick = openHuddle;
  offensePlays.querySelectorAll("[data-play]").forEach(btn => {
    btn.addEventListener("click", () => setupPlay(btn.dataset.play, pickCpuDefense()));
  });
  defensePlays.querySelectorAll("[data-def]").forEach(btn => {
    btn.addEventListener("click", () => setupPlay(pickCpuOffense(), btn.dataset.def));
  });

  window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) e.preventDefault();
  });
  window.addEventListener("keyup", e => { keys[e.key.toLowerCase()] = false; });

  function setPointer(ev, on) {
    const r = canvas.getBoundingClientRect();
    const t = ev.touches ? ev.touches[0] : ev;
    if (!t) { pointer.active = false; return; }
    pointer.active = on;
    pointer.x = ((t.clientX - r.left) / r.width) * W;
    pointer.y = ((t.clientY - r.top) / r.height) * H;
  }
  canvas.addEventListener("pointerdown", e => { canvas.setPointerCapture(e.pointerId); setPointer(e, true); });
  canvas.addEventListener("pointermove", e => { if (pointer.active) setPointer(e, true); });
  canvas.addEventListener("pointerup", () => { pointer.active = false; });
  canvas.addEventListener("pointercancel", () => { pointer.active = false; });

  resize();
  refreshHud();
  requestAnimationFrame(loop);
})();
