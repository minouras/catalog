function kn(t) {
  t.directive('collapse', e),
    (e.inline = (i, { modifiers: n }) => {
      n.includes('min') && ((i._x_doShow = () => {}), (i._x_doHide = () => {}));
    });
  function e(i, { modifiers: n }) {
    let r = Fe(n, 'duration', 250) / 1e3,
      s = Fe(n, 'min', 0),
      a = !n.includes('min');
    i._x_isShown || (i.style.height = `${s}px`),
      !i._x_isShown && a && (i.hidden = !0),
      i._x_isShown || (i.style.overflow = 'hidden');
    let o = (u, d) => {
        let _ = t.setStyles(u, d);
        return d.height ? () => {} : _;
      },
      l = {
        transitionProperty: 'height',
        transitionDuration: `${r}s`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      };
    i._x_transition = {
      in(u = () => {}, d = () => {}) {
        a && (i.hidden = !1), a && (i.style.display = null);
        let _ = i.getBoundingClientRect().height;
        i.style.height = 'auto';
        let c = i.getBoundingClientRect().height;
        _ === c && (_ = s),
          t.transition(
            i,
            t.setStyles,
            { during: l, start: { height: _ + 'px' }, end: { height: c + 'px' } },
            () => (i._x_isShown = !0),
            () => {
              i.getBoundingClientRect().height == c && (i.style.overflow = null);
            },
          );
      },
      out(u = () => {}, d = () => {}) {
        let _ = i.getBoundingClientRect().height;
        t.transition(
          i,
          o,
          { during: l, start: { height: _ + 'px' }, end: { height: s + 'px' } },
          () => (i.style.overflow = 'hidden'),
          () => {
            (i._x_isShown = !1),
              i.style.height == `${s}px` && a && ((i.style.display = 'none'), (i.hidden = !0));
          },
        );
      },
    };
  }
}
function Fe(t, e, i) {
  if (t.indexOf(e) === -1) return i;
  const n = t[t.indexOf(e) + 1];
  if (!n) return i;
  if (e === 'duration') {
    let r = n.match(/([0-9]+)ms/);
    if (r) return r[1];
  }
  if (e === 'min') {
    let r = n.match(/([0-9]+)px/);
    if (r) return r[1];
  }
  return n;
}
var Tn = kn,
  ni = [
    'input',
    'select',
    'textarea',
    'a[href]',
    'button',
    '[tabindex]:not(slot)',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
    'details>summary:first-of-type',
    'details',
  ],
  Ot = ni.join(','),
  ri = typeof Element > 'u',
  Q = ri
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  zt =
    !ri && Element.prototype.getRootNode
      ? function (t) {
          return t.getRootNode();
        }
      : function (t) {
          return t.ownerDocument;
        },
  si = function (e, i, n) {
    var r = Array.prototype.slice.apply(e.querySelectorAll(Ot));
    return i && Q.call(e, Ot) && r.unshift(e), (r = r.filter(n)), r;
  },
  ai = function t(e, i, n) {
    for (var r = [], s = Array.from(e); s.length; ) {
      var a = s.shift();
      if (a.tagName === 'SLOT') {
        var o = a.assignedElements(),
          l = o.length ? o : a.children,
          u = t(l, !0, n);
        n.flatten ? r.push.apply(r, u) : r.push({ scope: a, candidates: u });
      } else {
        var d = Q.call(a, Ot);
        d && n.filter(a) && (i || !e.includes(a)) && r.push(a);
        var _ = a.shadowRoot || (typeof n.getShadowRoot == 'function' && n.getShadowRoot(a)),
          c = !n.shadowRootFilter || n.shadowRootFilter(a);
        if (_ && c) {
          var p = t(_ === !0 ? a.children : _.children, !0, n);
          n.flatten ? r.push.apply(r, p) : r.push({ scope: a, candidates: p });
        } else s.unshift.apply(s, a.children);
      }
    }
    return r;
  },
  oi = function (e, i) {
    return e.tabIndex < 0 &&
      (i || /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || e.isContentEditable) &&
      isNaN(parseInt(e.getAttribute('tabindex'), 10))
      ? 0
      : e.tabIndex;
  },
  Cn = function (e, i) {
    return e.tabIndex === i.tabIndex ? e.documentOrder - i.documentOrder : e.tabIndex - i.tabIndex;
  },
  li = function (e) {
    return e.tagName === 'INPUT';
  },
  Dn = function (e) {
    return li(e) && e.type === 'hidden';
  },
  Nn = function (e) {
    var i =
      e.tagName === 'DETAILS' &&
      Array.prototype.slice.apply(e.children).some(function (n) {
        return n.tagName === 'SUMMARY';
      });
    return i;
  },
  Pn = function (e, i) {
    for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === i) return e[n];
  },
  Fn = function (e) {
    if (!e.name) return !0;
    var i = e.form || zt(e),
      n = function (o) {
        return i.querySelectorAll('input[type="radio"][name="' + o + '"]');
      },
      r;
    if (typeof window < 'u' && typeof window.CSS < 'u' && typeof window.CSS.escape == 'function')
      r = n(window.CSS.escape(e.name));
    else
      try {
        r = n(e.name);
      } catch (a) {
        return (
          console.error(
            'Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s',
            a.message,
          ),
          !1
        );
      }
    var s = Pn(r, e.form);
    return !s || s === e;
  },
  Ln = function (e) {
    return li(e) && e.type === 'radio';
  },
  Kn = function (e) {
    return Ln(e) && !Fn(e);
  },
  Le = function (e) {
    var i = e.getBoundingClientRect(),
      n = i.width,
      r = i.height;
    return n === 0 && r === 0;
  },
  Mn = function (e, i) {
    var n = i.displayCheck,
      r = i.getShadowRoot;
    if (getComputedStyle(e).visibility === 'hidden') return !0;
    var s = Q.call(e, 'details>summary:first-of-type'),
      a = s ? e.parentElement : e;
    if (Q.call(a, 'details:not([open]) *')) return !0;
    var o = zt(e).host,
      l = o?.ownerDocument.contains(o) || e.ownerDocument.contains(e);
    if (!n || n === 'full') {
      if (typeof r == 'function') {
        for (var u = e; e; ) {
          var d = e.parentElement,
            _ = zt(e);
          if (d && !d.shadowRoot && r(d) === !0) return Le(e);
          e.assignedSlot
            ? (e = e.assignedSlot)
            : !d && _ !== e.ownerDocument
            ? (e = _.host)
            : (e = d);
        }
        e = u;
      }
      if (l) return !e.getClientRects().length;
    } else if (n === 'non-zero-area') return Le(e);
    return !1;
  },
  Rn = function (e) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
      for (var i = e.parentElement; i; ) {
        if (i.tagName === 'FIELDSET' && i.disabled) {
          for (var n = 0; n < i.children.length; n++) {
            var r = i.children.item(n);
            if (r.tagName === 'LEGEND')
              return Q.call(i, 'fieldset[disabled] *') ? !0 : !r.contains(e);
          }
          return !0;
        }
        i = i.parentElement;
      }
    return !1;
  },
  St = function (e, i) {
    return !(i.disabled || Dn(i) || Mn(i, e) || Nn(i) || Rn(i));
  },
  Gt = function (e, i) {
    return !(Kn(i) || oi(i) < 0 || !St(e, i));
  },
  An = function (e) {
    var i = parseInt(e.getAttribute('tabindex'), 10);
    return !!(isNaN(i) || i >= 0);
  },
  Bn = function t(e) {
    var i = [],
      n = [];
    return (
      e.forEach(function (r, s) {
        var a = !!r.scope,
          o = a ? r.scope : r,
          l = oi(o, a),
          u = a ? t(r.candidates) : o;
        l === 0
          ? a
            ? i.push.apply(i, u)
            : i.push(o)
          : n.push({ documentOrder: s, tabIndex: l, item: r, isScope: a, content: u });
      }),
      n
        .sort(Cn)
        .reduce(function (r, s) {
          return s.isScope ? r.push.apply(r, s.content) : r.push(s.content), r;
        }, [])
        .concat(i)
    );
  },
  jn = function (e, i) {
    i = i || {};
    var n;
    return (
      i.getShadowRoot
        ? (n = ai([e], i.includeContainer, {
            filter: Gt.bind(null, i),
            flatten: !1,
            getShadowRoot: i.getShadowRoot,
            shadowRootFilter: An,
          }))
        : (n = si(e, i.includeContainer, Gt.bind(null, i))),
      Bn(n)
    );
  },
  ui = function (e, i) {
    i = i || {};
    var n;
    return (
      i.getShadowRoot
        ? (n = ai([e], i.includeContainer, {
            filter: St.bind(null, i),
            flatten: !0,
            getShadowRoot: i.getShadowRoot,
          }))
        : (n = si(e, i.includeContainer, St.bind(null, i))),
      n
    );
  },
  vt = function (e, i) {
    if (((i = i || {}), !e)) throw new Error('No node provided');
    return Q.call(e, Ot) === !1 ? !1 : Gt(i, e);
  },
  Vn = ni.concat('iframe').join(','),
  wt = function (e, i) {
    if (((i = i || {}), !e)) throw new Error('No node provided');
    return Q.call(e, Vn) === !1 ? !1 : St(i, e);
  };
function Ke(t, e) {
  var i = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e &&
      (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(t, r).enumerable;
      })),
      i.push.apply(i, n);
  }
  return i;
}
function Me(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Ke(Object(i), !0).forEach(function (n) {
          qn(t, n, i[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
      : Ke(Object(i)).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(i, n));
        });
  }
  return t;
}
function qn(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = i),
    t
  );
}
var Re = (function () {
    var t = [];
    return {
      activateTrap: function (i) {
        if (t.length > 0) {
          var n = t[t.length - 1];
          n !== i && n.pause();
        }
        var r = t.indexOf(i);
        r === -1 || t.splice(r, 1), t.push(i);
      },
      deactivateTrap: function (i) {
        var n = t.indexOf(i);
        n !== -1 && t.splice(n, 1), t.length > 0 && t[t.length - 1].unpause();
      },
    };
  })(),
  Wn = function (e) {
    return e.tagName && e.tagName.toLowerCase() === 'input' && typeof e.select == 'function';
  },
  Hn = function (e) {
    return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
  },
  Un = function (e) {
    return e.key === 'Tab' || e.keyCode === 9;
  },
  Ae = function (e) {
    return setTimeout(e, 0);
  },
  Be = function (e, i) {
    var n = -1;
    return (
      e.every(function (r, s) {
        return i(r) ? ((n = s), !1) : !0;
      }),
      n
    );
  },
  rt = function (e) {
    for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
      n[r - 1] = arguments[r];
    return typeof e == 'function' ? e.apply(void 0, n) : e;
  },
  bt = function (e) {
    return e.target.shadowRoot && typeof e.composedPath == 'function'
      ? e.composedPath()[0]
      : e.target;
  },
  zn = function (e, i) {
    var n = i?.document || document,
      r = Me({ returnFocusOnDeactivate: !0, escapeDeactivates: !0, delayInitialFocus: !0 }, i),
      s = {
        containers: [],
        containerGroups: [],
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: !1,
        paused: !1,
        delayInitialFocusTimer: void 0,
      },
      a,
      o = function (f, h, g) {
        return f && f[h] !== void 0 ? f[h] : r[g || h];
      },
      l = function (f) {
        return s.containerGroups.findIndex(function (h) {
          var g = h.container,
            O = h.tabbableNodes;
          return (
            g.contains(f) ||
            O.find(function (E) {
              return E === f;
            })
          );
        });
      },
      u = function (f) {
        var h = r[f];
        if (typeof h == 'function') {
          for (var g = arguments.length, O = new Array(g > 1 ? g - 1 : 0), E = 1; E < g; E++)
            O[E - 1] = arguments[E];
          h = h.apply(void 0, O);
        }
        if ((h === !0 && (h = void 0), !h)) {
          if (h === void 0 || h === !1) return h;
          throw new Error(
            '`'.concat(f, '` was specified but was not a node, or did not return a node'),
          );
        }
        var C = h;
        if (typeof h == 'string' && ((C = n.querySelector(h)), !C))
          throw new Error('`'.concat(f, '` as selector refers to no known node'));
        return C;
      },
      d = function () {
        var f = u('initialFocus');
        if (f === !1) return !1;
        if (f === void 0)
          if (l(n.activeElement) >= 0) f = n.activeElement;
          else {
            var h = s.tabbableGroups[0],
              g = h && h.firstTabbableNode;
            f = g || u('fallbackFocus');
          }
        if (!f) throw new Error('Your focus-trap needs to have at least one focusable element');
        return f;
      },
      _ = function () {
        if (
          ((s.containerGroups = s.containers.map(function (f) {
            var h = jn(f, r.tabbableOptions),
              g = ui(f, r.tabbableOptions);
            return {
              container: f,
              tabbableNodes: h,
              focusableNodes: g,
              firstTabbableNode: h.length > 0 ? h[0] : null,
              lastTabbableNode: h.length > 0 ? h[h.length - 1] : null,
              nextTabbableNode: function (E) {
                var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
                  K = g.findIndex(function (A) {
                    return A === E;
                  });
                if (!(K < 0))
                  return C
                    ? g.slice(K + 1).find(function (A) {
                        return vt(A, r.tabbableOptions);
                      })
                    : g
                        .slice(0, K)
                        .reverse()
                        .find(function (A) {
                          return vt(A, r.tabbableOptions);
                        });
              },
            };
          })),
          (s.tabbableGroups = s.containerGroups.filter(function (f) {
            return f.tabbableNodes.length > 0;
          })),
          s.tabbableGroups.length <= 0 && !u('fallbackFocus'))
        )
          throw new Error(
            'Your focus-trap must have at least one container with at least one tabbable node in it at all times',
          );
      },
      c = function x(f) {
        if (f !== !1 && f !== n.activeElement) {
          if (!f || !f.focus) {
            x(d());
            return;
          }
          f.focus({ preventScroll: !!r.preventScroll }),
            (s.mostRecentlyFocusedNode = f),
            Wn(f) && f.select();
        }
      },
      p = function (f) {
        var h = u('setReturnFocus', f);
        return h || (h === !1 ? !1 : f);
      },
      b = function (f) {
        var h = bt(f);
        if (!(l(h) >= 0)) {
          if (rt(r.clickOutsideDeactivates, f)) {
            a.deactivate({ returnFocus: r.returnFocusOnDeactivate && !wt(h, r.tabbableOptions) });
            return;
          }
          rt(r.allowOutsideClick, f) || f.preventDefault();
        }
      },
      y = function (f) {
        var h = bt(f),
          g = l(h) >= 0;
        g || h instanceof Document
          ? g && (s.mostRecentlyFocusedNode = h)
          : (f.stopImmediatePropagation(), c(s.mostRecentlyFocusedNode || d()));
      },
      v = function (f) {
        var h = bt(f);
        _();
        var g = null;
        if (s.tabbableGroups.length > 0) {
          var O = l(h),
            E = O >= 0 ? s.containerGroups[O] : void 0;
          if (O < 0)
            f.shiftKey
              ? (g = s.tabbableGroups[s.tabbableGroups.length - 1].lastTabbableNode)
              : (g = s.tabbableGroups[0].firstTabbableNode);
          else if (f.shiftKey) {
            var C = Be(s.tabbableGroups, function (Rt) {
              var At = Rt.firstTabbableNode;
              return h === At;
            });
            if (
              (C < 0 &&
                (E.container === h ||
                  (wt(h, r.tabbableOptions) &&
                    !vt(h, r.tabbableOptions) &&
                    !E.nextTabbableNode(h, !1))) &&
                (C = O),
              C >= 0)
            ) {
              var K = C === 0 ? s.tabbableGroups.length - 1 : C - 1,
                A = s.tabbableGroups[K];
              g = A.lastTabbableNode;
            }
          } else {
            var nt = Be(s.tabbableGroups, function (Rt) {
              var At = Rt.lastTabbableNode;
              return h === At;
            });
            if (
              (nt < 0 &&
                (E.container === h ||
                  (wt(h, r.tabbableOptions) &&
                    !vt(h, r.tabbableOptions) &&
                    !E.nextTabbableNode(h))) &&
                (nt = O),
              nt >= 0)
            ) {
              var Sn = nt === s.tabbableGroups.length - 1 ? 0 : nt + 1,
                In = s.tabbableGroups[Sn];
              g = In.firstTabbableNode;
            }
          }
        } else g = u('fallbackFocus');
        g && (f.preventDefault(), c(g));
      },
      m = function (f) {
        if (Hn(f) && rt(r.escapeDeactivates, f) !== !1) {
          f.preventDefault(), a.deactivate();
          return;
        }
        if (Un(f)) {
          v(f);
          return;
        }
      },
      w = function (f) {
        var h = bt(f);
        l(h) >= 0 ||
          rt(r.clickOutsideDeactivates, f) ||
          rt(r.allowOutsideClick, f) ||
          (f.preventDefault(), f.stopImmediatePropagation());
      },
      k = function () {
        if (s.active)
          return (
            Re.activateTrap(a),
            (s.delayInitialFocusTimer = r.delayInitialFocus
              ? Ae(function () {
                  c(d());
                })
              : c(d())),
            n.addEventListener('focusin', y, !0),
            n.addEventListener('mousedown', b, { capture: !0, passive: !1 }),
            n.addEventListener('touchstart', b, { capture: !0, passive: !1 }),
            n.addEventListener('click', w, { capture: !0, passive: !1 }),
            n.addEventListener('keydown', m, { capture: !0, passive: !1 }),
            a
          );
      },
      T = function () {
        if (s.active)
          return (
            n.removeEventListener('focusin', y, !0),
            n.removeEventListener('mousedown', b, !0),
            n.removeEventListener('touchstart', b, !0),
            n.removeEventListener('click', w, !0),
            n.removeEventListener('keydown', m, !0),
            a
          );
      };
    return (
      (a = {
        get active() {
          return s.active;
        },
        get paused() {
          return s.paused;
        },
        activate: function (f) {
          if (s.active) return this;
          var h = o(f, 'onActivate'),
            g = o(f, 'onPostActivate'),
            O = o(f, 'checkCanFocusTrap');
          O || _(),
            (s.active = !0),
            (s.paused = !1),
            (s.nodeFocusedBeforeActivation = n.activeElement),
            h && h();
          var E = function () {
            O && _(), k(), g && g();
          };
          return O ? (O(s.containers.concat()).then(E, E), this) : (E(), this);
        },
        deactivate: function (f) {
          if (!s.active) return this;
          var h = Me(
            {
              onDeactivate: r.onDeactivate,
              onPostDeactivate: r.onPostDeactivate,
              checkCanReturnFocus: r.checkCanReturnFocus,
            },
            f,
          );
          clearTimeout(s.delayInitialFocusTimer),
            (s.delayInitialFocusTimer = void 0),
            T(),
            (s.active = !1),
            (s.paused = !1),
            Re.deactivateTrap(a);
          var g = o(h, 'onDeactivate'),
            O = o(h, 'onPostDeactivate'),
            E = o(h, 'checkCanReturnFocus'),
            C = o(h, 'returnFocus', 'returnFocusOnDeactivate');
          g && g();
          var K = function () {
            Ae(function () {
              C && c(p(s.nodeFocusedBeforeActivation)), O && O();
            });
          };
          return C && E ? (E(p(s.nodeFocusedBeforeActivation)).then(K, K), this) : (K(), this);
        },
        pause: function () {
          return s.paused || !s.active ? this : ((s.paused = !0), T(), this);
        },
        unpause: function () {
          return !s.paused || !s.active ? this : ((s.paused = !1), _(), k(), this);
        },
        updateContainerElements: function (f) {
          var h = [].concat(f).filter(Boolean);
          return (
            (s.containers = h.map(function (g) {
              return typeof g == 'string' ? n.querySelector(g) : g;
            })),
            s.active && _(),
            this
          );
        },
      }),
      a.updateContainerElements(e),
      a
    );
  };
