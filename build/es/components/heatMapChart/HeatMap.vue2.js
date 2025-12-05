import { defineComponent as ie, ref as L, onMounted as re, onUnmounted as le, createElementBlock as q, openBlock as J, normalizeStyle as U, createCommentVNode as se, createElementVNode as ce, unref as D } from "vue";
import { Object3D as ue, Scene as de, Color as d, PerspectiveCamera as fe, WebGLRenderer as me, AmbientLight as pe, DirectionalLight as he, Group as we, GridHelper as ye, AxesHelper as ge, Raycaster as be, Vector2 as Ae, BoxGeometry as xe, BufferAttribute as ve, MeshBasicMaterial as Me, Mesh as W } from "../../node_modules/three/build/three.module.js";
const ze = ["innerHTML"], He = /* @__PURE__ */ ie({
  name: "JBHeatMap3D",
  __name: "HeatMap",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: { type: Number, default: 600 },
    height: { type: Number, default: 500 },
    baseSize: { type: Number, default: 0.1 },
    maxHeight: { type: Number, default: 3 },
    enableOrbit: { type: Boolean, default: !0 },
    backgroundColor: { type: String, default: "#0d1b2a" },
    showGridHelper: { type: Boolean, default: !0 },
    showAxesHelper: { type: Boolean, default: !0 },
    isStandardColor: { type: Boolean, default: !0 },
    rotateAnimation: { type: Boolean, default: !1 },
    // 是否启用旋转动画
    rotationSpeed: { type: Number, default: 0.01 },
    // 旋转速度，可由外部传入
    autoAnimate: { type: Boolean, default: !1 },
    cameraPosition: {
      type: Object,
      default: () => ({ x: 5, y: 5, z: 5 })
    }
  },
  setup(F, { expose: K }) {
    const V = L(0), t = F;
    new ue();
    const v = L(null), h = L({ show: !1, x: 0, y: 0, content: "" }), I = L(t.autoAnimate);
    let w, M, y, g = null, b, G, B, j = null, C = [], A = 0, x = 0;
    re(async () => {
      const { OrbitControls: a } = await import("../../node_modules/three/examples/jsm/controls/OrbitControls.js");
      Q(), t.enableOrbit && (g = new a(M, y.domElement), g.enableDamping = !0, g.dampingFactor = 0.05), T(), window.addEventListener("mousemove", _), window.addEventListener("resize", $), v.value && v.value.addEventListener("mouseleave", () => {
        h.value.show = !1;
      });
    }), le(() => {
      j && cancelAnimationFrame(j), window.removeEventListener("mousemove", _), window.removeEventListener("resize", $), y.dispose();
    });
    function Q() {
      const { backgroundColor: a, showGridHelper: e, showAxesHelper: r, cameraPosition: l } = t;
      w = new de(), w.background = new d(a), M = new fe(75, t.width / t.height, 0.1, 1e3), M.position.set(l.x, l.y, l.z), y = new me({ antialias: !0 }), y.setSize(t.width, t.height), y.shadowMap.enabled = !0, v.value && v.value.appendChild(y.domElement), t.enableOrbit && g && (g.enableDamping = !0, g.dampingFactor = 0.05), w.add(new pe(16777215, 0.6));
      const n = new he(16777215, 0.8);
      if (n.position.set(10, 20, 5), w.add(n), b = new we(), w.add(b), e) {
        const u = Math.max(A, x) * t.baseSize * 1.2, o = new ye(u, Math.max(A, x), 4473924, 2236962);
        w.add(o);
      }
      if (r) {
        const u = new ge(Math.max(A, x) * t.baseSize * 0.6);
        w.add(u);
      }
      G = new be(), B = new Ae(), Y();
    }
    function Z(a = 10, e = 10) {
      return Array.from({ length: a }, () => Array.from({ length: e }, () => Math.random() * 15 + 1));
    }
    function R(a, e, r, l, n, u) {
      let o = 0.1;
      n !== l && (o += (r - l) / (n - l) * t.maxHeight);
      const s = new xe(t.baseSize, o, t.baseSize, 1, 8, 1), S = s.attributes.position, H = s.attributes.normal, P = [], m = n !== l ? (r - l) / (n - l) : 0, f = [
        new d(536927),
        // 深蓝色
        new d(4556987),
        // 蓝色
        new d(8765155),
        // 浅蓝色
        new d(12508404),
        // 更浅的蓝色
        new d(14997468),
        // 淡紫色
        new d(16572378),
        // 淡粉色
        new d(16365218),
        // 浅橙色
        new d(16349280),
        // 橙色
        new d(13112870),
        // 红色
        new d(11468815)
        // 深红色
      ];
      let i = [], c = 0;
      m >= 0.9 ? (c = 10, i = f.slice(0, 10)) : m >= 0.8 ? (c = 9, i = f.slice(0, 9)) : m >= 0.7 ? (c = 8, i = f.slice(0, 8)) : m >= 0.6 ? (c = 7, i = f.slice(0, 7)) : m >= 0.5 ? (c = 6, i = f.slice(0, 6)) : m >= 0.4 ? (c = 5, i = f.slice(0, 5)) : m >= 0.3 ? (c = 4, i = f.slice(0, 4)) : m >= 0.2 ? (c = 3, i = f.slice(0, 3)) : m >= 0.1 ? (c = 2, i = f.slice(0, 2)) : (c = 1, i = f.slice(0, 1));
      for (let E = 0; E < S.count; E++) {
        const ne = S.getY(E), ae = H.getY(E);
        let z = new d();
        const X = Math.max(0, Math.min(1, (ne + o / 2) / o));
        if (ae > 0.5)
          z.copy(i[i.length - 1]);
        else if (c === 1)
          z.copy(i[0]);
        else {
          const O = 1 / (c - 1);
          let p = Math.floor(X / O);
          p = Math.min(p, c - 2), p = Math.max(0, p);
          const oe = (X - p * O) / O;
          p >= 0 && p + 1 < i.length ? z.lerpColors(i[p], i[p + 1], oe) : z.copy(i[i.length - 1]);
        }
        P.push(z.r, z.g, z.b);
      }
      s.setAttribute("color", new ve(new Float32Array(P), 3));
      const te = new Me({ vertexColors: !0 }), N = new W(s, te);
      return N.position.set((a - (A - 1) / 2) * t.baseSize, o / 2, (e - (x - 1) / 2) * t.baseSize), N.userData = { value: r, x: a, z: e }, N;
    }
    function ee() {
      {
        const { children: a } = b;
        a.forEach((e) => {
          e instanceof W && (e.geometry.dispose(), (Array.isArray(e.material) ? e.material : [e.material]).forEach((l) => l.dispose()));
        }), b.clear();
      }
    }
    function Y() {
      var l;
      if (ee(), Array.isArray(t.data) && t.data.length > 0 && t.data.every((n) => Array.isArray(n)) ? C = t.data.map((n) => [...n]) : (console.log("数据不合法，使用默认数据"), C = Z()), b.clear(), A = C.length, x = ((l = C[0]) == null ? void 0 : l.length) || 0, A === 0 || x === 0) {
        console.warn("数据为空，无法创建热力图");
        return;
      }
      let e = 1 / 0, r = -1 / 0;
      for (let n = 0; n < A; n++) {
        const u = C[n];
        if (Array.isArray(u))
          for (let o = 0; o < x; o++) {
            const s = u[o];
            typeof s == "number" && (s < e && (e = s), s > r && (r = s));
          }
      }
      e === 1 / 0 && (e = 0), r === -1 / 0 && (r = 0);
      for (let n = 0; n < A; n++) {
        const u = C[n];
        if (Array.isArray(u))
          for (let o = 0; o < x; o++) {
            const s = u[o], S = typeof s == "number" ? s : 0;
            let H = null;
            t.isStandardColor, H = R(n, o, S, e, r), b.add(H);
          }
      }
    }
    function T() {
      j = requestAnimationFrame(T), t.rotateAnimation && (V.value += t.rotationSpeed, b.rotation.y = V.value), g && g.update(), y.render(w, M);
    }
    let k = null;
    function _(a) {
      if (!v.value)
        return;
      const e = v.value.getBoundingClientRect();
      if (a.clientX < e.left || a.clientX > e.right || a.clientY < e.top || a.clientY > e.bottom) {
        h.value.show = !1;
        return;
      }
      k && cancelAnimationFrame(k), k = requestAnimationFrame(() => {
        B.x = (a.clientX - e.left) / e.width * 2 - 1, B.y = -((a.clientY - e.top) / e.height) * 2 + 1, G.setFromCamera(B, M);
        const r = G.intersectObjects(b.children);
        if (r.length) {
          const l = r[0].object, { value: n, x: u, z: o } = l.userData;
          h.value = {
            show: !0,
            x: a.clientX - e.left + 10,
            y: a.clientY - e.top - 30,
            content: `数值: ${n.toFixed(2)}<br>位置: (${u}, ${o})`
          };
        } else
          h.value.show = !1;
      });
    }
    function $() {
      M.aspect = t.width / t.height, M.updateProjectionMatrix(), y.setSize(t.width, t.height);
    }
    return K({
      refresh: Y,
      toggleAnimation: () => I.value = !I.value
    }), (a, e) => (J(), q("div", {
      class: "heatmap-wrapper",
      style: U({ width: F.width + "px", height: F.height + "px" })
    }, [
      D(h).show ? (J(), q("div", {
        key: 0,
        class: "tooltip",
        style: U({ left: D(h).x + "px", top: D(h).y + "px" }),
        innerHTML: D(h).content
      }, null, 12, ze)) : se("", !0),
      ce("div", {
        ref_key: "containerRef",
        ref: v,
        class: "three-container"
      }, null, 512)
    ], 4));
  }
});
export {
  He as default
};
