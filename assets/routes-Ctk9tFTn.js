import {
    a as e,
    c as t,
    i as n,
    l as r,
    n as i,
    o as a,
    r as o,
    s,
    t as c
} from "./index-C8NxVx92.js";

function l(e) {
    if (Array.isArray(e)) return e.flatMap(e => l(e));
    if (typeof e != `string`) return [];
    let t = [],
        n = 0,
        r, i, a, o, s, c = () => {
            for (; n < e.length && /\s/.test(e.charAt(n));) n += 1;
            return n < e.length
        },
        u = () => (i = e.charAt(n), i !== `=` && i !== `;` && i !== `,`);
    for (; n < e.length;) {
        for (r = n, s = !1; c();)
            if (i = e.charAt(n), i === `,`) {
                for (a = n, n += 1, c(), o = n; n < e.length && u();) n += 1;
                n < e.length && e.charAt(n) === `=` ? (s = !0, n = o, t.push(e.slice(r, a)), r = n) : n = a + 1
            } else n += 1;
        (!s || n >= e.length) && t.push(e.slice(r))
    }
    return t
}

function u(e) {
    return e instanceof Headers ? e : Array.isArray(e) || typeof e == `object` ? new Headers(e) : null
}

function ee(...e) {
    return e.reduce((e, t) => {
        let n = u(t);
        if (!n) return e;
        for (let [t, r] of n.entries()) t === `set-cookie` ? l(r).forEach(t => e.append(`set-cookie`, t)) : e.set(t, r);
        return e
    }, new Headers)
}
var d = r(t(), 1);

function te(e) {
    let t = c();
    return d.useCallback(async (...r) => {
        try {
            let t = await e(...r);
            if (n(t)) throw t;
            return t
        } catch (e) {
            if (n(e)) return e.options._fromLocation = t.stores.location.get(), t.navigate(t.resolveRedirect(e).options);
            throw e
        }
    }, [t, e])
}

function f(e) {
    return e !== `__proto__` && e !== `constructor` && e !== `prototype`
}

function p(e, t) {
    let n = Object.create(null);
    if (e)
        for (let t of Object.keys(e)) f(t) && (n[t] = e[t]);
    if (t && typeof t == `object`)
        for (let e of Object.keys(t)) f(e) && (n[e] = t[e]);
    return n
}

function m(e) {
    if (!e) return Object.create(null);
    let t = Object.create(null);
    for (let n of Object.keys(e)) f(n) && (t[n] = e[n]);
    return t
}
var h = () => {
        throw Error(`createServerOnlyFn() functions can only be called on the server!`)
    },
    g = (t, n) => {
        let r = n || t || {};
        r.method === void 0 && (r.method = `GET`);
        let i = e => g(void 0, { ...r,
            validator: e,
            inputValidator: e
        });
        return Object.assign(e => g(void 0, { ...r,
            ...e
        }), {
            options: r,
            middleware: e => {
                let t = [...r.middleware || []];
                e.forEach(e => {
                    s in e ? e.options.middleware && t.push(...e.options.middleware) : t.push(e)
                });
                let n = g(void 0, { ...r,
                    middleware: t
                });
                return n[s] = !0, n
            },
            validator: i,
            inputValidator: i,
            handler: (...t) => {
                let [n, i] = t, a = { ...r,
                    extractedFn: n,
                    serverFn: i
                }, o = [...a.middleware || [], ie(a)];
                return n.method = r.method, Object.assign(async t => {
                    let r = await _(o, `client`, { ...n,
                            ...a,
                            data: t ? .data,
                            headers: t ? .headers,
                            signal: t ? .signal,
                            fetch: t ? .fetch,
                            context: m()
                        }),
                        i = e(r.error);
                    if (i) throw i;
                    if (r.error) throw r.error;
                    return r.result
                }, { ...n,
                    method: r.method,
                    __executeServer: async e => {
                        let t = h(),
                            i = t.contextAfterGlobalMiddlewares;
                        return await _(o, `server`, { ...n,
                            data: e.data,
                            method: e.method ? ? r.method,
                            serverFnMeta: n.serverFnMeta,
                            context: p(e.context, i),
                            request: t.request
                        }).then(e => ({
                            result: e.result,
                            error: e.error,
                            context: e.sendContext
                        }))
                    }
                })
            }
        })
    };
async function _(e, t, r) {
    let i = ne([...a() ? .functionMiddleware || [], ...e]);
    if (t === `server`) {
        let e = h({
            throwIfNotFound: !1
        });
        e ? .executedRequestMiddlewares && (i = i.filter(t => !e.executedRequestMiddlewares.has(t)))
    }
    let o = async e => {
        let r = i.shift();
        if (!r) return e;
        try {
            let i = `validator` in r.options ? r.options.validator : void 0;
            !i && `inputValidator` in r.options && (i = r.options.inputValidator), i && t === `server` && (e.data = await re(i, e.data));
            let a;
            if (t === `client` ? `client` in r.options && (a = r.options.client) : `server` in r.options && (a = r.options.server), a) {
                let t = async (t = {}) => {
                        let n = await o({ ...e,
                            ...t,
                            context: p(e.context, t.context),
                            sendContext: p(e.sendContext, t.sendContext),
                            headers: ee(e.headers, t.headers),
                            _callSiteFetch: e._callSiteFetch,
                            fetch: e._callSiteFetch ? ? t.fetch ? ? e.fetch,
                            result: t.result === void 0 ? t instanceof Response ? t : e.result : t.result,
                            error: t.error ? ? e.error
                        });
                        if (n.error) throw n.error;
                        return n
                    },
                    r = await a({ ...e,
                        next: t
                    });
                if (n(r)) return { ...e,
                    error: r
                };
                if (r instanceof Response) return { ...e,
                    result: r
                };
                if (!r) throw Error(`User middleware returned undefined. You must call next() or return a result in your middlewares.`);
                return r
            }
            return o(e)
        } catch (t) {
            return { ...e,
                error: t
            }
        }
    };
    return o({ ...r,
        headers: r.headers || {},
        sendContext: r.sendContext || {},
        context: r.context || m(),
        _callSiteFetch: r.fetch
    })
}