function Gn(t) {
  let e, i;
  window.addEventListener('focusin', () => {
    (e = i), (i = document.activeElement);
  }),
    t.magic('focus', (n) => {
      let r = n;
      return {
        __noscroll: !1,
        __wrapAround: !1,
        within(s) {
          return (r = s), this;
        },
        withoutScrolling() {
          return (this.__noscroll = !0), this;
        },
        noscroll() {
          return (this.__noscroll = !0), this;
        },
        withWrapAround() {
          return (this.__wrapAround = !0), this;
        },
        wrap() {
          return this.withWrapAround();
        },
        focusable(s) {
          return wt(s);
        },
        previouslyFocused() {
          return e;
        },
        lastFocused() {
          return e;
        },
        focused() {
          return i;
        },
        focusables() {
          return Array.isArray(r) ? r : ui(r, { displayCheck: 'none' });
        },
        all() {
          return this.focusables();
        },
        isFirst(s) {
          let a = this.all();
          return a[0] && a[0].isSameNode(s);
        },
        isLast(s) {
          let a = this.all();
          return a.length && a.slice(-1)[0].isSameNode(s);
        },
        getFirst() {
          return this.all()[0];
        },
        getLast() {
          return this.all().slice(-1)[0];
        },
        getNext() {
          let s = this.all(),
            a = document.activeElement;
          if (s.indexOf(a) !== -1)
            return this.__wrapAround && s.indexOf(a) === s.length - 1 ? s[0] : s[s.indexOf(a) + 1];
        },
        getPrevious() {
          let s = this.all(),
            a = document.activeElement;
          if (s.indexOf(a) !== -1)
            return this.__wrapAround && s.indexOf(a) === 0 ? s.slice(-1)[0] : s[s.indexOf(a) - 1];
        },
        first() {
          this.focus(this.getFirst());
        },
        last() {
          this.focus(this.getLast());
        },
        next() {
          this.focus(this.getNext());
        },
        previous() {
          this.focus(this.getPrevious());
        },
        prev() {
          return this.previous();
        },
        focus(s) {
          s &&
            setTimeout(() => {
              s.hasAttribute('tabindex') || s.setAttribute('tabindex', '0'),
                s.focus({ preventScroll: this._noscroll });
            });
        },
      };
    }),
    t.directive(
      'trap',
      t.skipDuringClone(
        (n, { expression: r, modifiers: s }, { effect: a, evaluateLater: o, cleanup: l }) => {
          let u = o(r),
            d = !1,
            _ = { escapeDeactivates: !1, allowOutsideClick: !0, fallbackFocus: () => n },
            c = n.querySelector('[autofocus]');
          c && (_.initialFocus = c);
          let p = zn(n, _),
            b = () => {},
            y = () => {};
          const v = () => {
            b(),
              (b = () => {}),
              y(),
              (y = () => {}),
              p.deactivate({ returnFocus: !s.includes('noreturn') });
          };
          a(() =>
            u((m) => {
              d !== m &&
                (m &&
                  !d &&
                  setTimeout(() => {
                    s.includes('inert') && (b = je(n)),
                      s.includes('noscroll') && (y = Jn()),
                      p.activate();
                  }),
                !m && d && v(),
                (d = !!m));
            }),
          ),
            l(v);
        },
        (n, { expression: r, modifiers: s }, { evaluate: a }) => {
          s.includes('inert') && a(r) && je(n);
        },
      ),
    );
}
function je(t) {
  let e = [];
  return (
    ci(t, (i) => {
      let n = i.hasAttribute('aria-hidden');
      i.setAttribute('aria-hidden', 'true'), e.push(() => n || i.removeAttribute('aria-hidden'));
    }),
    () => {
      for (; e.length; ) e.pop()();
    }
  );
}
function ci(t, e) {
  t.isSameNode(document.body) ||
    !t.parentNode ||
    Array.from(t.parentNode.children).forEach((i) => {
      i.isSameNode(t) ? ci(t.parentNode, e) : e(i);
    });
}
function Jn() {
  let t = document.documentElement.style.overflow,
    e = document.documentElement.style.paddingRight,
    i = window.innerWidth - document.documentElement.clientWidth;
  return (
    (document.documentElement.style.overflow = 'hidden'),
    (document.documentElement.style.paddingRight = `${i}px`),
    () => {
      (document.documentElement.style.overflow = t),
        (document.documentElement.style.paddingRight = e);
    }
  );
}
var Qn = Gn;
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 5.3.3
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 6.9.4
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/ function di(t, e, i, n) {
  return {
    items: [],
    activeKey: null,
    orderedKeys: [],
    activatedByKeyPress: !1,
    activateSelectedOrFirst: t.debounce(function () {
      n(!1);
    }),
    registerItem(r, s, a, o) {
      this.items.push({ key: r, el: s, value: a, disabled: o }),
        this.orderedKeys.push(r),
        this.reorderKeys(),
        this.activateSelectedOrFirst();
    },
    unregisterItem(r) {
      let s = this.items.findIndex((a) => a.key === r);
      s !== -1 && this.items.splice(s, 1),
        (s = this.orderedKeys.indexOf(r)),
        s !== -1 && this.orderedKeys.splice(s, 1),
        this.reorderKeys(),
        this.activateSelectedOrFirst();
    },
    getItemByKey(r) {
      return this.items.find((s) => s.key === r);
    },
    getItemByValue(r) {
      return this.items.find((s) => t.raw(s.value) === t.raw(r));
    },
    getItemByEl(r) {
      return this.items.find((s) => s.el === r);
    },
    getItemsByValues(r) {
      let s = r.map((o) => t.raw(o)),
        a = this.items.filter((o) => s.includes(t.raw(o.value)));
      return (
        (a = a.slice().sort((o, l) => {
          let u = o.el.compareDocumentPosition(l.el);
          return u & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : u & Node.DOCUMENT_POSITION_PRECEDING
            ? 1
            : 0;
        })),
        a
      );
    },
    getActiveItem() {
      if (!this.hasActive()) return null;
      let r = this.items.find((s) => s.key === this.activeKey);
      return r || this.deactivateKey(this.activeKey), r;
    },
    activateItem(r) {
      r && this.activateKey(r.key);
    },
    reorderKeys: t.debounce(function () {
      (this.orderedKeys = this.items.map((r) => r.key)),
        (this.orderedKeys = this.orderedKeys.slice().sort((r, s) => {
          if (r === null || s === null) return 0;
          let a = this.items.find((u) => u.key === r).el,
            o = this.items.find((u) => u.key === s).el,
            l = a.compareDocumentPosition(o);
          return l & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : l & Node.DOCUMENT_POSITION_PRECEDING
            ? 1
            : 0;
        })),
        this.orderedKeys.includes(this.activeKey) || this.deactivateKey(this.activeKey);
    }),
    activeEl() {
      if (this.activeKey) return this.items.find((r) => r.key === this.activeKey).el;
    },
    isActiveEl(r) {
      let s = this.items.find((a) => a.el === r);
      return this.activeKey === s;
    },
    activateEl(r) {
      let s = this.items.find((a) => a.el === r);
      this.activateKey(s.key);
    },
    isDisabledEl(r) {
      return this.items.find((s) => s.el === r).disabled;
    },
    get isScrollingTo() {
      return this.scrollingCount > 0;
    },
    scrollingCount: 0,
    activateAndScrollToKey(r, s) {
      if (!this.getItemByKey(r)) return;
      this.scrollingCount++,
        this.activateKey(r, s),
        this.items.find((o) => o.key === r).el.scrollIntoView({ block: 'nearest' }),
        setTimeout(() => {
          this.scrollingCount--;
        }, 25);
    },
    isDisabled(r) {
      let s = this.items.find((a) => a.key === r);
      return s ? s.disabled : !1;
    },
    get nonDisabledOrderedKeys() {
      return this.orderedKeys.filter((r) => !this.isDisabled(r));
    },
    hasActive() {
      return !!this.activeKey;
    },
    wasActivatedByKeyPress() {
      return this.activatedByKeyPress;
    },
    isActiveKey(r) {
      return this.activeKey === r;
    },
    activateKey(r, s = !1) {
      this.isDisabled(r) || ((this.activeKey = r), (this.activatedByKeyPress = s));
    },
    deactivateKey(r) {
      this.activeKey === r && ((this.activeKey = null), (this.activatedByKeyPress = !1));
    },
    deactivate() {
      this.activeKey &&
        (this.isScrollingTo || ((this.activeKey = null), (this.activatedByKeyPress = !1)));
    },
    nextKey() {
      if (!this.activeKey) return;
      let r = this.nonDisabledOrderedKeys.findIndex((s) => s === this.activeKey);
      return this.nonDisabledOrderedKeys[r + 1];
    },
    prevKey() {
      if (!this.activeKey) return;
      let r = this.nonDisabledOrderedKeys.findIndex((s) => s === this.activeKey);
      return this.nonDisabledOrderedKeys[r - 1];
    },
    firstKey() {
      return this.nonDisabledOrderedKeys[0];
    },
    lastKey() {
      return this.nonDisabledOrderedKeys[this.nonDisabledOrderedKeys.length - 1];
    },
    searchQuery: '',
    clearSearch: t.debounce(function () {
      this.searchQuery = '';
    }, 350),
    searchKey(r) {
      this.clearSearch(), (this.searchQuery += r);
      let s;
      for (let a in this.items)
        if (this.items[a].el.textContent.trim().toLowerCase().startsWith(this.searchQuery)) {
          s = this.items[a].key;
          break;
        }
      if (this.nonDisabledOrderedKeys.includes(s)) return s;
    },
    activateByKeyEvent(r, s = !1, a = () => !1, o = () => {}, l) {
      let u, d;
      l(!0);
      let _ = !0;
      switch (r.key) {
        case ['ArrowDown', 'ArrowRight'][i === 'vertical' ? 0 : 1]:
          if ((r.preventDefault(), r.stopPropagation(), l(!1), !a())) {
            o();
            break;
          }
          this.reorderKeys(), (d = this.hasActive()), (u = d ? this.nextKey() : this.firstKey());
          break;
        case ['ArrowUp', 'ArrowLeft'][i === 'vertical' ? 0 : 1]:
          if ((r.preventDefault(), r.stopPropagation(), l(!1), !a())) {
            o();
            break;
          }
          this.reorderKeys(), (d = this.hasActive()), (u = d ? this.prevKey() : this.lastKey());
          break;
        case 'Home':
        case 'PageUp':
          r.preventDefault(),
            r.stopPropagation(),
            l(!1),
            this.reorderKeys(),
            (d = this.hasActive()),
            (u = this.firstKey());
          break;
        case 'End':
        case 'PageDown':
          r.preventDefault(),
            r.stopPropagation(),
            l(!1),
            this.reorderKeys(),
            (d = this.hasActive()),
            (u = this.lastKey());
          break;
        default:
          (_ = this.activatedByKeyPress), s && r.key.length === 1 && (u = this.searchKey(r.key));
          break;
      }
      u && this.activateAndScrollToKey(u, _);
    },
  };
}
function fi(t, e, i, n) {
  let r = _i(i, n);
  r.forEach((o) => (o._x_hiddenInput = !0)), r.forEach((o) => (o._x_ignore = !0));
  let s = e.children,
    a = [];
  for (let o = 0; o < s.length; o++) {
    let l = s[o];
    if (l._x_hiddenInput) a.push(l);
    else break;
  }
  t.mutateDom(() => {
    a.forEach((o) => o.remove()), r.reverse().forEach((o) => e.prepend(o));
  });
}
function _i(t, e, i = []) {
  if (Yn(e)) for (let n in e) i = i.concat(_i(`${t}[${n}]`, e[n]));
  else {
    let n = document.createElement('input');
    return (
      n.setAttribute('type', 'hidden'),
      n.setAttribute('name', t),
      n.setAttribute('value', '' + e),
      [n]
    );
  }
  return i;
}
function Yn(t) {
  return typeof t == 'object' && t !== null;
}
function Xn(t) {
  t
    .directive('combobox', (e, i, { evaluate: n }) => {
      i.value === 'input'
        ? tr(e, t)
        : i.value === 'button'
        ? er(e, t)
        : i.value === 'label'
        ? ir(e, t)
        : i.value === 'options'
        ? nr(e, t)
        : i.value === 'option'
        ? rr(e, t)
        : Zn(e, t);
    })
    .before('bind'),
    t.magic('combobox', (e) => {
      let i = t.$data(e);
      return {
        get value() {
          return i.__value;
        },
        get isOpen() {
          return i.__isOpen;
        },
        get isDisabled() {
          return i.__isDisabled;
        },
        get activeOption() {
          let n = i.__context?.getActiveItem();
          return n && n.value;
        },
        get activeIndex() {
          let n = i.__context?.getActiveItem();
          return n
            ? Object.values(t.raw(i.__context.items)).findIndex((r) => t.raw(n) == t.raw(r))
            : null;
        },
      };
    }),
    t.magic('comboboxOption', (e) => {
      let i = t.$data(e),
        n = t.findClosest(e, (r) => r.__optionKey);
      if (!n) throw 'No x-combobox:option directive found...';
      return {
        get isActive() {
          return i.__context.isActiveKey(n.__optionKey);
        },
        get isSelected() {
          return i.__isSelected(n);
        },
        get isDisabled() {
          return i.__context.isDisabled(n.__optionKey);
        },
      };
    });
}
function Zn(t, e) {
  e.bind(t, {
    'x-id'() {
      return ['alpine-combobox-button', 'alpine-combobox-options', 'alpine-combobox-label'];
    },
    'x-modelable': '__value',
    'x-data'() {
      return {
        __ready: !1,
        __value: null,
        __isOpen: !1,
        __context: void 0,
        __isMultiple: void 0,
        __isStatic: !1,
        __isDisabled: void 0,
        __displayValue: void 0,
        __compareBy: null,
        __inputName: null,
        __isTyping: !1,
        __hold: !1,
        init() {
          (this.__isMultiple = e.extractProp(t, 'multiple', !1)),
            (this.__isDisabled = e.extractProp(t, 'disabled', !1)),
            (this.__inputName = e.extractProp(t, 'name', null)),
            (this.__nullable = e.extractProp(t, 'nullable', !1)),
            (this.__compareBy = e.extractProp(t, 'by')),
            (this.__context = di(e, this.__isMultiple, 'vertical', () =>
              this.__activateSelectedOrFirst(),
            ));
          let i = e.extractProp(t, 'default-value', this.__isMultiple ? [] : null);
          (this.__value = i),
            queueMicrotask(() => {
              e.effect(() => {
                this.__inputName && fi(e, this.$el, this.__inputName, this.__value);
              });
            });
        },
        __startTyping() {
          this.__isTyping = !0;
        },
        __stopTyping() {
          this.__isTyping = !1;
        },
        __resetInput() {
          let i = this.$refs.__input;
          if (!i) return;
          let n = this.__getCurrentValue();
          i.value = n;
        },
        __getCurrentValue() {
          return !this.$refs.__input || !this.__value
            ? ''
            : this.__displayValue
            ? this.__displayValue(this.__value)
            : typeof this.__value == 'string'
            ? this.__value
            : '';
        },
        __open() {
          if (this.__isOpen) return;
          this.__isOpen = !0;
          let i = this.$refs.__input;
          if (i) {
            let r = i.value,
              { selectionStart: s, selectionEnd: a, selectionDirection: o } = i;
            (i.value = ''),
              i.dispatchEvent(new Event('change')),
              (i.value = r),
              o !== null ? i.setSelectionRange(s, a, o) : i.setSelectionRange(s, a);
          }
          ((r) => requestAnimationFrame(() => requestAnimationFrame(r)))(() => {
            this.$refs.__input.focus({ preventScroll: !0 }), this.__activateSelectedOrFirst();
          });
        },
        __close() {
          (this.__isOpen = !1), this.__context.deactivate();
        },
        __activateSelectedOrFirst(i = !0) {
          if (
            !this.__isOpen ||
            (this.__context.hasActive() && this.__context.wasActivatedByKeyPress())
          )
            return;
          let n;
          if (this.__isMultiple) {
            let s = this.__context.getItemsByValues(this.__value);
            n = s.length ? s[0].value : null;
          } else n = this.__value;
          let r = null;
          if ((i && n && (r = this.__context.getItemByValue(n)), r)) {
            this.__context.activateAndScrollToKey(r.key);
            return;
          }
          this.__context.activateAndScrollToKey(this.__context.firstKey());
        },
        __selectActive() {
          let i = this.__context.getActiveItem();
          i && this.__toggleSelected(i.value);
        },
        __selectOption(i) {
          let n = this.__context.getItemByEl(i);
          n && this.__toggleSelected(n.value);
        },
        __isSelected(i) {
          let n = this.__context.getItemByEl(i);
          return !n || !n.value ? !1 : this.__hasSelected(n.value);
        },
        __toggleSelected(i) {
          if (!this.__isMultiple) {
            this.__value = i;
            return;
          }
          let n = this.__value.findIndex((r) => this.__compare(r, i));
          n === -1 ? this.__value.push(i) : this.__value.splice(n, 1);
        },
        __hasSelected(i) {
          return this.__isMultiple
            ? this.__value.some((n) => this.__compare(n, i))
            : this.__compare(this.__value, i);
        },
        __compare(i, n) {
          let r = this.__compareBy;
          if ((r || (r = (s, a) => e.raw(s) === e.raw(a)), typeof r == 'string')) {
            let s = r;
            r = (a, o) => a[s] === o[s];
          }
          return r(i, n);
        },
      };
    },
    '@mousedown.window'(i) {
      !this.$refs.__input.contains(i.target) &&
        !this.$refs.__button.contains(i.target) &&
        !this.$refs.__options.contains(i.target) &&
        (this.__close(), this.__resetInput());
    },
  });
}
function tr(t, e) {
  e.bind(t, {
    'x-ref': '__input',
    ':id'() {
      return this.$id('alpine-combobox-input');
    },
    role: 'combobox',
    tabindex: '0',
    'aria-autocomplete': 'list',
    async ':aria-controls'() {
      return await hi(() => this.$refs.__options && this.$refs.__options.id);
    },
    ':aria-expanded'() {
      return this.$data.__isDisabled ? void 0 : this.$data.__isOpen;
    },
    ':aria-multiselectable'() {
      return this.$data.__isMultiple ? !0 : void 0;
    },
    ':aria-activedescendant'() {
      if (!this.$data.__context.hasActive()) return;
      let i = this.$data.__context.getActiveItem();
      return i ? i.el.id : null;
    },
    ':aria-labelledby'() {
      return this.$refs.__label
        ? this.$refs.__label.id
        : this.$refs.__button
        ? this.$refs.__button.id
        : null;
    },
    'x-init'() {
      let i = e.extractProp(this.$el, 'display-value');
      i && (this.$data.__displayValue = i);
    },
    '@input.stop'(i) {
      this.$data.__isTyping && (this.$data.__open(), this.$dispatch('change'));
    },
    '@blur'() {
      this.$data.__stopTyping(!1);
    },
    '@keydown'(i) {
      queueMicrotask(() =>
        this.$data.__context.activateByKeyEvent(
          i,
          !1,
          () => this.$data.__isOpen,
          () => this.$data.__open(),
          (n) => (this.$data.__isTyping = n),
        ),
      );
    },
    '@keydown.enter.prevent.stop'() {
      this.$data.__selectActive(),
        this.$data.__stopTyping(),
        this.$data.__isMultiple || (this.$data.__close(), this.$data.__resetInput());
    },
    '@keydown.escape.prevent'(i) {
      this.$data.__static || i.stopPropagation(),
        this.$data.__stopTyping(),
        this.$data.__close(),
        this.$data.__resetInput();
    },
    '@keydown.tab'() {
      this.$data.__stopTyping(),
        this.$data.__isOpen && this.$data.__close(),
        this.$data.__resetInput();
    },
    '@keydown.backspace'(i) {
      if (this.$data.__isMultiple || !this.$data.__nullable) return;
      let n = i.target;
      requestAnimationFrame(() => {
        if (n.value === '') {
          this.$data.__value = null;
          let r = this.$refs.__options;
          r && (r.scrollTop = 0), this.$data.__context.deactivate();
        }
      });
    },
  });
}
function er(t, e) {
  e.bind(t, {
    'x-ref': '__button',
    ':id'() {
      return this.$id('alpine-combobox-button');
    },
    'aria-haspopup': 'true',
    async ':aria-controls'() {
      return await hi(() => this.$refs.__options && this.$refs.__options.id);
    },
    ':aria-labelledby'() {
      return this.$refs.__label ? [this.$refs.__label.id, this.$el.id].join(' ') : null;
    },
    ':aria-expanded'() {
      return this.$data.__isDisabled ? null : this.$data.__isOpen;
    },
    ':disabled'() {
      return this.$data.__isDisabled;
    },
    tabindex: '-1',
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button');
    },
    '@click'(i) {
      this.$data.__isDisabled ||
        (this.$data.__isOpen
          ? (this.$data.__close(), this.$data.__resetInput())
          : (i.preventDefault(), this.$data.__open()),
        this.$nextTick(() => this.$refs.__input.focus({ preventScroll: !0 })));
    },
  });
}
function ir(t, e) {
  e.bind(t, {
    'x-ref': '__label',
    ':id'() {
      return this.$id('alpine-combobox-label');
    },
    '@click'() {
      this.$refs.__input.focus({ preventScroll: !0 });
    },
  });
}
function nr(t, e) {
  e.bind(t, {
    'x-ref': '__options',
    ':id'() {
      return this.$id('alpine-combobox-options');
    },
    role: 'listbox',
    ':aria-labelledby'() {
      return this.$refs.__label
        ? this.$refs.__label.id
        : this.$refs.__button
        ? this.$refs.__button.id
        : null;
    },
    'x-init'() {
      (this.$data.__isStatic = e.bound(this.$el, 'static', !1)),
        e.bound(this.$el, 'hold') && (this.$data.__hold = !0);
    },
    'x-show'() {
      return this.$data.__isStatic ? !0 : this.$data.__isOpen;
    },
  });
}
function rr(t, e) {
  e.bind(t, {
    'x-id'() {
      return ['alpine-combobox-option'];
    },
    ':id'() {
      return this.$id('alpine-combobox-option');
    },
    role: 'option',
    ':tabindex'() {
      return this.$comboboxOption.isDisabled ? void 0 : '-1';
    },
    'x-effect'() {
      this.$comboboxOption.isActive
        ? t.setAttribute('aria-selected', !0)
        : t.removeAttribute('aria-selected');
    },
    ':aria-disabled'() {
      return this.$comboboxOption.isDisabled;
    },
    'x-data'() {
      return {
        init() {
          let i = (this.$el.__optionKey = (Math.random() + 1).toString(36).substring(7)),
            n = e.extractProp(this.$el, 'value'),
            r = e.extractProp(this.$el, 'disabled', !1, !1);
          this.__context.registerItem(i, this.$el, n, r);
        },
        destroy() {
          this.__context.unregisterItem(this.$el.__optionKey);
        },
      };
    },
    '@click'() {
      this.$comboboxOption.isDisabled ||
        (this.__selectOption(this.$el),
        this.__isMultiple || (this.__close(), this.__resetInput()),
        this.$nextTick(() => this.$refs.__input.focus({ preventScroll: !0 })));
    },
    '@mouseenter'(i) {
      this.__context.activateEl(this.$el);
    },
    '@mousemove'(i) {
      this.__context.isActiveEl(this.$el) || this.__context.activateEl(this.$el);
    },
    '@mouseleave'(i) {
      this.__hold || this.__context.deactivate();
    },
  });
}
function hi(t) {
  return new Promise((e) => queueMicrotask(() => e(t())));
}
function sr(t) {
  t.directive('dialog', (e, i) => {
    i.value === 'overlay'
      ? or(e, t)
      : i.value === 'panel'
      ? lr(e, t)
      : i.value === 'title'
      ? ur(e, t)
      : i.value === 'description'
      ? cr(e, t)
      : ar(e, t);
  }),
    t.magic('dialog', (e) => {
      let i = t.$data(e);
      return {
        get open() {
          return i.__isOpen;
        },
        get isOpen() {
          return i.__isOpen;
        },
        close() {
          i.__close();
        },
      };
    });
}
function ar(t, e) {
  e.bind(t, {
    'x-data'() {
      return {
        init() {
          e.bound(t, 'open') !== void 0 &&
            e.effect(() => {
              this.__isOpenState = e.bound(t, 'open');
            }),
            e.bound(t, 'initial-focus') !== void 0 &&
              this.$watch('__isOpenState', () => {
                this.__isOpenState &&
                  setTimeout(() => {
                    e.bound(t, 'initial-focus').focus();
                  }, 0);
              });
        },
        __isOpenState: !1,
        __close() {
          e.bound(t, 'open') ? this.$dispatch('close') : (this.__isOpenState = !1);
        },
        get __isOpen() {
          return e.bound(t, 'static', this.__isOpenState);
        },
      };
    },
    'x-modelable': '__isOpenState',
    'x-id'() {
      return ['alpine-dialog-title', 'alpine-dialog-description'];
    },
    'x-show'() {
      return this.__isOpen;
    },
    'x-trap.inert.noscroll'() {
      return this.__isOpen;
    },
    '@keydown.escape'() {
      this.__close();
    },
    ':aria-labelledby'() {
      return this.$id('alpine-dialog-title');
    },
    ':aria-describedby'() {
      return this.$id('alpine-dialog-description');
    },
    role: 'dialog',
    'aria-modal': 'true',
  });
}
function or(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__isOpen === void 0 &&
        console.warn('"x-dialog:overlay" is missing a parent element with "x-dialog".');
    },
    'x-show'() {
      return this.__isOpen;
    },
    '@click.prevent.stop'() {
      this.$data.__close();
    },
  });
}
function lr(t, e) {
  e.bind(t, {
    '@click.outside'() {
      this.$data.__close();
    },
    'x-show'() {
      return this.$data.__isOpen;
    },
  });
}
function ur(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__isOpen === void 0 &&
        console.warn('"x-dialog:title" is missing a parent element with "x-dialog".');
    },
    ':id'() {
      return this.$id('alpine-dialog-title');
    },
  });
}
function cr(t, e) {
  e.bind(t, {
    ':id'() {
      return this.$id('alpine-dialog-description');
    },
  });
}
function dr(t) {
  t
    .directive('disclosure', (e, i) => {
      i.value ? (i.value === 'panel' ? hr(e, t) : i.value === 'button' && _r(e, t)) : fr(e, t);
    })
    .before('bind'),
    t.magic('disclosure', (e) => {
      let i = t.$data(e);
      return {
        get isOpen() {
          return i.__isOpen;
        },
        close() {
          i.__close();
        },
      };
    });
}
function fr(t, e) {
  e.bind(t, {
    'x-modelable': '__isOpen',
    'x-data'() {
      return {
        init() {
          queueMicrotask(() => {
            let i = !!e.bound(this.$el, 'default-open', !1);
            i && (this.__isOpen = i);
          });
        },
        __isOpen: !1,
        __close() {
          this.__isOpen = !1;
        },
        __toggle() {
          this.__isOpen = !this.__isOpen;
        },
      };
    },
    'x-id'() {
      return ['alpine-disclosure-panel'];
    },
  });
}
function _r(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button');
    },
    '@click'() {
      this.$data.__isOpen = !this.$data.__isOpen;
    },
    ':aria-expanded'() {
      return this.$data.__isOpen;
    },
    ':aria-controls'() {
      return this.$data.$id('alpine-disclosure-panel');
    },
    '@keydown.space.prevent.stop'() {
      this.$data.__toggle();
    },
    '@keydown.enter.prevent.stop'() {
      this.$data.__toggle();
    },
    '@keyup.space.prevent'() {},
  });
}
function hr(t, e) {
  e.bind(t, {
    'x-show'() {
      return this.$data.__isOpen;
    },
    ':id'() {
      return this.$data.$id('alpine-disclosure-panel');
    },
  });
}
function pr(t) {
  t
    .directive('listbox', (e, i) => {
      i.value
        ? i.value === 'label'
          ? br(e, t)
          : i.value === 'button'
          ? gr(e, t)
          : i.value === 'options'
          ? mr(e, t)
          : i.value === 'option' && yr(e, t)
        : vr(e, t);
    })
    .before('bind'),
    t.magic('listbox', (e) => {
      let i = t.$data(e);
      return {
        get selected() {
          return i.__value;
        },
        get active() {
          let n = i.__context.getActiveItem();
          return n && n.value;
        },
        get value() {
          return i.__value;
        },
        get isOpen() {
          return i.__isOpen;
        },
        get isDisabled() {
          return i.__isDisabled;
        },
        get activeOption() {
          let n = i.__context.getActiveItem();
          return n && n.value;
        },
        get activeIndex() {
          let n = i.__context.getActiveItem();
          return n && n.key;
        },
      };
    }),
    t.magic('listboxOption', (e) => {
      let i = t.$data(e),
        n = t.findClosest(e, (r) => r.__optionKey);
      if (!n) throw 'No x-combobox:option directive found...';
      return {
        get isActive() {
          return i.__context.isActiveKey(n.__optionKey);
        },
        get isSelected() {
          return i.__isSelected(n);
        },
        get isDisabled() {
          return i.__context.isDisabled(n.__optionKey);
        },
      };
    });
}
function vr(t, e) {
  e.bind(t, {
    'x-id'() {
      return ['alpine-listbox-button', 'alpine-listbox-options', 'alpine-listbox-label'];
    },
    'x-modelable': '__value',
    'x-data'() {
      return {
        __ready: !1,
        __value: null,
        __isOpen: !1,
        __context: void 0,
        __isMultiple: void 0,
        __isStatic: !1,
        __isDisabled: void 0,
        __compareBy: null,
        __inputName: null,
        __orientation: 'vertical',
        __hold: !1,
        init() {
          (this.__isMultiple = e.extractProp(t, 'multiple', !1)),
            (this.__isDisabled = e.extractProp(t, 'disabled', !1)),
            (this.__inputName = e.extractProp(t, 'name', null)),
            (this.__compareBy = e.extractProp(t, 'by')),
            (this.__orientation = e.extractProp(t, 'horizontal', !1) ? 'horizontal' : 'vertical'),
            (this.__context = di(e, this.__isMultiple, this.__orientation, () =>
              this.$data.__activateSelectedOrFirst(),
            ));
          let i = e.extractProp(t, 'default-value', this.__isMultiple ? [] : null);
          (this.__value = i),
            queueMicrotask(() => {
              e.effect(() => {
                this.__inputName && fi(e, this.$el, this.__inputName, this.__value);
              }),
                e.effect(() => {
                  this.__resetInput();
                });
            });
        },
        __resetInput() {
          let i = this.$refs.__input;
          if (!i) return;
          let n = this.$data.__getCurrentValue();
          i.value = n;
        },
        __getCurrentValue() {
          return !this.$refs.__input || !this.__value
            ? ''
            : this.$data.__displayValue && this.__value !== void 0
            ? this.$data.__displayValue(this.__value)
            : typeof this.__value == 'string'
            ? this.__value
            : '';
        },
        __open() {
          if (this.__isOpen) return;
          (this.__isOpen = !0),
            this.__activateSelectedOrFirst(),
            ((n) => requestAnimationFrame(() => requestAnimationFrame(n)))(() =>
              this.$refs.__options.focus({ preventScroll: !0 }),
            );
        },
        __close() {
          (this.__isOpen = !1),
            this.__context.deactivate(),
            this.$nextTick(() => this.$refs.__button.focus({ preventScroll: !0 }));
        },
        __activateSelectedOrFirst(i = !0) {
          if (!this.__isOpen) return;
          if (this.__context.activeKey) {
            this.__context.activateAndScrollToKey(this.__context.activeKey);
            return;
          }
          let n;
          if (
            (this.__isMultiple
              ? (n = this.__value.find((r) => !!this.__context.getItemByValue(r)))
              : (n = this.__value),
            i && n)
          ) {
            let r = this.__context.getItemByValue(n);
            r && this.__context.activateAndScrollToKey(r.key);
          } else this.__context.activateAndScrollToKey(this.__context.firstKey());
        },
        __selectActive() {
          let i = this.$data.__context.getActiveItem();
          i && this.__toggleSelected(i.value);
        },
        __selectOption(i) {
          let n = this.__context.getItemByEl(i);
          n && this.__toggleSelected(n.value);
        },
        __isSelected(i) {
          let n = this.__context.getItemByEl(i);
          return !n || !n.value ? !1 : this.__hasSelected(n.value);
        },
        __toggleSelected(i) {
          if (!this.__isMultiple) {
            this.__value = i;
            return;
          }
          let n = this.__value.findIndex((r) => this.__compare(r, i));
          n === -1 ? this.__value.push(i) : this.__value.splice(n, 1);
        },
        __hasSelected(i) {
          return this.__isMultiple
            ? this.__value.some((n) => this.__compare(n, i))
            : this.__compare(this.__value, i);
        },
        __compare(i, n) {
          let r = this.__compareBy;
          if ((r || (r = (s, a) => e.raw(s) === e.raw(a)), typeof r == 'string')) {
            let s = r;
            r = (a, o) => a[s] === o[s];
          }
          return r(i, n);
        },
      };
    },
  });
}
function br(t, e) {
  e.bind(t, {
    'x-ref': '__label',
    ':id'() {
      return this.$id('alpine-listbox-label');
    },
    '@click'() {
      this.$refs.__button.focus({ preventScroll: !0 });
    },
  });
}
function gr(t, e) {
  e.bind(t, {
    'x-ref': '__button',
    ':id'() {
      return this.$id('alpine-listbox-button');
    },
    'aria-haspopup': 'true',
    ':aria-labelledby'() {
      return this.$id('alpine-listbox-label');
    },
    ':aria-expanded'() {
      return this.$data.__isOpen;
    },
    ':aria-controls'() {
      return this.$data.__isOpen && this.$id('alpine-listbox-options');
    },
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button');
    },
    '@click'() {
      this.$data.__open();
    },
    '@keydown'(i) {
      ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(i.key) &&
        (i.stopPropagation(), i.preventDefault(), this.$data.__open());
    },
    '@keydown.space.stop.prevent'() {
      this.$data.__open();
    },
    '@keydown.enter.stop.prevent'() {
      this.$data.__open();
    },
  });
}
function mr(t, e) {
  e.bind(t, {
    'x-ref': '__options',
    ':id'() {
      return this.$id('alpine-listbox-options');
    },
    role: 'listbox',
    tabindex: '0',
    ':aria-orientation'() {
      return this.$data.__orientation;
    },
    ':aria-labelledby'() {
      return this.$id('alpine-listbox-button');
    },
    ':aria-activedescendant'() {
      if (!this.$data.__context.hasActive()) return;
      let i = this.$data.__context.getActiveItem();
      return i ? i.el.id : null;
    },
    'x-init'() {
      (this.$data.__isStatic = e.extractProp(this.$el, 'static', !1)),
        e.bound(this.$el, 'hold') && (this.$data.__hold = !0);
    },
    'x-show'() {
      return this.$data.__isStatic ? !0 : this.$data.__isOpen;
    },
    'x-trap'() {
      return this.$data.__isOpen;
    },
    '@click.outside'() {
      this.$data.__close();
    },
    '@keydown.escape.stop.prevent'() {
      this.$data.__close();
    },
    '@focus'() {
      this.$data.__activateSelectedOrFirst();
    },
    '@keydown'(i) {
      queueMicrotask(() =>
        this.$data.__context.activateByKeyEvent(
          i,
          !0,
          () => this.$data.__isOpen,
          () => this.$data.__open(),
          () => {},
        ),
      );
    },
    '@keydown.enter.stop.prevent'() {
      this.$data.__selectActive(), this.$data.__isMultiple || this.$data.__close();
    },
    '@keydown.space.stop.prevent'() {
      this.$data.__selectActive(), this.$data.__isMultiple || this.$data.__close();
    },
  });
}
function yr(t, e) {
  e.bind(t, () => ({
    'x-id'() {
      return ['alpine-listbox-option'];
    },
    ':id'() {
      return this.$id('alpine-listbox-option');
    },
    role: 'option',
    ':tabindex'() {
      return this.$listboxOption.isDisabled ? !1 : '-1';
    },
    ':aria-selected'() {
      return this.$listboxOption.isSelected;
    },
    'x-data'() {
      return {
        init() {
          let i = (t.__optionKey = (Math.random() + 1).toString(36).substring(7)),
            n = e.extractProp(t, 'value'),
            r = e.extractProp(t, 'disabled', !1, !1);
          this.$data.__context.registerItem(i, t, n, r);
        },
        destroy() {
          this.$data.__context.unregisterItem(this.$el.__optionKey);
        },
      };
    },
    '@click'() {
      this.$listboxOption.isDisabled ||
        (this.$data.__selectOption(t), this.$data.__isMultiple || this.$data.__close());
    },
    '@mouseenter'() {
      this.$data.__context.activateEl(t);
    },
    '@mouseleave'() {
      this.$data.__hold || this.$data.__context.deactivate();
    },
  }));
}
function xr(t) {
  t.directive('popover', (e, i) => {
    i.value
      ? i.value === 'overlay'
        ? Sr(e, t)
        : i.value === 'button'
        ? wr(e, t)
        : i.value === 'panel'
        ? Er(e, t)
        : i.value === 'group' && Or(e, t)
      : $r(e, t);
  }),
    t.magic('popover', (e) => {
      let i = t.$data(e);
      return {
        get isOpen() {
          return i.__isOpenState;
        },
        open() {
          i.__open();
        },
        close() {
          i.__close();
        },
      };
    });
}
function $r(t, e) {
  e.bind(t, {
    'x-id'() {
      return ['alpine-popover-button', 'alpine-popover-panel'];
    },
    'x-modelable': '__isOpenState',
    'x-data'() {
      return {
        init() {
          this.$data.__groupEl &&
            this.$data.__groupEl.addEventListener('__close-others', ({ detail: i }) => {
              i.el.isSameNode(this.$el) || this.__close(!1);
            });
        },
        __buttonEl: void 0,
        __panelEl: void 0,
        __isStatic: !1,
        get __isOpen() {
          return this.__isStatic ? !0 : this.__isOpenState;
        },
        __isOpenState: !1,
        __open() {
          (this.__isOpenState = !0), this.$dispatch('__close-others', { el: this.$el });
        },
        __toggle() {
          this.__isOpenState ? this.__close() : this.__open();
        },
        __close(i) {
          this.__isStatic ||
            ((this.__isOpenState = !1),
            i !== !1 &&
              ((i = i || this.$data.__buttonEl),
              !document.activeElement.isSameNode(i) && setTimeout(() => i.focus())));
        },
        __contains(i, n) {
          return !!e.findClosest(n, (r) => r.isSameNode(i));
        },
      };
    },
    '@keydown.escape.stop.prevent'() {
      this.__close();
    },
    '@focusin.window'() {
      if (this.$data.__groupEl) {
        this.$data.__contains(this.$data.__groupEl, document.activeElement) ||
          this.$data.__close(!1);
        return;
      }
      this.$data.__contains(this.$el, document.activeElement) || this.$data.__close(!1);
    },
  });
}
function wr(t, e) {
  e.bind(t, {
    'x-ref': 'button',
    ':id'() {
      return this.$id('alpine-popover-button');
    },
    ':aria-expanded'() {
      return this.$data.__isOpen;
    },
    ':aria-controls'() {
      return this.$data.__isOpen && this.$id('alpine-popover-panel');
    },
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button'),
        (this.$data.__buttonEl = this.$el);
    },
    '@click'() {
      this.$data.__toggle();
    },
    '@keydown.tab'(i) {
      if (!i.shiftKey && this.$data.__isOpen) {
        let n = this.$focus.within(this.$data.__panelEl).getFirst();
        n && (i.preventDefault(), i.stopPropagation(), this.$focus.focus(n));
      }
    },
    '@keyup.tab'(i) {
      if (this.$data.__isOpen) {
        let n = this.$focus.previouslyFocused();
        if (!n) return;
        !this.$data.__buttonEl.contains(n) &&
          !this.$data.__panelEl.contains(n) &&
          n &&
          this.$el.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING &&
          (i.preventDefault(),
          i.stopPropagation(),
          this.$focus.within(this.$data.__panelEl).last());
      }
    },
    '@keydown.space.stop.prevent'() {
      this.$data.__toggle();
    },
    '@keydown.enter.stop.prevent'() {
      this.$data.__toggle();
    },
    '@keyup.space.stop.prevent'() {},
  });
}
function Er(t, e) {
  e.bind(t, {
    'x-init'() {
      (this.$data.__isStatic = e.bound(this.$el, 'static', !1)), (this.$data.__panelEl = this.$el);
    },
    'x-effect'() {
      this.$data.__isOpen && e.bound(t, 'focus') && this.$focus.first();
    },
    'x-ref': 'panel',
    ':id'() {
      return this.$id('alpine-popover-panel');
    },
    'x-show'() {
      return this.$data.__isOpen;
    },
    '@mousedown.window'(i) {
      this.$data.__isOpen &&
        (this.$data.__contains(this.$data.__buttonEl, i.target) ||
          this.$data.__contains(this.$el, i.target) ||
          this.$focus.focusable(i.target) ||
          this.$data.__close());
    },
    '@keydown.tab'(i) {
      if (i.shiftKey && this.$focus.isFirst(i.target))
        i.preventDefault(),
          i.stopPropagation(),
          e.bound(t, 'focus') ? this.$data.__close() : this.$data.__buttonEl.focus();
      else if (!i.shiftKey && this.$focus.isLast(i.target)) {
        i.preventDefault(), i.stopPropagation();
        let n = this.$focus.within(document).all(),
          r = n.indexOf(this.$data.__buttonEl);
        n
          .splice(r + 1)
          .filter((a) => !this.$el.contains(a))[0]
          .focus(),
          e.bound(t, 'focus') && this.$data.__close(!1);
      }
    },
  });
}
function Or(t, e) {
  e.bind(t, {
    'x-ref': 'container',
    'x-data'() {
      return { __groupEl: this.$el };
    },
  });
}
function Sr(t, e) {
  e.bind(t, {
    'x-show'() {
      return this.$data.__isOpen;
    },
  });
}
function Ir(t) {
  t
    .directive('menu', (e, i) => {
      i.value
        ? i.value === 'items'
          ? Cr(e, t)
          : i.value === 'item'
          ? Dr(e, t)
          : i.value === 'button' && Tr(e, t)
        : kr(e, t);
    })
    .before('bind'),
    t.magic('menuItem', (e) => {
      let i = t.$data(e);
      return {
        get isActive() {
          return i.__activeEl == i.__itemEl;
        },
        get isDisabled() {
          return e.__isDisabled.value;
        },
      };
    });
}
function kr(t, e) {
  e.bind(t, {
    'x-id'() {
      return ['alpine-menu-button', 'alpine-menu-items'];
    },
    'x-modelable': '__isOpen',
    'x-data'() {
      return {
        __itemEls: [],
        __activeEl: null,
        __isOpen: !1,
        __open() {
          (this.__isOpen = !0),
            ((n) => requestAnimationFrame(() => requestAnimationFrame(n)))(() =>
              this.$refs.__items.focus({ preventScroll: !0 }),
            );
        },
        __close(i = !0) {
          (this.__isOpen = !1),
            i && this.$nextTick(() => this.$refs.__button.focus({ preventScroll: !0 }));
        },
        __contains(i, n) {
          return !!e.findClosest(n, (r) => r.isSameNode(i));
        },
      };
    },
    '@focusin.window'() {
      this.$data.__contains(this.$el, document.activeElement) || this.$data.__close(!1);
    },
  });
}
function Tr(t, e) {
  e.bind(t, {
    'x-ref': '__button',
    'aria-haspopup': 'true',
    ':aria-labelledby'() {
      return this.$id('alpine-menu-label');
    },
    ':id'() {
      return this.$id('alpine-menu-button');
    },
    ':aria-expanded'() {
      return this.$data.__isOpen;
    },
    ':aria-controls'() {
      return this.$data.__isOpen && this.$id('alpine-menu-items');
    },
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button');
    },
    '@click'() {
      this.$data.__open();
    },
    '@keydown.down.stop.prevent'() {
      this.$data.__open();
    },
    '@keydown.up.stop.prevent'() {
      this.$data.__open(F.Alpine, last);
    },
    '@keydown.space.stop.prevent'() {
      this.$data.__open();
    },
    '@keydown.enter.stop.prevent'() {
      this.$data.__open();
    },
  });
}
function Cr(t, e) {
  e.bind(t, {
    'x-ref': '__items',
    'aria-orientation': 'vertical',
    role: 'menu',
    ':id'() {
      return this.$id('alpine-menu-items');
    },
    ':aria-labelledby'() {
      return this.$id('alpine-menu-button');
    },
    ':aria-activedescendant'() {
      return this.$data.__activeEl && this.$data.__activeEl.id;
    },
    'x-show'() {
      return this.$data.__isOpen;
    },
    tabindex: '0',
    '@click.outside'() {
      this.$data.__close();
    },
    '@keydown'(i) {
      F.search(e, this.$refs.__items, i.key, (n) => n.__activate());
    },
    '@keydown.down.stop.prevent'() {
      this.$data.__activeEl
        ? F.next(e, this.$data.__activeEl, (i) => i.__activate())
        : F.first(e, this.$refs.__items, (i) => i.__activate());
    },
    '@keydown.up.stop.prevent'() {
      this.$data.__activeEl
        ? F.previous(e, this.$data.__activeEl, (i) => i.__activate())
        : F.last(e, this.$refs.__items, (i) => i.__activate());
    },
    '@keydown.home.stop.prevent'() {
      F.first(e, this.$refs.__items, (i) => i.__activate());
    },
    '@keydown.end.stop.prevent'() {
      F.last(e, this.$refs.__items, (i) => i.__activate());
    },
    '@keydown.page-up.stop.prevent'() {
      F.first(e, this.$refs.__items, (i) => i.__activate());
    },
    '@keydown.page-down.stop.prevent'() {
      F.last(e, this.$refs.__items, (i) => i.__activate());
    },
    '@keydown.escape.stop.prevent'() {
      this.$data.__close();
    },
    '@keydown.space.stop.prevent'() {
      this.$data.__activeEl && this.$data.__activeEl.click();
    },
    '@keydown.enter.stop.prevent'() {
      this.$data.__activeEl && this.$data.__activeEl.click();
    },
    '@keyup.space.prevent'() {},
  });
}
function Dr(t, e) {
  e.bind(t, () => ({
    'x-data'() {
      return {
        __itemEl: this.$el,
        init() {
          let i = e.raw(this.$data.__itemEls),
            n = !1;
          for (let r = 0; r < i.length; r++)
            if (i[r].compareDocumentPosition(this.$el) & Node.DOCUMENT_POSITION_PRECEDING) {
              i.splice(r, 0, this.$el), (n = !0);
              break;
            }
          n || i.push(this.$el),
            (this.$el.__activate = () => {
              (this.$data.__activeEl = this.$el), this.$el.scrollIntoView({ block: 'nearest' });
            }),
            (this.$el.__deactivate = () => {
              this.$data.__activeEl = null;
            }),
            (this.$el.__isDisabled = e.reactive({ value: !1 })),
            queueMicrotask(() => {
              this.$el.__isDisabled.value = e.bound(this.$el, 'disabled', !1);
            });
        },
        destroy() {
          let i = this.$data.__itemEls;
          i.splice(i.indexOf(this.$el), 1);
        },
      };
    },
    'x-id'() {
      return ['alpine-menu-item'];
    },
    ':id'() {
      return this.$id('alpine-menu-item');
    },
    ':tabindex'() {
      return this.$el.__isDisabled.value ? !1 : '-1';
    },
    role: 'menuitem',
    '@mousemove'() {
      this.$el.__isDisabled.value || this.$menuItem.isActive || this.$el.__activate();
    },
    '@mouseleave'() {
      this.$el.__isDisabled.value || !this.$menuItem.isActive || this.$el.__deactivate();
    },
  }));
}
var F = {
  first(t, e, i = (r) => r, n = () => {}) {
    let r = t.$data(e).__itemEls[0];
    return r
      ? r.tagName.toLowerCase() === 'template'
        ? this.next(t, r, i)
        : r.__isDisabled.value
        ? this.next(t, r, i)
        : i(r)
      : n();
  },
  last(t, e, i = (r) => r, n = () => {}) {
    let r = t.$data(e).__itemEls.slice(-1)[0];
    return r ? (r.__isDisabled.value ? this.previous(t, r, i) : i(r)) : n();
  },
  next(t, e, i = (r) => r, n = () => {}) {
    if (!e) return n();
    let r = t.$data(e).__itemEls,
      s = r[r.indexOf(e) + 1];
    return s
      ? s.__isDisabled.value || s.tagName.toLowerCase() === 'template'
        ? this.next(t, s, i, n)
        : i(s)
      : n();
  },
  previous(t, e, i = (r) => r, n = () => {}) {
    if (!e) return n();
    let r = t.$data(e).__itemEls,
      s = r[r.indexOf(e) - 1];
    return s
      ? s.__isDisabled.value || s.tagName.toLowerCase() === 'template'
        ? this.previous(t, s, i, n)
        : i(s)
      : n();
  },
  searchQuery: '',
  debouncedClearSearch: void 0,
  clearSearch(t) {
    this.debouncedClearSearch ||
      (this.debouncedClearSearch = t.debounce(function () {
        this.searchQuery = '';
      }, 350)),
      this.debouncedClearSearch();
  },
  search(t, e, i, n) {
    if (i.length > 1) return;
    this.searchQuery += i;
    let s = t
      .raw(t.$data(e).__itemEls)
      .find((a) => a.textContent.trim().toLowerCase().startsWith(this.searchQuery));
    s && !s.__isDisabled.value && n(s), this.clearSearch(t);
  },
};
function Nr(t) {
  t
    .directive('switch', (e, i) => {
      i.value === 'group'
        ? Pr(e, t)
        : i.value === 'label'
        ? Lr(e, t)
        : i.value === 'description'
        ? Kr(e, t)
        : Fr(e, t);
    })
    .before('bind'),
    t.magic('switch', (e) => {
      let i = t.$data(e);
      return {
        get isChecked() {
          return i.__value === !0;
        },
      };
    });
}
function Pr(t, e) {
  e.bind(t, {
    'x-id'() {
      return ['alpine-switch-label', 'alpine-switch-description'];
    },
    'x-data'() {
      return { __hasLabel: !1, __hasDescription: !1, __switchEl: void 0 };
    },
  });
}
function Fr(t, e) {
  e.bind(t, {
    'x-modelable': '__value',
    'x-data'() {
      return {
        init() {
          queueMicrotask(() => {
            (this.__value = e.bound(this.$el, 'default-checked', !1)),
              (this.__inputName = e.bound(this.$el, 'name', !1)),
              (this.__inputValue = e.bound(this.$el, 'value', 'on')),
              (this.__inputId = 'alpine-switch-' + Date.now());
          });
        },
        __value: void 0,
        __inputName: void 0,
        __inputValue: void 0,
        __inputId: void 0,
        __toggle() {
          this.__value = !this.__value;
        },
      };
    },
    'x-effect'() {
      let i = this.__value;
      if (!this.__inputName) return;
      let n = this.$el.nextElementSibling;
      if ((n && String(n.id) === String(this.__inputId) && n.remove(), i)) {
        let r = document.createElement('input');
        (r.type = 'hidden'),
          (r.value = this.__inputValue),
          (r.name = this.__inputName),
          (r.id = this.__inputId),
          this.$el.after(r);
      }
    },
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button'),
        (this.$data.__switchEl = this.$el);
    },
    role: 'switch',
    tabindex: '0',
    ':aria-checked'() {
      return !!this.__value;
    },
    ':aria-labelledby'() {
      return this.$data.__hasLabel && this.$id('alpine-switch-label');
    },
    ':aria-describedby'() {
      return this.$data.__hasDescription && this.$id('alpine-switch-description');
    },
    '@click.prevent'() {
      this.__toggle();
    },
    '@keyup'(i) {
      i.key !== 'Tab' && i.preventDefault(), i.key === ' ' && this.__toggle();
    },
    '@keypress.prevent'() {},
  });
}
function Lr(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__hasLabel = !0;
    },
    ':id'() {
      return this.$id('alpine-switch-label');
    },
    '@click'() {
      this.$data.__switchEl.click(), this.$data.__switchEl.focus({ preventScroll: !0 });
    },
  });
}
function Kr(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__hasDescription = !0;
    },
    ':id'() {
      return this.$id('alpine-switch-description');
    },
  });
}
function Mr(t) {
  t
    .directive('radio', (e, i) => {
      i.value
        ? i.value === 'option'
          ? Ar(e, t)
          : i.value === 'label'
          ? Br(e, t)
          : i.value === 'description' && jr(e, t)
        : Rr(e, t);
    })
    .before('bind'),
    t.magic('radioOption', (e) => {
      let i = t.$data(e);
      return {
        get isActive() {
          return i.__option === i.__active;
        },
        get isChecked() {
          return i.__option === i.__value;
        },
        get isDisabled() {
          let n = i.__disabled;
          return i.__rootDisabled ? !0 : n;
        },
      };
    });
}
function Rr(t, e) {
  e.bind(t, {
    'x-modelable': '__value',
    'x-data'() {
      return {
        init() {
          queueMicrotask(() => {
            (this.__rootDisabled = e.bound(t, 'disabled', !1)),
              (this.__value = e.bound(this.$el, 'default-value', !1)),
              (this.__inputName = e.bound(this.$el, 'name', !1)),
              (this.__inputId = 'alpine-radio-' + Date.now());
          }),
            this.$nextTick(() => {
              let i = document.createTreeWalker(
                this.$el,
                NodeFilter.SHOW_ELEMENT,
                {
                  acceptNode: (n) =>
                    n.getAttribute('role') === 'radio'
                      ? NodeFilter.FILTER_REJECT
                      : n.hasAttribute('role')
                      ? NodeFilter.FILTER_SKIP
                      : NodeFilter.FILTER_ACCEPT,
                },
                !1,
              );
              for (; i.nextNode(); ) i.currentNode.setAttribute('role', 'none');
            });
        },
        __value: void 0,
        __active: void 0,
        __rootEl: this.$el,
        __optionValues: [],
        __disabledOptions: new Set(),
        __optionElsByValue: new Map(),
        __hasLabel: !1,
        __hasDescription: !1,
        __rootDisabled: !1,
        __inputName: void 0,
        __inputId: void 0,
        __change(i) {
          this.__rootDisabled || (this.__value = i);
        },
        __addOption(i, n, r) {
          let s = e.raw(this.__optionValues),
            a = s.map((l) => this.__optionElsByValue.get(l)),
            o = !1;
          for (let l = 0; l < a.length; l++)
            if (a[l].compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) {
              s.splice(l, 0, i), this.__optionElsByValue.set(i, n), (o = !0);
              break;
            }
          o || (s.push(i), this.__optionElsByValue.set(i, n)), r && this.__disabledOptions.add(i);
        },
        __isFirstOption(i) {
          return this.__optionValues.indexOf(i) === 0;
        },
        __setActive(i) {
          this.__active = i;
        },
        __focusOptionNext() {
          let i = this.__active,
            n = this.__optionValues.filter((s) => !this.__disabledOptions.has(s)),
            r = n[this.__optionValues.indexOf(i) + 1];
          (r = r || n[0]), this.__optionElsByValue.get(r).focus(), this.__change(r);
        },
        __focusOptionPrev() {
          let i = this.__active,
            n = this.__optionValues.filter((s) => !this.__disabledOptions.has(s)),
            r = n[n.indexOf(i) - 1];
          (r = r || n.slice(-1)[0]), this.__optionElsByValue.get(r).focus(), this.__change(r);
        },
      };
    },
    'x-effect'() {
      let i = this.__value;
      if (!this.__inputName) return;
      let n = this.$el.nextElementSibling;
      if ((n && String(n.id) === String(this.__inputId) && n.remove(), i)) {
        let r = document.createElement('input');
        (r.type = 'hidden'),
          (r.value = i),
          (r.name = this.__inputName),
          (r.id = this.__inputId),
          this.$el.after(r);
      }
    },
    role: 'radiogroup',
    'x-id'() {
      return ['alpine-radio-label', 'alpine-radio-description'];
    },
    ':aria-labelledby'() {
      return this.__hasLabel && this.$id('alpine-radio-label');
    },
    ':aria-describedby'() {
      return this.__hasDescription && this.$id('alpine-radio-description');
    },
    '@keydown.up.prevent.stop'() {
      this.__focusOptionPrev();
    },
    '@keydown.left.prevent.stop'() {
      this.__focusOptionPrev();
    },
    '@keydown.down.prevent.stop'() {
      this.__focusOptionNext();
    },
    '@keydown.right.prevent.stop'() {
      this.__focusOptionNext();
    },
  });
}
function Ar(t, e) {
  e.bind(t, {
    'x-data'() {
      return {
        init() {
          queueMicrotask(() => {
            (this.__disabled = e.bound(t, 'disabled', !1)),
              (this.__option = e.bound(t, 'value')),
              this.$data.__addOption(this.__option, this.$el, this.__disabled);
          });
        },
        __option: void 0,
        __disabled: !1,
        __hasLabel: !1,
        __hasDescription: !1,
      };
    },
    'x-id'() {
      return ['alpine-radio-label', 'alpine-radio-description'];
    },
    role: 'radio',
    ':aria-checked'() {
      return this.$radioOption.isChecked;
    },
    ':aria-disabled'() {
      return this.$radioOption.isDisabled;
    },
    ':aria-labelledby'() {
      return this.__hasLabel && this.$id('alpine-radio-label');
    },
    ':aria-describedby'() {
      return this.__hasDescription && this.$id('alpine-radio-description');
    },
    ':tabindex'() {
      return this.$radioOption.isDisabled
        ? -1
        : this.$radioOption.isChecked ||
          (!this.$data.__value && this.$data.__isFirstOption(this.$data.__option))
        ? 0
        : -1;
    },
    '@click'() {
      this.$radioOption.isDisabled || (this.$data.__change(this.$data.__option), this.$el.focus());
    },
    '@focus'() {
      this.$radioOption.isDisabled || this.$data.__setActive(this.$data.__option);
    },
    '@blur'() {
      this.$data.__active === this.$data.__option && this.$data.__setActive(void 0);
    },
    '@keydown.space.stop.prevent'() {
      this.$data.__change(this.$data.__option);
    },
  });
}
function Br(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__hasLabel = !0;
    },
    ':id'() {
      return this.$id('alpine-radio-label');
    },
  });
}
function jr(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__hasDescription = !0;
    },
    ':id'() {
      return this.$id('alpine-radio-description');
    },
  });
}
function Vr(t) {
  t
    .directive('tabs', (e, i) => {
      i.value
        ? i.value === 'list'
          ? Wr(e, t)
          : i.value === 'tab'
          ? Hr(e, t)
          : i.value === 'panels'
          ? Ur(e, t)
          : i.value === 'panel' && zr(e, t)
        : qr(e, t);
    })
    .before('bind'),
    t.magic('tab', (e) => {
      let i = t.$data(e);
      return {
        get isSelected() {
          return i.__selectedIndex === i.__tabs.indexOf(i.__tabEl);
        },
        get isDisabled() {
          return i.__isDisabled;
        },
      };
    }),
    t.magic('panel', (e) => {
      let i = t.$data(e);
      return {
        get isSelected() {
          return i.__selectedIndex === i.__panels.indexOf(i.__panelEl);
        },
      };
    });
}
function qr(t, e) {
  e.bind(t, {
    'x-modelable': '__selectedIndex',
    'x-data'() {
      return {
        init() {
          queueMicrotask(() => {
            let i = this.__selectedIndex || Number(e.bound(this.$el, 'default-index', 0)),
              n = this.__activeTabs(),
              r = (s, a, o) => Math.min(Math.max(s, a), o);
            (this.__selectedIndex = r(i, 0, n.length - 1)),
              e.effect(() => {
                this.__manualActivation = e.bound(this.$el, 'manual', !1);
              });
          });
        },
        __tabs: [],
        __panels: [],
        __selectedIndex: null,
        __tabGroupEl: void 0,
        __manualActivation: !1,
        __addTab(i) {
          this.__tabs.push(i);
        },
        __addPanel(i) {
          this.__panels.push(i);
        },
        __selectTab(i) {
          this.__selectedIndex = this.__tabs.indexOf(i);
        },
        __activeTabs() {
          return this.__tabs.filter((i) => !i.__disabled);
        },
      };
    },
  });
}
function Wr(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$data.__tabGroupEl = this.$el;
    },
  });
}
function Hr(t, e) {
  e.bind(t, {
    'x-init'() {
      this.$el.tagName.toLowerCase() === 'button' &&
        !this.$el.hasAttribute('type') &&
        (this.$el.type = 'button');
    },
    'x-data'() {
      return {
        init() {
          (this.__tabEl = this.$el),
            this.$data.__addTab(this.$el),
            (this.__tabEl.__disabled = e.bound(this.$el, 'disabled', !1)),
            (this.__isDisabled = this.__tabEl.__disabled);
        },
        __tabEl: void 0,
        __isDisabled: !1,
      };
    },
    '@click'() {
      this.$el.__disabled || (this.$data.__selectTab(this.$el), this.$el.focus());
    },
    '@keydown.enter.prevent.stop'() {
      this.__selectTab(this.$el);
    },
    '@keydown.space.prevent.stop'() {
      this.__selectTab(this.$el);
    },
    '@keydown.home.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).first();
    },
    '@keydown.page-up.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).first();
    },
    '@keydown.end.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).last();
    },
    '@keydown.page-down.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).last();
    },
    '@keydown.down.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().next();
    },
    '@keydown.right.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().next();
    },
    '@keydown.up.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev();
    },
    '@keydown.left.prevent.stop'() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev();
    },
    ':tabindex'() {
      return this.$tab.isSelected ? 0 : -1;
    },
    '@focus'() {
      if (this.$data.__manualActivation) this.$el.focus();
      else {
        if (this.$el.__disabled) return;
        this.$data.__selectTab(this.$el), this.$el.focus();
      }
    },
  });
}
function Ur(t, e) {
  e.bind(t, {});
}
function zr(t, e) {
  e.bind(t, {
    ':tabindex'() {
      return this.$panel.isSelected ? 0 : -1;
    },
    'x-data'() {
      return {
        init() {
          (this.__panelEl = this.$el), this.$data.__addPanel(this.$el);
        },
        __panelEl: void 0,
      };
    },
    'x-show'() {
      return this.$panel.isSelected;
    },
  });
}
function Gr(t) {
  Xn(t), sr(t), dr(t), pr(t), Ir(t), Nr(t), xr(t), Mr(t), Vr(t);
}
var Jr = Gr,
  Jt = !1,
  Qt = !1,
  U = [],
  Yt = -1;
