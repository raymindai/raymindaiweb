import { useEffect, useRef } from "react";
import styles from "./FluidBackground.module.css";

// Simplified Navier-Stokes fluid simulation on canvas
export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = 0, h = 0;
    let mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0;
    let animId: number;

    const GRID = 64;
    const SIZE = GRID + 2;
    let u = new Float32Array(SIZE * SIZE);
    let v = new Float32Array(SIZE * SIZE);
    let u0 = new Float32Array(SIZE * SIZE);
    let v0 = new Float32Array(SIZE * SIZE);
    let dens = new Float32Array(SIZE * SIZE);
    let dens0 = new Float32Array(SIZE * SIZE);

    const IX = (x: number, y: number) => x + y * SIZE;
    const dt = 0.08;
    const diff = 0.0001;
    const visc = 0.0001;

    function setBnd(b: number, x: Float32Array) {
      for (let i = 1; i <= GRID; i++) {
        x[IX(0, i)] = b === 1 ? -x[IX(1, i)] : x[IX(1, i)];
        x[IX(GRID + 1, i)] = b === 1 ? -x[IX(GRID, i)] : x[IX(GRID, i)];
        x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
        x[IX(i, GRID + 1)] = b === 2 ? -x[IX(i, GRID)] : x[IX(i, GRID)];
      }
      x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
      x[IX(0, GRID + 1)] = 0.5 * (x[IX(1, GRID + 1)] + x[IX(0, GRID)]);
      x[IX(GRID + 1, 0)] = 0.5 * (x[IX(GRID, 0)] + x[IX(GRID + 1, 1)]);
      x[IX(GRID + 1, GRID + 1)] = 0.5 * (x[IX(GRID, GRID + 1)] + x[IX(GRID + 1, GRID)]);
    }

    function linSolve(b: number, x: Float32Array, x0: Float32Array, a: number, c: number) {
      const cRecip = 1.0 / c;
      for (let k = 0; k < 4; k++) {
        for (let j = 1; j <= GRID; j++) {
          for (let i = 1; i <= GRID; i++) {
            x[IX(i, j)] = (x0[IX(i, j)] + a * (x[IX(i + 1, j)] + x[IX(i - 1, j)] + x[IX(i, j + 1)] + x[IX(i, j - 1)])) * cRecip;
          }
        }
        setBnd(b, x);
      }
    }

    function diffuse(b: number, x: Float32Array, x0: Float32Array, diffVal: number) {
      const a = dt * diffVal * GRID * GRID;
      linSolve(b, x, x0, a, 1 + 4 * a);
    }

    function advect(b: number, d: Float32Array, d0: Float32Array, uArr: Float32Array, vArr: Float32Array) {
      const dt0 = dt * GRID;
      for (let j = 1; j <= GRID; j++) {
        for (let i = 1; i <= GRID; i++) {
          let x = i - dt0 * uArr[IX(i, j)];
          let y = j - dt0 * vArr[IX(i, j)];
          if (x < 0.5) x = 0.5; if (x > GRID + 0.5) x = GRID + 0.5;
          if (y < 0.5) y = 0.5; if (y > GRID + 0.5) y = GRID + 0.5;
          const i0 = Math.floor(x), i1 = i0 + 1;
          const j0 = Math.floor(y), j1 = j0 + 1;
          const s1 = x - i0, s0 = 1 - s1;
          const t1 = y - j0, t0 = 1 - t1;
          d[IX(i, j)] = s0 * (t0 * d0[IX(i0, j0)] + t1 * d0[IX(i0, j1)]) + s1 * (t0 * d0[IX(i1, j0)] + t1 * d0[IX(i1, j1)]);
        }
      }
      setBnd(b, d);
    }

    function project(uArr: Float32Array, vArr: Float32Array, p: Float32Array, divArr: Float32Array) {
      for (let j = 1; j <= GRID; j++) {
        for (let i = 1; i <= GRID; i++) {
          divArr[IX(i, j)] = -0.5 * (uArr[IX(i + 1, j)] - uArr[IX(i - 1, j)] + vArr[IX(i, j + 1)] - vArr[IX(i, j - 1)]) / GRID;
          p[IX(i, j)] = 0;
        }
      }
      setBnd(0, divArr); setBnd(0, p);
      linSolve(0, p, divArr, 1, 4);
      for (let j = 1; j <= GRID; j++) {
        for (let i = 1; i <= GRID; i++) {
          uArr[IX(i, j)] -= 0.5 * GRID * (p[IX(i + 1, j)] - p[IX(i - 1, j)]);
          vArr[IX(i, j)] -= 0.5 * GRID * (p[IX(i, j + 1)] - p[IX(i, j - 1)]);
        }
      }
      setBnd(1, uArr); setBnd(2, vArr);
    }

    function step() {
      diffuse(1, u0, u, visc);
      diffuse(2, v0, v, visc);
      project(u0, v0, u, v);
      advect(1, u, u0, u0, v0);
      advect(2, v, v0, u0, v0);
      project(u, v, u0, v0);
      diffuse(0, dens0, dens, diff);
      advect(0, dens, dens0, u, v);
      // Decay
      for (let i = 0; i < SIZE * SIZE; i++) dens[i] *= 0.995;
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    }

    let totalFrames = 0;
    function render() {
      totalFrames++;
      // Apply smoothed mouse input
      if (inputI > 0 && inputJ > 0) {
        u[IX(inputI, inputJ)] += inputU;
        v[IX(inputI, inputJ)] += inputV;
        dens[IX(inputI, inputJ)] += inputDens;
        inputU *= 0.85;
        inputV *= 0.85;
        inputDens *= 0.85;
      }
      step();
      ctx.clearRect(0, 0, w, h);

      const cellW = w / GRID;
      const cellH = h / GRID;

      for (let j = 1; j <= GRID; j++) {
        for (let i = 1; i <= GRID; i++) {
          const d = dens[IX(i, j)];
          if (d < 0.001) continue;
          const alpha = Math.min(d * 0.8, 0.35);

          // Iridescence only at edges (where density gradient is steep)
          const dLeft = i > 1 ? dens[IX(i - 1, j)] : 0;
          const dRight = i < GRID ? dens[IX(i + 1, j)] : 0;
          const dUp = j > 1 ? dens[IX(i, j - 1)] : 0;
          const dDown = j < GRID ? dens[IX(i, j + 1)] : 0;
          const gradient = Math.abs(dRight - dLeft) + Math.abs(dDown - dUp);

          const vx = u[IX(i, j)];
          const vy = v[IX(i, j)];
          const speed = Math.sqrt(vx * vx + vy * vy);
          const age = Math.min(totalFrames / 180, 1); // 0→1 over ~3 seconds
          const hue = ((i * 7 + j * 4 + speed * 40 + d * 30) % 360 + 360) % 360;
          const edgeFactor = Math.min(gradient * 20, 1);
          // Start white/cool, transition to iridescent
          const sat = age * (edgeFactor * 90 + (1 - edgeFactor) * 15);
          const light = (1 - age) * (40 + Math.min(d * 15, 30)) + age * (12 + Math.min(d * 8, 15) + edgeFactor * 25);

          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
          ctx.beginPath();
          ctx.arc((i - 0.5) * cellW, (j - 0.5) * cellH, cellW * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    }

    // Smoothed input — accumulate and apply gradually in render loop
    let inputU = 0, inputV = 0, inputDens = 0;
    let inputI = 0, inputJ = 0;
    let scrolling = false;
    let scrollTimer = 0;

    function onScroll() {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => { scrolling = false; }, 150);
    }

    function handleInput(
      x: number,
      y: number,
      prevX: number,
      prevY: number,
      _allowWhileScrolling = false,
      minSpeed = 2
    ) {
      if (scrolling) return;

      const i = Math.floor((x / w) * GRID) + 1;
      const j = Math.floor((y / h) * GRID) + 1;
      if (i < 1 || i > GRID || j < 1 || j > GRID) return;

      const dx = x - prevX;
      const dy = y - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed < minSpeed) return;

      inputI = i;
      inputJ = j;
      inputU += dx * 0.02;
      inputV += dy * 0.02;
      inputDens += Math.min(speed * 0.005, 0.1);
    }

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === "mouse") return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    }

    function onPointerMove(e: PointerEvent) {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      const allowWhileScrolling = e.pointerType !== "mouse";
      const minSpeed = e.pointerType === "mouse" ? 2 : 0.35;
      handleInput(mouseX, mouseY, prevMouseX, prevMouseY, allowWhileScrolling, minSpeed);
    }

    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    }

    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      // Fallback path for browsers where pointermove is throttled during scroll.
      handleInput(mouseX, mouseY, prevMouseX, prevMouseY, true, 0.05);
    }

    // Touch fallback is mainly needed on iOS where pointermove can be sparse while scrolling.
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    if (isIOS) {
      document.addEventListener("touchstart", onTouchStart, { passive: true });
      document.addEventListener("touchmove", onTouchMove, { passive: true });
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      if (isIOS) {
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