function ne(e, t = 100) {
    let n = new Set,
        r = [],
        i = (e, a) => {
            if (a > t) throw Error(`Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`);
            e.forEach(e => {
                e.options.middleware && i(e.options.middleware, a + 1), n.has(e) || (n.add(e), r.push(e))
            })
        };
    return i(e, 0), r
}
async function re(e, t) {
    if (e == null) return {};
    if (`~standard` in e) {
        let n = await e[`~standard`].validate(t);
        if (n.issues) throw Error(JSON.stringify(n.issues, void 0, 2));
        return n.value
    }
    if (`parse` in e) return e.parse(t);
    if (typeof e == `function`) return e(t);
    throw Error(`Invalid validator type!`)
}

function ie(e) {
    return {
        "~types": void 0,
        options: {
            inputValidator: e.validator ? ? e.inputValidator,
            client: async ({
                next: t,
                sendContext: n,
                fetch: r,
                ...i
            }) => {
                let a = { ...i,
                    context: n,
                    fetch: r
                };
                return t(await e.extractedFn ? .(a))
            },
            server: async ({
                next: t,
                ...n
            }) => {
                let r = await e.serverFn ? .(n);
                return t({ ...n,
                    result: r
                })
            }
        }
    }
}
var v = (...e) => e.filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t).join(` `).trim(),
    ae = e => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
    oe = e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()),
    y = e => {
        let t = oe(e);
        return t.charAt(0).toUpperCase() + t.slice(1)
    },
    b = {
        xmlns: `http://www.w3.org/2000/svg`,
        width: 24,
        height: 24,
        viewBox: `0 0 24 24`,
        fill: `none`,
        stroke: `currentColor`,
        strokeWidth: 2,
        strokeLinecap: `round`,
        strokeLinejoin: `round`
    },
    x = e => {
        for (let t in e)
            if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
        return !1
    },
    S = (0, d.forwardRef)(({
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
    }, c) => (0, d.createElement)(`svg`, {
        ref: c,
        ...b,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? Number(n) * 24 / Number(t) : n,
        className: v(`lucide`, i),
        ...!a && !x(s) && {
            "aria-hidden": `true`
        },
        ...s
    }, [...o.map(([e, t]) => (0, d.createElement)(e, t)), ...Array.isArray(a) ? a : [a]])),
    C = (e, t) => {
        let n = (0, d.forwardRef)(({
            className: n,
            ...r
        }, i) => (0, d.createElement)(S, {
            ref: i,
            iconNode: t,
            className: v(`lucide-${ae(y(e))}`, `lucide-${e}`, n),
            ...r
        }));
        return n.displayName = y(e), n
    },
    w = C(`arrow-right`, [
        [`path`, {
            d: `M5 12h14`,
            key: `1ays0h`
        }],
        [`path`, {
            d: `m12 5 7 7-7 7`,
            key: `xquz4c`
        }]
    ]),
    se = C(`briefcase`, [
        [`path`, {
            d: `M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16`,
            key: `jecpp`
        }],
        [`rect`, {
            width: `20`,
            height: `14`,
            x: `2`,
            y: `6`,
            rx: `2`,
            key: `i6l2r4`
        }]
    ]),
    ce = C(`bug`, [
        [`path`, {
            d: `M12 20v-9`,
            key: `1qisl0`
        }],
        [`path`, {
            d: `M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z`,
            key: `uouzyp`
        }],
        [`path`, {
            d: `M14.12 3.88 16 2`,
            key: `qol33r`
        }],
        [`path`, {
            d: `M21 21a4 4 0 0 0-3.81-4`,
            key: `1b0z45`
        }],
        [`path`, {
            d: `M21 5a4 4 0 0 1-3.55 3.97`,
            key: `5cxbf6`
        }],
        [`path`, {
            d: `M22 13h-4`,
            key: `1jl80f`
        }],
        [`path`, {
            d: `M3 21a4 4 0 0 1 3.81-4`,
            key: `1fjd4g`
        }],
        [`path`, {
            d: `M3 5a4 4 0 0 0 3.55 3.97`,
            key: `1d7oge`
        }],
        [`path`, {
            d: `M6 13H2`,
            key: `82j7cp`
        }],
        [`path`, {
            d: `m8 2 1.88 1.88`,
            key: `fmnt4t`
        }],
        [`path`, {
            d: `M9 7.13V6a3 3 0 1 1 6 0v1.13`,
            key: `1vgav8`
        }]
    ]),
    T = C(`check`, [
        [`path`, {
            d: `M20 6 9 17l-5-5`,
            key: `1gmf2c`
        }]
    ]),
    le = C(`code-xml`, [
        [`path`, {
            d: `m18 16 4-4-4-4`,
            key: `1inbqp`
        }],
        [`path`, {
            d: `m6 8-4 4 4 4`,
            key: `15zrgr`
        }],
        [`path`, {
            d: `m14.5 4-5 16`,
            key: `e7oirm`
        }]
    ]),
    E = C(`external-link`, [
        [`path`, {
            d: `M15 3h6v6`,
            key: `1q9fwt`
        }],
        [`path`, {
            d: `M10 14 21 3`,
            key: `gplh6r`
        }],
        [`path`, {
            d: `M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,
            key: `a6xqqp`
        }]
    ]),
    ue = C(`facebook`, [
        [`path`, {
            d: `M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z`,
            key: `1jg4f8`
        }]
    ]),
    de = C(`gauge`, [
        [`path`, {
            d: `m12 14 4-4`,
            key: `9kzdfg`
        }],
        [`path`, {
            d: `M3.34 19a10 10 0 1 1 17.32 0`,
            key: `19p75a`
        }]
    ]),
    D = C(`globe`, [
        [`circle`, {
            cx: `12`,
            cy: `12`,
            r: `10`,
            key: `1mglay`
        }],
        [`path`, {
            d: `M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,
            key: `13o1zl`
        }],
        [`path`, {
            d: `M2 12h20`,
            key: `9i4pu4`
        }]
    ]),
    O = C(`layers`, [
        [`path`, {
            d: `M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,
            key: `zw3jo`
        }],
        [`path`, {
            d: `M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,
            key: `1wduqc`
        }],
        [`path`, {
            d: `M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,
            key: `kqbvx6`
        }]
    ]),
    k = C(`linkedin`, [
        [`path`, {
            d: `M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z`,
            key: `c2jq9f`
        }],
        [`rect`, {
            width: `4`,
            height: `12`,
            x: `2`,
            y: `9`,
            key: `mk3on5`
        }],
        [`circle`, {
            cx: `4`,
            cy: `4`,
            r: `2`,
            key: `bt5ra8`
        }]
    ]),
    A = C(`loader-circle`, [
        [`path`, {
            d: `M21 12a9 9 0 1 1-6.219-8.56`,
            key: `13zald`
        }]
    ]),
    j = C(`mail`, [
        [`path`, {
            d: `m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`,
            key: `132q7q`
        }],
        [`rect`, {
            x: `2`,
            y: `4`,
            width: `20`,
            height: `16`,
            rx: `2`,
            key: `izxlao`
        }]
    ]),
    M = C(`menu`, [
        [`path`, {
            d: `M4 5h16`,
            key: `1tepv9`
        }],
        [`path`, {
            d: `M4 12h16`,
            key: `1lakjw`
        }],
        [`path`, {
            d: `M4 19h16`,
            key: `1djgab`
        }]
    ]),
    N = C(`message-circle`, [
        [`path`, {
            d: `M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,
            key: `1sd12s`
        }]
    ]),
    P = C(`mouse-pointer-click`, [
        [`path`, {
            d: `M14 4.1 12 6`,
            key: `ita8i4`
        }],
        [`path`, {
            d: `m5.1 8-2.9-.8`,
            key: `1go3kf`
        }],
        [`path`, {
            d: `m6 12-1.9 2`,
            key: `mnht97`
        }],
        [`path`, {
            d: `M7.2 2.2 8 5.1`,
            key: `1cfko1`
        }],
        [`path`, {
            d: `M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z`,
            key: `s0h3yz`
        }]
    ]),
    F = C(`panels-top-left`, [
        [`rect`, {
            width: `18`,
            height: `18`,
            x: `3`,
            y: `3`,
            rx: `2`,
            key: `afitv7`
        }],
        [`path`, {
            d: `M3 9h18`,
            key: `1pudct`
        }],
        [`path`, {
            d: `M9 21V9`,
            key: `1oto5p`
        }]
    ]),
    I = C(`pen-tool`, [
        [`path`, {
            d: `M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z`,
            key: `nt11vn`
        }],
        [`path`, {
            d: `m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18`,
            key: `15qc1e`
        }],
        [`path`, {
            d: `m2.3 2.3 7.286 7.286`,
            key: `1wuzzi`
        }],
        [`circle`, {
            cx: `11`,
            cy: `11`,
            r: `2`,
            key: `xmgehs`
        }]
    ]),
    L = C(`quote`, [
        [`path`, {
            d: `M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z`,
            key: `rib7q0`
        }],
        [`path`, {
            d: `M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z`,
            key: `1ymkrd`
        }]
    ]),
    R = C(`refresh-cw`, [
        [`path`, {
            d: `M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,
            key: `v9h5vc`
        }],
        [`path`, {
            d: `M21 3v5h-5`,
            key: `1q7to0`
        }],
        [`path`, {
            d: `M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,
            key: `3uifl3`
        }],
        [`path`, {
            d: `M8 16H3v5`,
            key: `1cv678`
        }]
    ]),
    z = C(`rocket`, [
        [`path`, {
            d: `M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5`,
            key: `qeys4`
        }],
        [`path`, {
            d: `M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09`,
            key: `u4xsad`
        }],
        [`path`, {
            d: `M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z`,
            key: `676m9`
        }],
        [`path`, {
            d: `M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05`,
            key: `92ym6u`
        }]
    ]),
    B = C(`search`, [
        [`path`, {
            d: `m21 21-4.34-4.34`,
            key: `14j7rj`
        }],
        [`circle`, {
            cx: `11`,
            cy: `11`,
            r: `8`,
            key: `4ej97u`
        }]
    ]),
    V = C(`shopping-cart`, [
        [`circle`, {
            cx: `8`,
            cy: `21`,
            r: `1`,
            key: `jimo8o`
        }],
        [`circle`, {
            cx: `19`,
            cy: `21`,
            r: `1`,
            key: `13723u`
        }],
        [`path`, {
            d: `M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12`,
            key: `9zh506`
        }]
    ]),
    H = C(`sparkles`, [
        [`path`, {
            d: `M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,
            key: `1s2grr`
        }],
        [`path`, {
            d: `M20 2v4`,
            key: `1rf3ol`
        }],
        [`path`, {
            d: `M22 4h-4`,
            key: `gwowj6`
        }],
        [`circle`, {
            cx: `4`,
            cy: `20`,
            r: `2`,
            key: `6kqj1y`
        }]
    ]),
    fe = C(`x`, [
        [`path`, {
            d: `M18 6 6 18`,
            key: `1bl5f8`
        }],
        [`path`, {
            d: `m6 6 12 12`,
            key: `d8bk6v`
        }]
    ]),
    pe = `/assets/p-organic-G_N0W0AS.jpg`,
    me = `/assets/p-dental-CYWvCd0w.jpg`,
    he = `/assets/p-school-Dvlnw6ay.jpg`,
    ge = `/assets/p-pet-BqPKl_-A.jpg`,
    _e = `/assets/p-auto-HvV9CJBU.jpg`,
    ve = `/assets/p-business-sjYUplV_.jpg`,
    ye = `/assets/p-gym-C8jjGzkz.jpg`,
    be = `/assets/p-hospital--C-3NI-x.jpg`,
    xe = g({
        method: `POST`
    }).handler(o(`bfc58e38526e386b627e19f63d250a4d355f802382e95ae552292485a1839117`)),
    U = i();

function Se({
    projects: e,
    services: t
}) {
    let n = te(xe),
        [r, i] = (0, d.useState)(``),
        [a, o] = (0, d.useState)(!1),
        [s, c] = (0, d.useState)(``),
        [l, u] = (0, d.useState)(null);
    return (0, U.jsxs)(`div`, {
        className: `glass rounded-3xl p-6 md:p-8`,
        children: [(0, U.jsxs)(`form`, {
            onSubmit: async i => {
                if (i.preventDefault(), r.trim().length < 10) return c(`Please describe your project in a bit more detail.`);
                o(!0), c(``);
                try {
                    let i = await n({
                        data: {
                            need: r,
                            projects: e.map(({
                                t: e,
                                c: t,
                                d: n
                            }) => ({
                                t: e,
                                c: t,
                                d: n
                            })),
                            services: t
                        }
                    });
                    i.error ? c(i.error) : u(i.result ? ? null)
                } catch {
                    c(`Something went wrong. Please try again.`)
                } finally {
                    o(!1)
                }
            },
            className: `grid gap-4`,
            children: [(0, U.jsxs)(`label`, {
                className: `grid gap-2 text-sm`,
                children: [`Tell me about your project`, (0, U.jsx)(`textarea`, {
                    value: r,
                    onChange: e => i(e.target.value),
                    rows: 4,
                    maxLength: 1500,
                    placeholder: `e.g. I run a small bakery and want an online shop with delivery and a clean, modern look.`,
                    className: `rounded-xl border border-input bg-secondary px-4 py-3 outline-none focus:border-primary`
                })]
            }), (0, U.jsxs)(`button`, {
                disabled: a,
                className: `inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60 sm:w-fit`,
                children: [a ? (0, U.jsx)(A, {
                    className: `h-4 w-4 animate-spin`
                }) : (0, U.jsx)(H, {
                    className: `h-4 w-4`
                }), a ? `Finding matches…` : `Get Recommendations`]
            }), s && (0, U.jsx)(`p`, {
                role: `alert`,
                className: `text-sm text-destructive`,
                children: s
            })]
        }), l && (0, U.jsxs)(`div`, {
            className: `mt-8 space-y-6`,
            "aria-live": `polite`,
            children: [(0, U.jsx)(`p`, {
                className: `text-muted-foreground`,
                children: l.summary
            }), (0, U.jsxs)(`div`, {
                children: [(0, U.jsx)(`h3`, {
                    className: `font-semibold`,
                    children: `Recommended services`
                }), (0, U.jsx)(`ul`, {
                    className: `mt-3 grid gap-3 sm:grid-cols-2`,
                    children: l.services.map(e => (0, U.jsxs)(`li`, {
                        className: `rounded-2xl border border-border bg-secondary p-4`,
                        children: [(0, U.jsx)(`p`, {
                            className: `font-medium text-primary`,
                            children: e.title
                        }), (0, U.jsx)(`p`, {
                            className: `mt-1 text-sm text-muted-foreground`,
                            children: e.reason
                        })]
                    }, e.title))
                })]
            }), (0, U.jsxs)(`div`, {
                children: [(0, U.jsx)(`h3`, {
                    className: `font-semibold`,
                    children: `Similar work`
                }), (0, U.jsx)(`ul`, {
                    className: `mt-3 grid gap-4 sm:grid-cols-3`,
                    children: l.projects.map(t => {
                        let n = e.find(e => e.t === t.title);
                        return (0, U.jsxs)(`li`, {
                            className: `overflow-hidden rounded-2xl border border-border bg-secondary`,
                            children: [n && (0, U.jsx)(`img`, {
                                src: n.img,
                                alt: `${t.title} mockup`,
                                className: `aspect-[4/3] w-full object-cover`,
                                loading: `lazy`
                            }), (0, U.jsxs)(`div`, {
                                className: `p-4`,
                                children: [(0, U.jsx)(`p`, {
                                    className: `font-medium`,
                                    children: t.title
                                }), (0, U.jsx)(`p`, {
                                    className: `mt-1 text-sm text-muted-foreground`,
                                    children: t.reason
                                })]
                            })]
                        }, t.title)
                    })
                })]
            }), (0, U.jsxs)(`a`, {
                href: `#contact`,
                className: `inline-flex items-center gap-2 text-sm font-semibold text-primary`,
                children: [`Discuss this project `, (0, U.jsx)(w, {
                    className: `h-4 w-4`
                })]
            })]
        })]
    })
}
var Ce = {
        version: 1,
        asset_id: `0e59268b-7f34-41b8-b818-d97d671173a0`,
        project_id: `729712bf-979c-40d7-9d62-27c8c75d21d6`,
        url: `/__l5e/assets-v1/0e59268b-7f34-41b8-b818-d97d671173a0/jahirul-islam-portrait.jpg`,
        r2_key: `a/v1/729712bf-979c-40d7-9d62-27c8c75d21d6/0e59268b-7f34-41b8-b818-d97d671173a0/jahirul-islam-portrait.jpg`,
        original_filename: `jahirul-islam-portrait.jpg`,
        size: 47246,
        content_type: `image/jpeg`,
        created_at: `2026-11-05T17:29:33Z`
    },
    W = `phpjim1981@gmail.com`,
    G = `https://wa.me/8801871617839`,
    K = `https://www.linkedin.com/in/jahirul-islam-890543137/`,
    we = `https://www.facebook.com/md.jahirul.islam.828546`,
    q = `https://www.freelancer.com/u/devjahir1981`,
    J = [
        [`About`, `#about`],
        [`Services`, `#services`],
        [`Skills`, `#skills`],
        [`Work`, `#work`],
        [`Process`, `#process`],
        [`Contact`, `#contact`]
    ],
    Y = [{
        icon: D,
        t: `WordPress Website Design`,
        d: `Custom, brand-aligned WordPress sites that are easy for you to manage.`
    }, {
        icon: F,
        t: `Elementor Development`,
        d: `Pixel-precise Elementor builds with reusable templates and global styles.`
    }, {
        icon: V,
        t: `WooCommerce Online Store`,
        d: `Stores with payments, shipping, and product setup ready to sell.`
    }, {
        icon: se,
        t: `Business Website Design`,
        d: `Professional sites that build trust and turn visitors into leads.`
    }, {
        icon: P,
        t: `Landing Page Design`,
        d: `Focused, high-converting pages for campaigns and product launches.`
    }, {
        icon: R,
        t: `Website Redesign`,
        d: `Modernize outdated sites with a fresh look and better structure.`
    }, {
        icon: de,
        t: `Speed Optimization`,
        d: `Faster load times through caching, image and code optimization.`
    }, {
        icon: ce,
        t: `WordPress Bug Fixing`,
        d: `Quick fixes for errors, broken layouts, plugin conflicts and more.`
    }],
    Te = [{
        g: `Frontend`,
        items: [`HTML5`, `CSS3`, `JavaScript`, `Bootstrap`, `jQuery`]
    }, {
        g: `Backend`,
        items: [`PHP`, `MySQL`]
    }, {
        g: `CMS & Builders`,
        items: [`WordPress`, `Elementor`, `WooCommerce`]
    }, {
        g: `Design`,
        items: [`Figma`, `Responsive UI/UX`]
    }],
    Ee = [`All`, `Business`, `Ecommerce`, `Landing Pages`, `Healthcare`, `Education`, `Creative`],
    X = [{
        t: `Organic Food Ecommerce`,
        c: `Ecommerce`,
        img: pe,
        d: `Fresh-produce store with product filters and smooth checkout.`,
        tech: [`WordPress`, `WooCommerce`, `Elementor`],
        live: `https://kommodo.ai/i/5OHQDzhWb3DpqwUG7Pei`
    }, {
        t: `Modern Dental Clinic`,
        c: `Healthcare`,
        img: me,
        d: `Clinic site with services, team and appointment booking.`,
        tech: [`WordPress`, `Elementor`],
        live: `https://kommodo.ai/i/6ryn3QRyhht0CMQeZPzU`
    }, {
        t: `School Management Software`,
        c: `Education`,
        img: he,
        d: `Dashboard for students, teachers, classes and attendance.`,
        tech: [`PHP`, `MySQL`, `Bootstrap`],
        live: `https://kommodo.ai/i/zH5M8fAIXedMoyaa9jR8`
    }, {
        t: `Pet Accessories Store`,
        c: `Ecommerce`,
        img: ge,
        d: `Playful shop for pet products with best-seller highlights.`,
        tech: [`WooCommerce`, `Elementor`],
        live: `https://kommodo.ai/i/AJmFWxbNoGxAHcTswKJX`
    }, {
        t: `Auto Repair & Car Wash`,
        c: `Business`,
        img: _e,
        d: `Bold service site with booking calls-to-action.`,
        tech: [`WordPress`, `Elementor`],
        live: `https://kommodo.ai/i/2xROOKwbqdGOR0RGt2Nw`
    }, {
        t: `Premium Business Website`,
        c: `Creative`,
        img: ve,
        d: `Elegant consulting site with refined typography.`,
        tech: [`WordPress`, `Elementor`],
        live: ``
    }, {
        t: `Fitness & Gym Website`,
        c: `Landing Pages`,
        img: ye,
        d: `High-energy landing page for memberships and programs.`,
        tech: [`Elementor`, `JavaScript`],
        live: ``
    }, {
        t: `Hospital Management`,
        c: `Healthcare`,
        img: be,
        d: `Admin panel for patients, departments and appointments.`,
        tech: [`PHP`, `MySQL`, `jQuery`],
        live: ``
    }],
    De = [{
        icon: B,
        t: `Discovery & Planning`,
        d: `Understanding your goals, audience and project scope.`
    }, {
        icon: I,
        t: `UI/UX Design`,
        d: `Wireframes and visual design shaped around your brand.`
    }, {
        icon: le,
        t: `Development & Testing`,
        d: `Clean builds tested across devices and browsers.`
    }, {
        icon: z,
        t: `Launch & Support`,
        d: `Smooth go-live, training, and ongoing maintenance.`
    }];