function Qr(t) {
  Yr(t);
}
function Yr(t) {
  U.includes(t) || U.push(t), Xr();
}
function pi(t) {
  let e = U.indexOf(t);
  e !== -1 && e > Yt && U.splice(e, 1);
}
function Xr() {
  !Qt && !Jt && ((Jt = !0), queueMicrotask(Zr));
}
function Zr() {
  (Jt = !1), (Qt = !0);
  for (let t = 0; t < U.length; t++) U[t](), (Yt = t);
  (U.length = 0), (Yt = -1), (Qt = !1);
}
var tt,
  et,
  ft,
  vi,
  Xt = !0;
function ts(t) {
  (Xt = !1), t(), (Xt = !0);
}
function es(t) {
  (tt = t.reactive),
    (ft = t.release),
    (et = (e) =>
      t.effect(e, {
        scheduler: (i) => {
          Xt ? Qr(i) : i();
        },
      })),
    (vi = t.raw);
}
function Ve(t) {
  et = t;
}
function is(t) {
  let e = () => {};
  return [
    (n) => {
      let r = et(n);
      return (
        t._x_effects ||
          ((t._x_effects = new Set()),
          (t._x_runEffects = () => {
            t._x_effects.forEach((s) => s());
          })),
        t._x_effects.add(r),
        (e = () => {
          r !== void 0 && (t._x_effects.delete(r), ft(r));
        }),
        r
      );
    },
    () => {
      e();
    },
  ];
}
function lt(t, e, i = {}) {
  t.dispatchEvent(new CustomEvent(e, { detail: i, bubbles: !0, composed: !0, cancelable: !0 }));
}
function j(t, e) {
  if (typeof ShadowRoot == 'function' && t instanceof ShadowRoot) {
    Array.from(t.children).forEach((r) => j(r, e));
    return;
  }
  let i = !1;
  if ((e(t, () => (i = !0)), i)) return;
  let n = t.firstElementChild;
  for (; n; ) j(n, e), (n = n.nextElementSibling);
}
function M(t, ...e) {
  console.warn(`Alpine Warning: ${t}`, ...e);
}
var qe = !1;
function ns() {
  qe &&
    M(
      'Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.',
    ),
    (qe = !0),
    document.body ||
      M(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
      ),
    lt(document, 'alpine:init'),
    lt(document, 'alpine:initializing'),
    ge(),
    as((e) => R(e, j)),
    pe((e) => he(e)),
    Si((e, i) => {
      $e(e, i).forEach((n) => n());
    });
  let t = (e) => !Ct(e.parentElement, !0);
  Array.from(document.querySelectorAll(mi()))
    .filter(t)
    .forEach((e) => {
      R(e);
    }),
    lt(document, 'alpine:initialized');
}
var _e = [],
  bi = [];
