(() => {
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const menu = document.getElementById("menu");
  const huddle = document.getElementById("huddle");
  const whistle = document.getElementById("whistle");
  const end = document.getElementById("end");

  const FIELD_YARDS = 100;
  const ENDZONE = 10;
  const TOTAL = FIELD_YARDS + ENDZONE * 2;

  let W = 420, H = 740, dpr = 1;
  const keys = Object.create(null);
  const pointer = { active: false, x: 0, y: 0 };

  const state = {
    mode: "menu", you: 0, cpu: 0, qtr: 1, clock: 120,
    possession: "you", ballYd: 25, down: 1, toGo: 10,
    play: null, entities: [], ball: null, carrier: null,
    playTime: 0, last: performance.now(), flash: "", flashT: 0
  };

  const PLAYS = {
    draw:   { name: "Draw", kind: "run", vx: 0, speed: 118, target: 8, spread: 0.1 },
    sweep:  { name: "Sweep", kind: "run", vx: 1, speed: 132, target: 6, spread: 0.4 },
    slant:  { name: "Slant", kind: "pass", air: 0.28, target: 14, spread: 0.35 },
    go:     { name: "Go Route", kind: "pass", air: 0.42, target: 28, spread: 0.22 },
    screen: { name: "Screen", kind: "pass", air: 0.18, target: 6, spread: 0.55 },
    hail:   { name: "Hail Mary", kind: "pass", air: 0.62, target: 48, spread: 0.18 }
  };

  function resize() {
    const stage = document.getElementById("stage");
    const r = stage.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(280, Math.floor(r.width));
    H = Math.max(420, Math.floor(r.height));
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
    document.getElementById("score").textContent = state.you + " \u2013 " + state.cpu;
    document.getElementById("down").innerHTML = downLabel();
    document.getElementById("spot").textContent = spotLabel();
    document.getElementById("clock").textContent = fmtClock(state.clock);
    document.getElementById("qtr").textContent = String(state.qtr);
  }

  function makePlayer(side, role, x, y) {
    return { side, role, x, y, vx: 0, vy: 0, r: 11, speed: side === "you" ? 130 : 118 };
  }

  function setupPlay(playKey) {
    const play = PLAYS[playKey];
    state.play = play;
    state.playTime = 0;
    state.flash = play.name.toUpperCase();
    state.flashT = 0.7;
    const midX = W * 0.5;
    const losY = yardToY(state.ballYd + ENDZONE);
    const dir = state.possession === "you" ? 1 : -1;
    const ents = [];
    const qb = makePlayer(state.possession, "qb", midX, losY);
    qb.speed = 122;
    ents.push(qb);
    const wrOff = play.kind === "run" ? 70 : 86;
    const side = (play.vx === 1 || play.spread > 0.3 ? wrOff : -wrOff) * dir;
    const wr = makePlayer(state.possession, "wr", midX + side, losY + (dir > 0 ? 18 : -18));
    wr.speed = play.kind === "run" ? 128 : 150;
    ents.push(wr);
    const ol = makePlayer(state.possession, "ol", midX - 40, losY + (dir > 0 ? -8 : 8));
    ol.speed = 70;
    ents.push(ol);
    const defense = state.possession === "you" ? "cpu" : "you";
    const rushers = 3 + (play.name === "Hail Mary" ? 1 : 0);
    for (let i = 0; i < rushers; i++) {
      const dx = (i - (rushers - 1) / 2) * 52;
      const d = makePlayer(defense, i === 1 ? "mlb" : "dl", midX + dx + rand(-10, 10), losY + (dir > 0 ? -34 : 34));
      d.speed = 108 + rand(0, 22);
      ents.push(d);
    }
    const cb = makePlayer(defense, "cb", wr.x + rand(-20, 20), wr.y + (dir > 0 ? -90 : 90));
    cb.speed = 136;
    ents.push(cb);
    const sfty = makePlayer(defense, "s", midX + rand(-30, 30), losY + (dir > 0 ? -160 : 160));
    sfty.speed = 128;
    ents.push(sfty);
    state.entities = ents;
    state.carrier = qb;
    state.ball = { x: qb.x, y: qb.y, inAir: false, t: 0, dur: 0, sx: 0, sy: 0, tx: 0, ty: 0 };
    state.mode = "play";
    huddle.classList.add("hidden");
  }

  function throwBall(target, air) {
    const b = state.ball;
    if (b.inAir) return;
    b.inAir = true; b.t = 0; b.dur = air;
    b.sx = state.carrier.x; b.sy = state.carrier.y;
    b.tx = target.x; b.ty = target.y;
    state.carrier = null;
  }

  function catchOrDrop() {
    const wr = state.entities.find(e => e.role === "wr" && e.side === state.possession);
    const cb = state.entities.find(e => e.role === "cb");
    const dropChance = 0.12 + (state.play.spread < 0.2 ? 0.08 : 0);
    const sep = wr && cb ? Math.hypot(wr.x - cb.x, wr.y - cb.y) : 40;
    if (Math.random() > dropChance && sep > 16 && wr) {
      state.carrier = wr;
      state.ball.inAir = false;
      state.flash = "CATCH!";
      state.flashT = 0.45;
    } else {
      endPlay("incomplete");
    }
  }

  function fieldSpot() {
    return yToYard(state.carrier ? state.carrier.y : state.ball.y) - ENDZONE;
  }

  function endPlay(reason) {
    state.clock -= reason === "incomplete" ? rand(4, 7) : rand(6, 14);
    let spot = clamp(fieldSpot(), 0, 100);
    if (reason === "incomplete") spot = state.ballYd;
    if (reason === "td") {
      if (state.possession === "you") {
        state.you += 7;
        announce("TOUCHDOWN!", "You slam it in. Kick is good. +7");
      } else {
        state.cpu += 7;
        announce("CPU TOUCHDOWN", "They take it the distance.");
      }
      resetDrive(state.possession === "you" ? "cpu" : "you");
      checkPeriod();
      return;
    }
    if (reason === "safety") {
      if (state.possession === "you") {
        state.cpu += 2;
        announce("SAFETY", "Tackled in your end zone. CPU +2");
        resetDrive("cpu");
      } else {
        state.you += 2;
        announce("SAFETY", "You drop them in their end zone. +2");
        resetDrive("you");
      }
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
        announce(txt, downLabel() + " \u00b7 " + spotLabel());
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
    const tie = state.you === state.cpu;
    document.getElementById("endTitle").textContent = tie ? "TIE GAME" : (state.you > state.cpu ? "YOU WIN" : "CPU WINS");
    document.getElementById("endHelp").textContent = "Final  " + state.you + " \u2013 " + state.cpu;
    end.classList.remove("hidden");
  }
  function openHuddle() {
    if (state.clock <= 0 && state.qtr >= 4) { finish(); return; }
    whistle.classList.add("hidden");
    end.classList.add("hidden");
    if (state.possession === "cpu") {
      huddle.classList.add("hidden");
      const book = Object.keys(PLAYS);
      setupPlay(choice(state.down === 4 || state.clock < 20 ? ["go", "hail", "slant"] : book));
      return;
    }
    state.mode = "huddle";
    document.getElementById("huddleTag").textContent = downLabel() + " \u00b7 " + spotLabel();
    document.getElementById("huddleMsg").textContent = "Call your play";
    huddle.classList.remove("hidden");
    refreshHud();
  }
  function seek(e, tx, ty, speed) {
    const dx = tx - e.x, dy = ty - e.y;
    const d = Math.hypot(dx, dy) || 1;
    e.vx = (dx / d) * speed;
    e.vy = (dy / d) * speed;
  }

  function updatePlay(dt) {
    state.playTime += dt;
    state.clock -= dt * 0.35;
    if (state.clock < 0) state.clock = 0;
    const play = state.play;
    const wr = state.entities.find(e => e.role === "wr" && e.side === state.possession);
    if (wr) {
      const ty = yardToY(clamp(state.possession === "you" ? state.ballYd + ENDZONE + (play.target || 10) : state.ballYd + ENDZONE - (play.target || 10), 0, TOTAL));
      const tx = W * (0.5 + (play.spread || 0) * (wr.x > W / 2 ? 1 : -1) * 0.35);
      seek(wr, tx, ty, wr.speed);
    }
    for (const e of state.entities) {
      if (e.side === state.possession) {
        if (e.role === "ol") {
          const rusher = state.entities.find(d => d.role === "dl");
          if (rusher) seek(e, rusher.x, rusher.y, e.speed);
        }
        continue;
      }
      const target = state.ball.inAir ? { x: state.ball.tx, y: state.ball.ty } : (state.carrier || state.ball);
      seek(e, target.x, target.y, e.speed * (e.role === "dl" ? 0.75 : 1));
    }
    if (state.carrier && state.carrier.side === "you") {
      let ix = 0, iy = 0;
      if (keys.a || keys.arrowleft) ix -= 1;
      if (keys.d || keys.arrowright) ix += 1;
      if (keys.w || keys.arrowup) iy -= 1;
      if (keys.s || keys.arrowdown) iy += 1;
      if (pointer.active) { ix = pointer.x - state.carrier.x; iy = pointer.y - state.carrier.y; }
      const m = Math.hypot(ix, iy);
      if (m > 1) {
        const spd = state.carrier.speed * (play.kind === "run" ? 1.05 : 1);
        state.carrier.vx = (ix / m) * spd;
        state.carrier.vy = (iy / m) * spd;
      } else if (!pointer.active && m === 0) {
        state.carrier.vy = -state.carrier.speed * 0.35;
        state.carrier.vx *= 0.85;
      }
    } else if (state.carrier && state.carrier.side === "cpu") {
      seek(state.carrier, W * 0.5 + Math.sin(state.playTime * 2.2) * 48, H - 24, state.carrier.speed);
    }
    if (play.kind === "pass" && !state.ball.inAir && state.carrier && state.carrier.role === "qb" && wr) {
      if (state.playTime > 0.35) throwBall(wr, play.air);
    }
    for (const e of state.entities) {
      e.x = clamp(e.x + e.vx * dt, 14, W - 14);
      e.y = clamp(e.y + e.vy * dt, 10, H - 10);
    }
    if (state.ball.inAir) {
      state.ball.t += dt;
      const u = clamp(state.ball.t / state.ball.dur, 0, 1);
      const arc = Math.sin(u * Math.PI) * 40;
      state.ball.x = state.ball.sx + (state.ball.tx - state.ball.sx) * u;
      state.ball.y = state.ball.sy + (state.ball.ty - state.ball.sy) * u - arc;
      if (wr) { state.ball.tx = wr.x; state.ball.ty = wr.y; }
      if (u >= 1) catchOrDrop();
    } else if (state.carrier) {
      state.ball.x = state.carrier.x;
      state.ball.y = state.carrier.y;
    }
    if (state.carrier && !state.ball.inAir) {
      for (const e of state.entities) {
        if (e.side === state.carrier.side) continue;
        if (Math.hypot(e.x - state.carrier.x, e.y - state.carrier.y) < e.r + state.carrier.r - 2) {
          endPlay("tackle"); return;
        }
      }
      const yd = fieldSpot();
      if (state.possession === "you" && yd >= 100) { endPlay("td"); return; }
      if (state.possession === "cpu" && yd <= 0) { endPlay("td"); return; }
      if (state.possession === "you" && yd <= 0 && state.ballYd < 8) { endPlay("safety"); return; }
      if (state.possession === "cpu" && yd >= 100 && state.ballYd > 92) { endPlay("safety"); return; }
    }
    if (state.playTime > 9) endPlay("tackle");
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
      const label = yd === 0 || yd === 100 ? "G" : yd === 50 ? "50" : String(yd > 50 ? 100 - yd : yd);
      ctx.fillText(label, 8, y - 4);
      ctx.fillText(label, W - 24, y - 4);
    }
    ctx.fillStyle = "rgba(0,240,255,0.16)";
    ctx.fillRect(0, yardToY(ENDZONE), W, H - yardToY(ENDZONE));
    ctx.fillStyle = "rgba(255,61,138,0.16)";
    ctx.fillRect(0, 0, W, yardToY(100 + ENDZONE));
    ctx.font = "800 22px Orbitron";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(0,240,255,0.75)";
    ctx.fillText("YOU", W / 2, H - 28);
    ctx.fillStyle = "rgba(255,61,138,0.85)";
    ctx.fillText("CPU", W / 2, 28);
    const los = yardToY(state.ballYd + ENDZONE);
    ctx.strokeStyle = "#ffe566"; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(0, los); ctx.lineTo(W, los); ctx.stroke();
    ctx.setLineDash([]);
    const marker = state.possession === "you" ? state.ballYd + state.toGo : state.ballYd - state.toGo;
    const fd = yardToY(clamp(marker, 0, 100) + ENDZONE);
    ctx.strokeStyle = "rgba(0,240,255,0.7)";
    ctx.beginPath(); ctx.moveTo(0, fd); ctx.lineTo(W, fd); ctx.stroke();
  }

  function drawEntity(e) {
    const you = e.side === "you";
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
    const tag = { qb: "QB", wr: "WR", cb: "CB", s: "S", mlb: "LB", ol: "OL", dl: "DL" }[e.role] || "X";
    ctx.fillText(tag, e.x, e.y);
  }

  function draw() {
    drawField();
    if (state.mode === "play" || state.mode === "whistle") {
      for (const e of state.entities) drawEntity(e);
      ctx.beginPath();
      ctx.fillStyle = "#f4d7a1";
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 8;
      ctx.ellipse(state.ball.x, state.ball.y, 5, 3.2, 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (state.flashT > 0) {
        ctx.fillStyle = "rgba(255,229,102," + clamp(state.flashT, 0, 1) + ")";
        ctx.font = "800 28px Orbitron";
        ctx.textAlign = "center";
        ctx.fillText(state.flash, W / 2, H * 0.42);
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
    state.mode = "huddle";
    end.classList.add("hidden");
    menu.classList.add("hidden");
    openHuddle();
  }

  document.getElementById("startBtn").onclick = resetGame;
  document.getElementById("againBtn").onclick = resetGame;
  document.getElementById("nextBtn").onclick = openHuddle;
  huddle.querySelectorAll("[data-play]").forEach(btn => {
    btn.addEventListener("click", () => setupPlay(btn.dataset.play));
  });
  window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
    if (["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e.key.toLowerCase())) e.preventDefault();
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