function Z({
    id: e,
    eyebrow: t,
    title: n,
    children: r
}) {
    return (0, U.jsx)(`section`, {
        id: e,
        className: `scroll-mt-24 px-5 py-24 md:py-32`,
        children: (0, U.jsxs)(`div`, {
            className: `mx-auto max-w-6xl`,
            children: [(0, U.jsx)(`p`, {
                className: `text-sm font-semibold uppercase tracking-[0.2em] text-primary`,
                children: t
            }), (0, U.jsx)(`h2`, {
                className: `mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl`,
                children: n
            }), (0, U.jsx)(`div`, {
                className: `mt-14`,
                children: r
            })]
        })
    })
}
var Q = `inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 hover:-translate-y-0.5`,
    $ = `inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold transition hover:border-primary/60`;

function Oe() {
    let [e, t] = (0, d.useState)(!1), [n, r] = (0, d.useState)(`All`), i = n === `All` ? X : X.filter(e => e.c === n);
    return (0, U.jsxs)(`div`, {
        className: `relative overflow-x-hidden`,
        children: [(0, U.jsx)(`div`, {
            "aria-hidden": !0,
            className: `pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-glow`
        }), (0, U.jsxs)(`header`, {
            className: `fixed inset-x-0 top-0 z-50 px-4 pt-4`,
            children: [(0, U.jsxs)(`nav`, {
                "aria-label": `Main`,
                className: `glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3`,
                children: [(0, U.jsxs)(`a`, {
                    href: `#top`,
                    className: `flex items-center gap-2 font-bold`,
                    children: [(0, U.jsx)(`span`, {
                        className: `grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-sm text-primary-foreground`,
                        children: `JI`
                    }), (0, U.jsxs)(`span`, {
                        children: [`Jahirul`, (0, U.jsx)(`span`, {
                            className: `text-gradient`,
                            children: `.`
                        })]
                    })]
                }), (0, U.jsx)(`ul`, {
                    className: `hidden items-center gap-7 text-sm text-muted-foreground md:flex`,
                    children: J.map(([e, t]) => (0, U.jsx)(`li`, {
                        children: (0, U.jsx)(`a`, {
                            href: t,
                            className: `transition hover:text-foreground`,
                            children: e
                        })
                    }, t))
                }), (0, U.jsx)(`a`, {
                    href: `#contact`,
                    className: `hidden rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground md:inline-flex`,
                    children: `Hire Me`
                }), (0, U.jsx)(`button`, {
                    className: `md:hidden`,
                    "aria-label": e ? `Close menu` : `Open menu`,
                    "aria-expanded": e,
                    onClick: () => t(!e),
                    children: e ? (0, U.jsx)(fe, {}) : (0, U.jsx)(M, {})
                })]
            }), e && (0, U.jsx)(`ul`, {
                className: `glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden`,
                children: J.map(([e, n]) => (0, U.jsx)(`li`, {
                    children: (0, U.jsx)(`a`, {
                        href: n,
                        onClick: () => t(!1),
                        className: `block rounded-lg px-3 py-3 hover:bg-secondary`,
                        children: e
                    })
                }, n))
            })]
        }), (0, U.jsxs)(`main`, {
            id: `top`,
            children: [(0, U.jsx)(`section`, {
                className: `relative px-5 pb-24 pt-36 md:pt-44`,
                children: (0, U.jsxs)(`div`, {
                    className: `mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]`,
                    children: [(0, U.jsxs)(`div`, {
                        children: [(0, U.jsxs)(`span`, {
                            className: `glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium`,
                            children: [(0, U.jsx)(`span`, {
                                className: `h-2 w-2 animate-pulse rounded-full bg-success`
                            }), ` Available for Freelance Projects`]
                        }), (0, U.jsxs)(`h1`, {
                            className: `mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl`,
                            children: [`Building Modern Websites That `, (0, U.jsx)(`span`, {
                                className: `text-gradient`,
                                children: `Grow Your Business.`
                            })]
                        }), (0, U.jsx)(`p`, {
                            className: `mt-6 max-w-xl text-lg text-muted-foreground`,
                            children: `I'm Md. Jahirul Islam, a WordPress & Elementor Developer helping businesses build professional, responsive, and conversion-focused websites.`
                        }), (0, U.jsxs)(`div`, {
                            className: `mt-8 flex flex-wrap gap-3`,
                            children: [(0, U.jsxs)(`a`, {
                                href: `#work`,
                                className: Q,
                                children: [`View My Work `, (0, U.jsx)(w, {
                                    className: `h-4 w-4`
                                })]
                            }), (0, U.jsx)(`a`, {
                                href: `#contact`,
                                className: $,
                                children: `Let's Work Together`
                            })]
                        }), (0, U.jsx)(`dl`, {
                            className: `mt-12 flex gap-10`,
                            children: [
                                [`3+`, `Years Experience`],
                                [`300+`, `Projects Completed`]
                            ].map(([e, t]) => (0, U.jsxs)(`div`, {
                                children: [(0, U.jsx)(`dt`, {
                                    className: `text-4xl font-extrabold text-gradient`,
                                    children: e
                                }), (0, U.jsx)(`dd`, {
                                    className: `mt-1 text-sm text-muted-foreground`,
                                    children: t
                                })]
                            }, t))
                        })]
                    }), (0, U.jsxs)(`div`, {
                        className: `relative mx-auto w-full max-w-sm`,
                        children: [(0, U.jsx)(`div`, {
                            className: `absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-30 blur-2xl`
                        }), (0, U.jsx)(`div`, {
                            className: `glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2`,
                            children: (0, U.jsx)(`img`, {
                                src: Ce.url,
                                alt: `Md. Jahirul Islam, WordPress Developer from Bangladesh`,
                                className: `h-full w-full rounded-[1.6rem] object-cover`
                            })
                        }), (0, U.jsxs)(`div`, {
                            className: `glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 text-sm`,
                            children: [(0, U.jsx)(`p`, {
                                className: `font-semibold`,
                                children: `WordPress · Elementor`
                            }), (0, U.jsx)(`p`, {
                                className: `text-xs text-muted-foreground`,
                                children: `WooCommerce specialist`
                            })]
                        })]
                    })]
                })
            }), (0, U.jsx)(Z, {
                id: `about`,
                eyebrow: `About Me`,
                title: (0, U.jsxs)(U.Fragment, {
                    children: [`Crafting websites that look great `, (0, U.jsx)(`span`, {
                        className: `text-gradient`,
                        children: `and perform.`
                    })]
                }),
                children: (0, U.jsxs)(`div`, {
                    className: `grid gap-10 md:grid-cols-2`,
                    children: [(0, U.jsxs)(`div`, {
                        className: `space-y-5 text-muted-foreground`,
                        children: [(0, U.jsx)(`p`, {
                            children: `For over 3 years I've helped businesses, startups and entrepreneurs launch websites that represent their brand and drive real results. With more than 300 projects delivered, I specialize in WordPress, Elementor and WooCommerce.`
                        }), (0, U.jsx)(`p`, {
                            children: `From fast business sites and landing pages to fully featured online stores, I focus on clean design, mobile-first layouts, speed, and clear communication from first call to launch — and beyond.`
                        })]
                    }), (0, U.jsx)(`ul`, {
                        className: `grid grid-cols-2 gap-3`,
                        children: [`Custom WordPress`, `Elementor Pro`, `WooCommerce`, `Responsive Design`, `Speed & SEO basics`, `Maintenance`].map(e => (0, U.jsxs)(`li`, {
                            className: `glass flex items-center gap-2 rounded-xl px-4 py-3 text-sm`,
                            children: [(0, U.jsx)(T, {
                                className: `h-4 w-4 text-primary`
                            }), e]
                        }, e))
                    })]
                })
            }), (0, U.jsx)(Z, {
                id: `services`,
                eyebrow: `Services`,
                title: `What I can build for you`,
                children: (0, U.jsx)(`div`, {
                    className: `grid gap-5 sm:grid-cols-2 lg:grid-cols-4`,
                    children: Y.map(({
                        icon: e,
                        t,
                        d: n
                    }) => (0, U.jsxs)(`article`, {
                        className: `glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/50`,
                        children: [(0, U.jsx)(`div`, {
                            className: `grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground`,
                            children: (0, U.jsx)(e, {
                                className: `h-5 w-5`
                            })
                        }), (0, U.jsx)(`h3`, {
                            className: `mt-5 font-semibold`,
                            children: t
                        }), (0, U.jsx)(`p`, {
                            className: `mt-2 text-sm text-muted-foreground`,
                            children: n
                        })]
                    }, t))
                })
            }), (0, U.jsx)(Z, {
                id: `skills`,
                eyebrow: `Skills & Technologies`,
                title: `Tools I work with every day`,
                children: (0, U.jsx)(`div`, {
                    className: `grid gap-5 md:grid-cols-2`,
                    children: Te.map(({
                        g: e,
                        items: t
                    }) => (0, U.jsxs)(`div`, {
                        className: `glass rounded-2xl p-6`,
                        children: [(0, U.jsxs)(`h3`, {
                            className: `flex items-center gap-2 font-semibold`,
                            children: [(0, U.jsx)(O, {
                                className: `h-4 w-4 text-primary`
                            }), e]
                        }), (0, U.jsx)(`ul`, {
                            className: `mt-4 flex flex-wrap gap-2`,
                            children: t.map(e => (0, U.jsx)(`li`, {
                                className: `rounded-full border border-border bg-secondary px-3 py-1.5 text-sm`,
                                children: e
                            }, e))
                        })]
                    }, e))
                })
            }), (0, U.jsxs)(Z, {
                id: `work`,
                eyebrow: `Featured Projects`,
                title: `Selected demo work`,
                children: [(0, U.jsx)(`div`, {
                    role: `tablist`,
                    "aria-label": `Project categories`,
                    className: `flex flex-wrap gap-2`,
                    children: Ee.map(e => (0, U.jsx)(`button`, {
                        role: `tab`,
                        "aria-selected": n === e,
                        onClick: () => r(e),
                        className: `rounded-full px-4 py-2 text-sm font-medium transition ${n===e?`bg-gradient-brand text-primary-foreground`:`glass text-muted-foreground hover:text-foreground`}`,
                        children: e
                    }, e))
                }), (0, U.jsx)(`div`, {
                    className: `mt-10 grid gap-6 md:grid-cols-2`,
                    children: i.map(e => (0, U.jsxs)(`article`, {
                        className: `glass group overflow-hidden rounded-3xl transition hover:border-primary/50`,
                        children: [(0, U.jsx)(`div`, {
                            className: `overflow-hidden`,
                            children: (0, U.jsx)(`img`, {
                                src: e.img,
                                alt: `${e.t} website mockup`,
                                loading: `lazy`,
                                width: 1024,
                                height: 768,
                                className: `aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105`
                            })
                        }), (0, U.jsxs)(`div`, {
                            className: `p-6`,
                            children: [(0, U.jsxs)(`div`, {
                                className: `flex items-center justify-between gap-3`,
                                children: [(0, U.jsx)(`h3`, {
                                    className: `text-lg font-semibold`,
                                    children: e.t
                                }), (0, U.jsx)(`span`, {
                                    className: `rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground`,
                                    children: e.c
                                })]
                            }), (0, U.jsx)(`p`, {
                                className: `mt-2 text-sm text-muted-foreground`,
                                children: e.d
                            }), (0, U.jsx)(`ul`, {
                                className: `mt-4 flex flex-wrap gap-2`,
                                children: e.tech.map(e => (0, U.jsxs)(`li`, {
                                    className: `text-xs text-primary`,
                                    children: [`#`, e]
                                }, e))
                            }), (0, U.jsxs)(`div`, {
                                className: `mt-5 flex gap-3`,
                                children: [e.live ? (0, U.jsxs)(`a`, {
                                    href: e.live,
                                    target: `_blank`,
                                    rel: `noopener noreferrer`,
                                    className: `inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-primary-foreground`,
                                    children: [`Live Preview `, (0, U.jsx)(E, {
                                        className: `h-3.5 w-3.5`
                                    })]
                                }) : (0, U.jsx)(`span`, {
                                    className: `rounded-full border border-border px-4 py-2 text-xs text-muted-foreground`,
                                    children: `Preview coming soon`
                                }), (0, U.jsx)(`a`, {
                                    href: `#contact`,
                                    className: `inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary/60`,
                                    children: `Project Details`
                                })]
                            })]
                        })]
                    }, e.t))
                }), i.length === 0 && (0, U.jsx)(`p`, {
                    className: `mt-10 text-muted-foreground`,
                    children: `Projects in this category are coming soon.`
                })]
            }), (0, U.jsx)(Z, {
                id: `match`,
                eyebrow: `Find Your Fit`,
                title: (0, U.jsxs)(U.Fragment, {
                    children: [`Describe your project, `, (0, U.jsx)(`span`, {
                        className: `text-gradient`,
                        children: `get instant matches.`
                    })]
                }),
                children: (0, U.jsx)(Se, {
                    projects: X,
                    services: Y.map(({
                        t: e,
                        d: t
                    }) => ({
                        t: e,
                        d: t
                    }))
                })
            }), (0, U.jsx)(Z, {
                id: `experience`,
                eyebrow: `Work Experience`,
                title: `3+ years as a freelance WordPress developer`,
                children: (0, U.jsxs)(`div`, {
                    className: `glass rounded-3xl p-8 md:p-10`,
                    children: [(0, U.jsxs)(`div`, {
                        className: `flex flex-wrap items-baseline justify-between gap-3`,
                        children: [(0, U.jsx)(`h3`, {
                            className: `text-xl font-semibold`,
                            children: `Freelance WordPress Developer`
                        }), (0, U.jsx)(`span`, {
                            className: `text-sm text-muted-foreground`,
                            children: `Remote · 3+ years`
                        })]
                    }), (0, U.jsx)(`ul`, {
                        className: `mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3`,
                        children: [`Custom WordPress development`, `Elementor page building`, `WooCommerce setup`, `Responsive website design`, `Website maintenance`, `Clear client communication`].map(e => (0, U.jsxs)(`li`, {
                            className: `flex items-center gap-2 text-sm`,
                            children: [(0, U.jsx)(T, {
                                className: `h-4 w-4 text-primary`
                            }), e]
                        }, e))
                    })]
                })
            }), (0, U.jsx)(Z, {
                id: `process`,
                eyebrow: `Work Process`,
                title: `A simple, proven process`,
                children: (0, U.jsx)(`ol`, {
                    className: `grid gap-5 sm:grid-cols-2 lg:grid-cols-4`,
                    children: De.map(({
                        icon: e,
                        t,
                        d: n
                    }, r) => (0, U.jsxs)(`li`, {
                        className: `glass rounded-2xl p-6`,
                        children: [(0, U.jsxs)(`div`, {
                            className: `flex items-center justify-between`,
                            children: [(0, U.jsx)(e, {
                                className: `h-6 w-6 text-primary`
                            }), (0, U.jsxs)(`span`, {
                                className: `text-3xl font-extrabold text-gradient`,
                                children: [`0`, r + 1]
                            })]
                        }), (0, U.jsx)(`h3`, {
                            className: `mt-5 font-semibold`,
                            children: t
                        }), (0, U.jsx)(`p`, {
                            className: `mt-2 text-sm text-muted-foreground`,
                            children: n
                        })]
                    }, t))
                })
            }), (0, U.jsx)(Z, {
                id: `testimonials`,
                eyebrow: `Testimonials`,
                title: `What clients say`,
                children: (0, U.jsxs)(`div`, {
                    className: `glass rounded-3xl p-10 text-center`,
                    children: [(0, U.jsx)(L, {
                        className: `mx-auto h-8 w-8 text-primary`
                    }), (0, U.jsx)(`p`, {
                        className: `mx-auto mt-4 max-w-xl text-muted-foreground`,
                        children: `Client reviews will appear here soon. Meanwhile, see verified feedback on my Freelancer profile.`
                    }), (0, U.jsxs)(`a`, {
                        href: q,
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        className: `${$} mt-6`,
                        children: [`View Freelancer Profile `, (0, U.jsx)(E, {
                            className: `h-4 w-4`
                        })]
                    })]
                })
            }), (0, U.jsx)(Z, {
                id: `contact`,
                eyebrow: `Contact`,
                title: (0, U.jsxs)(U.Fragment, {
                    children: [`Have a Project in Mind? `, (0, U.jsx)(`span`, {
                        className: `text-gradient`,
                        children: `Let's Build Something Great.`
                    })]
                }),
                children: (0, U.jsxs)(`div`, {
                    className: `grid gap-8 lg:grid-cols-[1fr_1.4fr]`,
                    children: [(0, U.jsx)(`div`, {
                        className: `space-y-3`,
                        children: [{
                            I: j,
                            l: `Email`,
                            v: W,
                            h: `mailto:${W}`
                        }, {
                            I: N,
                            l: `WhatsApp`,
                            v: `+880 1871 617839`,
                            h: G
                        }, {
                            I: k,
                            l: `LinkedIn`,
                            v: `Jahirul Islam`,
                            h: K
                        }].map(({
                            I: e,
                            l: t,
                            v: n,
                            h: r
                        }) => (0, U.jsxs)(`a`, {
                            href: r,
                            target: `_blank`,
                            rel: `noopener noreferrer`,
                            className: `glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-primary/50`,
                            children: [(0, U.jsx)(`span`, {
                                className: `grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground`,
                                children: (0, U.jsx)(e, {
                                    className: `h-5 w-5`
                                })
                            }), (0, U.jsxs)(`span`, {
                                children: [(0, U.jsx)(`span`, {
                                    className: `block text-xs text-muted-foreground`,
                                    children: t
                                }), (0, U.jsx)(`span`, {
                                    className: `font-medium`,
                                    children: n
                                })]
                            })]
                        }, t))
                    }), (0, U.jsxs)(`form`, {
                        onSubmit: e => {
                            e.preventDefault();
                            let t = new FormData(e.currentTarget),
                                n = `Name: ${t.get(`name`)}\nEmail: ${t.get(`email`)}\nProject type: ${t.get(`type`)}\n\n${t.get(`message`)}`;
                            window.location.href = `mailto:${W}?subject=${encodeURIComponent(`New project inquiry — ${t.get(`type`)}`)}&body=${encodeURIComponent(n)}`
                        },
                        className: `glass grid gap-4 rounded-3xl p-6 md:p-8`,
                        children: [(0, U.jsxs)(`div`, {
                            className: `grid gap-4 sm:grid-cols-2`,
                            children: [(0, U.jsxs)(`label`, {
                                className: `grid gap-2 text-sm`,
                                children: [`Name`, (0, U.jsx)(`input`, {
                                    required: !0,
                                    name: `name`,
                                    maxLength: 100,
                                    className: `rounded-xl border border-input bg-secondary px-4 py-3 outline-none focus:border-primary`
                                })]
                            }), (0, U.jsxs)(`label`, {
                                className: `grid gap-2 text-sm`,
                                children: [`Email`, (0, U.jsx)(`input`, {
                                    required: !0,
                                    type: `email`,
                                    name: `email`,
                                    maxLength: 255,
                                    className: `rounded-xl border border-input bg-secondary px-4 py-3 outline-none focus:border-primary`
                                })]
                            })]
                        }), (0, U.jsxs)(`label`, {
                            className: `grid gap-2 text-sm`,
                            children: [`Project type`, (0, U.jsxs)(`select`, {
                                name: `type`,
                                className: `rounded-xl border border-input bg-secondary px-4 py-3 outline-none focus:border-primary`,
                                children: [Y.map(e => (0, U.jsx)(`option`, {
                                    children: e.t
                                }, e.t)), (0, U.jsx)(`option`, {
                                    children: `Other`
                                })]
                            })]
                        }), (0, U.jsxs)(`label`, {
                            className: `grid gap-2 text-sm`,
                            children: [`Message`, (0, U.jsx)(`textarea`, {
                                required: !0,
                                name: `message`,
                                rows: 5,
                                maxLength: 2e3,
                                className: `rounded-xl border border-input bg-secondary px-4 py-3 outline-none focus:border-primary`
                            })]
                        }), (0, U.jsxs)(`button`, {
                            type: `submit`,
                            className: `${Q} justify-center`,
                            children: [`Send Message `, (0, U.jsx)(w, {
                                className: `h-4 w-4`
                            })]
                        })]
                    })]
                })
            })]
        }), (0, U.jsxs)(`footer`, {
            className: `border-t border-border px-5 py-12`,
            children: [(0, U.jsxs)(`div`, {
                className: `mx-auto grid max-w-6xl gap-8 md:grid-cols-3`,
                children: [(0, U.jsxs)(`div`, {
                    children: [(0, U.jsx)(`p`, {
                        className: `text-lg font-bold`,
                        children: `Md. Jahirul Islam`
                    }), (0, U.jsx)(`p`, {
                        className: `mt-2 text-sm text-muted-foreground`,
                        children: `WordPress & Elementor Developer`
                    }), (0, U.jsx)(`div`, {
                        className: `mt-4 flex gap-3`,
                        children: [
                            [k, K, `LinkedIn`],
                            [ue, we, `Facebook`],
                            [D, q, `Freelancer`],
                            [N, G, `WhatsApp`]
                        ].map(([e, t, n]) => (0, U.jsx)(`a`, {
                            href: t,
                            "aria-label": n,
                            target: `_blank`,
                            rel: `noopener noreferrer`,
                            className: `glass grid h-10 w-10 place-items-center rounded-full hover:border-primary/60`,
                            children: (0, U.jsx)(e, {
                                className: `h-4 w-4`
                            })
                        }, n))
                    })]
                }), (0, U.jsxs)(`nav`, {
                    "aria-label": `Footer`,
                    children: [(0, U.jsx)(`p`, {
                        className: `font-semibold`,
                        children: `Quick Links`
                    }), (0, U.jsx)(`ul`, {
                        className: `mt-3 space-y-2 text-sm text-muted-foreground`,
                        children: J.map(([e, t]) => (0, U.jsx)(`li`, {
                            children: (0, U.jsx)(`a`, {
                                href: t,
                                className: `hover:text-foreground`,
                                children: e
                            })
                        }, t))
                    })]
                }), (0, U.jsxs)(`div`, {
                    children: [(0, U.jsx)(`p`, {
                        className: `font-semibold`,
                        children: `Services`
                    }), (0, U.jsx)(`ul`, {
                        className: `mt-3 space-y-2 text-sm text-muted-foreground`,
                        children: Y.slice(0, 5).map(e => (0, U.jsx)(`li`, {
                            children: e.t
                        }, e.t))
                    })]
                })]
            }), (0, U.jsxs)(`p`, {
                className: `mx-auto mt-10 max-w-6xl text-center text-xs text-muted-foreground`,
                children: [`© `, new Date().getFullYear(), ` Md. Jahirul Islam. All rights reserved.`]
            })]
        })]
    })
}
export {
    Oe as component
};