function gi() {
  return _e.map((t) => t());
}
function mi() {
  return _e.concat(bi).map((t) => t());
}
function yi(t) {
  _e.push(t);
}
function xi(t) {
  bi.push(t);
}
function Ct(t, e = !1) {
  return Dt(t, (i) => {
    if ((e ? mi() : gi()).some((r) => i.matches(r))) return !0;
  });
}
function Dt(t, e) {
  if (t) {
    if (e(t)) return t;
    if ((t._x_teleportBack && (t = t._x_teleportBack), !!t.parentElement))
      return Dt(t.parentElement, e);
  }
}
function rs(t) {
  return gi().some((e) => t.matches(e));
}
var $i = [];
function ss(t) {
  $i.push(t);
}
function R(t, e = j, i = () => {}) {
  xs(() => {
    e(t, (n, r) => {
      i(n, r),
        $i.forEach((s) => s(n, r)),
        $e(n, n.attributes).forEach((s) => s()),
        n._x_ignore && r();
    });
  });
}
function he(t) {
  j(t, (e) => {
    ki(e), os(e);
  });
}
var wi = [],
  Ei = [],
  Oi = [];
function as(t) {
  Oi.push(t);
}
function pe(t, e) {
  typeof e == 'function'
    ? (t._x_cleanups || (t._x_cleanups = []), t._x_cleanups.push(e))
    : ((e = t), Ei.push(e));
}
function Si(t) {
  wi.push(t);
}
function Ii(t, e, i) {
  t._x_attributeCleanups || (t._x_attributeCleanups = {}),
    t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []),
    t._x_attributeCleanups[e].push(i);
}
function ki(t, e) {
  t._x_attributeCleanups &&
    Object.entries(t._x_attributeCleanups).forEach(([i, n]) => {
      (e === void 0 || e.includes(i)) && (n.forEach((r) => r()), delete t._x_attributeCleanups[i]);
    });
}
function os(t) {
  if (t._x_cleanups) for (; t._x_cleanups.length; ) t._x_cleanups.pop()();
}
var ve = new MutationObserver(ye),
  be = !1;
