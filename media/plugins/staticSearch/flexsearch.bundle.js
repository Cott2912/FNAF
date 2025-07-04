/**!
 * FlexSearch.js v0.7.22 (Bundle)
 * Copyright 2018-2021 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self) {
    'use strict';
    try {
        if (module) self = module
    } catch (e) { }
    self._factory = _f;
    var t;

    function u(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        return new Promise(function (d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        })
    };

    function v(a) {
        return "undefined" !== typeof a ? a : !0
    }

    function aa(a) {
        const b = Array(a);
        for (let c = 0; c < a; c++) b[c] = x();
        return b
    }

    function x() {
        return Object.create(null)
    }

    function ba(a, b) {
        return b.length - a.length
    }

    function C(a) {
        return "string" === typeof a
    }

    function D(a) {
        return "object" === typeof a
    }

    function E(a) {
        return "function" === typeof a
    };

    function ca(a, b) {
        var c = da;
        if (a && (b && (a = F(a, b)), this.H && (a = F(a, this.H)), this.J && 1 < a.length && (a = F(a, this.J)), c || "" === c)) {
            a = a.split(c);
            if (this.filter) {
                b = this.filter;
                c = a.length;
                const d = [];
                for (let e = 0, f = 0; e < c; e++) {
                    const g = a[e];
                    g && !b[g] && (d[f++] = g)
                }
                a = d
            }
            return a
        }
        return a
    }
    const da = /[\p{Z}\p{S}\p{P}\p{C}]+/u,
        ea = /[\u0300-\u036f]/g;

    function fa(a, b) {
        const c = Object.keys(a),
            d = c.length,
            e = [];
        let f = "",
            g = 0;
        for (let h = 0, k, m; h < d; h++) k = c[h], (m = a[k]) ? (e[g++] = G(b ? "(?!\\b)" + k + "(\\b|_)" : k), e[g++] = m) : f += (f ? "|" : "") + k;
        f && (e[g++] = G(b ? "(?!\\b)(" + f + ")(\\b|_)" : "(" + f + ")"), e[g] = "");
        return e
    }

    function F(a, b) {
        for (let c = 0, d = b.length; c < d && (a = a.replace(b[c], b[c + 1]), a); c += 2);
        return a
    }

    function G(a) {
        return new RegExp(a, "g")
    }

    function ha(a) {
        let b = "",
            c = "";
        for (let d = 0, e = a.length, f; d < e; d++)(f = a[d]) !== c && (b += c = f);
        return b
    };
    var ja = {
        encode: ia,
        F: !1,
        G: ""
    };

    function ia(a) {
        return ca.call(this, ("" + a).toLowerCase(), !1)
    };
    const ka = {},
        I = {};

    function la(a) {
        J(a, "add");
        J(a, "append");
        J(a, "search");
        J(a, "update");
        J(a, "remove")
    }

    function J(a, b) {
        a[b + "Async"] = function () {
            const c = this,
                d = arguments;
            var e = d[d.length - 1];
            let f;
            E(e) && (f = e, delete d[d.length - 1]);
            e = new Promise(function (g) {
                setTimeout(function () {
                    c.async = !0;
                    const h = c[b].apply(c, d);
                    c.async = !1;
                    g(h)
                })
            });
            return f ? (e.then(f), this) : e
        }
    };

    function ma(a, b, c, d) {
        const e = a.length;
        let f = [],
            g, h, k = 0;
        d && (d = []);
        for (let m = e - 1; 0 <= m; m--) {
            const n = a[m],
                w = n.length,
                q = x();
            let r = !g;
            for (let l = 0; l < w; l++) {
                const p = n[l],
                    z = p.length;
                if (z)
                    for (let B = 0, A, y; B < z; B++)
                        if (y = p[B], g) {
                            if (g[y]) {
                                if (!m)
                                    if (c) c--;
                                    else if (f[k++] = y, k === b) return f;
                                if (m || d) q[y] = 1;
                                r = !0
                            }
                            if (d && (h[y] = (A = h[y]) ? ++A : A = 1, A < e)) {
                                const H = d[A - 2] || (d[A - 2] = []);
                                H[H.length] = y
                            }
                        } else q[y] = 1
            }
            if (d) g || (h = q);
            else if (!r) return [];
            g = q
        }
        if (d)
            for (let m = d.length - 1, n, w; 0 <= m; m--) {
                n = d[m];
                w = n.length;
                for (let q = 0, r; q < w; q++)
                    if (r =
                        n[q], !g[r]) {
                        if (c) c--;
                        else if (f[k++] = r, k === b) return f;
                        g[r] = 1
                    }
            }
        return f
    }

    function na(a, b) {
        const c = x(),
            d = x(),
            e = [];
        for (let f = 0; f < a.length; f++) c[a[f]] = 1;
        for (let f = 0, g; f < b.length; f++) {
            g = b[f];
            for (let h = 0, k; h < g.length; h++) k = g[h], c[k] && !d[k] && (d[k] = 1, e[e.length] = k)
        }
        return e
    };

    function K(a) {
        this.l = !0 !== a && a;
        this.cache = x();
        this.h = []
    }

    function oa(a, b, c) {
        D(a) && (a = a.query);
        let d = this.cache.get(a);
        d || (d = this.search(a, b, c), this.cache.set(a, d));
        return d
    }
    K.prototype.set = function (a, b) {
        if (!this.cache[a]) {
            var c = this.h.length;
            c === this.l ? delete this.cache[this.h[c - 1]] : c++;
            for (--c; 0 < c; c--) this.h[c] = this.h[c - 1];
            this.h[0] = a
        }
        this.cache[a] = b
    };
    K.prototype.get = function (a) {
        const b = this.cache[a];
        if (this.l && b && (a = this.h.indexOf(a))) {
            const c = this.h[a - 1];
            this.h[a - 1] = this.h[a];
            this.h[a] = c
        }
        return b
    };
    const pa = {
        memory: {
            charset: "latin:extra",
            D: 3,
            B: 4,
            m: !1
        },
        performance: {
            D: 3,
            B: 3,
            s: !1,
            context: {
                depth: 2,
                D: 1
            }
        },
        match: {
            charset: "latin:extra",
            G: "reverse"
        },
        score: {
            charset: "latin:advanced",
            D: 20,
            B: 3,
            context: {
                depth: 3,
                D: 9
            }
        },
        "default": {}
    };

    function ra(a, b, c, d, e, f) {
        return u(function* () {
            const g = a(c, JSON.stringify(f));
            g && g.then && (yield g);
            return yield b.export(a, b, c, d, e + 1)
        }())
    };

    function L(a, b) {
        if (!(this instanceof L)) return new L(a);
        var c;
        if (a) {
            C(a) ? a = pa[a] : (c = a.preset) && (a = Object.assign({}, c[c], a));
            c = a.charset;
            var d = a.lang;
            C(c) && (-1 === c.indexOf(":") && (c += ":default"), c = I[c]);
            C(d) && (d = ka[d])
        } else a = {};
        let e, f, g = a.context || {};
        this.encode = a.encode || c && c.encode || ia;
        this.register = b || x();
        this.D = e = a.resolution || 9;
        this.G = b = c && c.G || a.tokenize || "strict";
        this.depth = "strict" === b && g.depth;
        this.l = v(g.bidirectional);
        this.s = f = v(a.optimize);
        this.m = v(a.fastupdate);
        this.B = a.minlength || 1;
        this.C =
            a.boost;
        this.map = f ? aa(e) : x();
        this.A = e = g.resolution || 1;
        this.h = f ? aa(e) : x();
        this.F = c && c.F || a.rtl;
        this.H = (b = a.matcher || d && d.H) && fa(b, !1);
        this.J = (b = a.stemmer || d && d.J) && fa(b, !0);
        if (c = b = a.filter || d && d.filter) {
            c = b;
            d = x();
            for (let h = 0, k = c.length; h < k; h++) d[c[h]] = 1;
            c = d
        }
        this.filter = c;
        this.cache = (b = a.cache) && new K(b)
    }
    t = L.prototype;
    t.append = function (a, b) {
        return this.add(a, b, !0)
    };
    t.add = function (a, b, c, d) {
        if (b && (a || 0 === a)) {
            if (!d && !c && this.register[a]) return this.update(a, b);
            b = this.encode(b);
            if (d = b.length) {
                const m = x(),
                    n = x(),
                    w = this.depth,
                    q = this.D;
                for (let r = 0; r < d; r++) {
                    let l = b[this.F ? d - 1 - r : r];
                    var e = l.length;
                    if (l && e >= this.B && (w || !n[l])) {
                        var f = M(q, d, r),
                            g = "";
                        switch (this.G) {
                            case "full":
                                if (3 < e) {
                                    for (f = 0; f < e; f++)
                                        for (var h = e; h > f; h--)
                                            if (h - f >= this.B) {
                                                var k = M(q, d, r, e, f);
                                                g = l.substring(f, h);
                                                N(this, n, g, k, a, c)
                                            }
                                    break
                                }
                            case "reverse":
                                if (2 < e) {
                                    for (h = e - 1; 0 < h; h--) g = l[h] + g, g.length >= this.B && N(this, n,
                                        g, M(q, d, r, e, h), a, c);
                                    g = ""
                                }
                            case "forward":
                                if (1 < e) {
                                    for (h = 0; h < e; h++) g += l[h], g.length >= this.B && N(this, n, g, f, a, c);
                                    break
                                }
                            default:
                                if (this.C && (f = Math.min(f / this.C(b, l, r) | 0, q - 1)), N(this, n, l, f, a, c), w && 1 < d && r < d - 1)
                                    for (e = x(), g = this.A, f = l, h = Math.min(w + 1, d - r), e[f] = 1, k = 1; k < h; k++)
                                        if ((l = b[this.F ? d - 1 - r - k : r + k]) && l.length >= this.B && !e[l]) {
                                            e[l] = 1;
                                            const p = this.l && l > f;
                                            N(this, m, p ? f : l, M(g + (d / 2 > g ? 0 : 1), d, r, h - 1, k - 1), a, c, p ? l : f)
                                        }
                        }
                    }
                }
                this.m || (this.register[a] = 1)
            }
        }
        return this
    };

    function M(a, b, c, d, e) {
        return c && 1 < a ? b + (d || 0) <= a ? c + (e || 0) : (a - 1) / (b + (d || 0)) * (c + (e || 0)) + 1 | 0 : 0
    }

    function N(a, b, c, d, e, f, g) {
        let h = g ? a.h : a.map;
        if (!b[c] || g && !b[c][g]) a.s && (h = h[d]), g ? (b = b[c] || (b[c] = x()), b[g] = 1, h = h[g] || (h[g] = x())) : b[c] = 1, h = h[c] || (h[c] = []), a.s || (h = h[d] || (h[d] = [])), f && -1 !== h.indexOf(e) || (h[h.length] = e, a.m && (a = a.register[e] || (a.register[e] = []), a[a.length] = h))
    }
    t.search = function (a, b, c) {
        c || (!b && D(a) ? (c = a, a = c.query) : D(b) && (c = b));
        let d = [],
            e;
        let f, g = 0;
        if (c) {
            a = c.query || a;
            b = c.limit;
            g = c.offset || 0;
            var h = c.context;
            f = c.suggest
        }
        if (a && (a = this.encode(a), e = a.length, 1 < e)) {
            c = x();
            var k = [];
            for (let n = 0, w = 0, q; n < e; n++)
                if ((q = a[n]) && q.length >= this.B && !c[q])
                    if (this.s || f || this.map[q]) k[w++] = q, c[q] = 1;
                    else return d;
            a = k;
            e = a.length
        }
        if (!e) return d;
        b || (b = 100);
        h = this.depth && 1 < e && !1 !== h;
        c = 0;
        let m;
        h ? (m = a[0], c = 1) : 1 < e && a.sort(ba);
        for (let n, w; c < e; c++) {
            w = a[c];
            h ? (n = sa(this, d, f, b, g, 2 === e, w, m),
                f && !1 === n && d.length || (m = w)) : n = sa(this, d, f, b, g, 1 === e, w);
            if (n) return n;
            if (f && c === e - 1) {
                k = d.length;
                if (!k) {
                    if (h) {
                        h = 0;
                        c = -1;
                        continue
                    }
                    return d
                }
                if (1 === k) return ta(d[0], b, g)
            }
        }
        return ma(d, b, g, f)
    };

    function sa(a, b, c, d, e, f, g, h) {
        let k = [],
            m = h ? a.h : a.map;
        a.s || (m = ua(m, g, h, a.l));
        if (m) {
            let n = 0;
            const w = Math.min(m.length, h ? a.A : a.D);
            for (let q = 0, r = 0, l, p; q < w; q++)
                if (l = m[q])
                    if (a.s && (l = ua(l, g, h, a.l)), e && l && f && (p = l.length, p <= e ? (e -= p, l = null) : (l = l.slice(e), e = 0)), l && (k[n++] = l, f && (r += l.length, r >= d))) break;
            if (n) {
                if (f) return ta(k, d, 0);
                b[b.length] = k;
                return
            }
        }
        return !c && k
    }

    function ta(a, b, c) {
        a = 1 === a.length ? a[0] : [].concat.apply([], a);
        return c || a.length > b ? a.slice(c, c + b) : a
    }

    function ua(a, b, c, d) {
        c ? (d = d && b > c, a = (a = a[d ? b : c]) && a[d ? c : b]) : a = a[b];
        return a
    }
    t.contain = function (a) {
        return !!this.register[a]
    };
    t.update = function (a, b) {
        return this.remove(a).add(a, b)
    };
    t.remove = function (a, b) {
        const c = this.register[a];
        if (c) {
            if (this.m)
                for (let d = 0, e; d < c.length; d++) e = c[d], e.splice(e.indexOf(a), 1);
            else O(this.map, a, this.D, this.s), this.depth && O(this.h, a, this.A, this.s);
            b || delete this.register[a];
            if (this.cache) {
                b = this.cache;
                for (let d = 0, e, f; d < b.h.length; d++) f = b.h[d], e = b.cache[f], -1 !== e.indexOf(a) && (b.h.splice(d--, 1), delete b.cache[f])
            }
        }
        return this
    };

    function O(a, b, c, d, e) {
        let f = 0;
        if (a.constructor === Array)
            if (e) b = a.indexOf(b), -1 !== b ? 1 < a.length && (a.splice(b, 1), f++) : f++;
            else {
                e = Math.min(a.length, c);
                for (let g = 0, h; g < e; g++)
                    if (h = a[g]) f = O(h, b, c, d, e), d || f || delete a[g]
            }
        else
            for (let g in a) (f = O(a[g], b, c, d, e)) || delete a[g];
        return f
    }
    t.searchCache = oa;
    t.export = function (a, b, c, d, e) {
        const f = this;
        return u(function* () {
            let g, h;
            switch (e || (e = 0)) {
                case 0:
                    g = "reg";
                    if (f.m) {
                        h = x();
                        for (let k in f.register) h[k] = 1
                    } else h = f.register;
                    break;
                case 1:
                    g = "cfg";
                    h = {
                        doc: 0,
                        opt: f.s ? 1 : 0
                    };
                    break;
                case 2:
                    g = "map";
                    h = f.map;
                    break;
                case 3:
                    g = "ctx";
                    h = f.h;
                    break;
                default:
                    return !0
            }
            return yield ra(a, b || f, c ? c + "." + g : g, d, e, h)
        }())
    };
    t.import = function (a, b) {
        if (b) switch (C(b) && (b = JSON.parse(b)), a) {
            case "cfg":
                this.s = !!b.opt;
                break;
            case "reg":
                this.m = !1;
                this.register = b;
                break;
            case "map":
                this.map = b;
                break;
            case "ctx":
                this.h = b
        }
    };
    la(L.prototype);

    function va(a) {
        a = a.data;
        var b = self._index;
        const c = a.args;
        var d = a.task;
        switch (d) {
            case "init":
                d = a.options || {};
                a = a.factory;
                b = d.encode;
                d.cache = !1;
                b && 0 === b.indexOf("function") && (d.encode = Function("return " + b)());
                a ? (Function("return " + a)()(self), self._index = new self.FlexSearch.Index(d), delete self.FlexSearch) : self._index = new L(d);
                break;
            default:
                a = a.id, b = b[d].apply(b, c), postMessage("search" === d ? {
                    id: a,
                    msg: b
                } : {
                    id: a
                })
        }
    };
    let wa = 0;

    function P(a) {
        if (!(this instanceof P)) return new P(a);
        var b;
        a ? E(b = a.encode) && (a.encode = b.toString()) : a = {};
        (b = (self || window)._factory) && (b = b.toString());
        const c = self.exports,
            d = this;
        this.o = xa(b, c, a.worker);
        this.h = x();
        if (this.o) {
            if (c) this.o.on("message", function (e) {
                d.h[e.id](e.msg);
                delete d.h[e.id]
            });
            else this.o.onmessage = function (e) {
                e = e.data;
                d.h[e.id](e.msg);
                delete d.h[e.id]
            };
            this.o.postMessage({
                task: "init",
                factory: b,
                options: a
            })
        }
    }
    Q("add");
    Q("append");
    Q("search");
    Q("update");
    Q("remove");

    function Q(a) {
        P.prototype[a] = P.prototype[a + "Async"] = function () {
            const b = this,
                c = [].slice.call(arguments);
            var d = c[c.length - 1];
            let e;
            E(d) && (e = d, c.splice(c.length - 1, 1));
            d = new Promise(function (f) {
                setTimeout(function () {
                    b.h[++wa] = f;
                    b.o.postMessage({
                        task: a,
                        id: wa,
                        args: c
                    })
                })
            });
            return e ? (d.then(e), this) : d
        }
    }

    function xa(a, b, c) {
        let d;
        try {
            d = b ? eval('new (require("worker_threads")["Worker"])("/dist/node/node.js")') : a ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + va.toString()], {
                type: "text/javascript"
            }))) : new Worker(C(c) ? c : "worker/worker.js", {
                type: "module"
            })
        } catch (e) { }
        return d
    };

    function S(a) {
        if (!(this instanceof S)) return new S(a);
        var b = a.document || a.doc || a,
            c;
        this.K = [];
        this.h = [];
        this.A = [];
        this.register = x();
        this.key = (c = b.key || b.id) && T(c, this.A) || "id";
        this.m = v(a.fastupdate);
        this.C = (c = b.store) && !0 !== c && [];
        this.store = c && x();
        this.I = (c = b.tag) && T(c, this.A);
        this.l = c && x();
        this.cache = (c = a.cache) && new K(c);
        a.cache = !1;
        this.o = a.worker;
        this.async = !1;
        c = x();
        let d = b.index || b.field || b;
        C(d) && (d = [d]);
        for (let e = 0, f, g; e < d.length; e++) f = d[e], C(f) || (g = f, f = f.field), g = D(g) ? Object.assign({}, a, g) : a,
            this.o && (c[f] = new P(g), c[f].o || (this.o = !1)), this.o || (c[f] = new L(g, this.register)), this.K[e] = T(f, this.A), this.h[e] = f;
        if (this.C)
            for (a = b.store, C(a) && (a = [a]), b = 0; b < a.length; b++) this.C[b] = T(a[b], this.A);
        this.index = c
    }

    function T(a, b) {
        const c = a.split(":");
        let d = 0;
        for (let e = 0; e < c.length; e++) a = c[e], 0 <= a.indexOf("[]") && (a = a.substring(0, a.length - 2)) && (b[d] = !0), a && (c[d++] = a);
        d < c.length && (c.length = d);
        return 1 < d ? c : c[0]
    }

    function U(a, b) {
        if (C(b)) a = a[b];
        else
            for (let c = 0; a && c < b.length; c++) a = a[b[c]];
        return a
    }

    function V(a, b, c, d, e) {
        a = a[e];
        if (d === c.length - 1) b[e] = a;
        else if (a)
            if (a.constructor === Array)
                for (b = b[e] = Array(a.length), e = 0; e < a.length; e++) V(a, b, c, d, e);
            else b = b[e] || (b[e] = x()), e = c[++d], V(a, b, c, d, e)
    }

    function W(a, b, c, d, e, f, g, h) {
        if (a = a[g])
            if (d === b.length - 1) {
                if (a.constructor === Array) {
                    if (c[d]) {
                        for (b = 0; b < a.length; b++) e.add(f, a[b], !0, !0);
                        return
                    }
                    a = a.join(" ")
                }
                e.add(f, a, h, !0)
            } else if (a.constructor === Array)
                for (g = 0; g < a.length; g++) W(a, b, c, d, e, f, g, h);
            else g = b[++d], W(a, b, c, d, e, f, g, h)
    }
    t = S.prototype;
    t.add = function (a, b, c) {
        D(a) && (b = a, a = U(b, this.key));
        if (b && (a || 0 === a)) {
            if (!c && this.register[a]) return this.update(a, b);
            for (let d = 0, e, f; d < this.h.length; d++) f = this.h[d], e = this.K[d], C(e) && (e = [e]), W(b, e, this.A, 0, this.index[f], a, e[0], c);
            if (this.I) {
                let d = U(b, this.I),
                    e = x();
                C(d) && (d = [d]);
                for (let f = 0, g, h; f < d.length; f++)
                    if (g = d[f], !e[g] && (e[g] = 1, h = this.l[g] || (this.l[g] = []), !c || -1 === h.indexOf(a)))
                        if (h[h.length] = a, this.m) {
                            const k = this.register[a] || (this.register[a] = []);
                            k[k.length] = h
                        }
            }
            if (this.store && (!c || !this.store[a])) {
                let d;
                if (this.C) {
                    d = x();
                    for (let e = 0, f; e < this.C.length; e++) f = this.C[e], C(f) ? d[f] = b[f] : V(b, d, f, 0, f[0])
                }
                this.store[a] = d || b
            }
        }
        return this
    };
    t.append = function (a, b) {
        return this.add(a, b, !0)
    };
    t.update = function (a, b) {
        return this.remove(a).add(a, b)
    };
    t.remove = function (a) {
        D(a) && (a = U(a, this.key));
        if (this.register[a]) {
            for (var b = 0; b < this.h.length && (this.index[this.h[b]].remove(a, !this.o), !this.m); b++);
            if (this.I && !this.m)
                for (let c in this.l) {
                    b = this.l[c];
                    const d = b.indexOf(a); - 1 !== d && (1 < b.length ? b.splice(d, 1) : delete this.l[c])
                }
            this.store && delete this.store[a];
            delete this.register[a]
        }
        return this
    };
    t.search = function (a, b, c, d) {
        c || (!b && D(a) ? (c = a, a = c.query) : D(b) && (c = b, b = 0));
        let e = [],
            f = [],
            g, h, k, m, n, w, q = 0;
        if (c)
            if (c.constructor === Array) k = c, c = null;
            else {
                k = (g = c.pluck) || c.index || c.field;
                m = c.tag;
                h = this.store && c.enrich;
                n = "and" === c.bool;
                b = c.limit || 100;
                w = c.offset || 0;
                if (m && (C(m) && (m = [m]), !a)) {
                    for (let l = 0, p; l < m.length; l++)
                        if (p = ya.call(this, m[l], b, w, h)) e[e.length] = p, q++;
                    return q ? e : []
                }
                C(k) && (k = [k])
            }
        k || (k = this.h);
        n = n && (1 < k.length || m && 1 < m.length);
        const r = !d && (this.o || this.async) && [];
        for (let l = 0, p, z, B; l < k.length; l++) {
            let A;
            z = k[l];
            C(z) || (A = z, z = z.field);
            if (r) r[l] = this.index[z].searchAsync(a, b, A || c);
            else {
                d ? p = d[l] : p = this.index[z].search(a, b, A || c);
                B = p && p.length;
                if (m && B) {
                    const y = [];
                    let H = 0;
                    n && (y[0] = [p]);
                    for (let Y = 0, qa, R; Y < m.length; Y++)
                        if (qa = m[Y], B = (R = this.l[qa]) && R.length) H++, y[y.length] = n ? [R] : R;
                    H && (p = n ? ma(y, b || 100, w || 0) : na(p, y), B = p.length)
                }
                if (B) f[q] = z, e[q++] = p;
                else if (n) return []
            }
        }
        if (r) {
            const l = this;
            return new Promise(function (p) {
                Promise.all(r).then(function (z) {
                    p(l.search(a, b, c, z))
                })
            })
        }
        if (!q) return [];
        if (g && (!h || !this.store)) return e[0];
        for (let l = 0, p; l < f.length; l++) {
            p = e[l];
            p.length && h && (p = za.call(this, p));
            if (g) return p;
            e[l] = {
                field: f[l],
                result: p
            }
        }
        return e
    };

    function ya(a, b, c, d) {
        let e = this.l[a],
            f = e && e.length - c;
        if (f && 0 < f) {
            if (f > b || c) e = e.slice(c, c + b);
            d && (e = za.call(this, e));
            return {
                tag: a,
                result: e
            }
        }
    }

    function za(a) {
        const b = Array(a.length);
        for (let c = 0, d; c < a.length; c++) d = a[c], b[c] = {
            id: d,
            doc: this.store[d]
        };
        return b
    }
    t.contain = function (a) {
        return !!this.register[a]
    };
    t.get = function (a) {
        return this.store[a]
    };
    t.set = function (a, b) {
        this.store[a] = b;
        return this
    };
    t.searchCache = oa;
    t.export = function (a, b, c, d, e) {
        const f = this;
        return u(function* () {
            e || (e = 0);
            d || (d = 0);
            if (d < f.h.length) {
                var g = f.h[d],
                    h = f.index[g];
                b = f;
                (yield h.export(a, b, e ? g.replace(":", "-") : "", d, e++)) || (d++, e = 1, yield b.export(a, b, g, d, e));
                return !0
            }
            switch (e) {
                case 1:
                    g = "tag";
                    h = f.l;
                    break;
                case 2:
                    g = "store";
                    h = f.store;
                    break;
                default:
                    return !0
            }
            return yield ra(a, f, g, d, e, h)
        }())
    };
    t.import = function (a, b) {
        if (b) switch (C(b) && (b = JSON.parse(b)), a) {
            case "tag":
                this.l = b;
                break;
            case "reg":
                this.m = !1;
                this.register = b;
                for (let d = 0, e; d < this.h.length; d++) e = this.index[this.h[d]], e.register = b, e.m = !1;
                break;
            case "store":
                this.store = b;
                break;
            default:
                a = a.split(".");
                const c = a[0];
                a = a[1];
                c && a && this.index[c].import(a, b)
        }
    };
    la(S.prototype);
    var Ba = {
        encode: Aa,
        F: !1,
        G: ""
    };
    const Ca = [G("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"), "a", G("[\u00e8\u00e9\u00ea\u00eb]"), "e", G("[\u00ec\u00ed\u00ee\u00ef]"), "i", G("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"), "o", G("[\u00f9\u00fa\u00fb\u00fc\u0171]"), "u", G("[\u00fd\u0177\u00ff]"), "y", G("\u00f1"), "n", G("[\u00e7c]"), "k", G("\u00df"), "s", G(" & "), " and "];

    function Aa(a) {
        var b = a = "" + a;
        b.normalize && (b = b.normalize("NFD").replace(ea, ""));
        return ca.call(this, b.toLowerCase(), !a.normalize && Ca)
    };
    var Ea = {
        encode: Da,
        F: !1,
        G: "strict"
    };
    const Fa = /[^a-z0-9]+/,
        Ga = {
            b: "p",
            v: "f",
            w: "f",
            z: "s",
            x: "s",
            "\u00df": "s",
            d: "t",
            n: "m",
            c: "k",
            g: "k",
            j: "k",
            q: "k",
            i: "e",
            y: "e",
            u: "o"
        };

    function Da(a) {
        a = Aa.call(this, a).join(" ");
        const b = [];
        if (a) {
            const c = a.split(Fa),
                d = c.length;
            for (let e = 0, f, g = 0; e < d; e++)
                if ((a = c[e]) && (!this.filter || !this.filter[a])) {
                    f = a[0];
                    let h = Ga[f] || f,
                        k = h;
                    for (let m = 1; m < a.length; m++) {
                        f = a[m];
                        const n = Ga[f] || f;
                        n && n !== k && (h += n, k = n)
                    }
                    b[g++] = h
                }
        }
        return b
    };
    var Ia = {
        encode: Ha,
        F: !1,
        G: ""
    };
    const Ja = [G("ae"), "a", G("oe"), "o", G("sh"), "s", G("th"), "t", G("ph"), "f", G("pf"), "f", G("(?![aeo])h(?![aeo])"), "", G("(?!^[aeo])h(?!^[aeo])"), ""];

    function Ha(a, b) {
        a && (a = Da.call(this, a).join(" "), 2 < a.length && (a = F(a, Ja)), b || (1 < a.length && (a = ha(a)), a && (a = a.split(" "))));
        return a || []
    };
    var La = {
        encode: Ka,
        F: !1,
        G: ""
    };
    const Ma = G("(?!\\b)[aeo]");

    function Ka(a) {
        a && (a = Ha.call(this, a, !0), 1 < a.length && (a = a.replace(Ma, "")), 1 < a.length && (a = ha(a)), a && (a = a.split(" ")));
        return a || []
    };
    I["latin:default"] = ja;
    I["latin:simple"] = Ba;
    I["latin:balance"] = Ea;
    I["latin:advanced"] = Ia;
    I["latin:extra"] = La;
    const X = self;
    let Z;
    const Na = {
        Index: L,
        Document: S,
        Worker: P,
        registerCharset: function (a, b) {
            I[a] = b
        },
        registerLanguage: function (a, b) {
            ka[a] = b
        }
    };
    (Z = X.define) && Z.amd ? Z([], function () {
        return Na
    }) : X.exports ? X.exports = Na : X.FlexSearch = Na;
}(this));