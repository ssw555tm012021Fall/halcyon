export default function (e) {
	var t = {};
	function r(n) {
		if (t[n]) return t[n].exports;
		var o = (t[n] = { i: n, l: !1, exports: {} });
		return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
	}
	return (
		(r.m = e),
		(r.c = t),
		(r.d = function (e, t, n) {
			r.o(e, t) ||
				Object.defineProperty(e, t, { enumerable: !0, get: n });
		}),
		(r.r = function (e) {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, {
					value: 'Module',
				}),
				Object.defineProperty(e, '__esModule', { value: !0 });
		}),
		(r.t = function (e, t) {
			if ((1 & t && (e = r(e)), 8 & t)) return e;
			if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
			var n = Object.create(null);
			if (
				(r.r(n),
				Object.defineProperty(n, 'default', {
					enumerable: !0,
					value: e,
				}),
				2 & t && 'string' != typeof e)
			)
				for (var o in e)
					r.d(
						n,
						o,
						function (t) {
							return e[t];
						}.bind(null, o)
					);
			return n;
		}),
		(r.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
							return e.default;
					  }
					: function () {
							return e;
					  };
			return r.d(t, 'a', t), t;
		}),
		(r.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(r.p = ''),
		r((r.s = 8))
	);
}
[
	function (e, t, r) {
		e.exports = r(4)();
	},
	function (e, t) {
		e.exports = require('react');
	},
	function (e, t, r) {
		(function (t) {
			var r;
			(r =
				'undefined' != typeof window
					? window
					: void 0 !== t
					? t
					: 'undefined' != typeof self
					? self
					: {}),
				(e.exports = r);
		}.call(this, r(3)));
	},
	function (e, t) {
		var r;
		r = (function () {
			return this;
		})();
		try {
			r = r || new Function('return this')();
		} catch (e) {
			'object' == typeof window && (r = window);
		}
		e.exports = r;
	},
	function (e, t, r) {
		'use strict';
		var n = r(5);
		function o() {}
		function a() {}
		(a.resetWarningCache = o),
			(e.exports = function () {
				function e(e, t, r, o, a, i) {
					if (i !== n) {
						var c = new Error(
							'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
						);
						throw ((c.name = 'Invariant Violation'), c);
					}
				}
				function t() {
					return e;
				}
				e.isRequired = e;
				var r = {
					array: e,
					bool: e,
					func: e,
					number: e,
					object: e,
					string: e,
					symbol: e,
					any: e,
					arrayOf: t,
					element: e,
					elementType: e,
					instanceOf: t,
					node: e,
					objectOf: t,
					oneOf: t,
					oneOfType: t,
					shape: t,
					exact: t,
					checkPropTypes: a,
					resetWarningCache: o,
				};
				return (r.PropTypes = r), r;
			});
	},
	function (e, t, r) {
		'use strict';
		e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	},
	function (e, t, r) {
		(t = r(7)(!1)).push([
			e.i,
			'@keyframes pulse {\n\t0% {\n\t\ttransform: scale(1);\n\t}\n\t50% {\n\t\ttransform: scale(0.8);\n\t}\n\t100% {\n\t\ttransform: scale(1);\n\t}\n}\n',
			'',
		]),
			(e.exports = t);
	},
	function (e, t, r) {
		'use strict';
		e.exports = function (e) {
			var t = [];
			return (
				(t.toString = function () {
					return this.map(function (t) {
						var r = (function (e, t) {
							var r = e[1] || '',
								n = e[3];
							if (!n) return r;
							if (t && 'function' == typeof btoa) {
								var o =
										((i = n),
										(c = btoa(
											unescape(
												encodeURIComponent(
													JSON.stringify(i)
												)
											)
										)),
										(l =
											'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
												c
											)),
										'/*# '.concat(l, ' */')),
									a = n.sources.map(function (e) {
										return '/*# sourceURL='
											.concat(n.sourceRoot || '')
											.concat(e, ' */');
									});
								return [r].concat(a).concat([o]).join('\n');
							}
							var i, c, l;
							return [r].join('\n');
						})(t, e);
						return t[2]
							? '@media '.concat(t[2], ' {').concat(r, '}')
							: r;
					}).join('');
				}),
				(t.i = function (e, r, n) {
					'string' == typeof e && (e = [[null, e, '']]);
					var o = {};
					if (n)
						for (var a = 0; a < this.length; a++) {
							var i = this[a][0];
							null != i && (o[i] = !0);
						}
					for (var c = 0; c < e.length; c++) {
						var l = [].concat(e[c]);
						(n && o[l[0]]) ||
							(r &&
								(l[2]
									? (l[2] = ''
											.concat(r, ' and ')
											.concat(l[2]))
									: (l[2] = r)),
							t.push(l));
					}
				}),
				t
			);
		};
	},
	function (e, t, r) {
		'use strict';
		r.r(t);
		var n = r(1),
			o = r.n(n),
			a = r(2),
			i = r.n(a),
			c = r(0),
			l = r.n(c);
		function s(e, t) {
			var r = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t &&
					(n = n.filter(function (t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable;
					})),
					r.push.apply(r, n);
			}
			return r;
		}
		function u(e) {
			for (var t = 1; t < arguments.length; t++) {
				var r = null != arguments[t] ? arguments[t] : {};
				t % 2
					? s(Object(r), !0).forEach(function (t) {
							f(e, t, r[t]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(
							e,
							Object.getOwnPropertyDescriptors(r)
					  )
					: s(Object(r)).forEach(function (t) {
							Object.defineProperty(
								e,
								t,
								Object.getOwnPropertyDescriptor(r, t)
							);
					  });
			}
			return e;
		}
		function f(e, t, r) {
			return (
				t in e
					? Object.defineProperty(e, t, {
							value: r,
							enumerable: !0,
							configurable: !0,
							writable: !0,
					  })
					: (e[t] = r),
				e
			);
		}
		var p = function (e, t) {
				switch (t.type) {
					case 'init':
					case 'setKnobPosition':
						return u({}, e, {}, t.payload);
					case 'onMouseDown':
					case 'onMouseUp':
					case 'setInitialKnobPosition':
						return u({}, e, {}, t.payload);
					default:
						throw new Error();
				}
			},
			d = function (e, t) {
				var r = Object(n.useRef)(null);
				Object(n.useEffect)(
					function () {
						r.current = t;
					},
					[t]
				),
					Object(n.useEffect)(
						function () {
							if (void 0 !== i.a) {
								var t = function (e) {
									return r.current(e);
								};
								return (
									i.a.addEventListener(e, t, { passive: !1 }),
									function () {
										i.a.removeEventListener(e, t);
									}
								);
							}
						},
						[e]
					);
			};
		function b(e, t) {
			return (
				(function (e) {
					if (Array.isArray(e)) return e;
				})(e) ||
				(function (e, t) {
					if (
						'undefined' == typeof Symbol ||
						!(Symbol.iterator in Object(e))
					)
						return;
					var r = [],
						n = !0,
						o = !1,
						a = void 0;
					try {
						for (
							var i, c = e[Symbol.iterator]();
							!(n = (i = c.next()).done) &&
							(r.push(i.value), !t || r.length !== t);
							n = !0
						);
					} catch (e) {
						(o = !0), (a = e);
					} finally {
						try {
							n || null == c.return || c.return();
						} finally {
							if (o) throw a;
						}
					}
					return r;
				})(e, t) ||
				(function (e, t) {
					if (!e) return;
					if ('string' == typeof e) return y(e, t);
					var r = Object.prototype.toString.call(e).slice(8, -1);
					'Object' === r && e.constructor && (r = e.constructor.name);
					if ('Map' === r || 'Set' === r) return Array.from(r);
					if (
						'Arguments' === r ||
						/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
					)
						return y(e, t);
				})(e, t) ||
				(function () {
					throw new TypeError(
						'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
					);
				})()
			);
		}
		function y(e, t) {
			(null == t || t > e.length) && (t = e.length);
			for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
			return n;
		}
		var g = function () {
			var e = b(Object(n.useState)(!0), 2),
				t = e[0],
				r = e[1];
			return (
				Object(n.useEffect)(function () {
					r(!1);
				}, []),
				t
			);
		};
		r(6);
		function v(e, t) {
			var r = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t &&
					(n = n.filter(function (t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable;
					})),
					r.push.apply(r, n);
			}
			return r;
		}
		function m(e) {
			for (var t = 1; t < arguments.length; t++) {
				var r = null != arguments[t] ? arguments[t] : {};
				t % 2
					? v(Object(r), !0).forEach(function (t) {
							h(e, t, r[t]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(
							e,
							Object.getOwnPropertyDescriptors(r)
					  )
					: v(Object(r)).forEach(function (t) {
							Object.defineProperty(
								e,
								t,
								Object.getOwnPropertyDescriptor(r, t)
							);
					  });
			}
			return e;
		}
		function h(e, t, r) {
			return (
				t in e
					? Object.defineProperty(e, t, {
							value: r,
							enumerable: !0,
							configurable: !0,
							writable: !0,
					  })
					: (e[t] = r),
				e
			);
		}
		var O = function (e) {
			var t = e.isDragging,
				r = e.knobPosition,
				n = e.knobColor,
				a = e.knobSize,
				i = e.hideKnob,
				c = e.onMouseDown,
				l = e.trackSize,
				s = e.children,
				u = {
					knob: {
						position: 'absolute',
						left: '-'.concat(a / 2 - l / 2, 'px'),
						top: '-'.concat(a / 2 - l / 2, 'px'),
						cursor: 'grab',
						zIndex: 3,
					},
					dragging: { cursor: 'grabbing' },
					pause: { animationPlayState: 'paused' },
					animation: {
						transformOrigin: '50% 50%',
						animationTimingFunction: 'ease-out',
						animationDuration: '1500ms',
						animationIterationCount: 'infinite',
						animationName: 'pulse',
					},
					hide: { opacity: 0 },
				};
			return o.a.createElement(
				'div',
				{
					style: m(
						{
							transform: 'translate('
								.concat(r.x, 'px, ')
								.concat(r.y, 'px)'),
						},
						u.knob,
						{},
						t && u.dragging,
						{},
						i && u.hide
					),
					onMouseDown: c,
					onTouchStart: c,
				},
				o.a.createElement(
					'svg',
					{
						width: ''.concat(a, 'px'),
						height: ''.concat(a, 'px'),
						viewBox: '0 0 '.concat(a, ' ').concat(a),
					},
					o.a.createElement('circle', {
						style: m({}, u.animation, {}, t && u.pause),
						fill: n,
						fillOpacity: '0.2',
						stroke: 'none',
						cx: a / 2,
						cy: a / 2,
						r: a / 2,
					}),
					o.a.createElement('circle', {
						fill: n,
						stroke: 'none',
						cx: a / 2,
						cy: a / 2,
						r: (2 * a) / 3 / 2,
					}),
					s ||
						o.a.createElement(
							'svg',
							{
								width: ''.concat(a, 'px'),
								height: ''.concat(a, 'px'),
								viewBox: '0 0 36 36',
							},
							o.a.createElement('rect', {
								fill: '#FFFFFF',
								x: '14',
								y: '14',
								width: '8',
								height: '1',
							}),
							o.a.createElement('rect', {
								fill: '#FFFFFF',
								x: '14',
								y: '17',
								width: '8',
								height: '1',
							}),
							o.a.createElement('rect', {
								fill: '#FFFFFF',
								x: '14',
								y: '20',
								width: '8',
								height: '1',
							})
						)
				)
			);
		};
		O.propTypes = {
			isDragging: l.a.bool,
			knobPosition: l.a.object,
			knobColor: l.a.string,
			knobRadius: l.a.number,
			knobSize: l.a.number,
			trackSize: l.a.number,
			children: l.a.element,
			onMouseDown: l.a.func,
		};
		var j = O;
		function w(e, t) {
			var r = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t &&
					(n = n.filter(function (t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable;
					})),
					r.push.apply(r, n);
			}
			return r;
		}
		function P(e) {
			for (var t = 1; t < arguments.length; t++) {
				var r = null != arguments[t] ? arguments[t] : {};
				t % 2
					? w(Object(r), !0).forEach(function (t) {
							S(e, t, r[t]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(
							e,
							Object.getOwnPropertyDescriptors(r)
					  )
					: w(Object(r)).forEach(function (t) {
							Object.defineProperty(
								e,
								t,
								Object.getOwnPropertyDescriptor(r, t)
							);
					  });
			}
			return e;
		}
		function S(e, t, r) {
			return (
				t in e
					? Object.defineProperty(e, t, {
							value: r,
							enumerable: !0,
							configurable: !0,
							writable: !0,
					  })
					: (e[t] = r),
				e
			);
		}
		var k = function (e) {
			var t = e.labelColor,
				r = e.labelBottom,
				n = e.labelFontSize,
				a = e.valueFontSize,
				i = e.appendToValue,
				c = e.prependToValue,
				l = e.verticalOffset,
				s = e.hideLabelValue,
				u = e.label,
				f = e.value,
				p = {
					labels: {
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						color: ''.concat(t),
						userSelect: 'none',
						zIndex: 1,
					},
					value: { fontSize: ''.concat(a), position: 'relative' },
					bottomMargin: { marginBottom: 'calc('.concat(l, ')') },
					appended: {
						position: 'absolute',
						right: '0',
						top: '0',
						transform: 'translate(100%, 0)',
					},
					prepended: {
						position: 'absolute',
						left: '0',
						top: '0',
						transform: 'translate(-100%, 0)',
					},
					hide: { display: 'none' },
				};
			return o.a.createElement(
				'div',
				{ style: P({}, p.labels, {}, s && p.hide) },
				r || o.a.createElement('div', { style: { fontSize: n } }, u),
				o.a.createElement(
					'div',
					{ style: P({}, p.value, {}, !r && p.bottomMargin) },
					o.a.createElement(
						'code',
						null,
						o.a.createElement('span', { style: p.prepended }, c),
						f,
						o.a.createElement('span', { style: p.appended }, i)
					)
				),
				r && o.a.createElement('div', { style: { fontSize: n } }, u)
			);
		};
		k.propTypes = {
			label: l.a.string.isRequired,
			value: l.a.string.isRequired,
			labelColor: l.a.string,
			labelBottom: l.a.bool,
			labelFontSize: l.a.string,
			valueFontSize: l.a.string,
			appendToValue: l.a.string,
			prependToValue: l.a.string,
			verticalOffset: l.a.string,
			hideLabelValue: l.a.bool,
		};
		var E = k,
			x = function (e) {
				var t = e.width,
					r = e.label,
					n = e.direction,
					a = e.strokeDasharray,
					i = e.strokeDashoffset,
					c = e.progressColorFrom,
					l = e.progressColorTo,
					s = e.trackColor,
					u = e.progressSize,
					f = e.trackSize,
					p = e.svgFullPath,
					d = e.radiansOffset,
					b = e.progressLineCap,
					y = {
						svg: { position: 'relative', zIndex: 2 },
						path: {
							transform: 'rotate('
								.concat(d, 'rad) ')
								.concat(
									-1 === n ? 'scale(-1, 1)' : 'scale(1, 1)'
								),
							transformOrigin: 'center center',
						},
					},
					g = f / 2,
					v = t / 2 - g;
				return o.a.createElement(
					'svg',
					{
						width: ''.concat(t, 'px'),
						height: ''.concat(t, 'px'),
						viewBox: '0 0 '.concat(t, ' ').concat(t),
						overflow: 'visible',
						style: y.svg,
					},
					o.a.createElement(
						'defs',
						null,
						o.a.createElement(
							'linearGradient',
							{ id: r, x1: '100%', x2: '0%' },
							o.a.createElement('stop', {
								offset: '0%',
								stopColor: c,
							}),
							o.a.createElement('stop', {
								offset: '100%',
								stopColor: l,
							})
						)
					),
					o.a.createElement('circle', {
						strokeWidth: f,
						fill: 'none',
						stroke: s,
						cx: t / 2,
						cy: t / 2,
						r: v,
					}),
					o.a.createElement('path', {
						style: y.path,
						ref: p,
						strokeDasharray: a,
						strokeDashoffset: i,
						strokeWidth: u,
						strokeLinecap: 'round' !== b ? 'butt' : 'round',
						fill: 'none',
						stroke: 'url(#'.concat(r, ')'),
						d: '\n                        M '
							.concat(t / 2, ', ')
							.concat(t / 2, '\n                        m 0, -')
							.concat(t / 2 - g, '\n                        a ')
							.concat(t / 2 - g, ',')
							.concat(t / 2 - g, ' 0 0,1 0,')
							.concat(t - 2 * g, '\n                        a -')
							.concat(t / 2 - g, ',-')
							.concat(t / 2 - g, ' 0 0,1 0,-')
							.concat(t - 2 * g, '\n                    '),
					})
				);
			};
		x.propTypes = {
			width: l.a.number,
			label: l.a.string,
			direction: l.a.number,
			svgFullPath: l.a.object,
			strokeDasharray: l.a.number,
			strokeDashoffset: l.a.number,
			progressColorFrom: l.a.string,
			progressColorTo: l.a.string,
			progressLineCap: l.a.string,
			progressSize: l.a.number,
			trackColor: l.a.string,
			trackSize: l.a.number,
			radiansOffset: l.a.number,
		};
		var F = x;
		function D(e, t) {
			var r = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var n = Object.getOwnPropertySymbols(e);
				t &&
					(n = n.filter(function (t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable;
					})),
					r.push.apply(r, n);
			}
			return r;
		}
		function C(e) {
			for (var t = 1; t < arguments.length; t++) {
				var r = null != arguments[t] ? arguments[t] : {};
				t % 2
					? D(Object(r), !0).forEach(function (t) {
							T(e, t, r[t]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(
							e,
							Object.getOwnPropertyDescriptors(r)
					  )
					: D(Object(r)).forEach(function (t) {
							Object.defineProperty(
								e,
								t,
								Object.getOwnPropertyDescriptor(r, t)
							);
					  });
			}
			return e;
		}
		function T(e, t, r) {
			return (
				t in e
					? Object.defineProperty(e, t, {
							value: r,
							enumerable: !0,
							configurable: !0,
							writable: !0,
					  })
					: (e[t] = r),
				e
			);
		}
		function z(e) {
			return (
				(function (e) {
					if (Array.isArray(e)) return A(e);
				})(e) ||
				(function (e) {
					if (
						'undefined' != typeof Symbol &&
						Symbol.iterator in Object(e)
					)
						return Array.from(e);
				})(e) ||
				I(e) ||
				(function () {
					throw new TypeError(
						'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
					);
				})()
			);
		}
		function M(e, t) {
			return (
				(function (e) {
					if (Array.isArray(e)) return e;
				})(e) ||
				(function (e, t) {
					if (
						'undefined' == typeof Symbol ||
						!(Symbol.iterator in Object(e))
					)
						return;
					var r = [],
						n = !0,
						o = !1,
						a = void 0;
					try {
						for (
							var i, c = e[Symbol.iterator]();
							!(n = (i = c.next()).done) &&
							(r.push(i.value), !t || r.length !== t);
							n = !0
						);
					} catch (e) {
						(o = !0), (a = e);
					} finally {
						try {
							n || null == c.return || c.return();
						} finally {
							if (o) throw a;
						}
					}
					return r;
				})(e, t) ||
				I(e, t) ||
				(function () {
					throw new TypeError(
						'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
					);
				})()
			);
		}
		function I(e, t) {
			if (e) {
				if ('string' == typeof e) return A(e, t);
				var r = Object.prototype.toString.call(e).slice(8, -1);
				return (
					'Object' === r && e.constructor && (r = e.constructor.name),
					'Map' === r || 'Set' === r
						? Array.from(r)
						: 'Arguments' === r ||
						  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
						? A(e, t)
						: void 0
				);
			}
		}
		function A(e, t) {
			(null == t || t > e.length) && (t = e.length);
			for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
			return n;
		}
		var L = {
				top: Math.PI / 2,
				right: 0,
				bottom: -Math.PI / 2,
				left: -Math.PI,
			},
			V = function (e) {
				return e < 0 ? -1 : 1;
			},
			R = function (e) {
				return (e * Math.PI) / 180;
			},
			_ = function (e, t) {
				for (var r = [], n = e; n <= t; n++) r.push(n);
				return r;
			},
			B = {
				circularSlider: {
					position: 'relative',
					display: 'inline-block',
					opacity: 0,
					transition: 'opacity 1s ease-in',
				},
				mounted: { opacity: 1 },
			},
			U = function (e) {
				var t = e.label,
					r = void 0 === t ? 'ANGLE' : t,
					a = e.width,
					c = void 0 === a ? 280 : a,
					l = e.direction,
					s = void 0 === l ? 1 : l,
					u = e.min,
					f = void 0 === u ? 0 : u,
					b = e.max,
					y = void 0 === b ? 360 : b,
					v = e.knobColor,
					m = void 0 === v ? '#4e63ea' : v,
					h = e.knobSize,
					O = void 0 === h ? 36 : h,
					w = e.knobPosition,
					P = void 0 === w ? 'top' : w,
					S = e.labelColor,
					k = void 0 === S ? '#272b77' : S,
					x = e.labelBottom,
					D = void 0 !== x && x,
					T = e.labelFontSize,
					I = void 0 === T ? '1rem' : T,
					A = e.valueFontSize,
					U = void 0 === A ? '3rem' : A,
					K = e.appendToValue,
					W = void 0 === K ? '' : K,
					N = e.prependToValue,
					q = void 0 === N ? '' : N,
					Y = e.verticalOffset,
					X = void 0 === Y ? '1.5rem' : Y,
					G = e.hideLabelValue,
					$ = void 0 !== G && G,
					H = e.hideKnob,
					J = void 0 !== H && H,
					Q = e.knobDraggable,
					Z = void 0 === Q || Q,
					ee = e.progressColorFrom,
					te = void 0 === ee ? '#80C3F3' : ee,
					re = e.progressColorTo,
					ne = void 0 === re ? '#4990E2' : re,
					oe = e.progressSize,
					ae = void 0 === oe ? 8 : oe,
					ie = e.trackColor,
					ce = void 0 === ie ? '#DDDEFB' : ie,
					le = e.trackSize,
					se = void 0 === le ? 8 : le,
					ue = e.data,
					fe = void 0 === ue ? [] : ue,
					pe = e.dataIndex,
					de = void 0 === pe ? 0 : pe,
					be = e.progressLineCap,
					ye = void 0 === be ? 'round' : be,
					ge = e.renderLabelValue,
					ve = void 0 === ge ? null : ge,
					me = e.children,
					he = e.onChange,
					Oe = void 0 === he ? function (e) {} : he,
					je = {
						mounted: !1,
						isDragging: !1,
						width: c,
						radius: c / 2,
						knobPosition: P,
						label: 0,
						data: fe,
						radians: 0,
						offset: 0,
						knob: { x: 0, y: 0 },
						dashFullArray: 0,
						dashFullOffset: 0,
					},
					we = g(),
					Pe = M(Object(n.useReducer)(p, je), 2),
					Se = Pe[0],
					ke = Pe[1],
					Ee = Object(n.useRef)(null),
					xe = Object(n.useRef)(null),
					Fe = !we && 'ontouchstart' in i.a,
					De = {
						DOWN: Fe ? 'touchstart' : 'mousedown',
						UP: Fe ? 'touchend' : 'mouseup',
						MOVE: Fe ? 'touchmove' : 'mousemove',
					},
					Ce = Object(n.useCallback)(
						function (e) {
							var t = Se.radius - se / 2,
								r = e + L[P],
								n =
									(r > 0 ? r : 2 * Math.PI + r) *
									(360 / (2 * Math.PI)),
								o = (n / 360) * Se.dashFullArray;
							n = -1 === V(s) ? 360 - n : n;
							var a = (Se.data.length - 1) / 360,
								i = Math.round(n * a);
							Se.data[i] !== Se.label && Oe(Se.data[i]),
								ke({
									type: 'setKnobPosition',
									payload: {
										dashFullOffset:
											-1 === V(s)
												? o
												: Se.dashFullArray - o,
										label: Se.data[i],
										knob: {
											x: t * Math.cos(e) + t,
											y: t * Math.sin(e) + t,
										},
									},
								});
						},
						[
							Se.dashFullArray,
							Se.radius,
							Se.data,
							Se.label,
							P,
							se,
							s,
							Oe,
						]
					),
					Te = Object(n.useCallback)(
						function (e) {
							if (Se.isDragging) {
								var t;
								e.preventDefault(),
									'touchmove' === e.type &&
										(t = e.changedTouches[0]);
								var r = function (e) {
										var t,
											r,
											n,
											o,
											a,
											c,
											l,
											s,
											u =
												e.current.getBoundingClientRect(),
											f =
												!we &&
												((null !==
													(t =
														null === i.a ||
														void 0 === i.a
															? void 0
															: i.a
																	.pageXOffset) &&
												void 0 !== t
													? t
													: 0) ||
													(null !==
														(r =
															null ===
																(n =
																	document) ||
															void 0 === n ||
															null ===
																(o =
																	n.documentElement) ||
															void 0 === o
																? void 0
																: o.scrollLeft) &&
													void 0 !== r
														? r
														: 0)),
											p =
												!we &&
												((null !==
													(a =
														null === i.a ||
														void 0 === i.a
															? void 0
															: i.a
																	.pageYOffset) &&
												void 0 !== a
													? a
													: 0) ||
													(null !==
														(c =
															null ===
																(l =
																	document) ||
															void 0 === l ||
															null ===
																(s =
																	l.documentElement) ||
															void 0 === s
																? void 0
																: s.scrollTop) &&
													void 0 !== c
														? c
														: 0));
										return {
											top: u.top + p,
											left: u.left + f,
										};
									},
									n =
										('touchmove' === e.type
											? t.pageX
											: e.pageX) -
										(r(Ee).left + Se.radius),
									o =
										('touchmove' === e.type
											? t.pageY
											: e.pageY) -
										(r(Ee).top + Se.radius),
									a = Math.atan2(o, n);
								Ce(a);
							}
						},
						[Se.isDragging, Se.radius, Ce, we]
					);
				return (
					Object(n.useEffect)(
						function () {
							ke({
								type: 'init',
								payload: {
									mounted: !0,
									data: Se.data.length
										? z(Se.data)
										: z(_(f, y)),
									dashFullArray: xe.current.getTotalLength
										? xe.current.getTotalLength()
										: 0,
								},
							});
						},
						[y, f]
					),
					Object(n.useEffect)(
						function () {
							var e = Se.data.length,
								t = de > e - 1 ? e - 1 : de;
							if (e) {
								var r = 360 / e,
									n = R(r) / 2;
								if (
									(ke({
										type: 'setInitialKnobPosition',
										payload: {
											radians:
												Math.PI / 2 -
												L[Se.knobPosition],
											offset: n,
										},
									}),
									t)
								) {
									var o = V(s) * t * r,
										a = R(o) - L[Se.knobPosition];
									return Ce(a + n * V(s));
								}
								Ce(-L[Se.knobPosition] * V(s) + n * V(s));
							}
						},
						[
							Se.dashFullArray,
							Se.knobPosition,
							Se.data.length,
							de,
							s,
						]
					),
					d(De.MOVE, Te),
					d(De.UP, function () {
						ke({ type: 'onMouseUp', payload: { isDragging: !1 } });
					}),
					o.a.createElement(
						'div',
						{
							style: C(
								{},
								B.circularSlider,
								{},
								Se.mounted && B.mounted
							),
							ref: Ee,
						},
						o.a.createElement(F, {
							width: c,
							label: r.split(' ').join(''),
							direction: s,
							strokeDasharray: Se.dashFullArray,
							strokeDashoffset: Se.dashFullOffset,
							svgFullPath: xe,
							progressSize: ae,
							progressColorFrom: te,
							progressColorTo: ne,
							progressLineCap: ye,
							trackColor: ce,
							trackSize: se,
							radiansOffset: Se.radians,
						}),
						Z &&
							o.a.createElement(
								j,
								{
									isDragging: Se.isDragging,
									knobPosition: {
										x: Se.knob.x,
										y: Se.knob.y,
									},
									knobSize: O,
									knobColor: m,
									trackSize: se,
									hideKnob: J,
									onMouseDown: function () {
										ke({
											type: 'onMouseDown',
											payload: { isDragging: !0 },
										});
									},
								},
								me
							),
						ve ||
							o.a.createElement(E, {
								label: r,
								labelColor: k,
								labelBottom: D,
								labelFontSize: I,
								verticalOffset: X,
								valueFontSize: U,
								appendToValue: W,
								prependToValue: q,
								hideLabelValue: $,
								value: ''.concat(Se.label),
							})
					)
				);
			};
		U.propTypes = {
			label: l.a.string,
			width: l.a.number,
			direction: l.a.number,
			min: l.a.number,
			max: l.a.number,
			knobColor: l.a.string,
			knobPosition: l.a.string,
			hideKnob: l.a.bool,
			knobDraggable: l.a.bool,
			labelColor: l.a.string,
			labelBottom: l.a.bool,
			labelFontSize: l.a.string,
			valueFontSize: l.a.string,
			appendToValue: l.a.string,
			renderLabelValue: l.a.element,
			prependToValue: l.a.string,
			verticalOffset: l.a.string,
			hideLabelValue: l.a.bool,
			progressLineCap: l.a.string,
			progressColorFrom: l.a.string,
			progressColorTo: l.a.string,
			progressSize: l.a.number,
			trackColor: l.a.string,
			trackSize: l.a.number,
			data: l.a.array,
			dataIndex: l.a.number,
			onChange: l.a.func,
		};
		t.default = U;
	},
];