function ge() {
  ve.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }),
    (be = !0);
}
function Ti() {
  ls(), ve.disconnect(), (be = !1);
}
var ut = [],
  Bt = !1;
function ls() {
  (ut = ut.concat(ve.takeRecords())),
    ut.length &&
      !Bt &&
      ((Bt = !0),
      queueMicrotask(() => {
        us(), (Bt = !1);
      }));
}
function us() {
  ye(ut), (ut.length = 0);
}
function I(t) {
  if (!be) return t();
  Ti();
  let e = t();
  return ge(), e;
}
var me = !1,
  It = [];
function cs() {
  me = !0;
}
function ds() {
  (me = !1), ye(It), (It = []);
}
function ye(t) {
  if (me) {
    It = It.concat(t);
    return;
  }
  let e = [],
    i = [],
    n = new Map(),
    r = new Map();
  for (let s = 0; s < t.length; s++)
    if (
      !t[s].target._x_ignoreMutationObserver &&
      (t[s].type === 'childList' &&
        (t[s].addedNodes.forEach((a) => a.nodeType === 1 && e.push(a)),
        t[s].removedNodes.forEach((a) => a.nodeType === 1 && i.push(a))),
      t[s].type === 'attributes')
    ) {
      let a = t[s].target,
        o = t[s].attributeName,
        l = t[s].oldValue,
        u = () => {
          n.has(a) || n.set(a, []), n.get(a).push({ name: o, value: a.getAttribute(o) });
        },
        d = () => {
          r.has(a) || r.set(a, []), r.get(a).push(o);
        };
      a.hasAttribute(o) && l === null ? u() : a.hasAttribute(o) ? (d(), u()) : d();
    }
  r.forEach((s, a) => {
    ki(a, s);
  }),
    n.forEach((s, a) => {
      wi.forEach((o) => o(a, s));
    });
  for (let s of i) e.includes(s) || (Ei.forEach((a) => a(s)), he(s));
  e.forEach((s) => {
    (s._x_ignoreSelf = !0), (s._x_ignore = !0);
  });
  for (let s of e)
    i.includes(s) ||
      (s.isConnected &&
        (delete s._x_ignoreSelf,
        delete s._x_ignore,
        Oi.forEach((a) => a(s)),
        (s._x_ignore = !0),
        (s._x_ignoreSelf = !0)));
  e.forEach((s) => {
    delete s._x_ignoreSelf, delete s._x_ignore;
  }),
    (e = null),
    (i = null),
    (n = null),
    (r = null);
}
function Ci(t) {
  return ht(X(t));
}
function _t(t, e, i) {
  return (
    (t._x_dataStack = [e, ...X(i || t)]),
    () => {
      t._x_dataStack = t._x_dataStack.filter((n) => n !== e);
    }
  );
}
function X(t) {
  return t._x_dataStack
    ? t._x_dataStack
    : typeof ShadowRoot == 'function' && t instanceof ShadowRoot
    ? X(t.host)
    : t.parentNode
    ? X(t.parentNode)
    : [];
}
function ht(t) {
  return new Proxy({ objects: t }, fs);
}
var fs = {
  ownKeys({ objects: t }) {
    return Array.from(new Set(t.flatMap((e) => Object.keys(e))));
  },
  has({ objects: t }, e) {
    return e == Symbol.unscopables ? !1 : t.some((i) => Object.prototype.hasOwnProperty.call(i, e));
  },
  get({ objects: t }, e, i) {
    return e == 'toJSON'
      ? _s
      : Reflect.get(t.find((n) => Object.prototype.hasOwnProperty.call(n, e)) || {}, e, i);
  },
  set({ objects: t }, e, i, n) {
    const r = t.find((a) => Object.prototype.hasOwnProperty.call(a, e)) || t[t.length - 1],
      s = Object.getOwnPropertyDescriptor(r, e);
    return s?.set && s?.get ? Reflect.set(r, e, i, n) : Reflect.set(r, e, i);
  },
};
function _s() {
  return Reflect.ownKeys(this).reduce((e, i) => ((e[i] = Reflect.get(this, i)), e), {});
}
function Di(t) {
  let e = (n) => typeof n == 'object' && !Array.isArray(n) && n !== null,
    i = (n, r = '') => {
      Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
        ([s, { value: a, enumerable: o }]) => {
          if (o === !1 || a === void 0) return;
          let l = r === '' ? s : `${r}.${s}`;
          typeof a == 'object' && a !== null && a._x_interceptor
            ? (n[s] = a.initialize(t, l, s))
            : e(a) && a !== n && !(a instanceof Element) && i(a, l);
        },
      );
    };
  return i(t);
}
function Ni(t, e = () => {}) {
  let i = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(n, r, s) {
      return t(
        this.initialValue,
        () => hs(n, r),
        (a) => Zt(n, r, a),
        r,
        s,
      );
    },
  };
  return (
    e(i),
    (n) => {
      if (typeof n == 'object' && n !== null && n._x_interceptor) {
        let r = i.initialize.bind(i);
        i.initialize = (s, a, o) => {
          let l = n.initialize(s, a, o);
          return (i.initialValue = l), r(s, a, o);
        };
      } else i.initialValue = n;
      return i;
    }
  );
}
function hs(t, e) {
  return e.split('.').reduce((i, n) => i[n], t);
}
function Zt(t, e, i) {
  if ((typeof e == 'string' && (e = e.split('.')), e.length === 1)) t[e[0]] = i;
  else {
    if (e.length === 0) throw error;
    return t[e[0]] || (t[e[0]] = {}), Zt(t[e[0]], e.slice(1), i);
  }
}
var Pi = {};
function P(t, e) {
  Pi[t] = e;
}
function te(t, e) {
  return (
    Object.entries(Pi).forEach(([i, n]) => {
      let r = null;
      function s() {
        if (r) return r;
        {
          let [a, o] = Ai(e);
          return (r = { interceptor: Ni, ...a }), pe(e, o), r;
        }
      }
      Object.defineProperty(t, `$${i}`, {
        get() {
          return n(e, s());
        },
        enumerable: !1,
      });
    }),
    t
  );
}
function ps(t, e, i, ...n) {
  try {
    return i(...n);
  } catch (r) {
    dt(r, t, e);
  }
}
function dt(t, e, i = void 0) {
  Object.assign(t, { el: e, expression: i }),
    console.warn(
      `Alpine Expression Error: ${t.message}

${
  i
    ? 'Expression: "' +
      i +
      `"

`
    : ''
}`,
      e,
    ),
    setTimeout(() => {
      throw t;
    }, 0);
}
var Et = !0;
function Fi(t) {
  let e = Et;
  Et = !1;
  let i = t();
  return (Et = e), i;
}
function z(t, e, i = {}) {
  let n;
  return D(t, e)((r) => (n = r), i), n;
}
function D(...t) {
  return Li(...t);
}
var Li = Ki;
function vs(t) {
  Li = t;
}
function Ki(t, e) {
  let i = {};
  te(i, t);
  let n = [i, ...X(t)],
    r = typeof e == 'function' ? bs(n, e) : ms(n, e, t);
  return ps.bind(null, t, e, r);
}
function bs(t, e) {
  return (i = () => {}, { scope: n = {}, params: r = [] } = {}) => {
    let s = e.apply(ht([n, ...t]), r);
    kt(i, s);
  };
}
var jt = {};
function gs(t, e) {
  if (jt[t]) return jt[t];
  let i = Object.getPrototypeOf(async function () {}).constructor,
    n =
      /^[\n\s]*if.*\(.*\)/.test(t.trim()) || /^(let|const)\s/.test(t.trim())
        ? `(async()=>{ ${t} })()`
        : t,
    s = (() => {
      try {
        let a = new i(
          ['__self', 'scope'],
          `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`,
        );
        return Object.defineProperty(a, 'name', { value: `[Alpine] ${t}` }), a;
      } catch (a) {
        return dt(a, e, t), Promise.resolve();
      }
    })();
  return (jt[t] = s), s;
}
function ms(t, e, i) {
  let n = gs(e, i);
  return (r = () => {}, { scope: s = {}, params: a = [] } = {}) => {
    (n.result = void 0), (n.finished = !1);
    let o = ht([s, ...t]);
    if (typeof n == 'function') {
      let l = n(n, o).catch((u) => dt(u, i, e));
      n.finished
        ? (kt(r, n.result, o, a, i), (n.result = void 0))
        : l
            .then((u) => {
              kt(r, u, o, a, i);
            })
            .catch((u) => dt(u, i, e))
            .finally(() => (n.result = void 0));
    }
  };
}
function kt(t, e, i, n, r) {
  if (Et && typeof e == 'function') {
    let s = e.apply(i, n);
    s instanceof Promise ? s.then((a) => kt(t, a, i, n)).catch((a) => dt(a, r, e)) : t(s);
  } else typeof e == 'object' && e instanceof Promise ? e.then((s) => t(s)) : t(e);
}
var xe = 'x-';
function it(t = '') {
  return xe + t;
}
function ys(t) {
  xe = t;
}
var ee = {};
function S(t, e) {
  return (
    (ee[t] = e),
    {
      before(i) {
        if (!ee[i]) {
          console.warn(
            'Cannot find directive `${directive}`. `${name}` will use the default order of execution',
          );
          return;
        }
        const n = H.indexOf(i);
        H.splice(n >= 0 ? n : H.indexOf('DEFAULT'), 0, t);
      },
    }
  );
}
function $e(t, e, i) {
  if (((e = Array.from(e)), t._x_virtualDirectives)) {
    let s = Object.entries(t._x_virtualDirectives).map(([o, l]) => ({ name: o, value: l })),
      a = Mi(s);
    (s = s.map((o) =>
      a.find((l) => l.name === o.name) ? { name: `x-bind:${o.name}`, value: `"${o.value}"` } : o,
    )),
      (e = e.concat(s));
  }
  let n = {};
  return e
    .map(Vi((s, a) => (n[s] = a)))
    .filter(Wi)
    .map(ws(n, i))
    .sort(Es)
    .map((s) => $s(t, s));
}
function Mi(t) {
  return Array.from(t)
    .map(Vi())
    .filter((e) => !Wi(e));
}
var ie = !1,
  ot = new Map(),
  Ri = Symbol();
function xs(t) {
  ie = !0;
  let e = Symbol();
  (Ri = e), ot.set(e, []);
  let i = () => {
      for (; ot.get(e).length; ) ot.get(e).shift()();
      ot.delete(e);
    },
    n = () => {
      (ie = !1), i();
    };
  t(i), n();
}
function Ai(t) {
  let e = [],
    i = (o) => e.push(o),
    [n, r] = is(t);
  return (
    e.push(r),
    [
      { Alpine: pt, effect: n, cleanup: i, evaluateLater: D.bind(D, t), evaluate: z.bind(z, t) },
      () => e.forEach((o) => o()),
    ]
  );
}
function $s(t, e) {
  let i = () => {},
    n = ee[e.type] || i,
    [r, s] = Ai(t);
  Ii(t, e.original, s);
  let a = () => {
    t._x_ignore ||
      t._x_ignoreSelf ||
      (n.inline && n.inline(t, e, r), (n = n.bind(n, t, e, r)), ie ? ot.get(Ri).push(n) : n());
  };
  return (a.runCleanups = s), a;
}
var Bi =
    (t, e) =>
    ({ name: i, value: n }) => (i.startsWith(t) && (i = i.replace(t, e)), { name: i, value: n }),
  ji = (t) => t;
function Vi(t = () => {}) {
  return ({ name: e, value: i }) => {
    let { name: n, value: r } = qi.reduce((s, a) => a(s), { name: e, value: i });
    return n !== e && t(n, e), { name: n, value: r };
  };
}
var qi = [];
function we(t) {
  qi.push(t);
}
function Wi({ name: t }) {
  return Hi().test(t);
}
var Hi = () => new RegExp(`^${xe}([^:^.]+)\\b`);
function ws(t, e) {
  return ({ name: i, value: n }) => {
    let r = i.match(Hi()),
      s = i.match(/:([a-zA-Z0-9\-_:]+)/),
      a = i.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      o = e || t[i] || i;
    return {
      type: r ? r[1] : null,
      value: s ? s[1] : null,
      modifiers: a.map((l) => l.replace('.', '')),
      expression: n,
      original: o,
    };
  };
}
var ne = 'DEFAULT',
  H = [
    'ignore',
    'ref',
    'data',
    'id',
    'bind',
    'init',
    'for',
    'model',
    'modelable',
    'transition',
    'show',
    'if',
    ne,
    'teleport',
  ];
function Es(t, e) {
  let i = H.indexOf(t.type) === -1 ? ne : t.type,
    n = H.indexOf(e.type) === -1 ? ne : e.type;
  return H.indexOf(i) - H.indexOf(n);
}
var re = [],
  Ee = !1;
