﻿/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS =
  CryptoJS ||
  (function (q, r) {
    var k = {},
      g = (k.lib = {}),
      p = function () {},
      t = (g.Base = {
        extend: function (b) {
          p.prototype = this;
          var j = new p();
          b && j.mixIn(b);
          j.hasOwnProperty("init") ||
            (j.init = function () {
              j.$super.init.apply(this, arguments);
            });
          j.init.prototype = j;
          j.$super = this;
          return j;
        },
        create: function () {
          var b = this.extend();
          b.init.apply(b, arguments);
          return b;
        },
        init: function () {},
        mixIn: function (b) {
          for (var j in b) b.hasOwnProperty(j) && (this[j] = b[j]);
          b.hasOwnProperty("toString") && (this.toString = b.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      n = (g.WordArray = t.extend({
        init: function (b, j) {
          b = this.words = b || [];
          this.sigBytes = j != r ? j : 4 * b.length;
        },
        toString: function (b) {
          return (b || u).stringify(this);
        },
        concat: function (b) {
          var j = this.words,
            a = b.words,
            l = this.sigBytes;
          b = b.sigBytes;
          this.clamp();
          if (l % 4)
            for (var h = 0; h < b; h++)
              j[(l + h) >>> 2] |=
                ((a[h >>> 2] >>> (24 - 8 * (h % 4))) & 255) <<
                (24 - 8 * ((l + h) % 4));
          else if (65535 < a.length)
            for (h = 0; h < b; h += 4) j[(l + h) >>> 2] = a[h >>> 2];
          else j.push.apply(j, a);
          this.sigBytes += b;
          return this;
        },
        clamp: function () {
          var b = this.words,
            j = this.sigBytes;
          b[j >>> 2] &= 4294967295 << (32 - 8 * (j % 4));
          b.length = q.ceil(j / 4);
        },
        clone: function () {
          var b = t.clone.call(this);
          b.words = this.words.slice(0);
          return b;
        },
        random: function (b) {
          for (var j = [], a = 0; a < b; a += 4)
            j.push((4294967296 * q.random()) | 0);
          return new n.init(j, b);
        },
      })),
      v = (k.enc = {}),
      u = (v.Hex = {
        stringify: function (b) {
          var a = b.words;
          b = b.sigBytes;
          for (var h = [], l = 0; l < b; l++) {
            var m = (a[l >>> 2] >>> (24 - 8 * (l % 4))) & 255;
            h.push((m >>> 4).toString(16));
            h.push((m & 15).toString(16));
          }
          return h.join("");
        },
        parse: function (b) {
          for (var a = b.length, h = [], l = 0; l < a; l += 2)
            h[l >>> 3] |= parseInt(b.substr(l, 2), 16) << (24 - 4 * (l % 8));
          return new n.init(h, a / 2);
        },
      }),
      a = (v.Latin1 = {
        stringify: function (b) {
          var a = b.words;
          b = b.sigBytes;
          for (var h = [], l = 0; l < b; l++)
            h.push(
              String.fromCharCode((a[l >>> 2] >>> (24 - 8 * (l % 4))) & 255)
            );
          return h.join("");
        },
        parse: function (b) {
          for (var a = b.length, h = [], l = 0; l < a; l++)
            h[l >>> 2] |= (b.charCodeAt(l) & 255) << (24 - 8 * (l % 4));
          return new n.init(h, a);
        },
      }),
      s = (v.Utf8 = {
        stringify: function (b) {
          try {
            return decodeURIComponent(escape(a.stringify(b)));
          } catch (h) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (b) {
          return a.parse(unescape(encodeURIComponent(b)));
        },
      }),
      h = (g.BufferedBlockAlgorithm = t.extend({
        reset: function () {
          this._data = new n.init();
          this._nDataBytes = 0;
        },
        _append: function (b) {
          "string" == typeof b && (b = s.parse(b));
          this._data.concat(b);
          this._nDataBytes += b.sigBytes;
        },
        _process: function (b) {
          var a = this._data,
            h = a.words,
            l = a.sigBytes,
            m = this.blockSize,
            k = l / (4 * m),
            k = b ? q.ceil(k) : q.max((k | 0) - this._minBufferSize, 0);
          b = k * m;
          l = q.min(4 * b, l);
          if (b) {
            for (var g = 0; g < b; g += m) this._doProcessBlock(h, g);
            g = h.splice(0, b);
            a.sigBytes -= l;
          }
          return new n.init(g, l);
        },
        clone: function () {
          var b = t.clone.call(this);
          b._data = this._data.clone();
          return b;
        },
        _minBufferSize: 0,
      }));
    g.Hasher = h.extend({
      cfg: t.extend(),
      init: function (b) {
        this.cfg = this.cfg.extend(b);
        this.reset();
      },
      reset: function () {
        h.reset.call(this);
        this._doReset();
      },
      update: function (b) {
        this._append(b);
        this._process();
        return this;
      },
      finalize: function (b) {
        b && this._append(b);
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (b) {
        return function (a, h) {
          return new b.init(h).finalize(a);
        };
      },
      _createHmacHelper: function (b) {
        return function (a, h) {
          return new m.HMAC.init(b, h).finalize(a);
        };
      },
    });
    var m = (k.algo = {});
    return k;
  })(Math);
(function (q) {
  function r(a, m, b, j, g, l, k) {
    a = a + ((m & b) | (~m & j)) + g + k;
    return ((a << l) | (a >>> (32 - l))) + m;
  }
  function k(a, m, b, j, g, l, k) {
    a = a + ((m & j) | (b & ~j)) + g + k;
    return ((a << l) | (a >>> (32 - l))) + m;
  }
  function g(a, m, b, j, g, l, k) {
    a = a + (m ^ b ^ j) + g + k;
    return ((a << l) | (a >>> (32 - l))) + m;
  }
  function p(a, g, b, j, k, l, p) {
    a = a + (b ^ (g | ~j)) + k + p;
    return ((a << l) | (a >>> (32 - l))) + g;
  }
  for (
    var t = CryptoJS,
      n = t.lib,
      v = n.WordArray,
      u = n.Hasher,
      n = t.algo,
      a = [],
      s = 0;
    64 > s;
    s++
  )
    a[s] = (4294967296 * q.abs(q.sin(s + 1))) | 0;
  n = n.MD5 = u.extend({
    _doReset: function () {
      this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    _doProcessBlock: function (h, m) {
      for (var b = 0; 16 > b; b++) {
        var j = m + b,
          n = h[j];
        h[j] =
          (((n << 8) | (n >>> 24)) & 16711935) |
          (((n << 24) | (n >>> 8)) & 4278255360);
      }
      var b = this._hash.words,
        j = h[m + 0],
        n = h[m + 1],
        l = h[m + 2],
        q = h[m + 3],
        t = h[m + 4],
        s = h[m + 5],
        u = h[m + 6],
        v = h[m + 7],
        w = h[m + 8],
        x = h[m + 9],
        y = h[m + 10],
        z = h[m + 11],
        A = h[m + 12],
        B = h[m + 13],
        C = h[m + 14],
        D = h[m + 15],
        c = b[0],
        d = b[1],
        e = b[2],
        f = b[3],
        c = r(c, d, e, f, j, 7, a[0]),
        f = r(f, c, d, e, n, 12, a[1]),
        e = r(e, f, c, d, l, 17, a[2]),
        d = r(d, e, f, c, q, 22, a[3]),
        c = r(c, d, e, f, t, 7, a[4]),
        f = r(f, c, d, e, s, 12, a[5]),
        e = r(e, f, c, d, u, 17, a[6]),
        d = r(d, e, f, c, v, 22, a[7]),
        c = r(c, d, e, f, w, 7, a[8]),
        f = r(f, c, d, e, x, 12, a[9]),
        e = r(e, f, c, d, y, 17, a[10]),
        d = r(d, e, f, c, z, 22, a[11]),
        c = r(c, d, e, f, A, 7, a[12]),
        f = r(f, c, d, e, B, 12, a[13]),
        e = r(e, f, c, d, C, 17, a[14]),
        d = r(d, e, f, c, D, 22, a[15]),
        c = k(c, d, e, f, n, 5, a[16]),
        f = k(f, c, d, e, u, 9, a[17]),
        e = k(e, f, c, d, z, 14, a[18]),
        d = k(d, e, f, c, j, 20, a[19]),
        c = k(c, d, e, f, s, 5, a[20]),
        f = k(f, c, d, e, y, 9, a[21]),
        e = k(e, f, c, d, D, 14, a[22]),
        d = k(d, e, f, c, t, 20, a[23]),
        c = k(c, d, e, f, x, 5, a[24]),
        f = k(f, c, d, e, C, 9, a[25]),
        e = k(e, f, c, d, q, 14, a[26]),
        d = k(d, e, f, c, w, 20, a[27]),
        c = k(c, d, e, f, B, 5, a[28]),
        f = k(f, c, d, e, l, 9, a[29]),
        e = k(e, f, c, d, v, 14, a[30]),
        d = k(d, e, f, c, A, 20, a[31]),
        c = g(c, d, e, f, s, 4, a[32]),
        f = g(f, c, d, e, w, 11, a[33]),
        e = g(e, f, c, d, z, 16, a[34]),
        d = g(d, e, f, c, C, 23, a[35]),
        c = g(c, d, e, f, n, 4, a[36]),
        f = g(f, c, d, e, t, 11, a[37]),
        e = g(e, f, c, d, v, 16, a[38]),
        d = g(d, e, f, c, y, 23, a[39]),
        c = g(c, d, e, f, B, 4, a[40]),
        f = g(f, c, d, e, j, 11, a[41]),
        e = g(e, f, c, d, q, 16, a[42]),
        d = g(d, e, f, c, u, 23, a[43]),
        c = g(c, d, e, f, x, 4, a[44]),
        f = g(f, c, d, e, A, 11, a[45]),
        e = g(e, f, c, d, D, 16, a[46]),
        d = g(d, e, f, c, l, 23, a[47]),
        c = p(c, d, e, f, j, 6, a[48]),
        f = p(f, c, d, e, v, 10, a[49]),
        e = p(e, f, c, d, C, 15, a[50]),
        d = p(d, e, f, c, s, 21, a[51]),
        c = p(c, d, e, f, A, 6, a[52]),
        f = p(f, c, d, e, q, 10, a[53]),
        e = p(e, f, c, d, y, 15, a[54]),
        d = p(d, e, f, c, n, 21, a[55]),
        c = p(c, d, e, f, w, 6, a[56]),
        f = p(f, c, d, e, D, 10, a[57]),
        e = p(e, f, c, d, u, 15, a[58]),
        d = p(d, e, f, c, B, 21, a[59]),
        c = p(c, d, e, f, t, 6, a[60]),
        f = p(f, c, d, e, z, 10, a[61]),
        e = p(e, f, c, d, l, 15, a[62]),
        d = p(d, e, f, c, x, 21, a[63]);
      b[0] = (b[0] + c) | 0;
      b[1] = (b[1] + d) | 0;
      b[2] = (b[2] + e) | 0;
      b[3] = (b[3] + f) | 0;
    },
    _doFinalize: function () {
      var a = this._data,
        g = a.words,
        b = 8 * this._nDataBytes,
        j = 8 * a.sigBytes;
      g[j >>> 5] |= 128 << (24 - (j % 32));
      var k = q.floor(b / 4294967296);
      g[(((j + 64) >>> 9) << 4) + 15] =
        (((k << 8) | (k >>> 24)) & 16711935) |
        (((k << 24) | (k >>> 8)) & 4278255360);
      g[(((j + 64) >>> 9) << 4) + 14] =
        (((b << 8) | (b >>> 24)) & 16711935) |
        (((b << 24) | (b >>> 8)) & 4278255360);
      a.sigBytes = 4 * (g.length + 1);
      this._process();
      a = this._hash;
      g = a.words;
      for (b = 0; 4 > b; b++)
        (j = g[b]),
          (g[b] =
            (((j << 8) | (j >>> 24)) & 16711935) |
            (((j << 24) | (j >>> 8)) & 4278255360));
      return a;
    },
    clone: function () {
      var a = u.clone.call(this);
      a._hash = this._hash.clone();
      return a;
    },
  });
  t.MD5 = u._createHelper(n);
  t.HmacMD5 = u._createHmacHelper(n);
})(Math);
(function () {
  var q = CryptoJS,
    r = q.enc.Utf8;
  q.algo.HMAC = q.lib.Base.extend({
    init: function (k, g) {
      k = this._hasher = new k.init();
      "string" == typeof g && (g = r.parse(g));
      var p = k.blockSize,
        q = 4 * p;
      g.sigBytes > q && (g = k.finalize(g));
      g.clamp();
      for (
        var n = (this._oKey = g.clone()),
          v = (this._iKey = g.clone()),
          u = n.words,
          a = v.words,
          s = 0;
        s < p;
        s++
      )
        (u[s] ^= 1549556828), (a[s] ^= 909522486);
      n.sigBytes = v.sigBytes = q;
      this.reset();
    },
    reset: function () {
      var k = this._hasher;
      k.reset();
      k.update(this._iKey);
    },
    update: function (k) {
      this._hasher.update(k);
      return this;
    },
    finalize: function (k) {
      var g = this._hasher;
      k = g.finalize(k);
      g.reset();
      return g.finalize(this._oKey.clone().concat(k));
    },
  });
})();

module.exports = CryptoJS;