function Oe(t = () => {}) {
  return (
    queueMicrotask(() => {
      Ee ||
        setTimeout(() => {
          se();
        });
    }),
    new Promise((e) => {
      re.push(() => {
        t(), e();
      });
    })
  );
}
function se() {
  for (Ee = !1; re.length; ) re.shift()();
}
function Os() {
  Ee = !0;
}
function Se(t, e) {
  return Array.isArray(e)
    ? We(t, e.join(' '))
    : typeof e == 'object' && e !== null
    ? Ss(t, e)
    : typeof e == 'function'
    ? Se(t, e())
    : We(t, e);
}
function We(t, e) {
  let i = (r) =>
      r
        .split(' ')
        .filter((s) => !t.classList.contains(s))
        .filter(Boolean),
    n = (r) => (
      t.classList.add(...r),
      () => {
        t.classList.remove(...r);
      }
    );
  return (e = e === !0 ? (e = '') : e || ''), n(i(e));
}
function Ss(t, e) {
  let i = (o) => o.split(' ').filter(Boolean),
    n = Object.entries(e)
      .flatMap(([o, l]) => (l ? i(o) : !1))
      .filter(Boolean),
    r = Object.entries(e)
      .flatMap(([o, l]) => (l ? !1 : i(o)))
      .filter(Boolean),
    s = [],
    a = [];
  return (
    r.forEach((o) => {
      t.classList.contains(o) && (t.classList.remove(o), a.push(o));
    }),
    n.forEach((o) => {
      t.classList.contains(o) || (t.classList.add(o), s.push(o));
    }),
    () => {
      a.forEach((o) => t.classList.add(o)), s.forEach((o) => t.classList.remove(o));
    }
  );
}
function Nt(t, e) {
  return typeof e == 'object' && e !== null ? Is(t, e) : ks(t, e);
}
function Is(t, e) {
  let i = {};
  return (
    Object.entries(e).forEach(([n, r]) => {
      (i[n] = t.style[n]), n.startsWith('--') || (n = Ts(n)), t.style.setProperty(n, r);
    }),
    setTimeout(() => {
      t.style.length === 0 && t.removeAttribute('style');
    }),
    () => {
      Nt(t, i);
    }
  );
}
function ks(t, e) {
  let i = t.getAttribute('style', e);
  return (
    t.setAttribute('style', e),
    () => {
      t.setAttribute('style', i || '');
    }
  );
}
function Ts(t) {
  return t.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function ae(t, e = () => {}) {
  let i = !1;
  return function () {
    i ? e.apply(this, arguments) : ((i = !0), t.apply(this, arguments));
  };
}
S('transition', (t, { value: e, modifiers: i, expression: n }, { evaluate: r }) => {
  typeof n == 'function' && (n = r(n)),
    n !== !1 && (!n || typeof n == 'boolean' ? Ds(t, i, e) : Cs(t, n, e));
});
function Cs(t, e, i) {
  Ui(t, Se, ''),
    {
      enter: (r) => {
        t._x_transition.enter.during = r;
      },
      'enter-start': (r) => {
        t._x_transition.enter.start = r;
      },
      'enter-end': (r) => {
        t._x_transition.enter.end = r;
      },
      leave: (r) => {
        t._x_transition.leave.during = r;
      },
      'leave-start': (r) => {
        t._x_transition.leave.start = r;
      },
      'leave-end': (r) => {
        t._x_transition.leave.end = r;
      },
    }[i](e);
}
function Ds(t, e, i) {
  Ui(t, Nt);
  let n = !e.includes('in') && !e.includes('out') && !i,
    r = n || e.includes('in') || ['enter'].includes(i),
    s = n || e.includes('out') || ['leave'].includes(i);
  e.includes('in') && !n && (e = e.filter((m, w) => w < e.indexOf('out'))),
    e.includes('out') && !n && (e = e.filter((m, w) => w > e.indexOf('out')));
  let a = !e.includes('opacity') && !e.includes('scale'),
    o = a || e.includes('opacity'),
    l = a || e.includes('scale'),
    u = o ? 0 : 1,
    d = l ? st(e, 'scale', 95) / 100 : 1,
    _ = st(e, 'delay', 0) / 1e3,
    c = st(e, 'origin', 'center'),
    p = 'opacity, transform',
    b = st(e, 'duration', 150) / 1e3,
    y = st(e, 'duration', 75) / 1e3,
    v = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  r &&
    ((t._x_transition.enter.during = {
      transformOrigin: c,
      transitionDelay: `${_}s`,
      transitionProperty: p,
      transitionDuration: `${b}s`,
      transitionTimingFunction: v,
    }),
    (t._x_transition.enter.start = { opacity: u, transform: `scale(${d})` }),
    (t._x_transition.enter.end = { opacity: 1, transform: 'scale(1)' })),
    s &&
      ((t._x_transition.leave.during = {
        transformOrigin: c,
        transitionDelay: `${_}s`,
        transitionProperty: p,
        transitionDuration: `${y}s`,
        transitionTimingFunction: v,
      }),
      (t._x_transition.leave.start = { opacity: 1, transform: 'scale(1)' }),
      (t._x_transition.leave.end = { opacity: u, transform: `scale(${d})` }));
}
function Ui(t, e, i = {}) {
  t._x_transition ||
    (t._x_transition = {
      enter: { during: i, start: i, end: i },
      leave: { during: i, start: i, end: i },
      in(n = () => {}, r = () => {}) {
        oe(t, e, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n, r);
      },
      out(n = () => {}, r = () => {}) {
        oe(t, e, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n, r);
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (t, e, i, n) {
  const r = document.visibilityState === 'visible' ? requestAnimationFrame : setTimeout;
  let s = () => r(i);
  if (e) {
    t._x_transition && (t._x_transition.enter || t._x_transition.leave)
      ? t._x_transition.enter &&
        (Object.entries(t._x_transition.enter.during).length ||
          Object.entries(t._x_transition.enter.start).length ||
          Object.entries(t._x_transition.enter.end).length)
        ? t._x_transition.in(i)
        : s()
      : t._x_transition
      ? t._x_transition.in(i)
      : s();
    return;
  }
  (t._x_hidePromise = t._x_transition
    ? new Promise((a, o) => {
        t._x_transition.out(
          () => {},
          () => a(n),
        ),
          t._x_transitioning.beforeCancel(() => o({ isFromCancelledTransition: !0 }));
      })
    : Promise.resolve(n)),
    queueMicrotask(() => {
      let a = zi(t);
      a
        ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(t))
        : r(() => {
            let o = (l) => {
              let u = Promise.all([l._x_hidePromise, ...(l._x_hideChildren || []).map(o)]).then(
                ([d]) => d(),
              );
              return delete l._x_hidePromise, delete l._x_hideChildren, u;
            };
            o(t).catch((l) => {
              if (!l.isFromCancelledTransition) throw l;
            });
          });
    });
};
function zi(t) {
  let e = t.parentNode;
  if (e) return e._x_hidePromise ? e : zi(e);
}
function oe(t, e, { during: i, start: n, end: r } = {}, s = () => {}, a = () => {}) {
  if (
    (t._x_transitioning && t._x_transitioning.cancel(),
    Object.keys(i).length === 0 && Object.keys(n).length === 0 && Object.keys(r).length === 0)
  ) {
    s(), a();
    return;
  }
  let o, l, u;
  Ns(t, {
    start() {
      o = e(t, n);
    },
    during() {
      l = e(t, i);
    },
    before: s,
    end() {
      o(), (u = e(t, r));
    },
    after: a,
    cleanup() {
      l(), u();
    },
  });
}
function Ns(t, e) {
  let i,
    n,
    r,
    s = ae(() => {
      I(() => {
        (i = !0),
          n || e.before(),
          r || (e.end(), se()),
          e.after(),
          t.isConnected && e.cleanup(),
          delete t._x_transitioning;
      });
    });
  (t._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: ae(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      s();
    }),
    finish: s,
  }),
    I(() => {
      e.start(), e.during();
    }),
    Os(),
    requestAnimationFrame(() => {
      if (i) return;
      let a =
          Number(getComputedStyle(t).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1e3,
        o = Number(getComputedStyle(t).transitionDelay.replace(/,.*/, '').replace('s', '')) * 1e3;
      a === 0 && (a = Number(getComputedStyle(t).animationDuration.replace('s', '')) * 1e3),
        I(() => {
          e.before();
        }),
        (n = !0),
        requestAnimationFrame(() => {
          i ||
            (I(() => {
              e.end();
            }),
            se(),
            setTimeout(t._x_transitioning.finish, a + o),
            (r = !0));
        });
    });
}
function st(t, e, i) {
  if (t.indexOf(e) === -1) return i;
  const n = t[t.indexOf(e) + 1];
  if (!n || (e === 'scale' && isNaN(n))) return i;
  if (e === 'duration' || e === 'delay') {
    let r = n.match(/([0-9]+)ms/);
    if (r) return r[1];
  }
  return e === 'origin' &&
    ['top', 'right', 'left', 'center', 'bottom'].includes(t[t.indexOf(e) + 2])
    ? [n, t[t.indexOf(e) + 2]].join(' ')
    : n;
}
var V = !1;
function Pt(t, e = () => {}) {
  return (...i) => (V ? e(...i) : t(...i));
}
function Ps(t) {
  return (...e) => V && t(...e);
}
function Fs(t, e) {
  t._x_dataStack &&
    ((e._x_dataStack = t._x_dataStack), e.setAttribute('data-has-alpine-state', !0)),
    (V = !0),
    Gi(() => {
      R(e, (i, n) => {
        n(i, () => {});
      });
    }),
    (V = !1);
}
var le = !1;
function Ls(t, e) {
  e._x_dataStack || (e._x_dataStack = t._x_dataStack),
    (V = !0),
    (le = !0),
    Gi(() => {
      Ks(e);
    }),
    (V = !1),
    (le = !1);
}
function Ks(t) {
  let e = !1;
  R(t, (n, r) => {
    j(n, (s, a) => {
      if (e && rs(s)) return a();
      (e = !0), r(s, a);
    });
  });
}
function Gi(t) {
  let e = et;
  Ve((i, n) => {
    let r = e(i);
    return ft(r), () => {};
  }),
    t(),
    Ve(e);
}
function Ms(t) {
  return V ? (le ? !0 : t.hasAttribute('data-has-alpine-state')) : !1;
}
function Ji(t, e, i, n = []) {
  switch (
    (t._x_bindings || (t._x_bindings = tt({})),
    (t._x_bindings[e] = i),
    (e = n.includes('camel') ? Hs(e) : e),
    e)
  ) {
    case 'value':
      Rs(t, i);
      break;
    case 'style':
      Bs(t, i);
      break;
    case 'class':
      As(t, i);
      break;
    case 'selected':
    case 'checked':
      js(t, e, i);
      break;
    default:
      Qi(t, e, i);
      break;
  }
}
function Rs(t, e) {
  if (t.type === 'radio')
    t.attributes.value === void 0 && (t.value = e),
      window.fromModel && (t.checked = He(t.value, e));
  else if (t.type === 'checkbox')
    Number.isInteger(e)
      ? (t.value = e)
      : !Array.isArray(e) && typeof e != 'boolean' && ![null, void 0].includes(e)
      ? (t.value = String(e))
      : Array.isArray(e)
      ? (t.checked = e.some((i) => He(i, t.value)))
      : (t.checked = !!e);
  else if (t.tagName === 'SELECT') Ws(t, e);
  else {
    if (t.value === e) return;
    t.value = e === void 0 ? '' : e;
  }
}
function As(t, e) {
  t._x_undoAddedClasses && t._x_undoAddedClasses(), (t._x_undoAddedClasses = Se(t, e));
}
function Bs(t, e) {
  t._x_undoAddedStyles && t._x_undoAddedStyles(), (t._x_undoAddedStyles = Nt(t, e));
}
function js(t, e, i) {
  Qi(t, e, i), qs(t, e, i);
}
function Qi(t, e, i) {
  [null, void 0, !1].includes(i) && Us(e) ? t.removeAttribute(e) : (Yi(e) && (i = e), Vs(t, e, i));
}
function Vs(t, e, i) {
  t.getAttribute(e) != i && t.setAttribute(e, i);
}
function qs(t, e, i) {
  t[e] !== i && (t[e] = i);
}
function Ws(t, e) {
  const i = [].concat(e).map((n) => n + '');
  Array.from(t.options).forEach((n) => {
    n.selected = i.includes(n.value);
  });
}
function Hs(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, i) => i.toUpperCase());
}
function He(t, e) {
  return t == e;
}
function Yi(t) {
  return [
    'disabled',
    'checked',
    'required',
    'readonly',
    'hidden',
    'open',
    'selected',
    'autofocus',
    'itemscope',
    'multiple',
    'novalidate',
    'allowfullscreen',
    'allowpaymentrequest',
    'formnovalidate',
    'autoplay',
    'controls',
    'loop',
    'muted',
    'playsinline',
    'default',
    'ismap',
    'reversed',
    'async',
    'defer',
    'nomodule',
  ].includes(t);
}
function Us(t) {
  return !['aria-pressed', 'aria-checked', 'aria-expanded', 'aria-selected'].includes(t);
}
function zs(t, e, i) {
  return t._x_bindings && t._x_bindings[e] !== void 0 ? t._x_bindings[e] : Xi(t, e, i);
}
function Gs(t, e, i, n = !0) {
  if (t._x_bindings && t._x_bindings[e] !== void 0) return t._x_bindings[e];
  if (t._x_inlineBindings && t._x_inlineBindings[e] !== void 0) {
    let r = t._x_inlineBindings[e];
    return (r.extract = n), Fi(() => z(t, r.expression));
  }
  return Xi(t, e, i);
}
function Xi(t, e, i) {
  let n = t.getAttribute(e);
  return n === null
    ? typeof i == 'function'
      ? i()
      : i
    : n === ''
    ? !0
    : Yi(e)
    ? !![e, 'true'].includes(n)
    : n;
}
function Zi(t, e) {
  var i;
  return function () {
    var n = this,
      r = arguments,
      s = function () {
        (i = null), t.apply(n, r);
      };
    clearTimeout(i), (i = setTimeout(s, e));
  };
}
function tn(t, e) {
  let i;
  return function () {
    let n = this,
      r = arguments;
    i || (t.apply(n, r), (i = !0), setTimeout(() => (i = !1), e));
  };
}
function en({ get: t, set: e }, { get: i, set: n }) {
  let r = !0,
    s,
    a = et(() => {
      const o = t(),
        l = i();
      if (r) n(Vt(o)), (r = !1), (s = JSON.stringify(o));
      else {
        const u = JSON.stringify(o);
        u !== s ? (n(Vt(o)), (s = u)) : (e(Vt(l)), (s = JSON.stringify(l)));
      }
      JSON.stringify(i()), JSON.stringify(t());
    });
  return () => {
    ft(a);
  };
}
function Vt(t) {
  return typeof t == 'object' ? JSON.parse(JSON.stringify(t)) : t;
}
function Js(t) {
  (Array.isArray(t) ? t : [t]).forEach((i) => i(pt));
}
var W = {},
  Ue = !1;
function Qs(t, e) {
  if ((Ue || ((W = tt(W)), (Ue = !0)), e === void 0)) return W[t];
  (W[t] = e),
    typeof e == 'object' &&
      e !== null &&
      e.hasOwnProperty('init') &&
      typeof e.init == 'function' &&
      W[t].init(),
    Di(W[t]);
}
function Ys() {
  return W;
}
var nn = {};
function Xs(t, e) {
  let i = typeof e != 'function' ? () => e : e;
  return t instanceof Element ? rn(t, i()) : ((nn[t] = i), () => {});
}
function Zs(t) {
  return (
    Object.entries(nn).forEach(([e, i]) => {
      Object.defineProperty(t, e, {
        get() {
          return (...n) => i(...n);
        },
      });
    }),
    t
  );
}
function rn(t, e, i) {
  let n = [];
  for (; n.length; ) n.pop()();
  let r = Object.entries(e).map(([a, o]) => ({ name: a, value: o })),
    s = Mi(r);
  return (
    (r = r.map((a) =>
      s.find((o) => o.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a,
    )),
    $e(t, r, i).map((a) => {
      n.push(a.runCleanups), a();
    }),
    () => {
      for (; n.length; ) n.pop()();
    }
  );
}
var sn = {};
function ta(t, e) {
  sn[t] = e;
}
function ea(t, e) {
  return (
    Object.entries(sn).forEach(([i, n]) => {
      Object.defineProperty(t, i, {
        get() {
          return (...r) => n.bind(e)(...r);
        },
        enumerable: !1,
      });
    }),
    t
  );
}
var ia = {
    get reactive() {
      return tt;
    },
    get release() {
      return ft;
    },
    get effect() {
      return et;
    },
    get raw() {
      return vi;
    },
    version: '3.13.2',
    flushAndStopDeferringMutations: ds,
    dontAutoEvaluateFunctions: Fi,
    disableEffectScheduling: ts,
    startObservingMutations: ge,
    stopObservingMutations: Ti,
    setReactivityEngine: es,
    onAttributeRemoved: Ii,
    onAttributesAdded: Si,
    closestDataStack: X,
    skipDuringClone: Pt,
    onlyDuringClone: Ps,
    addRootSelector: yi,
    addInitSelector: xi,
    addScopeToNode: _t,
    deferMutations: cs,
    mapAttributes: we,
    evaluateLater: D,
    interceptInit: ss,
    setEvaluator: vs,
    mergeProxies: ht,
    extractProp: Gs,
    findClosest: Dt,
    onElRemoved: pe,
    closestRoot: Ct,
    destroyTree: he,
    interceptor: Ni,
    transition: oe,
    setStyles: Nt,
    mutateDom: I,
    directive: S,
    entangle: en,
    throttle: tn,
    debounce: Zi,
    evaluate: z,
    initTree: R,
    nextTick: Oe,
    prefixed: it,
    prefix: ys,
    plugin: Js,
    magic: P,
    store: Qs,
    start: ns,
    clone: Ls,
    cloneNode: Fs,
    bound: zs,
    $data: Ci,
    walk: j,
    data: ta,
    bind: Xs,
  },
  pt = ia;
function na(t, e) {
  const i = Object.create(null),
    n = t.split(',');
  for (let r = 0; r < n.length; r++) i[n[r]] = !0;
  return e ? (r) => !!i[r.toLowerCase()] : (r) => !!i[r];
}
var ra = Object.freeze({}),
  sa = Object.prototype.hasOwnProperty,
  Ft = (t, e) => sa.call(t, e),
  G = Array.isArray,
  ct = (t) => an(t) === '[object Map]',
  aa = (t) => typeof t == 'string',
  Ie = (t) => typeof t == 'symbol',
  Lt = (t) => t !== null && typeof t == 'object',
  oa = Object.prototype.toString,
  an = (t) => oa.call(t),
  on = (t) => an(t).slice(8, -1),
  ke = (t) => aa(t) && t !== 'NaN' && t[0] !== '-' && '' + parseInt(t, 10) === t,
  la = (t) => {
    const e = Object.create(null);
    return (i) => e[i] || (e[i] = t(i));
  },
  ua = la((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  ln = (t, e) => t !== e && (t === t || e === e),
  ue = new WeakMap(),
  at = [],
  L,
  J = Symbol('iterate'),
  ce = Symbol('Map key iterate');
function ca(t) {
  return t && t._isEffect === !0;
}
function da(t, e = ra) {
  ca(t) && (t = t.raw);
  const i = ha(t, e);
  return e.lazy || i(), i;
}
function fa(t) {
  t.active && (un(t), t.options.onStop && t.options.onStop(), (t.active = !1));
}
var _a = 0;
function ha(t, e) {
  const i = function () {
    if (!i.active) return t();
    if (!at.includes(i)) {
      un(i);
      try {
        return va(), at.push(i), (L = i), t();
      } finally {
        at.pop(), cn(), (L = at[at.length - 1]);
      }
    }
  };
  return (
    (i.id = _a++),
    (i.allowRecurse = !!e.allowRecurse),
    (i._isEffect = !0),
    (i.active = !0),
    (i.raw = t),
    (i.deps = []),
    (i.options = e),
    i
  );
}
function un(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let i = 0; i < e.length; i++) e[i].delete(t);
    e.length = 0;
  }
}
var Z = !0,
  Te = [];
function pa() {
  Te.push(Z), (Z = !1);
}
function va() {
  Te.push(Z), (Z = !0);
}
function cn() {
  const t = Te.pop();
  Z = t === void 0 ? !0 : t;
}
function N(t, e, i) {
  if (!Z || L === void 0) return;
  let n = ue.get(t);
  n || ue.set(t, (n = new Map()));
  let r = n.get(i);
  r || n.set(i, (r = new Set())),
    r.has(L) ||
      (r.add(L),
      L.deps.push(r),
      L.options.onTrack && L.options.onTrack({ effect: L, target: t, type: e, key: i }));
}
function q(t, e, i, n, r, s) {
  const a = ue.get(t);
  if (!a) return;
  const o = new Set(),
    l = (d) => {
      d &&
        d.forEach((_) => {
          (_ !== L || _.allowRecurse) && o.add(_);
        });
    };
  if (e === 'clear') a.forEach(l);
  else if (i === 'length' && G(t))
    a.forEach((d, _) => {
      (_ === 'length' || _ >= n) && l(d);
    });
  else
    switch ((i !== void 0 && l(a.get(i)), e)) {
      case 'add':
        G(t) ? ke(i) && l(a.get('length')) : (l(a.get(J)), ct(t) && l(a.get(ce)));
        break;
      case 'delete':
        G(t) || (l(a.get(J)), ct(t) && l(a.get(ce)));
        break;
      case 'set':
        ct(t) && l(a.get(J));
        break;
    }
  const u = (d) => {
    d.options.onTrigger &&
      d.options.onTrigger({
        effect: d,
        target: t,
        key: i,
        type: e,
        newValue: n,
        oldValue: r,
        oldTarget: s,
      }),
      d.options.scheduler ? d.options.scheduler(d) : d();
  };
  o.forEach(u);
}
var ba = na('__proto__,__v_isRef,__isVue'),
  dn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((t) => Symbol[t])
      .filter(Ie),
  ),
  ga = fn(),
  ma = fn(!0),
  ze = ya();
function ya() {
  const t = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
      t[e] = function (...i) {
        const n = $(this);
        for (let s = 0, a = this.length; s < a; s++) N(n, 'get', s + '');
        const r = n[e](...i);
        return r === -1 || r === !1 ? n[e](...i.map($)) : r;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
      t[e] = function (...i) {
        pa();
        const n = $(this)[e].apply(this, i);
        return cn(), n;
      };
    }),
    t
  );
}
function fn(t = !1, e = !1) {
  return function (n, r, s) {
    if (r === '__v_isReactive') return !t;
    if (r === '__v_isReadonly') return t;
    if (r === '__v_raw' && s === (t ? (e ? Ka : vn) : e ? La : pn).get(n)) return n;
    const a = G(n);
    if (!t && a && Ft(ze, r)) return Reflect.get(ze, r, s);
    const o = Reflect.get(n, r, s);
    return (Ie(r) ? dn.has(r) : ba(r)) || (t || N(n, 'get', r), e)
      ? o
      : de(o)
      ? !a || !ke(r)
        ? o.value
        : o
      : Lt(o)
      ? t
        ? bn(o)
        : Pe(o)
      : o;
  };
}
var xa = $a();
function $a(t = !1) {
  return function (i, n, r, s) {
    let a = i[n];
    if (!t && ((r = $(r)), (a = $(a)), !G(i) && de(a) && !de(r))) return (a.value = r), !0;
    const o = G(i) && ke(n) ? Number(n) < i.length : Ft(i, n),
      l = Reflect.set(i, n, r, s);
    return i === $(s) && (o ? ln(r, a) && q(i, 'set', n, r, a) : q(i, 'add', n, r)), l;
  };
}
function wa(t, e) {
  const i = Ft(t, e),
    n = t[e],
    r = Reflect.deleteProperty(t, e);
  return r && i && q(t, 'delete', e, void 0, n), r;
}
function Ea(t, e) {
  const i = Reflect.has(t, e);
  return (!Ie(e) || !dn.has(e)) && N(t, 'has', e), i;
}
function Oa(t) {
  return N(t, 'iterate', G(t) ? 'length' : J), Reflect.ownKeys(t);
}
var Sa = { get: ga, set: xa, deleteProperty: wa, has: Ea, ownKeys: Oa },
  Ia = {
    get: ma,
    set(t, e) {
      return console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
    },
    deleteProperty(t, e) {
      return (
        console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0
      );
    },
  },
  Ce = (t) => (Lt(t) ? Pe(t) : t),
  De = (t) => (Lt(t) ? bn(t) : t),
  Ne = (t) => t,
  Kt = (t) => Reflect.getPrototypeOf(t);
function gt(t, e, i = !1, n = !1) {
  t = t.__v_raw;
  const r = $(t),
    s = $(e);
  e !== s && !i && N(r, 'get', e), !i && N(r, 'get', s);
  const { has: a } = Kt(r),
    o = n ? Ne : i ? De : Ce;
  if (a.call(r, e)) return o(t.get(e));
  if (a.call(r, s)) return o(t.get(s));
  t !== r && t.get(e);
}
function mt(t, e = !1) {
  const i = this.__v_raw,
    n = $(i),
    r = $(t);
  return (
    t !== r && !e && N(n, 'has', t), !e && N(n, 'has', r), t === r ? i.has(t) : i.has(t) || i.has(r)
  );
}
function yt(t, e = !1) {
  return (t = t.__v_raw), !e && N($(t), 'iterate', J), Reflect.get(t, 'size', t);
}
function Ge(t) {
  t = $(t);
  const e = $(this);
  return Kt(e).has.call(e, t) || (e.add(t), q(e, 'add', t, t)), this;
}
function Je(t, e) {
  e = $(e);
  const i = $(this),
    { has: n, get: r } = Kt(i);
  let s = n.call(i, t);
  s ? hn(i, n, t) : ((t = $(t)), (s = n.call(i, t)));
  const a = r.call(i, t);
  return i.set(t, e), s ? ln(e, a) && q(i, 'set', t, e, a) : q(i, 'add', t, e), this;
}
function Qe(t) {
  const e = $(this),
    { has: i, get: n } = Kt(e);
  let r = i.call(e, t);
  r ? hn(e, i, t) : ((t = $(t)), (r = i.call(e, t)));
  const s = n ? n.call(e, t) : void 0,
    a = e.delete(t);
  return r && q(e, 'delete', t, void 0, s), a;
}
function Ye() {
  const t = $(this),
    e = t.size !== 0,
    i = ct(t) ? new Map(t) : new Set(t),
    n = t.clear();
  return e && q(t, 'clear', void 0, void 0, i), n;
}
function xt(t, e) {
  return function (n, r) {
    const s = this,
      a = s.__v_raw,
      o = $(a),
      l = e ? Ne : t ? De : Ce;
    return !t && N(o, 'iterate', J), a.forEach((u, d) => n.call(r, l(u), l(d), s));
  };
}
function $t(t, e, i) {
  return function (...n) {
    const r = this.__v_raw,
      s = $(r),
      a = ct(s),
      o = t === 'entries' || (t === Symbol.iterator && a),
      l = t === 'keys' && a,
      u = r[t](...n),
      d = i ? Ne : e ? De : Ce;
    return (
      !e && N(s, 'iterate', l ? ce : J),
      {
        next() {
          const { value: _, done: c } = u.next();
          return c ? { value: _, done: c } : { value: o ? [d(_[0]), d(_[1])] : d(_), done: c };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function B(t) {
  return function (...e) {
    {
      const i = e[0] ? `on key "${e[0]}" ` : '';
      console.warn(`${ua(t)} operation ${i}failed: target is readonly.`, $(this));
    }
    return t === 'delete' ? !1 : this;
  };
}
function ka() {
  const t = {
      get(s) {
        return gt(this, s);
      },
      get size() {
        return yt(this);
      },
      has: mt,
      add: Ge,
      set: Je,
      delete: Qe,
      clear: Ye,
      forEach: xt(!1, !1),
    },
    e = {
      get(s) {
        return gt(this, s, !1, !0);
      },
      get size() {
        return yt(this);
      },
      has: mt,
      add: Ge,
      set: Je,
      delete: Qe,
      clear: Ye,
      forEach: xt(!1, !0),
    },
    i = {
      get(s) {
        return gt(this, s, !0);
      },
      get size() {
        return yt(this, !0);
      },
      has(s) {
        return mt.call(this, s, !0);
      },
      add: B('add'),
      set: B('set'),
      delete: B('delete'),
      clear: B('clear'),
      forEach: xt(!0, !1),
    },
    n = {
      get(s) {
        return gt(this, s, !0, !0);
      },
      get size() {
        return yt(this, !0);
      },
      has(s) {
        return mt.call(this, s, !0);
      },
      add: B('add'),
      set: B('set'),
      delete: B('delete'),
      clear: B('clear'),
      forEach: xt(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      (t[s] = $t(s, !1, !1)),
        (i[s] = $t(s, !0, !1)),
        (e[s] = $t(s, !1, !0)),
        (n[s] = $t(s, !0, !0));
    }),
    [t, i, e, n]
  );
}
var [Ta, Ca, Da, Na] = ka();
function _n(t, e) {
  const i = e ? (t ? Na : Da) : t ? Ca : Ta;
  return (n, r, s) =>
    r === '__v_isReactive'
      ? !t
      : r === '__v_isReadonly'
      ? t
      : r === '__v_raw'
      ? n
      : Reflect.get(Ft(i, r) && r in n ? i : n, r, s);
}
var Pa = { get: _n(!1, !1) },
  Fa = { get: _n(!0, !1) };
function hn(t, e, i) {
  const n = $(i);
  if (n !== i && e.call(t, n)) {
    const r = on(t);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${
        r === 'Map' ? ' as keys' : ''
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
    );
  }
}
var pn = new WeakMap(),
  La = new WeakMap(),
  vn = new WeakMap(),
  Ka = new WeakMap();
function Ma(t) {
  switch (t) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Ra(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ma(on(t));
}
function Pe(t) {
  return t && t.__v_isReadonly ? t : gn(t, !1, Sa, Pa, pn);
}
function bn(t) {
  return gn(t, !0, Ia, Fa, vn);
}
function gn(t, e, i, n, r) {
  if (!Lt(t)) return console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive)) return t;
  const s = r.get(t);
  if (s) return s;
  const a = Ra(t);
  if (a === 0) return t;
  const o = new Proxy(t, a === 2 ? n : i);
  return r.set(t, o), o;
}
function $(t) {
  return (t && $(t.__v_raw)) || t;
}
function de(t) {
  return !!(t && t.__v_isRef === !0);
}
P('nextTick', () => Oe);
P('dispatch', (t) => lt.bind(lt, t));
P('watch', (t, { evaluateLater: e, effect: i }) => (n, r) => {
  let s = e(n),
    a = !0,
    o,
    l = i(() =>
      s((u) => {
        JSON.stringify(u),
          a
            ? (o = u)
            : queueMicrotask(() => {
                r(u, o), (o = u);
              }),
          (a = !1);
      }),
    );
  t._x_effects.delete(l);
});
P('store', Ys);
P('data', (t) => Ci(t));
P('root', (t) => Ct(t));
P('refs', (t) => (t._x_refs_proxy || (t._x_refs_proxy = ht(Aa(t))), t._x_refs_proxy));
function Aa(t) {
  let e = [],
    i = t;
  for (; i; ) i._x_refs && e.push(i._x_refs), (i = i.parentNode);
  return e;
}
var qt = {};
function mn(t) {
  return qt[t] || (qt[t] = 0), ++qt[t];
}
function Ba(t, e) {
  return Dt(t, (i) => {
    if (i._x_ids && i._x_ids[e]) return !0;
  });
}
function ja(t, e) {
  t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = mn(e));
}
P('id', (t) => (e, i = null) => {
  let n = Ba(t, e),
    r = n ? n._x_ids[e] : mn(e);
  return i ? `${e}-${r}-${i}` : `${e}-${r}`;
});
P('el', (t) => t);
yn('Focus', 'focus', 'focus');
yn('Persist', 'persist', 'persist');
function yn(t, e, i) {
  P(e, (n) =>
    M(
      `You can't use [$${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${i}`,
      n,
    ),
  );
}
S('modelable', (t, { expression: e }, { effect: i, evaluateLater: n, cleanup: r }) => {
  let s = n(e),
    a = () => {
      let d;
      return s((_) => (d = _)), d;
    },
    o = n(`${e} = __placeholder`),
    l = (d) => o(() => {}, { scope: { __placeholder: d } }),
    u = a();
  l(u),
    queueMicrotask(() => {
      if (!t._x_model) return;
      t._x_removeModelListeners.default();
      let d = t._x_model.get,
        _ = t._x_model.set,
        c = en(
          {
            get() {
              return d();
            },
            set(p) {
              _(p);
            },
          },
          {
            get() {
              return a();
            },
            set(p) {
              l(p);
            },
          },
        );
      r(c);
    });
});
S('teleport', (t, { modifiers: e, expression: i }, { cleanup: n }) => {
  t.tagName.toLowerCase() !== 'template' && M('x-teleport can only be used on a <template> tag', t);
  let r = Xe(i),
    s = t.content.cloneNode(!0).firstElementChild;
  (t._x_teleport = s),
    (s._x_teleportBack = t),
    t.setAttribute('data-teleport-template', !0),
    s.setAttribute('data-teleport-target', !0),
    t._x_forwardEvents &&
      t._x_forwardEvents.forEach((o) => {
        s.addEventListener(o, (l) => {
          l.stopPropagation(), t.dispatchEvent(new l.constructor(l.type, l));
        });
      }),
    _t(s, {}, t);
  let a = (o, l, u) => {
    u.includes('prepend')
      ? l.parentNode.insertBefore(o, l)
      : u.includes('append')
      ? l.parentNode.insertBefore(o, l.nextSibling)
      : l.appendChild(o);
  };
  I(() => {
    a(s, r, e), R(s), (s._x_ignore = !0);
  }),
    (t._x_teleportPutBack = () => {
      let o = Xe(i);
      I(() => {
        a(t._x_teleport, o, e);
      });
    }),
    n(() => s.remove());
});
var Va = document.createElement('div');
function Xe(t) {
  let e = Pt(
    () => document.querySelector(t),
    () => Va,
  )();
  return e || M(`Cannot find x-teleport element for selector: "${t}"`), e;
}
var xn = () => {};
xn.inline = (t, { modifiers: e }, { cleanup: i }) => {
  e.includes('self') ? (t._x_ignoreSelf = !0) : (t._x_ignore = !0),
    i(() => {
      e.includes('self') ? delete t._x_ignoreSelf : delete t._x_ignore;
    });
};
S('ignore', xn);
S('effect', (t, { expression: e }, { effect: i }) => i(D(t, e)));
function fe(t, e, i, n) {
  let r = t,
    s = (l) => n(l),
    a = {},
    o = (l, u) => (d) => u(l, d);
  if (
    (i.includes('dot') && (e = qa(e)),
    i.includes('camel') && (e = Wa(e)),
    i.includes('passive') && (a.passive = !0),
    i.includes('capture') && (a.capture = !0),
    i.includes('window') && (r = window),
    i.includes('document') && (r = document),
    i.includes('debounce'))
  ) {
    let l = i[i.indexOf('debounce') + 1] || 'invalid-wait',
      u = Tt(l.split('ms')[0]) ? Number(l.split('ms')[0]) : 250;
    s = Zi(s, u);
  }
  if (i.includes('throttle')) {
    let l = i[i.indexOf('throttle') + 1] || 'invalid-wait',
      u = Tt(l.split('ms')[0]) ? Number(l.split('ms')[0]) : 250;
    s = tn(s, u);
  }
  return (
    i.includes('prevent') &&
      (s = o(s, (l, u) => {
        u.preventDefault(), l(u);
      })),
    i.includes('stop') &&
      (s = o(s, (l, u) => {
        u.stopPropagation(), l(u);
      })),
    i.includes('self') &&
      (s = o(s, (l, u) => {
        u.target === t && l(u);
      })),
    (i.includes('away') || i.includes('outside')) &&
      ((r = document),
      (s = o(s, (l, u) => {
        t.contains(u.target) ||
          (u.target.isConnected !== !1 &&
            ((t.offsetWidth < 1 && t.offsetHeight < 1) || (t._x_isShown !== !1 && l(u))));
      }))),
    i.includes('once') &&
      (s = o(s, (l, u) => {
        l(u), r.removeEventListener(e, s, a);
      })),
    (s = o(s, (l, u) => {
      (Ua(e) && za(u, i)) || l(u);
    })),
    r.addEventListener(e, s, a),
    () => {
      r.removeEventListener(e, s, a);
    }
  );
}
function qa(t) {
  return t.replace(/-/g, '.');
}
function Wa(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, i) => i.toUpperCase());
}
function Tt(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Ha(t) {
  return [' ', '_'].includes(t)
    ? t
    : t
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]/, '-')
        .toLowerCase();
}
function Ua(t) {
  return ['keydown', 'keyup'].includes(t);
}
function za(t, e) {
  let i = e.filter(
    (s) => !['window', 'document', 'prevent', 'stop', 'once', 'capture'].includes(s),
  );
  if (i.includes('debounce')) {
    let s = i.indexOf('debounce');
    i.splice(s, Tt((i[s + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (i.includes('throttle')) {
    let s = i.indexOf('throttle');
    i.splice(s, Tt((i[s + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
  }
  if (i.length === 0 || (i.length === 1 && Ze(t.key).includes(i[0]))) return !1;
  const r = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'].filter((s) => i.includes(s));
  return (
    (i = i.filter((s) => !r.includes(s))),
    !(
      r.length > 0 &&
      r.filter((a) => ((a === 'cmd' || a === 'super') && (a = 'meta'), t[`${a}Key`])).length ===
        r.length &&
      Ze(t.key).includes(i[0])
    )
  );
}
function Ze(t) {
  if (!t) return [];
  t = Ha(t);
  let e = {
    ctrl: 'control',
    slash: '/',
    space: ' ',
    spacebar: ' ',
    cmd: 'meta',
    esc: 'escape',
    up: 'arrow-up',
    down: 'arrow-down',
    left: 'arrow-left',
    right: 'arrow-right',
    period: '.',
    equal: '=',
    minus: '-',
    underscore: '_',
  };
  return (
    (e[t] = t),
    Object.keys(e)
      .map((i) => {
        if (e[i] === t) return i;
      })
      .filter((i) => i)
  );
}
S('model', (t, { modifiers: e, expression: i }, { effect: n, cleanup: r }) => {
  let s = t;
  e.includes('parent') && (s = t.parentNode);
  let a = D(s, i),
    o;
  typeof i == 'string'
    ? (o = D(s, `${i} = __placeholder`))
    : typeof i == 'function' && typeof i() == 'string'
    ? (o = D(s, `${i()} = __placeholder`))
    : (o = () => {});
  let l = () => {
      let c;
      return a((p) => (c = p)), ti(c) ? c.get() : c;
    },
    u = (c) => {
      let p;
      a((b) => (p = b)), ti(p) ? p.set(c) : o(() => {}, { scope: { __placeholder: c } });
    };
  typeof i == 'string' &&
    t.type === 'radio' &&
    I(() => {
      t.hasAttribute('name') || t.setAttribute('name', i);
    });
  var d =
    t.tagName.toLowerCase() === 'select' ||
    ['checkbox', 'radio'].includes(t.type) ||
    e.includes('lazy')
      ? 'change'
      : 'input';
  let _ = V
    ? () => {}
    : fe(t, d, e, (c) => {
        u(Ga(t, e, c, l()));
      });
  if (
    (e.includes('fill') &&
      ([null, ''].includes(l()) || (t.type === 'checkbox' && Array.isArray(l()))) &&
      t.dispatchEvent(new Event(d, {})),
    t._x_removeModelListeners || (t._x_removeModelListeners = {}),
    (t._x_removeModelListeners.default = _),
    r(() => t._x_removeModelListeners.default()),
    t.form)
  ) {
    let c = fe(t.form, 'reset', [], (p) => {
      Oe(() => t._x_model && t._x_model.set(t.value));
    });
    r(() => c());
  }
  (t._x_model = {
    get() {
      return l();
    },
    set(c) {
      u(c);
    },
  }),
    (t._x_forceModelUpdate = (c) => {
      c === void 0 && typeof i == 'string' && i.match(/\./) && (c = ''),
        (window.fromModel = !0),
        I(() => Ji(t, 'value', c)),
        delete window.fromModel;
    }),
    n(() => {
      let c = l();
      (e.includes('unintrusive') && document.activeElement.isSameNode(t)) ||
        t._x_forceModelUpdate(c);
    });
});
function Ga(t, e, i, n) {
  return I(() => {
    if (i instanceof CustomEvent && i.detail !== void 0)
      return i.detail !== null && i.detail !== void 0 ? i.detail : i.target.value;
    if (t.type === 'checkbox')
      if (Array.isArray(n)) {
        let r = e.includes('number') ? Wt(i.target.value) : i.target.value;
        return i.target.checked ? n.concat([r]) : n.filter((s) => !Ja(s, r));
      } else return i.target.checked;
    else {
      if (t.tagName.toLowerCase() === 'select' && t.multiple)
        return e.includes('number')
          ? Array.from(i.target.selectedOptions).map((r) => {
              let s = r.value || r.text;
              return Wt(s);
            })
          : Array.from(i.target.selectedOptions).map((r) => r.value || r.text);
      {
        let r = i.target.value;
        return e.includes('number') ? Wt(r) : e.includes('trim') ? r.trim() : r;
      }
    }
  });
}
function Wt(t) {
  let e = t ? parseFloat(t) : null;
  return Qa(e) ? e : t;
}
function Ja(t, e) {
  return t == e;
}
function Qa(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function ti(t) {
  return (
    t !== null && typeof t == 'object' && typeof t.get == 'function' && typeof t.set == 'function'
  );
}
S('cloak', (t) => queueMicrotask(() => I(() => t.removeAttribute(it('cloak')))));
xi(() => `[${it('init')}]`);
S(
  'init',
  Pt((t, { expression: e }, { evaluate: i }) =>
    typeof e == 'string' ? !!e.trim() && i(e, {}, !1) : i(e, {}, !1),
  ),
);
S('text', (t, { expression: e }, { effect: i, evaluateLater: n }) => {
  let r = n(e);
  i(() => {
    r((s) => {
      I(() => {
        t.textContent = s;
      });
    });
  });
});
S('html', (t, { expression: e }, { effect: i, evaluateLater: n }) => {
  let r = n(e);
  i(() => {
    r((s) => {
      I(() => {
        (t.innerHTML = s), (t._x_ignoreSelf = !0), R(t), delete t._x_ignoreSelf;
      });
    });
  });
});
we(Bi(':', ji(it('bind:'))));
var $n = (t, { value: e, modifiers: i, expression: n, original: r }, { effect: s }) => {
  if (!e) {
    let o = {};
    Zs(o),
      D(t, n)(
        (u) => {
          rn(t, u, r);
        },
        { scope: o },
      );
    return;
  }
  if (e === 'key') return Ya(t, n);
  if (t._x_inlineBindings && t._x_inlineBindings[e] && t._x_inlineBindings[e].extract) return;
  let a = D(t, n);
  s(() =>
    a((o) => {
      o === void 0 && typeof n == 'string' && n.match(/\./) && (o = ''), I(() => Ji(t, e, o, i));
    }),
  );
};
$n.inline = (t, { value: e, modifiers: i, expression: n }) => {
  e &&
    (t._x_inlineBindings || (t._x_inlineBindings = {}),
    (t._x_inlineBindings[e] = { expression: n, extract: !1 }));
};
S('bind', $n);
function Ya(t, e) {
  t._x_keyExpression = e;
}
yi(() => `[${it('data')}]`);
S('data', (t, { expression: e }, { cleanup: i }) => {
  if (Ms(t)) return;
  e = e === '' ? '{}' : e;
  let n = {};
  te(n, t);
  let r = {};
  ea(r, n);
  let s = z(t, e, { scope: r });
  (s === void 0 || s === !0) && (s = {}), te(s, t);
  let a = tt(s);
  Di(a);
  let o = _t(t, a);
  a.init && z(t, a.init),
    i(() => {
      a.destroy && z(t, a.destroy), o();
    });
});
S('show', (t, { modifiers: e, expression: i }, { effect: n }) => {
  let r = D(t, i);
  t._x_doHide ||
    (t._x_doHide = () => {
      I(() => {
        t.style.setProperty('display', 'none', e.includes('important') ? 'important' : void 0);
      });
    }),
    t._x_doShow ||
      (t._x_doShow = () => {
        I(() => {
          t.style.length === 1 && t.style.display === 'none'
            ? t.removeAttribute('style')
            : t.style.removeProperty('display');
        });
      });
  let s = () => {
      t._x_doHide(), (t._x_isShown = !1);
    },
    a = () => {
      t._x_doShow(), (t._x_isShown = !0);
    },
    o = () => setTimeout(a),
    l = ae(
      (_) => (_ ? a() : s()),
      (_) => {
        typeof t._x_toggleAndCascadeWithTransitions == 'function'
          ? t._x_toggleAndCascadeWithTransitions(t, _, a, s)
          : _
          ? o()
          : s();
      },
    ),
    u,
    d = !0;
  n(() =>
    r((_) => {
      (!d && _ === u) || (e.includes('immediate') && (_ ? o() : s()), l(_), (u = _), (d = !1));
    }),
  );
});
S('for', (t, { expression: e }, { effect: i, cleanup: n }) => {
  let r = Za(e),
    s = D(t, r.items),
    a = D(t, t._x_keyExpression || 'index');
  (t._x_prevKeys = []),
    (t._x_lookup = {}),
    i(() => Xa(t, r, s, a)),
    n(() => {
      Object.values(t._x_lookup).forEach((o) => o.remove()),
        delete t._x_prevKeys,
        delete t._x_lookup;
    });
});
function Xa(t, e, i, n) {
  let r = (a) => typeof a == 'object' && !Array.isArray(a),
    s = t;
  i((a) => {
    to(a) && a >= 0 && (a = Array.from(Array(a).keys(), (v) => v + 1)), a === void 0 && (a = []);
    let o = t._x_lookup,
      l = t._x_prevKeys,
      u = [],
      d = [];
    if (r(a))
      a = Object.entries(a).map(([v, m]) => {
        let w = ei(e, m, v, a);
        n((k) => d.push(k), { scope: { index: v, ...w } }), u.push(w);
      });
    else
      for (let v = 0; v < a.length; v++) {
        let m = ei(e, a[v], v, a);
        n((w) => d.push(w), { scope: { index: v, ...m } }), u.push(m);
      }
    let _ = [],
      c = [],
      p = [],
      b = [];
    for (let v = 0; v < l.length; v++) {
      let m = l[v];
      d.indexOf(m) === -1 && p.push(m);
    }
    l = l.filter((v) => !p.includes(v));
    let y = 'template';
    for (let v = 0; v < d.length; v++) {
      let m = d[v],
        w = l.indexOf(m);
      if (w === -1) l.splice(v, 0, m), _.push([y, v]);
      else if (w !== v) {
        let k = l.splice(v, 1)[0],
          T = l.splice(w - 1, 1)[0];
        l.splice(v, 0, T), l.splice(w, 0, k), c.push([k, T]);
      } else b.push(m);
      y = m;
    }
    for (let v = 0; v < p.length; v++) {
      let m = p[v];
      o[m]._x_effects && o[m]._x_effects.forEach(pi), o[m].remove(), (o[m] = null), delete o[m];
    }
    for (let v = 0; v < c.length; v++) {
      let [m, w] = c[v],
        k = o[m],
        T = o[w],
        x = document.createElement('div');
      I(() => {
        T || M('x-for ":key" is undefined or invalid', s),
          T.after(x),
          k.after(T),
          T._x_currentIfEl && T.after(T._x_currentIfEl),
          x.before(k),
          k._x_currentIfEl && k.after(k._x_currentIfEl),
          x.remove();
      }),
        T._x_refreshXForScope(u[d.indexOf(w)]);
    }
    for (let v = 0; v < _.length; v++) {
      let [m, w] = _[v],
        k = m === 'template' ? s : o[m];
      k._x_currentIfEl && (k = k._x_currentIfEl);
      let T = u[w],
        x = d[w],
        f = document.importNode(s.content, !0).firstElementChild,
        h = tt(T);
      _t(f, h, s),
        (f._x_refreshXForScope = (g) => {
          Object.entries(g).forEach(([O, E]) => {
            h[O] = E;
          });
        }),
        I(() => {
          k.after(f), R(f);
        }),
        typeof x == 'object' &&
          M('x-for key cannot be an object, it must be a string or an integer', s),
        (o[x] = f);
    }
    for (let v = 0; v < b.length; v++) o[b[v]]._x_refreshXForScope(u[d.indexOf(b[v])]);
    s._x_prevKeys = d;
  });
}
function Za(t) {
  let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    i = /^\s*\(|\)\s*$/g,
    n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    r = t.match(n);
  if (!r) return;
  let s = {};
  s.items = r[2].trim();
  let a = r[1].replace(i, '').trim(),
    o = a.match(e);
  return (
    o
      ? ((s.item = a.replace(e, '').trim()),
        (s.index = o[1].trim()),
        o[2] && (s.collection = o[2].trim()))
      : (s.item = a),
    s
  );
}
function ei(t, e, i, n) {
  let r = {};
  return (
    /^\[.*\]$/.test(t.item) && Array.isArray(e)
      ? t.item
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map((a) => a.trim())
          .forEach((a, o) => {
            r[a] = e[o];
          })
      : /^\{.*\}$/.test(t.item) && !Array.isArray(e) && typeof e == 'object'
      ? t.item
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map((a) => a.trim())
          .forEach((a) => {
            r[a] = e[a];
          })
      : (r[t.item] = e),
    t.index && (r[t.index] = i),
    t.collection && (r[t.collection] = n),
    r
  );
}
function to(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function wn() {}
wn.inline = (t, { expression: e }, { cleanup: i }) => {
  let n = Ct(t);
  n._x_refs || (n._x_refs = {}), (n._x_refs[e] = t), i(() => delete n._x_refs[e]);
};
S('ref', wn);
S('if', (t, { expression: e }, { effect: i, cleanup: n }) => {
  t.tagName.toLowerCase() !== 'template' && M('x-if can only be used on a <template> tag', t);
  let r = D(t, e),
    s = () => {
      if (t._x_currentIfEl) return t._x_currentIfEl;
      let o = t.content.cloneNode(!0).firstElementChild;
      return (
        _t(o, {}, t),
        I(() => {
          t.after(o), R(o);
        }),
        (t._x_currentIfEl = o),
        (t._x_undoIf = () => {
          j(o, (l) => {
            l._x_effects && l._x_effects.forEach(pi);
          }),
            o.remove(),
            delete t._x_currentIfEl;
        }),
        o
      );
    },
    a = () => {
      t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf);
    };
  i(() =>
    r((o) => {
      o ? s() : a();
    }),
  ),
    n(() => t._x_undoIf && t._x_undoIf());
});
S('id', (t, { expression: e }, { evaluate: i }) => {
  i(e).forEach((r) => ja(t, r));
});
we(Bi('@', ji(it('on:'))));
S(
  'on',
  Pt((t, { value: e, modifiers: i, expression: n }, { cleanup: r }) => {
    let s = n ? D(t, n) : () => {};
    t.tagName.toLowerCase() === 'template' &&
      (t._x_forwardEvents || (t._x_forwardEvents = []),
      t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
    let a = fe(t, e, i, (o) => {
      s(() => {}, { scope: { $event: o }, params: [o] });
    });
    r(() => a());
  }),
);
Mt('Collapse', 'collapse', 'collapse');
Mt('Intersect', 'intersect', 'intersect');
Mt('Focus', 'trap', 'focus');
Mt('Mask', 'mask', 'mask');
function Mt(t, e, i) {
  S(e, (n) =>
    M(
      `You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${i}`,
      n,
    ),
  );
}
pt.setEvaluator(Ki);
pt.setReactivityEngine({ reactive: Pe, effect: da, release: fa, raw: $ });
var eo = pt,
  Y = eo;
function io(t) {
  t.data('example', () => ({ init() {} }));
}
function no(t) {
  const e = Object.assign({ './example.component.ts': io });
  for (const i of Object.values(e)) t.plugin(i);
}
function ro(t) {
  t.store('example', { init() {} });
}
function so(t) {
  const e = Object.assign({ './example.store.ts': ro });
  for (const i of Object.values(e)) t.plugin(i);
}
var En =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function ao(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t;
}
var On = { exports: {} },
  Ht = { exports: {} },
  ii;
function oo() {
  return (
    ii ||
      ((ii = 1),
      (function (t) {
        (function (e, i) {
          t.exports ? (t.exports = i()) : (e.EvEmitter = i());
        })(typeof window < 'u' ? window : En, function () {
          function e() {}
          let i = e.prototype;
          return (
            (i.on = function (n, r) {
              if (!n || !r) return this;
              let s = (this._events = this._events || {}),
                a = (s[n] = s[n] || []);
              return a.includes(r) || a.push(r), this;
            }),
            (i.once = function (n, r) {
              if (!n || !r) return this;
              this.on(n, r);
              let s = (this._onceEvents = this._onceEvents || {}),
                a = (s[n] = s[n] || {});
              return (a[r] = !0), this;
            }),
            (i.off = function (n, r) {
              let s = this._events && this._events[n];
              if (!s || !s.length) return this;
              let a = s.indexOf(r);
              return a != -1 && s.splice(a, 1), this;
            }),
            (i.emitEvent = function (n, r) {
              let s = this._events && this._events[n];
              if (!s || !s.length) return this;
              (s = s.slice(0)), (r = r || []);
              let a = this._onceEvents && this._onceEvents[n];
              for (let o of s) a && a[o] && (this.off(n, o), delete a[o]), o.apply(this, r);
              return this;
            }),
            (i.allOff = function () {
              return delete this._events, delete this._onceEvents, this;
            }),
            e
          );
        });
      })(Ht)),
    Ht.exports
  );
}
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */ (function (t) {
  (function (e, i) {
    t.exports ? (t.exports = i(e, oo())) : (e.imagesLoaded = i(e, e.EvEmitter));
  })(typeof window < 'u' ? window : En, function (i, n) {
    let r = i.jQuery,
      s = i.console;
    function a(c) {
      return Array.isArray(c)
        ? c
        : typeof c == 'object' && typeof c.length == 'number'
        ? [...c]
        : [c];
    }
    function o(c, p, b) {
      if (!(this instanceof o)) return new o(c, p, b);
      let y = c;
      if ((typeof c == 'string' && (y = document.querySelectorAll(c)), !y)) {
        s.error(`Bad element for imagesLoaded ${y || c}`);
        return;
      }
      (this.elements = a(y)),
        (this.options = {}),
        typeof p == 'function' ? (b = p) : Object.assign(this.options, p),
        b && this.on('always', b),
        this.getImages(),
        r && (this.jqDeferred = new r.Deferred()),
        setTimeout(this.check.bind(this));
    }
    (o.prototype = Object.create(n.prototype)),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      });
    const l = [1, 9, 11];
    o.prototype.addElementImages = function (c) {
      c.nodeName === 'IMG' && this.addImage(c),
        this.options.background === !0 && this.addElementBackgroundImages(c);
      let { nodeType: p } = c;
      if (!p || !l.includes(p)) return;
      let b = c.querySelectorAll('img');
      for (let y of b) this.addImage(y);
      if (typeof this.options.background == 'string') {
        let y = c.querySelectorAll(this.options.background);
        for (let v of y) this.addElementBackgroundImages(v);
      }
    };
    const u = /url\((['"])?(.*?)\1\)/gi;
    (o.prototype.addElementBackgroundImages = function (c) {
      let p = getComputedStyle(c);
      if (!p) return;
      let b = u.exec(p.backgroundImage);
      for (; b !== null; ) {
        let y = b && b[2];
        y && this.addBackground(y, c), (b = u.exec(p.backgroundImage));
      }
    }),
      (o.prototype.addImage = function (c) {
        let p = new d(c);
        this.images.push(p);
      }),
      (o.prototype.addBackground = function (c, p) {
        let b = new _(c, p);
        this.images.push(b);
      }),
      (o.prototype.check = function () {
        if (((this.progressedCount = 0), (this.hasAnyBroken = !1), !this.images.length)) {
          this.complete();
          return;
        }
        let c = (p, b, y) => {
          setTimeout(() => {
            this.progress(p, b, y);
          });
        };
        this.images.forEach(function (p) {
          p.once('progress', c), p.check();
        });
      }),
      (o.prototype.progress = function (c, p, b) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !c.isLoaded),
          this.emitEvent('progress', [this, c, p]),
          this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, c),
          this.progressedCount === this.images.length && this.complete(),
          this.options.debug && s && s.log(`progress: ${b}`, c, p);
      }),
      (o.prototype.complete = function () {
        let c = this.hasAnyBroken ? 'fail' : 'done';
        if (
          ((this.isComplete = !0),
          this.emitEvent(c, [this]),
          this.emitEvent('always', [this]),
          this.jqDeferred)
        ) {
          let p = this.hasAnyBroken ? 'reject' : 'resolve';
          this.jqDeferred[p](this);
        }
      });
    function d(c) {
      this.img = c;
    }
    (d.prototype = Object.create(n.prototype)),
      (d.prototype.check = function () {
        if (this.getIsImageComplete()) {
          this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
          return;
        }
        (this.proxyImage = new Image()),
          this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin),
          this.proxyImage.addEventListener('load', this),
          this.proxyImage.addEventListener('error', this),
          this.img.addEventListener('load', this),
          this.img.addEventListener('error', this),
          (this.proxyImage.src = this.img.currentSrc || this.img.src);
      }),
      (d.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (d.prototype.confirm = function (c, p) {
        this.isLoaded = c;
        let { parentNode: b } = this.img,
          y = b.nodeName === 'PICTURE' ? b : this.img;
        this.emitEvent('progress', [this, y, p]);
      }),
      (d.prototype.handleEvent = function (c) {
        let p = 'on' + c.type;
        this[p] && this[p](c);
      }),
      (d.prototype.onload = function () {
        this.confirm(!0, 'onload'), this.unbindEvents();
      }),
      (d.prototype.onerror = function () {
        this.confirm(!1, 'onerror'), this.unbindEvents();
      }),
      (d.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener('load', this),
          this.proxyImage.removeEventListener('error', this),
          this.img.removeEventListener('load', this),
          this.img.removeEventListener('error', this);
      });
    function _(c, p) {
      (this.url = c), (this.element = p), (this.img = new Image());
    }
    return (
      (_.prototype = Object.create(d.prototype)),
      (_.prototype.check = function () {
        this.img.addEventListener('load', this),
          this.img.addEventListener('error', this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(this.img.naturalWidth !== 0, 'naturalWidth'), this.unbindEvents());
      }),
      (_.prototype.unbindEvents = function () {
        this.img.removeEventListener('load', this), this.img.removeEventListener('error', this);
      }),
      (_.prototype.confirm = function (c, p) {
        (this.isLoaded = c), this.emitEvent('progress', [this, this.element, p]);
      }),
      (o.makeJQueryPlugin = function (c) {
        (c = c || i.jQuery),
          c &&
            ((r = c),
            (r.fn.imagesLoaded = function (p, b) {
              return new o(this, p, b).jqDeferred.promise(r(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });
})(On);
var lo = On.exports;
const Ut = ao(lo);
class uo {
  loadedFlag;
  isRunning;
  root;
  loadingElm;
  loadedImg;
  imgLength;
  progressElm;
  progressCurrent;
  timer;
  constructor() {
    (this.loadedFlag = !1),
      (this.isRunning = !1),
      (this.root = document.querySelector('html')),
      (this.loadingElm = document.getElementById('js-loading')),
      (this.loadedImg = 0),
      (this.imgLength = Ut('body', { background: !0 }).images.length),
      (this.progressElm = document.getElementById('js-progress')),
      (this.progressCurrent = 0),
      (this.timer = 0),
      this.start();
  }
  start() {
    this.loadingElm
      ? Ut(this.loadingElm, () => {
          (this.timer = window.setInterval(this.monitorProgress.bind(this), 1e3 / 50)),
            Ut('body', { background: !0 }).on('progress', () => {
              this.loadedImg++;
            });
        })
      : this.clearLoading();
  }
  monitorProgress() {
    const e = (this.loadedImg / this.imgLength) * 100;
    (this.progressCurrent += (e - this.progressCurrent) * 0.1),
      this.progressElm && (this.progressElm.style.width = `${this.progressCurrent}%`),
      this.progressCurrent >= 100 && this.clearLoading(),
      this.progressCurrent > 99.9 && (this.progressCurrent = 100 + 10);
  }
  clearLoading() {
    clearInterval(this.timer),
      this.root && this.root.classList.add('is-loaded'),
      this.loadingElm &&
        (this.loadingElm.classList.add('origin-right'), this.loadingElm.classList.add('scale-x-0')),
      (this.loadedFlag = !0);
  }
}
Y.plugin(Tn);
Y.plugin(Qn);
Y.plugin(Jr);
Y.plugin(no);
Y.plugin(so);
window.Alpine = Y;
Y.start();
document.addEventListener('DOMContentLoaded', () => {
  new uo();
});
