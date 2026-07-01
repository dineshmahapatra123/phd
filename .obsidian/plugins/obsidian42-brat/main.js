"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports = module2.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports, module2) {
    "use strict";
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports, module2) {
    "use strict";
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports, module2) {
    "use strict";
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports, module2) {
    "use strict";
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports, module2) {
    "use strict";
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports, module2) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports, module2) {
    "use strict";
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports, module2) {
    "use strict";
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports, module2) {
    "use strict";
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports, module2) {
    "use strict";
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports, module2) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports, module2) {
    "use strict";
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports, module2) {
    "use strict";
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports, module2) {
    "use strict";
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports, module2) {
    "use strict";
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports, module2) {
    "use strict";
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/semver/index.js"(exports, module2) {
    "use strict";
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => BratPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian15 = require("obsidian");

// src/features/BetaPlugins.ts
var import_obsidian8 = require("obsidian");
var import_semver2 = __toESM(require_semver2());

// src/ui/ConfirmModal.ts
var import_obsidian = require("obsidian");
var ConfirmModal = class extends import_obsidian.Modal {
  constructor(options, resolve) {
    super(options.app);
    this.resolve = resolve;
    this.isConfirmed = false;
    const DEFAULT_OPTIONS = {
      app: options.app,
      cancelButtonText: "Cancel",
      cssClass: "",
      message: options.message,
      okButtonText: "OK",
      title: ""
    };
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.containerEl.addClass("confirm-modal");
  }
  onClose() {
    super.onClose();
    this.resolve(this.isConfirmed);
  }
  onOpen() {
    void super.onOpen();
    this.titleEl.setText(this.options.title);
    this.contentEl.createEl("p", { text: this.options.message });
    const okButton = new import_obsidian.ButtonComponent(this.contentEl);
    okButton.setClass("ok-button");
    okButton.setButtonText(this.options.okButtonText);
    okButton.setCta();
    okButton.onClick(() => {
      this.isConfirmed = true;
      void this.close();
    });
    const cancelButton = new import_obsidian.ButtonComponent(this.contentEl);
    cancelButton.setButtonText(this.options.cancelButtonText);
    cancelButton.onClick(() => {
      void this.close();
    });
  }
};
async function confirm(options) {
  return await new Promise((resolve) => {
    const modal = new ConfirmModal(options, resolve);
    modal.open();
  });
}

// src/utils/GitHubAPIErrors.ts
var GHRateLimitError = class extends Error {
  constructor(limit, remaining, reset, requestUrl3) {
    const minutesToReset = Math.ceil((reset - Math.floor(Date.now() / 1e3)) / 60);
    super(`GitHub API rate limit exceeded. Reset in ${minutesToReset} minutes.`);
    this.limit = limit;
    this.remaining = remaining;
    this.reset = reset;
    this.requestUrl = requestUrl3;
  }
  getMinutesToReset() {
    return Math.ceil((this.reset - Math.floor(Date.now() / 1e3)) / 60);
  }
};
var GitHubResponseError = class extends Error {
  constructor(error) {
    var _a, _b;
    super(`GitHub API error ${error}: ${error.message}`);
    this.message = error.message;
    const ghError = error;
    this.status = (_a = ghError.status) != null ? _a : 400;
    this.headers = (_b = ghError.headers) != null ? _b : {};
    this.name = "GitHubResponseError";
  }
};

// src/features/githubUtils.ts
var import_obsidian2 = require("obsidian");
var import_semver = __toESM(require_semver2());
var scrubRepositoryUrl = (address) => {
  let scrubbedAddress = address.replace(/https?:\/\/github\.com\//i, "");
  if (scrubbedAddress.endsWith("/")) {
    scrubbedAddress = scrubbedAddress.slice(0, -1);
  }
  if (scrubbedAddress.toLowerCase().endsWith(".git")) {
    scrubbedAddress = scrubbedAddress.slice(0, -4);
  }
  return scrubbedAddress;
};
var TOKEN_PREFIXES = ["ghp_", "github_pat_"];
var TOKEN_REGEXP = /^(gh[ps]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})$/;
var normalizeHeaders = (headers) => {
  return Object.keys(headers).reduce(
    (acc, key) => {
      acc[key.toLowerCase()] = headers[key];
      return acc;
    },
    {}
  );
};
var validateGitHubToken = async (personalAccessToken, repository) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const validScopes = ["repo", "public_repo", "metadata=read"];
  const hasValidPrefix = TOKEN_PREFIXES.some(
    (prefix) => personalAccessToken.toLowerCase().startsWith(prefix.toLowerCase())
  );
  const hasValidFormat = TOKEN_REGEXP.test(personalAccessToken);
  if (!hasValidPrefix || !hasValidFormat) {
    const error = {
      type: !hasValidPrefix ? "invalid_prefix" /* INVALID_PREFIX */ : "invalid_format" /* INVALID_FORMAT */,
      message: "Invalid token format",
      details: {
        validPrefixes: TOKEN_PREFIXES
      }
    };
    return {
      validToken: false,
      currentScopes: [],
      acceptedScopes: [],
      acceptedPermissions: [],
      expirationDate: null,
      rateLimit: {
        limit: 0,
        remaining: 0,
        reset: 0,
        resource: "",
        used: 0
      },
      error
    };
  }
  try {
    const timestamp = Date.now() % 1e3;
    const repo = repository ? repository : `user${timestamp}/repo${timestamp % 100}`;
    await gitHubRequest({
      url: `https://api.github.com/repos/${repo}`,
      headers: {
        Authorization: `Token ${personalAccessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    if (repository) {
      return {
        validToken: true,
        currentScopes: [],
        acceptedScopes: [],
        acceptedPermissions: [],
        expirationDate: null,
        rateLimit: {
          limit: 0,
          remaining: 0,
          reset: 0,
          resource: "",
          used: 0
        },
        error: {
          type: "none" /* NONE */,
          message: "No error",
          details: {}
        }
      };
    }
    throw new Error("Expected request to fail");
  } catch (error) {
    if (!(error instanceof GitHubResponseError)) {
      throw error;
    }
    const headers = normalizeHeaders(error.headers);
    if (!headers) {
      throw new Error("No headers in GitHub response");
    }
    const rawExpirationDate = headers["github-authentication-token-expiration"];
    const parsedDate = rawExpirationDate ? new Date(rawExpirationDate) : null;
    const validDate = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null;
    const tokenInfo = {
      validToken: false,
      currentScopes: (_b = (_a = headers["x-oauth-scopes"]) == null ? void 0 : _a.split(", ")) != null ? _b : [],
      acceptedScopes: (_d = (_c = headers["x-accepted-oauth-scopes"]) == null ? void 0 : _c.split(", ")) != null ? _d : [],
      acceptedPermissions: (_f = (_e = headers["x-accepted-github-permissions"]) == null ? void 0 : _e.split(", ")) != null ? _f : [],
      expirationDate: validDate,
      rateLimit: {
        limit: Number.parseInt((_g = headers["x-ratelimit-limit"]) != null ? _g : "0", 10),
        remaining: Number.parseInt((_h = headers["x-ratelimit-remaining"]) != null ? _h : "0", 10),
        reset: Number.parseInt((_i = headers["x-ratelimit-reset"]) != null ? _i : "0", 10),
        resource: (_j = headers["x-ratelimit-resource"]) != null ? _j : "",
        used: Number.parseInt((_k = headers["x-ratelimit-used"]) != null ? _k : "0", 10)
      },
      error: {
        type: "none" /* NONE */,
        message: "No error",
        details: {}
      }
    };
    if (tokenInfo.expirationDate && new Date(tokenInfo.expirationDate) < /* @__PURE__ */ new Date()) {
      tokenInfo.error = {
        type: "expired" /* EXPIRED */,
        message: "Token has expired",
        details: {
          expirationDate: tokenInfo.expirationDate
        }
      };
      return tokenInfo;
    }
    const hasValidScope = tokenInfo.currentScopes.some((scope) => validScopes.includes(scope)) || tokenInfo.acceptedPermissions.some(
      (scope) => validScopes.includes(scope)
    );
    if (!hasValidScope) {
      tokenInfo.error = {
        type: "insufficient_scope" /* INSUFFICIENT_SCOPE */,
        message: "Token lacks required scopes. Check documentation for requirements.",
        details: {
          currentScopes: [
            ...tokenInfo.acceptedScopes,
            ...tokenInfo.acceptedPermissions
          ]
        }
      };
      return tokenInfo;
    }
    tokenInfo.validToken = error.status === 404;
    return tokenInfo;
  }
};
var isPrivateRepo = async (repository, debugLogging = true, accessToken = "") => {
  const URL = `https://api.github.com/repos/${repository}`;
  try {
    const response = await gitHubRequest({
      url: URL,
      headers: accessToken ? {
        Authorization: `Token ${accessToken}`
      } : {}
    });
    const json = response.json;
    if (typeof json === "object" && json !== null && "private" in json) {
      return Boolean(json.private);
    }
    return false;
  } catch (error) {
    if (error instanceof GHRateLimitError) {
      throw error;
    }
    if (debugLogging) console.error("error in isPrivateRepo", URL, error);
    return false;
  }
};
var fetchReleaseVersions = async (repository, debugLogging = true, accessToken = "") => {
  const apiUrl = `https://api.github.com/repos/${repository}/releases`;
  try {
    const response = await gitHubRequest({
      url: `${apiUrl}?per_page=100`,
      headers: accessToken ? {
        Authorization: `Token ${accessToken}`
      } : {}
    });
    const data = response.json;
    if (!Array.isArray(data)) return null;
    return data.map((release) => ({
      version: release.tag_name,
      prerelease: release.prerelease
    }));
  } catch (error) {
    if (error instanceof GHRateLimitError || error instanceof GitHubResponseError) {
      throw error;
    }
    if (debugLogging)
      console.error("Error in fetchReleaseVersions", apiUrl, error);
    return null;
  }
};
var grabReleaseFileFromRepository = async (release, fileName, debugLogging = true, isPrivate = false, personalAccessToken = "") => {
  try {
    const asset = release.assets.find(
      (asset2) => asset2.name === fileName
    );
    if (!asset) {
      return null;
    }
    const headers = {
      Accept: "application/octet-stream"
    };
    if (isPrivate && personalAccessToken) {
      headers.Authorization = `Token ${personalAccessToken}`;
    }
    const downloadUrl = isPrivate ? asset.url : asset.browser_download_url;
    const response = await (0, import_obsidian2.requestUrl)({
      url: downloadUrl,
      headers
    });
    return response.status !== 200 ? null : response.text;
  } catch (error) {
    if (error instanceof GHRateLimitError) {
      throw error;
    }
    if (debugLogging)
      console.error("error in grabReleaseFileFromRepository", release, error);
    return null;
  }
};
var grabCommmunityPluginList = async (debugLogging = true) => {
  const pluginListUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugins.json";
  try {
    const response = await (0, import_obsidian2.requestUrl)({
      url: pluginListUrl
    });
    return response.status === 404 ? null : response.json;
  } catch (error) {
    if (debugLogging) console.error("error in grabCommmunityPluginList", error);
    return null;
  }
};
var grabCommmunityThemesList = async (debugLogging = true) => {
  const themesUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-css-themes.json";
  try {
    const response = await (0, import_obsidian2.requestUrl)({ url: themesUrl });
    return response.status === 404 ? null : response.json;
  } catch (error) {
    if (debugLogging) console.error("error in grabCommmunityThemesList", error);
    return null;
  }
};
var grabCommmunityThemeCssFile = async (repositoryPath, betaVersion = false, debugLogging = false) => {
  const themesUrl = `https://raw.githubusercontent.com/${repositoryPath}/HEAD/theme${betaVersion ? "-beta" : ""}.css`;
  try {
    const response = await (0, import_obsidian2.requestUrl)({ url: themesUrl });
    return response.status === 404 ? null : response.text;
  } catch (error) {
    if (debugLogging)
      console.error("error in grabCommmunityThemeCssFile", error);
    return null;
  }
};
var grabCommmunityThemeManifestFile = async (repositoryPath, debugLogging = true) => {
  const themesUrl = `https://raw.githubusercontent.com/${repositoryPath}/HEAD/manifest.json`;
  try {
    const response = await (0, import_obsidian2.requestUrl)({ url: themesUrl });
    return response.status === 404 ? null : response.text;
  } catch (error) {
    if (debugLogging)
      console.error("error in grabCommmunityThemeManifestFile", error);
    return null;
  }
};
var checksum = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return sum;
};
var checksumForString = (str) => {
  return checksum(str).toString();
};
var grabChecksumOfThemeCssFile = async (repositoryPath, betaVersion, debugLogging) => {
  const themeCss = await grabCommmunityThemeCssFile(
    repositoryPath,
    betaVersion,
    debugLogging
  );
  return themeCss ? checksumForString(themeCss) : "0";
};
var grabLastCommitInfoForFile = async (repositoryPath, path, debugLogging = true) => {
  const url = `https://api.github.com/repos/${repositoryPath}/commits?path=${path}&page=1&per_page=1`;
  try {
    const response = await (0, import_obsidian2.requestUrl)({ url });
    return response.status === 404 ? null : response.json;
  } catch (error) {
    if (debugLogging)
      console.error("error in grabLastCommitInfoForAFile", error);
    return null;
  }
};
var grabLastCommitDateForFile = async (repositoryPath, path) => {
  var _a;
  const test = await grabLastCommitInfoForFile(
    repositoryPath,
    path
  );
  if (test && test.length > 0 && ((_a = test[0].commit.committer) == null ? void 0 : _a.date)) {
    return test[0].commit.committer.date;
  }
  return "";
};
var grabReleaseFromRepository = async (repositoryPath, version, includePrereleases = false, debugLogging = false, isPrivate = false, personalAccessToken) => {
  var _a;
  try {
    const apiUrl = version && version !== "latest" ? `https://api.github.com/repos/${repositoryPath}/releases/tags/${version}` : `https://api.github.com/repos/${repositoryPath}/releases`;
    const headers = {
      Accept: "application/vnd.github.v3+json"
    };
    if (isPrivate && personalAccessToken || personalAccessToken) {
      headers.Authorization = `Token ${personalAccessToken}`;
    }
    const response = await gitHubRequest({
      url: apiUrl,
      headers
    });
    if (response.status === 404) return null;
    const responseJson = response.json;
    const releases = version && version !== "latest" ? responseJson && typeof responseJson === "object" ? [responseJson] : [] : Array.isArray(responseJson) ? responseJson : [];
    if (debugLogging) {
      console.error(
        `grabReleaseFromRepository for ${repositoryPath}:`,
        releases
      );
    }
    return (_a = releases.sort((a, b) => {
      const aVersion = (0, import_semver.coerce)(a.tag_name, {
        includePrerelease: true,
        loose: true
      });
      const bVersion = (0, import_semver.coerce)(b.tag_name, {
        includePrerelease: true,
        loose: true
      });
      if (aVersion && bVersion) {
        return (0, import_semver.compare)(bVersion.version, aVersion.version);
      }
      if (aVersion && !bVersion) return -1;
      if (!aVersion && bVersion) return 1;
      const aDate = new Date(a.published_at).getTime();
      const bDate = new Date(b.published_at).getTime();
      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    }).filter((release) => includePrereleases || !release.prerelease)[0]) != null ? _a : null;
  } catch (error) {
    if (debugLogging) {
      console.error(
        `Error in grabReleaseFromRepository for ${repositoryPath}:`,
        error
      );
    }
    throw error;
  }
};
var gitHubRequest = async (options, debugLogging) => {
  let limit = 0;
  let remaining = 0;
  let reset = 0;
  options.headers = {
    ...options.headers,
    "User-Agent": "Obsidian/BRAT-Plugin"
  };
  try {
    const response = await (0, import_obsidian2.requestUrl)(options);
    return response;
  } catch (error) {
    const gitHubError = new GitHubResponseError(error);
    const headers = normalizeHeaders(gitHubError.headers);
    if (headers) {
      limit = Number.parseInt(headers["x-ratelimit-limit"], 10);
      remaining = Number.parseInt(headers["x-ratelimit-remaining"], 10);
      reset = Number.parseInt(headers["x-ratelimit-reset"], 10);
    }
    if (gitHubError.status === 403 && remaining === 0) {
      const rateLimitError = new GHRateLimitError(
        limit,
        remaining,
        reset,
        options.url
      );
      if (debugLogging) {
        console.error(
          "BRAT\nGitHub API rate limit exceeded:",
          `
Request: ${rateLimitError.requestUrl}`,
          `
Rate limits - Remaining: ${rateLimitError.remaining}`,
          `
Reset in: ${rateLimitError.getMinutesToReset()} minutes`
        );
      }
      throw rateLimitError;
    }
    if (debugLogging) {
      console.error("GitHub request failed:", error);
    }
    throw gitHubError;
  }
};

// src/settings.ts
var DEFAULT_SETTINGS = {
  pluginList: [],
  pluginSubListFrozenVersion: [],
  themesList: [],
  updateAtStartup: true,
  updateThemesAtStartup: true,
  enableAfterInstall: true,
  loggingEnabled: false,
  loggingPath: "BRAT-log",
  loggingVerboseEnabled: false,
  debuggingMode: false,
  notificationsEnabled: true,
  globalTokenName: "",
  personalAccessToken: "",
  selectLatestPluginVersionByDefault: false,
  allowIncompatiblePlugins: false
};
function addBetaPluginToList(plugin, repositoryPath, specifyVersion = "latest", isIncompatible = false, secretName = "") {
  let save = false;
  if (!plugin.settings.pluginList.contains(repositoryPath)) {
    plugin.settings.pluginList.unshift(repositoryPath);
    save = true;
  }
  const existingFrozenPlugin = plugin.settings.pluginSubListFrozenVersion.find(
    (p) => p.repo === repositoryPath
  );
  if (existingFrozenPlugin) {
    Object.assign(existingFrozenPlugin, {
      repo: repositoryPath,
      version: specifyVersion,
      token: void 0,
      // Don't store token in settings
      tokenName: secretName || existingFrozenPlugin.tokenName,
      isIncompatible: isIncompatible || void 0
    });
    save = true;
  } else {
    plugin.settings.pluginSubListFrozenVersion.unshift({
      repo: repositoryPath,
      version: specifyVersion,
      token: void 0,
      // Don't store token in settings
      tokenName: secretName || void 0,
      isIncompatible: isIncompatible || void 0
    });
    save = true;
  }
  if (save) {
    void plugin.saveSettings();
  }
}
function existBetaPluginInList(plugin, repositoryPath) {
  return plugin.settings.pluginList.contains(repositoryPath);
}
function addBetaThemeToList(plugin, repositoryPath, themeCss) {
  const newTheme = {
    repo: repositoryPath,
    lastUpdate: checksumForString(themeCss)
  };
  plugin.settings.themesList.unshift(newTheme);
  void plugin.saveSettings();
}
function existBetaThemeinInList(plugin, repositoryPath) {
  const testIfThemExists = plugin.settings.themesList.find(
    (t) => t.repo === repositoryPath
  );
  return !!testIfThemExists;
}
function updatePluginTokenName(plugin, repositoryPath, tokenName) {
  const existingFrozenPlugin = plugin.settings.pluginSubListFrozenVersion.find(
    (p) => p.repo === repositoryPath
  );
  if (existingFrozenPlugin) {
    existingFrozenPlugin.tokenName = tokenName || void 0;
    void plugin.saveSettings();
  }
}
function updateBetaThemeLastUpdateChecksum(plugin, repositoryPath, checksum2) {
  for (const t of plugin.settings.themesList) {
    if (t.repo === repositoryPath) {
      t.lastUpdate = checksum2;
      void plugin.saveSettings();
    }
  }
}

// src/ui/AddNewPluginModal.ts
var import_obsidian6 = require("obsidian");

// src/utils/TokenValidator.ts
var TokenValidator = class {
  constructor(statusEl) {
    this.statusEl = statusEl;
  }
  async validateToken(token, repository) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!token) {
      (_a = this.statusEl) == null ? void 0 : _a.setText("No token provided");
      (_b = this.statusEl) == null ? void 0 : _b.addClass("invalid");
      (_c = this.statusEl) == null ? void 0 : _c.removeClass("valid");
      return false;
    }
    try {
      const patInfo = await validateGitHubToken(token, repository);
      (_d = this.statusEl) == null ? void 0 : _d.removeClass("invalid", "valid");
      (_e = this.statusEl) == null ? void 0 : _e.empty();
      if (patInfo.validToken) {
        (_f = this.statusEl) == null ? void 0 : _f.addClass("valid");
        this.showValidTokenInfo(patInfo);
        return true;
      }
      (_g = this.statusEl) == null ? void 0 : _g.addClass("invalid");
      this.showErrorMessage(patInfo.error);
      return false;
    } catch (error) {
      console.error("Token validation error:", error);
      (_h = this.statusEl) == null ? void 0 : _h.setText("Failed to validate token");
      (_i = this.statusEl) == null ? void 0 : _i.addClass("invalid");
      return false;
    }
  }
  showValidTokenInfo(patInfo) {
    var _a, _b;
    const details = (_a = this.statusEl) == null ? void 0 : _a.createDiv({ cls: "brat-token-details" });
    if (!details) return;
    details.createDiv({
      text: "\u2713 Valid token",
      cls: "brat-token-status valid"
    });
    if ((_b = patInfo.currentScopes) == null ? void 0 : _b.length) {
      details.createDiv({
        text: `Scopes: ${patInfo.currentScopes.join(", ")}`,
        cls: "brat-token-scopes"
      });
    }
    if (patInfo.rateLimit) {
      details.createDiv({
        text: `Rate Limit: ${patInfo.rateLimit.remaining}/${patInfo.rateLimit.limit}`,
        cls: "brat-token-rate"
      });
    }
    if (patInfo.expirationDate) {
      const expires = new Date(patInfo.expirationDate);
      const daysLeft = Math.ceil(
        (expires.getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
      );
      if (daysLeft < 7) {
        details.createDiv({
          text: `\u26A0\uFE0F Token expires in ${daysLeft} days`,
          cls: "brat-token-warning"
        });
      }
    }
  }
  showErrorMessage(error) {
    var _a, _b, _c;
    const details = (_a = this.statusEl) == null ? void 0 : _a.createDiv({ cls: "brat-token-error" });
    if (!details) return;
    details.createDiv({ text: error.message });
    if (error.details) {
      switch (error.type) {
        case "invalid_prefix" /* INVALID_PREFIX */:
          details.createDiv({
            text: `Valid prefixes: ${(_b = error.details.validPrefixes) == null ? void 0 : _b.join(", ")}`
          });
          break;
        case "insufficient_scope" /* INSUFFICIENT_SCOPE */:
          details.createDiv({
            text: `Required scopes: ${(_c = error.details.requiredScopes) == null ? void 0 : _c.join(", ")}`
          });
          break;
      }
    }
  }
};

// src/utils/utils.ts
function createGitHubResourceLink(githubResource, optionalText) {
  const newLink = new DocumentFragment();
  const linkElement = document.createElement("a");
  linkElement.textContent = githubResource;
  linkElement.href = `https://github.com/${githubResource}`;
  linkElement.target = "_blank";
  newLink.appendChild(linkElement);
  if (optionalText) {
    const textNode = document.createTextNode(optionalText);
    newLink.appendChild(textNode);
  }
  return newLink;
}
function createLink({
  prependText,
  url,
  text,
  appendText
}) {
  const newLink = new DocumentFragment();
  const linkElement = document.createElement("a");
  linkElement.textContent = text;
  linkElement.href = url;
  if (prependText) {
    const textNode = document.createTextNode(prependText);
    newLink.appendChild(textNode);
  }
  newLink.appendChild(linkElement);
  if (appendText) {
    const textNode = document.createTextNode(appendText);
    newLink.appendChild(textNode);
  }
  return newLink;
}

// src/i18n/index.ts
var import_obsidian3 = require("obsidian");

// src/i18n/locales/de.ts
var de = {
  common: {
    and: " und ",
    promotional: {
      learnMore: "Mehr \xFCber meine Arbeit:"
    }
  },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "Beta-Plugins nach der Installation automatisch aktivieren",
        desc: "Wenn aktiviert, werden neu installierte Beta-Plugins standardm\xE4\xDFig automatisch aktiviert. Diese Option kann im Formular zum Hinzuf\xFCgen eines Plugins pro Plugin angepasst werden."
      },
      autoUpdatePluginsAtStartup: {
        name: "Beta-Plugins beim Start automatisch aktualisieren",
        desc: "Wenn aktiviert, pr\xFCft BRAT bei jedem Start von Obsidian alle Beta-Plugins auf Updates. Plugins mit fixierter Version werden nicht aktualisiert."
      },
      autoUpdateThemesAtStartup: {
        name: "Beta-Themes beim Start automatisch aktualisieren",
        desc: "Wenn aktiviert, pr\xFCft BRAT bei jedem Start von Obsidian alle Beta-Themes auf Updates."
      },
      selectLatestPluginVersionByDefault: {
        name: "Neueste Plugin-Version standardm\xE4\xDFig ausw\xE4hlen",
        desc: "Wenn aktiviert, wird beim Hinzuf\xFCgen eines neuen Plugins standardm\xE4\xDFig die neueste Version ausgew\xE4hlt."
      },
      allowIncompatiblePlugins: {
        name: "Inkompatible Plugins erlauben",
        desc: "Wenn aktiviert, k\xF6nnen Plugins installiert werden, die eine h\xF6here Obsidian-Version voraussetzen. Au\xDFerdem k\xF6nnen Desktop-only-Plugins auf Mobilger\xE4ten installiert werden."
      }
    },
    monitoring: {
      heading: "\xDCberwachung",
      enableNotifications: {
        name: "Benachrichtigungen aktivieren",
        desc: "Wenn aktiviert, zeigt BRAT Popup-Benachrichtigungen zu verschiedenen Aktivit\xE4ten an. Wenn deaktiviert, werden keine Benachrichtigungen angezeigt."
      },
      enableLogging: {
        name: "Protokollierung aktivieren",
        desc: "Plugin-Updates werden in eine Protokolldatei geschrieben."
      },
      bratLogFileLocation: {
        name: "Speicherort der BRAT-Protokolldatei",
        desc: "Protokolle werden in dieser Datei gespeichert. F\xFCge dem Dateinamen kein .md hinzu.",
        placeholder: "Beispiel: BRAT-log"
      },
      enableVerboseLogging: {
        name: "Ausf\xFChrliche Protokollierung aktivieren",
        desc: "Schreibt deutlich mehr Informationen in das Protokoll."
      },
      debuggingMode: {
        name: "Debug-Modus",
        desc: "Sehr ausf\xFChrliche Konsolenprotokollierung. Kann zur Fehlerbehebung und Entwicklung verwendet werden."
      }
    },
    githubPersonalAccessToken: {
      heading: "GitHub Personal Access Token",
      personalAccessToken: {
        name: "Pers\xF6nliches Zugriffstoken",
        desc: {
          prependText: "Lege ein pers\xF6nliches Zugriffstoken fest, um die Rate Limits f\xFCr \xF6ffentliche GitHub-Repositorys zu erh\xF6hen. Du kannst es in ",
          linkText: "deinen GitHub-Kontoeinstellungen",
          appendText: " erstellen und anschlie\xDFend hier hinzuf\xFCgen. Weitere Informationen findest du in der Dokumentation."
        }
      },
      clearPersonalAccessToken: "Pers\xF6nliches Zugriffstoken l\xF6schen",
      validate: "Validieren"
    },
    betaPluginList: {
      heading: "Beta-Plugin-Liste",
      filterPlaceholder: "Plugins filtern",
      description: {
        intro: 'Dies ist die Liste der Beta-Plugins, die \xFCber den Befehl "add a beta plugin for testing" hinzugef\xFCgt wurden. Du kannst die neueste Version verwenden oder eine Version fixieren. Eine fixierte Version ist ein bestimmtes Plugin-Release anhand seines Release-Tags.',
        editAndRemove: 'Klicke auf die Schaltfl\xE4che "Bearbeiten" neben einem Plugin, um die installierte Version zu \xE4ndern. Klicke auf die Schaltfl\xE4che "X" neben einem Plugin, um es aus der Liste zu entfernen.',
        noteLabel: "Hinweis: ",
        noteText: "Das Entfernen aus der Liste l\xF6scht das Plugin nicht. Das sollte \xFCber den Bereich Community-Plugins in den Einstellungen erfolgen."
      },
      addBetaPlugin: "Beta-Plugin hinzuf\xFCgen",
      trackedVersion: (version, frozen) => ` Verfolgte Version: ${version === "latest" ? "neueste Version" : version} ${frozen ? "(fixiert)" : ""}`,
      incompatible: " (inkompatibel)",
      secretMissing: (secretName) => ` Secret nicht definiert oder leer: ${secretName}`,
      secretMissingTitle: "Ein Token-Name ist konfiguriert, aber das Secret fehlt. F\xFCge das Secret hinzu oder aktualisiere die Plugin-Konfiguration.",
      secretMissingTooltip: (secretName) => `Secret fehlt: ${secretName}. Bitte f\xFCge das Secret hinzu oder aktualisiere die Plugin-Konfiguration.`,
      checkAndUpdatePlugin: "Plugin pr\xFCfen und aktualisieren",
      changeVersionAndUpdateSettings: "Version \xE4ndern und Einstellungen aktualisieren",
      removeThisBetaPlugin: "Dieses Beta-Plugin entfernen",
      confirmRemoval: "Zum Best\xE4tigen erneut klicken",
      copyPluginIdentifier: "Plugin-Kennung kopieren"
    },
    betaThemeList: {
      heading: "Beta-Theme-Liste",
      addBetaTheme: "Beta-Theme hinzuf\xFCgen",
      filterPlaceholder: "Themes filtern",
      deleteThisBetaTheme: "Dieses Beta-Theme l\xF6schen",
      confirmRemoval: "Zum Best\xE4tigen erneut klicken",
      copyThemeIdentifier: "Theme-Kennung kopieren"
    },
    copyIdentifier: {
      copied: (identifier) => `Kopiert: ${identifier}`,
      failed: "Kennung konnte nicht kopiert werden. Bitte pr\xFCfe die Clipboard-Berechtigungen."
    }
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "Plugin hinzuf\xFCgen",
      changeVersion: "Version \xE4ndern",
      installing: "Wird installiert \u2026",
      neverMind: "Abbrechen",
      valid: "G\xFCltig",
      invalid: "Ung\xFCltig"
    },
    heading: {
      changePluginVersion: "Plugin-Version \xE4ndern: ",
      githubRepositoryForBetaPlugin: "GitHub-Repository f\xFCr das Beta-Plugin:"
    },
    repository: {
      label: "Repository",
      placeholder: "Repository (Beispiel: https://GitHub.com/githubusername/repository-name)",
      enterAddressToValidate: "Gib eine GitHub-Repository-Adresse ein, um sie zu validieren.",
      addressRequired: "Repository-Adresse ist erforderlich.",
      validating: "Repository-Adresse wird validiert...",
      noReleasesFound: "Fehler: In diesem Repository wurden keine Releases gefunden.",
      notFound: "Repository nicht gefunden. Pr\xFCfe die Adresse oder gib ein g\xFCltiges Token f\xFCr den Zugriff auf ein privates Repository an.",
      accessDenied: "Zugriff verweigert. Pr\xFCfe dein pers\xF6nliches Zugriffstoken.",
      error: (message) => `Fehler: ${message}`,
      rateLimitExceeded: (minutes) => `GitHub API Rate Limit \xFCberschritten. Versuche es in ${minutes} Minuten erneut.`,
      rateLimitToast: (message) => `${message} Du kannst in den BRAT-Einstellungen ein pers\xF6nliches Zugriffstoken hinzuf\xFCgen, um h\xF6here Limits zu erhalten. Siehe Dokumentation f\xFCr Details.`,
      gitHubResponseToast: (message) => `${message} `
    },
    version: {
      selectVersion: "Version ausw\xE4hlen",
      selectVersionEllipsis: "Version ausw\xE4hlen...",
      latestVersion: "Neueste Version",
      prereleaseSuffix: "(Vorabversion)"
    },
    token: {
      name: "GitHub-Token",
      desc: "W\xE4hle ein Secret als Token f\xFCr dieses Repository aus (optional)",
      settingCleared: (repository) => `Token-Einstellung f\xFCr ${repository} gel\xF6scht`,
      settingUpdated: (repository) => `Token-Einstellung f\xFCr ${repository} aktualisiert`
    },
    enableAfterInstall: "Plugin nach der Installation aktivieren",
    alreadyInList: "Dieses Plugin ist bereits in der Beta-Testliste"
  },
  addBetaThemeModal: {
    heading: {
      githubRepositoryForBetaTheme: "GitHub-Repository f\xFCr das Beta-Theme:"
    },
    alreadyInList: "Dieses Theme ist bereits in der Beta-Testliste"
  },
  themeMessages: {
    noThemeCssFile: "Im Stammverzeichnis dieses Repositorys gibt es keine Datei theme.css oder theme-beta.css, daher kann kein Theme installiert werden.",
    noManifestFile: "Im Stammverzeichnis dieses Repositorys gibt es keine Datei manifest.json, daher kann das Theme nicht installiert werden.",
    installed: (themeName, repository) => `Theme ${themeName} wurde aus ${repository} installiert. `,
    updated: (themeName, repository) => `Theme ${themeName} wurde aus ${repository} aktualisiert.`,
    removed: (repository) => `${repository} wurde aus der BRAT-Theme-Liste entfernt und wird nicht mehr aktualisiert. Die Theme-Dateien sind jedoch weiterhin im Vault vorhanden. Um sie zu entfernen, \xF6ffne Einstellungen > Erscheinungsbild und entferne das Theme dort.`
  },
  versionSuggestModal: {
    title: "Version ausw\xE4hlen",
    placeholder: (repository) => `Version f\xFCr ${repository} suchen`,
    versionLabel: (version) => version === "latest" ? "Neueste Version" : version,
    instructions: {
      navigateVersions: "Versionen durchsuchen",
      selectVersion: "Version ausw\xE4hlen",
      dismissModal: "Dialog schlie\xDFen"
    },
    prereleaseSuffix: "(Vorabversion)"
  }
};

// src/i18n/locales/en.ts
var en = {
  common: {
    and: " and ",
    promotional: {
      learnMore: "Learn more about my work at:"
    }
  },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "Auto-enable plugins after installation",
        desc: 'If enabled beta plugins will be automatically enabled after installtion by default. Note: you can toggle this on and off for each plugin in the "add plugin" form.'
      },
      autoUpdatePluginsAtStartup: {
        name: "Auto-update plugins at startup",
        desc: "If enabled all beta plugins will be checked for updates each time Obsidian starts. Note: this does not update frozen version plugins."
      },
      autoUpdateThemesAtStartup: {
        name: "Auto-update themes at startup",
        desc: "If enabled all beta themes will be checked for updates each time Obsidian starts."
      },
      selectLatestPluginVersionByDefault: {
        name: "Select latest plugin version by default",
        desc: "If enabled the latest version will be selected by default when adding a new plugin."
      },
      allowIncompatiblePlugins: {
        name: "Allow incompatible plugins",
        desc: "If enabled, plugins with higher app versions will be allowed to be installed. Also it allows desktop-only plugins to be installed on mobile devices."
      }
    },
    monitoring: {
      heading: "Monitoring",
      enableNotifications: {
        name: "Enable notifications",
        desc: "BRAT will provide popup notifications for its various activities. Turn this off means no notifications."
      },
      enableLogging: {
        name: "Enable logging",
        desc: "Plugin updates will be logged to a file in the log file."
      },
      bratLogFileLocation: {
        name: "BRAT log file location",
        desc: "Logs will be saved to this file. Don't add .md to the file name.",
        placeholder: "Example: BRAT-log"
      },
      enableVerboseLogging: {
        name: "Enable verbose logging",
        desc: "Get a lot  more information in  the log."
      },
      debuggingMode: {
        name: "Debugging mode",
        desc: "Atomic bomb level console logging. Can be used for troubleshooting and development."
      }
    },
    githubPersonalAccessToken: {
      heading: "GitHub Personal Access Token",
      personalAccessToken: {
        name: "Personal access token",
        desc: {
          prependText: "Set a personal access token to increase rate limits for public repositories on GitHub. You can create one in ",
          linkText: "your GitHub account settings",
          appendText: " and then add it here. Please consult the documentation for more details."
        }
      },
      clearPersonalAccessToken: "Clear personal access token",
      validate: "Validate"
    },
    betaPluginList: {
      heading: "Beta plugin list",
      filterPlaceholder: "Filter plugins",
      description: {
        intro: 'The following is a list of beta plugins added via the command "add a beta plugin for testing". You can chose to add the latest version or a frozen version. A frozen version is a specific release of a plugin based on its release tag.',
        editAndRemove: 'Click the "edit" button next to a plugin to change the installed version. Click the "X" button next to a plugin to remove it from the list.',
        noteLabel: "Note: ",
        noteText: "Removing from the list does not delete the plugin, this should be done from the Community Plugins tab in Settings."
      },
      addBetaPlugin: "Add beta plugin",
      trackedVersion: (version, frozen) => ` Tracked version: ${version} ${frozen ? "(frozen)" : ""}`,
      incompatible: " (incompatible)",
      secretMissing: (secretName) => ` Secret not defined or empty: ${secretName}`,
      secretMissingTitle: "Token name configured but secret is missing. Add the secret or update the plugin configuration.",
      secretMissingTooltip: (secretName) => `Secret missing: ${secretName}. Please add the secret or update the plugin configuration.`,
      checkAndUpdatePlugin: "Check and update plugin",
      changeVersionAndUpdateSettings: "Change version and update settings",
      removeThisBetaPlugin: "Remove this beta plugin",
      confirmRemoval: "Click once more to confirm removal",
      copyPluginIdentifier: "Copy plugin identifier"
    },
    betaThemeList: {
      heading: "Beta themes list",
      addBetaTheme: "Add beta theme",
      filterPlaceholder: "Filter themes",
      deleteThisBetaTheme: "Delete this beta theme",
      confirmRemoval: "Click once more to confirm removal",
      copyThemeIdentifier: "Copy theme identifier"
    },
    copyIdentifier: {
      copied: (identifier) => `Copied: ${identifier}`,
      failed: "Failed to copy identifier. Check clipboard permissions."
    }
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "Add plugin",
      changeVersion: "Change version",
      installing: "Installing \u2026",
      neverMind: "Never mind",
      valid: "Valid",
      invalid: "Invalid"
    },
    heading: {
      changePluginVersion: "Change plugin version: ",
      githubRepositoryForBetaPlugin: "GitHub repository for beta plugin:"
    },
    repository: {
      label: "Repository",
      placeholder: "Repository (example: https://GitHub.com/githubusername/repository-name)",
      enterAddressToValidate: "Enter a GitHub repository address to validate it.",
      addressRequired: "Repository address is required.",
      validating: "Validating repository address...",
      noReleasesFound: "Error: No releases found in this repository.",
      notFound: "Repository not found. Check the address or provide a valid token for access to a private repository.",
      accessDenied: "Access denied. Check your personal access token.",
      error: (message) => `Error: ${message}`,
      rateLimitExceeded: (minutes) => `GitHub API rate limit exceeded. Try again in ${minutes} minutes.`,
      rateLimitToast: (message) => `${message} Consider adding a personal access token in BRAT settings for higher limits. See documentation for details.`,
      gitHubResponseToast: (message) => `${message} `
    },
    version: {
      selectVersion: "Select a version",
      selectVersionEllipsis: "Select a version...",
      latestVersion: "Latest version",
      prereleaseSuffix: "(Prerelease)"
    },
    token: {
      name: "GitHub token",
      desc: "Select a secret as token for this repository (optional)",
      settingCleared: (repository) => `Token setting cleared for ${repository}`,
      settingUpdated: (repository) => `Token setting updated for ${repository}`
    },
    enableAfterInstall: "Enable after installing the plugin",
    alreadyInList: "This plugin is already in the list for beta testing"
  },
  addBetaThemeModal: {
    heading: {
      githubRepositoryForBetaTheme: "GitHub repository for beta theme:"
    },
    alreadyInList: "This theme is already in the list for beta testing"
  },
  themeMessages: {
    noThemeCssFile: "There is no theme.css or theme-beta.css file in the root path of this repository, so there is no theme to install.",
    noManifestFile: "There is no manifest.json file in the root path of this repository, so theme cannot be installed.",
    installed: (themeName, repository) => `${themeName} theme installed from ${repository}. `,
    updated: (themeName, repository) => `${themeName} theme updated from ${repository}.`,
    removed: (repository) => `Removed ${repository} from BRAT themes list and will no longer be updated. However, the theme files still exist in the vault. To remove them, go into Settings > Appearance and remove the theme.`
  },
  versionSuggestModal: {
    title: "Select a version",
    placeholder: (repository) => `Type to search for a version for ${repository}`,
    versionLabel: (version) => version,
    instructions: {
      navigateVersions: "Navigate versions",
      selectVersion: "Select version",
      dismissModal: "Dismiss modal"
    },
    prereleaseSuffix: "(Prerelease)"
  }
};

// src/i18n/locales/ja.ts
var ja = {
  common: {
    and: " \u3068 ",
    promotional: {
      learnMore: "\u4F5C\u8005\u306E\u4ED6\u306E\u4F5C\u54C1\u3092\u898B\u308B\uFF1A"
    }
  },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u5F8C\u306B Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u81EA\u52D5\u3067\u6709\u52B9\u5316",
        desc: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u65B0\u3057\u304F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u305F Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u306F\u65E2\u5B9A\u3067\u81EA\u52D5\u7684\u306B\u6709\u52B9\u306B\u306A\u308A\u307E\u3059\u3002\u500B\u5225\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u306B\u3064\u3044\u3066\u306F\u300C\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u8FFD\u52A0\u300D\u30D5\u30A9\u30FC\u30E0\u3067\u5207\u308A\u66FF\u3048\u3089\u308C\u307E\u3059\u3002"
      },
      autoUpdatePluginsAtStartup: {
        name: "\u8D77\u52D5\u6642\u306B Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u81EA\u52D5\u66F4\u65B0",
        desc: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001Obsidian \u306E\u8D77\u52D5\u6642\u306B\u3059\u3079\u3066\u306E Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u66F4\u65B0\u3092\u78BA\u8A8D\u3057\u307E\u3059\u3002\u56FA\u5B9A\u30D0\u30FC\u30B8\u30E7\u30F3\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u306F\u66F4\u65B0\u3055\u308C\u307E\u305B\u3093\u3002"
      },
      autoUpdateThemesAtStartup: {
        name: "\u8D77\u52D5\u6642\u306B Beta \u30C6\u30FC\u30DE\u3092\u81EA\u52D5\u66F4\u65B0",
        desc: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001Obsidian \u306E\u8D77\u52D5\u6642\u306B\u3059\u3079\u3066\u306E Beta \u30C6\u30FC\u30DE\u306E\u66F4\u65B0\u3092\u78BA\u8A8D\u3057\u307E\u3059\u3002"
      },
      selectLatestPluginVersionByDefault: {
        name: "\u65E2\u5B9A\u3067\u6700\u65B0\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u9078\u629E",
        desc: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u65B0\u3057\u3044\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u8FFD\u52A0\u3059\u308B\u3068\u304D\u306B\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3\u304C\u65E2\u5B9A\u3067\u9078\u629E\u3055\u308C\u307E\u3059\u3002"
      },
      allowIncompatiblePlugins: {
        name: "\u4E92\u63DB\u6027\u306E\u306A\u3044\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u8A31\u53EF",
        desc: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u3088\u308A\u65B0\u3057\u3044 Obsidian \u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u5FC5\u8981\u3068\u3059\u308B\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3067\u304D\u307E\u3059\u3002\u307E\u305F\u3001\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u5C02\u7528\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30E2\u30D0\u30A4\u30EB\u7AEF\u672B\u306B\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u3053\u3068\u3082\u8A31\u53EF\u3055\u308C\u307E\u3059\u3002"
      }
    },
    monitoring: {
      heading: "\u76E3\u8996",
      enableNotifications: {
        name: "\u901A\u77E5\u3092\u6709\u52B9\u5316",
        desc: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001BRAT \u306F\u5404\u7A2E\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3\u306B\u3064\u3044\u3066\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u901A\u77E5\u3092\u8868\u793A\u3057\u307E\u3059\u3002\u30AA\u30D5\u306B\u3059\u308B\u3068\u901A\u77E5\u306F\u8868\u793A\u3055\u308C\u307E\u305B\u3093\u3002"
      },
      enableLogging: {
        name: "\u30ED\u30B0\u3092\u6709\u52B9\u5316",
        desc: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u66F4\u65B0\u306F\u30ED\u30B0\u30D5\u30A1\u30A4\u30EB\u306B\u8A18\u9332\u3055\u308C\u307E\u3059\u3002"
      },
      bratLogFileLocation: {
        name: "BRAT \u30ED\u30B0\u30D5\u30A1\u30A4\u30EB\u306E\u5834\u6240",
        desc: "\u30ED\u30B0\u306F\u3053\u306E\u30D5\u30A1\u30A4\u30EB\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002\u30D5\u30A1\u30A4\u30EB\u540D\u306B .md \u306F\u8FFD\u52A0\u3057\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002",
        placeholder: "\u4F8B\uFF1ABRAT-log"
      },
      enableVerboseLogging: {
        name: "\u8A73\u7D30\u30ED\u30B0\u3092\u6709\u52B9\u5316",
        desc: "\u30ED\u30B0\u306B\u3088\u308A\u591A\u304F\u306E\u60C5\u5831\u3092\u8A18\u9332\u3057\u307E\u3059\u3002"
      },
      debuggingMode: {
        name: "\u30C7\u30D0\u30C3\u30B0\u30E2\u30FC\u30C9",
        desc: "\u975E\u5E38\u306B\u8A73\u7D30\u306A\u30B3\u30F3\u30BD\u30FC\u30EB\u30ED\u30B0\u3092\u51FA\u529B\u3057\u307E\u3059\u3002\u30C8\u30E9\u30D6\u30EB\u30B7\u30E5\u30FC\u30C6\u30A3\u30F3\u30B0\u3084\u958B\u767A\u306B\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002"
      }
    },
    githubPersonalAccessToken: {
      heading: "GitHub \u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3",
      personalAccessToken: {
        name: "\u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3",
        desc: {
          prependText: "\u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u8A2D\u5B9A\u3059\u308B\u3068\u3001GitHub \u306E\u516C\u958B\u30EA\u30DD\u30B8\u30C8\u30EA\u306B\u5BFE\u3059\u308B\u30EC\u30FC\u30C8\u5236\u9650\u3092\u7DE9\u548C\u3067\u304D\u307E\u3059\u3002\u30C8\u30FC\u30AF\u30F3\u306F ",
          linkText: "GitHub \u30A2\u30AB\u30A6\u30F3\u30C8\u8A2D\u5B9A",
          appendText: " \u3067\u4F5C\u6210\u3057\u3001\u3053\u3053\u306B\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002\u8A73\u3057\u304F\u306F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u53C2\u7167\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        }
      },
      clearPersonalAccessToken: "\u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u30AF\u30EA\u30A2",
      validate: "\u691C\u8A3C"
    },
    betaPluginList: {
      heading: "Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u4E00\u89A7",
      filterPlaceholder: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u7D5E\u308A\u8FBC\u307F",
      description: {
        intro: '\u4EE5\u4E0B\u306F\u3001"add a beta plugin for testing" \u30B3\u30DE\u30F3\u30C9\u3067\u8FFD\u52A0\u3055\u308C\u305F Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u4E00\u89A7\u3067\u3059\u3002\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u4F7F\u3046\u3053\u3068\u3082\u3001\u7279\u5B9A\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u306B\u56FA\u5B9A\u3059\u308B\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002\u56FA\u5B9A\u30D0\u30FC\u30B8\u30E7\u30F3\u3068\u306F\u3001\u30EA\u30EA\u30FC\u30B9\u30BF\u30B0\u306B\u57FA\u3065\u304F\u7279\u5B9A\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u30EA\u30EA\u30FC\u30B9\u3067\u3059\u3002',
        editAndRemove: "\u30D7\u30E9\u30B0\u30A4\u30F3\u6A2A\u306E\u300C\u7DE8\u96C6\u300D\u30DC\u30BF\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u3001\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u5909\u66F4\u3067\u304D\u307E\u3059\u3002\u30D7\u30E9\u30B0\u30A4\u30F3\u6A2A\u306E\u300CX\u300D\u30DC\u30BF\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u3001\u4E00\u89A7\u304B\u3089\u524A\u9664\u3067\u304D\u307E\u3059\u3002",
        noteLabel: "\u6CE8\u610F\uFF1A",
        noteText: "\u4E00\u89A7\u304B\u3089\u524A\u9664\u3057\u3066\u3082\u30D7\u30E9\u30B0\u30A4\u30F3\u672C\u4F53\u306F\u524A\u9664\u3055\u308C\u307E\u305B\u3093\u3002\u524A\u9664\u3059\u308B\u306B\u306F\u3001\u8A2D\u5B9A\u306E\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u30D7\u30E9\u30B0\u30A4\u30F3\u30BF\u30D6\u304B\u3089\u64CD\u4F5C\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
      },
      addBetaPlugin: "Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u8FFD\u52A0",
      trackedVersion: (version, frozen) => ` \u8FFD\u8DE1\u4E2D\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\uFF1A${version === "latest" ? "\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3" : version}${frozen ? "\uFF08\u56FA\u5B9A\uFF09" : ""}`,
      incompatible: "\uFF08\u4E92\u63DB\u6027\u306A\u3057\uFF09",
      secretMissing: (secretName) => ` \u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u304C\u672A\u5B9A\u7FA9\u307E\u305F\u306F\u7A7A\u3067\u3059\uFF1A${secretName}`,
      secretMissingTitle: "\u30C8\u30FC\u30AF\u30F3\u540D\u306F\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u3059\u304C\u3001\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u304C\u898B\u3064\u304B\u3089\u306A\u3044\u304B\u7A7A\u3067\u3059\u3002\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u8FFD\u52A0\u3059\u308B\u304B\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u8A2D\u5B9A\u3092\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      secretMissingTooltip: (secretName) => `\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\uFF1A${secretName}\u3002\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u8FFD\u52A0\u3059\u308B\u304B\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u8A2D\u5B9A\u3092\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
      checkAndUpdatePlugin: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u78BA\u8A8D\u3057\u3066\u66F4\u65B0",
      changeVersionAndUpdateSettings: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u5909\u66F4\u3057\u3066\u8A2D\u5B9A\u3092\u66F4\u65B0",
      removeThisBetaPlugin: "\u3053\u306E Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u524A\u9664",
      confirmRemoval: "\u3082\u3046\u4E00\u5EA6\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u524A\u9664\u3092\u78BA\u8A8D",
      copyPluginIdentifier: "\u30D7\u30E9\u30B0\u30A4\u30F3\u8B58\u5225\u5B50\u3092\u30B3\u30D4\u30FC"
    },
    betaThemeList: {
      heading: "Beta \u30C6\u30FC\u30DE\u4E00\u89A7",
      addBetaTheme: "Beta \u30C6\u30FC\u30DE\u3092\u8FFD\u52A0",
      filterPlaceholder: "\u30C6\u30FC\u30DE\u3092\u7D5E\u308A\u8FBC\u307F",
      deleteThisBetaTheme: "\u3053\u306E Beta \u30C6\u30FC\u30DE\u3092\u524A\u9664",
      confirmRemoval: "\u3082\u3046\u4E00\u5EA6\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u524A\u9664\u3092\u78BA\u8A8D",
      copyThemeIdentifier: "\u30C6\u30FC\u30DE\u8B58\u5225\u5B50\u3092\u30B3\u30D4\u30FC"
    },
    copyIdentifier: {
      copied: (identifier) => `\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF1A${identifier}`,
      failed: "\u8B58\u5225\u5B50\u306E\u30B3\u30D4\u30FC\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306E\u6A29\u9650\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    }
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u8FFD\u52A0",
      changeVersion: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u5909\u66F4",
      installing: "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u4E2D\u2026",
      neverMind: "\u30AD\u30E3\u30F3\u30BB\u30EB",
      valid: "\u6709\u52B9",
      invalid: "\u7121\u52B9"
    },
    heading: {
      changePluginVersion: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u5909\u66F4\uFF1A",
      githubRepositoryForBetaPlugin: "Beta \u30D7\u30E9\u30B0\u30A4\u30F3\u306E GitHub \u30EA\u30DD\u30B8\u30C8\u30EA\uFF1A"
    },
    repository: {
      label: "\u30EA\u30DD\u30B8\u30C8\u30EA",
      placeholder: "\u30EA\u30DD\u30B8\u30C8\u30EA\uFF08\u4F8B\uFF1Ahttps://GitHub.com/githubusername/repository-name\uFF09",
      enterAddressToValidate: "\u691C\u8A3C\u3059\u308B GitHub \u30EA\u30DD\u30B8\u30C8\u30EA\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      addressRequired: "\u30EA\u30DD\u30B8\u30C8\u30EA\u30A2\u30C9\u30EC\u30B9\u304C\u5FC5\u8981\u3067\u3059\u3002",
      validating: "\u30EA\u30DD\u30B8\u30C8\u30EA\u30A2\u30C9\u30EC\u30B9\u3092\u691C\u8A3C\u4E2D...",
      noReleasesFound: "\u30A8\u30E9\u30FC\uFF1A\u3053\u306E\u30EA\u30DD\u30B8\u30C8\u30EA\u306B\u30EA\u30EA\u30FC\u30B9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002",
      notFound: "\u30EA\u30DD\u30B8\u30C8\u30EA\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u30A2\u30C9\u30EC\u30B9\u3092\u78BA\u8A8D\u3059\u308B\u304B\u3001\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30EA\u30DD\u30B8\u30C8\u30EA\u306B\u30A2\u30AF\u30BB\u30B9\u3067\u304D\u308B\u6709\u52B9\u306A\u30C8\u30FC\u30AF\u30F3\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      accessDenied: "\u30A2\u30AF\u30BB\u30B9\u304C\u62D2\u5426\u3055\u308C\u307E\u3057\u305F\u3002\u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      error: (message) => `\u30A8\u30E9\u30FC\uFF1A${message}`,
      rateLimitExceeded: (minutes) => `GitHub API \u306E\u30EC\u30FC\u30C8\u5236\u9650\u3092\u8D85\u904E\u3057\u307E\u3057\u305F\u3002${minutes} \u5206\u5F8C\u306B\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002`,
      rateLimitToast: (message) => `${message} BRAT \u8A2D\u5B9A\u3067\u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u8FFD\u52A0\u3059\u308B\u3068\u3001\u3088\u308A\u9AD8\u3044\u5236\u9650\u3092\u5229\u7528\u3067\u304D\u307E\u3059\u3002\u8A73\u3057\u304F\u306F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u53C2\u7167\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
      gitHubResponseToast: (message) => `${message} `
    },
    version: {
      selectVersion: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u9078\u629E",
      selectVersionEllipsis: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u9078\u629E...",
      latestVersion: "\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3",
      prereleaseSuffix: "\uFF08\u30D7\u30EC\u30EA\u30EA\u30FC\u30B9\uFF09"
    },
    token: {
      name: "GitHub \u30C8\u30FC\u30AF\u30F3",
      desc: "\u3053\u306E\u30EA\u30DD\u30B8\u30C8\u30EA\u7528\u306E\u30C8\u30FC\u30AF\u30F3\u3068\u3057\u3066\u4F7F\u7528\u3059\u308B\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u9078\u629E\u3057\u307E\u3059\uFF08\u4EFB\u610F\uFF09",
      settingCleared: (repository) => `${repository} \u306E\u30C8\u30FC\u30AF\u30F3\u8A2D\u5B9A\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3057\u305F`,
      settingUpdated: (repository) => `${repository} \u306E\u30C8\u30FC\u30AF\u30F3\u8A2D\u5B9A\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F`
    },
    enableAfterInstall: "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u5F8C\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u6709\u52B9\u5316",
    alreadyInList: "\u3053\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u306F\u3059\u3067\u306B Beta \u30C6\u30B9\u30C8\u4E00\u89A7\u306B\u3042\u308A\u307E\u3059"
  },
  addBetaThemeModal: {
    heading: {
      githubRepositoryForBetaTheme: "Beta \u30C6\u30FC\u30DE\u306E GitHub \u30EA\u30DD\u30B8\u30C8\u30EA\uFF1A"
    },
    alreadyInList: "\u3053\u306E\u30C6\u30FC\u30DE\u306F\u3059\u3067\u306B Beta \u30C6\u30B9\u30C8\u4E00\u89A7\u306B\u3042\u308A\u307E\u3059"
  },
  themeMessages: {
    noThemeCssFile: "\u3053\u306E\u30EA\u30DD\u30B8\u30C8\u30EA\u306E\u30EB\u30FC\u30C8\u30D1\u30B9\u306B\u306F theme.css \u307E\u305F\u306F theme-beta.css \u304C\u306A\u3044\u305F\u3081\u3001\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3067\u304D\u308B\u30C6\u30FC\u30DE\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
    noManifestFile: "\u3053\u306E\u30EA\u30DD\u30B8\u30C8\u30EA\u306E\u30EB\u30FC\u30C8\u30D1\u30B9\u306B\u306F manifest.json \u304C\u306A\u3044\u305F\u3081\u3001\u30C6\u30FC\u30DE\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3067\u304D\u307E\u305B\u3093\u3002",
    installed: (themeName, repository) => `${repository} \u304B\u3089\u30C6\u30FC\u30DE ${themeName} \u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u307E\u3057\u305F\u3002`,
    updated: (themeName, repository) => `${repository} \u304B\u3089\u30C6\u30FC\u30DE ${themeName} \u3092\u66F4\u65B0\u3057\u307E\u3057\u305F\u3002`,
    removed: (repository) => `${repository} \u3092 BRAT \u306E\u30C6\u30FC\u30DE\u4E00\u89A7\u304B\u3089\u524A\u9664\u3057\u305F\u305F\u3081\u3001\u4ECA\u5F8C\u306F\u66F4\u65B0\u3055\u308C\u307E\u305B\u3093\u3002\u305F\u3060\u3057\u3001\u30C6\u30FC\u30DE\u30D5\u30A1\u30A4\u30EB\u81EA\u4F53\u306F Vault \u306B\u6B8B\u308A\u307E\u3059\u3002\u524A\u9664\u3059\u308B\u306B\u306F\u3001\u8A2D\u5B9A > \u5916\u89B3 \u304B\u3089\u30C6\u30FC\u30DE\u3092\u524A\u9664\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
  },
  versionSuggestModal: {
    title: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u9078\u629E",
    placeholder: (repository) => `${repository} \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u691C\u7D22`,
    versionLabel: (version) => version === "latest" ? "\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3" : version,
    instructions: {
      navigateVersions: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u79FB\u52D5",
      selectVersion: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u9078\u629E",
      dismissModal: "\u30E2\u30FC\u30C0\u30EB\u3092\u9589\u3058\u308B"
    },
    prereleaseSuffix: "\uFF08\u30D7\u30EC\u30EA\u30EA\u30FC\u30B9\uFF09"
  }
};

// src/i18n/locales/zh-cn.ts
var zhCn = {
  common: {
    and: " \u548C ",
    promotional: {
      learnMore: "\u4E86\u89E3\u4F5C\u8005\u7684\u66F4\u591A\u4F5C\u54C1\uFF1A"
    }
  },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "\u5B89\u88C5\u540E\u81EA\u52A8\u542F\u7528 Beta \u63D2\u4EF6",
        desc: "\u5F00\u542F\u540E\uFF0C\u65B0\u5B89\u88C5\u7684 Beta \u63D2\u4EF6\u4F1A\u9ED8\u8BA4\u81EA\u52A8\u542F\u7528\u3002\u4F60\u4ECD\u7136\u53EF\u4EE5\u5728\u201C\u6DFB\u52A0\u63D2\u4EF6\u201D\u8868\u5355\u4E2D\u4E3A\u5355\u4E2A\u63D2\u4EF6\u5355\u72EC\u8C03\u6574\u3002"
      },
      autoUpdatePluginsAtStartup: {
        name: "\u542F\u52A8\u65F6\u81EA\u52A8\u66F4\u65B0 Beta \u63D2\u4EF6",
        desc: "\u5F00\u542F\u540E\uFF0C\u6BCF\u6B21 Obsidian \u542F\u52A8\u65F6\u90FD\u4F1A\u68C0\u67E5\u5E76\u5B89\u88C5 Beta \u63D2\u4EF6\u66F4\u65B0\u3002\u56FA\u5B9A\u7248\u672C\u4E0D\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002"
      },
      autoUpdateThemesAtStartup: {
        name: "\u542F\u52A8\u65F6\u81EA\u52A8\u66F4\u65B0 Beta \u4E3B\u9898",
        desc: "\u5F00\u542F\u540E\uFF0C\u6BCF\u6B21 Obsidian \u542F\u52A8\u65F6\u90FD\u4F1A\u68C0\u67E5\u5E76\u5B89\u88C5 Beta \u4E3B\u9898\u66F4\u65B0\u3002"
      },
      selectLatestPluginVersionByDefault: {
        name: "\u9ED8\u8BA4\u9009\u62E9\u63D2\u4EF6\u6700\u65B0\u7248\u672C",
        desc: "\u5F00\u542F\u540E\uFF0C\u6DFB\u52A0\u65B0\u63D2\u4EF6\u65F6\u4F1A\u9ED8\u8BA4\u9009\u62E9\u6700\u65B0\u7248\u672C\u3002"
      },
      allowIncompatiblePlugins: {
        name: "\u5141\u8BB8\u5B89\u88C5\u4E0D\u517C\u5BB9\u63D2\u4EF6",
        desc: "\u5F00\u542F\u540E\uFF0C\u53EF\u4EE5\u5B89\u88C5\u8981\u6C42\u66F4\u9AD8 Obsidian \u7248\u672C\u7684\u63D2\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u5728\u79FB\u52A8\u7AEF\u5B89\u88C5\u4EC5\u652F\u6301\u684C\u9762\u7AEF\u7684\u63D2\u4EF6\u3002"
      }
    },
    monitoring: {
      heading: "\u901A\u77E5\u4E0E\u65E5\u5FD7",
      enableNotifications: {
        name: "\u542F\u7528\u901A\u77E5",
        desc: "\u5F00\u542F\u540E\uFF0CBRAT \u4F1A\u7528\u5F39\u7A97\u63D0\u793A\u5B89\u88C5\u3001\u66F4\u65B0\u7B49\u64CD\u4F5C\u72B6\u6001\u3002\u5173\u95ED\u540E\u4E0D\u518D\u663E\u793A\u8FD9\u4E9B\u901A\u77E5\u3002"
      },
      enableLogging: {
        name: "\u542F\u7528\u65E5\u5FD7",
        desc: "\u5F00\u542F\u540E\uFF0C\u63D2\u4EF6\u66F4\u65B0\u8BB0\u5F55\u4F1A\u5199\u5165\u65E5\u5FD7\u6587\u4EF6\u3002"
      },
      bratLogFileLocation: {
        name: "BRAT \u65E5\u5FD7\u6587\u4EF6",
        desc: "\u65E5\u5FD7\u4F1A\u4FDD\u5B58\u5230\u8FD9\u4E2A\u6587\u4EF6\u3002\u586B\u5199\u6587\u4EF6\u540D\u6216\u5E93\u5185\u8DEF\u5F84\u65F6\u4E0D\u8981\u52A0 .md\u3002",
        placeholder: "\u793A\u4F8B\uFF1ABRAT-log"
      },
      enableVerboseLogging: {
        name: "\u542F\u7528\u8BE6\u7EC6\u65E5\u5FD7",
        desc: "\u5F00\u542F\u540E\uFF0C\u65E5\u5FD7\u4F1A\u8BB0\u5F55\u66F4\u591A\u6392\u67E5\u4FE1\u606F\u3002"
      },
      debuggingMode: {
        name: "\u8C03\u8BD5\u6A21\u5F0F",
        desc: "\u5F00\u542F\u540E\uFF0C\u63A7\u5236\u53F0\u4F1A\u8F93\u51FA\u5927\u91CF\u8C03\u8BD5\u4FE1\u606F\uFF0C\u4E3B\u8981\u7528\u4E8E\u6392\u67E5\u95EE\u9898\u548C\u5F00\u53D1\u3002"
      }
    },
    githubPersonalAccessToken: {
      heading: "GitHub \u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C",
      personalAccessToken: {
        name: "\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C",
        desc: {
          prependText: "\u8BBE\u7F6E\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C\u53EF\u4EE5\u63D0\u9AD8\u8BBF\u95EE GitHub \u516C\u5171\u4ED3\u5E93\u65F6\u7684\u8BF7\u6C42\u989D\u5EA6\u3002\u4F60\u53EF\u4EE5\u5728 ",
          linkText: "GitHub \u4EE4\u724C\u8BBE\u7F6E",
          appendText: " \u4E2D\u521B\u5EFA\u4EE4\u724C\uFF0C\u7136\u540E\u5728\u8FD9\u91CC\u9009\u62E9\u4FDD\u5B58\u8BE5\u4EE4\u724C\u7684\u5BC6\u94A5\u3002\u66F4\u591A\u4FE1\u606F\u8BF7\u53C2\u8003\u6587\u6863\u3002"
        }
      },
      clearPersonalAccessToken: "\u6E05\u9664\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C\u8BBE\u7F6E",
      validate: "\u9A8C\u8BC1"
    },
    betaPluginList: {
      heading: "Beta \u63D2\u4EF6\u5217\u8868",
      filterPlaceholder: "\u7B5B\u9009\u63D2\u4EF6",
      description: {
        intro: "\u4E0B\u65B9\u5217\u51FA\u5DF2\u901A\u8FC7 BRAT \u6DFB\u52A0\u7684 Beta \u63D2\u4EF6\u3002\u4F60\u53EF\u4EE5\u8BA9\u63D2\u4EF6\u8DDF\u968F\u6700\u65B0\u7248\u672C\uFF0C\u4E5F\u53EF\u4EE5\u56FA\u5B9A\u5230\u67D0\u4E2A\u53D1\u5E03\u7248\u672C\u3002\u56FA\u5B9A\u7248\u672C\u6307\u57FA\u4E8E release \u6807\u7B7E\u6307\u5B9A\u7684\u67D0\u4E2A\u63D2\u4EF6\u7248\u672C\u3002",
        editAndRemove: "\u70B9\u51FB\u63D2\u4EF6\u65C1\u7684\u7F16\u8F91\u6309\u94AE\u53EF\u4EE5\u66F4\u6539\u5B89\u88C5\u7248\u672C\uFF1B\u70B9\u51FB X \u6309\u94AE\u4F1A\u5C06\u5B83\u4ECE\u5217\u8868\u4E2D\u79FB\u9664\u3002",
        noteLabel: "\u6CE8\u610F\uFF1A",
        noteText: "\u4ECE\u5217\u8868\u4E2D\u79FB\u9664\u4E0D\u4F1A\u5220\u9664\u63D2\u4EF6\u672C\u4F53\u3002\u5982\u9700\u5220\u9664\u63D2\u4EF6\uFF0C\u8BF7\u5230\u8BBE\u7F6E\u4E2D\u7684\u201C\u7B2C\u4E09\u65B9\u63D2\u4EF6\u201D\u9875\u9762\u64CD\u4F5C\u3002"
      },
      addBetaPlugin: "\u6DFB\u52A0 Beta \u63D2\u4EF6",
      trackedVersion: (version, frozen) => `\u8DDF\u8E2A\u7248\u672C\uFF1A${version === "latest" ? "\u6700\u65B0\u7248\u672C" : version}${frozen ? "\uFF08\u56FA\u5B9A\uFF09" : ""}`,
      incompatible: "\uFF08\u4E0D\u517C\u5BB9\uFF09",
      secretMissing: (secretName) => `\u5BC6\u94A5\u672A\u5B9A\u4E49\u6216\u4E3A\u7A7A\uFF1A${secretName}`,
      secretMissingTitle: "\u5DF2\u914D\u7F6E\u5BC6\u94A5\u540D\u79F0\uFF0C\u4F46\u5BC6\u94A5\u4E0D\u5B58\u5728\u6216\u4E3A\u7A7A\u3002\u8BF7\u6DFB\u52A0\u5BC6\u94A5\uFF0C\u6216\u66F4\u65B0\u8BE5\u63D2\u4EF6\u914D\u7F6E\u3002",
      secretMissingTooltip: (secretName) => `\u5BC6\u94A5\u7F3A\u5931\uFF1A${secretName}\u3002\u8BF7\u6DFB\u52A0\u5BC6\u94A5\uFF0C\u6216\u66F4\u65B0\u8BE5\u63D2\u4EF6\u914D\u7F6E\u3002`,
      checkAndUpdatePlugin: "\u68C0\u67E5\u5E76\u66F4\u65B0\u63D2\u4EF6",
      changeVersionAndUpdateSettings: "\u66F4\u6539\u7248\u672C\u548C\u8BBE\u7F6E",
      removeThisBetaPlugin: "\u79FB\u9664\u6B64 Beta \u63D2\u4EF6",
      confirmRemoval: "\u518D\u6B21\u70B9\u51FB\u786E\u8BA4\u79FB\u9664",
      copyPluginIdentifier: "\u590D\u5236\u63D2\u4EF6\u6807\u8BC6\u7B26"
    },
    betaThemeList: {
      heading: "Beta \u4E3B\u9898\u5217\u8868",
      addBetaTheme: "\u6DFB\u52A0 Beta \u4E3B\u9898",
      filterPlaceholder: "\u7B5B\u9009\u4E3B\u9898",
      deleteThisBetaTheme: "\u5220\u9664\u6B64 Beta \u4E3B\u9898",
      confirmRemoval: "\u518D\u6B21\u70B9\u51FB\u786E\u8BA4\u79FB\u9664",
      copyThemeIdentifier: "\u590D\u5236\u4E3B\u9898\u6807\u8BC6\u7B26"
    },
    copyIdentifier: {
      copied: (identifier) => `\u5DF2\u590D\u5236\uFF1A${identifier}`,
      failed: "\u590D\u5236\u6807\u8BC6\u7B26\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650\u3002"
    }
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "\u6DFB\u52A0\u63D2\u4EF6",
      changeVersion: "\u66F4\u6539\u7248\u672C",
      installing: "\u6B63\u5728\u5B89\u88C5\u2026",
      neverMind: "\u53D6\u6D88",
      valid: "\u6709\u6548",
      invalid: "\u65E0\u6548"
    },
    heading: {
      changePluginVersion: "\u66F4\u6539\u63D2\u4EF6\u7248\u672C\uFF1A",
      githubRepositoryForBetaPlugin: "Beta \u63D2\u4EF6\u7684 GitHub \u4ED3\u5E93\uFF1A"
    },
    repository: {
      label: "\u4ED3\u5E93",
      placeholder: "\u4ED3\u5E93\uFF08\u793A\u4F8B\uFF1Ahttps://GitHub.com/githubusername/repository-name\uFF09",
      enterAddressToValidate: "\u8F93\u5165 GitHub \u4ED3\u5E93\u5730\u5740\u540E\u4F1A\u81EA\u52A8\u9A8C\u8BC1\u3002",
      addressRequired: "\u9700\u8981\u586B\u5199\u4ED3\u5E93\u5730\u5740\u3002",
      validating: "\u6B63\u5728\u9A8C\u8BC1\u4ED3\u5E93\u5730\u5740...",
      noReleasesFound: "\u9519\u8BEF\uFF1A\u6B64\u4ED3\u5E93\u4E2D\u6CA1\u6709\u627E\u5230\u53D1\u5E03\u7248\u672C\u3002",
      notFound: "\u627E\u4E0D\u5230\u4ED3\u5E93\u3002\u8BF7\u68C0\u67E5\u5730\u5740\uFF0C\u6216\u63D0\u4F9B\u53EF\u8BBF\u95EE\u79C1\u6709\u4ED3\u5E93\u7684\u6709\u6548\u4EE4\u724C\u3002",
      accessDenied: "\u8BBF\u95EE\u88AB\u62D2\u7EDD\u3002\u8BF7\u68C0\u67E5\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C\u3002",
      error: (message) => `\u9519\u8BEF\uFF1A${message}`,
      rateLimitExceeded: (minutes) => `GitHub API \u8BF7\u6C42\u989D\u5EA6\u5DF2\u7528\u5C3D\u3002\u8BF7\u5728 ${minutes} \u5206\u949F\u540E\u91CD\u8BD5\u3002`,
      rateLimitToast: () => "GitHub API \u8BF7\u6C42\u989D\u5EA6\u5DF2\u7528\u5C3D\u3002\u53EF\u4EE5\u5728 BRAT \u8BBE\u7F6E\u4E2D\u6DFB\u52A0\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C\u4EE5\u63D0\u9AD8\u989D\u5EA6\u3002\u8BE6\u60C5\u8BF7\u67E5\u770B\u6587\u6863\u3002",
      gitHubResponseToast: (message) => `${message} `
    },
    version: {
      selectVersion: "\u9009\u62E9\u7248\u672C",
      selectVersionEllipsis: "\u9009\u62E9\u7248\u672C...",
      latestVersion: "\u6700\u65B0\u7248\u672C",
      prereleaseSuffix: "\uFF08\u9884\u53D1\u5E03\uFF09"
    },
    token: {
      name: "GitHub \u4EE4\u724C",
      desc: "\u9009\u62E9\u4E00\u4E2A\u5BC6\u94A5\uFF0C\u4F5C\u4E3A\u8BBF\u95EE\u6B64\u4ED3\u5E93\u7684\u4EE4\u724C\uFF08\u53EF\u9009\uFF09",
      settingCleared: (repository) => `\u5DF2\u6E05\u9664 ${repository} \u7684\u4EE4\u724C\u8BBE\u7F6E`,
      settingUpdated: (repository) => `\u5DF2\u66F4\u65B0 ${repository} \u7684\u4EE4\u724C\u8BBE\u7F6E`
    },
    enableAfterInstall: "\u5B89\u88C5\u540E\u542F\u7528\u6B64\u63D2\u4EF6",
    alreadyInList: "\u8FD9\u4E2A\u63D2\u4EF6\u5DF2\u7ECF\u5728 Beta \u6D4B\u8BD5\u5217\u8868\u4E2D"
  },
  addBetaThemeModal: {
    heading: {
      githubRepositoryForBetaTheme: "Beta \u4E3B\u9898\u7684 GitHub \u4ED3\u5E93\uFF1A"
    },
    alreadyInList: "\u8FD9\u4E2A\u4E3B\u9898\u5DF2\u7ECF\u5728 Beta \u6D4B\u8BD5\u5217\u8868\u4E2D"
  },
  themeMessages: {
    noThemeCssFile: "\u8FD9\u4E2A\u4ED3\u5E93\u7684\u6839\u76EE\u5F55\u91CC\u6CA1\u6709 theme.css \u6216 theme-beta.css \u6587\u4EF6\uFF0C\u56E0\u6B64\u6CA1\u6709\u53EF\u5B89\u88C5\u7684\u4E3B\u9898\u3002",
    noManifestFile: "\u8FD9\u4E2A\u4ED3\u5E93\u7684\u6839\u76EE\u5F55\u91CC\u6CA1\u6709 manifest.json \u6587\u4EF6\uFF0C\u56E0\u6B64\u65E0\u6CD5\u5B89\u88C5\u8BE5\u4E3B\u9898\u3002",
    installed: (themeName, repository) => `\u5DF2\u4ECE ${repository} \u5B89\u88C5\u4E3B\u9898 ${themeName}\u3002`,
    updated: (themeName, repository) => `\u5DF2\u4ECE ${repository} \u66F4\u65B0\u4E3B\u9898 ${themeName}\u3002`,
    removed: (repository) => `\u5DF2\u5C06 ${repository} \u4ECE BRAT \u4E3B\u9898\u5217\u8868\u4E2D\u79FB\u9664\uFF0C\u4E4B\u540E\u4E0D\u4F1A\u518D\u68C0\u67E5\u66F4\u65B0\u3002\u4E0D\u8FC7\u4E3B\u9898\u6587\u4EF6\u4ECD\u7136\u4FDD\u7559\u5728\u5E93\u4E2D\u3002\u5982\u9700\u5220\u9664\uFF0C\u8BF7\u524D\u5F80\u201C\u8BBE\u7F6E > \u5916\u89C2\u201D\u4E2D\u79FB\u9664\u8BE5\u4E3B\u9898\u3002`
  },
  versionSuggestModal: {
    title: "\u9009\u62E9\u7248\u672C",
    placeholder: (repository) => `\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u641C\u7D22 ${repository} \u7684\u7248\u672C`,
    versionLabel: (version) => version === "latest" ? "\u6700\u65B0\u7248\u672C" : version,
    instructions: {
      navigateVersions: "\u6D4F\u89C8\u7248\u672C",
      selectVersion: "\u9009\u62E9\u7248\u672C",
      dismissModal: "\u5173\u95ED\u5F39\u7A97"
    },
    prereleaseSuffix: "\uFF08\u9884\u53D1\u5E03\uFF09"
  }
};

// src/i18n/index.ts
var locales = {
  de,
  en,
  ja,
  "zh-cn": zhCn
};
var localeAliases = {
  "en-gb": "en",
  "en-us": "en",
  zh: "zh-cn",
  "zh-hans": "zh-cn",
  "zh-sg": "zh-cn"
};
function normalizeLanguage(language) {
  return language.toLowerCase().replace(/_/g, "-");
}
function resolveLocale(language) {
  const normalizedLanguage = normalizeLanguage(language);
  if (locales[normalizedLanguage]) {
    return normalizedLanguage;
  }
  const alias = localeAliases[normalizedLanguage];
  if (alias) {
    return alias;
  }
  const baseLanguage = normalizedLanguage.split("-")[0];
  return locales[baseLanguage] ? baseLanguage : normalizedLanguage;
}
function getTranslations(language = (0, import_obsidian3.getLanguage)()) {
  var _a;
  return (_a = locales[resolveLocale(language)]) != null ? _a : en;
}

// src/utils/notifications.ts
var import_obsidian4 = require("obsidian");
function toastMessage(plugin, msg, timeoutInSeconds = 10, contextMenuCallback) {
  if (!plugin.settings.notificationsEnabled) return;
  const additionalInfo = contextMenuCallback ? import_obsidian4.Platform.isDesktop ? "(click=dismiss, right-click=Info)" : "(click=dismiss)" : "";
  const newNotice = new import_obsidian4.Notice(
    `BRAT
${msg}
${additionalInfo}`,
    timeoutInSeconds * 1e3
  );
  if (contextMenuCallback)
    newNotice.messageEl.oncontextmenu = () => {
      contextMenuCallback();
    };
}

// src/ui/Promotional.ts
var promotionalLinks = (containerEl, settingsTab = true) => {
  const text = getTranslations().common.promotional;
  const linksDiv = containerEl.createEl("div", { cls: "brat-promotional-links" });
  if (!settingsTab) {
    linksDiv.addClass("brat-promotional-links-modal");
  } else {
    linksDiv.addClass("brat-promotional-links-settings");
  }
  const twitterSpan = linksDiv.createDiv("coffee");
  twitterSpan.addClass("ex-twitter-span");
  twitterSpan.addClass("brat-promotional-links-coffee");
  const captionText = twitterSpan.createDiv();
  captionText.innerText = text.learnMore;
  twitterSpan.appendChild(captionText);
  const twitterLink = twitterSpan.createEl("a", {
    href: "https://tfthacker.com"
  });
  twitterLink.innerText = "https://tfthacker.com";
  return linksDiv;
};

// src/ui/VersionSuggestModal.ts
var import_obsidian5 = require("obsidian");
var VersionSuggestModal = class extends import_obsidian5.SuggestModal {
  constructor(app, repository, versions, selected, onChoose) {
    super(app);
    const text = getTranslations().versionSuggestModal;
    this.versions = versions;
    this.selected = selected;
    this.onChoose = onChoose;
    this.setTitle(text.title);
    this.setPlaceholder(text.placeholder(repository));
    this.setInstructions([
      { command: "\u2191\u2193", purpose: text.instructions.navigateVersions },
      { command: "\u21B5", purpose: text.instructions.selectVersion },
      { command: "esc", purpose: text.instructions.dismissModal }
    ]);
  }
  getSuggestions(query) {
    const lowerQuery = query.toLowerCase();
    return this.versions.filter((version) => version.version.toLowerCase().contains(lowerQuery));
  }
  renderSuggestion(version, el) {
    const text = getTranslations().versionSuggestModal;
    el.createEl("div", {
      text: `${text.versionLabel(version.version)} ${version.prerelease ? text.prereleaseSuffix : ""}`
    });
  }
  onChooseSuggestion(version) {
    this.onChoose(version.version);
  }
  onNoSuggestion() {
    this.onChoose(this.selected ? this.selected : "");
    this.close();
  }
};

// src/ui/AddNewPluginModal.ts
var AddNewPluginModal = class extends import_obsidian6.Modal {
  constructor(plugin, betaPlugins, openSettingsTabAfterwards = false, updateVersion = false, prefillRepo = "", prefillVersion = "", prefillSecretName = "", onSubmitted) {
    super(plugin.app);
    this.versionSetting = null;
    // Repository Setting
    this.repositoryAddressEl = null;
    this.tokenInputEl = null;
    this.validateButton = null;
    this.validator = null;
    this.addPluginButton = null;
    this.cancelButton = null;
    this.plugin = plugin;
    this.betaPlugins = betaPlugins;
    this.address = prefillRepo;
    this.version = prefillVersion;
    this.secretName = prefillSecretName;
    this.openSettingsTabAfterwards = openSettingsTabAfterwards;
    this.updateVersion = updateVersion;
    this.enableAfterInstall = plugin.settings.enableAfterInstall;
    this.onSubmitted = onSubmitted;
  }
  async submitForm() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const text = getTranslations().addBetaPluginModal;
    if (this.address === "") return;
    const scrubbedAddress = scrubRepositoryUrl(this.address);
    const existingFrozenPlugin = this.plugin.settings.pluginSubListFrozenVersion.find((p) => p.repo === scrubbedAddress);
    if (existingFrozenPlugin) {
      const result2 = await this.betaPlugins.addPlugin(
        scrubbedAddress,
        false,
        false,
        false,
        this.version,
        true,
        // Force reinstall
        this.enableAfterInstall,
        this.secretName
      );
      if (result2) {
        (_a = this.onSubmitted) == null ? void 0 : _a.call(this);
        this.close();
      }
      (_b = this.cancelButton) == null ? void 0 : _b.setDisabled(false);
      (_c = this.addPluginButton) == null ? void 0 : _c.setDisabled(false);
      (_d = this.addPluginButton) == null ? void 0 : _d.setButtonText(text.buttons.addPlugin);
      (_e = this.versionSetting) == null ? void 0 : _e.setDisabled(false);
      return;
    }
    if (!this.version && existBetaPluginInList(this.plugin, scrubbedAddress)) {
      toastMessage(this.plugin, text.alreadyInList, 10);
      return;
    }
    const result = await this.betaPlugins.addPlugin(
      scrubbedAddress,
      false,
      false,
      false,
      this.version,
      false,
      this.enableAfterInstall,
      this.secretName
    );
    if (result) {
      (_f = this.onSubmitted) == null ? void 0 : _f.call(this);
      this.close();
    }
    (_g = this.cancelButton) == null ? void 0 : _g.setDisabled(false);
    (_h = this.addPluginButton) == null ? void 0 : _h.setDisabled(false);
    (_i = this.addPluginButton) == null ? void 0 : _i.setButtonText(text.buttons.addPlugin);
    (_j = this.versionSetting) == null ? void 0 : _j.setDisabled(false);
  }
  updateVersionDropdown(settingEl, versions, selected = "") {
    const text = getTranslations().addBetaPluginModal;
    let selectedVersion;
    settingEl.clear();
    if (versions.length > 0 && !selected && this.plugin.settings.selectLatestPluginVersionByDefault) {
      selectedVersion = "latest";
      this.version = "latest";
    } else {
      selectedVersion = selected;
    }
    const VERSION_THRESHOLD = 20;
    if (versions.length < VERSION_THRESHOLD || import_obsidian6.Platform.isMobile) {
      settingEl.addDropdown((dropdown) => {
        dropdown.addOption("", text.version.selectVersion);
        dropdown.addOption("latest", text.version.latestVersion);
        for (const version of versions) {
          dropdown.addOption(version.version, `${version.version} ${version.prerelease ? text.version.prereleaseSuffix : ""}`);
        }
        dropdown.onChange((value) => {
          var _a;
          this.version = value;
          (_a = this.addPluginButton) == null ? void 0 : _a.setDisabled(this.version === "");
        });
        dropdown.setValue(selectedVersion);
        dropdown.selectEl.addClass("brat-version-selector");
      });
    } else {
      settingEl.addButton((button) => {
        button.setButtonText(selectedVersion === "latest" ? text.version.latestVersion : selectedVersion || text.version.selectVersionEllipsis).setClass("brat-version-selector").setClass("button").onClick(() => {
          const latest = {
            version: "latest",
            prerelease: false
          };
          const suggestedVersions = [latest, ...versions];
          const modal = new VersionSuggestModal(this.app, this.address, suggestedVersions, selectedVersion, (version) => {
            var _a;
            this.version = version;
            button.setButtonText(version === "latest" ? text.version.latestVersion : version || text.version.selectVersionEllipsis);
            (_a = this.addPluginButton) == null ? void 0 : _a.setDisabled(this.version === "");
          });
          modal.open();
        });
      });
    }
  }
  onOpen() {
    const text = getTranslations().addBetaPluginModal;
    const heading = this.contentEl.createEl("h4");
    if (this.address) {
      heading.appendText(text.heading.changePluginVersion);
      heading.appendChild(createGitHubResourceLink(this.address));
    } else {
      heading.setText(text.heading.githubRepositoryForBetaPlugin);
    }
    this.contentEl.createEl("form", {}, (formEl) => {
      var _a;
      const commonText = getTranslations().common;
      formEl.addClass("brat-modal");
      if (!this.address || !this.updateVersion) {
        const repoSetting = new import_obsidian6.Setting(formEl).setClass("repository-setting");
        repoSetting.then((setting) => {
          setting.addText((addressEl) => {
            this.repositoryAddressEl = addressEl;
            addressEl.setPlaceholder(text.repository.placeholder);
            addressEl.setValue(this.address);
            addressEl.onChange((value) => {
              var _a2, _b;
              this.address = scrubRepositoryUrl(value.trim());
              if (this.version !== "" && (!this.address || !this.isGitHubRepositoryMatch(this.address))) {
                if (this.versionSetting) {
                  this.updateVersionDropdown(this.versionSetting, []);
                  this.versionSetting.settingEl.classList.add("disabled-setting");
                  this.versionSetting.setDisabled(true);
                  addressEl.inputEl.classList.remove("valid-repository");
                  addressEl.inputEl.classList.remove("invalid-repository");
                }
              }
              if (!this.version) {
                if (this.isGitHubRepositoryMatch(this.address)) (_a2 = this.addPluginButton) == null ? void 0 : _a2.setDisabled(false);
                else (_b = this.addPluginButton) == null ? void 0 : _b.setDisabled(true);
              }
            });
            addressEl.inputEl.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                void (async () => {
                  var _a2, _b, _c;
                  if (this.address && (this.updateVersion && this.version !== "" || !this.updateVersion)) {
                    e.preventDefault();
                    (_a2 = this.addPluginButton) == null ? void 0 : _a2.setDisabled(true);
                    (_b = this.cancelButton) == null ? void 0 : _b.setDisabled(true);
                    (_c = this.versionSetting) == null ? void 0 : _c.setDisabled(true);
                    void this.submitForm();
                  }
                  await this.updateRepositoryVersionInfo(this.version, validationStatusEl);
                })();
              }
            });
            addressEl.inputEl.addEventListener("blur", () => {
              void this.updateRepositoryVersionInfo(this.version, validationStatusEl);
            });
            setting.setDesc(text.repository.label);
            addressEl.inputEl.addClass("brat-full-width-input");
          });
        });
      }
      const validationStatusEl = formEl.createDiv("validation-status");
      if (!this.address) validationStatusEl.setText(text.repository.enterAddressToValidate);
      this.versionSetting = new import_obsidian6.Setting(formEl).setClass("version-setting").setClass("disabled-setting");
      this.updateVersionDropdown(this.versionSetting, [], this.version);
      this.versionSetting.setDisabled(true);
      const tokenElement = formEl.createDiv("token-setting");
      new import_obsidian6.Setting(tokenElement).setName(text.token.name).setDesc(text.token.desc).addComponent(
        (el) => new import_obsidian6.SecretComponent(this.plugin.app, el).setValue(this.secretName).onChange((selectedSecretName) => {
          void (async () => {
            var _a2, _b, _c, _d, _e;
            this.secretName = (selectedSecretName == null ? void 0 : selectedSecretName.trim()) || "";
            if (!this.secretName) {
              if (this.address && existBetaPluginInList(this.plugin, this.address)) {
                updatePluginTokenName(this.plugin, this.address, "");
                toastMessage(this.plugin, text.token.settingCleared(this.address), 3);
              }
              void this.updateRepositoryVersionInfo(this.version, validationStatusEl);
              return;
            }
            const tokenValue = this.secretName ? this.plugin.app.secretStorage.getSecret(this.secretName) : null;
            if (tokenValue) {
              this.validToken = await ((_a2 = this.validator) == null ? void 0 : _a2.validateToken(tokenValue, this.address));
              if (!this.validToken) {
                (_b = this.validateButton) == null ? void 0 : _b.setButtonText(text.buttons.invalid);
                (_c = this.validateButton) == null ? void 0 : _c.setDisabled(false);
              } else {
                (_d = this.validateButton) == null ? void 0 : _d.setButtonText(text.buttons.valid);
                (_e = this.validateButton) == null ? void 0 : _e.setDisabled(true);
                if (this.address) {
                  await this.updateRepositoryVersionInfo(this.version, validationStatusEl);
                  if (existBetaPluginInList(this.plugin, this.address)) {
                    updatePluginTokenName(this.plugin, this.address, this.secretName);
                    toastMessage(this.plugin, text.token.settingUpdated(this.address), 3);
                  }
                }
              }
            }
          })();
        })
      );
      this.validator = new TokenValidator();
      if (this.secretName) {
        const tokenValue = this.plugin.app.secretStorage.getSecret(this.secretName);
        if (tokenValue) {
          void ((_a = this.validator) == null ? void 0 : _a.validateToken(tokenValue, this.address).then((isValid) => {
            var _a2, _b;
            this.validToken = isValid;
            if (this.validToken) {
              (_a2 = this.validateButton) == null ? void 0 : _a2.setButtonText(text.buttons.valid);
              (_b = this.validateButton) == null ? void 0 : _b.setDisabled(true);
            }
          }));
        }
      }
      formEl.createDiv("modal-button-container", (buttonContainerEl) => {
        var _a2;
        buttonContainerEl.createEl(
          "label",
          {
            cls: "mod-checkbox"
          },
          (labelEl) => {
            const checkboxEl = labelEl.createEl("input", {
              attr: { tabindex: -1 },
              type: "checkbox"
            });
            checkboxEl.checked = this.enableAfterInstall;
            checkboxEl.addEventListener("click", () => {
              this.enableAfterInstall = checkboxEl.checked;
            });
            labelEl.appendText(text.enableAfterInstall);
          }
        );
        this.cancelButton = new import_obsidian6.ButtonComponent(buttonContainerEl).setButtonText(text.buttons.neverMind).setClass("mod-cancel").onClick(() => {
          this.close();
        });
        this.addPluginButton = new import_obsidian6.ButtonComponent(buttonContainerEl).setButtonText(this.updateVersion ? this.address ? text.buttons.changeVersion : text.buttons.addPlugin : text.buttons.addPlugin).setCta().onClick(() => {
          var _a3, _b, _c, _d;
          if (this.address !== "") {
            if (this.updateVersion && this.version !== "" || !this.updateVersion) {
              (_a3 = this.addPluginButton) == null ? void 0 : _a3.setDisabled(true);
              (_b = this.addPluginButton) == null ? void 0 : _b.setButtonText(text.buttons.installing);
              (_c = this.cancelButton) == null ? void 0 : _c.setDisabled(true);
              (_d = this.versionSetting) == null ? void 0 : _d.setDisabled(true);
              void this.submitForm();
            }
          }
        });
        if (this.updateVersion || this.address === "") (_a2 = this.addPluginButton) == null ? void 0 : _a2.setDisabled(true);
      });
      const newDiv = formEl.createDiv();
      newDiv.addClass("brat-modal-divider");
      const authorByline = newDiv.createSpan();
      authorByline.createEl("a", {
        href: "https://bit.ly/o42-twitter",
        text: "TFTHacker"
      });
      authorByline.appendText(commonText.and);
      authorByline.createEl("a", {
        href: "https://github.com/johannrichard",
        text: "johannrichard"
      });
      authorByline.addClass("brat-credits");
      newDiv.appendChild(authorByline);
      promotionalLinks(newDiv, false);
      const buttons = formEl.querySelectorAll("button");
      for (const button of Array.from(buttons)) {
        button.setAttribute("type", "button");
      }
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    if (this.address) {
      window.setTimeout(() => {
        void this.updateRepositoryVersionInfo(this.version);
      }, 100);
    }
  }
  /**
   * Update the repository validation and version dropdown
   * @param selectedVersion - The version to select in the dropdown
   * @param validateInputEl - The address input element
   * @param validationStatusEl - The error element (used for errors, incl. GitHub Rate limit)
   * @returns {Promise<void>}
   */
  async updateRepositoryVersionInfo(selectedVersion = "", validationStatusEl) {
    var _a, _b, _c, _d, _e, _f;
    const text = getTranslations().addBetaPluginModal;
    const validateInputEl = this.repositoryAddressEl;
    if (this.plugin.settings.debuggingMode) {
      console.debug(`[BRAT] Updating version dropdown for ${this.address} with selected version ${selectedVersion}`);
    }
    if (!this.address) {
      validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.addressRequired);
      validationStatusEl == null ? void 0 : validationStatusEl.addClass("validation-status-error");
      return;
    }
    validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.validating);
    validationStatusEl == null ? void 0 : validationStatusEl.removeClass("validation-status-error");
    if (this.versionSetting && this.updateVersion) {
      this.updateVersionDropdown(this.versionSetting, []);
    }
    const scrubbedAddress = scrubRepositoryUrl(this.address);
    try {
      let tokenToUse = "";
      if (this.secretName) {
        const tokenValue = this.plugin.app.secretStorage.getSecret(this.secretName);
        if (tokenValue) {
          tokenToUse = tokenValue;
        }
      } else if (this.plugin.settings.globalTokenName) {
        const globalToken = this.plugin.app.secretStorage.getSecret(this.plugin.settings.globalTokenName);
        if (globalToken) {
          tokenToUse = globalToken;
        }
      }
      const versions = await fetchReleaseVersions(scrubbedAddress, this.plugin.settings.debuggingMode, tokenToUse);
      if (versions && versions.length > 0) {
        validateInputEl == null ? void 0 : validateInputEl.inputEl.classList.remove("invalid-repository");
        validateInputEl == null ? void 0 : validateInputEl.inputEl.classList.add("valid-repository");
        validationStatusEl == null ? void 0 : validationStatusEl.setText("");
        if (this.versionSetting) {
          this.versionSetting.settingEl.classList.remove("disabled-setting");
          this.versionSetting.setDisabled(false);
          this.updateVersionDropdown(this.versionSetting, versions, selectedVersion);
        }
      } else {
        validateInputEl == null ? void 0 : validateInputEl.inputEl.classList.remove("valid-repository");
        validateInputEl == null ? void 0 : validateInputEl.inputEl.classList.add("invalid-repository");
        validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.noReleasesFound);
        validationStatusEl == null ? void 0 : validationStatusEl.addClass("validation-status-error");
        (_a = this.versionSetting) == null ? void 0 : _a.settingEl.classList.add("disabled-setting");
        (_b = this.versionSetting) == null ? void 0 : _b.setDisabled(true);
        (_c = this.addPluginButton) == null ? void 0 : _c.setDisabled(true);
      }
    } catch (error) {
      if (error instanceof GHRateLimitError) {
        validateInputEl == null ? void 0 : validateInputEl.inputEl.classList.remove("valid-repository");
        validateInputEl == null ? void 0 : validateInputEl.inputEl.classList.add("validation-error");
        validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.rateLimitExceeded(error.getMinutesToReset()));
        if (this.versionSetting) {
          this.versionSetting.settingEl.classList.add("disabled-setting");
          this.versionSetting.setDisabled(true);
          (_d = this.addPluginButton) == null ? void 0 : _d.setDisabled(true);
        }
        toastMessage(this.plugin, text.repository.rateLimitToast(error.message), 20, () => {
          window.open("https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#github-api-rate-limits");
        });
      }
      if (error instanceof GitHubResponseError) {
        const gitHubError = error;
        switch (gitHubError.status) {
          case 404:
            validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.notFound);
            break;
          case 403:
            validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.accessDenied);
            break;
          default:
            validationStatusEl == null ? void 0 : validationStatusEl.setText(text.repository.error(gitHubError.message));
            break;
        }
        validationStatusEl == null ? void 0 : validationStatusEl.addClass("validation-status-error");
        (_e = this.versionSetting) == null ? void 0 : _e.setDisabled(true);
        (_f = this.addPluginButton) == null ? void 0 : _f.setDisabled(true);
        toastMessage(this.plugin, text.repository.gitHubResponseToast(gitHubError.message), 20);
      }
    }
  }
  onClose() {
    if (this.openSettingsTabAfterwards) {
      this.plugin.app.setting.open();
      this.plugin.app.setting.openTabById(this.plugin.APP_ID);
    }
  }
  isGitHubRepositoryMatch(address) {
    const cleanAddress = address.trim().replace(/\.git$/, "").toLowerCase();
    const githubPattern = /^(?:https?:\/\/github\.com\/)?([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)$/i;
    return githubPattern.test(cleanAddress);
  }
};

// src/utils/internetconnection.ts
var import_obsidian7 = require("obsidian");
async function isConnectedToInternet() {
  try {
    const online = await (0, import_obsidian7.requestUrl)(`https://obsidian.md/?${Math.random()}`);
    return online.status >= 200 && online.status < 300;
  } catch (e) {
    return false;
  }
}

// src/features/BetaPlugins.ts
var BetaPlugins = class {
  constructor(plugin) {
    this.plugin = plugin;
  }
  /**
   * opens the AddNewPluginModal to get info for  a new beta plugin
   * @param openSettingsTabAfterwards - will open settings screen afterwards. Used when this command is called from settings tab
   * @param useFrozenVersion - install the plugin using frozen version.
   * @param prefillRepo - prefill the repository field in the modal.
   * @param prefillVersion - prefill the version field in the modal.
   * @param prefillSecretName - prefill the secret name field in the modal (name of secret in SecretStorage).
   */
  displayAddNewPluginModal(openSettingsTabAfterwards = false, useFrozenVersion = false, prefillRepo = "", prefillVersion = "", prefillSecretName = "", onSubmitted) {
    const newPlugin = new AddNewPluginModal(
      this.plugin,
      this,
      openSettingsTabAfterwards,
      useFrozenVersion,
      prefillRepo,
      prefillVersion,
      prefillSecretName,
      onSubmitted
    );
    newPlugin.open();
  }
  /**
   * Validates a GitHub repository to determine if it contains a valid Obsidian plugin.
   *
   * @param repositoryPath - The path to the GitHub repository.
   * @param getBetaManifest - Whether to fetch the beta manifest instead of the stable one. Defaults to `false`.
   * @param reportIssues - Whether to display error messages to the user. Defaults to `false`.
   * @param specifyVersion - A specific version to validate. Defaults to an empty string, which fetches the latest release.
   * @param privateApiKey - An optional private API key for accessing private repositories. Defaults to an empty string.
   *
   * @returns A promise that resolves to the plugin's `PluginManifest` if valid, or `null` if validation fails.
   *
   * @throws GHRateLimitError - If the GitHub API rate limit is exceeded.
   *
   * @remarks
   * - The function checks if the repository is private and fetches the latest release or a specified version.
   * - It validates the presence of a `manifest.json` file and ensures it contains required attributes (`id` and `version`).
   * - If the version in the `manifest.json` does not match the release version, the release version will override the manifest version.
   * - Error messages are logged or displayed based on the `reportIssues` flag.
   */
  async validateRepository(repositoryPath, getBetaManifest = false, reportIssues = false, specifyVersion = "", privateApiKey = "") {
    const noticeTimeout = 15;
    const token = privateApiKey;
    try {
      const isPrivate = await isPrivateRepo(repositoryPath, this.plugin.settings.debuggingMode, token);
      const release = await grabReleaseFromRepository(
        repositoryPath,
        specifyVersion,
        getBetaManifest,
        this.plugin.settings.debuggingMode,
        isPrivate,
        token
      );
      if (!release) {
        if (reportIssues) {
          toastMessage(
            this.plugin,
            `${repositoryPath}
This does not seem to be an obsidian plugin with valid releases, as there are no releases available.`,
            noticeTimeout
          );
          console.error("BRAT: validateRepository", repositoryPath, getBetaManifest, reportIssues);
        }
        return null;
      }
      const rawManifest = await grabReleaseFileFromRepository(
        release,
        "manifest.json",
        this.plugin.settings.debuggingMode,
        isPrivate,
        token
      );
      if (!rawManifest) {
        if (reportIssues) {
          toastMessage(
            this.plugin,
            `${repositoryPath}
This does not seem to be an obsidian plugin, as there is no manifest.json file.`,
            noticeTimeout
          );
          console.error("BRAT: validateRepository", repositoryPath, getBetaManifest, reportIssues);
        }
        return null;
      }
      const manifestJson = JSON.parse(rawManifest);
      if (!("id" in manifestJson)) {
        if (reportIssues)
          toastMessage(
            this.plugin,
            `${repositoryPath}
The plugin id attribute for the release is missing from the manifest file`,
            noticeTimeout
          );
        return null;
      }
      if (!("version" in manifestJson)) {
        if (reportIssues)
          toastMessage(
            this.plugin,
            `${repositoryPath}
The version attribute for the release is missing from the manifest file`,
            noticeTimeout
          );
        return null;
      }
      const expectedVersion = (0, import_semver2.coerce)(release.tag_name, {
        includePrerelease: true,
        loose: true
      });
      const manifestVersion = (0, import_semver2.coerce)(manifestJson.version, {
        includePrerelease: true,
        loose: true
      });
      const hasVersionMismatch = expectedVersion && manifestVersion ? (0, import_semver2.compare)(expectedVersion.version, manifestVersion.version) !== 0 : expectedVersion !== null && manifestJson.version !== release.tag_name;
      if (hasVersionMismatch && expectedVersion) {
        if (reportIssues)
          toastMessage(
            this.plugin,
            `${repositoryPath}
Version mismatch detected:
Release tag version: ${release.tag_name}
Manifest version: ${manifestJson.version}

The release tag version will be used to ensure consistency.`,
            noticeTimeout
          );
        manifestJson.version = expectedVersion.version;
      }
      return manifestJson;
    } catch (error) {
      if (error instanceof GHRateLimitError) {
        const msg = `GitHub API rate limit exceeded. Reset in ${error.getMinutesToReset()} minutes.`;
        if (reportIssues) toastMessage(this.plugin, msg, noticeTimeout);
        console.error(`BRAT: validateRepository ${error}`);
        toastMessage(
          this.plugin,
          `${error.message} Consider adding a personal access token in BRAT settings for higher limits. See documentation for details.`,
          20,
          () => {
            window.open("https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#github-api-rate-limits");
          }
        );
        throw error;
      }
      if (error instanceof GitHubResponseError) {
        if (reportIssues) {
          if (error.status === 401) {
            toastMessage(
              this.plugin,
              `${repositoryPath}
GitHub API Authentication error. Please verify that your personal access token is valid and set correctly.`,
              noticeTimeout
            );
          } else {
            toastMessage(this.plugin, `${repositoryPath}
GitHub API error ${error.status}: ${error.message}`, noticeTimeout);
          }
        }
        console.error(`BRAT: validateRepository ${error}`);
        throw error;
      }
      if (reportIssues)
        toastMessage(
          this.plugin,
          `${repositoryPath}
Unspecified error encountered: ${String(error)}, verify debug for more information.`,
          noticeTimeout
        );
      return null;
    }
  }
  /**
   * Gets all the release files based on the version number in the manifest
   *
   * @param repositoryPath - path to the GitHub repository
   * @param getManifest    - grab the remote manifest file
   * @param specifyVersion - grab the specified version if set
   * @param tokenValue  - token value from SecretStorage
   *
   * @returns all release files as strings based on the ReleaseFiles interface
   */
  async getAllReleaseFiles(repositoryPath, getManifest, specifyVersion = "", tokenValue = "") {
    const token = tokenValue;
    const isPrivate = await isPrivateRepo(repositoryPath, this.plugin.settings.debuggingMode, token);
    const release = await grabReleaseFromRepository(
      repositoryPath,
      specifyVersion,
      getManifest,
      this.plugin.settings.debuggingMode,
      isPrivate,
      token
    );
    if (!release) {
      throw new Error("No release found");
    }
    const reallyGetManifestOrNot = getManifest || specifyVersion !== "";
    console.debug({ reallyGetManifestOrNot, version: release.tag_name });
    return {
      mainJs: await grabReleaseFileFromRepository(release, "main.js", this.plugin.settings.debuggingMode, isPrivate, token),
      manifest: reallyGetManifestOrNot ? await grabReleaseFileFromRepository(release, "manifest.json", this.plugin.settings.debuggingMode, isPrivate, token) : "",
      styles: await grabReleaseFileFromRepository(release, "styles.css", this.plugin.settings.debuggingMode, isPrivate, token)
    };
  }
  /**
   * Writes the plugin release files to the local obsidian .plugins folder
   *
   * @param betaPluginId - the id of the plugin (not the repository path)
   * @param relFiles     - release file as strings, based on the ReleaseFiles interface
   *
   */
  async writeReleaseFilesToPluginFolder(betaPluginId, relFiles) {
    var _a, _b;
    const pluginTargetFolderPath = `${(0, import_obsidian8.normalizePath)(`${this.plugin.app.vault.configDir}/plugins/${betaPluginId}`)}/`;
    const { adapter } = this.plugin.app.vault;
    if (!await adapter.exists(pluginTargetFolderPath)) {
      await adapter.mkdir(pluginTargetFolderPath);
    }
    await adapter.write(`${pluginTargetFolderPath}main.js`, (_a = relFiles.mainJs) != null ? _a : "");
    await adapter.write(`${pluginTargetFolderPath}manifest.json`, (_b = relFiles.manifest) != null ? _b : "");
    if (relFiles.styles) await adapter.write(`${pluginTargetFolderPath}styles.css`, relFiles.styles);
  }
  /**
   * Primary function for adding a new beta plugin to Obsidian.
   * Also this function is used for updating existing plugins.
   *
   * @param repositoryPath    - path to GitHub repository formated as USERNAME/repository
   * @param updatePluginFiles - true if this is just an update not an install
   * @param seeIfUpdatedOnly  - if true, and updatePluginFiles true, will just check for updates, but not do the update. will report to user that there is a new plugin
   * @param reportIfNotUpdted - if true, report if an update has not succed
   * @param specifyVersion    - if not empty, need to install a specified version instead of the value in manifest-beta.json
   * @param forceReinstall    - if true, will force a reinstall of the plugin, even if it is already installed
   * @param enableAfterInstall - if true, will enable the plugin after install
   * @param privateApiKey     - if not empty, will use the private API key to access the repository, otherwise a PAT from settings will be used if available
   *
   * @returns true if succeeds
   */
  async addPlugin(repositoryPath, updatePluginFiles = false, seeIfUpdatedOnly = false, reportIfNotUpdted = false, specifyVersion = "", forceReinstall = false, enableAfterInstall = this.plugin.settings.enableAfterInstall, secretName = "") {
    try {
      if (this.plugin.settings.debuggingMode) {
        console.debug(
          "BRAT: addPlugin",
          repositoryPath,
          updatePluginFiles,
          seeIfUpdatedOnly,
          reportIfNotUpdted,
          specifyVersion,
          forceReinstall,
          enableAfterInstall,
          secretName ? "with secret" : "public"
        );
      }
      let tokenValue = "";
      if (secretName && secretName.trim() !== "") {
        tokenValue = this.plugin.app.secretStorage.getSecret(secretName) || "";
        if (!tokenValue) {
          toastMessage(
            this.plugin,
            `Secret not found for token name: ${secretName}. Please add it to SecretStorage or clear the token name for this plugin.`,
            10
          );
        }
      } else if (this.plugin.settings.globalTokenName) {
        tokenValue = this.plugin.app.secretStorage.getSecret(this.plugin.settings.globalTokenName) || "";
      }
      const noticeTimeout = 10;
      let primaryManifest = await this.validateRepository(repositoryPath, true, true, specifyVersion, tokenValue);
      const usingBetaManifest = !!primaryManifest;
      if (!usingBetaManifest) primaryManifest = await this.validateRepository(repositoryPath, false, true, specifyVersion, tokenValue);
      if (primaryManifest === null) {
        const msg = `${repositoryPath}
A manifest.json file does not exist in the latest release of the repository. This plugin cannot be installed.`;
        await this.plugin.log(msg, true);
        toastMessage(this.plugin, msg, noticeTimeout);
        return false;
      }
      if (!Object.hasOwn(primaryManifest, "version")) {
        const msg = `${repositoryPath}
The manifest.json file in the latest release or pre-release of the repository does not have a version number in the file. This plugin cannot be installed.`;
        await this.plugin.log(msg, true);
        toastMessage(this.plugin, msg, noticeTimeout);
        return false;
      }
      let isIncompatible = false;
      if (Object.hasOwn(primaryManifest, "minAppVersion")) {
        if (!(0, import_obsidian8.requireApiVersion)(primaryManifest.minAppVersion)) {
          if (specifyVersion === "" || specifyVersion === "latest" || !this.plugin.settings.allowIncompatiblePlugins) {
            const msg = `Plugin: ${repositoryPath}

The manifest.json for this plugin indicates that the Obsidian version of the app needs to be ${primaryManifest.minAppVersion}, but this installation of Obsidian is ${import_obsidian8.apiVersion}. 

You will need to update your Obsidian to use this plugin or contact the plugin developer for more information.`;
            await this.plugin.log(msg, true);
            toastMessage(this.plugin, msg, 30);
            return false;
          }
          const confirmResult = await confirm({
            app: this.plugin.app,
            message: createFragment((f) => {
              f.appendText("Plugin: ");
              f.createEl("code", { text: repositoryPath });
              f.createEl("br");
              f.appendText("The ");
              f.createEl("code", { text: "manifest.json" });
              f.appendText(" for this plugin indicates that the Obsidian version of the app needs to be ");
              f.createEl("code", { text: primaryManifest.minAppVersion });
              f.appendText(", but this installation of Obsidian is ");
              f.createEl("code", { text: import_obsidian8.apiVersion });
              f.appendText(".");
              f.createEl("br");
              f.appendText("Using this plugin is not recommended and may not work as expected. Use at your own risk.");
              f.createEl("br");
              f.appendText("Do you want to install it anyways?");
            })
          });
          if (!confirmResult) {
            return false;
          }
          isIncompatible = true;
        }
      }
      const getRelease = async () => {
        var _a, _b;
        const rFiles = await this.getAllReleaseFiles(repositoryPath, usingBetaManifest, specifyVersion, tokenValue);
        console.debug("rFiles", rFiles);
        if (usingBetaManifest || rFiles.manifest === "") rFiles.manifest = JSON.stringify(primaryManifest);
        const manifestObj = JSON.parse((_a = rFiles.manifest) != null ? _a : "");
        if (isIncompatible) {
          manifestObj.brat = {
            isIncompatible: true,
            minAppVersionOriginal: manifestObj.minAppVersion
          };
          manifestObj.minAppVersion = import_obsidian8.apiVersion;
        }
        if (import_obsidian8.Platform.isMobile && manifestObj.isDesktopOnly) {
          if (this.plugin.settings.allowIncompatiblePlugins) {
            const confirmResult = await confirm({
              app: this.plugin.app,
              message: createFragment((f) => {
                f.appendText("Plugin: ");
                f.createEl("code", { text: repositoryPath });
                f.createEl("br");
                f.appendText("The ");
                f.createEl("code", { text: "manifest.json" });
                f.appendText(" for this plugin indicates that the plugin has ");
                f.createEl("code", { text: "isDesktopOnly: true" });
                f.appendText(", but you are using a mobile device.");
                f.createEl("br");
                f.appendText("Using this plugin is not recommended and may not work as expected. Use at your own risk.");
                f.createEl("br");
                f.appendText("Do you want to forcefully run it on mobile anyways?");
              })
            });
            if (!confirmResult) {
              return null;
            }
            manifestObj.isDesktopOnly = false;
            (_b = manifestObj.brat) != null ? _b : manifestObj.brat = {};
            manifestObj.brat.isDesktopOnlyOriginal = true;
            manifestObj.brat.isIncompatible = true;
            isIncompatible = true;
          } else {
            const msg = `Plugin: ${repositoryPath}

The manifest.json for this plugin indicates that the plugin has isDesktopOnly: true, but you are using a mobile device.

The plugin will not be installed.`;
            await this.plugin.log(msg, true);
            toastMessage(this.plugin, msg, 30);
            return null;
          }
        }
        if (isIncompatible) {
          rFiles.manifest = JSON.stringify(manifestObj);
        }
        if (this.plugin.settings.debuggingMode) console.debug("BRAT: rFiles.manifest", usingBetaManifest, rFiles);
        if (rFiles.mainJs === null) {
          const msg = `${repositoryPath}
The release is not complete and cannot be downloaded. main.js is missing from the Release`;
          await this.plugin.log(msg, true);
          toastMessage(this.plugin, msg, noticeTimeout);
          return null;
        }
        return rFiles;
      };
      if (!updatePluginFiles || forceReinstall) {
        const releaseFiles = await getRelease();
        if (releaseFiles === null) return false;
        await this.writeReleaseFilesToPluginFolder(primaryManifest.id, releaseFiles);
        addBetaPluginToList(
          this.plugin,
          repositoryPath,
          specifyVersion,
          isIncompatible,
          secretName
          // Store secret name in settings
        );
        if (enableAfterInstall) {
          const { plugins } = this.plugin.app;
          const pluginTargetFolderPath = (0, import_obsidian8.normalizePath)(`${plugins.getPluginFolder()}/${primaryManifest.id}`);
          await plugins.loadManifest(pluginTargetFolderPath);
          await plugins.enablePluginAndSave(primaryManifest.id);
        }
        await this.plugin.app.plugins.loadManifests();
        if (forceReinstall) {
          await this.reloadPlugin(primaryManifest.id);
          await this.plugin.log(`${repositoryPath} reinstalled`, true);
          toastMessage(
            this.plugin,
            `${repositoryPath}
Plugin has been reinstalled and reloaded with version ${primaryManifest.version}`,
            noticeTimeout
          );
        } else {
          const versionText = specifyVersion === "" ? "" : ` (version: ${specifyVersion})`;
          let msg = `${repositoryPath}${versionText}
The plugin has been registered with BRAT.`;
          if (!enableAfterInstall) {
            msg += " You may still need to enable it the Community Plugin List.";
          }
          await this.plugin.log(msg, true);
          toastMessage(this.plugin, msg, noticeTimeout);
        }
      } else {
        const pluginTargetFolderPath = `${this.plugin.app.vault.configDir}/plugins/${primaryManifest.id}/`;
        let localManifestContents = "";
        try {
          localManifestContents = await this.plugin.app.vault.adapter.read(`${pluginTargetFolderPath}manifest.json`);
        } catch (e) {
          if (e.errno === -4058 || e.errno === -2) {
            await this.addPlugin(repositoryPath, false, usingBetaManifest, false, specifyVersion, false, enableAfterInstall, secretName);
            return true;
          }
          console.error("BRAT - Local Manifest Load", primaryManifest.id, JSON.stringify(e, null, 2));
        }
        if (specifyVersion !== "" && specifyVersion !== "latest") {
          toastMessage(this.plugin, `The version of ${repositoryPath} is frozen, not updating.`, 3);
          return false;
        }
        const localManifestJson = JSON.parse(localManifestContents);
        const localVersion = (0, import_semver2.coerce)(localManifestJson.version, {
          includePrerelease: true,
          loose: true
        });
        const remoteVersion = (0, import_semver2.coerce)(primaryManifest.version, {
          includePrerelease: true,
          loose: true
        });
        const hasNewerRemote = localVersion && remoteVersion ? (0, import_semver2.compare)(localVersion.version, remoteVersion.version) === -1 : localManifestJson.version !== primaryManifest.version;
        if (hasNewerRemote) {
          const releaseFiles = await getRelease();
          if (releaseFiles === null) return false;
          if (seeIfUpdatedOnly) {
            const msg2 = `There is an update available for ${primaryManifest.id} from version ${localManifestJson.version} to ${primaryManifest.version}. `;
            await this.plugin.log(
              `${msg2}[Release Info](https://github.com/${repositoryPath}/releases/tag/${primaryManifest.version})`,
              true
            );
            toastMessage(this.plugin, msg2, 30, () => {
              if (primaryManifest) {
                window.open(`https://github.com/${repositoryPath}/releases/tag/${primaryManifest.version}`);
              }
            });
            return false;
          }
          await this.writeReleaseFilesToPluginFolder(primaryManifest.id, releaseFiles);
          await this.plugin.app.plugins.loadManifests();
          await this.reloadPlugin(primaryManifest.id);
          const msg = `${primaryManifest.id}
Plugin has been updated from version ${localManifestJson.version} to ${primaryManifest.version}. `;
          await this.plugin.log(`${msg}[Release Info](https://github.com/${repositoryPath}/releases/tag/${primaryManifest.version})`, true);
          toastMessage(this.plugin, msg, 30, () => {
            if (primaryManifest) {
              window.open(`https://github.com/${repositoryPath}/releases/tag/${primaryManifest.version}`);
            }
          });
          return true;
        }
        if (reportIfNotUpdted) {
          toastMessage(this.plugin, `No update available for ${repositoryPath}`, 3);
        }
        return true;
      }
    } catch (error) {
      console.error(`BRAT: Error adding plugin ${repositoryPath}:`, {
        error,
        updatePluginFiles,
        seeIfUpdatedOnly,
        specifyVersion,
        forceReinstall
      });
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      await this.plugin.log(`Error ${updatePluginFiles ? "updating" : "adding"} plugin ${repositoryPath}: ${errorMessage}`, true);
      return false;
    }
    return true;
  }
  /**
   * reloads a plugin (assuming it has been enabled by user)
   * pjeby, Thanks Bro https://github.com/pjeby/hot-reload/blob/master/main.js
   *
   * @param pluginName - name of plugin
   *
   */
  async reloadPlugin(pluginName) {
    const { plugins } = this.plugin.app;
    try {
      await plugins.disablePlugin(pluginName);
      await plugins.enablePlugin(pluginName);
    } catch (e) {
      if (this.plugin.settings.debuggingMode) console.error("reload plugin", e);
    }
  }
  /**
   * updates a beta plugin
   *
   * @param repositoryPath - repository path on GitHub
   * @param onlyCheckDontUpdate - only looks for update
   *
   */
  async updatePlugin(repositoryPath, onlyCheckDontUpdate = false, reportIfNotUpdted = false, forceReinstall = false, secretName = "") {
    const result = await this.addPlugin(
      repositoryPath,
      true,
      onlyCheckDontUpdate,
      reportIfNotUpdted,
      "",
      forceReinstall,
      false,
      secretName
    );
    if (!result && !onlyCheckDontUpdate) toastMessage(this.plugin, `${repositoryPath}
Update of plugin failed.`);
    return result;
  }
  /**
   * walks through the list of plugins without frozen version and performs an update
   *
   * @param showInfo - should this with a started/completed message - useful when ran from CP
   *
   */
  async checkForPluginUpdatesAndInstallUpdates(showInfo = false, onlyCheckDontUpdate = false) {
    if (!await isConnectedToInternet()) {
      console.debug("BRAT: No internet detected.");
      return;
    }
    let newNotice;
    const msg1 = "Checking for plugin updates STARTED";
    await this.plugin.log(msg1, true);
    if (showInfo && this.plugin.settings.notificationsEnabled) newNotice = new import_obsidian8.Notice(`BRAT
${msg1}`, 3e4);
    const frozenVersions = new Map(this.plugin.settings.pluginSubListFrozenVersion.map((f) => [f.repo, f.version]));
    const repoTokens = new Map(this.plugin.settings.pluginSubListFrozenVersion.map((f) => [f.repo, f.tokenName || ""]));
    for (const bp of this.plugin.settings.pluginList) {
      const version = frozenVersions.get(bp);
      if (version && version !== "latest") {
        continue;
      }
      await this.updatePlugin(bp, onlyCheckDontUpdate, false, false, repoTokens.get(bp) || "");
    }
    const msg2 = "Checking for plugin updates COMPLETED";
    await this.plugin.log(msg2, true);
    if (showInfo) {
      if (newNotice) {
        newNotice.hide();
      }
      toastMessage(this.plugin, msg2, 10);
    }
    await this.checkForOfficiallyReleasedPlugins();
  }
  /**
   * Removes the beta plugin from the list of beta plugins (does not delete them from disk)
   *
   * @param betaPluginID - repository path
   *
   */
  deletePlugin(repositoryPath) {
    const msg = `Removed ${repositoryPath} from BRAT plugin list`;
    void this.plugin.log(msg, true);
    this.plugin.settings.pluginList = this.plugin.settings.pluginList.filter((b) => b !== repositoryPath);
    this.plugin.settings.pluginSubListFrozenVersion = this.plugin.settings.pluginSubListFrozenVersion.filter(
      (b) => b.repo !== repositoryPath
    );
    void this.plugin.saveSettings();
  }
  /**
   * Returns a list of plugins that are currently enabled or currently disabled
   *
   * @param enabled - true for enabled plugins, false for disabled plutings
   *
   * @returns manifests  of plugins
   */
  getEnabledDisabledPlugins(enabled) {
    const pl = this.plugin.app.plugins;
    const manifests = Object.values(pl.manifests);
    const enabledPlugins = Object.values(pl.plugins).map((p) => p.manifest);
    return enabled ? manifests.filter((manifest) => enabledPlugins.find((pluginName) => manifest.id === pluginName.id)) : manifests.filter((manifest) => !enabledPlugins.find((pluginName) => manifest.id === pluginName.id));
  }
  /**
   * Checks if there are any incompatible plugins installed and notifies the user
   */
  checkIncompatiblePlugins() {
    const incompatiblePluginIds = this.plugin.settings.pluginSubListFrozenVersion.filter((p) => p.isIncompatible).map((p) => p.repo);
    if (incompatiblePluginIds.length > 0) {
      toastMessage(
        this.plugin,
        `The following incompatible plugins were forcefully installed by BRAT and may not work as expected:
${incompatiblePluginIds.join("\n")}`,
        30
      );
    }
  }
  /**
   * Detects BRAT-tracked plugins that have graduated to the official Obsidian community plugin list
   * and have a stable (non-prerelease) release with version >= installed version.
   *
   * @returns Array of graduated plugin metadata
   */
  async getOfficiallyReleasedPlugins() {
    var _a;
    const communityPlugins = await grabCommmunityPluginList(this.plugin.settings.debuggingMode);
    if (!communityPlugins) return [];
    const communityRepos = new Set(communityPlugins.map((p) => p.repo));
    const frozenVersions = new Map(this.plugin.settings.pluginSubListFrozenVersion.map((f) => [f.repo, f.version]));
    const repoTokens = new Map(this.plugin.settings.pluginSubListFrozenVersion.map((f) => [f.repo, f.tokenName || ""]));
    const graduated = [];
    for (const repo of this.plugin.settings.pluginList) {
      const version = frozenVersions.get(repo);
      if (version && version !== "latest") continue;
      if (!communityRepos.has(repo)) continue;
      try {
        let tokenValue = "";
        const secretName = repoTokens.get(repo) || "";
        if (secretName) {
          tokenValue = this.plugin.app.secretStorage.getSecret(secretName) || "";
        } else if (this.plugin.settings.globalTokenName) {
          tokenValue = this.plugin.app.secretStorage.getSecret(this.plugin.settings.globalTokenName) || "";
        }
        const stableRelease = await grabReleaseFromRepository(
          repo,
          void 0,
          false,
          // exclude prereleases
          this.plugin.settings.debuggingMode,
          false,
          tokenValue || void 0
        );
        if (!stableRelease) continue;
        const pluginId = (_a = communityPlugins.find((p) => p.repo === repo)) == null ? void 0 : _a.id;
        if (!pluginId) continue;
        const localManifest = this.plugin.app.plugins.manifests[pluginId];
        if (!localManifest) continue;
        const localVersion = (0, import_semver2.coerce)(localManifest.version, { includePrerelease: true, loose: true });
        const stableVersion = (0, import_semver2.coerce)(stableRelease.tag_name, { includePrerelease: true, loose: true });
        if (!localVersion || !stableVersion) continue;
        if ((0, import_semver2.compare)(stableVersion.version, localVersion.version) >= 0) {
          graduated.push({
            repo,
            installedVersion: localManifest.version,
            stableVersion: stableRelease.tag_name
          });
        }
      } catch (error) {
        if (this.plugin.settings.debuggingMode) {
          console.debug(`BRAT: Error checking graduation for ${repo}:`, error);
        }
      }
    }
    return graduated;
  }
  /**
   * Checks for graduated plugins and notifies the user via toast notifications.
   * Called at the end of every update cycle.
   */
  async checkForOfficiallyReleasedPlugins() {
    try {
      const graduated = await this.getOfficiallyReleasedPlugins();
      for (const plugin of graduated) {
        const msg = `${plugin.repo} has been officially released (stable: ${plugin.stableVersion}). You can remove it from BRAT and use Obsidian's built-in updates.`;
        await this.plugin.log(msg, true);
        toastMessage(this.plugin, msg, 30, () => {
          window.open(`https://github.com/${plugin.repo}/releases/tag/${plugin.stableVersion}`);
        });
      }
    } catch (error) {
      if (this.plugin.settings.debuggingMode) {
        console.debug("BRAT: Error checking for officially released plugins:", error);
      }
    }
  }
};

// src/features/themes.ts
var import_obsidian9 = require("obsidian");
var themeSave = async (plugin, cssGithubRepository, newInstall) => {
  const text = getTranslations().themeMessages;
  let themeCss = await grabCommmunityThemeCssFile(cssGithubRepository, true, plugin.settings.debuggingMode);
  if (!themeCss) themeCss = await grabCommmunityThemeCssFile(cssGithubRepository, false, plugin.settings.debuggingMode);
  if (!themeCss) {
    toastMessage(plugin, text.noThemeCssFile);
    return false;
  }
  const themeManifest = await grabCommmunityThemeManifestFile(cssGithubRepository, plugin.settings.debuggingMode);
  if (!themeManifest) {
    toastMessage(plugin, text.noManifestFile);
    return false;
  }
  const manifestInfo = await JSON.parse(themeManifest);
  const themeTargetFolderPath = (0, import_obsidian9.normalizePath)(themesRootPath(plugin) + manifestInfo.name);
  const { adapter } = plugin.app.vault;
  if (!await adapter.exists(themeTargetFolderPath)) await adapter.mkdir(themeTargetFolderPath);
  await adapter.write((0, import_obsidian9.normalizePath)(`${themeTargetFolderPath}/theme.css`), themeCss);
  await adapter.write((0, import_obsidian9.normalizePath)(`${themeTargetFolderPath}/manifest.json`), themeManifest);
  updateBetaThemeLastUpdateChecksum(plugin, cssGithubRepository, checksumForString(themeCss));
  let msg = "";
  if (newInstall) {
    addBetaThemeToList(plugin, cssGithubRepository, themeCss);
    msg = text.installed(manifestInfo.name, cssGithubRepository);
    window.setTimeout(() => {
      plugin.app.customCss.setTheme(manifestInfo.name);
    }, 500);
  } else {
    msg = text.updated(manifestInfo.name, cssGithubRepository);
  }
  void plugin.log(`${msg}[Theme Info](https://github.com/${cssGithubRepository})`, false);
  toastMessage(plugin, msg, 20, () => {
    window.open(`https://github.com/${cssGithubRepository}`);
  });
  return true;
};
var themesCheckAndUpdates = async (plugin, showInfo) => {
  if (!await isConnectedToInternet()) {
    console.debug("BRAT: No internet detected.");
    return;
  }
  let newNotice;
  const msg1 = "Checking for beta theme updates STARTED";
  await plugin.log(msg1, true);
  if (showInfo && plugin.settings.notificationsEnabled) newNotice = new import_obsidian9.Notice(`BRAT
${msg1}`, 3e4);
  for (const t of plugin.settings.themesList) {
    let lastUpdateOnline = await grabChecksumOfThemeCssFile(t.repo, true, plugin.settings.debuggingMode);
    if (lastUpdateOnline === "0") lastUpdateOnline = await grabChecksumOfThemeCssFile(t.repo, false, plugin.settings.debuggingMode);
    console.debug("BRAT: lastUpdateOnline", lastUpdateOnline);
    if (lastUpdateOnline !== t.lastUpdate) await themeSave(plugin, t.repo, false);
  }
  const msg2 = "Checking for beta theme updates COMPLETED";
  await plugin.log(msg2, true);
  if (showInfo) {
    if (plugin.settings.notificationsEnabled && newNotice) newNotice.hide();
    toastMessage(plugin, msg2);
  }
};
var themeDelete = (plugin, cssGithubRepository) => {
  const text = getTranslations().themeMessages;
  plugin.settings.themesList = plugin.settings.themesList.filter((t) => t.repo !== cssGithubRepository);
  void plugin.saveSettings();
  const msg = text.removed(cssGithubRepository);
  void plugin.log(msg, true);
  toastMessage(plugin, msg);
};
var themesRootPath = (plugin) => {
  return `${(0, import_obsidian9.normalizePath)(`${plugin.app.vault.configDir}/themes`)}/`;
};

// src/migrations.ts
var MIGRATION_LOG_KEY = "brat-migrations";
async function hasMigrationRun(app, migrationId) {
  try {
    const logData = await app.vault.adapter.read(
      `${app.vault.configDir}/plugins/obsidian42-brat/${MIGRATION_LOG_KEY}.json`
    );
    const log = JSON.parse(logData);
    return log.appliedMigrations.includes(migrationId);
  } catch (e) {
    return false;
  }
}
async function markMigrationComplete(app, migrationId) {
  try {
    const logPath = `${app.vault.configDir}/plugins/obsidian42-brat/${MIGRATION_LOG_KEY}.json`;
    let log = { appliedMigrations: [] };
    try {
      const logData = await app.vault.adapter.read(logPath);
      log = JSON.parse(logData);
    } catch (e) {
    }
    if (!log.appliedMigrations.includes(migrationId)) {
      log.appliedMigrations.push(migrationId);
      await app.vault.adapter.write(logPath, JSON.stringify(log, null, 2));
    }
  } catch (error) {
    console.error(
      `BRAT: Failed to mark migration ${migrationId} complete:`,
      error
    );
  }
}
async function migrateTokensToSecretStorage(app, settings, saveSettings) {
  const MIGRATION_ID = "tokens-to-secretstorage-v1";
  if (await hasMigrationRun(app, MIGRATION_ID)) {
    return;
  }
  try {
    let migrated = 0;
    const createSecretId = (repo) => {
      const normalized = repo.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      const id = `brat-gh-${normalized}`;
      return id.length > 64 ? id.substring(0, 64).replace(/-$/, "") : id;
    };
    const findExistingSecret = (tokenValue) => {
      const allSecrets = app.secretStorage.listSecrets();
      for (const secretName of allSecrets) {
        const secretValue = app.secretStorage.getSecret(secretName);
        if (secretValue === tokenValue) {
          return secretName;
        }
      }
      return null;
    };
    const getOrCreateSecret = (tokenValue, secretId) => {
      const existing = findExistingSecret(tokenValue);
      if (existing) {
        console.debug(`BRAT: Reusing existing secret "${existing}"`);
        return existing;
      }
      app.secretStorage.setSecret(secretId, tokenValue);
      console.debug(`BRAT: Created new secret "${secretId}"`);
      return secretId;
    };
    if (settings.personalAccessToken && settings.personalAccessToken.trim() !== "") {
      const tokenValue = settings.personalAccessToken.trim();
      const secretId = "brat-gh-global";
      const secretName = getOrCreateSecret(tokenValue, secretId);
      settings.globalTokenName = secretName;
      settings.personalAccessToken = "";
      migrated++;
    }
    if (settings.pluginSubListFrozenVersion) {
      for (const plugin of settings.pluginSubListFrozenVersion) {
        if (plugin.token && plugin.token.trim() !== "") {
          const tokenValue = plugin.token.trim();
          const secretId = createSecretId(plugin.repo);
          const secretName = getOrCreateSecret(tokenValue, secretId);
          plugin.tokenName = secretName;
          plugin.token = void 0;
          migrated++;
        }
      }
    }
    if (migrated > 0) {
      await saveSettings();
      console.debug(`BRAT: Migrated ${migrated} token(s) to SecretStorage`);
    }
    await markMigrationComplete(app, MIGRATION_ID);
  } catch (error) {
    console.error("BRAT: Failed to migrate tokens to SecretStorage:", error);
  }
}

// src/ui/AddNewTheme.ts
var import_obsidian10 = require("obsidian");
var AddNewTheme = class extends import_obsidian10.Modal {
  constructor(plugin, openSettingsTabAfterwards = false, onSubmitted) {
    super(plugin.app);
    this.plugin = plugin;
    this.address = "";
    this.openSettingsTabAfterwards = openSettingsTabAfterwards;
    this.onSubmitted = onSubmitted;
  }
  async submitForm() {
    var _a;
    const text = getTranslations();
    if (this.address === "") return;
    const scrubbedAddress = this.address.replace("https://github.com/", "");
    if (existBetaThemeinInList(this.plugin, scrubbedAddress)) {
      toastMessage(this.plugin, text.addBetaThemeModal.alreadyInList, 10);
      return;
    }
    if (await themeSave(this.plugin, scrubbedAddress, true)) {
      (_a = this.onSubmitted) == null ? void 0 : _a.call(this);
      this.close();
    }
  }
  onOpen() {
    const text = getTranslations();
    const commonText = text.common;
    this.contentEl.createEl("h4", {
      text: text.addBetaThemeModal.heading.githubRepositoryForBetaTheme
    });
    this.contentEl.createEl("form", {}, (formEl) => {
      formEl.addClass("brat-modal");
      new import_obsidian10.Setting(formEl).addText((textEl) => {
        textEl.setPlaceholder(text.addBetaPluginModal.repository.placeholder);
        textEl.setValue(this.address);
        textEl.onChange((value) => {
          this.address = value.trim();
        });
        textEl.inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && this.address !== " ") {
            e.preventDefault();
            void this.submitForm();
          }
        });
        textEl.inputEl.addClass("brat-full-width-input");
        window.setTimeout(() => {
          const title = document.querySelector(".setting-item-info");
          if (title) title.remove();
          textEl.inputEl.focus();
        }, 10);
      });
      formEl.createDiv("modal-button-container", (buttonContainerEl) => {
        new import_obsidian10.ButtonComponent(buttonContainerEl).setButtonText(text.addBetaPluginModal.buttons.neverMind).onClick(() => {
          this.close();
        });
        new import_obsidian10.ButtonComponent(buttonContainerEl).setButtonText(text.settings.betaThemeList.addBetaTheme).setCta().onClick((e) => {
          e.preventDefault();
          console.debug("Add theme button clicked");
          if (this.address !== "") void this.submitForm();
        });
      });
      const newDiv = formEl.createDiv();
      newDiv.addClass("brat-modal-divider");
      const byTfThacker = newDiv.createSpan();
      byTfThacker.createEl("a", {
        href: "https://bit.ly/o42-twitter",
        text: "TFTHacker"
      });
      byTfThacker.appendText(commonText.and);
      byTfThacker.createEl("a", {
        href: "https://github.com/johannrichard",
        // eslint-disable-next-line obsidianmd/ui/sentence-case -- preserve author's lowercase handle
        text: "johannrichard"
      });
      byTfThacker.addClass("brat-credits");
      newDiv.appendChild(byTfThacker);
      promotionalLinks(newDiv, false);
      window.setTimeout(() => {
        const title = formEl.querySelectorAll(".brat-modal .setting-item-info");
        for (const titleEl of Array.from(title)) {
          titleEl.remove();
        }
      }, 50);
    });
  }
  onClose() {
    if (this.openSettingsTabAfterwards) {
      this.plugin.app.setting.openTab();
      this.plugin.app.setting.openTabById(this.plugin.APP_ID);
    }
  }
};

// src/ui/icons.ts
var import_obsidian11 = require("obsidian");
function addIcons() {
  (0, import_obsidian11.addIcon)(
    "BratIcon",
    `<path fill="currentColor" stroke="currentColor"  d="M 41.667969 41.667969 C 41.667969 39.367188 39.800781 37.5 37.5 37.5 C 35.199219 37.5 33.332031 39.367188 33.332031 41.667969 C 33.332031 43.96875 35.199219 45.832031 37.5 45.832031 C 39.800781 45.832031 41.667969 43.96875 41.667969 41.667969 Z M 60.417969 58.582031 C 59.460938 58.023438 58.320312 57.867188 57.25 58.148438 C 56.179688 58.429688 55.265625 59.125 54.707031 60.082031 C 53.746094 61.777344 51.949219 62.820312 50 62.820312 C 48.050781 62.820312 46.253906 61.777344 45.292969 60.082031 C 44.734375 59.125 43.820312 58.429688 42.75 58.148438 C 41.679688 57.867188 40.539062 58.023438 39.582031 58.582031 C 37.597656 59.726562 36.910156 62.257812 38.042969 64.25 C 40.5 68.53125 45.0625 71.171875 50 71.171875 C 54.9375 71.171875 59.5 68.53125 61.957031 64.25 C 63.089844 62.257812 62.402344 59.726562 60.417969 58.582031 Z M 62.5 37.5 C 60.199219 37.5 58.332031 39.367188 58.332031 41.667969 C 58.332031 43.96875 60.199219 45.832031 62.5 45.832031 C 64.800781 45.832031 66.667969 43.96875 66.667969 41.667969 C 66.667969 39.367188 64.800781 37.5 62.5 37.5 Z M 50 8.332031 C 26.988281 8.332031 8.332031 26.988281 8.332031 50 C 8.332031 73.011719 26.988281 91.667969 50 91.667969 C 73.011719 91.667969 91.667969 73.011719 91.667969 50 C 91.667969 26.988281 73.011719 8.332031 50 8.332031 Z M 50 83.332031 C 33.988281 83.402344 20.191406 72.078125 17.136719 56.363281 C 14.078125 40.644531 22.628906 24.976562 37.5 19.042969 C 37.457031 19.636719 37.457031 20.238281 37.5 20.832031 C 37.5 27.738281 43.097656 33.332031 50 33.332031 C 52.300781 33.332031 54.167969 31.46875 54.167969 29.167969 C 54.167969 26.867188 52.300781 25 50 25 C 47.699219 25 45.832031 23.132812 45.832031 20.832031 C 45.832031 18.53125 47.699219 16.667969 50 16.667969 C 68.410156 16.667969 83.332031 31.589844 83.332031 50 C 83.332031 68.410156 68.410156 83.332031 50 83.332031 Z M 50 83.332031 " />`
  );
}

// src/ui/GenericFuzzySuggester.ts
var import_obsidian12 = require("obsidian");
var GenericFuzzySuggester = class extends import_obsidian12.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.data = [];
    this.scope.register(["Shift"], "Enter", (evt) => {
      this.enterTrigger(evt);
    });
    this.scope.register(["Ctrl"], "Enter", (evt) => {
      this.enterTrigger(evt);
    });
  }
  setSuggesterData(suggesterData) {
    this.data = suggesterData;
  }
  display(callBack) {
    this.callbackFunction = callBack;
    this.open();
  }
  getItems() {
    return this.data;
  }
  getItemText(item) {
    return item.display;
  }
  onChooseItem() {
    return;
  }
  renderSuggestion(item, el) {
    el.createEl("div", { text: item.item.display });
  }
  enterTrigger(evt) {
    var _a;
    const selectedText = (_a = document.querySelector(
      ".suggestion-item.is-selected div"
    )) == null ? void 0 : _a.textContent;
    const item = this.data.find((i) => i.display === selectedText);
    if (item) {
      this.invokeCallback(item, evt);
      this.close();
    }
  }
  onChooseSuggestion(item, evt) {
    this.invokeCallback(item.item, evt);
  }
  invokeCallback(item, evt) {
    if (typeof this.callbackFunction === "function") {
      this.callbackFunction(item, evt);
    }
  }
};

// src/ui/PluginCommands.ts
var PluginCommands = class {
  constructor(plugin) {
    this.bratCommands = [
      {
        id: "AddBetaPlugin",
        icon: "BratIcon",
        name: "Plugins: Add a beta plugin for testing (with or without version)",
        showInRibbon: true,
        callback: () => {
          this.plugin.betaPlugins.displayAddNewPluginModal(false, true);
        }
      },
      {
        id: "checkForUpdatesAndUpdate",
        icon: "BratIcon",
        name: "Plugins: Check for updates to all beta plugins and UPDATE",
        showInRibbon: true,
        callback: async () => {
          await this.plugin.betaPlugins.checkForPluginUpdatesAndInstallUpdates(true, false);
        }
      },
      {
        id: "checkForUpdatesAndDontUpdate",
        icon: "BratIcon",
        name: "Plugins: Only check for updates to beta plugins, but don't Update",
        showInRibbon: true,
        callback: async () => {
          await this.plugin.betaPlugins.checkForPluginUpdatesAndInstallUpdates(true, true);
        }
      },
      {
        id: "updateOnePlugin",
        icon: "BratIcon",
        name: "Plugins: Choose a single plugin version to update",
        showInRibbon: true,
        callback: () => {
          const frozenVersions = new Map(
            this.plugin.settings.pluginSubListFrozenVersion.map((f) => [
              f.repo,
              {
                version: f.version,
                tokenName: f.tokenName
              }
            ])
          );
          const pluginList = Object.values(this.plugin.settings.pluginList).filter((repo) => {
            const frozen = frozenVersions.get(repo);
            return !(frozen == null ? void 0 : frozen.version) || frozen.version === "latest";
          }).map((repo) => {
            return {
              display: repo,
              info: repo
            };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            const msg = `Checking for updates for ${results.info}`;
            const frozen = frozenVersions.get(results.info);
            void this.plugin.log(msg, true);
            toastMessage(this.plugin, `
${msg}`, 3);
            void this.plugin.betaPlugins.updatePlugin(results.info, false, true, false, frozen == null ? void 0 : frozen.tokenName);
          });
        }
      },
      {
        id: "reinstallOnePlugin",
        icon: "BratIcon",
        name: "Plugins: Choose a single plugin to reinstall",
        showInRibbon: true,
        callback: () => {
          const pluginSubListFrozenVersionNames = new Set(this.plugin.settings.pluginSubListFrozenVersion.map((f) => f.repo));
          const pluginList = Object.values(this.plugin.settings.pluginList).filter((f) => !pluginSubListFrozenVersionNames.has(f)).map((m) => {
            return { display: m, info: m };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            const msg = `Reinstalling ${results.info}`;
            toastMessage(this.plugin, `
${msg}`, 3);
            void this.plugin.log(msg, true);
            void this.plugin.betaPlugins.updatePlugin(results.info, false, false, true);
          });
        }
      },
      {
        id: "restartPlugin",
        icon: "BratIcon",
        name: "Plugins: Restart a plugin that is already installed",
        showInRibbon: true,
        callback: () => {
          const pluginList = Object.values(this.plugin.app.plugins.manifests).map((m) => {
            return { display: m.id, info: m.id };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            toastMessage(this.plugin, `${results.info}
Plugin reloading .....`, 5);
            void this.plugin.betaPlugins.reloadPlugin(results.info);
          });
        }
      },
      {
        id: "disablePlugin",
        icon: "BratIcon",
        name: "Plugins: Disable a plugin - toggle it off",
        showInRibbon: true,
        callback: () => {
          const pluginList = this.plugin.betaPlugins.getEnabledDisabledPlugins(true).map((manifest) => {
            return {
              display: `${manifest.name} (${manifest.id})`,
              info: manifest.id
            };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            void this.plugin.log(`${results.display} plugin disabled`, false);
            if (this.plugin.settings.debuggingMode) console.debug(results.info);
            void this.plugin.app.plugins.disablePluginAndSave(results.info);
          });
        }
      },
      {
        id: "enablePlugin",
        icon: "BratIcon",
        name: "Plugins: Enable a plugin - toggle it on",
        showInRibbon: true,
        callback: () => {
          const pluginList = this.plugin.betaPlugins.getEnabledDisabledPlugins(false).map((manifest) => {
            return {
              display: `${manifest.name} (${manifest.id})`,
              info: manifest.id
            };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            void this.plugin.log(`${results.display} plugin enabled`, false);
            void this.plugin.app.plugins.enablePluginAndSave(results.info);
          });
        }
      },
      {
        id: "openGitHubZRepository",
        icon: "BratIcon",
        name: "Plugins: Open the GitHub repository for a plugin",
        showInRibbon: true,
        callback: async () => {
          const communityPlugins = await grabCommmunityPluginList(this.plugin.settings.debuggingMode);
          if (communityPlugins) {
            const communityPluginList = Object.values(communityPlugins).map((p) => {
              return { display: `Plugin: ${p.name}  (${p.repo})`, info: p.repo };
            });
            const bratList = Object.values(this.plugin.settings.pluginList).map((p) => {
              return { display: `BRAT: ${p}`, info: p };
            });
            for (const si of communityPluginList) {
              bratList.push(si);
            }
            const gfs = new GenericFuzzySuggester(this.plugin);
            gfs.setSuggesterData(bratList);
            gfs.display((results) => {
              if (results.info) window.open(`https://github.com/${results.info}`);
            });
          }
        }
      },
      {
        id: "openCommunityPagePlugin",
        icon: "BratIcon",
        name: "Plugins: Open the community page for a plugin",
        showInRibbon: true,
        callback: async () => {
          const communityPlugins = await grabCommmunityPluginList(this.plugin.settings.debuggingMode);
          if (!communityPlugins) {
            toastMessage(this.plugin, "Could not load the Obsidian community plugin list.", 5);
            return;
          }
          const pluginByRepo = new Map(communityPlugins.map((plugin) => [plugin.repo, plugin]));
          const seenPluginIds = /* @__PURE__ */ new Set();
          const prioritizedBratPlugins = this.plugin.settings.pluginList.map((repo) => pluginByRepo.get(repo)).filter((plugin) => Boolean(plugin)).map((plugin) => {
            seenPluginIds.add(plugin.id);
            return {
              display: `BRAT: ${plugin.name} (${plugin.id})`,
              info: plugin.id
            };
          });
          const communityPluginList = communityPlugins.filter((plugin) => !seenPluginIds.has(plugin.id)).map((plugin) => {
            return {
              display: `Plugin: ${plugin.name} (${plugin.id})`,
              info: plugin.id
            };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData([...prioritizedBratPlugins, ...communityPluginList]);
          gfs.display((results) => {
            if (results.info) {
              window.open(`https://obsidian.md/plugins?id=${encodeURIComponent(results.info)}`);
            }
          });
        }
      },
      {
        id: "openGitHubRepoTheme",
        icon: "BratIcon",
        name: "Themes: Open the GitHub repository for a theme (appearance)",
        showInRibbon: true,
        callback: async () => {
          const communityTheme = await grabCommmunityThemesList(this.plugin.settings.debuggingMode);
          if (communityTheme) {
            const communityThemeList = Object.values(communityTheme).map((p) => {
              return { display: `Theme: ${p.name}  (${p.repo})`, info: p.repo };
            });
            const gfs = new GenericFuzzySuggester(this.plugin);
            gfs.setSuggesterData(communityThemeList);
            gfs.display((results) => {
              if (results.info) window.open(`https://github.com/${results.info}`);
            });
          }
        }
      },
      {
        id: "opentPluginSettings",
        icon: "BratIcon",
        name: "Plugins: Open Plugin Settings Tab",
        showInRibbon: true,
        callback: () => {
          const settings = this.plugin.app.setting;
          const listOfPluginSettingsTabs = Object.values(settings.pluginTabs).map((t) => {
            return { display: `Plugin: ${t.name}`, info: t.id };
          });
          const gfs = new GenericFuzzySuggester(this.plugin);
          const listOfCoreSettingsTabs = Object.values(settings.settingTabs).map((t) => {
            return { display: `Core: ${t.name}`, info: t.id };
          });
          for (const si of listOfPluginSettingsTabs) {
            listOfCoreSettingsTabs.push(si);
          }
          gfs.setSuggesterData(listOfCoreSettingsTabs);
          gfs.display((results) => {
            settings.open();
            settings.openTabById(results.info);
          });
        }
      },
      {
        id: "GrabBetaTheme",
        icon: "BratIcon",
        name: "Themes: Grab a beta theme for testing from a Github repository",
        showInRibbon: true,
        callback: () => {
          new AddNewTheme(this.plugin).open();
        }
      },
      {
        id: "updateBetaThemes",
        icon: "BratIcon",
        name: "Themes: Update beta themes",
        showInRibbon: true,
        callback: async () => {
          await themesCheckAndUpdates(this.plugin, true);
        }
      },
      {
        id: "removeGraduatedFromBrat",
        icon: "BratIcon",
        name: "Plugins: Remove a graduated plugin from BRAT (keep installed)",
        showInRibbon: true,
        callback: async () => {
          const graduated = await this.plugin.betaPlugins.getOfficiallyReleasedPlugins();
          if (graduated.length === 0) {
            toastMessage(this.plugin, "No graduated plugins found. All BRAT plugins are still in beta.", 5);
            return;
          }
          const pluginList = graduated.map((p) => ({
            display: `${p.repo} (installed: ${p.installedVersion}, stable: ${p.stableVersion})`,
            info: p.repo
          }));
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            const repo = results.info;
            this.plugin.betaPlugins.deletePlugin(repo);
            this.plugin.settingsTab.update();
            toastMessage(this.plugin, `${repo} removed from BRAT. Obsidian will now manage updates via the community plugin list.`, 10);
          });
        }
      },
      {
        id: "updateGraduatedToStableAndRemove",
        icon: "BratIcon",
        name: "Plugins: Update a graduated plugin to stable release and remove from BRAT",
        showInRibbon: true,
        callback: async () => {
          const graduated = await this.plugin.betaPlugins.getOfficiallyReleasedPlugins();
          if (graduated.length === 0) {
            toastMessage(this.plugin, "No graduated plugins found. All BRAT plugins are still in beta.", 5);
            return;
          }
          const pluginList = graduated.map((p) => ({
            display: `${p.repo} (installed: ${p.installedVersion} \u2192 stable: ${p.stableVersion})`,
            info: p.repo
          }));
          const gfs = new GenericFuzzySuggester(this.plugin);
          gfs.setSuggesterData(pluginList);
          gfs.display((results) => {
            void (async () => {
              const repo = results.info;
              const match = graduated.find((g) => g.repo === repo);
              if (!match) return;
              const success = await this.plugin.betaPlugins.addPlugin(
                repo,
                false,
                false,
                false,
                match.stableVersion,
                true,
                // force reinstall
                true
                // enable after install
              );
              if (success) {
                this.plugin.betaPlugins.deletePlugin(repo);
                this.plugin.settingsTab.update();
                toastMessage(this.plugin, `${repo} updated to stable ${match.stableVersion} and removed from BRAT.`, 10);
              } else {
                toastMessage(this.plugin, `Failed to install stable release for ${repo}.`, 10);
              }
            })();
          });
        }
      },
      {
        id: "allCommands",
        icon: "BratIcon",
        name: "All Commands list",
        showInRibbon: false,
        callback: () => {
          this.ribbonDisplayCommands();
        }
      }
    ];
    this.plugin = plugin;
    for (const item of this.bratCommands) {
      this.plugin.addCommand({
        id: item.id,
        name: item.name,
        icon: item.icon,
        callback: () => {
          item.callback();
        }
      });
    }
  }
  ribbonDisplayCommands() {
    const bratCommandList = [];
    for (const cmd of this.bratCommands) {
      if (cmd.showInRibbon) bratCommandList.push({ display: cmd.name, info: cmd.callback });
    }
    const gfs = new GenericFuzzySuggester(this.plugin);
    const settings = this.plugin.app.setting;
    const listOfCoreSettingsTabs = Object.values(settings.settingTabs).map((t) => {
      return {
        display: `Core: ${t.name}`,
        info: () => {
          settings.open();
          settings.openTabById(t.id);
        }
      };
    });
    const listOfPluginSettingsTabs = Object.values(settings.pluginTabs).map((t) => {
      return {
        display: `Plugin: ${t.name}`,
        info: () => {
          settings.open();
          settings.openTabById(t.id);
        }
      };
    });
    bratCommandList.push({
      display: "---- Core Plugin Settings ----",
      info: () => {
        this.ribbonDisplayCommands();
      }
    });
    for (const si of listOfCoreSettingsTabs) {
      bratCommandList.push(si);
    }
    bratCommandList.push({
      display: "---- Plugin Settings ----",
      info: () => {
        this.ribbonDisplayCommands();
      }
    });
    for (const si of listOfPluginSettingsTabs) {
      bratCommandList.push(si);
    }
    gfs.setSuggesterData(bratCommandList);
    gfs.display((results) => {
      if (typeof results.info === "function") {
        results.info();
      }
    });
  }
};

// src/ui/SettingsTab.ts
var import_obsidian13 = require("obsidian");
var BratSettingsTab = class extends import_obsidian13.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.accessTokenSetting = null;
    this.accessTokenButton = null;
    this.plugin = plugin;
  }
  async copyRepoIdentifier(identifier) {
    var _a;
    if (!identifier) return;
    const t = getTranslations().settings.copyIdentifier;
    try {
      if (!((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(identifier);
      toastMessage(this.plugin, t.copied(identifier), 3);
    } catch (error) {
      console.error("Failed to copy repository identifier", identifier, error);
      toastMessage(this.plugin, t.failed, 5);
    }
  }
  getSettingDefinitions() {
    const text = getTranslations().settings;
    return [
      {
        name: text.general.autoEnablePluginsAfterInstallation.name,
        desc: text.general.autoEnablePluginsAfterInstallation.desc,
        control: { type: "toggle", key: "enableAfterInstall" }
      },
      {
        name: text.general.autoUpdatePluginsAtStartup.name,
        desc: text.general.autoUpdatePluginsAtStartup.desc,
        control: { type: "toggle", key: "updateAtStartup" }
      },
      {
        name: text.general.autoUpdateThemesAtStartup.name,
        desc: text.general.autoUpdateThemesAtStartup.desc,
        control: { type: "toggle", key: "updateThemesAtStartup" }
      },
      {
        name: text.general.selectLatestPluginVersionByDefault.name,
        desc: text.general.selectLatestPluginVersionByDefault.desc,
        control: {
          type: "toggle",
          key: "selectLatestPluginVersionByDefault"
        }
      },
      {
        name: text.general.allowIncompatiblePlugins.name,
        desc: text.general.allowIncompatiblePlugins.desc,
        control: { type: "toggle", key: "allowIncompatiblePlugins" }
      },
      this.createPluginListDefinition(),
      this.createThemeListDefinition(),
      {
        type: "group",
        heading: text.monitoring.heading,
        items: [
          {
            name: text.monitoring.enableNotifications.name,
            desc: text.monitoring.enableNotifications.desc,
            control: { type: "toggle", key: "notificationsEnabled" }
          },
          {
            name: text.monitoring.enableLogging.name,
            desc: text.monitoring.enableLogging.desc,
            control: { type: "toggle", key: "loggingEnabled" }
          },
          {
            name: text.monitoring.bratLogFileLocation.name,
            desc: text.monitoring.bratLogFileLocation.desc,
            control: {
              type: "text",
              key: "loggingPath",
              placeholder: text.monitoring.bratLogFileLocation.placeholder
            }
          },
          {
            name: text.monitoring.enableVerboseLogging.name,
            desc: text.monitoring.enableVerboseLogging.desc,
            control: { type: "toggle", key: "loggingVerboseEnabled" }
          },
          {
            name: text.monitoring.debuggingMode.name,
            desc: text.monitoring.debuggingMode.desc,
            control: { type: "toggle", key: "debuggingMode" }
          }
        ]
      },
      {
        type: "group",
        heading: text.githubPersonalAccessToken.heading,
        items: [
          {
            name: text.githubPersonalAccessToken.personalAccessToken.name,
            desc: createLink({
              prependText: text.githubPersonalAccessToken.personalAccessToken.desc.prependText,
              url: "https://github.com/settings/tokens/new?scopes=public_repo",
              text: text.githubPersonalAccessToken.personalAccessToken.desc.linkText,
              appendText: text.githubPersonalAccessToken.personalAccessToken.desc.appendText
            }),
            render: (setting) => this.renderPersonalAccessTokenSetting(setting)
          }
        ]
      }
    ];
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("brat-settings");
    const text = getTranslations().settings;
    new import_obsidian13.Setting(containerEl).setName(text.general.autoEnablePluginsAfterInstallation.name).setDesc(text.general.autoEnablePluginsAfterInstallation.desc).addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableAfterInstall).onChange(async (value) => {
        this.plugin.settings.enableAfterInstall = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian13.Setting(containerEl).setName(text.general.autoUpdatePluginsAtStartup.name).setDesc(text.general.autoUpdatePluginsAtStartup.desc).addToggle((cb) => {
      cb.setValue(this.plugin.settings.updateAtStartup).onChange(async (value) => {
        this.plugin.settings.updateAtStartup = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian13.Setting(containerEl).setName(text.general.autoUpdateThemesAtStartup.name).setDesc(text.general.autoUpdateThemesAtStartup.desc).addToggle((cb) => {
      cb.setValue(this.plugin.settings.updateThemesAtStartup).onChange(async (value) => {
        this.plugin.settings.updateThemesAtStartup = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian13.Setting(containerEl).setName(text.general.selectLatestPluginVersionByDefault.name).setDesc(text.general.selectLatestPluginVersionByDefault.desc).addToggle((cb) => {
      cb.setValue(this.plugin.settings.selectLatestPluginVersionByDefault).onChange(async (value) => {
        this.plugin.settings.selectLatestPluginVersionByDefault = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian13.Setting(containerEl).setName(text.general.allowIncompatiblePlugins.name).setDesc(text.general.allowIncompatiblePlugins.desc).addToggle((cb) => {
      cb.setValue(this.plugin.settings.allowIncompatiblePlugins).onChange(async (value) => {
        this.plugin.settings.allowIncompatiblePlugins = value;
        await this.plugin.saveSettings();
      });
    });
    const frozenVersions = new Map(this.plugin.settings.pluginSubListFrozenVersion.map((f) => [f.repo, f]));
    const pluginContainers = /* @__PURE__ */ new Map();
    const betaPluginGroup = new import_obsidian13.SettingGroup(containerEl).setHeading(text.betaPluginList.heading);
    betaPluginGroup.addSearch((cb) => {
      cb.setPlaceholder(text.betaPluginList.filterPlaceholder);
      cb.onChange((value) => {
        const filterValue = value.toLowerCase().trim();
        pluginContainers.forEach(({ container, pluginName }) => {
          if (filterValue === "") {
            container.removeAttribute("hidden");
          } else {
            if (pluginName.includes(filterValue)) {
              container.removeAttribute("hidden");
            } else {
              container.setAttribute("hidden", "true");
            }
          }
        });
      });
    });
    betaPluginGroup.addSetting((setting) => {
      setting.setDesc(this.createPluginListDescriptionFragment());
      setting.addButton((cb) => {
        cb.setButtonText(text.betaPluginList.addBetaPlugin).setCta().onClick(() => {
          this.plugin.betaPlugins.displayAddNewPluginModal(true);
        });
      });
    });
    for (const p of this.plugin.settings.pluginList) {
      const bp = frozenVersions.get(p);
      betaPluginGroup.addSetting((pluginSettingContainer) => {
        const secretName = (bp == null ? void 0 : bp.tokenName) || "";
        const secretValue = secretName ? this.plugin.app.secretStorage.getSecret(secretName) : "";
        const isSecretMissing = Boolean(secretName && !secretValue);
        const pluginDescription = document.createDocumentFragment();
        const trackedVersionText = (bp == null ? void 0 : bp.version) ? text.betaPluginList.trackedVersion(bp.version, bp.version !== "latest") : "";
        const incompatibleText = (bp == null ? void 0 : bp.isIncompatible) ? text.betaPluginList.incompatible : "";
        pluginDescription.createDiv({
          text: `${trackedVersionText}${incompatibleText}`
        });
        if (isSecretMissing) {
          pluginDescription.createDiv({
            text: text.betaPluginList.secretMissing(secretName),
            cls: "mod-warning",
            title: text.betaPluginList.secretMissingTitle
          });
        }
        pluginSettingContainer.setName(createGitHubResourceLink(p)).setDesc(pluginDescription);
        const containerElement = pluginSettingContainer.settingEl;
        containerElement.addClass("brat-plugin-item");
        pluginContainers.set(p, {
          container: containerElement,
          pluginName: p.toLowerCase()
        });
        pluginSettingContainer.addExtraButton((btn) => {
          btn.setIcon("copy").setTooltip(text.betaPluginList.copyPluginIdentifier).onClick(async () => {
            await this.copyRepoIdentifier(p);
          });
        });
        if (!(bp == null ? void 0 : bp.version) || bp.version === "latest") {
          pluginSettingContainer.addButton((btn) => {
            if (isSecretMissing) {
              btn.setIcon("sync").setTooltip(text.betaPluginList.secretMissingTooltip(secretName)).setWarning().setDisabled(true);
            } else {
              btn.setIcon("sync").setTooltip(text.betaPluginList.checkAndUpdatePlugin).onClick(async () => {
                await this.plugin.betaPlugins.updatePlugin(p, false, true, false, (bp == null ? void 0 : bp.tokenName) || "");
              });
            }
          });
        }
        pluginSettingContainer.addButton((btn) => {
          btn.setIcon("edit").setTooltip(text.betaPluginList.changeVersionAndUpdateSettings);
          if (isSecretMissing) {
            btn.setWarning();
          }
          btn.onClick(() => {
            this.plugin.betaPlugins.displayAddNewPluginModal(
              true,
              true,
              p,
              bp == null ? void 0 : bp.version,
              (bp == null ? void 0 : bp.tokenName) || ""
              // Pass secret name, not token value
            );
            this.plugin.app.setting.updatePluginSection();
          });
        }).addButton((btn) => {
          btn.setIcon("cross").setTooltip(text.betaPluginList.removeThisBetaPlugin).setWarning().onClick(() => {
            if (btn.buttonEl.textContent === "") {
              btn.setButtonText(text.betaPluginList.confirmRemoval);
            } else {
              const { buttonEl } = btn;
              const { parentElement } = buttonEl;
              if (parentElement == null ? void 0 : parentElement.parentElement) {
                parentElement.parentElement.remove();
                this.plugin.betaPlugins.deletePlugin(p);
              }
            }
          });
        });
      });
    }
    const themeContainers = /* @__PURE__ */ new Map();
    const betaThemeGroup = new import_obsidian13.SettingGroup(containerEl).setHeading(text.betaThemeList.heading);
    betaThemeGroup.addSetting((setting) => {
      setting.addButton((cb) => {
        cb.setButtonText(text.betaThemeList.addBetaTheme).setCta().onClick(() => {
          this.plugin.app.setting.close();
          new AddNewTheme(this.plugin).open();
        });
      });
    });
    betaThemeGroup.addSearch((cb) => {
      cb.setPlaceholder(text.betaThemeList.filterPlaceholder);
      cb.onChange((value) => {
        const filterValue = value.toLowerCase().trim();
        themeContainers.forEach(({ container, themeName }) => {
          if (filterValue === "") {
            container.removeAttribute("hidden");
          } else {
            if (themeName.includes(filterValue)) {
              container.removeAttribute("hidden");
            } else {
              container.setAttribute("hidden", "true");
            }
          }
        });
      });
    });
    for (const bp of this.plugin.settings.themesList) {
      betaThemeGroup.addSetting((themeSettingContainer) => {
        themeSettingContainer.setName(createGitHubResourceLink(bp.repo));
        const containerElement = themeSettingContainer.settingEl;
        containerElement.addClass("brat-theme-item");
        themeContainers.set(bp.repo, {
          container: containerElement,
          themeName: bp.repo.toLowerCase()
        });
        themeSettingContainer.addExtraButton((btn) => {
          btn.setIcon("copy").setTooltip(text.betaThemeList.copyThemeIdentifier).onClick(async () => {
            await this.copyRepoIdentifier(bp.repo);
          });
        });
        themeSettingContainer.addButton((btn) => {
          btn.setIcon("cross").setTooltip(text.betaThemeList.deleteThisBetaTheme).onClick(() => {
            if (btn.buttonEl.textContent === "") btn.setButtonText(text.betaThemeList.confirmRemoval);
            else {
              const { buttonEl } = btn;
              const { parentElement } = buttonEl;
              if (parentElement == null ? void 0 : parentElement.parentElement) {
                parentElement.parentElement.remove();
                themeDelete(this.plugin, bp.repo);
              }
            }
          });
        });
      });
    }
    const monitoringGroup = new import_obsidian13.SettingGroup(containerEl).setHeading(text.monitoring.heading);
    monitoringGroup.addSetting((setting) => {
      setting.setName(text.monitoring.enableNotifications.name).setDesc(text.monitoring.enableNotifications.desc).addToggle((cb) => {
        cb.setValue(this.plugin.settings.notificationsEnabled);
        cb.onChange((value) => {
          this.plugin.settings.notificationsEnabled = value;
          void this.plugin.saveSettings();
        });
      });
    });
    monitoringGroup.addSetting((setting) => {
      setting.setName(text.monitoring.enableLogging.name).setDesc(text.monitoring.enableLogging.desc).addToggle((cb) => {
        cb.setValue(this.plugin.settings.loggingEnabled).onChange((value) => {
          this.plugin.settings.loggingEnabled = value;
          void this.plugin.saveSettings();
        });
      });
    });
    monitoringGroup.addSetting((setting) => {
      setting.setName(text.monitoring.bratLogFileLocation.name).setDesc(text.monitoring.bratLogFileLocation.desc).addSearch((cb) => {
        cb.setPlaceholder(text.monitoring.bratLogFileLocation.placeholder).setValue(this.plugin.settings.loggingPath).onChange((newFolder) => {
          this.plugin.settings.loggingPath = newFolder;
          void this.plugin.saveSettings();
        });
      });
    });
    monitoringGroup.addSetting((setting) => {
      setting.setName(text.monitoring.enableVerboseLogging.name).setDesc(text.monitoring.enableVerboseLogging.desc).addToggle((cb) => {
        cb.setValue(this.plugin.settings.loggingVerboseEnabled).onChange((value) => {
          this.plugin.settings.loggingVerboseEnabled = value;
          void this.plugin.saveSettings();
        });
      });
    });
    monitoringGroup.addSetting((setting) => {
      setting.setName(text.monitoring.debuggingMode.name).setDesc(text.monitoring.debuggingMode.desc).addToggle((cb) => {
        cb.setValue(this.plugin.settings.debuggingMode).onChange((value) => {
          this.plugin.settings.debuggingMode = value;
          void this.plugin.saveSettings();
        });
      });
    });
    const tokenSection = new import_obsidian13.SettingGroup(containerEl).setHeading(text.githubPersonalAccessToken.heading);
    let currentTokenValue = "";
    tokenSection.addSetting((tokenSetting) => {
      tokenSetting.setName(text.githubPersonalAccessToken.personalAccessToken.name).setDesc(
        createLink({
          prependText: text.githubPersonalAccessToken.personalAccessToken.desc.prependText,
          url: "https://github.com/settings/tokens/new?scopes=public_repo",
          text: text.githubPersonalAccessToken.personalAccessToken.desc.linkText,
          appendText: text.githubPersonalAccessToken.personalAccessToken.desc.appendText
        })
      );
      this.accessTokenSetting = new import_obsidian13.SecretComponent(this.plugin.app, tokenSetting.controlEl);
      this.accessTokenSetting.setValue(this.plugin.settings.globalTokenName || "").onChange((secretName) => {
        void (async () => {
          const normalizedName = (secretName == null ? void 0 : secretName.trim()) || "";
          this.plugin.settings.globalTokenName = normalizedName;
          await this.plugin.saveSettings();
          if (normalizedName) {
            currentTokenValue = this.plugin.app.secretStorage.getSecret(normalizedName) || "";
            await this.validateGlobalTokenAndUpdateButton(currentTokenValue);
          } else {
            currentTokenValue = "";
            await this.validateGlobalTokenAndUpdateButton("");
          }
        })();
      });
      if (this.plugin.settings.globalTokenName) {
        currentTokenValue = this.plugin.app.secretStorage.getSecret(this.plugin.settings.globalTokenName) || "";
      }
      tokenSetting.addExtraButton((cb) => {
        cb.setIcon("cross").setTooltip(text.githubPersonalAccessToken.clearPersonalAccessToken).onClick(async () => {
          var _a;
          this.plugin.settings.globalTokenName = "";
          await this.plugin.saveSettings();
          (_a = this.accessTokenSetting) == null ? void 0 : _a.setValue("");
          currentTokenValue = "";
          await this.validateGlobalTokenAndUpdateButton("");
        });
      }).addButton((btn) => {
        this.accessTokenButton = btn;
        btn.setButtonText(text.githubPersonalAccessToken.validate).setCta().onClick(async () => {
          if (currentTokenValue) {
            await this.validateGlobalTokenAndUpdateButton(currentTokenValue);
          }
        });
      }).then(() => {
        void this.validateGlobalTokenAndUpdateButton(currentTokenValue);
      });
    });
  }
  createPluginListDefinition() {
    const text = getTranslations().settings;
    const frozenVersions = new Map(this.plugin.settings.pluginSubListFrozenVersion.map((f) => [f.repo, f]));
    return {
      type: "list",
      heading: text.betaPluginList.heading,
      search: this.createListSearch(text.betaPluginList.filterPlaceholder),
      addItem: {
        name: text.betaPluginList.addBetaPlugin,
        action: () => {
          this.plugin.betaPlugins.displayAddNewPluginModal(true, false, "", "", "", () => this.update());
        }
      },
      items: [
        this.createPluginListDescriptionItem(),
        ...this.plugin.settings.pluginList.map((repository) => {
          const trackedPlugin = frozenVersions.get(repository);
          return {
            name: repository,
            desc: this.createTrackedPluginDescriptionText(trackedPlugin),
            render: (setting) => {
              this.renderTrackedPluginSetting(setting, repository, trackedPlugin);
            }
          };
        })
      ]
    };
  }
  createThemeListDefinition() {
    const text = getTranslations().settings;
    return {
      type: "list",
      heading: text.betaThemeList.heading,
      search: this.createListSearch(text.betaThemeList.filterPlaceholder),
      addItem: {
        name: text.betaThemeList.addBetaTheme,
        action: () => {
          this.plugin.app.setting.close();
          new AddNewTheme(this.plugin, true, () => this.update()).open();
        }
      },
      items: this.plugin.settings.themesList.map((theme) => ({
        name: theme.repo,
        render: (setting) => {
          this.renderTrackedThemeSetting(setting, theme);
        }
      }))
    };
  }
  createPluginListDescriptionItem() {
    const guideUrl = "https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#managing-beta-plugin-and-theme-lists-in-settings";
    return {
      name: "",
      searchable: false,
      render: (setting) => {
        setting.settingEl.empty();
        const line = setting.settingEl.createDiv();
        line.createSpan({
          text: getTranslations().settings.betaPluginList.description.editAndRemove
        });
        line.appendText(" ");
        line.createEl("a", {
          href: guideUrl,
          text: "Learn more"
        });
      }
    };
  }
  createPluginListDescriptionFragment() {
    const guideUrl = "https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#managing-beta-plugin-and-theme-lists-in-settings";
    const text = getTranslations().settings.betaPluginList.description;
    const fragment = document.createDocumentFragment();
    const line = fragment.createEl("div");
    line.createSpan({ text: text.editAndRemove });
    line.appendText(" ");
    line.createEl("a", {
      href: guideUrl,
      text: "Learn more"
    });
    return fragment;
  }
  createTrackedPluginDescriptionFragment(trackedPlugin) {
    const text = getTranslations().settings.betaPluginList;
    const secretName = (trackedPlugin == null ? void 0 : trackedPlugin.tokenName) || "";
    const secretValue = secretName ? this.plugin.app.secretStorage.getSecret(secretName) : "";
    const isSecretMissing = Boolean(secretName && !secretValue);
    const pluginDescription = document.createDocumentFragment();
    const trackedVersionText = (trackedPlugin == null ? void 0 : trackedPlugin.version) ? text.trackedVersion(trackedPlugin.version, trackedPlugin.version !== "latest") : "";
    const incompatibleText = (trackedPlugin == null ? void 0 : trackedPlugin.isIncompatible) ? text.incompatible : "";
    pluginDescription.createDiv({
      text: `${trackedVersionText}${incompatibleText}`
    });
    if (isSecretMissing) {
      pluginDescription.createDiv({
        text: text.secretMissing(secretName),
        cls: "mod-warning",
        title: text.secretMissingTitle
      });
    }
    return pluginDescription;
  }
  createTrackedPluginDescriptionText(trackedPlugin) {
    const text = getTranslations().settings.betaPluginList;
    const trackedVersionText = (trackedPlugin == null ? void 0 : trackedPlugin.version) ? text.trackedVersion(trackedPlugin.version, trackedPlugin.version !== "latest") : "";
    const incompatibleText = (trackedPlugin == null ? void 0 : trackedPlugin.isIncompatible) ? text.incompatible : "";
    const secretName = (trackedPlugin == null ? void 0 : trackedPlugin.tokenName) || "";
    const secretValue = secretName ? this.plugin.app.secretStorage.getSecret(secretName) : "";
    const secretText = secretName && !secretValue ? text.secretMissing(secretName) : "";
    return `${trackedVersionText}${incompatibleText}${secretText}`.trim();
  }
  renderTrackedPluginSetting(setting, repository, trackedPlugin) {
    const text = getTranslations().settings.betaPluginList;
    const secretName = (trackedPlugin == null ? void 0 : trackedPlugin.tokenName) || "";
    const secretValue = secretName ? this.plugin.app.secretStorage.getSecret(secretName) : "";
    const isSecretMissing = Boolean(secretName && !secretValue);
    setting.setName(createGitHubResourceLink(repository)).setDesc(this.createTrackedPluginDescriptionFragment(trackedPlugin));
    setting.settingEl.addClass("brat-plugin-item");
    setting.addExtraButton((btn) => {
      btn.setIcon("copy").setTooltip(text.copyPluginIdentifier).onClick(async () => {
        await this.copyRepoIdentifier(repository);
      });
    });
    if (!(trackedPlugin == null ? void 0 : trackedPlugin.version) || trackedPlugin.version === "latest") {
      setting.addButton((btn) => {
        if (isSecretMissing) {
          btn.setIcon("sync").setTooltip(text.secretMissingTooltip(secretName)).setWarning().setDisabled(true);
        } else {
          btn.setIcon("sync").setTooltip(text.checkAndUpdatePlugin).onClick(async () => {
            await this.plugin.betaPlugins.updatePlugin(repository, false, true, false, (trackedPlugin == null ? void 0 : trackedPlugin.tokenName) || "");
          });
        }
      });
    }
    setting.addButton((btn) => {
      btn.setIcon("edit").setTooltip(text.changeVersionAndUpdateSettings);
      if (isSecretMissing) {
        btn.setWarning();
      }
      btn.onClick(() => {
        this.plugin.betaPlugins.displayAddNewPluginModal(
          true,
          true,
          repository,
          trackedPlugin == null ? void 0 : trackedPlugin.version,
          (trackedPlugin == null ? void 0 : trackedPlugin.tokenName) || "",
          () => this.update()
        );
      });
    });
    setting.addButton((btn) => {
      btn.setIcon("cross").setTooltip(text.removeThisBetaPlugin).setWarning().onClick(() => {
        if (btn.buttonEl.textContent === "") {
          btn.setButtonText(text.confirmRemoval);
        } else {
          this.plugin.betaPlugins.deletePlugin(repository);
          this.update();
        }
      });
    });
  }
  renderTrackedThemeSetting(setting, theme) {
    const text = getTranslations().settings.betaThemeList;
    setting.setName(createGitHubResourceLink(theme.repo));
    setting.settingEl.addClass("brat-theme-item");
    setting.addExtraButton((btn) => {
      btn.setIcon("copy").setTooltip(text.copyThemeIdentifier).onClick(async () => {
        await this.copyRepoIdentifier(theme.repo);
      });
    });
    setting.addButton((btn) => {
      btn.setIcon("cross").setTooltip(text.deleteThisBetaTheme).setWarning().onClick(() => {
        if (btn.buttonEl.textContent === "") {
          btn.setButtonText(text.confirmRemoval);
        } else {
          themeDelete(this.plugin, theme.repo);
          this.update();
        }
      });
    });
  }
  renderPersonalAccessTokenSetting(setting) {
    const text = getTranslations().settings.githubPersonalAccessToken;
    let currentTokenValue = "";
    this.accessTokenSetting = new import_obsidian13.SecretComponent(this.plugin.app, setting.controlEl);
    this.accessTokenSetting.setValue(this.plugin.settings.globalTokenName || "").onChange((secretName) => {
      void (async () => {
        const normalizedName = (secretName == null ? void 0 : secretName.trim()) || "";
        this.plugin.settings.globalTokenName = normalizedName;
        await this.plugin.saveSettings();
        if (normalizedName) {
          currentTokenValue = this.plugin.app.secretStorage.getSecret(normalizedName) || "";
          await this.validateGlobalTokenAndUpdateButton(currentTokenValue);
        } else {
          currentTokenValue = "";
          await this.validateGlobalTokenAndUpdateButton("");
        }
      })();
    });
    if (this.plugin.settings.globalTokenName) {
      currentTokenValue = this.plugin.app.secretStorage.getSecret(this.plugin.settings.globalTokenName) || "";
    }
    setting.addExtraButton((cb) => {
      cb.setIcon("cross").setTooltip(text.clearPersonalAccessToken).onClick(async () => {
        var _a;
        this.plugin.settings.globalTokenName = "";
        await this.plugin.saveSettings();
        (_a = this.accessTokenSetting) == null ? void 0 : _a.setValue("");
        currentTokenValue = "";
        await this.validateGlobalTokenAndUpdateButton("");
      });
    }).addButton((btn) => {
      this.accessTokenButton = btn;
      btn.setButtonText(text.validate).setCta().onClick(async () => {
        if (currentTokenValue) {
          await this.validateGlobalTokenAndUpdateButton(currentTokenValue);
        }
      });
    }).then(() => {
      void this.validateGlobalTokenAndUpdateButton(currentTokenValue);
    });
    return () => {
      this.accessTokenSetting = null;
      this.accessTokenButton = null;
    };
  }
  createListSearch(placeholder) {
    if (!(0, import_obsidian13.requireApiVersion)("1.13.1")) {
      return void 0;
    }
    return {
      placeholder,
      match: (def, query) => {
        var _a;
        const normalizedQuery = query.toLowerCase().trim();
        if (normalizedQuery === "") {
          return true;
        }
        const descriptionText = typeof def.desc === "string" ? def.desc : ((_a = def.desc) == null ? void 0 : _a.textContent) || "";
        const searchText = [def.name, descriptionText, ...def.aliases || []].join(" ").toLowerCase();
        return searchText.includes(normalizedQuery);
      }
    };
  }
  async validateGlobalTokenAndUpdateButton(token) {
    if (!this.accessTokenButton) {
      return false;
    }
    const text = getTranslations();
    const validateButton = this.accessTokenButton;
    validateButton.buttonEl.removeClass("mod-warning");
    validateButton.setTooltip("");
    if (!token) {
      validateButton.setButtonText(text.settings.githubPersonalAccessToken.validate);
      validateButton.setDisabled(true);
      return false;
    }
    try {
      const tokenInfo = await validateGitHubToken(token);
      if (tokenInfo.validToken) {
        validateButton.setButtonText(text.addBetaPluginModal.buttons.valid).setCta();
        validateButton.setDisabled(true);
        validateButton.setTooltip(this.buildTokenValidationTooltip(tokenInfo));
        return true;
      }
      validateButton.setButtonText(text.addBetaPluginModal.buttons.invalid);
      validateButton.buttonEl.addClass("mod-warning");
      validateButton.setDisabled(false);
      validateButton.setTooltip(tokenInfo.error.message);
      return false;
    } catch (error) {
      console.error("Token validation error:", error);
      validateButton.setButtonText(text.addBetaPluginModal.buttons.invalid);
      validateButton.buttonEl.addClass("mod-warning");
      validateButton.setDisabled(false);
      validateButton.setTooltip("Failed to validate token");
      return false;
    }
  }
  buildTokenValidationTooltip(tokenInfo) {
    var _a;
    const tooltipLines = [];
    if ((_a = tokenInfo.currentScopes) == null ? void 0 : _a.length) {
      tooltipLines.push(`Scopes: ${tokenInfo.currentScopes.join(", ")}`);
    }
    if (tokenInfo.rateLimit) {
      tooltipLines.push(`Rate Limit: ${tokenInfo.rateLimit.remaining}/${tokenInfo.rateLimit.limit}`);
    }
    return tooltipLines.join("\n");
  }
};

// src/utils/BratAPI.ts
var BratAPI = class {
  constructor(plugin) {
    this.console = (logDescription, ...outputs) => {
      console.debug(`BRAT: ${logDescription}`, ...outputs);
    };
    this.themes = {
      themeseCheckAndUpates: async (showInfo) => {
        await themesCheckAndUpdates(this.plugin, showInfo);
      },
      themeInstallTheme: async (cssGithubRepository) => {
        const scrubbedAddress = cssGithubRepository.replace(
          "https://github.com/",
          ""
        );
        await themeSave(this.plugin, scrubbedAddress, true);
      },
      themesDelete: (cssGithubRepository) => {
        const scrubbedAddress = cssGithubRepository.replace(
          "https://github.com/",
          ""
        );
        themeDelete(this.plugin, scrubbedAddress);
      },
      grabCommmunityThemeCssFile: async (repositoryPath, betaVersion = false) => {
        return await grabCommmunityThemeCssFile(
          repositoryPath,
          betaVersion,
          this.plugin.settings.debuggingMode
        );
      },
      grabChecksumOfThemeCssFile: async (repositoryPath, betaVersion = false) => {
        return await grabChecksumOfThemeCssFile(
          repositoryPath,
          betaVersion,
          this.plugin.settings.debuggingMode
        );
      },
      grabLastCommitDateForFile: async (repositoryPath, path) => {
        return await grabLastCommitDateForFile(repositoryPath, path);
      }
    };
    this.plugin = plugin;
  }
};

// src/utils/logging.ts
var import_obsidian14 = require("obsidian");
var DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
function getDailyNoteFormat(plugin) {
  var _a, _b, _c, _d, _e;
  const periodicNotes = plugin.app.plugins.getPlugin(
    "periodic-notes"
  );
  const periodicDailySettings = (_a = periodicNotes == null ? void 0 : periodicNotes.settings) == null ? void 0 : _a.daily;
  if (periodicDailySettings == null ? void 0 : periodicDailySettings.enabled) {
    return (_b = periodicDailySettings.format) != null ? _b : DEFAULT_DAILY_NOTE_FORMAT;
  }
  const dailyNotes = plugin.app.internalPlugins.getPluginById(
    "daily-notes"
  );
  return (_e = (_d = (_c = dailyNotes == null ? void 0 : dailyNotes.instance) == null ? void 0 : _c.options) == null ? void 0 : _d.format) != null ? _e : DEFAULT_DAILY_NOTE_FORMAT;
}
async function logger(plugin, textToLog, verboseLoggingOn = false) {
  if (plugin.settings.debuggingMode) console.debug(`BRAT: ${textToLog}`);
  if (plugin.settings.loggingEnabled) {
    if (!plugin.settings.loggingVerboseEnabled && verboseLoggingOn) return;
    const fileName = `${plugin.settings.loggingPath}.md`;
    const now = import_obsidian14.moment.unix(Math.floor(Date.now() / 1e3));
    const dateOutput = `[[${now.format(getDailyNoteFormat(plugin)).toString()}]] ${now.format("HH:mm")}`;
    const os = import_obsidian14.Platform.isDesktop ? window.require("os") : null;
    const machineName = import_obsidian14.Platform.isDesktop ? os == null ? void 0 : os.hostname() : "MOBILE";
    const output = `${dateOutput} ${machineName} ${textToLog.replace("\n", " ")}
`;
    const file = plugin.app.vault.getAbstractFileByPath(fileName);
    if (!(file instanceof import_obsidian14.TFile)) {
      await plugin.app.vault.create(fileName, output);
    } else {
      await plugin.app.vault.append(file, output);
    }
  }
}

// src/main.ts
var BratPlugin = class extends import_obsidian15.Plugin {
  constructor() {
    super(...arguments);
    this.APP_NAME = "BRAT";
    this.APP_ID = "obsidian42-brat";
    this.settings = DEFAULT_SETTINGS;
    this.settingsTab = new BratSettingsTab(this.app, this);
    this.betaPlugins = new BetaPlugins(this);
    this.commands = new PluginCommands(this);
    this.bratApi = new BratAPI(this);
    this.obsidianProtocolHandler = (params) => {
      if (!params.plugin && !params.theme) {
        toastMessage(this, "Could not locate the repository from the URL.", 10);
        return;
      }
      for (const which of ["plugin", "theme"]) {
        if (params[which]) {
          let modal;
          switch (which) {
            case "plugin":
              modal = new AddNewPluginModal(this, this.betaPlugins, true, false, params[which], params.version ? params.version : void 0);
              modal.open();
              break;
            case "theme":
              modal = new AddNewTheme(this);
              modal.address = params[which];
              modal.open();
              break;
          }
          return;
        }
      }
    };
  }
  onload() {
    console.debug(`loading ${this.APP_NAME}`);
    addIcons();
    this.addRibbonIcon("BratIcon", "BRAT", () => {
      this.commands.ribbonDisplayCommands();
    });
    this.loadSettings().then(async () => {
      await migrateTokensToSecretStorage(this.app, this.settings, () => this.saveSettings());
      this.app.workspace.onLayoutReady(() => {
        this.addSettingTab(this.settingsTab);
        this.registerObsidianProtocolHandler("brat", this.obsidianProtocolHandler);
        this.betaPlugins.checkIncompatiblePlugins();
        if (this.settings.updateAtStartup) {
          window.setTimeout(() => {
            void this.betaPlugins.checkForPluginUpdatesAndInstallUpdates(false);
          }, 6e4);
        }
        if (this.settings.updateThemesAtStartup) {
          window.setTimeout(() => {
            void themesCheckAndUpdates(this, false);
          }, 12e4);
        }
        window.setTimeout(() => {
          window.bratAPI = this.bratApi;
        }, 500);
      });
    }).catch((error) => {
      console.error("Failed to load settings:", error);
    });
  }
  async log(textToLog, verbose = false) {
    await logger(this, textToLog, verbose);
  }
  onunload() {
    console.debug(`unloading ${this.APP_NAME}`);
  }
  async loadSettings() {
    const loadedSettings = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedSettings != null ? loadedSettings : {});
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9jb25zdGFudHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9kZWJ1Zy5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL3JlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvcGFyc2Utb3B0aW9ucy5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL2lkZW50aWZpZXJzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvY2xhc3Nlcy9zZW12ZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcGFyc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvdmFsaWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY2xlYW4uanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvaW5jLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2RpZmYuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbWFqb3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbWlub3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcGF0Y2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcHJlcmVsZWFzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb21wYXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3Jjb21wYXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUtbG9vc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY29tcGFyZS1idWlsZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9zb3J0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3Jzb3J0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2d0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2x0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2VxLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL25lcS5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9ndGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbHRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NtcC5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb2VyY2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9scnVjYWNoZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvcmFuZ2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9jbGFzc2VzL2NvbXBhcmF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3RvLWNvbXBhcmF0b3JzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21heC1zYXRpc2Z5aW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21pbi1zYXRpc2Z5aW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21pbi12ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3ZhbGlkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL291dHNpZGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvZ3RyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL2x0ci5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9pbnRlcnNlY3RzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3NpbXBsaWZ5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3N1YnNldC5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2VtdmVyL2luZGV4LmpzIiwgIi4uL3NyYy9tYWluLnRzIiwgIi4uL3NyYy9mZWF0dXJlcy9CZXRhUGx1Z2lucy50cyIsICIuLi9zcmMvdWkvQ29uZmlybU1vZGFsLnRzIiwgIi4uL3NyYy91dGlscy9HaXRIdWJBUElFcnJvcnMudHMiLCAiLi4vc3JjL2ZlYXR1cmVzL2dpdGh1YlV0aWxzLnRzIiwgIi4uL3NyYy9zZXR0aW5ncy50cyIsICIuLi9zcmMvdWkvQWRkTmV3UGx1Z2luTW9kYWwudHMiLCAiLi4vc3JjL3V0aWxzL1Rva2VuVmFsaWRhdG9yLnRzIiwgIi4uL3NyYy91dGlscy91dGlscy50cyIsICIuLi9zcmMvaTE4bi9pbmRleC50cyIsICIuLi9zcmMvaTE4bi9sb2NhbGVzL2RlLnRzIiwgIi4uL3NyYy9pMThuL2xvY2FsZXMvZW4udHMiLCAiLi4vc3JjL2kxOG4vbG9jYWxlcy9qYS50cyIsICIuLi9zcmMvaTE4bi9sb2NhbGVzL3poLWNuLnRzIiwgIi4uL3NyYy91dGlscy9ub3RpZmljYXRpb25zLnRzIiwgIi4uL3NyYy91aS9Qcm9tb3Rpb25hbC50cyIsICIuLi9zcmMvdWkvVmVyc2lvblN1Z2dlc3RNb2RhbC50cyIsICIuLi9zcmMvdXRpbHMvaW50ZXJuZXRjb25uZWN0aW9uLnRzIiwgIi4uL3NyYy9mZWF0dXJlcy90aGVtZXMudHMiLCAiLi4vc3JjL21pZ3JhdGlvbnMudHMiLCAiLi4vc3JjL3VpL0FkZE5ld1RoZW1lLnRzIiwgIi4uL3NyYy91aS9pY29ucy50cyIsICIuLi9zcmMvdWkvR2VuZXJpY0Z1enp5U3VnZ2VzdGVyLnRzIiwgIi4uL3NyYy91aS9QbHVnaW5Db21tYW5kcy50cyIsICIuLi9zcmMvdWkvU2V0dGluZ3NUYWIudHMiLCAiLi4vc3JjL3V0aWxzL0JyYXRBUEkudHMiLCAiLi4vc3JjL3V0aWxzL2xvZ2dpbmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIid1c2Ugc3RyaWN0J1xuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5jb25zdCBTRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJ1xuXG5jb25zdCBNQVhfTEVOR1RIID0gMjU2XG5jb25zdCBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHxcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDkwMDcxOTkyNTQ3NDA5OTFcblxuLy8gTWF4IHNhZmUgc2VnbWVudCBsZW5ndGggZm9yIGNvZXJjaW9uLlxuY29uc3QgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCA9IDE2XG5cbi8vIE1heCBzYWZlIGxlbmd0aCBmb3IgYSBidWlsZCBpZGVudGlmaWVyLiBUaGUgbWF4IGxlbmd0aCBtaW51cyA2IGNoYXJhY3RlcnMgZm9yXG4vLyB0aGUgc2hvcnRlc3QgdmVyc2lvbiB3aXRoIGEgYnVpbGQgMC4wLjArQlVJTEQuXG5jb25zdCBNQVhfU0FGRV9CVUlMRF9MRU5HVEggPSBNQVhfTEVOR1RIIC0gNlxuXG5jb25zdCBSRUxFQVNFX1RZUEVTID0gW1xuICAnbWFqb3InLFxuICAncHJlbWFqb3InLFxuICAnbWlub3InLFxuICAncHJlbWlub3InLFxuICAncGF0Y2gnLFxuICAncHJlcGF0Y2gnLFxuICAncHJlcmVsZWFzZScsXG5dXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBNQVhfTEVOR1RILFxuICBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RILFxuICBNQVhfU0FGRV9CVUlMRF9MRU5HVEgsXG4gIE1BWF9TQUZFX0lOVEVHRVIsXG4gIFJFTEVBU0VfVFlQRVMsXG4gIFNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIEZMQUdfSU5DTFVERV9QUkVSRUxFQVNFOiAwYjAwMSxcbiAgRkxBR19MT09TRTogMGIwMTAsXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGRlYnVnID0gKFxuICB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgcHJvY2Vzcy5lbnYgJiZcbiAgcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKVxuKSA/ICguLi5hcmdzKSA9PiBjb25zb2xlLmVycm9yKCdTRU1WRVInLCAuLi5hcmdzKVxuICA6ICgpID0+IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZGVidWdcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3Qge1xuICBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RILFxuICBNQVhfU0FGRV9CVUlMRF9MRU5HVEgsXG4gIE1BWF9MRU5HVEgsXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuL2RlYnVnJylcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG5jb25zdCByZSA9IGV4cG9ydHMucmUgPSBbXVxuY29uc3Qgc2FmZVJlID0gZXhwb3J0cy5zYWZlUmUgPSBbXVxuY29uc3Qgc3JjID0gZXhwb3J0cy5zcmMgPSBbXVxuY29uc3Qgc2FmZVNyYyA9IGV4cG9ydHMuc2FmZVNyYyA9IFtdXG5jb25zdCB0ID0gZXhwb3J0cy50ID0ge31cbmxldCBSID0gMFxuXG5jb25zdCBMRVRURVJEQVNITlVNQkVSID0gJ1thLXpBLVowLTktXSdcblxuLy8gUmVwbGFjZSBzb21lIGdyZWVkeSByZWdleCB0b2tlbnMgdG8gcHJldmVudCByZWdleCBkb3MgaXNzdWVzLiBUaGVzZSByZWdleCBhcmVcbi8vIHVzZWQgaW50ZXJuYWxseSB2aWEgdGhlIHNhZmVSZSBvYmplY3Qgc2luY2UgYWxsIGlucHV0cyBpbiB0aGlzIGxpYnJhcnkgZ2V0XG4vLyBub3JtYWxpemVkIGZpcnN0IHRvIHRyaW0gYW5kIGNvbGxhcHNlIGFsbCBleHRyYSB3aGl0ZXNwYWNlLiBUaGUgb3JpZ2luYWxcbi8vIHJlZ2V4ZXMgYXJlIGV4cG9ydGVkIGZvciB1c2VybGFuZCBjb25zdW1wdGlvbiBhbmQgbG93ZXIgbGV2ZWwgdXNhZ2UuIEFcbi8vIGZ1dHVyZSBicmVha2luZyBjaGFuZ2UgY291bGQgZXhwb3J0IHRoZSBzYWZlciByZWdleCBvbmx5IHdpdGggYSBub3RlIHRoYXRcbi8vIGFsbCBpbnB1dCBzaG91bGQgaGF2ZSBleHRyYSB3aGl0ZXNwYWNlIHJlbW92ZWQuXG5jb25zdCBzYWZlUmVnZXhSZXBsYWNlbWVudHMgPSBbXG4gIFsnXFxcXHMnLCAxXSxcbiAgWydcXFxcZCcsIE1BWF9MRU5HVEhdLFxuICBbTEVUVEVSREFTSE5VTUJFUiwgTUFYX1NBRkVfQlVJTERfTEVOR1RIXSxcbl1cblxuY29uc3QgbWFrZVNhZmVSZWdleCA9ICh2YWx1ZSkgPT4ge1xuICBmb3IgKGNvbnN0IFt0b2tlbiwgbWF4XSBvZiBzYWZlUmVnZXhSZXBsYWNlbWVudHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlXG4gICAgICAuc3BsaXQoYCR7dG9rZW59KmApLmpvaW4oYCR7dG9rZW59ezAsJHttYXh9fWApXG4gICAgICAuc3BsaXQoYCR7dG9rZW59K2ApLmpvaW4oYCR7dG9rZW59ezEsJHttYXh9fWApXG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59XG5cbmNvbnN0IGNyZWF0ZVRva2VuID0gKG5hbWUsIHZhbHVlLCBpc0dsb2JhbCkgPT4ge1xuICBjb25zdCBzYWZlID0gbWFrZVNhZmVSZWdleCh2YWx1ZSlcbiAgY29uc3QgaW5kZXggPSBSKytcbiAgZGVidWcobmFtZSwgaW5kZXgsIHZhbHVlKVxuICB0W25hbWVdID0gaW5kZXhcbiAgc3JjW2luZGV4XSA9IHZhbHVlXG4gIHNhZmVTcmNbaW5kZXhdID0gc2FmZVxuICByZVtpbmRleF0gPSBuZXcgUmVnRXhwKHZhbHVlLCBpc0dsb2JhbCA/ICdnJyA6IHVuZGVmaW5lZClcbiAgc2FmZVJlW2luZGV4XSA9IG5ldyBSZWdFeHAoc2FmZSwgaXNHbG9iYWwgPyAnZycgOiB1bmRlZmluZWQpXG59XG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUicsICcwfFsxLTldXFxcXGQqJylcbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUkxPT1NFJywgJ1xcXFxkKycpXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbmNyZWF0ZVRva2VuKCdOT05OVU1FUklDSURFTlRJRklFUicsIGBcXFxcZCpbYS16QS1aLV0ke0xFVFRFUkRBU0hOVU1CRVJ9KmApXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG5jcmVhdGVUb2tlbignTUFJTlZFUlNJT04nLCBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfSlcXFxcLmAgK1xuICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pYClcblxuY3JlYXRlVG9rZW4oJ01BSU5WRVJTSU9OTE9PU0UnLCBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KWApXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cbi8vIE5vbi1udW1lcmljIGlkZW50aWZpZXJzIGluY2x1ZGUgbnVtZXJpYyBpZGVudGlmaWVycyBidXQgY2FuIGJlIGxvbmdlci5cbi8vIFRoZXJlZm9yZSBub24tbnVtZXJpYyBpZGVudGlmaWVycyBtdXN0IGdvIGZpcnN0LlxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUlERU5USUZJRVInLCBgKD86JHtzcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl1cbn18JHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KWApXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFJywgYCg/OiR7c3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdXG59fCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KWApXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0UnLCBgKD86LSgke3NyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSXVxufSg/OlxcXFwuJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl19KSopKWApXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFTE9PU0UnLCBgKD86LT8oJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXVxufSg/OlxcXFwuJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXX0pKikpYClcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxuY3JlYXRlVG9rZW4oJ0JVSUxESURFTlRJRklFUicsIGAke0xFVFRFUkRBU0hOVU1CRVJ9K2ApXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhXG4vLyBQbHVzIHNpZ24sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIHBlcmlvZC1zZXBhcmF0ZWQgYnVpbGQgbWV0YWRhdGFcbi8vIGlkZW50aWZpZXJzLlxuXG5jcmVhdGVUb2tlbignQlVJTEQnLCBgKD86XFxcXCsoJHtzcmNbdC5CVUlMRElERU5USUZJRVJdXG59KD86XFxcXC4ke3NyY1t0LkJVSUxESURFTlRJRklFUl19KSopKWApXG5cbi8vICMjIEZ1bGwgVmVyc2lvbiBTdHJpbmdcbi8vIEEgbWFpbiB2ZXJzaW9uLCBmb2xsb3dlZCBvcHRpb25hbGx5IGJ5IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiBhbmRcbi8vIGJ1aWxkIG1ldGFkYXRhLlxuXG4vLyBOb3RlIHRoYXQgdGhlIG9ubHkgbWFqb3IsIG1pbm9yLCBwYXRjaCwgYW5kIHByZS1yZWxlYXNlIHNlY3Rpb25zIG9mXG4vLyB0aGUgdmVyc2lvbiBzdHJpbmcgYXJlIGNhcHR1cmluZyBncm91cHMuICBUaGUgYnVpbGQgbWV0YWRhdGEgaXMgbm90IGFcbi8vIGNhcHR1cmluZyBncm91cCwgYmVjYXVzZSBpdCBzaG91bGQgbm90IGV2ZXIgYmUgdXNlZCBpbiB2ZXJzaW9uXG4vLyBjb21wYXJpc29uLlxuXG5jcmVhdGVUb2tlbignRlVMTFBMQUlOJywgYHY/JHtzcmNbdC5NQUlOVkVSU0lPTl1cbn0ke3NyY1t0LlBSRVJFTEVBU0VdfT8ke1xuICBzcmNbdC5CVUlMRF19P2ApXG5cbmNyZWF0ZVRva2VuKCdGVUxMJywgYF4ke3NyY1t0LkZVTExQTEFJTl19JGApXG5cbi8vIGxpa2UgZnVsbCwgYnV0IGFsbG93cyB2MS4yLjMgYW5kID0xLjIuMywgd2hpY2ggcGVvcGxlIGRvIHNvbWV0aW1lcy5cbi8vIGFsc28sIDEuMC4wYWxwaGExIChwcmVyZWxlYXNlIHdpdGhvdXQgdGhlIGh5cGhlbikgd2hpY2ggaXMgcHJldHR5XG4vLyBjb21tb24gaW4gdGhlIG5wbSByZWdpc3RyeS5cbmNyZWF0ZVRva2VuKCdMT09TRVBMQUlOJywgYFt2PVxcXFxzXSoke3NyY1t0Lk1BSU5WRVJTSU9OTE9PU0VdXG59JHtzcmNbdC5QUkVSRUxFQVNFTE9PU0VdfT8ke1xuICBzcmNbdC5CVUlMRF19P2ApXG5cbmNyZWF0ZVRva2VuKCdMT09TRScsIGBeJHtzcmNbdC5MT09TRVBMQUlOXX0kYClcblxuY3JlYXRlVG9rZW4oJ0dUTFQnLCAnKCg/Ojx8Pik/PT8pJylcblxuLy8gU29tZXRoaW5nIGxpa2UgXCIyLipcIiBvciBcIjEuMi54XCIuXG4vLyBOb3RlIHRoYXQgXCJ4LnhcIiBpcyBhIHZhbGlkIHhSYW5nZSBpZGVudGlmZXIsIG1lYW5pbmcgXCJhbnkgdmVyc2lvblwiXG4vLyBPbmx5IHRoZSBmaXJzdCBpdGVtIGlzIHN0cmljdGx5IHJlcXVpcmVkLlxuY3JlYXRlVG9rZW4oJ1hSQU5HRUlERU5USUZJRVJMT09TRScsIGAke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdfXx4fFh8XFxcXCpgKVxuY3JlYXRlVG9rZW4oJ1hSQU5HRUlERU5USUZJRVInLCBgJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19fHh8WHxcXFxcKmApXG5cbmNyZWF0ZVRva2VuKCdYUkFOR0VQTEFJTicsIGBbdj1cXFxcc10qKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJdfSlgICtcbiAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYCg/OiR7c3JjW3QuUFJFUkVMRUFTRV19KT8ke1xuICAgICAgICAgICAgICAgICAgICAgc3JjW3QuQlVJTERdfT9gICtcbiAgICAgICAgICAgICAgICAgICBgKT8pP2ApXG5cbmNyZWF0ZVRva2VuKCdYUkFOR0VQTEFJTkxPT1NFJywgYFt2PVxcXFxzXSooJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKD86JHtzcmNbdC5QUkVSRUxFQVNFTE9PU0VdfSk/JHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjW3QuQlVJTERdfT9gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGApPyk/YClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRScsIGBeJHtzcmNbdC5HVExUXX1cXFxccyoke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdYUkFOR0VMT09TRScsIGBeJHtzcmNbdC5HVExUXX1cXFxccyoke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSRgKVxuXG4vLyBDb2VyY2lvbi5cbi8vIEV4dHJhY3QgYW55dGhpbmcgdGhhdCBjb3VsZCBjb25jZWl2YWJseSBiZSBhIHBhcnQgb2YgYSB2YWxpZCBzZW12ZXJcbmNyZWF0ZVRva2VuKCdDT0VSQ0VQTEFJTicsIGAkeycoXnxbXlxcXFxkXSknICtcbiAgICAgICAgICAgICAgJyhcXFxcZHsxLCd9JHtNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIfX0pYCArXG4gICAgICAgICAgICAgIGAoPzpcXFxcLihcXFxcZHsxLCR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KSk/YCArXG4gICAgICAgICAgICAgIGAoPzpcXFxcLihcXFxcZHsxLCR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KSk/YClcbmNyZWF0ZVRva2VuKCdDT0VSQ0UnLCBgJHtzcmNbdC5DT0VSQ0VQTEFJTl19KD86JHxbXlxcXFxkXSlgKVxuY3JlYXRlVG9rZW4oJ0NPRVJDRUZVTEwnLCBzcmNbdC5DT0VSQ0VQTEFJTl0gK1xuICAgICAgICAgICAgICBgKD86JHtzcmNbdC5QUkVSRUxFQVNFXX0pP2AgK1xuICAgICAgICAgICAgICBgKD86JHtzcmNbdC5CVUlMRF19KT9gICtcbiAgICAgICAgICAgICAgYCg/OiR8W15cXFxcZF0pYClcbmNyZWF0ZVRva2VuKCdDT0VSQ0VSVEwnLCBzcmNbdC5DT0VSQ0VdLCB0cnVlKVxuY3JlYXRlVG9rZW4oJ0NPRVJDRVJUTEZVTEwnLCBzcmNbdC5DT0VSQ0VGVUxMXSwgdHJ1ZSlcblxuLy8gVGlsZGUgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcInJlYXNvbmFibHkgYXQgb3IgZ3JlYXRlciB0aGFuXCJcbmNyZWF0ZVRva2VuKCdMT05FVElMREUnLCAnKD86fj4/KScpXG5cbmNyZWF0ZVRva2VuKCdUSUxERVRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkxPTkVUSUxERV19XFxcXHMrYCwgdHJ1ZSlcbmV4cG9ydHMudGlsZGVUcmltUmVwbGFjZSA9ICckMX4nXG5cbmNyZWF0ZVRva2VuKCdUSUxERScsIGBeJHtzcmNbdC5MT05FVElMREVdfSR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ1RJTERFTE9PU0UnLCBgXiR7c3JjW3QuTE9ORVRJTERFXX0ke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSRgKVxuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxuY3JlYXRlVG9rZW4oJ0xPTkVDQVJFVCcsICcoPzpcXFxcXiknKVxuXG5jcmVhdGVUb2tlbignQ0FSRVRUUklNJywgYChcXFxccyopJHtzcmNbdC5MT05FQ0FSRVRdfVxcXFxzK2AsIHRydWUpXG5leHBvcnRzLmNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJ1xuXG5jcmVhdGVUb2tlbignQ0FSRVQnLCBgXiR7c3JjW3QuTE9ORUNBUkVUXX0ke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdDQVJFVExPT1NFJywgYF4ke3NyY1t0LkxPTkVDQVJFVF19JHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0kYClcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbmNyZWF0ZVRva2VuKCdDT01QQVJBVE9STE9PU0UnLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqKCR7c3JjW3QuTE9PU0VQTEFJTl19KSR8XiRgKVxuY3JlYXRlVG9rZW4oJ0NPTVBBUkFUT1InLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqKCR7c3JjW3QuRlVMTFBMQUlOXX0pJHxeJGApXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG5jcmVhdGVUb2tlbignQ09NUEFSQVRPUlRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkdUTFRdXG59XFxcXHMqKCR7c3JjW3QuTE9PU0VQTEFJTl19fCR7c3JjW3QuWFJBTkdFUExBSU5dfSlgLCB0cnVlKVxuZXhwb3J0cy5jb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxuY3JlYXRlVG9rZW4oJ0hZUEhFTlJBTkdFJywgYF5cXFxccyooJHtzcmNbdC5YUkFOR0VQTEFJTl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGBcXFxccystXFxcXHMrYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0LlhSQU5HRVBMQUlOXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYFxcXFxzKiRgKVxuXG5jcmVhdGVUb2tlbignSFlQSEVOUkFOR0VMT09TRScsIGBeXFxcXHMqKCR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFxcXFxzKy1cXFxccytgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgXFxcXHMqJGApXG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbmNyZWF0ZVRva2VuKCdTVEFSJywgJyg8fD4pPz0/XFxcXHMqXFxcXConKVxuLy8gPj0wLjAuMCBpcyBsaWtlIGEgc3RhclxuY3JlYXRlVG9rZW4oJ0dURTAnLCAnXlxcXFxzKj49XFxcXHMqMFxcXFwuMFxcXFwuMFxcXFxzKiQnKVxuY3JlYXRlVG9rZW4oJ0dURTBQUkUnLCAnXlxcXFxzKj49XFxcXHMqMFxcXFwuMFxcXFwuMC0wXFxcXHMqJCcpXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbi8vIHBhcnNlIG91dCBqdXN0IHRoZSBvcHRpb25zIHdlIGNhcmUgYWJvdXRcbmNvbnN0IGxvb3NlT3B0aW9uID0gT2JqZWN0LmZyZWV6ZSh7IGxvb3NlOiB0cnVlIH0pXG5jb25zdCBlbXB0eU9wdHMgPSBPYmplY3QuZnJlZXplKHsgfSlcbmNvbnN0IHBhcnNlT3B0aW9ucyA9IG9wdGlvbnMgPT4ge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gZW1wdHlPcHRzXG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGxvb3NlT3B0aW9uXG4gIH1cblxuICByZXR1cm4gb3B0aW9uc1xufVxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZU9wdGlvbnNcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgbnVtZXJpYyA9IC9eWzAtOV0rJC9cbmNvbnN0IGNvbXBhcmVJZGVudGlmaWVycyA9IChhLCBiKSA9PiB7XG4gIGlmICh0eXBlb2YgYSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGIgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGEgPT09IGIgPyAwIDogYSA8IGIgPyAtMSA6IDFcbiAgfVxuXG4gIGNvbnN0IGFudW0gPSBudW1lcmljLnRlc3QoYSlcbiAgY29uc3QgYm51bSA9IG51bWVyaWMudGVzdChiKVxuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2FcbiAgICBiID0gK2JcbiAgfVxuXG4gIHJldHVybiBhID09PSBiID8gMFxuICAgIDogKGFudW0gJiYgIWJudW0pID8gLTFcbiAgICA6IChibnVtICYmICFhbnVtKSA/IDFcbiAgICA6IGEgPCBiID8gLTFcbiAgICA6IDFcbn1cblxuY29uc3QgcmNvbXBhcmVJZGVudGlmaWVycyA9IChhLCBiKSA9PiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVycyxcbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9kZWJ1ZycpXG5jb25zdCB7IE1BWF9MRU5HVEgsIE1BWF9TQUZFX0lOVEVHRVIgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NvbnN0YW50cycpXG5jb25zdCB7IHNhZmVSZTogcmUsIHQgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCB7IGNvbXBhcmVJZGVudGlmaWVycyB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaWRlbnRpZmllcnMnKVxuY2xhc3MgU2VtVmVyIHtcbiAgY29uc3RydWN0b3IgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgICAgaWYgKHZlcnNpb24ubG9vc2UgPT09ICEhb3B0aW9ucy5sb29zZSAmJlxuICAgICAgICB2ZXJzaW9uLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb25cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB2ZXJzaW9uLiBNdXN0IGJlIGEgc3RyaW5nLiBHb3QgdHlwZSBcIiR7dHlwZW9mIHZlcnNpb259XCIuYClcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgdmVyc2lvbiBpcyBsb25nZXIgdGhhbiAke01BWF9MRU5HVEh9IGNoYXJhY3RlcnNgXG4gICAgICApXG4gICAgfVxuXG4gICAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgICAvLyB0aGlzIGlzbid0IGFjdHVhbGx5IHJlbGV2YW50IGZvciB2ZXJzaW9ucywgYnV0IGtlZXAgaXQgc28gdGhhdCB3ZVxuICAgIC8vIGRvbid0IHJ1biBpbnRvIHRyb3VibGUgcGFzc2luZyB0aGlzLm9wdGlvbnMgYXJvdW5kLlxuICAgIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAgIGNvbnN0IG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChvcHRpb25zLmxvb3NlID8gcmVbdC5MT09TRV0gOiByZVt0LkZVTExdKVxuXG4gICAgaWYgKCFtKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFZlcnNpb246ICR7dmVyc2lvbn1gKVxuICAgIH1cblxuICAgIHRoaXMucmF3ID0gdmVyc2lvblxuXG4gICAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgICB0aGlzLm1ham9yID0gK21bMV1cbiAgICB0aGlzLm1pbm9yID0gK21bMl1cbiAgICB0aGlzLnBhdGNoID0gK21bM11cblxuICAgIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtYWpvciB2ZXJzaW9uJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWlub3IgdmVyc2lvbicpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuICAgIH1cblxuICAgIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICAgIGlmICghbVs0XSkge1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcCgoaWQpID0+IHtcbiAgICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgICBjb25zdCBudW0gPSAraWRcbiAgICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgICAgcmV0dXJuIG51bVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWRcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXVxuICAgIHRoaXMuZm9ybWF0KClcbiAgfVxuXG4gIGZvcm1hdCAoKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMucGF0Y2h9YFxuICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb24gKz0gYC0ke3RoaXMucHJlcmVsZWFzZS5qb2luKCcuJyl9YFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvblxuICB9XG5cbiAgY29tcGFyZSAob3RoZXIpIHtcbiAgICBkZWJ1ZygnU2VtVmVyLmNvbXBhcmUnLCB0aGlzLnZlcnNpb24sIHRoaXMub3B0aW9ucywgb3RoZXIpXG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBpZiAodHlwZW9mIG90aGVyID09PSAnc3RyaW5nJyAmJiBvdGhlciA9PT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICBpZiAob3RoZXIudmVyc2lvbiA9PT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpXG4gIH1cblxuICBjb21wYXJlTWFpbiAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIGlmICh0aGlzLm1ham9yIDwgb3RoZXIubWFqb3IpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICBpZiAodGhpcy5tYWpvciA+IG90aGVyLm1ham9yKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH1cbiAgICBpZiAodGhpcy5taW5vciA8IG90aGVyLm1pbm9yKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgaWYgKHRoaXMubWlub3IgPiBvdGhlci5taW5vcikge1xuICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgaWYgKHRoaXMucGF0Y2ggPCBvdGhlci5wYXRjaCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIGlmICh0aGlzLnBhdGNoID4gb3RoZXIucGF0Y2gpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cblxuICBjb21wYXJlUHJlIChvdGhlcikge1xuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIGxldCBpID0gMFxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLnByZXJlbGVhc2VbaV1cbiAgICAgIGNvbnN0IGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldXG4gICAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYilcbiAgICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9IGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMVxuICAgICAgfSBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9IGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYilcbiAgICAgIH1cbiAgICB9IHdoaWxlICgrK2kpXG4gIH1cblxuICBjb21wYXJlQnVpbGQgKG90aGVyKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICBsZXQgaSA9IDBcbiAgICBkbyB7XG4gICAgICBjb25zdCBhID0gdGhpcy5idWlsZFtpXVxuICAgICAgY29uc3QgYiA9IG90aGVyLmJ1aWxkW2ldXG4gICAgICBkZWJ1ZygnYnVpbGQgY29tcGFyZScsIGksIGEsIGIpXG4gICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgICB9XG4gICAgfSB3aGlsZSAoKytpKVxuICB9XG5cbiAgLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuICAvLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG4gIGluYyAocmVsZWFzZSwgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpIHtcbiAgICBpZiAocmVsZWFzZS5zdGFydHNXaXRoKCdwcmUnKSkge1xuICAgICAgaWYgKCFpZGVudGlmaWVyICYmIGlkZW50aWZpZXJCYXNlID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5jcmVtZW50IGFyZ3VtZW50OiBpZGVudGlmaWVyIGlzIGVtcHR5JylcbiAgICAgIH1cbiAgICAgIC8vIEF2b2lkIGFuIGludmFsaWQgc2VtdmVyIHJlc3VsdHNcbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gYC0ke2lkZW50aWZpZXJ9YC5tYXRjaCh0aGlzLm9wdGlvbnMubG9vc2UgPyByZVt0LlBSRVJFTEVBU0VMT09TRV0gOiByZVt0LlBSRVJFTEVBU0VdKVxuICAgICAgICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdICE9PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlkZW50aWZpZXI6ICR7aWRlbnRpZmllcn1gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICAgIHRoaXMubWFqb3IrK1xuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICAgIHRoaXMubWlub3IrK1xuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKVxuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG4gICAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAgIC8vIHByZXBhdGNoLlxuICAgICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB2ZXJzaW9uICR7dGhpcy5yYXd9IGlzIG5vdCBhIHByZXJlbGVhc2VgKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ21ham9yJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlub3InOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgICAvLyAxLjAuMCAncHJlJyB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgICAgY2FzZSAncHJlJzoge1xuICAgICAgICBjb25zdCBiYXNlID0gTnVtYmVyKGlkZW50aWZpZXJCYXNlKSA/IDEgOiAwXG5cbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbYmFzZV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGhcbiAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rK1xuICAgICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgICBpZiAoaWRlbnRpZmllciA9PT0gdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKSAmJiBpZGVudGlmaWVyQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogaWRlbnRpZmllciBhbHJlYWR5IGV4aXN0cycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaChiYXNlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgICBsZXQgcHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCBiYXNlXVxuICAgICAgICAgIGlmIChpZGVudGlmaWVyQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByZXJlbGVhc2UgPSBbaWRlbnRpZmllcl1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnByZXJlbGVhc2VbMF0sIGlkZW50aWZpZXIpID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBwcmVyZWxlYXNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICR7cmVsZWFzZX1gKVxuICAgIH1cbiAgICB0aGlzLnJhdyA9IHRoaXMuZm9ybWF0KClcbiAgICBpZiAodGhpcy5idWlsZC5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmF3ICs9IGArJHt0aGlzLmJ1aWxkLmpvaW4oJy4nKX1gXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgcGFyc2UgPSAodmVyc2lvbiwgb3B0aW9ucywgdGhyb3dFcnJvcnMgPSBmYWxzZSkgPT4ge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmICghdGhyb3dFcnJvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHRocm93IGVyXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgdmFsaWQgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBjb25zdCB2ID0gcGFyc2UodmVyc2lvbiwgb3B0aW9ucylcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBjbGVhbiA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIG9wdGlvbnMpXG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBjbGVhblxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5cbmNvbnN0IGluYyA9ICh2ZXJzaW9uLCByZWxlYXNlLCBvcHRpb25zLCBpZGVudGlmaWVyLCBpZGVudGlmaWVyQmFzZSkgPT4ge1xuICBpZiAodHlwZW9mIChvcHRpb25zKSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZGVudGlmaWVyQmFzZSA9IGlkZW50aWZpZXJcbiAgICBpZGVudGlmaWVyID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWRcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIoXG4gICAgICB2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyID8gdmVyc2lvbi52ZXJzaW9uIDogdmVyc2lvbixcbiAgICAgIG9wdGlvbnNcbiAgICApLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyLCBpZGVudGlmaWVyQmFzZSkudmVyc2lvblxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gaW5jXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZS5qcycpXG5cbmNvbnN0IGRpZmYgPSAodmVyc2lvbjEsIHZlcnNpb24yKSA9PiB7XG4gIGNvbnN0IHYxID0gcGFyc2UodmVyc2lvbjEsIG51bGwsIHRydWUpXG4gIGNvbnN0IHYyID0gcGFyc2UodmVyc2lvbjIsIG51bGwsIHRydWUpXG4gIGNvbnN0IGNvbXBhcmlzb24gPSB2MS5jb21wYXJlKHYyKVxuXG4gIGlmIChjb21wYXJpc29uID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IHYxSGlnaGVyID0gY29tcGFyaXNvbiA+IDBcbiAgY29uc3QgaGlnaFZlcnNpb24gPSB2MUhpZ2hlciA/IHYxIDogdjJcbiAgY29uc3QgbG93VmVyc2lvbiA9IHYxSGlnaGVyID8gdjIgOiB2MVxuICBjb25zdCBoaWdoSGFzUHJlID0gISFoaWdoVmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aFxuICBjb25zdCBsb3dIYXNQcmUgPSAhIWxvd1ZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGhcblxuICBpZiAobG93SGFzUHJlICYmICFoaWdoSGFzUHJlKSB7XG4gICAgLy8gR29pbmcgZnJvbSBwcmVyZWxlYXNlIC0+IG5vIHByZXJlbGVhc2UgcmVxdWlyZXMgc29tZSBzcGVjaWFsIGNhc2luZ1xuXG4gICAgLy8gSWYgdGhlIGxvdyB2ZXJzaW9uIGhhcyBvbmx5IGEgbWFqb3IsIHRoZW4gaXQgd2lsbCBhbHdheXMgYmUgYSBtYWpvclxuICAgIC8vIFNvbWUgZXhhbXBsZXM6XG4gICAgLy8gMS4wLjAtMSAtPiAxLjAuMFxuICAgIC8vIDEuMC4wLTEgLT4gMS4xLjFcbiAgICAvLyAxLjAuMC0xIC0+IDIuMC4wXG4gICAgaWYgKCFsb3dWZXJzaW9uLnBhdGNoICYmICFsb3dWZXJzaW9uLm1pbm9yKSB7XG4gICAgICByZXR1cm4gJ21ham9yJ1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBtYWluIHBhcnQgaGFzIG5vIGRpZmZlcmVuY2VcbiAgICBpZiAobG93VmVyc2lvbi5jb21wYXJlTWFpbihoaWdoVmVyc2lvbikgPT09IDApIHtcbiAgICAgIGlmIChsb3dWZXJzaW9uLm1pbm9yICYmICFsb3dWZXJzaW9uLnBhdGNoKSB7XG4gICAgICAgIHJldHVybiAnbWlub3InXG4gICAgICB9XG4gICAgICByZXR1cm4gJ3BhdGNoJ1xuICAgIH1cbiAgfVxuXG4gIC8vIGFkZCB0aGUgYHByZWAgcHJlZml4IGlmIHdlIGFyZSBnb2luZyB0byBhIHByZXJlbGVhc2UgdmVyc2lvblxuICBjb25zdCBwcmVmaXggPSBoaWdoSGFzUHJlID8gJ3ByZScgOiAnJ1xuXG4gIGlmICh2MS5tYWpvciAhPT0gdjIubWFqb3IpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgJ21ham9yJ1xuICB9XG5cbiAgaWYgKHYxLm1pbm9yICE9PSB2Mi5taW5vcikge1xuICAgIHJldHVybiBwcmVmaXggKyAnbWlub3InXG4gIH1cblxuICBpZiAodjEucGF0Y2ggIT09IHYyLnBhdGNoKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdwYXRjaCdcbiAgfVxuXG4gIC8vIGhpZ2ggYW5kIGxvdyBhcmUgcHJlcmVsZWFzZXNcbiAgcmV0dXJuICdwcmVyZWxlYXNlJ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgbWFqb3IgPSAoYSwgbG9vc2UpID0+IG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yXG5tb2R1bGUuZXhwb3J0cyA9IG1ham9yXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IG1pbm9yID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vclxubW9kdWxlLmV4cG9ydHMgPSBtaW5vclxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBwYXRjaCA9IChhLCBsb29zZSkgPT4gbmV3IFNlbVZlcihhLCBsb29zZSkucGF0Y2hcbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHByZXJlbGVhc2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gKHBhcnNlZCAmJiBwYXJzZWQucHJlcmVsZWFzZS5sZW5ndGgpID8gcGFyc2VkLnByZXJlbGVhc2UgOiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IHByZXJlbGVhc2VcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT5cbiAgbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgcmNvbXBhcmUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYiwgYSwgbG9vc2UpXG5tb2R1bGUuZXhwb3J0cyA9IHJjb21wYXJlXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgY29tcGFyZUxvb3NlID0gKGEsIGIpID0+IGNvbXBhcmUoYSwgYiwgdHJ1ZSlcbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUxvb3NlXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IGNvbXBhcmVCdWlsZCA9IChhLCBiLCBsb29zZSkgPT4ge1xuICBjb25zdCB2ZXJzaW9uQSA9IG5ldyBTZW1WZXIoYSwgbG9vc2UpXG4gIGNvbnN0IHZlcnNpb25CID0gbmV3IFNlbVZlcihiLCBsb29zZSlcbiAgcmV0dXJuIHZlcnNpb25BLmNvbXBhcmUodmVyc2lvbkIpIHx8IHZlcnNpb25BLmNvbXBhcmVCdWlsZCh2ZXJzaW9uQilcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUJ1aWxkXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCBzb3J0ID0gKGxpc3QsIGxvb3NlKSA9PiBsaXN0LnNvcnQoKGEsIGIpID0+IGNvbXBhcmVCdWlsZChhLCBiLCBsb29zZSkpXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZUJ1aWxkID0gcmVxdWlyZSgnLi9jb21wYXJlLWJ1aWxkJylcbmNvbnN0IHJzb3J0ID0gKGxpc3QsIGxvb3NlKSA9PiBsaXN0LnNvcnQoKGEsIGIpID0+IGNvbXBhcmVCdWlsZChiLCBhLCBsb29zZSkpXG5tb2R1bGUuZXhwb3J0cyA9IHJzb3J0XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgZ3QgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMFxubW9kdWxlLmV4cG9ydHMgPSBndFxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGx0ID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDBcbm1vZHVsZS5leHBvcnRzID0gbHRcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBlcSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDBcbm1vZHVsZS5leHBvcnRzID0gZXFcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBuZXEgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwXG5tb2R1bGUuZXhwb3J0cyA9IG5lcVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGd0ZSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMFxubW9kdWxlLmV4cG9ydHMgPSBndGVcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBsdGUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbm1vZHVsZS5leHBvcnRzID0gbHRlXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGVxID0gcmVxdWlyZSgnLi9lcScpXG5jb25zdCBuZXEgPSByZXF1aXJlKCcuL25lcScpXG5jb25zdCBndCA9IHJlcXVpcmUoJy4vZ3QnKVxuY29uc3QgZ3RlID0gcmVxdWlyZSgnLi9ndGUnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuL2x0JylcbmNvbnN0IGx0ZSA9IHJlcXVpcmUoJy4vbHRlJylcblxuY29uc3QgY21wID0gKGEsIG9wLCBiLCBsb29zZSkgPT4ge1xuICBzd2l0Y2ggKG9wKSB7XG4gICAgY2FzZSAnPT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICB9XG4gICAgICByZXR1cm4gYSA9PT0gYlxuXG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICB9XG4gICAgICByZXR1cm4gYSAhPT0gYlxuXG4gICAgY2FzZSAnJzpcbiAgICBjYXNlICc9JzpcbiAgICBjYXNlICc9PSc6XG4gICAgICByZXR1cm4gZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICchPSc6XG4gICAgICByZXR1cm4gbmVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPic6XG4gICAgICByZXR1cm4gZ3QoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+PSc6XG4gICAgICByZXR1cm4gZ3RlKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPCc6XG4gICAgICByZXR1cm4gbHQoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbHRlKGEsIGIsIGxvb3NlKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgb3BlcmF0b3I6ICR7b3B9YClcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBjbXBcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHsgc2FmZVJlOiByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBjb2VyY2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdudW1iZXInKSB7XG4gICAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGxldCBtYXRjaCA9IG51bGxcbiAgaWYgKCFvcHRpb25zLnJ0bCkge1xuICAgIG1hdGNoID0gdmVyc2lvbi5tYXRjaChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gcmVbdC5DT0VSQ0VGVUxMXSA6IHJlW3QuQ09FUkNFXSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGaW5kIHRoZSByaWdodC1tb3N0IGNvZXJjaWJsZSBzdHJpbmcgdGhhdCBkb2VzIG5vdCBzaGFyZVxuICAgIC8vIGEgdGVybWludXMgd2l0aCBhIG1vcmUgbGVmdC13YXJkIGNvZXJjaWJsZSBzdHJpbmcuXG4gICAgLy8gRWcsICcxLjIuMy40JyB3YW50cyB0byBjb2VyY2UgJzIuMy40Jywgbm90ICczLjQnIG9yICc0J1xuICAgIC8vIFdpdGggaW5jbHVkZVByZXJlbGVhc2Ugb3B0aW9uIHNldCwgJzEuMi4zLjQtcmMnIHdhbnRzIHRvIGNvZXJjZSAnMi4zLjQtcmMnLCBub3QgJzIuMy40J1xuICAgIC8vXG4gICAgLy8gV2FsayB0aHJvdWdoIHRoZSBzdHJpbmcgY2hlY2tpbmcgd2l0aCBhIC9nIHJlZ2V4cFxuICAgIC8vIE1hbnVhbGx5IHNldCB0aGUgaW5kZXggc28gYXMgdG8gcGljayB1cCBvdmVybGFwcGluZyBtYXRjaGVzLlxuICAgIC8vIFN0b3Agd2hlbiB3ZSBnZXQgYSBtYXRjaCB0aGF0IGVuZHMgYXQgdGhlIHN0cmluZyBlbmQsIHNpbmNlIG5vXG4gICAgLy8gY29lcmNpYmxlIHN0cmluZyBjYW4gYmUgbW9yZSByaWdodC13YXJkIHdpdGhvdXQgdGhlIHNhbWUgdGVybWludXMuXG4gICAgY29uc3QgY29lcmNlUnRsUmVnZXggPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gcmVbdC5DT0VSQ0VSVExGVUxMXSA6IHJlW3QuQ09FUkNFUlRMXVxuICAgIGxldCBuZXh0XG4gICAgd2hpbGUgKChuZXh0ID0gY29lcmNlUnRsUmVnZXguZXhlYyh2ZXJzaW9uKSkgJiZcbiAgICAgICAgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCAhPT0gdmVyc2lvbi5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBpZiAoIW1hdGNoIHx8XG4gICAgICAgICAgICBuZXh0LmluZGV4ICsgbmV4dFswXS5sZW5ndGggIT09IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoID0gbmV4dFxuICAgICAgfVxuICAgICAgY29lcmNlUnRsUmVnZXgubGFzdEluZGV4ID0gbmV4dC5pbmRleCArIG5leHRbMV0ubGVuZ3RoICsgbmV4dFsyXS5sZW5ndGhcbiAgICB9XG4gICAgLy8gbGVhdmUgaXQgaW4gYSBjbGVhbiBzdGF0ZVxuICAgIGNvZXJjZVJ0bFJlZ2V4Lmxhc3RJbmRleCA9IC0xXG4gIH1cblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgbWFqb3IgPSBtYXRjaFsyXVxuICBjb25zdCBtaW5vciA9IG1hdGNoWzNdIHx8ICcwJ1xuICBjb25zdCBwYXRjaCA9IG1hdGNoWzRdIHx8ICcwJ1xuICBjb25zdCBwcmVyZWxlYXNlID0gb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJiBtYXRjaFs1XSA/IGAtJHttYXRjaFs1XX1gIDogJydcbiAgY29uc3QgYnVpbGQgPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmIG1hdGNoWzZdID8gYCske21hdGNoWzZdfWAgOiAnJ1xuXG4gIHJldHVybiBwYXJzZShgJHttYWpvcn0uJHttaW5vcn0uJHtwYXRjaH0ke3ByZXJlbGVhc2V9JHtidWlsZH1gLCBvcHRpb25zKVxufVxubW9kdWxlLmV4cG9ydHMgPSBjb2VyY2VcbiIsICIndXNlIHN0cmljdCdcblxuY2xhc3MgTFJVQ2FjaGUge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5tYXggPSAxMDAwXG4gICAgdGhpcy5tYXAgPSBuZXcgTWFwKClcbiAgfVxuXG4gIGdldCAoa2V5KSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLm1hcC5nZXQoa2V5KVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUga2V5IGZyb20gdGhlIG1hcCBhbmQgYWRkIGl0IHRvIHRoZSBlbmRcbiAgICAgIHRoaXMubWFwLmRlbGV0ZShrZXkpXG4gICAgICB0aGlzLm1hcC5zZXQoa2V5LCB2YWx1ZSlcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZSAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmRlbGV0ZShrZXkpXG4gIH1cblxuICBzZXQgKGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBkZWxldGVkID0gdGhpcy5kZWxldGUoa2V5KVxuXG4gICAgaWYgKCFkZWxldGVkICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIElmIGNhY2hlIGlzIGZ1bGwsIGRlbGV0ZSB0aGUgbGVhc3QgcmVjZW50bHkgdXNlZCBpdGVtXG4gICAgICBpZiAodGhpcy5tYXAuc2l6ZSA+PSB0aGlzLm1heCkge1xuICAgICAgICBjb25zdCBmaXJzdEtleSA9IHRoaXMubWFwLmtleXMoKS5uZXh0KCkudmFsdWVcbiAgICAgICAgdGhpcy5kZWxldGUoZmlyc3RLZXkpXG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFwLnNldChrZXksIHZhbHVlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMUlVDYWNoZVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTUEFDRV9DSEFSQUNURVJTID0gL1xccysvZ1xuXG4vLyBob2lzdGVkIGNsYXNzIGZvciBjeWNsaWMgZGVwZW5kZW5jeVxuY2xhc3MgUmFuZ2Uge1xuICBjb25zdHJ1Y3RvciAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgICAgaWYgKFxuICAgICAgICByYW5nZS5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgIHJhbmdlLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gcmFuZ2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UucmF3LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyYW5nZSBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICAgIC8vIGp1c3QgcHV0IGl0IGluIHRoZSBzZXQgYW5kIHJldHVyblxuICAgICAgdGhpcy5yYXcgPSByYW5nZS52YWx1ZVxuICAgICAgdGhpcy5zZXQgPSBbW3JhbmdlXV1cbiAgICAgIHRoaXMuZm9ybWF0dGVkID0gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gICAgLy8gRmlyc3QgcmVkdWNlIGFsbCB3aGl0ZXNwYWNlIGFzIG11Y2ggYXMgcG9zc2libGUgc28gd2UgZG8gbm90IGhhdmUgdG8gcmVseVxuICAgIC8vIG9uIHBvdGVudGlhbGx5IHNsb3cgcmVnZXhlcyBsaWtlIFxccyouIFRoaXMgaXMgdGhlbiBzdG9yZWQgYW5kIHVzZWQgZm9yXG4gICAgLy8gZnV0dXJlIGVycm9yIG1lc3NhZ2VzIGFzIHdlbGwuXG4gICAgdGhpcy5yYXcgPSByYW5nZS50cmltKCkucmVwbGFjZShTUEFDRV9DSEFSQUNURVJTLCAnICcpXG5cbiAgICAvLyBGaXJzdCwgc3BsaXQgb24gfHxcbiAgICB0aGlzLnNldCA9IHRoaXMucmF3XG4gICAgICAuc3BsaXQoJ3x8JylcbiAgICAgIC8vIG1hcCB0aGUgcmFuZ2UgdG8gYSAyZCBhcnJheSBvZiBjb21wYXJhdG9yc1xuICAgICAgLm1hcChyID0+IHRoaXMucGFyc2VSYW5nZShyLnRyaW0oKSkpXG4gICAgICAvLyB0aHJvdyBvdXQgYW55IGNvbXBhcmF0b3IgbGlzdHMgdGhhdCBhcmUgZW1wdHlcbiAgICAgIC8vIHRoaXMgZ2VuZXJhbGx5IG1lYW5zIHRoYXQgaXQgd2FzIG5vdCBhIHZhbGlkIHJhbmdlLCB3aGljaCBpcyBhbGxvd2VkXG4gICAgICAvLyBpbiBsb29zZSBtb2RlLCBidXQgd2lsbCBzdGlsbCB0aHJvdyBpZiB0aGUgV0hPTEUgcmFuZ2UgaXMgaW52YWxpZC5cbiAgICAgIC5maWx0ZXIoYyA9PiBjLmxlbmd0aClcblxuICAgIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFNlbVZlciBSYW5nZTogJHt0aGlzLnJhd31gKVxuICAgIH1cblxuICAgIC8vIGlmIHdlIGhhdmUgYW55IHRoYXQgYXJlIG5vdCB0aGUgbnVsbCBzZXQsIHRocm93IG91dCBudWxsIHNldHMuXG4gICAgaWYgKHRoaXMuc2V0Lmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIGtlZXAgdGhlIGZpcnN0IG9uZSwgaW4gY2FzZSB0aGV5J3JlIGFsbCBudWxsIHNldHNcbiAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5zZXRbMF1cbiAgICAgIHRoaXMuc2V0ID0gdGhpcy5zZXQuZmlsdGVyKGMgPT4gIWlzTnVsbFNldChjWzBdKSlcbiAgICAgIGlmICh0aGlzLnNldC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5zZXQgPSBbZmlyc3RdXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhbnkgdGhhdCBhcmUgKiwgdGhlbiB0aGUgcmFuZ2UgaXMganVzdCAqXG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLnNldCkge1xuICAgICAgICAgIGlmIChjLmxlbmd0aCA9PT0gMSAmJiBpc0FueShjWzBdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQgPSBbY11cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtYXR0ZWQgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGdldCByYW5nZSAoKSB7XG4gICAgaWYgKHRoaXMuZm9ybWF0dGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZm9ybWF0dGVkID0gJydcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZWQgKz0gJ3x8J1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBzID0gdGhpcy5zZXRbaV1cbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjb21wcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIGlmIChrID4gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWQgKz0gJyAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZm9ybWF0dGVkICs9IGNvbXBzW2tdLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVkXG4gIH1cblxuICBmb3JtYXQgKCkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VcbiAgfVxuXG4gIHBhcnNlUmFuZ2UgKHJhbmdlKSB7XG4gICAgLy8gbWVtb2l6ZSByYW5nZSBwYXJzaW5nIGZvciBwZXJmb3JtYW5jZS5cbiAgICAvLyB0aGlzIGlzIGEgdmVyeSBob3QgcGF0aCwgYW5kIGZ1bGx5IGRldGVybWluaXN0aWMuXG4gICAgY29uc3QgbWVtb09wdHMgPVxuICAgICAgKHRoaXMub3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJiBGTEFHX0lOQ0xVREVfUFJFUkVMRUFTRSkgfFxuICAgICAgKHRoaXMub3B0aW9ucy5sb29zZSAmJiBGTEFHX0xPT1NFKVxuICAgIGNvbnN0IG1lbW9LZXkgPSBtZW1vT3B0cyArICc6JyArIHJhbmdlXG4gICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KG1lbW9LZXkpXG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZFxuICAgIH1cblxuICAgIGNvbnN0IGxvb3NlID0gdGhpcy5vcHRpb25zLmxvb3NlXG4gICAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gICAgY29uc3QgaHIgPSBsb29zZSA/IHJlW3QuSFlQSEVOUkFOR0VMT09TRV0gOiByZVt0LkhZUEhFTlJBTkdFXVxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSh0aGlzLm9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpKVxuICAgIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKVxuXG4gICAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpXG4gICAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygndGlsZGUgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygnY2FyZXQgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gICAgbGV0IHJhbmdlTGlzdCA9IHJhbmdlXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLm1hcChjb21wID0+IHBhcnNlQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgLmpvaW4oJyAnKVxuICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgIC8vID49MC4wLjAgaXMgZXF1aXZhbGVudCB0byAqXG4gICAgICAubWFwKGNvbXAgPT4gcmVwbGFjZUdURTAoY29tcCwgdGhpcy5vcHRpb25zKSlcblxuICAgIGlmIChsb29zZSkge1xuICAgICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICAgIHJhbmdlTGlzdCA9IHJhbmdlTGlzdC5maWx0ZXIoY29tcCA9PiB7XG4gICAgICAgIGRlYnVnKCdsb29zZSBpbnZhbGlkIGZpbHRlcicsIGNvbXAsIHRoaXMub3B0aW9ucylcbiAgICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChyZVt0LkNPTVBBUkFUT1JMT09TRV0pXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWJ1ZygncmFuZ2UgbGlzdCcsIHJhbmdlTGlzdClcblxuICAgIC8vIGlmIGFueSBjb21wYXJhdG9ycyBhcmUgdGhlIG51bGwgc2V0LCB0aGVuIHJlcGxhY2Ugd2l0aCBKVVNUIG51bGwgc2V0XG4gICAgLy8gaWYgbW9yZSB0aGFuIG9uZSBjb21wYXJhdG9yLCByZW1vdmUgYW55ICogY29tcGFyYXRvcnNcbiAgICAvLyBhbHNvLCBkb24ndCBpbmNsdWRlIHRoZSBzYW1lIGNvbXBhcmF0b3IgbW9yZSB0aGFuIG9uY2VcbiAgICBjb25zdCByYW5nZU1hcCA9IG5ldyBNYXAoKVxuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2VMaXN0Lm1hcChjb21wID0+IG5ldyBDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucykpXG4gICAgZm9yIChjb25zdCBjb21wIG9mIGNvbXBhcmF0b3JzKSB7XG4gICAgICBpZiAoaXNOdWxsU2V0KGNvbXApKSB7XG4gICAgICAgIHJldHVybiBbY29tcF1cbiAgICAgIH1cbiAgICAgIHJhbmdlTWFwLnNldChjb21wLnZhbHVlLCBjb21wKVxuICAgIH1cbiAgICBpZiAocmFuZ2VNYXAuc2l6ZSA+IDEgJiYgcmFuZ2VNYXAuaGFzKCcnKSkge1xuICAgICAgcmFuZ2VNYXAuZGVsZXRlKCcnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IFsuLi5yYW5nZU1hcC52YWx1ZXMoKV1cbiAgICBjYWNoZS5zZXQobWVtb0tleSwgcmVzdWx0KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGludGVyc2VjdHMgKHJhbmdlLCBvcHRpb25zKSB7XG4gICAgaWYgKCEocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgUmFuZ2UgaXMgcmVxdWlyZWQnKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldC5zb21lKCh0aGlzQ29tcGFyYXRvcnMpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGlzU2F0aXNmaWFibGUodGhpc0NvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgICByYW5nZS5zZXQuc29tZSgocmFuZ2VDb21wYXJhdG9ycykgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc1NhdGlzZmlhYmxlKHJhbmdlQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICAgICAgICB0aGlzQ29tcGFyYXRvcnMuZXZlcnkoKHRoaXNDb21wYXJhdG9yKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiByYW5nZUNvbXBhcmF0b3JzLmV2ZXJ5KChyYW5nZUNvbXBhcmF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3IuaW50ZXJzZWN0cyhyYW5nZUNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuICB0ZXN0ICh2ZXJzaW9uKSB7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbiwgdGhpcy5vcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJhbmdlXG5cbmNvbnN0IExSVSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2xydWNhY2hlJylcbmNvbnN0IGNhY2hlID0gbmV3IExSVSgpXG5cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BhcnNlLW9wdGlvbnMnKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4vY29tcGFyYXRvcicpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2RlYnVnJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4vc2VtdmVyJylcbmNvbnN0IHtcbiAgc2FmZVJlOiByZSxcbiAgdCxcbiAgY29tcGFyYXRvclRyaW1SZXBsYWNlLFxuICB0aWxkZVRyaW1SZXBsYWNlLFxuICBjYXJldFRyaW1SZXBsYWNlLFxufSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcbmNvbnN0IHsgRkxBR19JTkNMVURFX1BSRVJFTEVBU0UsIEZMQUdfTE9PU0UgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NvbnN0YW50cycpXG5cbmNvbnN0IGlzTnVsbFNldCA9IGMgPT4gYy52YWx1ZSA9PT0gJzwwLjAuMC0wJ1xuY29uc3QgaXNBbnkgPSBjID0+IGMudmFsdWUgPT09ICcnXG5cbi8vIHRha2UgYSBzZXQgb2YgY29tcGFyYXRvcnMgYW5kIGRldGVybWluZSB3aGV0aGVyIHRoZXJlXG4vLyBleGlzdHMgYSB2ZXJzaW9uIHdoaWNoIGNhbiBzYXRpc2Z5IGl0XG5jb25zdCBpc1NhdGlzZmlhYmxlID0gKGNvbXBhcmF0b3JzLCBvcHRpb25zKSA9PiB7XG4gIGxldCByZXN1bHQgPSB0cnVlXG4gIGNvbnN0IHJlbWFpbmluZ0NvbXBhcmF0b3JzID0gY29tcGFyYXRvcnMuc2xpY2UoKVxuICBsZXQgdGVzdENvbXBhcmF0b3IgPSByZW1haW5pbmdDb21wYXJhdG9ycy5wb3AoKVxuXG4gIHdoaWxlIChyZXN1bHQgJiYgcmVtYWluaW5nQ29tcGFyYXRvcnMubGVuZ3RoKSB7XG4gICAgcmVzdWx0ID0gcmVtYWluaW5nQ29tcGFyYXRvcnMuZXZlcnkoKG90aGVyQ29tcGFyYXRvcikgPT4ge1xuICAgICAgcmV0dXJuIHRlc3RDb21wYXJhdG9yLmludGVyc2VjdHMob3RoZXJDb21wYXJhdG9yLCBvcHRpb25zKVxuICAgIH0pXG5cbiAgICB0ZXN0Q29tcGFyYXRvciA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLnBvcCgpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbmNvbnN0IHBhcnNlQ29tcGFyYXRvciA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGNvbXAgPSBjb21wLnJlcGxhY2UocmVbdC5CVUlMRF0sICcnKVxuICBkZWJ1ZygnY29tcCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdjYXJldCcsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3N0YXJzJywgY29tcClcbiAgcmV0dXJuIGNvbXBcbn1cblxuY29uc3QgaXNYID0gaWQgPT4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonXG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMC0wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMC0wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMC0wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wLTBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjAtMFxuLy8gfjAuMC4xIC0tPiA+PTAuMC4xIDwwLjEuMC0wXG5jb25zdCByZXBsYWNlVGlsZGVzID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIGNvbXBcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KC9cXHMrLylcbiAgICAubWFwKChjKSA9PiByZXBsYWNlVGlsZGUoYywgb3B0aW9ucykpXG4gICAgLmpvaW4oJyAnKVxufVxuXG5jb25zdCByZXBsYWNlVGlsZGUgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuVElMREVMT09TRV0gOiByZVt0LlRJTERFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChfLCBNLCBtLCBwLCBwcikgPT4ge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIGxldCByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uMC4wIDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIC8vIH4xLjIgPT0gPj0xLjIuMCA8MS4zLjAtMFxuICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAgPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZVRpbGRlIHByJywgcHIpXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMC0wXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwXG4gICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfVxuXG4gICAgZGVidWcoJ3RpbGRlIHJldHVybicsIHJldClcbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIF4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyBeMiwgXjIueCwgXjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMC0wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wLTBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjAtMFxuLy8gXjEuMi4zIC0tPiA+PTEuMi4zIDwyLjAuMC0wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wLTBcbi8vIF4wLjAuMSAtLT4gPj0wLjAuMSA8MC4wLjItMFxuLy8gXjAuMS4wIC0tPiA+PTAuMS4wIDwwLjIuMC0wXG5jb25zdCByZXBsYWNlQ2FyZXRzID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIGNvbXBcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KC9cXHMrLylcbiAgICAubWFwKChjKSA9PiByZXBsYWNlQ2FyZXQoYywgb3B0aW9ucykpXG4gICAgLmpvaW4oJyAnKVxufVxuXG5jb25zdCByZXBsYWNlQ2FyZXQgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBvcHRpb25zKVxuICBjb25zdCByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuQ0FSRVRMT09TRV0gOiByZVt0LkNBUkVUXVxuICBjb25zdCB6ID0gb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSA/ICctMCcgOiAnJ1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChfLCBNLCBtLCBwLCBwcikgPT4ge1xuICAgIGRlYnVnKCdjYXJldCcsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIGxldCByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uMC4wJHt6fSA8JHsrTSArIDF9LjAuMC0wYFxuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4wJHt6fSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3p9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cH0tJHtwclxuICAgICAgICAgIH0gPCR7TX0uJHttfS4keytwICsgMX0tMGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgICAgfSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgIH0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJylcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgICB9JHt6fSA8JHtNfS4ke219LiR7K3AgKyAxfS0wYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgICB9JHt6fSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwXG4gICAgICAgIH0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuY29uc3QgcmVwbGFjZVhSYW5nZXMgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcFxuICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgLm1hcCgoYykgPT4gcmVwbGFjZVhSYW5nZShjLCBvcHRpb25zKSlcbiAgICAuam9pbignICcpXG59XG5cbmNvbnN0IHJlcGxhY2VYUmFuZ2UgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBjb21wID0gY29tcC50cmltKClcbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LlhSQU5HRUxPT1NFXSA6IHJlW3QuWFJBTkdFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpXG4gICAgY29uc3QgeE0gPSBpc1goTSlcbiAgICBjb25zdCB4bSA9IHhNIHx8IGlzWChtKVxuICAgIGNvbnN0IHhwID0geG0gfHwgaXNYKHApXG4gICAgY29uc3QgYW55WCA9IHhwXG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpIHtcbiAgICAgIGd0bHQgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIHdlJ3JlIGluY2x1ZGluZyBwcmVyZWxlYXNlcyBpbiB0aGUgbWF0Y2gsIHRoZW4gd2UgbmVlZFxuICAgIC8vIHRvIGZpeCB0aGlzIHRvIC0wLCB0aGUgbG93ZXN0IHBvc3NpYmxlIHByZXJlbGVhc2UgdmFsdWVcbiAgICBwciA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyAnLTAnIDogJydcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAtMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyB3ZSBrbm93IHBhdGNoIGlzIGFuIHgsIGJlY2F1c2Ugd2UgaGF2ZSBhbnkgeCBhdCBhbGwuXG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pIHtcbiAgICAgICAgbSA9IDBcbiAgICAgIH1cbiAgICAgIHAgPSAwXG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgZ3RsdCA9ICc+PSdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICAgIG0gPSAwXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGd0bHQgPT09ICc8Jykge1xuICAgICAgICBwciA9ICctMCdcbiAgICAgIH1cblxuICAgICAgcmV0ID0gYCR7Z3RsdCArIE19LiR7bX0uJHtwfSR7cHJ9YFxuICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uMC4wJHtwcn0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uMCR7cHJcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldClcblxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmNvbnN0IHJlcGxhY2VTdGFycyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlU3RhcnMnLCBjb21wLCBvcHRpb25zKVxuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXBcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UocmVbdC5TVEFSXSwgJycpXG59XG5cbmNvbnN0IHJlcGxhY2VHVEUwID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ3JlcGxhY2VHVEUwJywgY29tcCwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXBcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UocmVbb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSA/IHQuR1RFMFBSRSA6IHQuR1RFMF0sICcnKVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBzdHJpbmcucmVwbGFjZShyZVt0LkhZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMC0wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAtMFxuLy8gVE9ETyBidWlsZD9cbmNvbnN0IGh5cGhlblJlcGxhY2UgPSBpbmNQciA9PiAoJDAsXG4gIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gIHRvLCB0TSwgdG0sIHRwLCB0cHIpID0+IHtcbiAgaWYgKGlzWChmTSkpIHtcbiAgICBmcm9tID0gJydcbiAgfSBlbHNlIGlmIChpc1goZm0pKSB7XG4gICAgZnJvbSA9IGA+PSR7Zk19LjAuMCR7aW5jUHIgPyAnLTAnIDogJyd9YFxuICB9IGVsc2UgaWYgKGlzWChmcCkpIHtcbiAgICBmcm9tID0gYD49JHtmTX0uJHtmbX0uMCR7aW5jUHIgPyAnLTAnIDogJyd9YFxuICB9IGVsc2UgaWYgKGZwcikge1xuICAgIGZyb20gPSBgPj0ke2Zyb219YFxuICB9IGVsc2Uge1xuICAgIGZyb20gPSBgPj0ke2Zyb219JHtpbmNQciA/ICctMCcgOiAnJ31gXG4gIH1cblxuICBpZiAoaXNYKHRNKSkge1xuICAgIHRvID0gJydcbiAgfSBlbHNlIGlmIChpc1godG0pKSB7XG4gICAgdG8gPSBgPCR7K3RNICsgMX0uMC4wLTBgXG4gIH0gZWxzZSBpZiAoaXNYKHRwKSkge1xuICAgIHRvID0gYDwke3RNfS4keyt0bSArIDF9LjAtMGBcbiAgfSBlbHNlIGlmICh0cHIpIHtcbiAgICB0byA9IGA8PSR7dE19LiR7dG19LiR7dHB9LSR7dHByfWBcbiAgfSBlbHNlIGlmIChpbmNQcikge1xuICAgIHRvID0gYDwke3RNfS4ke3RtfS4keyt0cCArIDF9LTBgXG4gIH0gZWxzZSB7XG4gICAgdG8gPSBgPD0ke3RvfWBcbiAgfVxuXG4gIHJldHVybiBgJHtmcm9tfSAke3RvfWAudHJpbSgpXG59XG5cbmNvbnN0IHRlc3RTZXQgPSAoc2V0LCB2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGggJiYgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcilcbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBDb21wYXJhdG9yLkFOWSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZCA9IHNldFtpXS5zZW12ZXJcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBBTlkgPSBTeW1ib2woJ1NlbVZlciBBTlknKVxuLy8gaG9pc3RlZCBjbGFzcyBmb3IgY3ljbGljIGRlcGVuZGVuY3lcbmNsYXNzIENvbXBhcmF0b3Ige1xuICBzdGF0aWMgZ2V0IEFOWSAoKSB7XG4gICAgcmV0dXJuIEFOWVxuICB9XG5cbiAgY29uc3RydWN0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXAgPSBjb21wLnZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcCA9IGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykuam9pbignICcpXG4gICAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgdGhpcy5wYXJzZShjb21wKVxuXG4gICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb25cbiAgICB9XG5cbiAgICBkZWJ1ZygnY29tcCcsIHRoaXMpXG4gIH1cblxuICBwYXJzZSAoY29tcCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLm9wdGlvbnMubG9vc2UgPyByZVt0LkNPTVBBUkFUT1JMT09TRV0gOiByZVt0LkNPTVBBUkFUT1JdXG4gICAgY29uc3QgbSA9IGNvbXAubWF0Y2gocilcblxuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBjb21wYXJhdG9yOiAke2NvbXB9YClcbiAgICB9XG5cbiAgICB0aGlzLm9wZXJhdG9yID0gbVsxXSAhPT0gdW5kZWZpbmVkID8gbVsxXSA6ICcnXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9Jykge1xuICAgICAgdGhpcy5vcGVyYXRvciA9ICcnXG4gICAgfVxuXG4gICAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gICAgaWYgKCFtWzJdKSB7XG4gICAgICB0aGlzLnNlbXZlciA9IEFOWVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5vcHRpb25zLmxvb3NlKVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG5cbiAgdGVzdCAodmVyc2lvbikge1xuICAgIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMubG9vc2UpXG5cbiAgICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSB8fCB2ZXJzaW9uID09PSBBTlkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgaW50ZXJzZWN0cyAoY29tcCwgb3B0aW9ucykge1xuICAgIGlmICghKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBDb21wYXJhdG9yIGlzIHJlcXVpcmVkJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJycpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZShjb21wLnZhbHVlLCBvcHRpb25zKS50ZXN0KHRoaXMudmFsdWUpXG4gICAgfSBlbHNlIGlmIChjb21wLm9wZXJhdG9yID09PSAnJykge1xuICAgICAgaWYgKGNvbXAudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFJhbmdlKHRoaXMudmFsdWUsIG9wdGlvbnMpLnRlc3QoY29tcC5zZW12ZXIpXG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgLy8gU3BlY2lhbCBjYXNlcyB3aGVyZSBub3RoaW5nIGNhbiBwb3NzaWJseSBiZSBsb3dlclxuICAgIGlmIChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmXG4gICAgICAodGhpcy52YWx1ZSA9PT0gJzwwLjAuMC0wJyB8fCBjb21wLnZhbHVlID09PSAnPDAuMC4wLTAnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJlxuICAgICAgKHRoaXMudmFsdWUuc3RhcnRzV2l0aCgnPDAuMC4wJykgfHwgY29tcC52YWx1ZS5zdGFydHNXaXRoKCc8MC4wLjAnKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIFNhbWUgZGlyZWN0aW9uIGluY3JlYXNpbmcgKD4gb3IgPj0pXG4gICAgaWYgKHRoaXMub3BlcmF0b3Iuc3RhcnRzV2l0aCgnPicpICYmIGNvbXAub3BlcmF0b3Iuc3RhcnRzV2l0aCgnPicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICAvLyBTYW1lIGRpcmVjdGlvbiBkZWNyZWFzaW5nICg8IG9yIDw9KVxuICAgIGlmICh0aGlzLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJzwnKSAmJiBjb21wLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJzwnKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gc2FtZSBTZW1WZXIgYW5kIGJvdGggc2lkZXMgYXJlIGluY2x1c2l2ZSAoPD0gb3IgPj0pXG4gICAgaWYgKFxuICAgICAgKHRoaXMuc2VtdmVyLnZlcnNpb24gPT09IGNvbXAuc2VtdmVyLnZlcnNpb24pICYmXG4gICAgICB0aGlzLm9wZXJhdG9yLmluY2x1ZGVzKCc9JykgJiYgY29tcC5vcGVyYXRvci5pbmNsdWRlcygnPScpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICAvLyBvcHBvc2l0ZSBkaXJlY3Rpb25zIGxlc3MgdGhhblxuICAgIGlmIChjbXAodGhpcy5zZW12ZXIsICc8JywgY29tcC5zZW12ZXIsIG9wdGlvbnMpICYmXG4gICAgICB0aGlzLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJz4nKSAmJiBjb21wLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJzwnKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gb3Bwb3NpdGUgZGlyZWN0aW9ucyBncmVhdGVyIHRoYW5cbiAgICBpZiAoY21wKHRoaXMuc2VtdmVyLCAnPicsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICAgdGhpcy5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykgJiYgY29tcC5vcGVyYXRvci5zdGFydHNXaXRoKCc+JykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcGFyYXRvclxuXG5jb25zdCBwYXJzZU9wdGlvbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9wYXJzZS1vcHRpb25zJylcbmNvbnN0IHsgc2FmZVJlOiByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuY29uc3QgY21wID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2NtcCcpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2RlYnVnJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4vc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZScpXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBzYXRpc2ZpZXMgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxubW9kdWxlLmV4cG9ydHMgPSBzYXRpc2ZpZXNcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcblxuLy8gTW9zdGx5IGp1c3QgZm9yIHRlc3RpbmcgYW5kIGxlZ2FjeSBBUEkgcmVhc29uc1xuY29uc3QgdG9Db21wYXJhdG9ycyA9IChyYW5nZSwgb3B0aW9ucykgPT5cbiAgbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5zZXRcbiAgICAubWFwKGNvbXAgPT4gY29tcC5tYXAoYyA9PiBjLnZhbHVlKS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJykpXG5cbm1vZHVsZS5leHBvcnRzID0gdG9Db21wYXJhdG9yc1xuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuXG5jb25zdCBtYXhTYXRpc2Z5aW5nID0gKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykgPT4ge1xuICBsZXQgbWF4ID0gbnVsbFxuICBsZXQgbWF4U1YgPSBudWxsXG4gIGxldCByYW5nZU9iaiA9IG51bGxcbiAgdHJ5IHtcbiAgICByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goKHYpID0+IHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtYXggfHwgbWF4U1YuY29tcGFyZSh2KSA9PT0gLTEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtYXgsIHYsIHRydWUpXG4gICAgICAgIG1heCA9IHZcbiAgICAgICAgbWF4U1YgPSBuZXcgU2VtVmVyKG1heCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtYXhcbn1cbm1vZHVsZS5leHBvcnRzID0gbWF4U2F0aXNmeWluZ1xuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG1pbiA9IG51bGxcbiAgbGV0IG1pblNWID0gbnVsbFxuICBsZXQgcmFuZ2VPYmogPSBudWxsXG4gIHRyeSB7XG4gICAgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cbm1vZHVsZS5leHBvcnRzID0gbWluU2F0aXNmeWluZ1xuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3QnKVxuXG5jb25zdCBtaW5WZXJzaW9uID0gKHJhbmdlLCBsb29zZSkgPT4ge1xuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpXG5cbiAgbGV0IG1pbnZlciA9IG5ldyBTZW1WZXIoJzAuMC4wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG5ldyBTZW1WZXIoJzAuMC4wLTAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbnVsbFxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBsZXQgc2V0TWluID0gbnVsbFxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goKGNvbXBhcmF0b3IpID0+IHtcbiAgICAgIC8vIENsb25lIHRvIGF2b2lkIG1hbmlwdWxhdGluZyB0aGUgY29tcGFyYXRvcidzIHNlbXZlciBvYmplY3QuXG4gICAgICBjb25zdCBjb21wdmVyID0gbmV3IFNlbVZlcihjb21wYXJhdG9yLnNlbXZlci52ZXJzaW9uKVxuICAgICAgc3dpdGNoIChjb21wYXJhdG9yLm9wZXJhdG9yKSB7XG4gICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgIGlmIChjb21wdmVyLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb21wdmVyLnBhdGNoKytcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcHZlci5wcmVyZWxlYXNlLnB1c2goMClcbiAgICAgICAgICB9XG4gICAgICAgICAgY29tcHZlci5yYXcgPSBjb21wdmVyLmZvcm1hdCgpXG4gICAgICAgICAgLyogZmFsbHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgIGlmICghc2V0TWluIHx8IGd0KGNvbXB2ZXIsIHNldE1pbikpIHtcbiAgICAgICAgICAgIHNldE1pbiA9IGNvbXB2ZXJcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAvKiBJZ25vcmUgbWF4aW11bSB2ZXJzaW9ucyAqL1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIG9wZXJhdGlvbjogJHtjb21wYXJhdG9yLm9wZXJhdG9yfWApXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoc2V0TWluICYmICghbWludmVyIHx8IGd0KG1pbnZlciwgc2V0TWluKSkpIHtcbiAgICAgIG1pbnZlciA9IHNldE1pblxuICAgIH1cbiAgfVxuXG4gIGlmIChtaW52ZXIgJiYgcmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cbm1vZHVsZS5leHBvcnRzID0gbWluVmVyc2lvblxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgdmFsaWRSYW5nZSA9IChyYW5nZSwgb3B0aW9ucykgPT4ge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5yYW5nZSB8fCAnKidcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkUmFuZ2VcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvY29tcGFyYXRvcicpXG5jb25zdCB7IEFOWSB9ID0gQ29tcGFyYXRvclxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3QnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvbHQnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2x0ZScpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3RlJylcblxuY29uc3Qgb3V0c2lkZSA9ICh2ZXJzaW9uLCByYW5nZSwgaGlsbywgb3B0aW9ucykgPT4ge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcblxuICBsZXQgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wXG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0XG4gICAgICBsdGVmbiA9IGx0ZVxuICAgICAgbHRmbiA9IGx0XG4gICAgICBjb21wID0gJz4nXG4gICAgICBlY29tcCA9ICc+PSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHRcbiAgICAgIGx0ZWZuID0gZ3RlXG4gICAgICBsdGZuID0gZ3RcbiAgICAgIGNvbXAgPSAnPCdcbiAgICAgIGVjb21wID0gJzw9J1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKVxuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNmaWVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBsZXQgaGlnaCA9IG51bGxcbiAgICBsZXQgbG93ID0gbnVsbFxuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaCgoY29tcGFyYXRvcikgPT4ge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3JcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yXG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHNpZGVcbiIsICIndXNlIHN0cmljdCdcblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vb3V0c2lkZScpXG5jb25zdCBndHIgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+Jywgb3B0aW9ucylcbm1vZHVsZS5leHBvcnRzID0gZ3RyXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG91dHNpZGUgPSByZXF1aXJlKCcuL291dHNpZGUnKVxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5jb25zdCBsdHIgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8Jywgb3B0aW9ucylcbm1vZHVsZS5leHBvcnRzID0gbHRyXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBpbnRlcnNlY3RzID0gKHIxLCByMiwgb3B0aW9ucykgPT4ge1xuICByMSA9IG5ldyBSYW5nZShyMSwgb3B0aW9ucylcbiAgcjIgPSBuZXcgUmFuZ2UocjIsIG9wdGlvbnMpXG4gIHJldHVybiByMS5pbnRlcnNlY3RzKHIyLCBvcHRpb25zKVxufVxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RzXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbi8vIGdpdmVuIGEgc2V0IG9mIHZlcnNpb25zIGFuZCBhIHJhbmdlLCBjcmVhdGUgYSBcInNpbXBsaWZpZWRcIiByYW5nZVxuLy8gdGhhdCBpbmNsdWRlcyB0aGUgc2FtZSB2ZXJzaW9ucyB0aGF0IHRoZSBvcmlnaW5hbCByYW5nZSBkb2VzXG4vLyBJZiB0aGUgb3JpZ2luYWwgcmFuZ2UgaXMgc2hvcnRlciB0aGFuIHRoZSBzaW1wbGlmaWVkIG9uZSwgcmV0dXJuIHRoYXQuXG5jb25zdCBzYXRpc2ZpZXMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzJylcbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvY29tcGFyZS5qcycpXG5tb2R1bGUuZXhwb3J0cyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgY29uc3Qgc2V0ID0gW11cbiAgbGV0IGZpcnN0ID0gbnVsbFxuICBsZXQgcHJldiA9IG51bGxcbiAgY29uc3QgdiA9IHZlcnNpb25zLnNvcnQoKGEsIGIpID0+IGNvbXBhcmUoYSwgYiwgb3B0aW9ucykpXG4gIGZvciAoY29uc3QgdmVyc2lvbiBvZiB2KSB7XG4gICAgY29uc3QgaW5jbHVkZWQgPSBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgaWYgKGluY2x1ZGVkKSB7XG4gICAgICBwcmV2ID0gdmVyc2lvblxuICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICBmaXJzdCA9IHZlcnNpb25cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgc2V0LnB1c2goW2ZpcnN0LCBwcmV2XSlcbiAgICAgIH1cbiAgICAgIHByZXYgPSBudWxsXG4gICAgICBmaXJzdCA9IG51bGxcbiAgICB9XG4gIH1cbiAgaWYgKGZpcnN0KSB7XG4gICAgc2V0LnB1c2goW2ZpcnN0LCBudWxsXSlcbiAgfVxuXG4gIGNvbnN0IHJhbmdlcyA9IFtdXG4gIGZvciAoY29uc3QgW21pbiwgbWF4XSBvZiBzZXQpIHtcbiAgICBpZiAobWluID09PSBtYXgpIHtcbiAgICAgIHJhbmdlcy5wdXNoKG1pbilcbiAgICB9IGVsc2UgaWYgKCFtYXggJiYgbWluID09PSB2WzBdKSB7XG4gICAgICByYW5nZXMucHVzaCgnKicpXG4gICAgfSBlbHNlIGlmICghbWF4KSB7XG4gICAgICByYW5nZXMucHVzaChgPj0ke21pbn1gKVxuICAgIH0gZWxzZSBpZiAobWluID09PSB2WzBdKSB7XG4gICAgICByYW5nZXMucHVzaChgPD0ke21heH1gKVxuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZXMucHVzaChgJHttaW59IC0gJHttYXh9YClcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2ltcGxpZmllZCA9IHJhbmdlcy5qb2luKCcgfHwgJylcbiAgY29uc3Qgb3JpZ2luYWwgPSB0eXBlb2YgcmFuZ2UucmF3ID09PSAnc3RyaW5nJyA/IHJhbmdlLnJhdyA6IFN0cmluZyhyYW5nZSlcbiAgcmV0dXJuIHNpbXBsaWZpZWQubGVuZ3RoIDwgb3JpZ2luYWwubGVuZ3RoID8gc2ltcGxpZmllZCA6IHJhbmdlXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZS5qcycpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9jb21wYXJhdG9yLmpzJylcbmNvbnN0IHsgQU5ZIH0gPSBDb21wYXJhdG9yXG5jb25zdCBzYXRpc2ZpZXMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzJylcbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvY29tcGFyZS5qcycpXG5cbi8vIENvbXBsZXggcmFuZ2UgYHIxIHx8IHIyIHx8IC4uLmAgaXMgYSBzdWJzZXQgb2YgYFIxIHx8IFIyIHx8IC4uLmAgaWZmOlxuLy8gLSBFdmVyeSBzaW1wbGUgcmFuZ2UgYHIxLCByMiwgLi4uYCBpcyBhIG51bGwgc2V0LCBPUlxuLy8gLSBFdmVyeSBzaW1wbGUgcmFuZ2UgYHIxLCByMiwgLi4uYCB3aGljaCBpcyBub3QgYSBudWxsIHNldCBpcyBhIHN1YnNldCBvZlxuLy8gICBzb21lIGBSMSwgUjIsIC4uLmBcbi8vXG4vLyBTaW1wbGUgcmFuZ2UgYGMxIGMyIC4uLmAgaXMgYSBzdWJzZXQgb2Ygc2ltcGxlIHJhbmdlIGBDMSBDMiAuLi5gIGlmZjpcbi8vIC0gSWYgYyBpcyBvbmx5IHRoZSBBTlkgY29tcGFyYXRvclxuLy8gICAtIElmIEMgaXMgb25seSB0aGUgQU5ZIGNvbXBhcmF0b3IsIHJldHVybiB0cnVlXG4vLyAgIC0gRWxzZSBpZiBpbiBwcmVyZWxlYXNlIG1vZGUsIHJldHVybiBmYWxzZVxuLy8gICAtIGVsc2UgcmVwbGFjZSBjIHdpdGggYFs+PTAuMC4wXWBcbi8vIC0gSWYgQyBpcyBvbmx5IHRoZSBBTlkgY29tcGFyYXRvclxuLy8gICAtIGlmIGluIHByZXJlbGVhc2UgbW9kZSwgcmV0dXJuIHRydWVcbi8vICAgLSBlbHNlIHJlcGxhY2UgQyB3aXRoIGBbPj0wLjAuMF1gXG4vLyAtIExldCBFUSBiZSB0aGUgc2V0IG9mID0gY29tcGFyYXRvcnMgaW4gY1xuLy8gLSBJZiBFUSBpcyBtb3JlIHRoYW4gb25lLCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAtIExldCBHVCBiZSB0aGUgaGlnaGVzdCA+IG9yID49IGNvbXBhcmF0b3IgaW4gY1xuLy8gLSBMZXQgTFQgYmUgdGhlIGxvd2VzdCA8IG9yIDw9IGNvbXBhcmF0b3IgaW4gY1xuLy8gLSBJZiBHVCBhbmQgTFQsIGFuZCBHVC5zZW12ZXIgPiBMVC5zZW12ZXIsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vIC0gSWYgYW55IEMgaXMgYSA9IHJhbmdlLCBhbmQgR1Qgb3IgTFQgYXJlIHNldCwgcmV0dXJuIGZhbHNlXG4vLyAtIElmIEVRXG4vLyAgIC0gSWYgR1QsIGFuZCBFUSBkb2VzIG5vdCBzYXRpc2Z5IEdULCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAgIC0gSWYgTFQsIGFuZCBFUSBkb2VzIG5vdCBzYXRpc2Z5IExULCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAgIC0gSWYgRVEgc2F0aXNmaWVzIGV2ZXJ5IEMsIHJldHVybiB0cnVlXG4vLyAgIC0gRWxzZSByZXR1cm4gZmFsc2Vcbi8vIC0gSWYgR1Rcbi8vICAgLSBJZiBHVC5zZW12ZXIgaXMgbG93ZXIgdGhhbiBhbnkgPiBvciA+PSBjb21wIGluIEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIEdUIGlzID49LCBhbmQgR1Quc2VtdmVyIGRvZXMgbm90IHNhdGlzZnkgZXZlcnkgQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgR1Quc2VtdmVyIGhhcyBhIHByZXJlbGVhc2UsIGFuZCBub3QgaW4gcHJlcmVsZWFzZSBtb2RlXG4vLyAgICAgLSBJZiBubyBDIGhhcyBhIHByZXJlbGVhc2UgYW5kIHRoZSBHVC5zZW12ZXIgdHVwbGUsIHJldHVybiBmYWxzZVxuLy8gLSBJZiBMVFxuLy8gICAtIElmIExULnNlbXZlciBpcyBncmVhdGVyIHRoYW4gYW55IDwgb3IgPD0gY29tcCBpbiBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBMVCBpcyA8PSwgYW5kIExULnNlbXZlciBkb2VzIG5vdCBzYXRpc2Z5IGV2ZXJ5IEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIExULnNlbXZlciBoYXMgYSBwcmVyZWxlYXNlLCBhbmQgbm90IGluIHByZXJlbGVhc2UgbW9kZVxuLy8gICAgIC0gSWYgbm8gQyBoYXMgYSBwcmVyZWxlYXNlIGFuZCB0aGUgTFQuc2VtdmVyIHR1cGxlLCByZXR1cm4gZmFsc2Vcbi8vIC0gRWxzZSByZXR1cm4gdHJ1ZVxuXG5jb25zdCBzdWJzZXQgPSAoc3ViLCBkb20sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoc3ViID09PSBkb20pIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgc3ViID0gbmV3IFJhbmdlKHN1Yiwgb3B0aW9ucylcbiAgZG9tID0gbmV3IFJhbmdlKGRvbSwgb3B0aW9ucylcbiAgbGV0IHNhd05vbk51bGwgPSBmYWxzZVxuXG4gIE9VVEVSOiBmb3IgKGNvbnN0IHNpbXBsZVN1YiBvZiBzdWIuc2V0KSB7XG4gICAgZm9yIChjb25zdCBzaW1wbGVEb20gb2YgZG9tLnNldCkge1xuICAgICAgY29uc3QgaXNTdWIgPSBzaW1wbGVTdWJzZXQoc2ltcGxlU3ViLCBzaW1wbGVEb20sIG9wdGlvbnMpXG4gICAgICBzYXdOb25OdWxsID0gc2F3Tm9uTnVsbCB8fCBpc1N1YiAhPT0gbnVsbFxuICAgICAgaWYgKGlzU3ViKSB7XG4gICAgICAgIGNvbnRpbnVlIE9VVEVSXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHRoZSBudWxsIHNldCBpcyBhIHN1YnNldCBvZiBldmVyeXRoaW5nLCBidXQgbnVsbCBzaW1wbGUgcmFuZ2VzIGluXG4gICAgLy8gYSBjb21wbGV4IHJhbmdlIHNob3VsZCBiZSBpZ25vcmVkLiAgc28gaWYgd2Ugc2F3IGEgbm9uLW51bGwgcmFuZ2UsXG4gICAgLy8gdGhlbiB3ZSBrbm93IHRoaXMgaXNuJ3QgYSBzdWJzZXQsIGJ1dCBpZiBFVkVSWSBzaW1wbGUgcmFuZ2Ugd2FzIG51bGwsXG4gICAgLy8gdGhlbiBpdCBpcyBhIHN1YnNldC5cbiAgICBpZiAoc2F3Tm9uTnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IG1pbmltdW1WZXJzaW9uV2l0aFByZVJlbGVhc2UgPSBbbmV3IENvbXBhcmF0b3IoJz49MC4wLjAtMCcpXVxuY29uc3QgbWluaW11bVZlcnNpb24gPSBbbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKV1cblxuY29uc3Qgc2ltcGxlU3Vic2V0ID0gKHN1YiwgZG9tLCBvcHRpb25zKSA9PiB7XG4gIGlmIChzdWIgPT09IGRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoc3ViLmxlbmd0aCA9PT0gMSAmJiBzdWJbMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICBpZiAoZG9tLmxlbmd0aCA9PT0gMSAmJiBkb21bMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgICBzdWIgPSBtaW5pbXVtVmVyc2lvbldpdGhQcmVSZWxlYXNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YiA9IG1pbmltdW1WZXJzaW9uXG4gICAgfVxuICB9XG5cbiAgaWYgKGRvbS5sZW5ndGggPT09IDEgJiYgZG9tWzBdLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgaWYgKG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbSA9IG1pbmltdW1WZXJzaW9uXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXFTZXQgPSBuZXcgU2V0KClcbiAgbGV0IGd0LCBsdFxuICBmb3IgKGNvbnN0IGMgb2Ygc3ViKSB7XG4gICAgaWYgKGMub3BlcmF0b3IgPT09ICc+JyB8fCBjLm9wZXJhdG9yID09PSAnPj0nKSB7XG4gICAgICBndCA9IGhpZ2hlckdUKGd0LCBjLCBvcHRpb25zKVxuICAgIH0gZWxzZSBpZiAoYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgIGx0ID0gbG93ZXJMVChsdCwgYywgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgZXFTZXQuYWRkKGMuc2VtdmVyKVxuICAgIH1cbiAgfVxuXG4gIGlmIChlcVNldC5zaXplID4gMSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBsZXQgZ3RsdENvbXBcbiAgaWYgKGd0ICYmIGx0KSB7XG4gICAgZ3RsdENvbXAgPSBjb21wYXJlKGd0LnNlbXZlciwgbHQuc2VtdmVyLCBvcHRpb25zKVxuICAgIGlmIChndGx0Q29tcCA+IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfSBlbHNlIGlmIChndGx0Q29tcCA9PT0gMCAmJiAoZ3Qub3BlcmF0b3IgIT09ICc+PScgfHwgbHQub3BlcmF0b3IgIT09ICc8PScpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8vIHdpbGwgaXRlcmF0ZSBvbmUgb3IgemVybyB0aW1lc1xuICBmb3IgKGNvbnN0IGVxIG9mIGVxU2V0KSB7XG4gICAgaWYgKGd0ICYmICFzYXRpc2ZpZXMoZXEsIFN0cmluZyhndCksIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmIChsdCAmJiAhc2F0aXNmaWVzKGVxLCBTdHJpbmcobHQpLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGMgb2YgZG9tKSB7XG4gICAgICBpZiAoIXNhdGlzZmllcyhlcSwgU3RyaW5nKGMpLCBvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbGV0IGhpZ2hlciwgbG93ZXJcbiAgbGV0IGhhc0RvbUxULCBoYXNEb21HVFxuICAvLyBpZiB0aGUgc3Vic2V0IGhhcyBhIHByZXJlbGVhc2UsIHdlIG5lZWQgYSBjb21wYXJhdG9yIGluIHRoZSBzdXBlcnNldFxuICAvLyB3aXRoIHRoZSBzYW1lIHR1cGxlIGFuZCBhIHByZXJlbGVhc2UsIG9yIGl0J3Mgbm90IGEgc3Vic2V0XG4gIGxldCBuZWVkRG9tTFRQcmUgPSBsdCAmJlxuICAgICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmXG4gICAgbHQuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID8gbHQuc2VtdmVyIDogZmFsc2VcbiAgbGV0IG5lZWREb21HVFByZSA9IGd0ICYmXG4gICAgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiZcbiAgICBndC5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPyBndC5zZW12ZXIgOiBmYWxzZVxuICAvLyBleGNlcHRpb246IDwxLjIuMy0wIGlzIHRoZSBzYW1lIGFzIDwxLjIuM1xuICBpZiAobmVlZERvbUxUUHJlICYmIG5lZWREb21MVFByZS5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgbHQub3BlcmF0b3IgPT09ICc8JyAmJiBuZWVkRG9tTFRQcmUucHJlcmVsZWFzZVswXSA9PT0gMCkge1xuICAgIG5lZWREb21MVFByZSA9IGZhbHNlXG4gIH1cblxuICBmb3IgKGNvbnN0IGMgb2YgZG9tKSB7XG4gICAgaGFzRG9tR1QgPSBoYXNEb21HVCB8fCBjLm9wZXJhdG9yID09PSAnPicgfHwgYy5vcGVyYXRvciA9PT0gJz49J1xuICAgIGhhc0RvbUxUID0gaGFzRG9tTFQgfHwgYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PSdcbiAgICBpZiAoZ3QpIHtcbiAgICAgIGlmIChuZWVkRG9tR1RQcmUpIHtcbiAgICAgICAgaWYgKGMuc2VtdmVyLnByZXJlbGVhc2UgJiYgYy5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1ham9yID09PSBuZWVkRG9tR1RQcmUubWFqb3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1pbm9yID09PSBuZWVkRG9tR1RQcmUubWlub3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLnBhdGNoID09PSBuZWVkRG9tR1RQcmUucGF0Y2gpIHtcbiAgICAgICAgICBuZWVkRG9tR1RQcmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYy5vcGVyYXRvciA9PT0gJz4nIHx8IGMub3BlcmF0b3IgPT09ICc+PScpIHtcbiAgICAgICAgaGlnaGVyID0gaGlnaGVyR1QoZ3QsIGMsIG9wdGlvbnMpXG4gICAgICAgIGlmIChoaWdoZXIgPT09IGMgJiYgaGlnaGVyICE9PSBndCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0Lm9wZXJhdG9yID09PSAnPj0nICYmICFzYXRpc2ZpZXMoZ3Quc2VtdmVyLCBTdHJpbmcoYyksIG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobHQpIHtcbiAgICAgIGlmIChuZWVkRG9tTFRQcmUpIHtcbiAgICAgICAgaWYgKGMuc2VtdmVyLnByZXJlbGVhc2UgJiYgYy5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1ham9yID09PSBuZWVkRG9tTFRQcmUubWFqb3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1pbm9yID09PSBuZWVkRG9tTFRQcmUubWlub3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLnBhdGNoID09PSBuZWVkRG9tTFRQcmUucGF0Y2gpIHtcbiAgICAgICAgICBuZWVkRG9tTFRQcmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgICAgbG93ZXIgPSBsb3dlckxUKGx0LCBjLCBvcHRpb25zKVxuICAgICAgICBpZiAobG93ZXIgPT09IGMgJiYgbG93ZXIgIT09IGx0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobHQub3BlcmF0b3IgPT09ICc8PScgJiYgIXNhdGlzZmllcyhsdC5zZW12ZXIsIFN0cmluZyhjKSwgb3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghYy5vcGVyYXRvciAmJiAobHQgfHwgZ3QpICYmIGd0bHRDb21wICE9PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGVyZSB3YXMgYSA8IG9yID4sIGFuZCBub3RoaW5nIGluIHRoZSBkb20sIHRoZW4gbXVzdCBiZSBmYWxzZVxuICAvLyBVTkxFU1MgaXQgd2FzIGxpbWl0ZWQgYnkgYW5vdGhlciByYW5nZSBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uLlxuICAvLyBFZywgPjEuMC4wIDwxLjAuMSBpcyBzdGlsbCBhIHN1YnNldCBvZiA8Mi4wLjBcbiAgaWYgKGd0ICYmIGhhc0RvbUxUICYmICFsdCAmJiBndGx0Q29tcCAhPT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKGx0ICYmIGhhc0RvbUdUICYmICFndCAmJiBndGx0Q29tcCAhPT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gd2UgbmVlZGVkIGEgcHJlcmVsZWFzZSByYW5nZSBpbiBhIHNwZWNpZmljIHR1cGxlLCBidXQgZGlkbid0IGdldCBvbmVcbiAgLy8gdGhlbiB0aGlzIGlzbid0IGEgc3Vic2V0LiAgZWcgPj0xLjIuMy1wcmUgaXMgbm90IGEgc3Vic2V0IG9mID49MS4wLjAsXG4gIC8vIGJlY2F1c2UgaXQgaW5jbHVkZXMgcHJlcmVsZWFzZXMgaW4gdGhlIDEuMi4zIHR1cGxlXG4gIGlmIChuZWVkRG9tR1RQcmUgfHwgbmVlZERvbUxUUHJlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyA+PTEuMi4zIGlzIGxvd2VyIHRoYW4gPjEuMi4zXG5jb25zdCBoaWdoZXJHVCA9IChhLCBiLCBvcHRpb25zKSA9PiB7XG4gIGlmICghYSkge1xuICAgIHJldHVybiBiXG4gIH1cbiAgY29uc3QgY29tcCA9IGNvbXBhcmUoYS5zZW12ZXIsIGIuc2VtdmVyLCBvcHRpb25zKVxuICByZXR1cm4gY29tcCA+IDAgPyBhXG4gICAgOiBjb21wIDwgMCA/IGJcbiAgICA6IGIub3BlcmF0b3IgPT09ICc+JyAmJiBhLm9wZXJhdG9yID09PSAnPj0nID8gYlxuICAgIDogYVxufVxuXG4vLyA8PTEuMi4zIGlzIGhpZ2hlciB0aGFuIDwxLjIuM1xuY29uc3QgbG93ZXJMVCA9IChhLCBiLCBvcHRpb25zKSA9PiB7XG4gIGlmICghYSkge1xuICAgIHJldHVybiBiXG4gIH1cbiAgY29uc3QgY29tcCA9IGNvbXBhcmUoYS5zZW12ZXIsIGIuc2VtdmVyLCBvcHRpb25zKVxuICByZXR1cm4gY29tcCA8IDAgPyBhXG4gICAgOiBjb21wID4gMCA/IGJcbiAgICA6IGIub3BlcmF0b3IgPT09ICc8JyAmJiBhLm9wZXJhdG9yID09PSAnPD0nID8gYlxuICAgIDogYVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YnNldFxuIiwgIid1c2Ugc3RyaWN0J1xuXG4vLyBqdXN0IHByZS1sb2FkIGFsbCB0aGUgc3R1ZmYgdGhhdCBpbmRleC5qcyBsYXppbHkgZXhwb3J0c1xuY29uc3QgaW50ZXJuYWxSZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvcmUnKVxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9jb25zdGFudHMnKVxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBpZGVudGlmaWVycyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvaWRlbnRpZmllcnMnKVxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wYXJzZScpXG5jb25zdCB2YWxpZCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3ZhbGlkJylcbmNvbnN0IGNsZWFuID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY2xlYW4nKVxuY29uc3QgaW5jID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvaW5jJylcbmNvbnN0IGRpZmYgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9kaWZmJylcbmNvbnN0IG1ham9yID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbWFqb3InKVxuY29uc3QgbWlub3IgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9taW5vcicpXG5jb25zdCBwYXRjaCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3BhdGNoJylcbmNvbnN0IHByZXJlbGVhc2UgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wcmVyZWxlYXNlJylcbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlJylcbmNvbnN0IHJjb21wYXJlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcmNvbXBhcmUnKVxuY29uc3QgY29tcGFyZUxvb3NlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29tcGFyZS1sb29zZScpXG5jb25zdCBjb21wYXJlQnVpbGQgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlLWJ1aWxkJylcbmNvbnN0IHNvcnQgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9zb3J0JylcbmNvbnN0IHJzb3J0ID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcnNvcnQnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9ndCcpXG5jb25zdCBsdCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2x0JylcbmNvbnN0IGVxID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZXEnKVxuY29uc3QgbmVxID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbmVxJylcbmNvbnN0IGd0ZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2d0ZScpXG5jb25zdCBsdGUgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9sdGUnKVxuY29uc3QgY21wID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY21wJylcbmNvbnN0IGNvZXJjZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NvZXJjZScpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi9jbGFzc2VzL2NvbXBhcmF0b3InKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvc2F0aXNmaWVzJylcbmNvbnN0IHRvQ29tcGFyYXRvcnMgPSByZXF1aXJlKCcuL3Jhbmdlcy90by1jb21wYXJhdG9ycycpXG5jb25zdCBtYXhTYXRpc2Z5aW5nID0gcmVxdWlyZSgnLi9yYW5nZXMvbWF4LXNhdGlzZnlpbmcnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9IHJlcXVpcmUoJy4vcmFuZ2VzL21pbi1zYXRpc2Z5aW5nJylcbmNvbnN0IG1pblZlcnNpb24gPSByZXF1aXJlKCcuL3Jhbmdlcy9taW4tdmVyc2lvbicpXG5jb25zdCB2YWxpZFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZXMvdmFsaWQnKVxuY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vcmFuZ2VzL291dHNpZGUnKVxuY29uc3QgZ3RyID0gcmVxdWlyZSgnLi9yYW5nZXMvZ3RyJylcbmNvbnN0IGx0ciA9IHJlcXVpcmUoJy4vcmFuZ2VzL2x0cicpXG5jb25zdCBpbnRlcnNlY3RzID0gcmVxdWlyZSgnLi9yYW5nZXMvaW50ZXJzZWN0cycpXG5jb25zdCBzaW1wbGlmeVJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZXMvc2ltcGxpZnknKVxuY29uc3Qgc3Vic2V0ID0gcmVxdWlyZSgnLi9yYW5nZXMvc3Vic2V0Jylcbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZSxcbiAgdmFsaWQsXG4gIGNsZWFuLFxuICBpbmMsXG4gIGRpZmYsXG4gIG1ham9yLFxuICBtaW5vcixcbiAgcGF0Y2gsXG4gIHByZXJlbGVhc2UsXG4gIGNvbXBhcmUsXG4gIHJjb21wYXJlLFxuICBjb21wYXJlTG9vc2UsXG4gIGNvbXBhcmVCdWlsZCxcbiAgc29ydCxcbiAgcnNvcnQsXG4gIGd0LFxuICBsdCxcbiAgZXEsXG4gIG5lcSxcbiAgZ3RlLFxuICBsdGUsXG4gIGNtcCxcbiAgY29lcmNlLFxuICBDb21wYXJhdG9yLFxuICBSYW5nZSxcbiAgc2F0aXNmaWVzLFxuICB0b0NvbXBhcmF0b3JzLFxuICBtYXhTYXRpc2Z5aW5nLFxuICBtaW5TYXRpc2Z5aW5nLFxuICBtaW5WZXJzaW9uLFxuICB2YWxpZFJhbmdlLFxuICBvdXRzaWRlLFxuICBndHIsXG4gIGx0cixcbiAgaW50ZXJzZWN0cyxcbiAgc2ltcGxpZnlSYW5nZSxcbiAgc3Vic2V0LFxuICBTZW1WZXIsXG4gIHJlOiBpbnRlcm5hbFJlLnJlLFxuICBzcmM6IGludGVybmFsUmUuc3JjLFxuICB0b2tlbnM6IGludGVybmFsUmUudCxcbiAgU0VNVkVSX1NQRUNfVkVSU0lPTjogY29uc3RhbnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIFJFTEVBU0VfVFlQRVM6IGNvbnN0YW50cy5SRUxFQVNFX1RZUEVTLFxuICBjb21wYXJlSWRlbnRpZmllcnM6IGlkZW50aWZpZXJzLmNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVyczogaWRlbnRpZmllcnMucmNvbXBhcmVJZGVudGlmaWVycyxcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE9ic2lkaWFuUHJvdG9jb2xEYXRhIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBCZXRhUGx1Z2lucyBmcm9tIFwiLi9mZWF0dXJlcy9CZXRhUGx1Z2luc1wiO1xuaW1wb3J0IHsgdGhlbWVzQ2hlY2tBbmRVcGRhdGVzIH0gZnJvbSBcIi4vZmVhdHVyZXMvdGhlbWVzXCI7XG5pbXBvcnQgeyBtaWdyYXRlVG9rZW5zVG9TZWNyZXRTdG9yYWdlIH0gZnJvbSBcIi4vbWlncmF0aW9uc1wiO1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBERUZBVUxUX1NFVFRJTkdTIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCBBZGROZXdQbHVnaW5Nb2RhbCBmcm9tIFwiLi91aS9BZGROZXdQbHVnaW5Nb2RhbFwiO1xuaW1wb3J0IEFkZE5ld1RoZW1lIGZyb20gXCIuL3VpL0FkZE5ld1RoZW1lXCI7XG5pbXBvcnQgeyBhZGRJY29ucyB9IGZyb20gXCIuL3VpL2ljb25zXCI7XG5pbXBvcnQgUGx1Z2luQ29tbWFuZHMgZnJvbSBcIi4vdWkvUGx1Z2luQ29tbWFuZHNcIjtcbmltcG9ydCB7IEJyYXRTZXR0aW5nc1RhYiB9IGZyb20gXCIuL3VpL1NldHRpbmdzVGFiXCI7XG5pbXBvcnQgQnJhdEFQSSBmcm9tIFwiLi91dGlscy9CcmF0QVBJXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi91dGlscy9sb2dnaW5nXCI7XG5pbXBvcnQgeyB0b2FzdE1lc3NhZ2UgfSBmcm9tIFwiLi91dGlscy9ub3RpZmljYXRpb25zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYXRQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRBUFBfTkFNRSA9IFwiQlJBVFwiO1xuXHRBUFBfSUQgPSBcIm9ic2lkaWFuNDItYnJhdFwiO1xuXHRzZXR0aW5nczogU2V0dGluZ3MgPSBERUZBVUxUX1NFVFRJTkdTO1xuXHRzZXR0aW5nc1RhYjogQnJhdFNldHRpbmdzVGFiID0gbmV3IEJyYXRTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcyk7XG5cdGJldGFQbHVnaW5zID0gbmV3IEJldGFQbHVnaW5zKHRoaXMpO1xuXHRjb21tYW5kczogUGx1Z2luQ29tbWFuZHMgPSBuZXcgUGx1Z2luQ29tbWFuZHModGhpcyk7XG5cdGJyYXRBcGk6IEJyYXRBUEkgPSBuZXcgQnJhdEFQSSh0aGlzKTtcblxuXHRvbmxvYWQoKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyhgbG9hZGluZyAke3RoaXMuQVBQX05BTUV9YCk7XG5cblx0XHRhZGRJY29ucygpO1xuXHRcdHRoaXMuYWRkUmliYm9uSWNvbihcIkJyYXRJY29uXCIsIFwiQlJBVFwiLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmNvbW1hbmRzLnJpYmJvbkRpc3BsYXlDb21tYW5kcygpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5sb2FkU2V0dGluZ3MoKVxuXHRcdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHQvLyBNaWdyYXRlIHRva2VucyB0byBTZWNyZXRTdG9yYWdlIChPYnNpZGlhbiAxLjExLjQrKVxuXHRcdFx0XHRhd2FpdCBtaWdyYXRlVG9rZW5zVG9TZWNyZXRTdG9yYWdlKHRoaXMuYXBwLCB0aGlzLnNldHRpbmdzLCAoKSA9PiB0aGlzLnNhdmVTZXR0aW5ncygpKTtcblxuXHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5hZGRTZXR0aW5nVGFiKHRoaXMuc2V0dGluZ3NUYWIpO1xuXG5cdFx0XHRcdFx0dGhpcy5yZWdpc3Rlck9ic2lkaWFuUHJvdG9jb2xIYW5kbGVyKFwiYnJhdFwiLCB0aGlzLm9ic2lkaWFuUHJvdG9jb2xIYW5kbGVyKTtcblxuXHRcdFx0XHRcdHRoaXMuYmV0YVBsdWdpbnMuY2hlY2tJbmNvbXBhdGlibGVQbHVnaW5zKCk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy51cGRhdGVBdFN0YXJ0dXApIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0dm9pZCB0aGlzLmJldGFQbHVnaW5zLmNoZWNrRm9yUGx1Z2luVXBkYXRlc0FuZEluc3RhbGxVcGRhdGVzKGZhbHNlKTtcblx0XHRcdFx0XHRcdH0sIDYwMDAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MudXBkYXRlVGhlbWVzQXRTdGFydHVwKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZvaWQgdGhlbWVzQ2hlY2tBbmRVcGRhdGVzKHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0sIDEyMDAwMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdHdpbmRvdy5icmF0QVBJID0gdGhpcy5icmF0QXBpO1xuXHRcdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3I6IHVua25vd24pID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIHNldHRpbmdzOlwiLCBlcnJvcik7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGFzeW5jIGxvZyh0ZXh0VG9Mb2c6IHN0cmluZywgdmVyYm9zZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0YXdhaXQgbG9nZ2VyKHRoaXMsIHRleHRUb0xvZywgdmVyYm9zZSk7XG5cdH1cblxuXHRvbnVubG9hZCgpOiB2b2lkIHtcblx0XHRjb25zb2xlLmRlYnVnKGB1bmxvYWRpbmcgJHt0aGlzLkFQUF9OQU1FfWApO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGxvYWRlZFNldHRpbmdzID0gKGF3YWl0IHRoaXMubG9hZERhdGEoKSkgYXMgUGFydGlhbDxTZXR0aW5ncz4gfCBudWxsO1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBsb2FkZWRTZXR0aW5ncyA/PyB7fSk7XG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxuXG5cdG9ic2lkaWFuUHJvdG9jb2xIYW5kbGVyID0gKHBhcmFtczogT2JzaWRpYW5Qcm90b2NvbERhdGEpID0+IHtcblx0XHRpZiAoIXBhcmFtcy5wbHVnaW4gJiYgIXBhcmFtcy50aGVtZSkge1xuXHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMsIFwiQ291bGQgbm90IGxvY2F0ZSB0aGUgcmVwb3NpdG9yeSBmcm9tIHRoZSBVUkwuXCIsIDEwKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IHdoaWNoIG9mIFtcInBsdWdpblwiLCBcInRoZW1lXCJdKSB7XG5cdFx0XHRpZiAocGFyYW1zW3doaWNoXSkge1xuXHRcdFx0XHRsZXQgbW9kYWw6IEFkZE5ld1BsdWdpbk1vZGFsIHwgQWRkTmV3VGhlbWU7XG5cdFx0XHRcdHN3aXRjaCAod2hpY2gpIHtcblx0XHRcdFx0XHRjYXNlIFwicGx1Z2luXCI6XG5cdFx0XHRcdFx0XHRtb2RhbCA9IG5ldyBBZGROZXdQbHVnaW5Nb2RhbCh0aGlzLCB0aGlzLmJldGFQbHVnaW5zLCB0cnVlLCBmYWxzZSwgcGFyYW1zW3doaWNoXSwgcGFyYW1zLnZlcnNpb24gPyBwYXJhbXMudmVyc2lvbiA6IHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwidGhlbWVcIjpcblx0XHRcdFx0XHRcdG1vZGFsID0gbmV3IEFkZE5ld1RoZW1lKHRoaXMpO1xuXHRcdFx0XHRcdFx0bW9kYWwuYWRkcmVzcyA9IHBhcmFtc1t3aGljaF07XG5cdFx0XHRcdFx0XHRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG4iLCAiaW1wb3J0IHR5cGUge30gZnJvbSBcIkBvYnNpZGlhbi10eXBpbmdzL29ic2lkaWFuLXB1YmxpYy0xLjExLjRcIjtcbmltcG9ydCB0eXBlIHsgUGx1Z2luTWFuaWZlc3QgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGFwaVZlcnNpb24sIE5vdGljZSwgbm9ybWFsaXplUGF0aCwgUGxhdGZvcm0sIHJlcXVpcmVBcGlWZXJzaW9uIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBjb21wYXJlIGFzIGNvbXBhcmVWZXJzaW9ucywgY29lcmNlIGFzIHNlbXZlckNvZXJjZSB9IGZyb20gXCJzZW12ZXJcIjtcbmltcG9ydCB7IGNvbmZpcm0gfSBmcm9tIFwic3JjL3VpL0NvbmZpcm1Nb2RhbFwiO1xuaW1wb3J0IHsgR0hSYXRlTGltaXRFcnJvciwgR2l0SHViUmVzcG9uc2VFcnJvciB9IGZyb20gXCJzcmMvdXRpbHMvR2l0SHViQVBJRXJyb3JzXCI7XG5pbXBvcnQgdHlwZSBCcmF0UGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5pbXBvcnQgeyBhZGRCZXRhUGx1Z2luVG9MaXN0IH0gZnJvbSBcIi4uL3NldHRpbmdzXCI7XG5pbXBvcnQgQWRkTmV3UGx1Z2luTW9kYWwgZnJvbSBcIi4uL3VpL0FkZE5ld1BsdWdpbk1vZGFsXCI7XG5pbXBvcnQgeyBpc0Nvbm5lY3RlZFRvSW50ZXJuZXQgfSBmcm9tIFwiLi4vdXRpbHMvaW50ZXJuZXRjb25uZWN0aW9uXCI7XG5pbXBvcnQgeyB0b2FzdE1lc3NhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHtcblx0Z3JhYkNvbW1tdW5pdHlQbHVnaW5MaXN0LFxuXHRncmFiUmVsZWFzZUZpbGVGcm9tUmVwb3NpdG9yeSxcblx0Z3JhYlJlbGVhc2VGcm9tUmVwb3NpdG9yeSxcblx0aXNQcml2YXRlUmVwbyxcblx0dHlwZSBSZWxlYXNlLFxufSBmcm9tIFwiLi9naXRodWJVdGlsc1wiO1xuXG4vKipcbiAqIGFsbCB0aGUgZmlsZXMgbmVlZGVkIGZvciBhIHBsdWdpbiBiYXNlZCBvbiB0aGUgcmVsZWFzZSBmaWxlcyBhcmUgaHJlXG4gKi9cbmludGVyZmFjZSBSZWxlYXNlRmlsZXMge1xuXHRtYWluSnM6IHN0cmluZyB8IG51bGw7XG5cdG1hbmlmZXN0OiBzdHJpbmcgfCBudWxsO1xuXHRzdHlsZXM6IHN0cmluZyB8IG51bGw7XG59XG5cbmludGVyZmFjZSBQbHVnaW5NYW5pZmVzdEV4IGV4dGVuZHMgUGx1Z2luTWFuaWZlc3Qge1xuXHRicmF0OiB7XG5cdFx0aXNJbmNvbXBhdGlibGU/OiBib29sZWFuO1xuXHRcdGlzRGVza3RvcE9ubHlPcmlnaW5hbD86IGJvb2xlYW47XG5cdFx0bWluQXBwVmVyc2lvbk9yaWdpbmFsPzogc3RyaW5nO1xuXHR9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyYWR1YXRlZFBsdWdpbiB7XG5cdHJlcG86IHN0cmluZztcblx0aW5zdGFsbGVkVmVyc2lvbjogc3RyaW5nO1xuXHRzdGFibGVWZXJzaW9uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUHJpbWFyeSBoYW5kbGVyIGZvciBhZGRpbmcsIHVwZGF0aW5nLCBkZWxldGluZyBiZXRhIHBsdWdpbnMgdHJhY2tlZCBieSB0aGlzIHBsdWdpblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCZXRhUGx1Z2lucyB7XG5cdHBsdWdpbjogQnJhdFBsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihwbHVnaW46IEJyYXRQbHVnaW4pIHtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBvcGVucyB0aGUgQWRkTmV3UGx1Z2luTW9kYWwgdG8gZ2V0IGluZm8gZm9yICBhIG5ldyBiZXRhIHBsdWdpblxuXHQgKiBAcGFyYW0gb3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcyAtIHdpbGwgb3BlbiBzZXR0aW5ncyBzY3JlZW4gYWZ0ZXJ3YXJkcy4gVXNlZCB3aGVuIHRoaXMgY29tbWFuZCBpcyBjYWxsZWQgZnJvbSBzZXR0aW5ncyB0YWJcblx0ICogQHBhcmFtIHVzZUZyb3plblZlcnNpb24gLSBpbnN0YWxsIHRoZSBwbHVnaW4gdXNpbmcgZnJvemVuIHZlcnNpb24uXG5cdCAqIEBwYXJhbSBwcmVmaWxsUmVwbyAtIHByZWZpbGwgdGhlIHJlcG9zaXRvcnkgZmllbGQgaW4gdGhlIG1vZGFsLlxuXHQgKiBAcGFyYW0gcHJlZmlsbFZlcnNpb24gLSBwcmVmaWxsIHRoZSB2ZXJzaW9uIGZpZWxkIGluIHRoZSBtb2RhbC5cblx0ICogQHBhcmFtIHByZWZpbGxTZWNyZXROYW1lIC0gcHJlZmlsbCB0aGUgc2VjcmV0IG5hbWUgZmllbGQgaW4gdGhlIG1vZGFsIChuYW1lIG9mIHNlY3JldCBpbiBTZWNyZXRTdG9yYWdlKS5cblx0ICovXG5cdGRpc3BsYXlBZGROZXdQbHVnaW5Nb2RhbChcblx0XHRvcGVuU2V0dGluZ3NUYWJBZnRlcndhcmRzID0gZmFsc2UsXG5cdFx0dXNlRnJvemVuVmVyc2lvbiA9IGZhbHNlLFxuXHRcdHByZWZpbGxSZXBvID0gXCJcIixcblx0XHRwcmVmaWxsVmVyc2lvbiA9IFwiXCIsXG5cdFx0cHJlZmlsbFNlY3JldE5hbWUgPSBcIlwiLFxuXHRcdG9uU3VibWl0dGVkPzogKCkgPT4gdm9pZCxcblx0KTogdm9pZCB7XG5cdFx0Y29uc3QgbmV3UGx1Z2luID0gbmV3IEFkZE5ld1BsdWdpbk1vZGFsKFxuXHRcdFx0dGhpcy5wbHVnaW4sXG5cdFx0XHR0aGlzLFxuXHRcdFx0b3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcyxcblx0XHRcdHVzZUZyb3plblZlcnNpb24sXG5cdFx0XHRwcmVmaWxsUmVwbyxcblx0XHRcdHByZWZpbGxWZXJzaW9uLFxuXHRcdFx0cHJlZmlsbFNlY3JldE5hbWUsXG5cdFx0XHRvblN1Ym1pdHRlZCxcblx0XHQpO1xuXHRcdG5ld1BsdWdpbi5vcGVuKCk7XG5cdH1cblxuXHQvKipcblx0ICogVmFsaWRhdGVzIGEgR2l0SHViIHJlcG9zaXRvcnkgdG8gZGV0ZXJtaW5lIGlmIGl0IGNvbnRhaW5zIGEgdmFsaWQgT2JzaWRpYW4gcGx1Z2luLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVwb3NpdG9yeVBhdGggLSBUaGUgcGF0aCB0byB0aGUgR2l0SHViIHJlcG9zaXRvcnkuXG5cdCAqIEBwYXJhbSBnZXRCZXRhTWFuaWZlc3QgLSBXaGV0aGVyIHRvIGZldGNoIHRoZSBiZXRhIG1hbmlmZXN0IGluc3RlYWQgb2YgdGhlIHN0YWJsZSBvbmUuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG5cdCAqIEBwYXJhbSByZXBvcnRJc3N1ZXMgLSBXaGV0aGVyIHRvIGRpc3BsYXkgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIHVzZXIuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG5cdCAqIEBwYXJhbSBzcGVjaWZ5VmVyc2lvbiAtIEEgc3BlY2lmaWMgdmVyc2lvbiB0byB2YWxpZGF0ZS4gRGVmYXVsdHMgdG8gYW4gZW1wdHkgc3RyaW5nLCB3aGljaCBmZXRjaGVzIHRoZSBsYXRlc3QgcmVsZWFzZS5cblx0ICogQHBhcmFtIHByaXZhdGVBcGlLZXkgLSBBbiBvcHRpb25hbCBwcml2YXRlIEFQSSBrZXkgZm9yIGFjY2Vzc2luZyBwcml2YXRlIHJlcG9zaXRvcmllcy4gRGVmYXVsdHMgdG8gYW4gZW1wdHkgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcGx1Z2luJ3MgYFBsdWdpbk1hbmlmZXN0YCBpZiB2YWxpZCwgb3IgYG51bGxgIGlmIHZhbGlkYXRpb24gZmFpbHMuXG5cdCAqXG5cdCAqIEB0aHJvd3MgR0hSYXRlTGltaXRFcnJvciAtIElmIHRoZSBHaXRIdWIgQVBJIHJhdGUgbGltaXQgaXMgZXhjZWVkZWQuXG5cdCAqXG5cdCAqIEByZW1hcmtzXG5cdCAqIC0gVGhlIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgcmVwb3NpdG9yeSBpcyBwcml2YXRlIGFuZCBmZXRjaGVzIHRoZSBsYXRlc3QgcmVsZWFzZSBvciBhIHNwZWNpZmllZCB2ZXJzaW9uLlxuXHQgKiAtIEl0IHZhbGlkYXRlcyB0aGUgcHJlc2VuY2Ugb2YgYSBgbWFuaWZlc3QuanNvbmAgZmlsZSBhbmQgZW5zdXJlcyBpdCBjb250YWlucyByZXF1aXJlZCBhdHRyaWJ1dGVzIChgaWRgIGFuZCBgdmVyc2lvbmApLlxuXHQgKiAtIElmIHRoZSB2ZXJzaW9uIGluIHRoZSBgbWFuaWZlc3QuanNvbmAgZG9lcyBub3QgbWF0Y2ggdGhlIHJlbGVhc2UgdmVyc2lvbiwgdGhlIHJlbGVhc2UgdmVyc2lvbiB3aWxsIG92ZXJyaWRlIHRoZSBtYW5pZmVzdCB2ZXJzaW9uLlxuXHQgKiAtIEVycm9yIG1lc3NhZ2VzIGFyZSBsb2dnZWQgb3IgZGlzcGxheWVkIGJhc2VkIG9uIHRoZSBgcmVwb3J0SXNzdWVzYCBmbGFnLlxuXHQgKi9cblx0YXN5bmMgdmFsaWRhdGVSZXBvc2l0b3J5KFxuXHRcdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdFx0Z2V0QmV0YU1hbmlmZXN0ID0gZmFsc2UsXG5cdFx0cmVwb3J0SXNzdWVzID0gZmFsc2UsXG5cdFx0c3BlY2lmeVZlcnNpb24gPSBcIlwiLFxuXHRcdHByaXZhdGVBcGlLZXkgPSBcIlwiLFxuXHQpOiBQcm9taXNlPFBsdWdpbk1hbmlmZXN0IHwgbnVsbD4ge1xuXHRcdGNvbnN0IG5vdGljZVRpbWVvdXQgPSAxNTtcblxuXHRcdC8vIFVzZSB0aGUgcHJvdmlkZWQgdG9rZW4gZm9yIHZhbGlkYXRpb25cblx0XHRjb25zdCB0b2tlbiA9IHByaXZhdGVBcGlLZXk7XG5cblx0XHQvLyBHaXRIdWIgQVBJIGFjY2VzcyBtaWdodCB0aHJvdyBhIHJhdGUgbGltaXRcblx0XHR0cnkge1xuXHRcdFx0Ly8gY2hlY2sgaWYgdGhlIHJlcG9zaXRvcnkgaXMgcHJpdmF0ZVxuXHRcdFx0Y29uc3QgaXNQcml2YXRlID0gYXdhaXQgaXNQcml2YXRlUmVwbyhyZXBvc2l0b3J5UGF0aCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSwgdG9rZW4pO1xuXG5cdFx0XHQvLyBHcmFiIHRoZSBtYW5pZmVzdC5qc29uIGZvciB0aGUgbGF0ZXN0IHJlbGVhc2UgZnJvbSB0aGUgcmVwb3NpdG9yeVxuXHRcdFx0Y29uc3QgcmVsZWFzZTogUmVsZWFzZSB8IG51bGwgPSBhd2FpdCBncmFiUmVsZWFzZUZyb21SZXBvc2l0b3J5KFxuXHRcdFx0XHRyZXBvc2l0b3J5UGF0aCxcblx0XHRcdFx0c3BlY2lmeVZlcnNpb24sXG5cdFx0XHRcdGdldEJldGFNYW5pZmVzdCxcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSxcblx0XHRcdFx0aXNQcml2YXRlLFxuXHRcdFx0XHR0b2tlbixcblx0XHRcdCk7XG5cblx0XHRcdGlmICghcmVsZWFzZSkge1xuXHRcdFx0XHRpZiAocmVwb3J0SXNzdWVzKSB7XG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKFxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4sXG5cdFx0XHRcdFx0XHRgJHtyZXBvc2l0b3J5UGF0aH1cXG5UaGlzIGRvZXMgbm90IHNlZW0gdG8gYmUgYW4gb2JzaWRpYW4gcGx1Z2luIHdpdGggdmFsaWQgcmVsZWFzZXMsIGFzIHRoZXJlIGFyZSBubyByZWxlYXNlcyBhdmFpbGFibGUuYCxcblx0XHRcdFx0XHRcdG5vdGljZVRpbWVvdXQsXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiQlJBVDogdmFsaWRhdGVSZXBvc2l0b3J5XCIsIHJlcG9zaXRvcnlQYXRoLCBnZXRCZXRhTWFuaWZlc3QsIHJlcG9ydElzc3Vlcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJhd01hbmlmZXN0ID0gYXdhaXQgZ3JhYlJlbGVhc2VGaWxlRnJvbVJlcG9zaXRvcnkoXG5cdFx0XHRcdHJlbGVhc2UsXG5cdFx0XHRcdFwibWFuaWZlc3QuanNvblwiLFxuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlLFxuXHRcdFx0XHRpc1ByaXZhdGUsXG5cdFx0XHRcdHRva2VuLFxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKCFyYXdNYW5pZmVzdCkge1xuXHRcdFx0XHQvLyB0aGlzIGlzIGEgcGx1Z2luIHdpdGggYSBtYW5pZmVzdCBqc29uLCB0cnkgdG8gc2VlIGlmIHRoZXJlIGlzIGEgYmV0YSB2ZXJzaW9uXG5cdFx0XHRcdGlmIChyZXBvcnRJc3N1ZXMpIHtcblx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UoXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbixcblx0XHRcdFx0XHRcdGAke3JlcG9zaXRvcnlQYXRofVxcblRoaXMgZG9lcyBub3Qgc2VlbSB0byBiZSBhbiBvYnNpZGlhbiBwbHVnaW4sIGFzIHRoZXJlIGlzIG5vIG1hbmlmZXN0Lmpzb24gZmlsZS5gLFxuXHRcdFx0XHRcdFx0bm90aWNlVGltZW91dCxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJCUkFUOiB2YWxpZGF0ZVJlcG9zaXRvcnlcIiwgcmVwb3NpdG9yeVBhdGgsIGdldEJldGFNYW5pZmVzdCwgcmVwb3J0SXNzdWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUGFyc2UgdGhlIHJldHVybmVkIGZpbGUgYW5kIHZlcmlmeSB0aGF0IHRoZSBtYWluZmVzdCBoYXMgc29tZSBrZXkgZWxlbWVudHMsIGxpa2UgSUQgYW5kIHZlcnNpb25cblx0XHRcdGNvbnN0IG1hbmlmZXN0SnNvbiA9IEpTT04ucGFyc2UocmF3TWFuaWZlc3QpIGFzIFBsdWdpbk1hbmlmZXN0O1xuXHRcdFx0aWYgKCEoXCJpZFwiIGluIG1hbmlmZXN0SnNvbikpIHtcblx0XHRcdFx0Ly8gdGhpcyBpcyBhIHBsdWdpbiB3aXRoIGEgbWFuaWZlc3QganNvbiwgdHJ5IHRvIHNlZSBpZiB0aGVyZSBpcyBhIGJldGEgdmVyc2lvblxuXHRcdFx0XHRpZiAocmVwb3J0SXNzdWVzKVxuXHRcdFx0XHRcdHRvYXN0TWVzc2FnZShcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLFxuXHRcdFx0XHRcdFx0YCR7cmVwb3NpdG9yeVBhdGh9XFxuVGhlIHBsdWdpbiBpZCBhdHRyaWJ1dGUgZm9yIHRoZSByZWxlYXNlIGlzIG1pc3NpbmcgZnJvbSB0aGUgbWFuaWZlc3QgZmlsZWAsXG5cdFx0XHRcdFx0XHRub3RpY2VUaW1lb3V0LFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCEoXCJ2ZXJzaW9uXCIgaW4gbWFuaWZlc3RKc29uKSkge1xuXHRcdFx0XHQvLyB0aGlzIGlzIGEgcGx1Z2luIHdpdGggYSBtYW5pZmVzdCBqc29uLCB0cnkgdG8gc2VlIGlmIHRoZXJlIGlzIGEgYmV0YSB2ZXJzaW9uXG5cdFx0XHRcdGlmIChyZXBvcnRJc3N1ZXMpXG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKFxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4sXG5cdFx0XHRcdFx0XHRgJHtyZXBvc2l0b3J5UGF0aH1cXG5UaGUgdmVyc2lvbiBhdHRyaWJ1dGUgZm9yIHRoZSByZWxlYXNlIGlzIG1pc3NpbmcgZnJvbSB0aGUgbWFuaWZlc3QgZmlsZWAsXG5cdFx0XHRcdFx0XHRub3RpY2VUaW1lb3V0LFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbXByb3ZlIHJvYnVzdG5lc3M6IGlmIHNlbXZlciBjb2VyY2lvbiBmYWlscywgY29tcGFyZSByYXcgdmVyc2lvbnMuXG5cdFx0XHRjb25zdCBleHBlY3RlZFZlcnNpb24gPSBzZW12ZXJDb2VyY2UocmVsZWFzZS50YWdfbmFtZSwge1xuXHRcdFx0XHRpbmNsdWRlUHJlcmVsZWFzZTogdHJ1ZSxcblx0XHRcdFx0bG9vc2U6IHRydWUsXG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IG1hbmlmZXN0VmVyc2lvbiA9IHNlbXZlckNvZXJjZShtYW5pZmVzdEpzb24udmVyc2lvbiwge1xuXHRcdFx0XHRpbmNsdWRlUHJlcmVsZWFzZTogdHJ1ZSxcblx0XHRcdFx0bG9vc2U6IHRydWUsXG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3QgaGFzVmVyc2lvbk1pc21hdGNoID1cblx0XHRcdFx0ZXhwZWN0ZWRWZXJzaW9uICYmIG1hbmlmZXN0VmVyc2lvblxuXHRcdFx0XHRcdD8gY29tcGFyZVZlcnNpb25zKGV4cGVjdGVkVmVyc2lvbi52ZXJzaW9uLCBtYW5pZmVzdFZlcnNpb24udmVyc2lvbikgIT09IDBcblx0XHRcdFx0XHQ6IGV4cGVjdGVkVmVyc2lvbiAhPT0gbnVsbCAmJiBtYW5pZmVzdEpzb24udmVyc2lvbiAhPT0gcmVsZWFzZS50YWdfbmFtZTtcblxuXHRcdFx0aWYgKGhhc1ZlcnNpb25NaXNtYXRjaCAmJiBleHBlY3RlZFZlcnNpb24pIHtcblx0XHRcdFx0aWYgKHJlcG9ydElzc3Vlcylcblx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UoXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbixcblx0XHRcdFx0XHRcdGAke3JlcG9zaXRvcnlQYXRofVxcblZlcnNpb24gbWlzbWF0Y2ggZGV0ZWN0ZWQ6XFxuUmVsZWFzZSB0YWcgdmVyc2lvbjogJHtyZWxlYXNlLnRhZ19uYW1lfVxcbk1hbmlmZXN0IHZlcnNpb246ICR7bWFuaWZlc3RKc29uLnZlcnNpb259XFxuXFxuVGhlIHJlbGVhc2UgdGFnIHZlcnNpb24gd2lsbCBiZSB1c2VkIHRvIGVuc3VyZSBjb25zaXN0ZW5jeS5gLFxuXHRcdFx0XHRcdFx0bm90aWNlVGltZW91dCxcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIE92ZXJ3cml0ZSB0aGUgbWFuaWZlc3QgdmVyc2lvbiB3aXRoIHRoZSBub3JtYWxpemVkIHJlbGVhc2UgdmVyc2lvbi5cblx0XHRcdFx0bWFuaWZlc3RKc29uLnZlcnNpb24gPSBleHBlY3RlZFZlcnNpb24udmVyc2lvbjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYW5pZmVzdEpzb247XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEdIUmF0ZUxpbWl0RXJyb3IpIHtcblx0XHRcdFx0Y29uc3QgbXNnID0gYEdpdEh1YiBBUEkgcmF0ZSBsaW1pdCBleGNlZWRlZC4gUmVzZXQgaW4gJHtlcnJvci5nZXRNaW51dGVzVG9SZXNldCgpfSBtaW51dGVzLmA7XG5cdFx0XHRcdGlmIChyZXBvcnRJc3N1ZXMpIHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnLCBub3RpY2VUaW1lb3V0KTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgQlJBVDogdmFsaWRhdGVSZXBvc2l0b3J5ICR7ZXJyb3J9YCk7XG5cblx0XHRcdFx0dG9hc3RNZXNzYWdlKFxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLFxuXHRcdFx0XHRcdGAke2Vycm9yLm1lc3NhZ2V9IENvbnNpZGVyIGFkZGluZyBhIHBlcnNvbmFsIGFjY2VzcyB0b2tlbiBpbiBCUkFUIHNldHRpbmdzIGZvciBoaWdoZXIgbGltaXRzLiBTZWUgZG9jdW1lbnRhdGlvbiBmb3IgZGV0YWlscy5gLFxuXHRcdFx0XHRcdDIwLFxuXHRcdFx0XHRcdCgpOiB2b2lkID0+IHtcblx0XHRcdFx0XHRcdHdpbmRvdy5vcGVuKFwiaHR0cHM6Ly9naXRodWIuY29tL1RmVEhhY2tlci9vYnNpZGlhbjQyLWJyYXQvYmxvYi9tYWluL0JSQVQtREVWRUxPUEVSLUdVSURFLm1kI2dpdGh1Yi1hcGktcmF0ZS1saW1pdHNcIik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgR2l0SHViUmVzcG9uc2VFcnJvcikge1xuXHRcdFx0XHRpZiAocmVwb3J0SXNzdWVzKSB7XG5cdFx0XHRcdFx0aWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG5cdFx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UoXG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLFxuXHRcdFx0XHRcdFx0XHRgJHtyZXBvc2l0b3J5UGF0aH1cXG5HaXRIdWIgQVBJIEF1dGhlbnRpY2F0aW9uIGVycm9yLiBQbGVhc2UgdmVyaWZ5IHRoYXQgeW91ciBwZXJzb25hbCBhY2Nlc3MgdG9rZW4gaXMgdmFsaWQgYW5kIHNldCBjb3JyZWN0bHkuYCxcblx0XHRcdFx0XHRcdFx0bm90aWNlVGltZW91dCxcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgYCR7cmVwb3NpdG9yeVBhdGh9XFxuR2l0SHViIEFQSSBlcnJvciAke2Vycm9yLnN0YXR1c306ICR7ZXJyb3IubWVzc2FnZX1gLCBub3RpY2VUaW1lb3V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc29sZS5lcnJvcihgQlJBVDogdmFsaWRhdGVSZXBvc2l0b3J5ICR7ZXJyb3J9YCk7XG5cblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXBvcnRJc3N1ZXMpXG5cdFx0XHRcdHRvYXN0TWVzc2FnZShcblx0XHRcdFx0XHR0aGlzLnBsdWdpbixcblx0XHRcdFx0XHRgJHtyZXBvc2l0b3J5UGF0aH1cXG5VbnNwZWNpZmllZCBlcnJvciBlbmNvdW50ZXJlZDogJHtTdHJpbmcoZXJyb3IpfSwgdmVyaWZ5IGRlYnVnIGZvciBtb3JlIGluZm9ybWF0aW9uLmAsXG5cdFx0XHRcdFx0bm90aWNlVGltZW91dCxcblx0XHRcdFx0KTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIGFsbCB0aGUgcmVsZWFzZSBmaWxlcyBiYXNlZCBvbiB0aGUgdmVyc2lvbiBudW1iZXIgaW4gdGhlIG1hbmlmZXN0XG5cdCAqXG5cdCAqIEBwYXJhbSByZXBvc2l0b3J5UGF0aCAtIHBhdGggdG8gdGhlIEdpdEh1YiByZXBvc2l0b3J5XG5cdCAqIEBwYXJhbSBnZXRNYW5pZmVzdCAgICAtIGdyYWIgdGhlIHJlbW90ZSBtYW5pZmVzdCBmaWxlXG5cdCAqIEBwYXJhbSBzcGVjaWZ5VmVyc2lvbiAtIGdyYWIgdGhlIHNwZWNpZmllZCB2ZXJzaW9uIGlmIHNldFxuXHQgKiBAcGFyYW0gdG9rZW5WYWx1ZSAgLSB0b2tlbiB2YWx1ZSBmcm9tIFNlY3JldFN0b3JhZ2Vcblx0ICpcblx0ICogQHJldHVybnMgYWxsIHJlbGVhc2UgZmlsZXMgYXMgc3RyaW5ncyBiYXNlZCBvbiB0aGUgUmVsZWFzZUZpbGVzIGludGVyZmFjZVxuXHQgKi9cblx0YXN5bmMgZ2V0QWxsUmVsZWFzZUZpbGVzKHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsIGdldE1hbmlmZXN0OiBib29sZWFuLCBzcGVjaWZ5VmVyc2lvbiA9IFwiXCIsIHRva2VuVmFsdWUgPSBcIlwiKTogUHJvbWlzZTxSZWxlYXNlRmlsZXM+IHtcblx0XHQvLyBVc2UgcHJvdmlkZWQgdG9rZW4gZm9yIEFQSSBjYWxsc1xuXHRcdGNvbnN0IHRva2VuID0gdG9rZW5WYWx1ZTtcblxuXHRcdC8vIGNoZWNrIGlmIHRoZSByZXBvc2l0b3J5IGlzIHByaXZhdGVcblx0XHRjb25zdCBpc1ByaXZhdGUgPSBhd2FpdCBpc1ByaXZhdGVSZXBvKHJlcG9zaXRvcnlQYXRoLCB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlLCB0b2tlbik7XG5cblx0XHQvLyBHZXQgdGhlIGxhdGVzdCByZWxlYXNlIGZyb20gdGhlIHJlcG9zaXRvcnlcblx0XHRjb25zdCByZWxlYXNlOiBSZWxlYXNlIHwgbnVsbCA9IGF3YWl0IGdyYWJSZWxlYXNlRnJvbVJlcG9zaXRvcnkoXG5cdFx0XHRyZXBvc2l0b3J5UGF0aCxcblx0XHRcdHNwZWNpZnlWZXJzaW9uLFxuXHRcdFx0Z2V0TWFuaWZlc3QsXG5cdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlLFxuXHRcdFx0aXNQcml2YXRlLFxuXHRcdFx0dG9rZW4sXG5cdFx0KTtcblxuXHRcdGlmICghcmVsZWFzZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTm8gcmVsZWFzZSBmb3VuZFwiKTtcblx0XHR9XG5cblx0XHQvLyBpZiB3ZSBoYXZlIHZlcnNpb24gc3BlY2lmaWVkLCB3ZSBhbHdheXMgd2FudCB0byBnZXQgdGhlIHJlbW90ZSBtYW5pZmVzdCBmaWxlLlxuXHRcdGNvbnN0IHJlYWxseUdldE1hbmlmZXN0T3JOb3QgPSBnZXRNYW5pZmVzdCB8fCBzcGVjaWZ5VmVyc2lvbiAhPT0gXCJcIjtcblxuXHRcdGNvbnNvbGUuZGVidWcoeyByZWFsbHlHZXRNYW5pZmVzdE9yTm90LCB2ZXJzaW9uOiByZWxlYXNlLnRhZ19uYW1lIH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG1haW5KczogYXdhaXQgZ3JhYlJlbGVhc2VGaWxlRnJvbVJlcG9zaXRvcnkocmVsZWFzZSwgXCJtYWluLmpzXCIsIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlYnVnZ2luZ01vZGUsIGlzUHJpdmF0ZSwgdG9rZW4pLFxuXHRcdFx0bWFuaWZlc3Q6IHJlYWxseUdldE1hbmlmZXN0T3JOb3Rcblx0XHRcdFx0PyBhd2FpdCBncmFiUmVsZWFzZUZpbGVGcm9tUmVwb3NpdG9yeShyZWxlYXNlLCBcIm1hbmlmZXN0Lmpzb25cIiwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSwgaXNQcml2YXRlLCB0b2tlbilcblx0XHRcdFx0OiBcIlwiLFxuXHRcdFx0c3R5bGVzOiBhd2FpdCBncmFiUmVsZWFzZUZpbGVGcm9tUmVwb3NpdG9yeShyZWxlYXNlLCBcInN0eWxlcy5jc3NcIiwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSwgaXNQcml2YXRlLCB0b2tlbiksXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXcml0ZXMgdGhlIHBsdWdpbiByZWxlYXNlIGZpbGVzIHRvIHRoZSBsb2NhbCBvYnNpZGlhbiAucGx1Z2lucyBmb2xkZXJcblx0ICpcblx0ICogQHBhcmFtIGJldGFQbHVnaW5JZCAtIHRoZSBpZCBvZiB0aGUgcGx1Z2luIChub3QgdGhlIHJlcG9zaXRvcnkgcGF0aClcblx0ICogQHBhcmFtIHJlbEZpbGVzICAgICAtIHJlbGVhc2UgZmlsZSBhcyBzdHJpbmdzLCBiYXNlZCBvbiB0aGUgUmVsZWFzZUZpbGVzIGludGVyZmFjZVxuXHQgKlxuXHQgKi9cblx0YXN5bmMgd3JpdGVSZWxlYXNlRmlsZXNUb1BsdWdpbkZvbGRlcihiZXRhUGx1Z2luSWQ6IHN0cmluZywgcmVsRmlsZXM6IFJlbGVhc2VGaWxlcyk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHBsdWdpblRhcmdldEZvbGRlclBhdGggPSBgJHtub3JtYWxpemVQYXRoKGAke3RoaXMucGx1Z2luLmFwcC52YXVsdC5jb25maWdEaXJ9L3BsdWdpbnMvJHtiZXRhUGx1Z2luSWR9YCl9L2A7XG5cdFx0Y29uc3QgeyBhZGFwdGVyIH0gPSB0aGlzLnBsdWdpbi5hcHAudmF1bHQ7XG5cdFx0aWYgKCEoYXdhaXQgYWRhcHRlci5leGlzdHMocGx1Z2luVGFyZ2V0Rm9sZGVyUGF0aCkpKSB7XG5cdFx0XHRhd2FpdCBhZGFwdGVyLm1rZGlyKHBsdWdpblRhcmdldEZvbGRlclBhdGgpO1xuXHRcdH1cblx0XHRhd2FpdCBhZGFwdGVyLndyaXRlKGAke3BsdWdpblRhcmdldEZvbGRlclBhdGh9bWFpbi5qc2AsIHJlbEZpbGVzLm1haW5KcyA/PyBcIlwiKTtcblx0XHRhd2FpdCBhZGFwdGVyLndyaXRlKGAke3BsdWdpblRhcmdldEZvbGRlclBhdGh9bWFuaWZlc3QuanNvbmAsIHJlbEZpbGVzLm1hbmlmZXN0ID8/IFwiXCIpO1xuXHRcdGlmIChyZWxGaWxlcy5zdHlsZXMpIGF3YWl0IGFkYXB0ZXIud3JpdGUoYCR7cGx1Z2luVGFyZ2V0Rm9sZGVyUGF0aH1zdHlsZXMuY3NzYCwgcmVsRmlsZXMuc3R5bGVzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQcmltYXJ5IGZ1bmN0aW9uIGZvciBhZGRpbmcgYSBuZXcgYmV0YSBwbHVnaW4gdG8gT2JzaWRpYW4uXG5cdCAqIEFsc28gdGhpcyBmdW5jdGlvbiBpcyB1c2VkIGZvciB1cGRhdGluZyBleGlzdGluZyBwbHVnaW5zLlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVwb3NpdG9yeVBhdGggICAgLSBwYXRoIHRvIEdpdEh1YiByZXBvc2l0b3J5IGZvcm1hdGVkIGFzIFVTRVJOQU1FL3JlcG9zaXRvcnlcblx0ICogQHBhcmFtIHVwZGF0ZVBsdWdpbkZpbGVzIC0gdHJ1ZSBpZiB0aGlzIGlzIGp1c3QgYW4gdXBkYXRlIG5vdCBhbiBpbnN0YWxsXG5cdCAqIEBwYXJhbSBzZWVJZlVwZGF0ZWRPbmx5ICAtIGlmIHRydWUsIGFuZCB1cGRhdGVQbHVnaW5GaWxlcyB0cnVlLCB3aWxsIGp1c3QgY2hlY2sgZm9yIHVwZGF0ZXMsIGJ1dCBub3QgZG8gdGhlIHVwZGF0ZS4gd2lsbCByZXBvcnQgdG8gdXNlciB0aGF0IHRoZXJlIGlzIGEgbmV3IHBsdWdpblxuXHQgKiBAcGFyYW0gcmVwb3J0SWZOb3RVcGR0ZWQgLSBpZiB0cnVlLCByZXBvcnQgaWYgYW4gdXBkYXRlIGhhcyBub3Qgc3VjY2VkXG5cdCAqIEBwYXJhbSBzcGVjaWZ5VmVyc2lvbiAgICAtIGlmIG5vdCBlbXB0eSwgbmVlZCB0byBpbnN0YWxsIGEgc3BlY2lmaWVkIHZlcnNpb24gaW5zdGVhZCBvZiB0aGUgdmFsdWUgaW4gbWFuaWZlc3QtYmV0YS5qc29uXG5cdCAqIEBwYXJhbSBmb3JjZVJlaW5zdGFsbCAgICAtIGlmIHRydWUsIHdpbGwgZm9yY2UgYSByZWluc3RhbGwgb2YgdGhlIHBsdWdpbiwgZXZlbiBpZiBpdCBpcyBhbHJlYWR5IGluc3RhbGxlZFxuXHQgKiBAcGFyYW0gZW5hYmxlQWZ0ZXJJbnN0YWxsIC0gaWYgdHJ1ZSwgd2lsbCBlbmFibGUgdGhlIHBsdWdpbiBhZnRlciBpbnN0YWxsXG5cdCAqIEBwYXJhbSBwcml2YXRlQXBpS2V5ICAgICAtIGlmIG5vdCBlbXB0eSwgd2lsbCB1c2UgdGhlIHByaXZhdGUgQVBJIGtleSB0byBhY2Nlc3MgdGhlIHJlcG9zaXRvcnksIG90aGVyd2lzZSBhIFBBVCBmcm9tIHNldHRpbmdzIHdpbGwgYmUgdXNlZCBpZiBhdmFpbGFibGVcblx0ICpcblx0ICogQHJldHVybnMgdHJ1ZSBpZiBzdWNjZWVkc1xuXHQgKi9cblx0YXN5bmMgYWRkUGx1Z2luKFxuXHRcdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdFx0dXBkYXRlUGx1Z2luRmlsZXMgPSBmYWxzZSxcblx0XHRzZWVJZlVwZGF0ZWRPbmx5ID0gZmFsc2UsXG5cdFx0cmVwb3J0SWZOb3RVcGR0ZWQgPSBmYWxzZSxcblx0XHRzcGVjaWZ5VmVyc2lvbiA9IFwiXCIsXG5cdFx0Zm9yY2VSZWluc3RhbGwgPSBmYWxzZSxcblx0XHRlbmFibGVBZnRlckluc3RhbGwgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVBZnRlckluc3RhbGwsXG5cdFx0c2VjcmV0TmFtZSA9IFwiXCIsIC8vIE5hbWUgb2Ygc2VjcmV0IGluIFNlY3JldFN0b3JhZ2Vcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXG5cdFx0XHRcdFx0XCJCUkFUOiBhZGRQbHVnaW5cIixcblx0XHRcdFx0XHRyZXBvc2l0b3J5UGF0aCxcblx0XHRcdFx0XHR1cGRhdGVQbHVnaW5GaWxlcyxcblx0XHRcdFx0XHRzZWVJZlVwZGF0ZWRPbmx5LFxuXHRcdFx0XHRcdHJlcG9ydElmTm90VXBkdGVkLFxuXHRcdFx0XHRcdHNwZWNpZnlWZXJzaW9uLFxuXHRcdFx0XHRcdGZvcmNlUmVpbnN0YWxsLFxuXHRcdFx0XHRcdGVuYWJsZUFmdGVySW5zdGFsbCxcblx0XHRcdFx0XHRzZWNyZXROYW1lID8gXCJ3aXRoIHNlY3JldFwiIDogXCJwdWJsaWNcIixcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0cmlldmUgYWN0dWFsIHRva2VuIHZhbHVlIGZyb20gU2VjcmV0U3RvcmFnZVxuXHRcdFx0bGV0IHRva2VuVmFsdWUgPSBcIlwiO1xuXHRcdFx0aWYgKHNlY3JldE5hbWUgJiYgc2VjcmV0TmFtZS50cmltKCkgIT09IFwiXCIpIHtcblx0XHRcdFx0dG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChzZWNyZXROYW1lKSB8fCBcIlwiO1xuXHRcdFx0XHRpZiAoIXRva2VuVmFsdWUpIHtcblx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UoXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbixcblx0XHRcdFx0XHRcdGBTZWNyZXQgbm90IGZvdW5kIGZvciB0b2tlbiBuYW1lOiAke3NlY3JldE5hbWV9LiBQbGVhc2UgYWRkIGl0IHRvIFNlY3JldFN0b3JhZ2Ugb3IgY2xlYXIgdGhlIHRva2VuIG5hbWUgZm9yIHRoaXMgcGx1Z2luLmAsXG5cdFx0XHRcdFx0XHQxMCxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSkge1xuXHRcdFx0XHR0b2tlblZhbHVlID0gdGhpcy5wbHVnaW4uYXBwLnNlY3JldFN0b3JhZ2UuZ2V0U2VjcmV0KHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSkgfHwgXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgbm90aWNlVGltZW91dCA9IDEwO1xuXHRcdFx0Ly8gYXR0ZW1wdCB0byBnZXQgbWFuaWZlc3QtYmV0YS5qc29uXG5cdFx0XHRsZXQgcHJpbWFyeU1hbmlmZXN0ID0gYXdhaXQgdGhpcy52YWxpZGF0ZVJlcG9zaXRvcnkocmVwb3NpdG9yeVBhdGgsIHRydWUsIHRydWUsIHNwZWNpZnlWZXJzaW9uLCB0b2tlblZhbHVlKTtcblx0XHRcdGNvbnN0IHVzaW5nQmV0YU1hbmlmZXN0OiBib29sZWFuID0gISFwcmltYXJ5TWFuaWZlc3Q7XG5cdFx0XHQvLyBhdHRlbXB0IHRvIGdldCBtYW5pZmVzdC5qc29uXG5cdFx0XHRpZiAoIXVzaW5nQmV0YU1hbmlmZXN0KSBwcmltYXJ5TWFuaWZlc3QgPSBhd2FpdCB0aGlzLnZhbGlkYXRlUmVwb3NpdG9yeShyZXBvc2l0b3J5UGF0aCwgZmFsc2UsIHRydWUsIHNwZWNpZnlWZXJzaW9uLCB0b2tlblZhbHVlKTtcblxuXHRcdFx0aWYgKHByaW1hcnlNYW5pZmVzdCA9PT0gbnVsbCkge1xuXHRcdFx0XHRjb25zdCBtc2cgPSBgJHtyZXBvc2l0b3J5UGF0aH1cXG5BIG1hbmlmZXN0Lmpzb24gZmlsZSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgbGF0ZXN0IHJlbGVhc2Ugb2YgdGhlIHJlcG9zaXRvcnkuIFRoaXMgcGx1Z2luIGNhbm5vdCBiZSBpbnN0YWxsZWQuYDtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4ubG9nKG1zZywgdHJ1ZSk7XG5cdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnLCBub3RpY2VUaW1lb3V0KTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIU9iamVjdC5oYXNPd24ocHJpbWFyeU1hbmlmZXN0LCBcInZlcnNpb25cIikpIHtcblx0XHRcdFx0Y29uc3QgbXNnID0gYCR7cmVwb3NpdG9yeVBhdGh9XFxuVGhlIG1hbmlmZXN0Lmpzb24gZmlsZSBpbiB0aGUgbGF0ZXN0IHJlbGVhc2Ugb3IgcHJlLXJlbGVhc2Ugb2YgdGhlIHJlcG9zaXRvcnkgZG9lcyBub3QgaGF2ZSBhIHZlcnNpb24gbnVtYmVyIGluIHRoZSBmaWxlLiBUaGlzIHBsdWdpbiBjYW5ub3QgYmUgaW5zdGFsbGVkLmA7XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLmxvZyhtc2csIHRydWUpO1xuXHRcdFx0XHR0b2FzdE1lc3NhZ2UodGhpcy5wbHVnaW4sIG1zZywgbm90aWNlVGltZW91dCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGlzSW5jb21wYXRpYmxlID0gZmFsc2U7XG5cblx0XHRcdC8vIENoZWNrIG1hbmlmZXN0IG1pbkFwcFZlcnNpb24gYW5kIGN1cnJlbnQgdmVyc2lvbiBvZiBPYmlzaWRhbiwgZG9uJ3QgbG9hZCBwbHVnaW4gaWYgbm90IGNvbXBhdGlibGVcblx0XHRcdGlmIChPYmplY3QuaGFzT3duKHByaW1hcnlNYW5pZmVzdCwgXCJtaW5BcHBWZXJzaW9uXCIpKSB7XG5cdFx0XHRcdGlmICghcmVxdWlyZUFwaVZlcnNpb24ocHJpbWFyeU1hbmlmZXN0Lm1pbkFwcFZlcnNpb24pKSB7XG5cdFx0XHRcdFx0aWYgKHNwZWNpZnlWZXJzaW9uID09PSBcIlwiIHx8IHNwZWNpZnlWZXJzaW9uID09PSBcImxhdGVzdFwiIHx8ICF0aGlzLnBsdWdpbi5zZXR0aW5ncy5hbGxvd0luY29tcGF0aWJsZVBsdWdpbnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1zZyA9IGBQbHVnaW46ICR7cmVwb3NpdG9yeVBhdGh9XFxuXFxuVGhlIG1hbmlmZXN0Lmpzb24gZm9yIHRoaXMgcGx1Z2luIGluZGljYXRlcyB0aGF0IHRoZSBPYnNpZGlhbiB2ZXJzaW9uIG9mIHRoZSBhcHAgbmVlZHMgdG8gYmUgJHtwcmltYXJ5TWFuaWZlc3QubWluQXBwVmVyc2lvbn0sIGJ1dCB0aGlzIGluc3RhbGxhdGlvbiBvZiBPYnNpZGlhbiBpcyAke2FwaVZlcnNpb259LiBcXG5cXG5Zb3Ugd2lsbCBuZWVkIHRvIHVwZGF0ZSB5b3VyIE9ic2lkaWFuIHRvIHVzZSB0aGlzIHBsdWdpbiBvciBjb250YWN0IHRoZSBwbHVnaW4gZGV2ZWxvcGVyIGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5sb2cobXNnLCB0cnVlKTtcblx0XHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnLCAzMCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgY29uZmlybVJlc3VsdCA9IGF3YWl0IGNvbmZpcm0oe1xuXHRcdFx0XHRcdFx0YXBwOiB0aGlzLnBsdWdpbi5hcHAsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBjcmVhdGVGcmFnbWVudCgoZikgPT4ge1xuXHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCJQbHVnaW46IFwiKTtcblx0XHRcdFx0XHRcdFx0Zi5jcmVhdGVFbChcImNvZGVcIiwgeyB0ZXh0OiByZXBvc2l0b3J5UGF0aCB9KTtcblx0XHRcdFx0XHRcdFx0Zi5jcmVhdGVFbChcImJyXCIpO1xuXHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCJUaGUgXCIpO1xuXHRcdFx0XHRcdFx0XHRmLmNyZWF0ZUVsKFwiY29kZVwiLCB7IHRleHQ6IFwibWFuaWZlc3QuanNvblwiIH0pO1xuXHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCIgZm9yIHRoaXMgcGx1Z2luIGluZGljYXRlcyB0aGF0IHRoZSBPYnNpZGlhbiB2ZXJzaW9uIG9mIHRoZSBhcHAgbmVlZHMgdG8gYmUgXCIpO1xuXHRcdFx0XHRcdFx0XHRmLmNyZWF0ZUVsKFwiY29kZVwiLCB7IHRleHQ6IHByaW1hcnlNYW5pZmVzdC5taW5BcHBWZXJzaW9uIH0pO1xuXHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCIsIGJ1dCB0aGlzIGluc3RhbGxhdGlvbiBvZiBPYnNpZGlhbiBpcyBcIik7XG5cdFx0XHRcdFx0XHRcdGYuY3JlYXRlRWwoXCJjb2RlXCIsIHsgdGV4dDogYXBpVmVyc2lvbiB9KTtcblx0XHRcdFx0XHRcdFx0Zi5hcHBlbmRUZXh0KFwiLlwiKTtcblx0XHRcdFx0XHRcdFx0Zi5jcmVhdGVFbChcImJyXCIpO1xuXHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCJVc2luZyB0aGlzIHBsdWdpbiBpcyBub3QgcmVjb21tZW5kZWQgYW5kIG1heSBub3Qgd29yayBhcyBleHBlY3RlZC4gVXNlIGF0IHlvdXIgb3duIHJpc2suXCIpO1xuXHRcdFx0XHRcdFx0XHRmLmNyZWF0ZUVsKFwiYnJcIik7XG5cdFx0XHRcdFx0XHRcdGYuYXBwZW5kVGV4dChcIkRvIHlvdSB3YW50IHRvIGluc3RhbGwgaXQgYW55d2F5cz9cIik7XG5cdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGlmICghY29uZmlybVJlc3VsdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlzSW5jb21wYXRpYmxlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBub3cgdGhlIHVzZXIgbXVzdCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgcmVwb1xuXG5cdFx0XHRpbnRlcmZhY2UgRXJybm9UeXBlIHtcblx0XHRcdFx0ZXJybm86IG51bWJlcjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZ2V0UmVsZWFzZSA9IGFzeW5jICgpID0+IHtcblx0XHRcdFx0Y29uc3QgckZpbGVzID0gYXdhaXQgdGhpcy5nZXRBbGxSZWxlYXNlRmlsZXMocmVwb3NpdG9yeVBhdGgsIHVzaW5nQmV0YU1hbmlmZXN0LCBzcGVjaWZ5VmVyc2lvbiwgdG9rZW5WYWx1ZSk7XG5cblx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhcInJGaWxlc1wiLCByRmlsZXMpO1xuXHRcdFx0XHQvLyBpZiBiZXRhLCB1c2UgdGhhdCBtYW5pZmVzdCwgb3IgaWYgdGhlcmUgaXMgbm8gbWFuaWZlc3QgaW4gcmVsZWFzZSwgdXNlIHRoZSBwcmltYXJ5TWFuaWZlc3Rcblx0XHRcdFx0aWYgKHVzaW5nQmV0YU1hbmlmZXN0IHx8IHJGaWxlcy5tYW5pZmVzdCA9PT0gXCJcIikgckZpbGVzLm1hbmlmZXN0ID0gSlNPTi5zdHJpbmdpZnkocHJpbWFyeU1hbmlmZXN0KTtcblxuXHRcdFx0XHRjb25zdCBtYW5pZmVzdE9iaiA9IEpTT04ucGFyc2UockZpbGVzLm1hbmlmZXN0ID8/IFwiXCIpIGFzIFBsdWdpbk1hbmlmZXN0RXg7XG5cblx0XHRcdFx0aWYgKGlzSW5jb21wYXRpYmxlKSB7XG5cdFx0XHRcdFx0bWFuaWZlc3RPYmouYnJhdCA9IHtcblx0XHRcdFx0XHRcdGlzSW5jb21wYXRpYmxlOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWluQXBwVmVyc2lvbk9yaWdpbmFsOiBtYW5pZmVzdE9iai5taW5BcHBWZXJzaW9uLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0bWFuaWZlc3RPYmoubWluQXBwVmVyc2lvbiA9IGFwaVZlcnNpb247XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoUGxhdGZvcm0uaXNNb2JpbGUgJiYgbWFuaWZlc3RPYmouaXNEZXNrdG9wT25seSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hbGxvd0luY29tcGF0aWJsZVBsdWdpbnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGNvbmZpcm1SZXN1bHQgPSBhd2FpdCBjb25maXJtKHtcblx0XHRcdFx0XHRcdFx0YXBwOiB0aGlzLnBsdWdpbi5hcHAsXG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IGNyZWF0ZUZyYWdtZW50KChmKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Zi5hcHBlbmRUZXh0KFwiUGx1Z2luOiBcIik7XG5cdFx0XHRcdFx0XHRcdFx0Zi5jcmVhdGVFbChcImNvZGVcIiwgeyB0ZXh0OiByZXBvc2l0b3J5UGF0aCB9KTtcblx0XHRcdFx0XHRcdFx0XHRmLmNyZWF0ZUVsKFwiYnJcIik7XG5cdFx0XHRcdFx0XHRcdFx0Zi5hcHBlbmRUZXh0KFwiVGhlIFwiKTtcblx0XHRcdFx0XHRcdFx0XHRmLmNyZWF0ZUVsKFwiY29kZVwiLCB7IHRleHQ6IFwibWFuaWZlc3QuanNvblwiIH0pO1xuXHRcdFx0XHRcdFx0XHRcdGYuYXBwZW5kVGV4dChcIiBmb3IgdGhpcyBwbHVnaW4gaW5kaWNhdGVzIHRoYXQgdGhlIHBsdWdpbiBoYXMgXCIpO1xuXHRcdFx0XHRcdFx0XHRcdGYuY3JlYXRlRWwoXCJjb2RlXCIsIHsgdGV4dDogXCJpc0Rlc2t0b3BPbmx5OiB0cnVlXCIgfSk7XG5cdFx0XHRcdFx0XHRcdFx0Zi5hcHBlbmRUZXh0KFwiLCBidXQgeW91IGFyZSB1c2luZyBhIG1vYmlsZSBkZXZpY2UuXCIpO1xuXHRcdFx0XHRcdFx0XHRcdGYuY3JlYXRlRWwoXCJiclwiKTtcblx0XHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCJVc2luZyB0aGlzIHBsdWdpbiBpcyBub3QgcmVjb21tZW5kZWQgYW5kIG1heSBub3Qgd29yayBhcyBleHBlY3RlZC4gVXNlIGF0IHlvdXIgb3duIHJpc2suXCIpO1xuXHRcdFx0XHRcdFx0XHRcdGYuY3JlYXRlRWwoXCJiclwiKTtcblx0XHRcdFx0XHRcdFx0XHRmLmFwcGVuZFRleHQoXCJEbyB5b3Ugd2FudCB0byBmb3JjZWZ1bGx5IHJ1biBpdCBvbiBtb2JpbGUgYW55d2F5cz9cIik7XG5cdFx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRpZiAoIWNvbmZpcm1SZXN1bHQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtYW5pZmVzdE9iai5pc0Rlc2t0b3BPbmx5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRtYW5pZmVzdE9iai5icmF0ID8/PSB7fTtcblx0XHRcdFx0XHRcdG1hbmlmZXN0T2JqLmJyYXQuaXNEZXNrdG9wT25seU9yaWdpbmFsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdG1hbmlmZXN0T2JqLmJyYXQuaXNJbmNvbXBhdGlibGUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0aXNJbmNvbXBhdGlibGUgPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtc2cgPSBgUGx1Z2luOiAke3JlcG9zaXRvcnlQYXRofVxcblxcblRoZSBtYW5pZmVzdC5qc29uIGZvciB0aGlzIHBsdWdpbiBpbmRpY2F0ZXMgdGhhdCB0aGUgcGx1Z2luIGhhcyBpc0Rlc2t0b3BPbmx5OiB0cnVlLCBidXQgeW91IGFyZSB1c2luZyBhIG1vYmlsZSBkZXZpY2UuXFxuXFxuVGhlIHBsdWdpbiB3aWxsIG5vdCBiZSBpbnN0YWxsZWQuYDtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLmxvZyhtc2csIHRydWUpO1xuXHRcdFx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBtc2csIDMwKTtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc0luY29tcGF0aWJsZSkge1xuXHRcdFx0XHRcdHJGaWxlcy5tYW5pZmVzdCA9IEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0T2JqKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKSBjb25zb2xlLmRlYnVnKFwiQlJBVDogckZpbGVzLm1hbmlmZXN0XCIsIHVzaW5nQmV0YU1hbmlmZXN0LCByRmlsZXMpO1xuXG5cdFx0XHRcdGlmIChyRmlsZXMubWFpbkpzID09PSBudWxsKSB7XG5cdFx0XHRcdFx0Y29uc3QgbXNnID0gYCR7cmVwb3NpdG9yeVBhdGh9XFxuVGhlIHJlbGVhc2UgaXMgbm90IGNvbXBsZXRlIGFuZCBjYW5ub3QgYmUgZG93bmxvYWRlZC4gbWFpbi5qcyBpcyBtaXNzaW5nIGZyb20gdGhlIFJlbGVhc2VgO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLmxvZyhtc2csIHRydWUpO1xuXHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnLCBub3RpY2VUaW1lb3V0KTtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gckZpbGVzO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCF1cGRhdGVQbHVnaW5GaWxlcyB8fCBmb3JjZVJlaW5zdGFsbCkge1xuXHRcdFx0XHRjb25zdCByZWxlYXNlRmlsZXMgPSBhd2FpdCBnZXRSZWxlYXNlKCk7XG5cdFx0XHRcdGlmIChyZWxlYXNlRmlsZXMgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0YXdhaXQgdGhpcy53cml0ZVJlbGVhc2VGaWxlc1RvUGx1Z2luRm9sZGVyKHByaW1hcnlNYW5pZmVzdC5pZCwgcmVsZWFzZUZpbGVzKTtcblx0XHRcdFx0YWRkQmV0YVBsdWdpblRvTGlzdChcblx0XHRcdFx0XHR0aGlzLnBsdWdpbixcblx0XHRcdFx0XHRyZXBvc2l0b3J5UGF0aCxcblx0XHRcdFx0XHRzcGVjaWZ5VmVyc2lvbixcblx0XHRcdFx0XHRpc0luY29tcGF0aWJsZSxcblx0XHRcdFx0XHRzZWNyZXROYW1lLCAvLyBTdG9yZSBzZWNyZXQgbmFtZSBpbiBzZXR0aW5nc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZW5hYmxlQWZ0ZXJJbnN0YWxsKSB7XG5cdFx0XHRcdFx0Y29uc3QgeyBwbHVnaW5zIH0gPSB0aGlzLnBsdWdpbi5hcHA7XG5cdFx0XHRcdFx0Y29uc3QgcGx1Z2luVGFyZ2V0Rm9sZGVyUGF0aCA9IG5vcm1hbGl6ZVBhdGgoYCR7cGx1Z2lucy5nZXRQbHVnaW5Gb2xkZXIoKX0vJHtwcmltYXJ5TWFuaWZlc3QuaWR9YCk7XG5cdFx0XHRcdFx0YXdhaXQgcGx1Z2lucy5sb2FkTWFuaWZlc3QocGx1Z2luVGFyZ2V0Rm9sZGVyUGF0aCk7XG5cdFx0XHRcdFx0YXdhaXQgcGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHByaW1hcnlNYW5pZmVzdC5pZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uYXBwLnBsdWdpbnMubG9hZE1hbmlmZXN0cygpO1xuXHRcdFx0XHRpZiAoZm9yY2VSZWluc3RhbGwpIHtcblx0XHRcdFx0XHQvLyByZWxvYWQgaWYgZW5hYmxlZFxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVsb2FkUGx1Z2luKHByaW1hcnlNYW5pZmVzdC5pZCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4ubG9nKGAke3JlcG9zaXRvcnlQYXRofSByZWluc3RhbGxlZGAsIHRydWUpO1xuXHRcdFx0XHRcdHRvYXN0TWVzc2FnZShcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLFxuXHRcdFx0XHRcdFx0YCR7cmVwb3NpdG9yeVBhdGh9XFxuUGx1Z2luIGhhcyBiZWVuIHJlaW5zdGFsbGVkIGFuZCByZWxvYWRlZCB3aXRoIHZlcnNpb24gJHtwcmltYXJ5TWFuaWZlc3QudmVyc2lvbn1gLFxuXHRcdFx0XHRcdFx0bm90aWNlVGltZW91dCxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHZlcnNpb25UZXh0ID0gc3BlY2lmeVZlcnNpb24gPT09IFwiXCIgPyBcIlwiIDogYCAodmVyc2lvbjogJHtzcGVjaWZ5VmVyc2lvbn0pYDtcblx0XHRcdFx0XHRsZXQgbXNnID0gYCR7cmVwb3NpdG9yeVBhdGh9JHt2ZXJzaW9uVGV4dH1cXG5UaGUgcGx1Z2luIGhhcyBiZWVuIHJlZ2lzdGVyZWQgd2l0aCBCUkFULmA7XG5cdFx0XHRcdFx0aWYgKCFlbmFibGVBZnRlckluc3RhbGwpIHtcblx0XHRcdFx0XHRcdG1zZyArPSBcIiBZb3UgbWF5IHN0aWxsIG5lZWQgdG8gZW5hYmxlIGl0IHRoZSBDb21tdW5pdHkgUGx1Z2luIExpc3QuXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLmxvZyhtc2csIHRydWUpO1xuXHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnLCBub3RpY2VUaW1lb3V0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdGVzdCBpZiB0aGUgcGx1Z2luIG5lZWRzIHRvIGJlIHVwZGF0ZWRcblx0XHRcdFx0Ly8gaWYgYSBzcGVjaWZpZWQgdmVyc2lvbiBpcyBwcm92aWRlZCwgdGhlbiB3ZSBzaGFsbCBza2lwIHRoZSB1cGRhdGVcblx0XHRcdFx0Y29uc3QgcGx1Z2luVGFyZ2V0Rm9sZGVyUGF0aCA9IGAke3RoaXMucGx1Z2luLmFwcC52YXVsdC5jb25maWdEaXJ9L3BsdWdpbnMvJHtwcmltYXJ5TWFuaWZlc3QuaWR9L2A7XG5cdFx0XHRcdGxldCBsb2NhbE1hbmlmZXN0Q29udGVudHMgPSBcIlwiO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGxvY2FsTWFuaWZlc3RDb250ZW50cyA9IGF3YWl0IHRoaXMucGx1Z2luLmFwcC52YXVsdC5hZGFwdGVyLnJlYWQoYCR7cGx1Z2luVGFyZ2V0Rm9sZGVyUGF0aH1tYW5pZmVzdC5qc29uYCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRpZiAoKGUgYXMgRXJybm9UeXBlKS5lcnJubyA9PT0gLTQwNTggfHwgKGUgYXMgRXJybm9UeXBlKS5lcnJubyA9PT0gLTIpIHtcblx0XHRcdFx0XHRcdC8vIGZpbGUgZG9lcyBub3QgZXhpc3QsIHRyeSBpbnN0YWxsaW5nIHRoZSBwbHVnaW5cblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuYWRkUGx1Z2luKHJlcG9zaXRvcnlQYXRoLCBmYWxzZSwgdXNpbmdCZXRhTWFuaWZlc3QsIGZhbHNlLCBzcGVjaWZ5VmVyc2lvbiwgZmFsc2UsIGVuYWJsZUFmdGVySW5zdGFsbCwgc2VjcmV0TmFtZSk7XG5cdFx0XHRcdFx0XHQvLyBldmVuIHRob3VnaCBmYWlsZWQsIHJldHVybiB0cnVlIHNpbmNlIGluc3RhbGwgd2lsbCBiZSBhdHRlbXB0ZWRcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiQlJBVCAtIExvY2FsIE1hbmlmZXN0IExvYWRcIiwgcHJpbWFyeU1hbmlmZXN0LmlkLCBKU09OLnN0cmluZ2lmeShlLCBudWxsLCAyKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3BlY2lmeVZlcnNpb24gIT09IFwiXCIgJiYgc3BlY2lmeVZlcnNpb24gIT09IFwibGF0ZXN0XCIpIHtcblx0XHRcdFx0XHQvLyBza2lwIHRoZSBmcm96ZW4gdmVyc2lvbiBwbHVnaW5cblx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UodGhpcy5wbHVnaW4sIGBUaGUgdmVyc2lvbiBvZiAke3JlcG9zaXRvcnlQYXRofSBpcyBmcm96ZW4sIG5vdCB1cGRhdGluZy5gLCAzKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBsb2NhbE1hbmlmZXN0SnNvbiA9IEpTT04ucGFyc2UobG9jYWxNYW5pZmVzdENvbnRlbnRzKSBhcyBQbHVnaW5NYW5pZmVzdDtcblx0XHRcdFx0Ly8gRklYIGZvciBpc3N1ZSAjMTA1OiBOb3QgYWxsIGRldmVsb3BlcnMgdXNlIHNlbXZlciBjb21wbGlhbnQgdmVyc2lvbiB0YWdzXG5cdFx0XHRcdGNvbnN0IGxvY2FsVmVyc2lvbiA9IHNlbXZlckNvZXJjZShsb2NhbE1hbmlmZXN0SnNvbi52ZXJzaW9uLCB7XG5cdFx0XHRcdFx0aW5jbHVkZVByZXJlbGVhc2U6IHRydWUsXG5cdFx0XHRcdFx0bG9vc2U6IHRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb25zdCByZW1vdGVWZXJzaW9uID0gc2VtdmVyQ29lcmNlKHByaW1hcnlNYW5pZmVzdC52ZXJzaW9uLCB7XG5cdFx0XHRcdFx0aW5jbHVkZVByZXJlbGVhc2U6IHRydWUsXG5cdFx0XHRcdFx0bG9vc2U6IHRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb25zdCBoYXNOZXdlclJlbW90ZSA9XG5cdFx0XHRcdFx0bG9jYWxWZXJzaW9uICYmIHJlbW90ZVZlcnNpb25cblx0XHRcdFx0XHRcdD8gY29tcGFyZVZlcnNpb25zKGxvY2FsVmVyc2lvbi52ZXJzaW9uLCByZW1vdGVWZXJzaW9uLnZlcnNpb24pID09PSAtMVxuXHRcdFx0XHRcdFx0OiBsb2NhbE1hbmlmZXN0SnNvbi52ZXJzaW9uICE9PSBwcmltYXJ5TWFuaWZlc3QudmVyc2lvbjtcblxuXHRcdFx0XHRpZiAoaGFzTmV3ZXJSZW1vdGUpIHtcblx0XHRcdFx0XHQvLyBSZW1vdGUgdmVyc2lvbiBpcyBoaWdoZXIsIHVwZGF0ZVxuXHRcdFx0XHRcdGNvbnN0IHJlbGVhc2VGaWxlcyA9IGF3YWl0IGdldFJlbGVhc2UoKTtcblx0XHRcdFx0XHRpZiAocmVsZWFzZUZpbGVzID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoc2VlSWZVcGRhdGVkT25seSkge1xuXHRcdFx0XHRcdFx0Ly8gZG9udCB1cGRhdGUsIGp1c3QgcmVwb3J0IGl0XG5cdFx0XHRcdFx0XHRjb25zdCBtc2cgPSBgVGhlcmUgaXMgYW4gdXBkYXRlIGF2YWlsYWJsZSBmb3IgJHtwcmltYXJ5TWFuaWZlc3QuaWR9IGZyb20gdmVyc2lvbiAke2xvY2FsTWFuaWZlc3RKc29uLnZlcnNpb259IHRvICR7cHJpbWFyeU1hbmlmZXN0LnZlcnNpb259LiBgO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4ubG9nKFxuXHRcdFx0XHRcdFx0XHRgJHttc2d9W1JlbGVhc2UgSW5mb10oaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwb3NpdG9yeVBhdGh9L3JlbGVhc2VzL3RhZy8ke3ByaW1hcnlNYW5pZmVzdC52ZXJzaW9ufSlgLFxuXHRcdFx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnLCAzMCwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAocHJpbWFyeU1hbmlmZXN0KSB7XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93Lm9wZW4oYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3JlcG9zaXRvcnlQYXRofS9yZWxlYXNlcy90YWcvJHtwcmltYXJ5TWFuaWZlc3QudmVyc2lvbn1gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGF3YWl0IHRoaXMud3JpdGVSZWxlYXNlRmlsZXNUb1BsdWdpbkZvbGRlcihwcmltYXJ5TWFuaWZlc3QuaWQsIHJlbGVhc2VGaWxlcyk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uYXBwLnBsdWdpbnMubG9hZE1hbmlmZXN0cygpO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVsb2FkUGx1Z2luKHByaW1hcnlNYW5pZmVzdC5pZCk7XG5cdFx0XHRcdFx0Y29uc3QgbXNnID0gYCR7cHJpbWFyeU1hbmlmZXN0LmlkfVxcblBsdWdpbiBoYXMgYmVlbiB1cGRhdGVkIGZyb20gdmVyc2lvbiAke2xvY2FsTWFuaWZlc3RKc29uLnZlcnNpb259IHRvICR7cHJpbWFyeU1hbmlmZXN0LnZlcnNpb259LiBgO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLmxvZyhgJHttc2d9W1JlbGVhc2UgSW5mb10oaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwb3NpdG9yeVBhdGh9L3JlbGVhc2VzL3RhZy8ke3ByaW1hcnlNYW5pZmVzdC52ZXJzaW9ufSlgLCB0cnVlKTtcblx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UodGhpcy5wbHVnaW4sIG1zZywgMzAsICgpID0+IHtcblx0XHRcdFx0XHRcdGlmIChwcmltYXJ5TWFuaWZlc3QpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93Lm9wZW4oYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3JlcG9zaXRvcnlQYXRofS9yZWxlYXNlcy90YWcvJHtwcmltYXJ5TWFuaWZlc3QudmVyc2lvbn1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChyZXBvcnRJZk5vdFVwZHRlZCkge1xuXHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgYE5vIHVwZGF0ZSBhdmFpbGFibGUgZm9yICR7cmVwb3NpdG9yeVBhdGh9YCwgMyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIExvZyB0aGUgZXJyb3Igd2l0aCBjb250ZXh0XG5cdFx0XHRjb25zb2xlLmVycm9yKGBCUkFUOiBFcnJvciBhZGRpbmcgcGx1Z2luICR7cmVwb3NpdG9yeVBhdGh9OmAsIHtcblx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdHVwZGF0ZVBsdWdpbkZpbGVzLFxuXHRcdFx0XHRzZWVJZlVwZGF0ZWRPbmx5LFxuXHRcdFx0XHRzcGVjaWZ5VmVyc2lvbixcblx0XHRcdFx0Zm9yY2VSZWluc3RhbGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gU2hvdyB1c2VyLWZyaWVuZGx5IGVycm9yIG1lc3NhZ2Vcblx0XHRcdGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIGVycm9yIG9jY3VycmVkXCI7XG5cdFx0XHQvLyBMb2cgdG8gQlJBVCdzIGxvZ2dpbmcgc3lzdGVtXG5cdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5sb2coYEVycm9yICR7dXBkYXRlUGx1Z2luRmlsZXMgPyBcInVwZGF0aW5nXCIgOiBcImFkZGluZ1wifSBwbHVnaW4gJHtyZXBvc2l0b3J5UGF0aH06ICR7ZXJyb3JNZXNzYWdlfWAsIHRydWUpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIHJlbG9hZHMgYSBwbHVnaW4gKGFzc3VtaW5nIGl0IGhhcyBiZWVuIGVuYWJsZWQgYnkgdXNlcilcblx0ICogcGplYnksIFRoYW5rcyBCcm8gaHR0cHM6Ly9naXRodWIuY29tL3BqZWJ5L2hvdC1yZWxvYWQvYmxvYi9tYXN0ZXIvbWFpbi5qc1xuXHQgKlxuXHQgKiBAcGFyYW0gcGx1Z2luTmFtZSAtIG5hbWUgb2YgcGx1Z2luXG5cdCAqXG5cdCAqL1xuXHRhc3luYyByZWxvYWRQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgeyBwbHVnaW5zIH0gPSB0aGlzLnBsdWdpbi5hcHA7XG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IHBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbHVnaW5OYW1lKTtcblx0XHRcdGF3YWl0IHBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbk5hbWUpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKSBjb25zb2xlLmVycm9yKFwicmVsb2FkIHBsdWdpblwiLCBlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogdXBkYXRlcyBhIGJldGEgcGx1Z2luXG5cdCAqXG5cdCAqIEBwYXJhbSByZXBvc2l0b3J5UGF0aCAtIHJlcG9zaXRvcnkgcGF0aCBvbiBHaXRIdWJcblx0ICogQHBhcmFtIG9ubHlDaGVja0RvbnRVcGRhdGUgLSBvbmx5IGxvb2tzIGZvciB1cGRhdGVcblx0ICpcblx0ICovXG5cdGFzeW5jIHVwZGF0ZVBsdWdpbihcblx0XHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRcdG9ubHlDaGVja0RvbnRVcGRhdGUgPSBmYWxzZSxcblx0XHRyZXBvcnRJZk5vdFVwZHRlZCA9IGZhbHNlLFxuXHRcdGZvcmNlUmVpbnN0YWxsID0gZmFsc2UsXG5cdFx0c2VjcmV0TmFtZSA9IFwiXCIsXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuYWRkUGx1Z2luKFxuXHRcdFx0cmVwb3NpdG9yeVBhdGgsXG5cdFx0XHR0cnVlLFxuXHRcdFx0b25seUNoZWNrRG9udFVwZGF0ZSxcblx0XHRcdHJlcG9ydElmTm90VXBkdGVkLFxuXHRcdFx0XCJcIixcblx0XHRcdGZvcmNlUmVpbnN0YWxsLFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHRzZWNyZXROYW1lLFxuXHRcdCk7XG5cdFx0aWYgKCFyZXN1bHQgJiYgIW9ubHlDaGVja0RvbnRVcGRhdGUpIHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgYCR7cmVwb3NpdG9yeVBhdGh9XFxuVXBkYXRlIG9mIHBsdWdpbiBmYWlsZWQuYCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiB3YWxrcyB0aHJvdWdoIHRoZSBsaXN0IG9mIHBsdWdpbnMgd2l0aG91dCBmcm96ZW4gdmVyc2lvbiBhbmQgcGVyZm9ybXMgYW4gdXBkYXRlXG5cdCAqXG5cdCAqIEBwYXJhbSBzaG93SW5mbyAtIHNob3VsZCB0aGlzIHdpdGggYSBzdGFydGVkL2NvbXBsZXRlZCBtZXNzYWdlIC0gdXNlZnVsIHdoZW4gcmFuIGZyb20gQ1Bcblx0ICpcblx0ICovXG5cdGFzeW5jIGNoZWNrRm9yUGx1Z2luVXBkYXRlc0FuZEluc3RhbGxVcGRhdGVzKHNob3dJbmZvID0gZmFsc2UsIG9ubHlDaGVja0RvbnRVcGRhdGUgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICghKGF3YWl0IGlzQ29ubmVjdGVkVG9JbnRlcm5ldCgpKSkge1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyhcIkJSQVQ6IE5vIGludGVybmV0IGRldGVjdGVkLlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IG5ld05vdGljZTogTm90aWNlIHwgdW5kZWZpbmVkO1xuXHRcdGNvbnN0IG1zZzEgPSBcIkNoZWNraW5nIGZvciBwbHVnaW4gdXBkYXRlcyBTVEFSVEVEXCI7XG5cdFx0YXdhaXQgdGhpcy5wbHVnaW4ubG9nKG1zZzEsIHRydWUpO1xuXHRcdGlmIChzaG93SW5mbyAmJiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5ub3RpZmljYXRpb25zRW5hYmxlZCkgbmV3Tm90aWNlID0gbmV3IE5vdGljZShgQlJBVFxcbiR7bXNnMX1gLCAzMDAwMCk7XG5cdFx0Ly8gQ3JlYXRlIGEgbWFwIG9mIHJlcG8gdG8gdmVyc2lvbiBmb3IgZnJvemVuIHBsdWdpbnNcblx0XHRjb25zdCBmcm96ZW5WZXJzaW9ucyA9IG5ldyBNYXAodGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24ubWFwKChmKSA9PiBbZi5yZXBvLCBmLnZlcnNpb25dKSk7XG5cdFx0Ly8gQ3JlYXRlIGEgbWFwIG9mIHJlcG8gdG8gdG9rZW5OYW1lIGZvciBwZXItcmVwbyB0b2tlbnNcblx0XHRjb25zdCByZXBvVG9rZW5zID0gbmV3IE1hcCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5TdWJMaXN0RnJvemVuVmVyc2lvbi5tYXAoKGYpID0+IFtmLnJlcG8sIGYudG9rZW5OYW1lIHx8IFwiXCJdKSk7XG5cdFx0Zm9yIChjb25zdCBicCBvZiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MaXN0KSB7XG5cdFx0XHQvLyBTa2lwIGlmIHJlcG8gaXMgZnJvemVuIGFuZCBub3Qgc2V0IHRvIFwibGF0ZXN0XCJcblx0XHRcdGNvbnN0IHZlcnNpb24gPSBmcm96ZW5WZXJzaW9ucy5nZXQoYnApO1xuXHRcdFx0aWYgKHZlcnNpb24gJiYgdmVyc2lvbiAhPT0gXCJsYXRlc3RcIikge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdGF3YWl0IHRoaXMudXBkYXRlUGx1Z2luKGJwLCBvbmx5Q2hlY2tEb250VXBkYXRlLCBmYWxzZSwgZmFsc2UsIHJlcG9Ub2tlbnMuZ2V0KGJwKSB8fCBcIlwiKTtcblx0XHR9XG5cdFx0Y29uc3QgbXNnMiA9IFwiQ2hlY2tpbmcgZm9yIHBsdWdpbiB1cGRhdGVzIENPTVBMRVRFRFwiO1xuXHRcdGF3YWl0IHRoaXMucGx1Z2luLmxvZyhtc2cyLCB0cnVlKTtcblx0XHRpZiAoc2hvd0luZm8pIHtcblx0XHRcdGlmIChuZXdOb3RpY2UpIHtcblx0XHRcdFx0bmV3Tm90aWNlLmhpZGUoKTtcblx0XHRcdH1cblx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgbXNnMiwgMTApO1xuXHRcdH1cblx0XHRhd2FpdCB0aGlzLmNoZWNrRm9yT2ZmaWNpYWxseVJlbGVhc2VkUGx1Z2lucygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgdGhlIGJldGEgcGx1Z2luIGZyb20gdGhlIGxpc3Qgb2YgYmV0YSBwbHVnaW5zIChkb2VzIG5vdCBkZWxldGUgdGhlbSBmcm9tIGRpc2spXG5cdCAqXG5cdCAqIEBwYXJhbSBiZXRhUGx1Z2luSUQgLSByZXBvc2l0b3J5IHBhdGhcblx0ICpcblx0ICovXG5cdGRlbGV0ZVBsdWdpbihyZXBvc2l0b3J5UGF0aDogc3RyaW5nKTogdm9pZCB7XG5cdFx0Y29uc3QgbXNnID0gYFJlbW92ZWQgJHtyZXBvc2l0b3J5UGF0aH0gZnJvbSBCUkFUIHBsdWdpbiBsaXN0YDtcblx0XHR2b2lkIHRoaXMucGx1Z2luLmxvZyhtc2csIHRydWUpO1xuXHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpbkxpc3QgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MaXN0LmZpbHRlcigoYikgPT4gYiAhPT0gcmVwb3NpdG9yeVBhdGgpO1xuXHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpblN1Ykxpc3RGcm96ZW5WZXJzaW9uID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24uZmlsdGVyKFxuXHRcdFx0KGIpID0+IGIucmVwbyAhPT0gcmVwb3NpdG9yeVBhdGgsXG5cdFx0KTtcblx0XHR2b2lkIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBsaXN0IG9mIHBsdWdpbnMgdGhhdCBhcmUgY3VycmVudGx5IGVuYWJsZWQgb3IgY3VycmVudGx5IGRpc2FibGVkXG5cdCAqXG5cdCAqIEBwYXJhbSBlbmFibGVkIC0gdHJ1ZSBmb3IgZW5hYmxlZCBwbHVnaW5zLCBmYWxzZSBmb3IgZGlzYWJsZWQgcGx1dGluZ3Ncblx0ICpcblx0ICogQHJldHVybnMgbWFuaWZlc3RzICBvZiBwbHVnaW5zXG5cdCAqL1xuXHRnZXRFbmFibGVkRGlzYWJsZWRQbHVnaW5zKGVuYWJsZWQ6IGJvb2xlYW4pOiBQbHVnaW5NYW5pZmVzdFtdIHtcblx0XHRjb25zdCBwbCA9IHRoaXMucGx1Z2luLmFwcC5wbHVnaW5zO1xuXHRcdGNvbnN0IG1hbmlmZXN0czogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXMocGwubWFuaWZlc3RzKTtcblx0XHRjb25zdCBlbmFibGVkUGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXMocGwucGx1Z2lucykubWFwKChwKSA9PiBwLm1hbmlmZXN0KTtcblx0XHRyZXR1cm4gZW5hYmxlZFxuXHRcdFx0PyBtYW5pZmVzdHMuZmlsdGVyKChtYW5pZmVzdCkgPT4gZW5hYmxlZFBsdWdpbnMuZmluZCgocGx1Z2luTmFtZSkgPT4gbWFuaWZlc3QuaWQgPT09IHBsdWdpbk5hbWUuaWQpKVxuXHRcdFx0OiBtYW5pZmVzdHMuZmlsdGVyKChtYW5pZmVzdCkgPT4gIWVuYWJsZWRQbHVnaW5zLmZpbmQoKHBsdWdpbk5hbWUpID0+IG1hbmlmZXN0LmlkID09PSBwbHVnaW5OYW1lLmlkKSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgaW5jb21wYXRpYmxlIHBsdWdpbnMgaW5zdGFsbGVkIGFuZCBub3RpZmllcyB0aGUgdXNlclxuXHQgKi9cblx0Y2hlY2tJbmNvbXBhdGlibGVQbHVnaW5zKCk6IHZvaWQge1xuXHRcdGNvbnN0IGluY29tcGF0aWJsZVBsdWdpbklkcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpblN1Ykxpc3RGcm96ZW5WZXJzaW9uLmZpbHRlcigocCkgPT4gcC5pc0luY29tcGF0aWJsZSkubWFwKChwKSA9PiBwLnJlcG8pO1xuXHRcdGlmIChpbmNvbXBhdGlibGVQbHVnaW5JZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0dG9hc3RNZXNzYWdlKFxuXHRcdFx0XHR0aGlzLnBsdWdpbixcblx0XHRcdFx0YFRoZSBmb2xsb3dpbmcgaW5jb21wYXRpYmxlIHBsdWdpbnMgd2VyZSBmb3JjZWZ1bGx5IGluc3RhbGxlZCBieSBCUkFUIGFuZCBtYXkgbm90IHdvcmsgYXMgZXhwZWN0ZWQ6XFxuJHtpbmNvbXBhdGlibGVQbHVnaW5JZHMuam9pbihcIlxcblwiKX1gLFxuXHRcdFx0XHQzMCxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIERldGVjdHMgQlJBVC10cmFja2VkIHBsdWdpbnMgdGhhdCBoYXZlIGdyYWR1YXRlZCB0byB0aGUgb2ZmaWNpYWwgT2JzaWRpYW4gY29tbXVuaXR5IHBsdWdpbiBsaXN0XG5cdCAqIGFuZCBoYXZlIGEgc3RhYmxlIChub24tcHJlcmVsZWFzZSkgcmVsZWFzZSB3aXRoIHZlcnNpb24gPj0gaW5zdGFsbGVkIHZlcnNpb24uXG5cdCAqXG5cdCAqIEByZXR1cm5zIEFycmF5IG9mIGdyYWR1YXRlZCBwbHVnaW4gbWV0YWRhdGFcblx0ICovXG5cdGFzeW5jIGdldE9mZmljaWFsbHlSZWxlYXNlZFBsdWdpbnMoKTogUHJvbWlzZTxHcmFkdWF0ZWRQbHVnaW5bXT4ge1xuXHRcdGNvbnN0IGNvbW11bml0eVBsdWdpbnMgPSBhd2FpdCBncmFiQ29tbW11bml0eVBsdWdpbkxpc3QodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSk7XG5cdFx0aWYgKCFjb21tdW5pdHlQbHVnaW5zKSByZXR1cm4gW107XG5cblx0XHRjb25zdCBjb21tdW5pdHlSZXBvcyA9IG5ldyBTZXQoY29tbXVuaXR5UGx1Z2lucy5tYXAoKHApID0+IHAucmVwbykpO1xuXG5cdFx0Ly8gT25seSBjaGVjayBub24tZnJvemVuIHBsdWdpbnNcblx0XHRjb25zdCBmcm96ZW5WZXJzaW9ucyA9IG5ldyBNYXAodGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24ubWFwKChmKSA9PiBbZi5yZXBvLCBmLnZlcnNpb25dKSk7XG5cdFx0Y29uc3QgcmVwb1Rva2VucyA9IG5ldyBNYXAodGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24ubWFwKChmKSA9PiBbZi5yZXBvLCBmLnRva2VuTmFtZSB8fCBcIlwiXSkpO1xuXG5cdFx0Y29uc3QgZ3JhZHVhdGVkOiBHcmFkdWF0ZWRQbHVnaW5bXSA9IFtdO1xuXG5cdFx0Zm9yIChjb25zdCByZXBvIG9mIHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpbkxpc3QpIHtcblx0XHRcdGNvbnN0IHZlcnNpb24gPSBmcm96ZW5WZXJzaW9ucy5nZXQocmVwbyk7XG5cdFx0XHRpZiAodmVyc2lvbiAmJiB2ZXJzaW9uICE9PSBcImxhdGVzdFwiKSBjb250aW51ZTtcblx0XHRcdGlmICghY29tbXVuaXR5UmVwb3MuaGFzKHJlcG8pKSBjb250aW51ZTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gUmVzb2x2ZSB0b2tlbiBmb3IgdGhpcyByZXBvXG5cdFx0XHRcdGxldCB0b2tlblZhbHVlID0gXCJcIjtcblx0XHRcdFx0Y29uc3Qgc2VjcmV0TmFtZSA9IHJlcG9Ub2tlbnMuZ2V0KHJlcG8pIHx8IFwiXCI7XG5cdFx0XHRcdGlmIChzZWNyZXROYW1lKSB7XG5cdFx0XHRcdFx0dG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChzZWNyZXROYW1lKSB8fCBcIlwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSkge1xuXHRcdFx0XHRcdHRva2VuVmFsdWUgPSB0aGlzLnBsdWdpbi5hcHAuc2VjcmV0U3RvcmFnZS5nZXRTZWNyZXQodGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2xvYmFsVG9rZW5OYW1lKSB8fCBcIlwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRmV0Y2ggbGF0ZXN0IHN0YWJsZSAobm9uLXByZXJlbGVhc2UpIHJlbGVhc2Vcblx0XHRcdFx0Y29uc3Qgc3RhYmxlUmVsZWFzZSA9IGF3YWl0IGdyYWJSZWxlYXNlRnJvbVJlcG9zaXRvcnkoXG5cdFx0XHRcdFx0cmVwbyxcblx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdFx0ZmFsc2UsIC8vIGV4Y2x1ZGUgcHJlcmVsZWFzZXNcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlLFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdHRva2VuVmFsdWUgfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmICghc3RhYmxlUmVsZWFzZSkgY29udGludWU7XG5cblx0XHRcdFx0Ly8gUmVhZCBsb2NhbCBpbnN0YWxsZWQgdmVyc2lvblxuXHRcdFx0XHRjb25zdCBwbHVnaW5JZCA9IGNvbW11bml0eVBsdWdpbnMuZmluZCgocCkgPT4gcC5yZXBvID09PSByZXBvKT8uaWQ7XG5cdFx0XHRcdGlmICghcGx1Z2luSWQpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdGNvbnN0IGxvY2FsTWFuaWZlc3QgPSB0aGlzLnBsdWdpbi5hcHAucGx1Z2lucy5tYW5pZmVzdHNbcGx1Z2luSWRdO1xuXHRcdFx0XHRpZiAoIWxvY2FsTWFuaWZlc3QpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdGNvbnN0IGxvY2FsVmVyc2lvbiA9IHNlbXZlckNvZXJjZShsb2NhbE1hbmlmZXN0LnZlcnNpb24sIHsgaW5jbHVkZVByZXJlbGVhc2U6IHRydWUsIGxvb3NlOiB0cnVlIH0pO1xuXHRcdFx0XHRjb25zdCBzdGFibGVWZXJzaW9uID0gc2VtdmVyQ29lcmNlKHN0YWJsZVJlbGVhc2UudGFnX25hbWUsIHsgaW5jbHVkZVByZXJlbGVhc2U6IHRydWUsIGxvb3NlOiB0cnVlIH0pO1xuXG5cdFx0XHRcdGlmICghbG9jYWxWZXJzaW9uIHx8ICFzdGFibGVWZXJzaW9uKSBjb250aW51ZTtcblxuXHRcdFx0XHQvLyBTdGFibGUgcmVsZWFzZSB2ZXJzaW9uID49IGluc3RhbGxlZCB2ZXJzaW9uIG1lYW5zIHBsdWdpbiBoYXMgZ3JhZHVhdGVkXG5cdFx0XHRcdGlmIChjb21wYXJlVmVyc2lvbnMoc3RhYmxlVmVyc2lvbi52ZXJzaW9uLCBsb2NhbFZlcnNpb24udmVyc2lvbikgPj0gMCkge1xuXHRcdFx0XHRcdGdyYWR1YXRlZC5wdXNoKHtcblx0XHRcdFx0XHRcdHJlcG8sXG5cdFx0XHRcdFx0XHRpbnN0YWxsZWRWZXJzaW9uOiBsb2NhbE1hbmlmZXN0LnZlcnNpb24sXG5cdFx0XHRcdFx0XHRzdGFibGVWZXJzaW9uOiBzdGFibGVSZWxlYXNlLnRhZ19uYW1lLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZGVidWcoYEJSQVQ6IEVycm9yIGNoZWNraW5nIGdyYWR1YXRpb24gZm9yICR7cmVwb306YCwgZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGdyYWR1YXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgZm9yIGdyYWR1YXRlZCBwbHVnaW5zIGFuZCBub3RpZmllcyB0aGUgdXNlciB2aWEgdG9hc3Qgbm90aWZpY2F0aW9ucy5cblx0ICogQ2FsbGVkIGF0IHRoZSBlbmQgb2YgZXZlcnkgdXBkYXRlIGN5Y2xlLlxuXHQgKi9cblx0YXN5bmMgY2hlY2tGb3JPZmZpY2lhbGx5UmVsZWFzZWRQbHVnaW5zKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBncmFkdWF0ZWQgPSBhd2FpdCB0aGlzLmdldE9mZmljaWFsbHlSZWxlYXNlZFBsdWdpbnMoKTtcblx0XHRcdGZvciAoY29uc3QgcGx1Z2luIG9mIGdyYWR1YXRlZCkge1xuXHRcdFx0XHRjb25zdCBtc2cgPSBgJHtwbHVnaW4ucmVwb30gaGFzIGJlZW4gb2ZmaWNpYWxseSByZWxlYXNlZCAoc3RhYmxlOiAke3BsdWdpbi5zdGFibGVWZXJzaW9ufSkuIFlvdSBjYW4gcmVtb3ZlIGl0IGZyb20gQlJBVCBhbmQgdXNlIE9ic2lkaWFuJ3MgYnVpbHQtaW4gdXBkYXRlcy5gO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5sb2cobXNnLCB0cnVlKTtcblx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBtc2csIDMwLCAoKSA9PiB7XG5cdFx0XHRcdFx0d2luZG93Lm9wZW4oYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3BsdWdpbi5yZXBvfS9yZWxlYXNlcy90YWcvJHtwbHVnaW4uc3RhYmxlVmVyc2lvbn1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZGVidWcoXCJCUkFUOiBFcnJvciBjaGVja2luZyBmb3Igb2ZmaWNpYWxseSByZWxlYXNlZCBwbHVnaW5zOlwiLCBlcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCwgTW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW50ZXJmYWNlIENvbmZpcm1PcHRpb25zIHtcblx0YXBwOiBBcHA7XG5cdGNhbmNlbEJ1dHRvblRleHQ/OiBzdHJpbmc7XG5cdGNzc0NsYXNzPzogc3RyaW5nO1xuXHRtZXNzYWdlOiBEb2N1bWVudEZyYWdtZW50IHwgc3RyaW5nO1xuXHRva0J1dHRvblRleHQ/OiBzdHJpbmc7XG5cdHRpdGxlPzogRG9jdW1lbnRGcmFnbWVudCB8IHN0cmluZztcbn1cblxudHlwZSBQcm9taXNlUmVzb2x2ZTxUPiA9IHVuZGVmaW5lZCBleHRlbmRzIFRcblx0PyAodmFsdWU/OiBQcm9taXNlTGlrZTxUPiB8IFQpID0+IHZvaWRcblx0OiAodmFsdWU6IFByb21pc2VMaWtlPFQ+IHwgVCkgPT4gdm9pZDtcblxuY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRwcml2YXRlIGlzQ29uZmlybWVkID0gZmFsc2U7XG5cdHByaXZhdGUgb3B0aW9uczogUmVxdWlyZWQ8Q29uZmlybU9wdGlvbnM+O1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcihcblx0XHRvcHRpb25zOiBDb25maXJtT3B0aW9ucyxcblx0XHRwcml2YXRlIHJlYWRvbmx5IHJlc29sdmU6IFByb21pc2VSZXNvbHZlPGJvb2xlYW4+LFxuXHQpIHtcblx0XHRzdXBlcihvcHRpb25zLmFwcCk7XG5cdFx0Y29uc3QgREVGQVVMVF9PUFRJT05TOiBSZXF1aXJlZDxDb25maXJtT3B0aW9ucz4gPSB7XG5cdFx0XHRhcHA6IG9wdGlvbnMuYXBwLFxuXHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcblx0XHRcdGNzc0NsYXNzOiBcIlwiLFxuXHRcdFx0bWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlLFxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk9LXCIsXG5cdFx0XHR0aXRsZTogXCJcIixcblx0XHR9O1xuXHRcdHRoaXMub3B0aW9ucyA9IHsgLi4uREVGQVVMVF9PUFRJT05TLCAuLi5vcHRpb25zIH07XG5cdFx0dGhpcy5jb250YWluZXJFbC5hZGRDbGFzcyhcImNvbmZpcm0tbW9kYWxcIik7XG5cdH1cblxuXHRwdWJsaWMgb3ZlcnJpZGUgb25DbG9zZSgpOiB2b2lkIHtcblx0XHRzdXBlci5vbkNsb3NlKCk7XG5cdFx0dGhpcy5yZXNvbHZlKHRoaXMuaXNDb25maXJtZWQpO1xuXHR9XG5cblx0cHVibGljIG92ZXJyaWRlIG9uT3BlbigpOiB2b2lkIHtcblx0XHR2b2lkIHN1cGVyLm9uT3BlbigpO1xuXHRcdHRoaXMudGl0bGVFbC5zZXRUZXh0KHRoaXMub3B0aW9ucy50aXRsZSk7XG5cdFx0dGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdGhpcy5vcHRpb25zLm1lc3NhZ2UgfSk7XG5cdFx0Y29uc3Qgb2tCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KHRoaXMuY29udGVudEVsKTtcblx0XHRva0J1dHRvbi5zZXRDbGFzcyhcIm9rLWJ1dHRvblwiKTtcblx0XHRva0J1dHRvbi5zZXRCdXR0b25UZXh0KHRoaXMub3B0aW9ucy5va0J1dHRvblRleHQpO1xuXHRcdG9rQnV0dG9uLnNldEN0YSgpO1xuXHRcdG9rQnV0dG9uLm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0dGhpcy5pc0NvbmZpcm1lZCA9IHRydWU7XG5cdFx0XHR2b2lkIHRoaXMuY2xvc2UoKTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IGNhbmNlbEJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQodGhpcy5jb250ZW50RWwpO1xuXHRcdGNhbmNlbEJ1dHRvbi5zZXRCdXR0b25UZXh0KHRoaXMub3B0aW9ucy5jYW5jZWxCdXR0b25UZXh0KTtcblx0XHRjYW5jZWxCdXR0b24ub25DbGljaygoKSA9PiB7XG5cdFx0XHR2b2lkIHRoaXMuY2xvc2UoKTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uZmlybShvcHRpb25zOiBDb25maXJtT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUpID0+IHtcblx0XHRjb25zdCBtb2RhbCA9IG5ldyBDb25maXJtTW9kYWwob3B0aW9ucywgcmVzb2x2ZSk7XG5cdFx0bW9kYWwub3BlbigpO1xuXHR9KTtcbn1cbiIsICJleHBvcnQgY2xhc3MgR0hSYXRlTGltaXRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoXG5cdFx0cHVibGljIHJlYWRvbmx5IGxpbWl0OiBudW1iZXIsXG5cdFx0cHVibGljIHJlYWRvbmx5IHJlbWFpbmluZzogbnVtYmVyLFxuXHRcdHB1YmxpYyByZWFkb25seSByZXNldDogbnVtYmVyLFxuXHRcdHB1YmxpYyByZWFkb25seSByZXF1ZXN0VXJsOiBzdHJpbmcsXG5cdCkge1xuXHRcdGNvbnN0IG1pbnV0ZXNUb1Jlc2V0ID0gTWF0aC5jZWlsKChyZXNldCAtIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApKSAvIDYwKTtcblx0XHRzdXBlcihgR2l0SHViIEFQSSByYXRlIGxpbWl0IGV4Y2VlZGVkLiBSZXNldCBpbiAke21pbnV0ZXNUb1Jlc2V0fSBtaW51dGVzLmApO1xuXHR9XG5cblx0cHVibGljIGdldE1pbnV0ZXNUb1Jlc2V0KCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIE1hdGguY2VpbCgodGhpcy5yZXNldCAtIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApKSAvIDYwKTtcblx0fVxufVxuXG5pbnRlcmZhY2UgR2l0SHViUmVzcG9uc2VIZWFkZXJzIHtcblx0W2tleTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgR2l0SHViUmVzcG9uc2VFcnJvciBleHRlbmRzIEVycm9yIHtcblx0cHVibGljIHJlYWRvbmx5IHN0YXR1czogbnVtYmVyO1xuXHRwdWJsaWMgcmVhZG9ubHkgbWVzc2FnZTogc3RyaW5nO1xuXHRwdWJsaWMgcmVhZG9ubHkgaGVhZGVyczogR2l0SHViUmVzcG9uc2VIZWFkZXJzO1xuXG5cdGNvbnN0cnVjdG9yKGVycm9yOiBFcnJvcikge1xuXHRcdHN1cGVyKGBHaXRIdWIgQVBJIGVycm9yICR7ZXJyb3J9OiAke2Vycm9yLm1lc3NhZ2V9YCk7XG5cblx0XHR0aGlzLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXHRcdGNvbnN0IGdoRXJyb3IgPSBlcnJvciBhcyBHaXRIdWJSZXNwb25zZUVycm9yO1xuXHRcdHRoaXMuc3RhdHVzID0gZ2hFcnJvci5zdGF0dXMgPz8gNDAwO1xuXHRcdHRoaXMuaGVhZGVycyA9IGdoRXJyb3IuaGVhZGVycyA/PyB7fTtcblxuXHRcdHRoaXMubmFtZSA9IFwiR2l0SHViUmVzcG9uc2VFcnJvclwiO1xuXHR9XG59XG4iLCAiaW1wb3J0IHtcblx0dHlwZSBSZXF1ZXN0VXJsUGFyYW0sXG5cdHR5cGUgUmVxdWVzdFVybFJlc3BvbnNlLFxuXHRyZXF1ZXN0VXJsLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGNvbXBhcmUgYXMgY29tcGFyZVZlcnNpb25zLCBjb2VyY2UgYXMgc2VtdmVyQ29lcmNlIH0gZnJvbSBcInNlbXZlclwiO1xuaW1wb3J0IHtcblx0R0hSYXRlTGltaXRFcnJvcixcblx0R2l0SHViUmVzcG9uc2VFcnJvcixcbn0gZnJvbSBcIi4uL3V0aWxzL0dpdEh1YkFQSUVycm9yc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VWZXJzaW9uIHtcblx0dmVyc2lvbjogc3RyaW5nOyAvLyBUaGUgdGFnIG5hbWUgb2YgdGhlIHJlbGVhc2Vcblx0cHJlcmVsZWFzZTogYm9vbGVhbjsgLy8gSW5kaWNhdGVzIGlmIHRoZSByZWxlYXNlIGlzIGEgcHJlLXJlbGVhc2Vcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHaXRIdWJUb2tlbkluZm8ge1xuXHR2YWxpZFRva2VuOiBib29sZWFuO1xuXHRjdXJyZW50U2NvcGVzOiBzdHJpbmdbXTtcblx0YWNjZXB0ZWRTY29wZXM6IHN0cmluZ1tdO1xuXHRhY2NlcHRlZFBlcm1pc3Npb25zOiBzdHJpbmdbXTtcblx0ZXhwaXJhdGlvbkRhdGU6IHN0cmluZyB8IG51bGw7XG5cdHJhdGVMaW1pdDoge1xuXHRcdGxpbWl0OiBudW1iZXI7XG5cdFx0cmVtYWluaW5nOiBudW1iZXI7XG5cdFx0cmVzZXQ6IG51bWJlcjtcblx0XHRyZXNvdXJjZTogc3RyaW5nO1xuXHRcdHVzZWQ6IG51bWJlcjtcblx0fTtcblx0ZXJyb3I6IFRva2VuVmFsaWRhdGlvbkVycm9yO1xufVxuXG5leHBvcnQgZW51bSBUb2tlbkVycm9yVHlwZSB7XG5cdElOVkFMSURfUFJFRklYID0gXCJpbnZhbGlkX3ByZWZpeFwiLFxuXHRJTlZBTElEX0ZPUk1BVCA9IFwiaW52YWxpZF9mb3JtYXRcIixcblx0RVhQSVJFRCA9IFwiZXhwaXJlZFwiLFxuXHRJTlNVRkZJQ0lFTlRfU0NPUEUgPSBcImluc3VmZmljaWVudF9zY29wZVwiLFxuXHROT05FID0gXCJub25lXCIsXG5cdFVOS05PV04gPSBcInVua25vd25cIixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb2tlblZhbGlkYXRpb25FcnJvciB7XG5cdHR5cGU6IFRva2VuRXJyb3JUeXBlO1xuXHRtZXNzYWdlOiBzdHJpbmc7XG5cdGRldGFpbHM6IHtcblx0XHR2YWxpZFByZWZpeGVzPzogc3RyaW5nW107XG5cdFx0ZXhwaXJhdGlvbkRhdGU/OiBzdHJpbmc7XG5cdFx0cmVxdWlyZWRTY29wZXM/OiBzdHJpbmdbXTtcblx0XHRjdXJyZW50U2NvcGVzPzogc3RyaW5nW107XG5cdH07XG59XG5cbi8qKlxuICogU2NydWJzIHRoZSByZXBvc2l0b3J5IFVSTCB0byByZW1vdmUgdGhlIHByb3RvY29sIGFuZCAuZ2l0IGV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3Qgc2NydWJSZXBvc2l0b3J5VXJsID0gKGFkZHJlc3M6IHN0cmluZyk6IHN0cmluZyA9PiB7XG5cdC8vIENhc2UtaW5zZW5zaXRpdmUgcmVwbGFjZSBmb3IgZ2l0aHViLmNvbVxuXHRsZXQgc2NydWJiZWRBZGRyZXNzID0gYWRkcmVzcy5yZXBsYWNlKC9odHRwcz86XFwvXFwvZ2l0aHViXFwuY29tXFwvL2ksIFwiXCIpO1xuXHRpZiAoc2NydWJiZWRBZGRyZXNzLmVuZHNXaXRoKFwiL1wiKSkge1xuXHRcdHNjcnViYmVkQWRkcmVzcyA9IHNjcnViYmVkQWRkcmVzcy5zbGljZSgwLCAtMSk7XG5cdH1cblx0Ly8gQ2FzZS1pbnNlbnNpdGl2ZSBjaGVjayBhbmQgcmVtb3ZlIGZvciAuZ2l0IGV4dGVuc2lvblxuXHRpZiAoc2NydWJiZWRBZGRyZXNzLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoXCIuZ2l0XCIpKSB7XG5cdFx0c2NydWJiZWRBZGRyZXNzID0gc2NydWJiZWRBZGRyZXNzLnNsaWNlKDAsIC00KTtcblx0fVxuXHRyZXR1cm4gc2NydWJiZWRBZGRyZXNzO1xufTtcblxuY29uc3QgVE9LRU5fUFJFRklYRVMgPSBbXCJnaHBfXCIsIFwiZ2l0aHViX3BhdF9cIl07XG5jb25zdCBUT0tFTl9SRUdFWFAgPVxuXHQvXihnaFtwc11fW2EtekEtWjAtOV17MzZ9fGdpdGh1Yl9wYXRfW2EtekEtWjAtOV17MjJ9X1thLXpBLVowLTldezU5fSkkLztcblxuLyoqXG4gKiBOb3JtYWxpemVzIGFsbCBrZXlzIGluIGFuIG9iamVjdCB0byBsb3dlcmNhc2UuXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZUhlYWRlcnMgPSAoXG5cdGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpLnJlZHVjZShcblx0XHQoYWNjLCBrZXkpID0+IHtcblx0XHRcdGFjY1trZXkudG9Mb3dlckNhc2UoKV0gPSBoZWFkZXJzW2tleV07XG5cdFx0XHRyZXR1cm4gYWNjO1xuXHRcdH0sXG5cdFx0e30gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPixcblx0KTtcbn07XG5cbi8qKlxuICogRmV0Y2hlcyBHaXRIdWIgdG9rZW4gaW5mb3JtYXRpb24gYnkgbWFraW5nIGEgcmVxdWVzdCB0aGF0IHdpbGwgZmFpbFxuICogYW5kIGV4dHJhY3RpbmcgdGhlIGluZm9ybWF0aW9uIGZyb20gdGhlIGVycm9yIGhlYWRlcnNcbiAqXG4gKiBAcGFyYW0gcGVyc29uYWxBY2Nlc3NUb2tlbiAtIEdpdEh1YiBwZXJzb25hbCBhY2Nlc3MgdG9rZW5cbiAqIEBwYXJhbSByZXBvc2l0b3J5IC0gT3B0aW9uYWwgcmVwb3NpdG9yeSBuYW1lICh0byBiZSB1c2VkIHdoZW4gdmFsaWRhdGluZyBwcml2YXRlIHJlcG9zaXRvcnkgYWNjZXNzKVxuICogQHJldHVybnMgVG9rZW4gaW5mb3JtYXRpb24gaW5jbHVkaW5nIHNjb3BlcywgcGVybWlzc2lvbnMsIGFuZCByYXRlIGxpbWl0c1xuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVHaXRIdWJUb2tlbiA9IGFzeW5jIChcblx0cGVyc29uYWxBY2Nlc3NUb2tlbjogc3RyaW5nLFxuXHRyZXBvc2l0b3J5Pzogc3RyaW5nLFxuKTogUHJvbWlzZTxHaXRIdWJUb2tlbkluZm8+ID0+IHtcblx0Ly8gQ2hlY2sgc2NvcGVzICYgdG9rZW4gcHJlZml4XG5cdGNvbnN0IHZhbGlkU2NvcGVzOiBzdHJpbmdbXSA9IFtcInJlcG9cIiwgXCJwdWJsaWNfcmVwb1wiLCBcIm1ldGFkYXRhPXJlYWRcIl07XG5cdGNvbnN0IGhhc1ZhbGlkUHJlZml4ID0gVE9LRU5fUFJFRklYRVMuc29tZSgocHJlZml4KSA9PlxuXHRcdHBlcnNvbmFsQWNjZXNzVG9rZW4udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHByZWZpeC50b0xvd2VyQ2FzZSgpKSxcblx0KTtcblx0Y29uc3QgaGFzVmFsaWRGb3JtYXQgPSBUT0tFTl9SRUdFWFAudGVzdChwZXJzb25hbEFjY2Vzc1Rva2VuKTtcblxuXHRpZiAoIWhhc1ZhbGlkUHJlZml4IHx8ICFoYXNWYWxpZEZvcm1hdCkge1xuXHRcdGNvbnN0IGVycm9yOiBUb2tlblZhbGlkYXRpb25FcnJvciA9IHtcblx0XHRcdHR5cGU6ICFoYXNWYWxpZFByZWZpeFxuXHRcdFx0XHQ/IFRva2VuRXJyb3JUeXBlLklOVkFMSURfUFJFRklYXG5cdFx0XHRcdDogVG9rZW5FcnJvclR5cGUuSU5WQUxJRF9GT1JNQVQsXG5cdFx0XHRtZXNzYWdlOiBcIkludmFsaWQgdG9rZW4gZm9ybWF0XCIsXG5cdFx0XHRkZXRhaWxzOiB7XG5cdFx0XHRcdHZhbGlkUHJlZml4ZXM6IFRPS0VOX1BSRUZJWEVTLFxuXHRcdFx0fSxcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbGlkVG9rZW46IGZhbHNlLFxuXHRcdFx0Y3VycmVudFNjb3BlczogW10sXG5cdFx0XHRhY2NlcHRlZFNjb3BlczogW10sXG5cdFx0XHRhY2NlcHRlZFBlcm1pc3Npb25zOiBbXSxcblx0XHRcdGV4cGlyYXRpb25EYXRlOiBudWxsLFxuXHRcdFx0cmF0ZUxpbWl0OiB7XG5cdFx0XHRcdGxpbWl0OiAwLFxuXHRcdFx0XHRyZW1haW5pbmc6IDAsXG5cdFx0XHRcdHJlc2V0OiAwLFxuXHRcdFx0XHRyZXNvdXJjZTogXCJcIixcblx0XHRcdFx0dXNlZDogMCxcblx0XHRcdH0sXG5cdFx0XHRlcnJvcixcblx0XHR9O1xuXHR9XG5cblx0dHJ5IHtcblx0XHQvLyBDcmVhdGUgYSB0aW1lLWJhc2VkIFwiaGFzaFwiIHRoYXQncyBsaWtlbHkgYW4gaW52YWxpZCByZXBvIGluIGNhc2Ugbm8gcmVwb3NpdG9yeSBpcyBnaXZlblxuXHRcdGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCkgJSAxMDAwO1xuXHRcdGNvbnN0IHJlcG8gPSByZXBvc2l0b3J5XG5cdFx0XHQ/IHJlcG9zaXRvcnlcblx0XHRcdDogYHVzZXIke3RpbWVzdGFtcH0vcmVwbyR7dGltZXN0YW1wICUgMTAwfWA7XG5cdFx0Ly8gVXNlIGFuIGludmFsaWQgVVJMIHRvIGZvcmNlIGFuIGVycm9yIHJlc3BvbnNlIHdpdGggaGVhZGVyc1xuXHRcdGF3YWl0IGdpdEh1YlJlcXVlc3Qoe1xuXHRcdFx0dXJsOiBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke3JlcG99YCxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogYFRva2VuICR7cGVyc29uYWxBY2Nlc3NUb2tlbn1gLFxuXHRcdFx0XHRBY2NlcHQ6IFwiYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uXCIsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXG5cdFx0aWYgKHJlcG9zaXRvcnkpIHtcblx0XHRcdC8vIFdlIGhhdmUgdHJpZWQgdG8gdG9rZW4gd2l0aCBhIHNwZWNpZmljIHJlcG9zaXRvcnkgd2hpY2ggbWVhbnMgaXQgaXMgdmFsaWRcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHZhbGlkVG9rZW46IHRydWUsXG5cdFx0XHRcdGN1cnJlbnRTY29wZXM6IFtdLFxuXHRcdFx0XHRhY2NlcHRlZFNjb3BlczogW10sXG5cdFx0XHRcdGFjY2VwdGVkUGVybWlzc2lvbnM6IFtdLFxuXHRcdFx0XHRleHBpcmF0aW9uRGF0ZTogbnVsbCxcblx0XHRcdFx0cmF0ZUxpbWl0OiB7XG5cdFx0XHRcdFx0bGltaXQ6IDAsXG5cdFx0XHRcdFx0cmVtYWluaW5nOiAwLFxuXHRcdFx0XHRcdHJlc2V0OiAwLFxuXHRcdFx0XHRcdHJlc291cmNlOiBcIlwiLFxuXHRcdFx0XHRcdHVzZWQ6IDAsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiB7XG5cdFx0XHRcdFx0dHlwZTogVG9rZW5FcnJvclR5cGUuTk9ORSxcblx0XHRcdFx0XHRtZXNzYWdlOiBcIk5vIGVycm9yXCIsXG5cdFx0XHRcdFx0ZGV0YWlsczoge30sXG5cdFx0XHRcdH0sXG5cdFx0XHR9O1xuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCByZXF1ZXN0IHRvIGZhaWxcIik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBHaXRIdWJSZXNwb25zZUVycm9yKSkge1xuXHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5vcm1hbGl6ZUhlYWRlcnMoZXJyb3IuaGVhZGVycyk7XG5cdFx0aWYgKCFoZWFkZXJzKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJObyBoZWFkZXJzIGluIEdpdEh1YiByZXNwb25zZVwiKTtcblx0XHR9XG5cblx0XHQvLyBQYXJzZSBhY2NlcHRlZCBwZXJtaXNzaW9ucyBmcm9tIGhlYWRlclxuXHRcdGNvbnN0IHJhd0V4cGlyYXRpb25EYXRlID0gaGVhZGVyc1tcImdpdGh1Yi1hdXRoZW50aWNhdGlvbi10b2tlbi1leHBpcmF0aW9uXCJdO1xuXHRcdGNvbnN0IHBhcnNlZERhdGUgPSByYXdFeHBpcmF0aW9uRGF0ZSA/IG5ldyBEYXRlKHJhd0V4cGlyYXRpb25EYXRlKSA6IG51bGw7XG5cdFx0Y29uc3QgdmFsaWREYXRlID1cblx0XHRcdHBhcnNlZERhdGUgJiYgIU51bWJlci5pc05hTihwYXJzZWREYXRlLmdldFRpbWUoKSlcblx0XHRcdFx0PyBwYXJzZWREYXRlLnRvSVNPU3RyaW5nKClcblx0XHRcdFx0OiBudWxsO1xuXG5cdFx0Y29uc3QgdG9rZW5JbmZvOiBHaXRIdWJUb2tlbkluZm8gPSB7XG5cdFx0XHR2YWxpZFRva2VuOiBmYWxzZSxcblx0XHRcdGN1cnJlbnRTY29wZXM6IGhlYWRlcnNbXCJ4LW9hdXRoLXNjb3Blc1wiXT8uc3BsaXQoXCIsIFwiKSA/PyBbXSxcblx0XHRcdGFjY2VwdGVkU2NvcGVzOiBoZWFkZXJzW1wieC1hY2NlcHRlZC1vYXV0aC1zY29wZXNcIl0/LnNwbGl0KFwiLCBcIikgPz8gW10sXG5cdFx0XHRhY2NlcHRlZFBlcm1pc3Npb25zOlxuXHRcdFx0XHRoZWFkZXJzW1wieC1hY2NlcHRlZC1naXRodWItcGVybWlzc2lvbnNcIl0/LnNwbGl0KFwiLCBcIikgPz8gW10sXG5cdFx0XHRleHBpcmF0aW9uRGF0ZTogdmFsaWREYXRlLFxuXHRcdFx0cmF0ZUxpbWl0OiB7XG5cdFx0XHRcdGxpbWl0OiBOdW1iZXIucGFyc2VJbnQoaGVhZGVyc1tcIngtcmF0ZWxpbWl0LWxpbWl0XCJdID8/IFwiMFwiLCAxMCksXG5cdFx0XHRcdHJlbWFpbmluZzogTnVtYmVyLnBhcnNlSW50KGhlYWRlcnNbXCJ4LXJhdGVsaW1pdC1yZW1haW5pbmdcIl0gPz8gXCIwXCIsIDEwKSxcblx0XHRcdFx0cmVzZXQ6IE51bWJlci5wYXJzZUludChoZWFkZXJzW1wieC1yYXRlbGltaXQtcmVzZXRcIl0gPz8gXCIwXCIsIDEwKSxcblx0XHRcdFx0cmVzb3VyY2U6IGhlYWRlcnNbXCJ4LXJhdGVsaW1pdC1yZXNvdXJjZVwiXSA/PyBcIlwiLFxuXHRcdFx0XHR1c2VkOiBOdW1iZXIucGFyc2VJbnQoaGVhZGVyc1tcIngtcmF0ZWxpbWl0LXVzZWRcIl0gPz8gXCIwXCIsIDEwKSxcblx0XHRcdH0sXG5cdFx0XHRlcnJvcjoge1xuXHRcdFx0XHR0eXBlOiBUb2tlbkVycm9yVHlwZS5OT05FLFxuXHRcdFx0XHRtZXNzYWdlOiBcIk5vIGVycm9yXCIsXG5cdFx0XHRcdGRldGFpbHM6IHt9LFxuXHRcdFx0fSxcblx0XHR9O1xuXG5cdFx0Ly8gQ2hlY2sgdG9rZW4gZXhwaXJhdGlvblxuXHRcdGlmIChcblx0XHRcdHRva2VuSW5mby5leHBpcmF0aW9uRGF0ZSAmJlxuXHRcdFx0bmV3IERhdGUodG9rZW5JbmZvLmV4cGlyYXRpb25EYXRlKSA8IG5ldyBEYXRlKClcblx0XHQpIHtcblx0XHRcdHRva2VuSW5mby5lcnJvciA9IHtcblx0XHRcdFx0dHlwZTogVG9rZW5FcnJvclR5cGUuRVhQSVJFRCxcblx0XHRcdFx0bWVzc2FnZTogXCJUb2tlbiBoYXMgZXhwaXJlZFwiLFxuXHRcdFx0XHRkZXRhaWxzOiB7XG5cdFx0XHRcdFx0ZXhwaXJhdGlvbkRhdGU6IHRva2VuSW5mby5leHBpcmF0aW9uRGF0ZSxcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdG9rZW5JbmZvO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIHNjb3Blc1xuXHRcdGNvbnN0IGhhc1ZhbGlkU2NvcGUgPVxuXHRcdFx0dG9rZW5JbmZvLmN1cnJlbnRTY29wZXMuc29tZSgoc2NvcGUpID0+IHZhbGlkU2NvcGVzLmluY2x1ZGVzKHNjb3BlKSkgfHxcblx0XHRcdHRva2VuSW5mby5hY2NlcHRlZFBlcm1pc3Npb25zLnNvbWUoKHNjb3BlKSA9PlxuXHRcdFx0XHR2YWxpZFNjb3Blcy5pbmNsdWRlcyhzY29wZSksXG5cdFx0XHQpO1xuXG5cdFx0aWYgKCFoYXNWYWxpZFNjb3BlKSB7XG5cdFx0XHR0b2tlbkluZm8uZXJyb3IgPSB7XG5cdFx0XHRcdHR5cGU6IFRva2VuRXJyb3JUeXBlLklOU1VGRklDSUVOVF9TQ09QRSxcblx0XHRcdFx0bWVzc2FnZTpcblx0XHRcdFx0XHRcIlRva2VuIGxhY2tzIHJlcXVpcmVkIHNjb3Blcy4gQ2hlY2sgZG9jdW1lbnRhdGlvbiBmb3IgcmVxdWlyZW1lbnRzLlwiLFxuXHRcdFx0XHRkZXRhaWxzOiB7XG5cdFx0XHRcdFx0Y3VycmVudFNjb3BlczogW1xuXHRcdFx0XHRcdFx0Li4udG9rZW5JbmZvLmFjY2VwdGVkU2NvcGVzLFxuXHRcdFx0XHRcdFx0Li4udG9rZW5JbmZvLmFjY2VwdGVkUGVybWlzc2lvbnMsXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdG9rZW5JbmZvO1xuXHRcdH1cblxuXHRcdHRva2VuSW5mby52YWxpZFRva2VuID0gZXJyb3Iuc3RhdHVzID09PSA0MDQ7IC8vIFRva2VuIGlzIHZhbGlkIGlmIHdlIGdldCBhIDQwNFxuXHRcdHJldHVybiB0b2tlbkluZm87XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBpc1ByaXZhdGVSZXBvID0gYXN5bmMgKFxuXHRyZXBvc2l0b3J5OiBzdHJpbmcsXG5cdGRlYnVnTG9nZ2luZyA9IHRydWUsXG5cdGFjY2Vzc1Rva2VuID0gXCJcIixcbik6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuXHRjb25zdCBVUkwgPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke3JlcG9zaXRvcnl9YDtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZTogUmVxdWVzdFVybFJlc3BvbnNlID0gYXdhaXQgZ2l0SHViUmVxdWVzdCh7XG5cdFx0XHR1cmw6IFVSTCxcblx0XHRcdGhlYWRlcnM6IGFjY2Vzc1Rva2VuXG5cdFx0XHRcdD8ge1xuXHRcdFx0XHRcdFx0QXV0aG9yaXphdGlvbjogYFRva2VuICR7YWNjZXNzVG9rZW59YCxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDoge30sXG5cdFx0fSk7XG5cdFx0Y29uc3QganNvbiA9IHJlc3BvbnNlLmpzb24gYXMgdW5rbm93bjtcblx0XHRpZiAodHlwZW9mIGpzb24gPT09IFwib2JqZWN0XCIgJiYganNvbiAhPT0gbnVsbCAmJiBcInByaXZhdGVcIiBpbiBqc29uKSB7XG5cdFx0XHRyZXR1cm4gQm9vbGVhbihqc29uLnByaXZhdGUpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3BlY2lhbCBoYW5kbGluZyBmb3IgcmF0ZSBsaW1pdCBlcnJvcnNcblx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBHSFJhdGVMaW1pdEVycm9yKSB7XG5cdFx0XHR0aHJvdyBlcnJvcjsgLy8gUmV0aHJvdyByYXRlIGxpbWl0IGVycm9yc1xuXHRcdH1cblx0XHRpZiAoZGVidWdMb2dnaW5nKSBjb25zb2xlLmVycm9yKFwiZXJyb3IgaW4gaXNQcml2YXRlUmVwb1wiLCBVUkwsIGVycm9yKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG5cbi8qKlxuICogRmV0Y2hlcyBhdmFpbGFibGUgcmVsZWFzZSB2ZXJzaW9ucyBmcm9tIGEgR2l0SHViIHJlcG9zaXRvcnlcbiAqXG4gKiBAcGFyYW0gcmVwb3NpdG9yeSAtIHBhdGggdG8gR2l0SHViIHJlcG9zaXRvcnkgaW4gZm9ybWF0IFVTRVJOQU1FL3JlcG9zaXRvcnlcbiAqIEByZXR1cm5zIGFycmF5IG9mIHZlcnNpb24gc3RyaW5ncywgb3IgbnVsbCBpZiBlcnJvclxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hSZWxlYXNlVmVyc2lvbnMgPSBhc3luYyAoXG5cdHJlcG9zaXRvcnk6IHN0cmluZyxcblx0ZGVidWdMb2dnaW5nID0gdHJ1ZSxcblx0YWNjZXNzVG9rZW4gPSBcIlwiLFxuKTogUHJvbWlzZTxSZWxlYXNlVmVyc2lvbltdIHwgbnVsbD4gPT4ge1xuXHRjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke3JlcG9zaXRvcnl9L3JlbGVhc2VzYDtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZTogUmVxdWVzdFVybFJlc3BvbnNlID0gYXdhaXQgZ2l0SHViUmVxdWVzdCh7XG5cdFx0XHR1cmw6IGAke2FwaVVybH0/cGVyX3BhZ2U9MTAwYCxcblx0XHRcdGhlYWRlcnM6IGFjY2Vzc1Rva2VuXG5cdFx0XHRcdD8ge1xuXHRcdFx0XHRcdFx0QXV0aG9yaXphdGlvbjogYFRva2VuICR7YWNjZXNzVG9rZW59YCxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDoge30sXG5cdFx0fSk7XG5cdFx0Y29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24gYXMgdW5rbm93bjtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiBkYXRhLm1hcCgocmVsZWFzZTogeyB0YWdfbmFtZTogc3RyaW5nOyBwcmVyZWxlYXNlOiBib29sZWFuIH0pID0+ICh7XG5cdFx0XHR2ZXJzaW9uOiByZWxlYXNlLnRhZ19uYW1lLFxuXHRcdFx0cHJlcmVsZWFzZTogcmVsZWFzZS5wcmVyZWxlYXNlLFxuXHRcdH0pKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoXG5cdFx0XHRlcnJvciBpbnN0YW5jZW9mIEdIUmF0ZUxpbWl0RXJyb3IgfHxcblx0XHRcdGVycm9yIGluc3RhbmNlb2YgR2l0SHViUmVzcG9uc2VFcnJvclxuXHRcdCkge1xuXHRcdFx0Ly8gU3BlY2lhbCBoYW5kbGluZyBmb3IgcmF0ZSBsaW1pdCBlcnJvcnNcblx0XHRcdHRocm93IGVycm9yOyAvLyBSZXRocm93IHJhdGUgbGltaXQgZXJyb3JzXG5cdFx0fVxuXG5cdFx0aWYgKGRlYnVnTG9nZ2luZylcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBmZXRjaFJlbGVhc2VWZXJzaW9uc1wiLCBhcGlVcmwsIGVycm9yKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufTtcblxuLyoqXG4gKiBwdWxscyBmcm9tIGdpdGh1YiBhIHJlbGVhc2UgZmlsZSBieSBpdHMgdmVyc2lvbiBudW1iZXJcbiAqXG4gKiBAcGFyYW0gcmVwb3NpdG9yeSAtIHBhdGggdG8gR2l0SHViIHJlcG9zaXRvcnkgaW4gZm9ybWF0IFVTRVJOQU1FL3JlcG9zaXRvcnlcbiAqIEBwYXJhbSB2ZXJzaW9uICAgIC0gdmVyc2lvbiBvZiByZWxlYXNlIHRvIHJldHJpdmVcbiAqIEBwYXJhbSBmaWxlTmFtZSAgIC0gbmFtZSBvZiBmaWxlIHRvIHJldHJpZXZlIGZyb20gcmVsZWFzZVxuICpcbiAqIEByZXR1cm5zIGNvbnRlbnRzIG9mIGZpbGUgYXMgc3RyaW5nIGZyb20gdGhlIHJlcG9zaXRvcnkncyByZWxlYXNlXG4gKi9cbmV4cG9ydCBjb25zdCBncmFiUmVsZWFzZUZpbGVGcm9tUmVwb3NpdG9yeSA9IGFzeW5jIChcblx0cmVsZWFzZTogUmVsZWFzZSxcblx0ZmlsZU5hbWU6IHN0cmluZyxcblx0ZGVidWdMb2dnaW5nID0gdHJ1ZSxcblx0aXNQcml2YXRlID0gZmFsc2UsXG5cdHBlcnNvbmFsQWNjZXNzVG9rZW4gPSBcIlwiLFxuKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XG5cdHRyeSB7XG5cdFx0Ly8gZ2V0IHRoZSBhc3NldCBiYXNlZCBvbiB0aGUgYXNzZXQgdXJsIGluIHRoZSByZWxlYXNlXG5cdFx0Ly8gV2UgY2FuIHVzZSB0aGlzIGJvdGggZm9yIHByaXZhdGUgYW5kIHB1YmxpYyByZXBvc1xuXHRcdGNvbnN0IGFzc2V0ID0gcmVsZWFzZS5hc3NldHMuZmluZChcblx0XHRcdChhc3NldDogeyBuYW1lOiBzdHJpbmcgfSkgPT4gYXNzZXQubmFtZSA9PT0gZmlsZU5hbWUsXG5cdFx0KTtcblx0XHRpZiAoIWFzc2V0KSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuXHRcdFx0QWNjZXB0OiBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFxuXHRcdH07XG5cblx0XHQvLyBBdXRoZW50aWNhdGVkIHJlcXVlc3RzIGdldCBhIGhpZ2hlciByYXRlIGxpbWl0LCBvbmx5IG5lZWRlZCBmb3IgcHJpdmF0ZSByZXBvc2l0b3JpZXMgaGVyZVxuXHRcdGlmIChpc1ByaXZhdGUgJiYgcGVyc29uYWxBY2Nlc3NUb2tlbikge1xuXHRcdFx0aGVhZGVycy5BdXRob3JpemF0aW9uID0gYFRva2VuICR7cGVyc29uYWxBY2Nlc3NUb2tlbn1gO1xuXHRcdH1cblxuXHRcdC8vIERvd25sb2FkIGZyb20gdGhlIGFzc2V0IFVSTCBpZiBpdCdzIGEgcHJpdmF0ZSByZXBvLCBvdGhlcndpc2UgdXNlIHRoZSBicm93c2VyIGRvd25sb2FkIFVSTFxuXHRcdGNvbnN0IGRvd25sb2FkVXJsID0gaXNQcml2YXRlID8gYXNzZXQudXJsIDogYXNzZXQuYnJvd3Nlcl9kb3dubG9hZF91cmw7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcblx0XHRcdHVybDogZG93bmxvYWRVcmwsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdH0pO1xuXHRcdHJldHVybiByZXNwb25zZS5zdGF0dXMgIT09IDIwMCA/IG51bGwgOiByZXNwb25zZS50ZXh0O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHJhdGUgbGltaXQgZXJyb3JzXG5cdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgR0hSYXRlTGltaXRFcnJvcikge1xuXHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0fVxuXHRcdGlmIChkZWJ1Z0xvZ2dpbmcpXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgaW4gZ3JhYlJlbGVhc2VGaWxlRnJvbVJlcG9zaXRvcnlcIiwgcmVsZWFzZSwgZXJyb3IpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW11bml0eVBsdWdpbiB7XG5cdGlkOiBzdHJpbmc7XG5cdG5hbWU6IHN0cmluZztcblx0YXV0aG9yOiBzdHJpbmc7XG5cdGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cdHJlcG86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGdyYWJDb21tbXVuaXR5UGx1Z2luTGlzdCA9IGFzeW5jIChcblx0ZGVidWdMb2dnaW5nID0gdHJ1ZSxcbik6IFByb21pc2U8Q29tbXVuaXR5UGx1Z2luW10gfCBudWxsPiA9PiB7XG5cdGNvbnN0IHBsdWdpbkxpc3RVcmwgPVxuXHRcdFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL29ic2lkaWFubWQvb2JzaWRpYW4tcmVsZWFzZXMvSEVBRC9jb21tdW5pdHktcGx1Z2lucy5qc29uXCI7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2U6IFJlcXVlc3RVcmxSZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuXHRcdFx0dXJsOiBwbHVnaW5MaXN0VXJsLFxuXHRcdH0pO1xuXHRcdHJldHVybiByZXNwb25zZS5zdGF0dXMgPT09IDQwNFxuXHRcdFx0PyBudWxsXG5cdFx0XHQ6IChyZXNwb25zZS5qc29uIGFzIENvbW11bml0eVBsdWdpbltdKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoZGVidWdMb2dnaW5nKSBjb25zb2xlLmVycm9yKFwiZXJyb3IgaW4gZ3JhYkNvbW1tdW5pdHlQbHVnaW5MaXN0XCIsIGVycm9yKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tdW5pdHlUaGVtZSB7XG5cdG5hbWU6IHN0cmluZztcblx0YXV0aG9yOiBzdHJpbmc7XG5cdHJlcG86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGdyYWJDb21tbXVuaXR5VGhlbWVzTGlzdCA9IGFzeW5jIChcblx0ZGVidWdMb2dnaW5nID0gdHJ1ZSxcbik6IFByb21pc2U8Q29tbXVuaXR5VGhlbWVbXSB8IG51bGw+ID0+IHtcblx0Y29uc3QgdGhlbWVzVXJsID1cblx0XHRcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9vYnNpZGlhbm1kL29ic2lkaWFuLXJlbGVhc2VzL0hFQUQvY29tbXVuaXR5LWNzcy10aGVtZXMuanNvblwiO1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlOiBSZXF1ZXN0VXJsUmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsOiB0aGVtZXNVcmwgfSk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0ID8gbnVsbCA6IChyZXNwb25zZS5qc29uIGFzIENvbW11bml0eVRoZW1lW10pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChkZWJ1Z0xvZ2dpbmcpIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBpbiBncmFiQ29tbW11bml0eVRoZW1lc0xpc3RcIiwgZXJyb3IpO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgZ3JhYkNvbW1tdW5pdHlUaGVtZUNzc0ZpbGUgPSBhc3luYyAoXG5cdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdGJldGFWZXJzaW9uID0gZmFsc2UsXG5cdGRlYnVnTG9nZ2luZyA9IGZhbHNlLFxuKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XG5cdGNvbnN0IHRoZW1lc1VybCA9IGBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vJHtyZXBvc2l0b3J5UGF0aH0vSEVBRC90aGVtZSR7YmV0YVZlcnNpb24gPyBcIi1iZXRhXCIgOiBcIlwifS5jc3NgO1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlOiBSZXF1ZXN0VXJsUmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsOiB0aGVtZXNVcmwgfSk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0ID8gbnVsbCA6IHJlc3BvbnNlLnRleHQ7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGRlYnVnTG9nZ2luZylcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBpbiBncmFiQ29tbW11bml0eVRoZW1lQ3NzRmlsZVwiLCBlcnJvcik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBncmFiQ29tbW11bml0eVRoZW1lTWFuaWZlc3RGaWxlID0gYXN5bmMgKFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRkZWJ1Z0xvZ2dpbmcgPSB0cnVlLFxuKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiA9PiB7XG5cdGNvbnN0IHRoZW1lc1VybCA9IGBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vJHtyZXBvc2l0b3J5UGF0aH0vSEVBRC9tYW5pZmVzdC5qc29uYDtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZTogUmVxdWVzdFVybFJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7IHVybDogdGhlbWVzVXJsIH0pO1xuXHRcdHJldHVybiByZXNwb25zZS5zdGF0dXMgPT09IDQwNCA/IG51bGwgOiByZXNwb25zZS50ZXh0O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChkZWJ1Z0xvZ2dpbmcpXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZXJyb3IgaW4gZ3JhYkNvbW1tdW5pdHlUaGVtZU1hbmlmZXN0RmlsZVwiLCBlcnJvcik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn07XG5cbmNvbnN0IGNoZWNrc3VtID0gKHN0cjogc3RyaW5nKTogbnVtYmVyID0+IHtcblx0bGV0IHN1bSA9IDA7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG5cdFx0c3VtICs9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXHR9XG5cdHJldHVybiBzdW07XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tzdW1Gb3JTdHJpbmcgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuXHRyZXR1cm4gY2hlY2tzdW0oc3RyKS50b1N0cmluZygpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdyYWJDaGVja3N1bU9mVGhlbWVDc3NGaWxlID0gYXN5bmMgKFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRiZXRhVmVyc2lvbjogYm9vbGVhbixcblx0ZGVidWdMb2dnaW5nOiBib29sZWFuLFxuKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcblx0Y29uc3QgdGhlbWVDc3MgPSBhd2FpdCBncmFiQ29tbW11bml0eVRoZW1lQ3NzRmlsZShcblx0XHRyZXBvc2l0b3J5UGF0aCxcblx0XHRiZXRhVmVyc2lvbixcblx0XHRkZWJ1Z0xvZ2dpbmcsXG5cdCk7XG5cdHJldHVybiB0aGVtZUNzcyA/IGNoZWNrc3VtRm9yU3RyaW5nKHRoZW1lQ3NzKSA6IFwiMFwiO1xufTtcblxuaW50ZXJmYWNlIENvbW1pdEluZm8ge1xuXHRjb21taXQ6IHtcblx0XHRjb21taXR0ZXI/OiB7XG5cdFx0XHRkYXRlPzogc3RyaW5nO1xuXHRcdH07XG5cdH07XG59XG5cbmV4cG9ydCBjb25zdCBncmFiTGFzdENvbW1pdEluZm9Gb3JGaWxlID0gYXN5bmMgKFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRwYXRoOiBzdHJpbmcsXG5cdGRlYnVnTG9nZ2luZyA9IHRydWUsXG4pOiBQcm9taXNlPENvbW1pdEluZm9bXSB8IG51bGw+ID0+IHtcblx0Y29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtyZXBvc2l0b3J5UGF0aH0vY29tbWl0cz9wYXRoPSR7cGF0aH0mcGFnZT0xJnBlcl9wYWdlPTFgO1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlOiBSZXF1ZXN0VXJsUmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsOiB1cmwgfSk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0ID8gbnVsbCA6IChyZXNwb25zZS5qc29uIGFzIENvbW1pdEluZm9bXSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGRlYnVnTG9nZ2luZylcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJlcnJvciBpbiBncmFiTGFzdENvbW1pdEluZm9Gb3JBRmlsZVwiLCBlcnJvcik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBncmFiTGFzdENvbW1pdERhdGVGb3JGaWxlID0gYXN5bmMgKFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRwYXRoOiBzdHJpbmcsXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuXHRjb25zdCB0ZXN0OiBDb21taXRJbmZvW10gfCBudWxsID0gYXdhaXQgZ3JhYkxhc3RDb21taXRJbmZvRm9yRmlsZShcblx0XHRyZXBvc2l0b3J5UGF0aCxcblx0XHRwYXRoLFxuXHQpO1xuXHRpZiAodGVzdCAmJiB0ZXN0Lmxlbmd0aCA+IDAgJiYgdGVzdFswXS5jb21taXQuY29tbWl0dGVyPy5kYXRlKSB7XG5cdFx0cmV0dXJuIHRlc3RbMF0uY29tbWl0LmNvbW1pdHRlci5kYXRlO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufTtcblxuZXhwb3J0IHR5cGUgUmVsZWFzZSA9IHtcblx0dXJsOiBzdHJpbmc7XG5cdHRhZ19uYW1lOiBzdHJpbmc7XG5cdG5hbWU6IHN0cmluZztcblx0cHVibGlzaGVkX2F0OiBzdHJpbmc7XG5cdHByZXJlbGVhc2U6IGJvb2xlYW47XG5cdGFzc2V0czoge1xuXHRcdG5hbWU6IHN0cmluZztcblx0XHR1cmw6IHN0cmluZztcblx0XHRicm93c2VyX2Rvd25sb2FkX3VybDogc3RyaW5nO1xuXHR9W107XG59O1xuXG4vKipcbiAqIEdldHMgZWl0aGVyIGEgc3BlY2lmaWMgcmVsZWFzZSBvciB0aGUgbGF0ZXN0IHJlbGVhc2UgZnJvbSBhIEdpdEh1YiByZXBvc2l0b3J5XG4gKlxuICogQHBhcmFtIHJlcG9zaXRvcnlQYXRoIC0gUmVwb3NpdG9yeSBwYXRoIGluIGZvcm1hdCB1c2VybmFtZS9yZXBvc2l0b3J5XG4gKiBAcGFyYW0gdmVyc2lvbiAtIE9wdGlvbmFsIHZlcnNpb24vdGFnIHRvIGZldGNoLiBJZiBub3QgcHJvdmlkZWQsIGZldGNoZXMgbGF0ZXN0IHJlbGVhc2VcbiAqIEBwYXJhbSBpbmNsdWRlUHJlcmVsZWFzZXMgLSBXaGV0aGVyIHRvIGluY2x1ZGUgcHJlLXJlbGVhc2VzIGluIHRoZSByZXN1bHRzIChkZWZhdWx0OiBmYWxzZSlcbiAqIEBwYXJhbSBkZWJ1Z0xvZ2dpbmcgLSBFbmFibGUgZGVidWcgbG9nZ2luZyAoZGVmYXVsdDogZmFsc2UpXG4gKiBAcGFyYW0gaXNQcml2YXRlIC0gV2hldGhlciB0aGUgcmVwb3NpdG9yeSBpcyBwcml2YXRlIChkZWZhdWx0OiBmYWxzZSlcbiAqIEBwYXJhbSBwZXJzb25hbEFjY2Vzc1Rva2VuIC0gR2l0SHViIHBlcnNvbmFsIGFjY2VzcyB0b2tlbiBmb3IgcHJpdmF0ZSByZXBvc1xuICogQHJldHVybnMgUHJvbWlzZTxSZWxlYXNlIHwgbnVsbD4gUmVsZWFzZSBpbmZvcm1hdGlvbiBvciBudWxsIGlmIG5vdCBmb3VuZC9lcnJvclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBHZXQgbGF0ZXN0IHJlbGVhc2VcbiAqIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBncmFiUmVsZWFzZUZyb21SZXBvc2l0b3J5KCd1c2VybmFtZS9yZXBvJyk7XG4gKlxuICogLy8gR2V0IHNwZWNpZmljIHZlcnNpb25cbiAqIGNvbnN0IHJlbGVhc2UgPSBhd2FpdCBncmFiUmVsZWFzZUZyb21SZXBvc2l0b3J5KCd1c2VybmFtZS9yZXBvJywgJzEuMC4wJyk7XG4gKlxuICogLy8gSW5jbHVkZSBwcmUtcmVsZWFzZXNcbiAqIGNvbnN0IGJldGEgPSBhd2FpdCBncmFiUmVsZWFzZUZyb21SZXBvc2l0b3J5KCd1c2VybmFtZS9yZXBvJywgdW5kZWZpbmVkLCB0cnVlKTtcbiAqXG4gKiAvLyBBY2Nlc3MgcHJpdmF0ZSByZXBvc2l0b3J5XG4gKiBjb25zdCBwcml2YXRlID0gYXdhaXQgZ3JhYlJlbGVhc2VGcm9tUmVwb3NpdG9yeSgndXNlcm5hbWUvcmVwbycsIHVuZGVmaW5lZCwgZmFsc2UsIGZhbHNlLCB0cnVlLCAndG9rZW4nKTtcbiAqL1xuZXhwb3J0IGNvbnN0IGdyYWJSZWxlYXNlRnJvbVJlcG9zaXRvcnkgPSBhc3luYyAoXG5cdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdHZlcnNpb24/OiBzdHJpbmcsXG5cdGluY2x1ZGVQcmVyZWxlYXNlcyA9IGZhbHNlLFxuXHRkZWJ1Z0xvZ2dpbmcgPSBmYWxzZSxcblx0aXNQcml2YXRlID0gZmFsc2UsXG5cdHBlcnNvbmFsQWNjZXNzVG9rZW4/OiBzdHJpbmcsXG4pOiBQcm9taXNlPFJlbGVhc2UgfCBudWxsPiA9PiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgYXBpVXJsID1cblx0XHRcdHZlcnNpb24gJiYgdmVyc2lvbiAhPT0gXCJsYXRlc3RcIlxuXHRcdFx0XHQ/IGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7cmVwb3NpdG9yeVBhdGh9L3JlbGVhc2VzL3RhZ3MvJHt2ZXJzaW9ufWBcblx0XHRcdFx0OiBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke3JlcG9zaXRvcnlQYXRofS9yZWxlYXNlc2A7XG5cblx0XHRjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuXHRcdFx0QWNjZXB0OiBcImFwcGxpY2F0aW9uL3ZuZC5naXRodWIudjMranNvblwiLFxuXHRcdH07XG5cblx0XHRpZiAoKGlzUHJpdmF0ZSAmJiBwZXJzb25hbEFjY2Vzc1Rva2VuKSB8fCBwZXJzb25hbEFjY2Vzc1Rva2VuKSB7XG5cdFx0XHRoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgVG9rZW4gJHtwZXJzb25hbEFjY2Vzc1Rva2VufWA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzcG9uc2U6IFJlcXVlc3RVcmxSZXNwb25zZSA9IGF3YWl0IGdpdEh1YlJlcXVlc3Qoe1xuXHRcdFx0dXJsOiBhcGlVcmwsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdH0pO1xuXG5cdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSByZXR1cm4gbnVsbDtcblxuXHRcdC8vIElmIHdlIGZldGNoIGEgc3BlY2lmaWMgdmVyc2lvbiwgd2UgZ2V0IGEgc2luZ2xlIHJlbGVhc2Ugb2JqZWN0XG5cdFx0Y29uc3QgcmVzcG9uc2VKc29uOiB1bmtub3duID0gcmVzcG9uc2UuanNvbjtcblx0XHRjb25zdCByZWxlYXNlczogUmVsZWFzZVtdID1cblx0XHRcdHZlcnNpb24gJiYgdmVyc2lvbiAhPT0gXCJsYXRlc3RcIlxuXHRcdFx0XHQ/IHJlc3BvbnNlSnNvbiAmJiB0eXBlb2YgcmVzcG9uc2VKc29uID09PSBcIm9iamVjdFwiXG5cdFx0XHRcdFx0PyBbcmVzcG9uc2VKc29uIGFzIFJlbGVhc2VdXG5cdFx0XHRcdFx0OiBbXVxuXHRcdFx0XHQ6IEFycmF5LmlzQXJyYXkocmVzcG9uc2VKc29uKVxuXHRcdFx0XHRcdD8gKHJlc3BvbnNlSnNvbiBhcyBSZWxlYXNlW10pXG5cdFx0XHRcdFx0OiBbXTtcblxuXHRcdGlmIChkZWJ1Z0xvZ2dpbmcpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdGBncmFiUmVsZWFzZUZyb21SZXBvc2l0b3J5IGZvciAke3JlcG9zaXRvcnlQYXRofTpgLFxuXHRcdFx0XHRyZWxlYXNlcyxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHRyZWxlYXNlc1xuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHRcdC8vIEZJWCBmb3IgaXNzdWUgIzEwNTogTm90IGFsbCBkZXZlbG9wZXJzIHVzZSBzZW12ZXIgY29tcGxpYW50IHZlcnNpb24gdGFnc1xuXHRcdFx0XHRcdC8vIEZJWCBmb3IgaXNzdWUgIzExNDogQ2Fubm90IGhhbmRsZSByZWxlYXNlcyB3aXRoIG5vbi12ZXJzaW9uIG5hbWVzXG5cdFx0XHRcdFx0Y29uc3QgYVZlcnNpb24gPSBzZW12ZXJDb2VyY2UoYS50YWdfbmFtZSwge1xuXHRcdFx0XHRcdFx0aW5jbHVkZVByZXJlbGVhc2U6IHRydWUsXG5cdFx0XHRcdFx0XHRsb29zZTogdHJ1ZSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zdCBiVmVyc2lvbiA9IHNlbXZlckNvZXJjZShiLnRhZ19uYW1lLCB7XG5cdFx0XHRcdFx0XHRpbmNsdWRlUHJlcmVsZWFzZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGxvb3NlOiB0cnVlLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aWYgKGFWZXJzaW9uICYmIGJWZXJzaW9uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29tcGFyZVZlcnNpb25zKGJWZXJzaW9uLnZlcnNpb24sIGFWZXJzaW9uLnZlcnNpb24pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChhVmVyc2lvbiAmJiAhYlZlcnNpb24pIHJldHVybiAtMTtcblx0XHRcdFx0XHRpZiAoIWFWZXJzaW9uICYmIGJWZXJzaW9uKSByZXR1cm4gMTtcblxuXHRcdFx0XHRcdGNvbnN0IGFEYXRlID0gbmV3IERhdGUoYS5wdWJsaXNoZWRfYXQpLmdldFRpbWUoKTtcblx0XHRcdFx0XHRjb25zdCBiRGF0ZSA9IG5ldyBEYXRlKGIucHVibGlzaGVkX2F0KS5nZXRUaW1lKCk7XG5cdFx0XHRcdFx0aWYgKGFEYXRlIDwgYkRhdGUpIHJldHVybiAxO1xuXHRcdFx0XHRcdGlmIChhRGF0ZSA+IGJEYXRlKSByZXR1cm4gLTE7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5maWx0ZXIoKHJlbGVhc2UpID0+IGluY2x1ZGVQcmVyZWxlYXNlcyB8fCAhcmVsZWFzZS5wcmVyZWxlYXNlKVswXSA/P1xuXHRcdFx0bnVsbFxuXHRcdCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3BlY2lhbCBoYW5kbGluZyBmb3IgcmF0ZSBsaW1pdCBlcnJvcnNcblx0XHRpZiAoZGVidWdMb2dnaW5nKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRgRXJyb3IgaW4gZ3JhYlJlbGVhc2VGcm9tUmVwb3NpdG9yeSBmb3IgJHtyZXBvc2l0b3J5UGF0aH06YCxcblx0XHRcdFx0ZXJyb3IsXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR0aHJvdyBlcnJvcjsgLy8gUmV0aHJvdyByYXRlIGxpbWl0IGVycm9yc1xuXHR9XG59O1xuXG4vKipcbiAqXHRXcmFwcGVyIGZvciBPYnNpZGlhbiBgcmVxdWVzdGAgdGhhdCBjYXRjaGVzIEdpdEh1YiBSYXRlIExpbWl0c1xuICpcdEBwYXJhbSBvcHRpb25zIC0gUmVxdWVzdCBvcHRpb25zXG4gKlx0QHBhcmFtIGRlYnVnTG9nZ2luZyAtIEVuYWJsZSBkZWJ1ZyBsb2dnaW5nIChkZWZhdWx0OiB0cnVlKVxuICovXG5leHBvcnQgY29uc3QgZ2l0SHViUmVxdWVzdCA9IGFzeW5jIChcblx0b3B0aW9uczogUmVxdWVzdFVybFBhcmFtLFxuXHRkZWJ1Z0xvZ2dpbmc/OiB0cnVlLFxuKTogUHJvbWlzZTxSZXF1ZXN0VXJsUmVzcG9uc2U+ID0+IHtcblx0bGV0IGxpbWl0ID0gMDtcblx0bGV0IHJlbWFpbmluZyA9IDA7XG5cdGxldCByZXNldCA9IDA7XG5cblx0Ly8gU2V0IFVzZXItQWdlbnQgSGVhZGVyXG5cdG9wdGlvbnMuaGVhZGVycyA9IHtcblx0XHQuLi5vcHRpb25zLmhlYWRlcnMsXG5cdFx0XCJVc2VyLUFnZW50XCI6IFwiT2JzaWRpYW4vQlJBVC1QbHVnaW5cIixcblx0fTtcblxuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybChvcHRpb25zKTtcblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gVXBkYXRlIHJhdGUgbGltaXRzIGZyb20gcmVzcG9uc2UgaGVhZGVyc1xuXHRcdGNvbnN0IGdpdEh1YkVycm9yID0gbmV3IEdpdEh1YlJlc3BvbnNlRXJyb3IoZXJyb3IgYXMgRXJyb3IpO1xuXHRcdGNvbnN0IGhlYWRlcnMgPSBub3JtYWxpemVIZWFkZXJzKGdpdEh1YkVycm9yLmhlYWRlcnMpO1xuXHRcdGlmIChoZWFkZXJzKSB7XG5cdFx0XHRsaW1pdCA9IE51bWJlci5wYXJzZUludChoZWFkZXJzW1wieC1yYXRlbGltaXQtbGltaXRcIl0sIDEwKTtcblx0XHRcdHJlbWFpbmluZyA9IE51bWJlci5wYXJzZUludChoZWFkZXJzW1wieC1yYXRlbGltaXQtcmVtYWluaW5nXCJdLCAxMCk7XG5cdFx0XHRyZXNldCA9IE51bWJlci5wYXJzZUludChoZWFkZXJzW1wieC1yYXRlbGltaXQtcmVzZXRcIl0sIDEwKTtcblx0XHR9XG5cdFx0aWYgKGdpdEh1YkVycm9yLnN0YXR1cyA9PT0gNDAzICYmIHJlbWFpbmluZyA9PT0gMCkge1xuXHRcdFx0Y29uc3QgcmF0ZUxpbWl0RXJyb3IgPSBuZXcgR0hSYXRlTGltaXRFcnJvcihcblx0XHRcdFx0bGltaXQsXG5cdFx0XHRcdHJlbWFpbmluZyxcblx0XHRcdFx0cmVzZXQsXG5cdFx0XHRcdG9wdGlvbnMudXJsLFxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKGRlYnVnTG9nZ2luZykge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdFwiQlJBVFxcbkdpdEh1YiBBUEkgcmF0ZSBsaW1pdCBleGNlZWRlZDpcIixcblx0XHRcdFx0XHRgXFxuUmVxdWVzdDogJHtyYXRlTGltaXRFcnJvci5yZXF1ZXN0VXJsfWAsXG5cdFx0XHRcdFx0YFxcblJhdGUgbGltaXRzIC0gUmVtYWluaW5nOiAke3JhdGVMaW1pdEVycm9yLnJlbWFpbmluZ31gLFxuXHRcdFx0XHRcdGBcXG5SZXNldCBpbjogJHtyYXRlTGltaXRFcnJvci5nZXRNaW51dGVzVG9SZXNldCgpfSBtaW51dGVzYCxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHRocm93IHJhdGVMaW1pdEVycm9yO1xuXHRcdH1cblxuXHRcdGlmIChkZWJ1Z0xvZ2dpbmcpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJHaXRIdWIgcmVxdWVzdCBmYWlsZWQ6XCIsIGVycm9yKTtcblx0XHR9XG5cdFx0dGhyb3cgZ2l0SHViRXJyb3I7XG5cdH1cbn07XG4iLCAiaW1wb3J0IHsgY2hlY2tzdW1Gb3JTdHJpbmcgfSBmcm9tIFwiLi9mZWF0dXJlcy9naXRodWJVdGlsc1wiO1xuaW1wb3J0IHR5cGUgQnJhdFBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhlbWVJbmZvcmFtdGlvbiB7XG5cdHJlcG86IHN0cmluZztcblx0Ly8gY2hlY2tzdW0gb2YgdGhlbWUgZmlsZSAoZWl0aGVyIHRoZW1lLmNzcyBvciB0aGVtZS1iZXRhLmNzcylcblx0bGFzdFVwZGF0ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsdWdpblZlcnNpb24ge1xuXHRyZXBvOiBzdHJpbmc7IC8vIHBhdGggdG8gdGhlIEdpdEh1YiByZXBvc2l0b3J5XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkdW5kYW50LXR5cGUtY29uc3RpdHVlbnRzXG5cdHZlcnNpb246IFwibGF0ZXN0XCIgfCBzdHJpbmc7IC8vIHZlcnNpb24gb2YgdGhlIHBsdWdpbiAoc2VtdmVyIG9yIGxhdGVzdClcblx0LyoqIEBkZXByZWNhdGVkIFRva2VucyBhcmUgbm93IHN0b3JlZCBpbiBTZWNyZXRTdG9yYWdlIChPYnNpZGlhbiAxLjExLjQrKSAqL1xuXHR0b2tlbj86IHN0cmluZzsgLy8gb3B0aW9uYWwgcHJpdmF0ZSBBUEkga2V5XG5cdHRva2VuTmFtZT86IHN0cmluZzsgLy8gbmFtZSBvZiBzZWNyZXQgaW4gU2VjcmV0U3RvcmFnZSBmb3IgcGVyLXJlcG8gdG9rZW5cblx0aXNJbmNvbXBhdGlibGU/OiBib29sZWFuOyAvLyBpZiB0aGUgcGx1Z2luIGlzIGluY29tcGF0aWJsZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcblx0cGx1Z2luTGlzdDogc3RyaW5nW107XG5cdHBsdWdpblN1Ykxpc3RGcm96ZW5WZXJzaW9uOiBQbHVnaW5WZXJzaW9uW107XG5cdHRoZW1lc0xpc3Q6IFRoZW1lSW5mb3JhbXRpb25bXTtcblx0dXBkYXRlQXRTdGFydHVwOiBib29sZWFuO1xuXHR1cGRhdGVUaGVtZXNBdFN0YXJ0dXA6IGJvb2xlYW47XG5cdGVuYWJsZUFmdGVySW5zdGFsbDogYm9vbGVhbjtcblx0bG9nZ2luZ0VuYWJsZWQ6IGJvb2xlYW47XG5cdGxvZ2dpbmdQYXRoOiBzdHJpbmc7XG5cdGxvZ2dpbmdWZXJib3NlRW5hYmxlZDogYm9vbGVhbjtcblx0ZGVidWdnaW5nTW9kZTogYm9vbGVhbjtcblx0bm90aWZpY2F0aW9uc0VuYWJsZWQ6IGJvb2xlYW47XG5cdC8qKiBAZGVwcmVjYXRlZCBUb2tlbnMgYXJlIG5vdyBzdG9yZWQgaW4gU2VjcmV0U3RvcmFnZSAoT2JzaWRpYW4gMS4xMS40KykgKi9cblx0cGVyc29uYWxBY2Nlc3NUb2tlbj86IHN0cmluZztcblx0Z2xvYmFsVG9rZW5OYW1lPzogc3RyaW5nOyAvLyBuYW1lIG9mIHNlY3JldCBpbiBTZWNyZXRTdG9yYWdlIGZvciBnbG9iYWwgUEFUXG5cdHNlbGVjdExhdGVzdFBsdWdpblZlcnNpb25CeURlZmF1bHQ6IGJvb2xlYW47XG5cdGFsbG93SW5jb21wYXRpYmxlUGx1Z2luczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFNldHRpbmdzID0ge1xuXHRwbHVnaW5MaXN0OiBbXSxcblx0cGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb246IFtdLFxuXHR0aGVtZXNMaXN0OiBbXSxcblx0dXBkYXRlQXRTdGFydHVwOiB0cnVlLFxuXHR1cGRhdGVUaGVtZXNBdFN0YXJ0dXA6IHRydWUsXG5cdGVuYWJsZUFmdGVySW5zdGFsbDogdHJ1ZSxcblx0bG9nZ2luZ0VuYWJsZWQ6IGZhbHNlLFxuXHRsb2dnaW5nUGF0aDogXCJCUkFULWxvZ1wiLFxuXHRsb2dnaW5nVmVyYm9zZUVuYWJsZWQ6IGZhbHNlLFxuXHRkZWJ1Z2dpbmdNb2RlOiBmYWxzZSxcblx0bm90aWZpY2F0aW9uc0VuYWJsZWQ6IHRydWUsXG5cdGdsb2JhbFRva2VuTmFtZTogXCJcIixcblx0cGVyc29uYWxBY2Nlc3NUb2tlbjogXCJcIixcblx0c2VsZWN0TGF0ZXN0UGx1Z2luVmVyc2lvbkJ5RGVmYXVsdDogZmFsc2UsXG5cdGFsbG93SW5jb21wYXRpYmxlUGx1Z2luczogZmFsc2UsXG59O1xuXG4vKipcbiAqIEFkZHMgYSBwbHVnaW4gZm9yIGJldGEgdGVzdGluZyB0byB0aGUgZGF0YS5qc29uIGZpbGUgb2YgdGhpcyAgcGx1Z2luXG4gKlxuICogQHBhcmFtICBwbHVnaW4gLSB0aGUgcGx1Z2luIG9iamVjdFxuICogQHBhcmFtICByZXBvc2l0b3J5UGF0aCAtIHBhdGggdG8gdGhlIEdpdEh1YiByZXBvc2l0b3J5XG4gKiBAcGFyYW0gIHNwZWNpZnlWZXJzaW9uICAtIGlmIHRoZSBwbHVnaW4gbmVlZHMgdG8gc3RheSBhdCB0aGUgZnJvemVuIHZlcnNpb24sIHdlIG5lZWQgdG8gYWxzbyByZWNvcmQgdGhlIHZlcnNpb25cbiAqIEBwYXJhbSAgaXNJbmNvbXBhdGlibGUgLSBpZiB0aGUgcGx1Z2luIGlzIGluY29tcGF0aWJsZVxuICogQHBhcmFtICBzZWNyZXROYW1lIC0gb3B0aW9uYWw6IG5hbWUgb2Ygc2VjcmV0IGluIFNlY3JldFN0b3JhZ2UgZm9yIHRoaXMgcmVwb1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQmV0YVBsdWdpblRvTGlzdChcblx0cGx1Z2luOiBCcmF0UGx1Z2luLFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRzcGVjaWZ5VmVyc2lvbiA9IFwibGF0ZXN0XCIsXG5cdGlzSW5jb21wYXRpYmxlID0gZmFsc2UsXG5cdHNlY3JldE5hbWUgPSBcIlwiLFxuKTogdm9pZCB7XG5cdGxldCBzYXZlID0gZmFsc2U7XG5cdGlmICghcGx1Z2luLnNldHRpbmdzLnBsdWdpbkxpc3QuY29udGFpbnMocmVwb3NpdG9yeVBhdGgpKSB7XG5cdFx0cGx1Z2luLnNldHRpbmdzLnBsdWdpbkxpc3QudW5zaGlmdChyZXBvc2l0b3J5UGF0aCk7XG5cdFx0c2F2ZSA9IHRydWU7XG5cdH1cblxuXHQvLyBJZiBpdCdzIGFuIGV4aXN0aW5nIGZyb3plbiB2ZXJzaW9uIHBsdWdpbiwgdXBkYXRlIGl0IGluc3RlYWQgb2YgY2hlY2tpbmcgZm9yIGR1cGxpY2F0ZXNcblx0Y29uc3QgZXhpc3RpbmdGcm96ZW5QbHVnaW4gPSBwbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24uZmluZChcblx0XHQocCkgPT4gcC5yZXBvID09PSByZXBvc2l0b3J5UGF0aCxcblx0KTtcblx0aWYgKGV4aXN0aW5nRnJvemVuUGx1Z2luKSB7XG5cdFx0T2JqZWN0LmFzc2lnbihleGlzdGluZ0Zyb3plblBsdWdpbiwge1xuXHRcdFx0cmVwbzogcmVwb3NpdG9yeVBhdGgsXG5cdFx0XHR2ZXJzaW9uOiBzcGVjaWZ5VmVyc2lvbixcblx0XHRcdHRva2VuOiB1bmRlZmluZWQsIC8vIERvbid0IHN0b3JlIHRva2VuIGluIHNldHRpbmdzXG5cdFx0XHR0b2tlbk5hbWU6IHNlY3JldE5hbWUgfHwgZXhpc3RpbmdGcm96ZW5QbHVnaW4udG9rZW5OYW1lLFxuXHRcdFx0aXNJbmNvbXBhdGlibGU6IGlzSW5jb21wYXRpYmxlIHx8IHVuZGVmaW5lZCxcblx0XHR9KTtcblx0XHRzYXZlID0gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHRwbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24udW5zaGlmdCh7XG5cdFx0XHRyZXBvOiByZXBvc2l0b3J5UGF0aCxcblx0XHRcdHZlcnNpb246IHNwZWNpZnlWZXJzaW9uLFxuXHRcdFx0dG9rZW46IHVuZGVmaW5lZCwgLy8gRG9uJ3Qgc3RvcmUgdG9rZW4gaW4gc2V0dGluZ3Ncblx0XHRcdHRva2VuTmFtZTogc2VjcmV0TmFtZSB8fCB1bmRlZmluZWQsXG5cdFx0XHRpc0luY29tcGF0aWJsZTogaXNJbmNvbXBhdGlibGUgfHwgdW5kZWZpbmVkLFxuXHRcdH0pO1xuXHRcdHNhdmUgPSB0cnVlO1xuXHR9XG5cdGlmIChzYXZlKSB7XG5cdFx0dm9pZCBwbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUZXN0cyBpZiAgYSAgcGx1Z2luICBpcyBpbiBkYXRhLmpzb25cbiAqXG4gKiBAcGFyYW0gcGx1Z2luIC0gdGhlIHBsdWdpbiBvYmplY3RcbiAqIEBwYXJhbSByZXBvc2l0b3J5UGF0aCAtIHBhdGggdG8gdGhlIEdpdEh1YiByZXBvc2l0b3J5XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpc3RCZXRhUGx1Z2luSW5MaXN0KFxuXHRwbHVnaW46IEJyYXRQbHVnaW4sXG5cdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIHBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MaXN0LmNvbnRhaW5zKHJlcG9zaXRvcnlQYXRoKTtcbn1cblxuLyoqXG4gKiBBZGRzIGEgdGhlbWUgZm9yIGJldGEgdGVzdGluZyB0byB0aGUgZGF0YS5qc29uIGZpbGUgb2YgdGhpcyAgcGx1Z2luXG4gKlxuICogQHBhcmFtIHBsdWdpbiAtIHRoZSBwbHVnaW4gb2JqZWN0XG4gKiBAcGFyYW0gcmVwb3NpdG9yeVBhdGggLSBwYXRoIHRvIHRoZSBHaXRIdWIgcmVwb3NpdG9yeVxuICogQHBhcmFtIHRoZW1lQ3NzIC0gcmF3IHRleHQgb2YgdGhlIHRoZW1lLiBJdCBpcyBjaGVja3N1bW1lZCBhbmQgdGhpcyBpcyB1c2VkIGZvciB0cmFja2luZyBpZiBjaGFuZ2VzIG9jY3VycmVkIHRvIHRoZSB0aGVtZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEJldGFUaGVtZVRvTGlzdChcblx0cGx1Z2luOiBCcmF0UGx1Z2luLFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHR0aGVtZUNzczogc3RyaW5nLFxuKTogdm9pZCB7XG5cdGNvbnN0IG5ld1RoZW1lOiBUaGVtZUluZm9yYW10aW9uID0ge1xuXHRcdHJlcG86IHJlcG9zaXRvcnlQYXRoLFxuXHRcdGxhc3RVcGRhdGU6IGNoZWNrc3VtRm9yU3RyaW5nKHRoZW1lQ3NzKSxcblx0fTtcblx0cGx1Z2luLnNldHRpbmdzLnRoZW1lc0xpc3QudW5zaGlmdChuZXdUaGVtZSk7XG5cdHZvaWQgcGx1Z2luLnNhdmVTZXR0aW5ncygpO1xufVxuXG4vKipcbiAqIFRlc3RzIGlmIGEgIHRoZW1lICBpcyBpbiBkYXRhLmpzb25cbiAqXG4gKiBAcGFyYW0gcGx1Z2luIC0gdGhlIHBsdWdpbiBvYmplY3RcbiAqIEBwYXJhbSByZXBvc2l0b3J5UGF0aCAtIHBhdGggdG8gdGhlIEdpdEh1YiByZXBvc2l0b3J5XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpc3RCZXRhVGhlbWVpbkluTGlzdChcblx0cGx1Z2luOiBCcmF0UGx1Z2luLFxuXHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuKTogYm9vbGVhbiB7XG5cdGNvbnN0IHRlc3RJZlRoZW1FeGlzdHMgPSBwbHVnaW4uc2V0dGluZ3MudGhlbWVzTGlzdC5maW5kKFxuXHRcdCh0KSA9PiB0LnJlcG8gPT09IHJlcG9zaXRvcnlQYXRoLFxuXHQpO1xuXHRyZXR1cm4gISF0ZXN0SWZUaGVtRXhpc3RzO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHRva2VuIG5hbWUgZm9yIGEgcGx1Z2luXG4gKlxuICogQHBhcmFtIHBsdWdpbiAtIHRoZSBwbHVnaW4gb2JqZWN0XG4gKiBAcGFyYW0gcmVwb3NpdG9yeVBhdGggLSBwYXRoIHRvIHRoZSBHaXRIdWIgcmVwb3NpdG9yeVxuICogQHBhcmFtIHRva2VuTmFtZSAtIG5hbWUgb2Ygc2VjcmV0IGluIFNlY3JldFN0b3JhZ2UgZm9yIHRoaXMgcmVwbyAoZW1wdHkgc3RyaW5nIHRvIGNsZWFyKVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGx1Z2luVG9rZW5OYW1lKFxuXHRwbHVnaW46IEJyYXRQbHVnaW4sXG5cdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdHRva2VuTmFtZTogc3RyaW5nLFxuKTogdm9pZCB7XG5cdGNvbnN0IGV4aXN0aW5nRnJvemVuUGx1Z2luID0gcGx1Z2luLnNldHRpbmdzLnBsdWdpblN1Ykxpc3RGcm96ZW5WZXJzaW9uLmZpbmQoXG5cdFx0KHApID0+IHAucmVwbyA9PT0gcmVwb3NpdG9yeVBhdGgsXG5cdCk7XG5cdGlmIChleGlzdGluZ0Zyb3plblBsdWdpbikge1xuXHRcdGV4aXN0aW5nRnJvemVuUGx1Z2luLnRva2VuTmFtZSA9IHRva2VuTmFtZSB8fCB1bmRlZmluZWQ7XG5cdFx0dm9pZCBwbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIGxhc3RVcGF0ZSBmaWVsZCBmb3IgdGhlIHRoZW1lXG4gKlxuICogQHBhcmFtIHBsdWdpbiAtIHRoZSBwbHVnaW4gb2JqZWN0XG4gKiBAcGFyYW0gcmVwb3NpdG9yeVBhdGggLSBwYXRoIHRvIHRoZSBHaXRIdWIgcmVwb3NpdG9yeVxuICogQHBhcmFtIGNoZWNrc3VtIC0gY2hlY2tzdW0gb2YgZmlsZS4gSW4gcGFzdCB3ZSB1c2VkIHRoZSBkYXRlIG9mIGZpbGUgdXBkYXRlLCBidXQgdGhpcyBwcm92ZWQgdG8gbm90IGJlIGNvbnNpc2VudCB3aXRoIHRoZSBHaXRIdWIgY2FjaGUuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQmV0YVRoZW1lTGFzdFVwZGF0ZUNoZWNrc3VtKFxuXHRwbHVnaW46IEJyYXRQbHVnaW4sXG5cdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdGNoZWNrc3VtOiBzdHJpbmcsXG4pOiB2b2lkIHtcblx0Zm9yIChjb25zdCB0IG9mIHBsdWdpbi5zZXR0aW5ncy50aGVtZXNMaXN0KSB7XG5cdFx0aWYgKHQucmVwbyA9PT0gcmVwb3NpdG9yeVBhdGgpIHtcblx0XHRcdHQubGFzdFVwZGF0ZSA9IGNoZWNrc3VtO1xuXHRcdFx0dm9pZCBwbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0fVxuXHR9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBUZXh0Q29tcG9uZW50IH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQsIE1vZGFsLCBQbGF0Zm9ybSwgU2VjcmV0Q29tcG9uZW50LCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBmZXRjaFJlbGVhc2VWZXJzaW9ucywgdHlwZSBSZWxlYXNlVmVyc2lvbiwgc2NydWJSZXBvc2l0b3J5VXJsIH0gZnJvbSBcInNyYy9mZWF0dXJlcy9naXRodWJVdGlsc1wiO1xuaW1wb3J0IHsgR0hSYXRlTGltaXRFcnJvciwgR2l0SHViUmVzcG9uc2VFcnJvciB9IGZyb20gXCJzcmMvdXRpbHMvR2l0SHViQVBJRXJyb3JzXCI7XG5pbXBvcnQgeyBUb2tlblZhbGlkYXRvciB9IGZyb20gXCJzcmMvdXRpbHMvVG9rZW5WYWxpZGF0b3JcIjtcbmltcG9ydCB7IGNyZWF0ZUdpdEh1YlJlc291cmNlTGluayB9IGZyb20gXCJzcmMvdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB0eXBlIEJldGFQbHVnaW5zIGZyb20gXCIuLi9mZWF0dXJlcy9CZXRhUGx1Z2luc1wiO1xuaW1wb3J0IHsgZ2V0VHJhbnNsYXRpb25zIH0gZnJvbSBcIi4uL2kxOG5cIjtcbmltcG9ydCB0eXBlIEJyYXRQbHVnaW4gZnJvbSBcIi4uL21haW5cIjtcbmltcG9ydCB7IGV4aXN0QmV0YVBsdWdpbkluTGlzdCwgdXBkYXRlUGx1Z2luVG9rZW5OYW1lIH0gZnJvbSBcIi4uL3NldHRpbmdzXCI7XG5pbXBvcnQgeyB0b2FzdE1lc3NhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgcHJvbW90aW9uYWxMaW5rcyB9IGZyb20gXCIuL1Byb21vdGlvbmFsXCI7XG5pbXBvcnQgeyBWZXJzaW9uU3VnZ2VzdE1vZGFsIH0gZnJvbSBcIi4vVmVyc2lvblN1Z2dlc3RNb2RhbFwiO1xuXG4vKipcbiAqIEFkZCBhIGJldGEgcGx1Z2luIHRvIHRoZSBsaXN0IG9mIHBsdWdpbnMgYmVpbmcgdHJhY2tlZCBhbmQgdXBkYXRlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGROZXdQbHVnaW5Nb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0cGx1Z2luOiBCcmF0UGx1Z2luO1xuXHRiZXRhUGx1Z2luczogQmV0YVBsdWdpbnM7XG5cdGFkZHJlc3M6IHN0cmluZztcblx0b3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkczogYm9vbGVhbjtcblx0cmVhZG9ubHkgdXBkYXRlVmVyc2lvbjogYm9vbGVhbjtcblx0dmVyc2lvbjogc3RyaW5nO1xuXHR2ZXJzaW9uU2V0dGluZzogU2V0dGluZyB8IG51bGwgPSBudWxsO1xuXG5cdC8vIFJlcG9zaXRvcnkgU2V0dGluZ1xuXHRyZXBvc2l0b3J5QWRkcmVzc0VsOiBUZXh0Q29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG5cblx0Ly8gVG9rZW4gVmFsaWRhdGlvblxuXHRzZWNyZXROYW1lOiBzdHJpbmc7XG5cdHZhbGlkVG9rZW46IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cdHRva2VuSW5wdXRFbDogU2VjcmV0Q29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG5cdHZhbGlkYXRlQnV0dG9uOiBCdXR0b25Db21wb25lbnQgfCBudWxsID0gbnVsbDtcblx0dmFsaWRhdG9yOiBUb2tlblZhbGlkYXRvciB8IG51bGwgPSBudWxsO1xuXG5cdC8vIFBsdWdpbiBpbnN0YWxsIGFjdGlvblxuXHRlbmFibGVBZnRlckluc3RhbGw6IGJvb2xlYW47XG5cdGFkZFBsdWdpbkJ1dHRvbjogQnV0dG9uQ29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG5cdGNhbmNlbEJ1dHRvbjogQnV0dG9uQ29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG5cdG9uU3VibWl0dGVkPzogKCkgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwbHVnaW46IEJyYXRQbHVnaW4sXG5cdFx0YmV0YVBsdWdpbnM6IEJldGFQbHVnaW5zLFxuXHRcdG9wZW5TZXR0aW5nc1RhYkFmdGVyd2FyZHMgPSBmYWxzZSxcblx0XHR1cGRhdGVWZXJzaW9uID0gZmFsc2UsXG5cdFx0cHJlZmlsbFJlcG8gPSBcIlwiLFxuXHRcdHByZWZpbGxWZXJzaW9uID0gXCJcIixcblx0XHRwcmVmaWxsU2VjcmV0TmFtZSA9IFwiXCIsXG5cdFx0b25TdWJtaXR0ZWQ/OiAoKSA9PiB2b2lkLFxuXHQpIHtcblx0XHRzdXBlcihwbHVnaW4uYXBwKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0XHR0aGlzLmJldGFQbHVnaW5zID0gYmV0YVBsdWdpbnM7XG5cdFx0dGhpcy5hZGRyZXNzID0gcHJlZmlsbFJlcG87XG5cdFx0dGhpcy52ZXJzaW9uID0gcHJlZmlsbFZlcnNpb247XG5cdFx0dGhpcy5zZWNyZXROYW1lID0gcHJlZmlsbFNlY3JldE5hbWU7XG5cdFx0dGhpcy5vcGVuU2V0dGluZ3NUYWJBZnRlcndhcmRzID0gb3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcztcblx0XHR0aGlzLnVwZGF0ZVZlcnNpb24gPSB1cGRhdGVWZXJzaW9uO1xuXHRcdHRoaXMuZW5hYmxlQWZ0ZXJJbnN0YWxsID0gcGx1Z2luLnNldHRpbmdzLmVuYWJsZUFmdGVySW5zdGFsbDtcblx0XHR0aGlzLm9uU3VibWl0dGVkID0gb25TdWJtaXR0ZWQ7XG5cdH1cblxuXHRhc3luYyBzdWJtaXRGb3JtKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKS5hZGRCZXRhUGx1Z2luTW9kYWw7XG5cdFx0aWYgKHRoaXMuYWRkcmVzcyA9PT0gXCJcIikgcmV0dXJuO1xuXHRcdGNvbnN0IHNjcnViYmVkQWRkcmVzcyA9IHNjcnViUmVwb3NpdG9yeVVybCh0aGlzLmFkZHJlc3MpO1xuXG5cdFx0Ly8gSWYgaXQncyBhbiBleGlzdGluZyBmcm96ZW4gdmVyc2lvbiBwbHVnaW4sIHVwZGF0ZSBpdCBpbnN0ZWFkIG9mIGNoZWNraW5nIGZvciBkdXBsaWNhdGVzXG5cdFx0Y29uc3QgZXhpc3RpbmdGcm96ZW5QbHVnaW4gPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5TdWJMaXN0RnJvemVuVmVyc2lvbi5maW5kKChwKSA9PiBwLnJlcG8gPT09IHNjcnViYmVkQWRkcmVzcyk7XG5cdFx0aWYgKGV4aXN0aW5nRnJvemVuUGx1Z2luKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmJldGFQbHVnaW5zLmFkZFBsdWdpbihcblx0XHRcdFx0c2NydWJiZWRBZGRyZXNzLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHR0aGlzLnZlcnNpb24sXG5cdFx0XHRcdHRydWUsIC8vIEZvcmNlIHJlaW5zdGFsbFxuXHRcdFx0XHR0aGlzLmVuYWJsZUFmdGVySW5zdGFsbCxcblx0XHRcdFx0dGhpcy5zZWNyZXROYW1lLFxuXHRcdFx0KTtcblx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0dGhpcy5vblN1Ym1pdHRlZD8uKCk7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzZXQgbW9kYWwgaWYgd2UgZG9uJ3QgY2xvc2UgKGkuZS4gYmVjYXVzZSBwbHVnaW4gY291bGQgbm90IGJlIGluc3RhbGxlZClcblx0XHRcdHRoaXMuY2FuY2VsQnV0dG9uPy5zZXREaXNhYmxlZChmYWxzZSk7XG5cdFx0XHR0aGlzLmFkZFBsdWdpbkJ1dHRvbj8uc2V0RGlzYWJsZWQoZmFsc2UpO1xuXHRcdFx0dGhpcy5hZGRQbHVnaW5CdXR0b24/LnNldEJ1dHRvblRleHQodGV4dC5idXR0b25zLmFkZFBsdWdpbik7XG5cdFx0XHR0aGlzLnZlcnNpb25TZXR0aW5nPy5zZXREaXNhYmxlZChmYWxzZSk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMudmVyc2lvbiAmJiBleGlzdEJldGFQbHVnaW5Jbkxpc3QodGhpcy5wbHVnaW4sIHNjcnViYmVkQWRkcmVzcykpIHtcblx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgdGV4dC5hbHJlYWR5SW5MaXN0LCAxMCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5iZXRhUGx1Z2lucy5hZGRQbHVnaW4oXG5cdFx0XHRzY3J1YmJlZEFkZHJlc3MsXG5cdFx0XHRmYWxzZSxcblx0XHRcdGZhbHNlLFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHR0aGlzLnZlcnNpb24sXG5cdFx0XHRmYWxzZSxcblx0XHRcdHRoaXMuZW5hYmxlQWZ0ZXJJbnN0YWxsLFxuXHRcdFx0dGhpcy5zZWNyZXROYW1lLFxuXHRcdCk7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0dGhpcy5vblN1Ym1pdHRlZD8uKCk7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbW9kYWwgaWYgd2UgZG9uJ3QgY2xvc2UgKGkuZS4gYmVjYXVzZSBwbHVnaW4gY291bGQgbm90IGJlIGluc3RhbGxlZClcblx0XHR0aGlzLmNhbmNlbEJ1dHRvbj8uc2V0RGlzYWJsZWQoZmFsc2UpO1xuXHRcdHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZChmYWxzZSk7XG5cdFx0dGhpcy5hZGRQbHVnaW5CdXR0b24/LnNldEJ1dHRvblRleHQodGV4dC5idXR0b25zLmFkZFBsdWdpbik7XG5cdFx0dGhpcy52ZXJzaW9uU2V0dGluZz8uc2V0RGlzYWJsZWQoZmFsc2UpO1xuXHR9XG5cblx0cHJpdmF0ZSB1cGRhdGVWZXJzaW9uRHJvcGRvd24oc2V0dGluZ0VsOiBTZXR0aW5nLCB2ZXJzaW9uczogUmVsZWFzZVZlcnNpb25bXSwgc2VsZWN0ZWQgPSBcIlwiKTogdm9pZCB7XG5cdFx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpLmFkZEJldGFQbHVnaW5Nb2RhbDtcblx0XHRsZXQgc2VsZWN0ZWRWZXJzaW9uOiBzdHJpbmc7XG5cblx0XHRzZXR0aW5nRWwuY2xlYXIoKTtcblx0XHRpZiAodmVyc2lvbnMubGVuZ3RoID4gMCAmJiAhc2VsZWN0ZWQgJiYgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2VsZWN0TGF0ZXN0UGx1Z2luVmVyc2lvbkJ5RGVmYXVsdCkge1xuXHRcdFx0c2VsZWN0ZWRWZXJzaW9uID0gXCJsYXRlc3RcIjtcblx0XHRcdHRoaXMudmVyc2lvbiA9IFwibGF0ZXN0XCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlbGVjdGVkVmVyc2lvbiA9IHNlbGVjdGVkO1xuXHRcdH1cblxuXHRcdGNvbnN0IFZFUlNJT05fVEhSRVNIT0xEID0gMjA7XG5cblx0XHQvLyBXaXRoIGZld2VyIHRoYW4gMjAgdmVyc2lvbnMsIG9yIG9uIG1vYmlsZSwgdXNlIGEgZHJvcGRvd25cblx0XHRpZiAodmVyc2lvbnMubGVuZ3RoIDwgVkVSU0lPTl9USFJFU0hPTEQgfHwgUGxhdGZvcm0uaXNNb2JpbGUpIHtcblx0XHRcdC8vIFVzZSBkcm9wZG93biBmb3IgZmV3ZXIgdmVyc2lvbnNcblx0XHRcdHNldHRpbmdFbC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcblx0XHRcdFx0ZHJvcGRvd24uYWRkT3B0aW9uKFwiXCIsIHRleHQudmVyc2lvbi5zZWxlY3RWZXJzaW9uKTtcblx0XHRcdFx0ZHJvcGRvd24uYWRkT3B0aW9uKFwibGF0ZXN0XCIsIHRleHQudmVyc2lvbi5sYXRlc3RWZXJzaW9uKTtcblx0XHRcdFx0Zm9yIChjb25zdCB2ZXJzaW9uIG9mIHZlcnNpb25zKSB7XG5cdFx0XHRcdFx0ZHJvcGRvd24uYWRkT3B0aW9uKHZlcnNpb24udmVyc2lvbiwgYCR7dmVyc2lvbi52ZXJzaW9ufSAke3ZlcnNpb24ucHJlcmVsZWFzZSA/IHRleHQudmVyc2lvbi5wcmVyZWxlYXNlU3VmZml4IDogXCJcIn1gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkcm9wZG93bi5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdHRoaXMudmVyc2lvbiA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZCh0aGlzLnZlcnNpb24gPT09IFwiXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZHJvcGRvd24uc2V0VmFsdWUoc2VsZWN0ZWRWZXJzaW9uKTtcblxuXHRcdFx0XHRkcm9wZG93bi5zZWxlY3RFbC5hZGRDbGFzcyhcImJyYXQtdmVyc2lvbi1zZWxlY3RvclwiKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBVc2Ugc3VnZ2VzdCBtb2RhbCBmb3IgbWFueSB2ZXJzaW9uc1xuXHRcdFx0c2V0dGluZ0VsLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiB7XG5cdFx0XHRcdGJ1dHRvblxuXHRcdFx0XHRcdC5zZXRCdXR0b25UZXh0KHNlbGVjdGVkVmVyc2lvbiA9PT0gXCJsYXRlc3RcIiA/IHRleHQudmVyc2lvbi5sYXRlc3RWZXJzaW9uIDogc2VsZWN0ZWRWZXJzaW9uIHx8IHRleHQudmVyc2lvbi5zZWxlY3RWZXJzaW9uRWxsaXBzaXMpXG5cdFx0XHRcdFx0LnNldENsYXNzKFwiYnJhdC12ZXJzaW9uLXNlbGVjdG9yXCIpXG5cdFx0XHRcdFx0LnNldENsYXNzKFwiYnV0dG9uXCIpXG5cdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgbGF0ZXN0OiBSZWxlYXNlVmVyc2lvbiA9IHtcblx0XHRcdFx0XHRcdFx0dmVyc2lvbjogXCJsYXRlc3RcIixcblx0XHRcdFx0XHRcdFx0cHJlcmVsZWFzZTogZmFsc2UsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3VnZ2VzdGVkVmVyc2lvbnM6IFJlbGVhc2VWZXJzaW9uW10gPSBbbGF0ZXN0LCAuLi52ZXJzaW9uc107XG5cdFx0XHRcdFx0XHRjb25zdCBtb2RhbCA9IG5ldyBWZXJzaW9uU3VnZ2VzdE1vZGFsKHRoaXMuYXBwLCB0aGlzLmFkZHJlc3MsIHN1Z2dlc3RlZFZlcnNpb25zLCBzZWxlY3RlZFZlcnNpb24sICh2ZXJzaW9uOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcblx0XHRcdFx0XHRcdFx0YnV0dG9uLnNldEJ1dHRvblRleHQodmVyc2lvbiA9PT0gXCJsYXRlc3RcIiA/IHRleHQudmVyc2lvbi5sYXRlc3RWZXJzaW9uIDogdmVyc2lvbiB8fCB0ZXh0LnZlcnNpb24uc2VsZWN0VmVyc2lvbkVsbGlwc2lzKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5hZGRQbHVnaW5CdXR0b24/LnNldERpc2FibGVkKHRoaXMudmVyc2lvbiA9PT0gXCJcIik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdG9uT3BlbigpOiB2b2lkIHtcblx0XHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuYWRkQmV0YVBsdWdpbk1vZGFsO1xuXHRcdGNvbnN0IGhlYWRpbmcgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbChcImg0XCIpO1xuXHRcdGlmICh0aGlzLmFkZHJlc3MpIHtcblx0XHRcdGhlYWRpbmcuYXBwZW5kVGV4dCh0ZXh0LmhlYWRpbmcuY2hhbmdlUGx1Z2luVmVyc2lvbik7XG5cdFx0XHRoZWFkaW5nLmFwcGVuZENoaWxkKGNyZWF0ZUdpdEh1YlJlc291cmNlTGluayh0aGlzLmFkZHJlc3MpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZGluZy5zZXRUZXh0KHRleHQuaGVhZGluZy5naXRodWJSZXBvc2l0b3J5Rm9yQmV0YVBsdWdpbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybUVsKSA9PiB7XG5cdFx0XHRjb25zdCBjb21tb25UZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuY29tbW9uO1xuXHRcdFx0Zm9ybUVsLmFkZENsYXNzKFwiYnJhdC1tb2RhbFwiKTtcblxuXHRcdFx0aWYgKCF0aGlzLmFkZHJlc3MgfHwgIXRoaXMudXBkYXRlVmVyc2lvbikge1xuXHRcdFx0XHRjb25zdCByZXBvU2V0dGluZyA9IG5ldyBTZXR0aW5nKGZvcm1FbCkuc2V0Q2xhc3MoXCJyZXBvc2l0b3J5LXNldHRpbmdcIik7XG5cblx0XHRcdFx0cmVwb1NldHRpbmcudGhlbigoc2V0dGluZykgPT4ge1xuXHRcdFx0XHRcdC8vIFNob3cgYXMgaW5wdXQgZmllbGQgZm9yIG5ldyBwbHVnaW5zXG5cdFx0XHRcdFx0c2V0dGluZy5hZGRUZXh0KChhZGRyZXNzRWwpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucmVwb3NpdG9yeUFkZHJlc3NFbCA9IGFkZHJlc3NFbDtcblxuXHRcdFx0XHRcdFx0YWRkcmVzc0VsLnNldFBsYWNlaG9sZGVyKHRleHQucmVwb3NpdG9yeS5wbGFjZWhvbGRlcik7XG5cdFx0XHRcdFx0XHRhZGRyZXNzRWwuc2V0VmFsdWUodGhpcy5hZGRyZXNzKTtcblx0XHRcdFx0XHRcdGFkZHJlc3NFbC5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hZGRyZXNzID0gc2NydWJSZXBvc2l0b3J5VXJsKHZhbHVlLnRyaW0oKSk7XG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLnZlcnNpb24gIT09IFwiXCIgJiYgKCF0aGlzLmFkZHJlc3MgfHwgIXRoaXMuaXNHaXRIdWJSZXBvc2l0b3J5TWF0Y2godGhpcy5hZGRyZXNzKSkpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBEaXNhYmxlIHZlcnNpb24gZHJvcGRvd24gaWYgdmVyc2lvbiBpcyBzZXQgYW5kIGFkZHJlc3MgaXMgZW1wdHlcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy52ZXJzaW9uU2V0dGluZykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy51cGRhdGVWZXJzaW9uRHJvcGRvd24odGhpcy52ZXJzaW9uU2V0dGluZywgW10pO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy52ZXJzaW9uU2V0dGluZy5zZXR0aW5nRWwuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkLXNldHRpbmdcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnZlcnNpb25TZXR0aW5nLnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YWRkcmVzc0VsLmlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkLXJlcG9zaXRvcnlcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRhZGRyZXNzRWwuaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZC1yZXBvc2l0b3J5XCIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBHaXRIdWIgUmVwb3NpdG9yeSBtYXRjaGVzIHRoZSBHaXRIdWIgcGF0dGVybiwgZW5hYmxlIHRoZSBcIkFkZCBQbHVnaW5cIlxuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMudmVyc2lvbikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmlzR2l0SHViUmVwb3NpdG9yeU1hdGNoKHRoaXMuYWRkcmVzcykpIHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZChmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB0aGlzLmFkZFBsdWdpbkJ1dHRvbj8uc2V0RGlzYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRhZGRyZXNzRWwuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuXHRcdFx0XHRcdFx0XHRcdHZvaWQgKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmFkZHJlc3MgJiYgKCh0aGlzLnVwZGF0ZVZlcnNpb24gJiYgdGhpcy52ZXJzaW9uICE9PSBcIlwiKSB8fCAhdGhpcy51cGRhdGVWZXJzaW9uKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZCh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5jYW5jZWxCdXR0b24/LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnZlcnNpb25TZXR0aW5nPy5zZXREaXNhYmxlZCh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dm9pZCB0aGlzLnN1Ym1pdEZvcm0oKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gUG9wdWxhdGUgdmVyc2lvbiBkcm9wZG93blxuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy51cGRhdGVSZXBvc2l0b3J5VmVyc2lvbkluZm8odGhpcy52ZXJzaW9uLCB2YWxpZGF0aW9uU3RhdHVzRWwpO1xuXHRcdFx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQvLyBVcGRhdGUgdmVyc2lvbiBkcm9wZG93biB3aGVuIGlucHV0IGxvc2VzIGZvY3VzXG5cdFx0XHRcdFx0XHRhZGRyZXNzRWwuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZvaWQgdGhpcy51cGRhdGVSZXBvc2l0b3J5VmVyc2lvbkluZm8odGhpcy52ZXJzaW9uLCB2YWxpZGF0aW9uU3RhdHVzRWwpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8vIEZJWE1FXG5cdFx0XHRcdFx0XHRzZXR0aW5nLnNldERlc2ModGV4dC5yZXBvc2l0b3J5LmxhYmVsKTtcblx0XHRcdFx0XHRcdGFkZHJlc3NFbC5pbnB1dEVsLmFkZENsYXNzKFwiYnJhdC1mdWxsLXdpZHRoLWlucHV0XCIpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdC8vIEFkZCB2YWxpZGF0aW9uIHN0YXR1cyBlbGVtZW50IChhcyBhIHNlcGFyYXRlIGVsZW1lbnQpXG5cdFx0XHQvLyBUT0RPOiBGaW5kIGJldHRlciB3YXkgdG8gYnVpbGQgdGhlIG1vZGFsXG5cdFx0XHRjb25zdCB2YWxpZGF0aW9uU3RhdHVzRWwgPSBmb3JtRWwuY3JlYXRlRGl2KFwidmFsaWRhdGlvbi1zdGF0dXNcIik7XG5cdFx0XHRpZiAoIXRoaXMuYWRkcmVzcykgdmFsaWRhdGlvblN0YXR1c0VsLnNldFRleHQodGV4dC5yZXBvc2l0b3J5LmVudGVyQWRkcmVzc1RvVmFsaWRhdGUpO1xuXG5cdFx0XHQvLyBUaGVuIGFkZCB2ZXJzaW9uIGRyb3Bkb3duXG5cdFx0XHR0aGlzLnZlcnNpb25TZXR0aW5nID0gbmV3IFNldHRpbmcoZm9ybUVsKS5zZXRDbGFzcyhcInZlcnNpb24tc2V0dGluZ1wiKS5zZXRDbGFzcyhcImRpc2FibGVkLXNldHRpbmdcIik7XG5cdFx0XHR0aGlzLnVwZGF0ZVZlcnNpb25Ecm9wZG93bih0aGlzLnZlcnNpb25TZXR0aW5nLCBbXSwgdGhpcy52ZXJzaW9uKTtcblx0XHRcdHRoaXMudmVyc2lvblNldHRpbmcuc2V0RGlzYWJsZWQodHJ1ZSk7XG5cblx0XHRcdC8vIFRva2VuIHNldHRpbmcgc2VjdGlvblxuXHRcdFx0Y29uc3QgdG9rZW5FbGVtZW50ID0gZm9ybUVsLmNyZWF0ZURpdihcInRva2VuLXNldHRpbmdcIik7XG5cdFx0XHRuZXcgU2V0dGluZyh0b2tlbkVsZW1lbnQpXG5cdFx0XHRcdC5zZXROYW1lKHRleHQudG9rZW4ubmFtZSlcblx0XHRcdFx0LnNldERlc2ModGV4dC50b2tlbi5kZXNjKVxuXHRcdFx0XHQuYWRkQ29tcG9uZW50KChlbCkgPT5cblx0XHRcdFx0XHRuZXcgU2VjcmV0Q29tcG9uZW50KHRoaXMucGx1Z2luLmFwcCwgZWwpLnNldFZhbHVlKHRoaXMuc2VjcmV0TmFtZSkub25DaGFuZ2UoKHNlbGVjdGVkU2VjcmV0TmFtZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuXHRcdFx0XHRcdFx0dm9pZCAoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHQvLyBVc2VyIHNlbGVjdGVkIGEgZGlmZmVyZW50IHNlY3JldCBuYW1lIChjYW4gYmUgbnVsbCB3aGVuIGNsZWFyZWQpXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VjcmV0TmFtZSA9IHNlbGVjdGVkU2VjcmV0TmFtZT8udHJpbSgpIHx8IFwiXCI7XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5zZWNyZXROYW1lKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuYWRkcmVzcyAmJiBleGlzdEJldGFQbHVnaW5Jbkxpc3QodGhpcy5wbHVnaW4sIHRoaXMuYWRkcmVzcykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZVBsdWdpblRva2VuTmFtZSh0aGlzLnBsdWdpbiwgdGhpcy5hZGRyZXNzLCBcIlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgdGV4dC50b2tlbi5zZXR0aW5nQ2xlYXJlZCh0aGlzLmFkZHJlc3MpLCAzKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0dm9pZCB0aGlzLnVwZGF0ZVJlcG9zaXRvcnlWZXJzaW9uSW5mbyh0aGlzLnZlcnNpb24sIHZhbGlkYXRpb25TdGF0dXNFbCk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRva2VuVmFsdWUgPSB0aGlzLnNlY3JldE5hbWUgPyB0aGlzLnBsdWdpbi5hcHAuc2VjcmV0U3RvcmFnZS5nZXRTZWNyZXQodGhpcy5zZWNyZXROYW1lKSA6IG51bGw7XG5cdFx0XHRcdFx0XHRcdGlmICh0b2tlblZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy52YWxpZFRva2VuID0gYXdhaXQgdGhpcy52YWxpZGF0b3I/LnZhbGlkYXRlVG9rZW4odG9rZW5WYWx1ZSwgdGhpcy5hZGRyZXNzKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMudmFsaWRUb2tlbikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZUJ1dHRvbj8uc2V0QnV0dG9uVGV4dCh0ZXh0LmJ1dHRvbnMuaW52YWxpZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQnV0dG9uPy5zZXREaXNhYmxlZChmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVCdXR0b24/LnNldEJ1dHRvblRleHQodGV4dC5idXR0b25zLnZhbGlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVCdXR0b24/LnNldERpc2FibGVkKHRydWUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBVcGRhdGUgdmVyc2lvbiBkcm9wZG93biB3aGVuIEFQSSBrZXkgY2hhbmdlc1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuYWRkcmVzcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnVwZGF0ZVJlcG9zaXRvcnlWZXJzaW9uSW5mbyh0aGlzLnZlcnNpb24sIHZhbGlkYXRpb25TdGF0dXNFbCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBzZWNyZXQgbmFtZSBmb3IgdGhpcyBwbHVnaW4gaW4gdGhlIHNldHRpbmdzIGlmIGl0IGFscmVhZHkgZXhpc3RzIHRoZXJlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChleGlzdEJldGFQbHVnaW5Jbkxpc3QodGhpcy5wbHVnaW4sIHRoaXMuYWRkcmVzcykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVQbHVnaW5Ub2tlbk5hbWUodGhpcy5wbHVnaW4sIHRoaXMuYWRkcmVzcywgdGhpcy5zZWNyZXROYW1lKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UodGhpcy5wbHVnaW4sIHRleHQudG9rZW4uc2V0dGluZ1VwZGF0ZWQodGhpcy5hZGRyZXNzKSwgMyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdCk7XG5cblx0XHRcdC8vIEluaXRpYWxpemUgdmFsaWRhdG9yXG5cdFx0XHR0aGlzLnZhbGlkYXRvciA9IG5ldyBUb2tlblZhbGlkYXRvcigpO1xuXG5cdFx0XHQvLyBWYWxpZGF0ZSB0aGUgY3VycmVudCB0b2tlbiBpZiB3ZSBoYXZlIGEgc2VjcmV0IG5hbWVcblx0XHRcdGlmICh0aGlzLnNlY3JldE5hbWUpIHtcblx0XHRcdFx0Y29uc3QgdG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldCh0aGlzLnNlY3JldE5hbWUpO1xuXHRcdFx0XHRpZiAodG9rZW5WYWx1ZSkge1xuXHRcdFx0XHRcdC8vIFZhbGlkYXRlIGFzeW5jaHJvbm91c2x5IG9uIGluaXRpYWwgbG9hZFxuXHRcdFx0XHRcdHZvaWQgdGhpcy52YWxpZGF0b3I/LnZhbGlkYXRlVG9rZW4odG9rZW5WYWx1ZSwgdGhpcy5hZGRyZXNzKS50aGVuKChpc1ZhbGlkKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkVG9rZW4gPSBpc1ZhbGlkO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMudmFsaWRUb2tlbikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQnV0dG9uPy5zZXRCdXR0b25UZXh0KHRleHQuYnV0dG9ucy52YWxpZCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVCdXR0b24/LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvcm1FbC5jcmVhdGVEaXYoXCJtb2RhbC1idXR0b24tY29udGFpbmVyXCIsIChidXR0b25Db250YWluZXJFbCkgPT4ge1xuXHRcdFx0XHRidXR0b25Db250YWluZXJFbC5jcmVhdGVFbChcblx0XHRcdFx0XHRcImxhYmVsXCIsXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y2xzOiBcIm1vZC1jaGVja2JveFwiLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGxhYmVsRWwpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGNoZWNrYm94RWwgPSBsYWJlbEVsLmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuXHRcdFx0XHRcdFx0XHRhdHRyOiB7IHRhYmluZGV4OiAtMSB9LFxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcImNoZWNrYm94XCIsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGNoZWNrYm94RWwuY2hlY2tlZCA9IHRoaXMuZW5hYmxlQWZ0ZXJJbnN0YWxsO1xuXHRcdFx0XHRcdFx0Y2hlY2tib3hFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVuYWJsZUFmdGVySW5zdGFsbCA9IGNoZWNrYm94RWwuY2hlY2tlZDtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0bGFiZWxFbC5hcHBlbmRUZXh0KHRleHQuZW5hYmxlQWZ0ZXJJbnN0YWxsKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHRoaXMuY2FuY2VsQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChidXR0b25Db250YWluZXJFbClcblx0XHRcdFx0XHQuc2V0QnV0dG9uVGV4dCh0ZXh0LmJ1dHRvbnMubmV2ZXJNaW5kKVxuXHRcdFx0XHRcdC5zZXRDbGFzcyhcIm1vZC1jYW5jZWxcIilcblx0XHRcdFx0XHQub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5hZGRQbHVnaW5CdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGJ1dHRvbkNvbnRhaW5lckVsKVxuXHRcdFx0XHRcdC5zZXRCdXR0b25UZXh0KHRoaXMudXBkYXRlVmVyc2lvbiA/ICh0aGlzLmFkZHJlc3MgPyB0ZXh0LmJ1dHRvbnMuY2hhbmdlVmVyc2lvbiA6IHRleHQuYnV0dG9ucy5hZGRQbHVnaW4pIDogdGV4dC5idXR0b25zLmFkZFBsdWdpbilcblx0XHRcdFx0XHQuc2V0Q3RhKClcblx0XHRcdFx0XHQub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hZGRyZXNzICE9PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRcdGlmICgodGhpcy51cGRhdGVWZXJzaW9uICYmIHRoaXMudmVyc2lvbiAhPT0gXCJcIikgfHwgIXRoaXMudXBkYXRlVmVyc2lvbikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFN1Ym1pdCB0aGUgZm9ybVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZCh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmFkZFBsdWdpbkJ1dHRvbj8uc2V0QnV0dG9uVGV4dCh0ZXh0LmJ1dHRvbnMuaW5zdGFsbGluZyk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5jYW5jZWxCdXR0b24/LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudmVyc2lvblNldHRpbmc/LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdHZvaWQgdGhpcy5zdWJtaXRGb3JtKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIFwiQWRkIFBsdWdpblwiIGlmIGFkZGluZyBhIGZyb3plbiB2ZXJzaW9uIG9ubHlcblx0XHRcdFx0aWYgKHRoaXMudXBkYXRlVmVyc2lvbiB8fCB0aGlzLmFkZHJlc3MgPT09IFwiXCIpIHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZCh0cnVlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRjb25zdCBuZXdEaXYgPSBmb3JtRWwuY3JlYXRlRGl2KCk7XG5cdFx0XHRuZXdEaXYuYWRkQ2xhc3MoXCJicmF0LW1vZGFsLWRpdmlkZXJcIik7XG5cdFx0XHRjb25zdCBhdXRob3JCeWxpbmUgPSBuZXdEaXYuY3JlYXRlU3BhbigpO1xuXHRcdFx0YXV0aG9yQnlsaW5lLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRcdGhyZWY6IFwiaHR0cHM6Ly9iaXQubHkvbzQyLXR3aXR0ZXJcIixcblx0XHRcdFx0dGV4dDogXCJURlRIYWNrZXJcIixcblx0XHRcdH0pO1xuXHRcdFx0YXV0aG9yQnlsaW5lLmFwcGVuZFRleHQoY29tbW9uVGV4dC5hbmQpO1xuXHRcdFx0YXV0aG9yQnlsaW5lLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRcdGhyZWY6IFwiaHR0cHM6Ly9naXRodWIuY29tL2pvaGFubnJpY2hhcmRcIixcblx0XHRcdFx0dGV4dDogXCJqb2hhbm5yaWNoYXJkXCIsXG5cdFx0XHR9KTtcblx0XHRcdGF1dGhvckJ5bGluZS5hZGRDbGFzcyhcImJyYXQtY3JlZGl0c1wiKTtcblx0XHRcdG5ld0Rpdi5hcHBlbmRDaGlsZChhdXRob3JCeWxpbmUpO1xuXHRcdFx0cHJvbW90aW9uYWxMaW5rcyhuZXdEaXYsIGZhbHNlKTtcblxuXHRcdFx0Ly8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBvbiBFbnRlciBrZXkgYW5kIGJ1dHRvbiBjbGlja3MsIGFuZCBlbnN1cmUgYnV0dG9ucyBkb24ndCB0cmlnZ2VyIGZvcm0gc3VibWlzc2lvblxuXHRcdFx0Y29uc3QgYnV0dG9ucyA9IGZvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpO1xuXHRcdFx0Zm9yIChjb25zdCBidXR0b24gb2YgQXJyYXkuZnJvbShidXR0b25zKSkge1xuXHRcdFx0XHQvLyBTZXQgdHlwZSB0byBwcmV2ZW50IGZvcm0gc3VibWlzc2lvblxuXHRcdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW52b2tlZCB3aGVuIFwiU3VibWl0XCIgYnV0dG9uIGlzIGNsaWNrZWQuXG5cdFx0XHRmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZTogRXZlbnQpID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5hZGRyZXNzKSB7XG5cdFx0XHQvLyBJZiB3ZSBoYXZlIGEgcHJlZmlsbGVkIHJlcG8sIHRyaWdnZXIgdGhlIHZlcnNpb24gZHJvcGRvd24gdXBkYXRlXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHZvaWQgdGhpcy51cGRhdGVSZXBvc2l0b3J5VmVyc2lvbkluZm8odGhpcy52ZXJzaW9uKTtcblx0XHRcdH0sIDEwMCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgcmVwb3NpdG9yeSB2YWxpZGF0aW9uIGFuZCB2ZXJzaW9uIGRyb3Bkb3duXG5cdCAqIEBwYXJhbSBzZWxlY3RlZFZlcnNpb24gLSBUaGUgdmVyc2lvbiB0byBzZWxlY3QgaW4gdGhlIGRyb3Bkb3duXG5cdCAqIEBwYXJhbSB2YWxpZGF0ZUlucHV0RWwgLSBUaGUgYWRkcmVzcyBpbnB1dCBlbGVtZW50XG5cdCAqIEBwYXJhbSB2YWxpZGF0aW9uU3RhdHVzRWwgLSBUaGUgZXJyb3IgZWxlbWVudCAodXNlZCBmb3IgZXJyb3JzLCBpbmNsLiBHaXRIdWIgUmF0ZSBsaW1pdClcblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIHVwZGF0ZVJlcG9zaXRvcnlWZXJzaW9uSW5mbyhzZWxlY3RlZFZlcnNpb24gPSBcIlwiLCB2YWxpZGF0aW9uU3RhdHVzRWw/OiBIVE1MRWxlbWVudCkge1xuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKS5hZGRCZXRhUGx1Z2luTW9kYWw7XG5cdFx0Y29uc3QgdmFsaWRhdGVJbnB1dEVsID0gdGhpcy5yZXBvc2l0b3J5QWRkcmVzc0VsO1xuXHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKSB7XG5cdFx0XHRjb25zb2xlLmRlYnVnKGBbQlJBVF0gVXBkYXRpbmcgdmVyc2lvbiBkcm9wZG93biBmb3IgJHt0aGlzLmFkZHJlc3N9IHdpdGggc2VsZWN0ZWQgdmVyc2lvbiAke3NlbGVjdGVkVmVyc2lvbn1gKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuYWRkcmVzcykge1xuXHRcdFx0dmFsaWRhdGlvblN0YXR1c0VsPy5zZXRUZXh0KHRleHQucmVwb3NpdG9yeS5hZGRyZXNzUmVxdWlyZWQpO1xuXHRcdFx0dmFsaWRhdGlvblN0YXR1c0VsPy5hZGRDbGFzcyhcInZhbGlkYXRpb24tc3RhdHVzLWVycm9yXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhbGlkYXRpb25TdGF0dXNFbD8uc2V0VGV4dCh0ZXh0LnJlcG9zaXRvcnkudmFsaWRhdGluZyk7XG5cdFx0dmFsaWRhdGlvblN0YXR1c0VsPy5yZW1vdmVDbGFzcyhcInZhbGlkYXRpb24tc3RhdHVzLWVycm9yXCIpO1xuXG5cdFx0aWYgKHRoaXMudmVyc2lvblNldHRpbmcgJiYgdGhpcy51cGRhdGVWZXJzaW9uKSB7XG5cdFx0XHQvLyBDbGVhciB0aGUgdmVyc2lvbiBkcm9wZG93blxuXHRcdFx0dGhpcy51cGRhdGVWZXJzaW9uRHJvcGRvd24odGhpcy52ZXJzaW9uU2V0dGluZywgW10pO1xuXHRcdH1cblx0XHRjb25zdCBzY3J1YmJlZEFkZHJlc3MgPSBzY3J1YlJlcG9zaXRvcnlVcmwodGhpcy5hZGRyZXNzKTtcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBHZXQgdGhlIGFjdHVhbCB0b2tlbiB2YWx1ZSBmcm9tIFNlY3JldFN0b3JhZ2Vcblx0XHRcdGxldCB0b2tlblRvVXNlID0gXCJcIjtcblx0XHRcdGlmICh0aGlzLnNlY3JldE5hbWUpIHtcblx0XHRcdFx0Y29uc3QgdG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldCh0aGlzLnNlY3JldE5hbWUpO1xuXHRcdFx0XHRpZiAodG9rZW5WYWx1ZSkge1xuXHRcdFx0XHRcdHRva2VuVG9Vc2UgPSB0b2tlblZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSkge1xuXHRcdFx0XHRjb25zdCBnbG9iYWxUb2tlbiA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5nbG9iYWxUb2tlbk5hbWUpO1xuXHRcdFx0XHRpZiAoZ2xvYmFsVG9rZW4pIHtcblx0XHRcdFx0XHR0b2tlblRvVXNlID0gZ2xvYmFsVG9rZW47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdmVyc2lvbnMgPSBhd2FpdCBmZXRjaFJlbGVhc2VWZXJzaW9ucyhzY3J1YmJlZEFkZHJlc3MsIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlYnVnZ2luZ01vZGUsIHRva2VuVG9Vc2UpO1xuXG5cdFx0XHRpZiAodmVyc2lvbnMgJiYgdmVyc2lvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQvLyBBZGQgdmFsaWQtcmVwb3NpdG9yeSBjbGFzc1xuXHRcdFx0XHR2YWxpZGF0ZUlucHV0RWw/LmlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWQtcmVwb3NpdG9yeVwiKTtcblx0XHRcdFx0dmFsaWRhdGVJbnB1dEVsPy5pbnB1dEVsLmNsYXNzTGlzdC5hZGQoXCJ2YWxpZC1yZXBvc2l0b3J5XCIpO1xuXHRcdFx0XHR2YWxpZGF0aW9uU3RhdHVzRWw/LnNldFRleHQoXCJcIik7XG5cblx0XHRcdFx0aWYgKHRoaXMudmVyc2lvblNldHRpbmcpIHtcblx0XHRcdFx0XHR0aGlzLnZlcnNpb25TZXR0aW5nLnNldHRpbmdFbC5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWQtc2V0dGluZ1wiKTtcblx0XHRcdFx0XHR0aGlzLnZlcnNpb25TZXR0aW5nLnNldERpc2FibGVkKGZhbHNlKTtcblx0XHRcdFx0XHQvLyBBZGQgbmV3IGRyb3Bkb3duIHRvIGV4aXN0aW5nIHZlcnNpb24gc2V0dGluZ1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlVmVyc2lvbkRyb3Bkb3duKHRoaXMudmVyc2lvblNldHRpbmcsIHZlcnNpb25zLCBzZWxlY3RlZFZlcnNpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBBZGQgaW52YWxpZC1yZXBvc2l0b3J5IGNsYXNzXG5cdFx0XHRcdHZhbGlkYXRlSW5wdXRFbD8uaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmFsaWQtcmVwb3NpdG9yeVwiKTtcblx0XHRcdFx0dmFsaWRhdGVJbnB1dEVsPy5pbnB1dEVsLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkLXJlcG9zaXRvcnlcIik7XG5cdFx0XHRcdHZhbGlkYXRpb25TdGF0dXNFbD8uc2V0VGV4dCh0ZXh0LnJlcG9zaXRvcnkubm9SZWxlYXNlc0ZvdW5kKTtcblx0XHRcdFx0dmFsaWRhdGlvblN0YXR1c0VsPy5hZGRDbGFzcyhcInZhbGlkYXRpb24tc3RhdHVzLWVycm9yXCIpO1xuXG5cdFx0XHRcdHRoaXMudmVyc2lvblNldHRpbmc/LnNldHRpbmdFbC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWQtc2V0dGluZ1wiKTtcblx0XHRcdFx0dGhpcy52ZXJzaW9uU2V0dGluZz8uc2V0RGlzYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdHRoaXMuYWRkUGx1Z2luQnV0dG9uPy5zZXREaXNhYmxlZCh0cnVlKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgR0hSYXRlTGltaXRFcnJvcikge1xuXHRcdFx0XHQvLyBBZGQgaW52YWxpZC1yZXBvc2l0b3J5IGNsYXNzXG5cdFx0XHRcdHZhbGlkYXRlSW5wdXRFbD8uaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmFsaWQtcmVwb3NpdG9yeVwiKTtcblx0XHRcdFx0dmFsaWRhdGVJbnB1dEVsPy5pbnB1dEVsLmNsYXNzTGlzdC5hZGQoXCJ2YWxpZGF0aW9uLWVycm9yXCIpO1xuXHRcdFx0XHR2YWxpZGF0aW9uU3RhdHVzRWw/LnNldFRleHQodGV4dC5yZXBvc2l0b3J5LnJhdGVMaW1pdEV4Y2VlZGVkKGVycm9yLmdldE1pbnV0ZXNUb1Jlc2V0KCkpKTtcblxuXHRcdFx0XHRpZiAodGhpcy52ZXJzaW9uU2V0dGluZykge1xuXHRcdFx0XHRcdHRoaXMudmVyc2lvblNldHRpbmcuc2V0dGluZ0VsLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZC1zZXR0aW5nXCIpO1xuXHRcdFx0XHRcdHRoaXMudmVyc2lvblNldHRpbmcuc2V0RGlzYWJsZWQodHJ1ZSk7XG5cdFx0XHRcdFx0dGhpcy5hZGRQbHVnaW5CdXR0b24/LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCB0ZXh0LnJlcG9zaXRvcnkucmF0ZUxpbWl0VG9hc3QoZXJyb3IubWVzc2FnZSksIDIwLCAoKTogdm9pZCA9PiB7XG5cdFx0XHRcdFx0d2luZG93Lm9wZW4oXCJodHRwczovL2dpdGh1Yi5jb20vVGZUSGFja2VyL29ic2lkaWFuNDItYnJhdC9ibG9iL21haW4vQlJBVC1ERVZFTE9QRVItR1VJREUubWQjZ2l0aHViLWFwaS1yYXRlLWxpbWl0c1wiKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gdG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBgR2l0SHViIEFQSSByYXRlIGxpbWl0IGV4Y2VlZGVkLiBUcnkgYWdhaW4gaW4gJHtlcnJvci5nZXRNaW51dGVzVG9SZXNldCgpfSBtaW51dGVzLmAsIDEwKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgR2l0SHViUmVzcG9uc2VFcnJvcikge1xuXHRcdFx0XHRjb25zdCBnaXRIdWJFcnJvciA9IGVycm9yO1xuXHRcdFx0XHRzd2l0Y2ggKGdpdEh1YkVycm9yLnN0YXR1cykge1xuXHRcdFx0XHRcdGNhc2UgNDA0OlxuXHRcdFx0XHRcdFx0dmFsaWRhdGlvblN0YXR1c0VsPy5zZXRUZXh0KHRleHQucmVwb3NpdG9yeS5ub3RGb3VuZCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDQwMzpcblx0XHRcdFx0XHRcdHZhbGlkYXRpb25TdGF0dXNFbD8uc2V0VGV4dCh0ZXh0LnJlcG9zaXRvcnkuYWNjZXNzRGVuaWVkKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR2YWxpZGF0aW9uU3RhdHVzRWw/LnNldFRleHQodGV4dC5yZXBvc2l0b3J5LmVycm9yKGdpdEh1YkVycm9yLm1lc3NhZ2UpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGlzYWJsZSByZWxldmFudCBzZXR0aW5nc1xuXHRcdFx0XHR2YWxpZGF0aW9uU3RhdHVzRWw/LmFkZENsYXNzKFwidmFsaWRhdGlvbi1zdGF0dXMtZXJyb3JcIik7XG5cdFx0XHRcdHRoaXMudmVyc2lvblNldHRpbmc/LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHR0aGlzLmFkZFBsdWdpbkJ1dHRvbj8uc2V0RGlzYWJsZWQodHJ1ZSk7XG5cblx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCB0ZXh0LnJlcG9zaXRvcnkuZ2l0SHViUmVzcG9uc2VUb2FzdChnaXRIdWJFcnJvci5tZXNzYWdlKSwgMjApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG9uQ2xvc2UoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMub3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcykge1xuXHRcdFx0dGhpcy5wbHVnaW4uYXBwLnNldHRpbmcub3BlbigpO1xuXHRcdFx0dGhpcy5wbHVnaW4uYXBwLnNldHRpbmcub3BlblRhYkJ5SWQodGhpcy5wbHVnaW4uQVBQX0lEKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGlzR2l0SHViUmVwb3NpdG9yeU1hdGNoKGFkZHJlc3M6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdC8vIFJlbW92ZSB0cmFpbGluZyAuZ2l0IGlmIHByZXNlbnRcblx0XHRjb25zdCBjbGVhbkFkZHJlc3MgPSBhZGRyZXNzXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXFwuZ2l0JC8sIFwiXCIpXG5cdFx0XHQudG9Mb3dlckNhc2UoKTtcblxuXHRcdC8vIE1hdGNoIGVpdGhlciBmb3JtYXQ6XG5cdFx0Ly8gMS4gdXNlci9yZXBvXG5cdFx0Ly8gMi4gaHR0cHM6Ly9naXRodWIuY29tL3VzZXIvcmVwb1xuXHRcdGNvbnN0IGdpdGh1YlBhdHRlcm4gPSAvXig/Omh0dHBzPzpcXC9cXC9naXRodWJcXC5jb21cXC8pPyhbYS16QS1aMC05Ll8tXSspXFwvKFthLXpBLVowLTkuXy1dKykkL2k7XG5cblx0XHRyZXR1cm4gZ2l0aHViUGF0dGVybi50ZXN0KGNsZWFuQWRkcmVzcyk7XG5cdH1cbn1cbiIsICJpbXBvcnQge1xuXHR0eXBlIEdpdEh1YlRva2VuSW5mbyxcblx0VG9rZW5FcnJvclR5cGUsXG5cdHR5cGUgVG9rZW5WYWxpZGF0aW9uRXJyb3IsXG5cdHZhbGlkYXRlR2l0SHViVG9rZW4sXG59IGZyb20gXCIuLi9mZWF0dXJlcy9naXRodWJVdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgVG9rZW5WYWxpZGF0b3Ige1xuXHRwcml2YXRlIHN0YXR1c0VsPzogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKHN0YXR1c0VsPzogSFRNTEVsZW1lbnQgfCBudWxsKSB7XG5cdFx0dGhpcy5zdGF0dXNFbCA9IHN0YXR1c0VsO1xuXHR9XG5cblx0YXN5bmMgdmFsaWRhdGVUb2tlbih0b2tlbjogc3RyaW5nLCByZXBvc2l0b3J5Pzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Ly8gTm8gdG9rZW4gcHJvdmlkZWRcblx0XHRpZiAoIXRva2VuKSB7XG5cdFx0XHR0aGlzLnN0YXR1c0VsPy5zZXRUZXh0KFwiTm8gdG9rZW4gcHJvdmlkZWRcIik7XG5cdFx0XHR0aGlzLnN0YXR1c0VsPy5hZGRDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHR0aGlzLnN0YXR1c0VsPy5yZW1vdmVDbGFzcyhcInZhbGlkXCIpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwYXRJbmZvID0gYXdhaXQgdmFsaWRhdGVHaXRIdWJUb2tlbih0b2tlbiwgcmVwb3NpdG9yeSk7XG5cdFx0XHR0aGlzLnN0YXR1c0VsPy5yZW1vdmVDbGFzcyhcImludmFsaWRcIiwgXCJ2YWxpZFwiKTtcblx0XHRcdHRoaXMuc3RhdHVzRWw/LmVtcHR5KCk7XG5cblx0XHRcdGlmIChwYXRJbmZvLnZhbGlkVG9rZW4pIHtcblx0XHRcdFx0dGhpcy5zdGF0dXNFbD8uYWRkQ2xhc3MoXCJ2YWxpZFwiKTtcblx0XHRcdFx0dGhpcy5zaG93VmFsaWRUb2tlbkluZm8ocGF0SW5mbyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnN0YXR1c0VsPy5hZGRDbGFzcyhcImludmFsaWRcIik7XG5cdFx0XHR0aGlzLnNob3dFcnJvck1lc3NhZ2UocGF0SW5mby5lcnJvcik7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJUb2tlbiB2YWxpZGF0aW9uIGVycm9yOlwiLCBlcnJvcik7XG5cdFx0XHR0aGlzLnN0YXR1c0VsPy5zZXRUZXh0KFwiRmFpbGVkIHRvIHZhbGlkYXRlIHRva2VuXCIpO1xuXHRcdFx0dGhpcy5zdGF0dXNFbD8uYWRkQ2xhc3MoXCJpbnZhbGlkXCIpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc2hvd1ZhbGlkVG9rZW5JbmZvKHBhdEluZm86IEdpdEh1YlRva2VuSW5mbyk6IHZvaWQge1xuXHRcdGNvbnN0IGRldGFpbHMgPSB0aGlzLnN0YXR1c0VsPy5jcmVhdGVEaXYoeyBjbHM6IFwiYnJhdC10b2tlbi1kZXRhaWxzXCIgfSk7XG5cblx0XHRpZiAoIWRldGFpbHMpIHJldHVybjtcblxuXHRcdGRldGFpbHMuY3JlYXRlRGl2KHtcblx0XHRcdHRleHQ6IFwiXHUyNzEzIFZhbGlkIHRva2VuXCIsXG5cdFx0XHRjbHM6IFwiYnJhdC10b2tlbi1zdGF0dXMgdmFsaWRcIixcblx0XHR9KTtcblxuXHRcdGlmIChwYXRJbmZvLmN1cnJlbnRTY29wZXM/Lmxlbmd0aCkge1xuXHRcdFx0ZGV0YWlscy5jcmVhdGVEaXYoe1xuXHRcdFx0XHR0ZXh0OiBgU2NvcGVzOiAke3BhdEluZm8uY3VycmVudFNjb3Blcy5qb2luKFwiLCBcIil9YCxcblx0XHRcdFx0Y2xzOiBcImJyYXQtdG9rZW4tc2NvcGVzXCIsXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAocGF0SW5mby5yYXRlTGltaXQpIHtcblx0XHRcdGRldGFpbHMuY3JlYXRlRGl2KHtcblx0XHRcdFx0dGV4dDogYFJhdGUgTGltaXQ6ICR7cGF0SW5mby5yYXRlTGltaXQucmVtYWluaW5nfS8ke3BhdEluZm8ucmF0ZUxpbWl0LmxpbWl0fWAsXG5cdFx0XHRcdGNsczogXCJicmF0LXRva2VuLXJhdGVcIixcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChwYXRJbmZvLmV4cGlyYXRpb25EYXRlKSB7XG5cdFx0XHRjb25zdCBleHBpcmVzID0gbmV3IERhdGUocGF0SW5mby5leHBpcmF0aW9uRGF0ZSk7XG5cdFx0XHRjb25zdCBkYXlzTGVmdCA9IE1hdGguY2VpbChcblx0XHRcdFx0KGV4cGlyZXMuZ2V0VGltZSgpIC0gRGF0ZS5ub3coKSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCksXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoZGF5c0xlZnQgPCA3KSB7XG5cdFx0XHRcdGRldGFpbHMuY3JlYXRlRGl2KHtcblx0XHRcdFx0XHR0ZXh0OiBgXHUyNkEwXHVGRTBGIFRva2VuIGV4cGlyZXMgaW4gJHtkYXlzTGVmdH0gZGF5c2AsXG5cdFx0XHRcdFx0Y2xzOiBcImJyYXQtdG9rZW4td2FybmluZ1wiLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHNob3dFcnJvck1lc3NhZ2UoZXJyb3I6IFRva2VuVmFsaWRhdGlvbkVycm9yKTogdm9pZCB7XG5cdFx0Y29uc3QgZGV0YWlscyA9IHRoaXMuc3RhdHVzRWw/LmNyZWF0ZURpdih7IGNsczogXCJicmF0LXRva2VuLWVycm9yXCIgfSk7XG5cdFx0aWYgKCFkZXRhaWxzKSByZXR1cm47XG5cblx0XHRkZXRhaWxzLmNyZWF0ZURpdih7IHRleHQ6IGVycm9yLm1lc3NhZ2UgfSk7XG5cblx0XHRpZiAoZXJyb3IuZGV0YWlscykge1xuXHRcdFx0c3dpdGNoIChlcnJvci50eXBlKSB7XG5cdFx0XHRcdGNhc2UgVG9rZW5FcnJvclR5cGUuSU5WQUxJRF9QUkVGSVg6XG5cdFx0XHRcdFx0ZGV0YWlscy5jcmVhdGVEaXYoe1xuXHRcdFx0XHRcdFx0dGV4dDogYFZhbGlkIHByZWZpeGVzOiAke2Vycm9yLmRldGFpbHMudmFsaWRQcmVmaXhlcz8uam9pbihcIiwgXCIpfWAsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgVG9rZW5FcnJvclR5cGUuSU5TVUZGSUNJRU5UX1NDT1BFOlxuXHRcdFx0XHRcdGRldGFpbHMuY3JlYXRlRGl2KHtcblx0XHRcdFx0XHRcdHRleHQ6IGBSZXF1aXJlZCBzY29wZXM6ICR7ZXJyb3IuZGV0YWlscy5yZXF1aXJlZFNjb3Blcz8uam9pbihcIiwgXCIpfWAsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdpdEh1YlJlc291cmNlTGluayhcblx0Z2l0aHViUmVzb3VyY2U6IHN0cmluZyxcblx0b3B0aW9uYWxUZXh0Pzogc3RyaW5nLFxuKTogRG9jdW1lbnRGcmFnbWVudCB7XG5cdGNvbnN0IG5ld0xpbmsgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JzaWRpYW5tZC9wcmVmZXItYWN0aXZlLWRvYyAtLSBCUkFUIGNvbXBhdGliaWxpdHk6IGFjdGl2ZURvY3VtZW50IGJyZWFrcyB1dGlsaXR5IHJlbmRlcmluZyBjYWxsIHNpdGVzXG5cdGNvbnN0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdGxpbmtFbGVtZW50LnRleHRDb250ZW50ID0gZ2l0aHViUmVzb3VyY2U7XG5cdGxpbmtFbGVtZW50LmhyZWYgPSBgaHR0cHM6Ly9naXRodWIuY29tLyR7Z2l0aHViUmVzb3VyY2V9YDtcblx0bGlua0VsZW1lbnQudGFyZ2V0ID0gXCJfYmxhbmtcIjtcblx0bmV3TGluay5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XG5cdGlmIChvcHRpb25hbFRleHQpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JzaWRpYW5tZC9wcmVmZXItYWN0aXZlLWRvYyAtLSBCUkFUIGNvbXBhdGliaWxpdHk6IGFjdGl2ZURvY3VtZW50IGJyZWFrcyB1dGlsaXR5IHJlbmRlcmluZyBjYWxsIHNpdGVzXG5cdFx0Y29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvcHRpb25hbFRleHQpO1xuXHRcdG5ld0xpbmsuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXHR9XG5cdHJldHVybiBuZXdMaW5rO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGluayh7XG5cdHByZXBlbmRUZXh0LFxuXHR1cmwsXG5cdHRleHQsXG5cdGFwcGVuZFRleHQsXG59OiB7XG5cdHByZXBlbmRUZXh0Pzogc3RyaW5nO1xuXHR1cmw6IHN0cmluZztcblx0dGV4dDogc3RyaW5nO1xuXHRhcHBlbmRUZXh0Pzogc3RyaW5nO1xufSk6IERvY3VtZW50RnJhZ21lbnQge1xuXHRjb25zdCBuZXdMaW5rID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9ic2lkaWFubWQvcHJlZmVyLWFjdGl2ZS1kb2MgLS0gQlJBVCBjb21wYXRpYmlsaXR5OiBhY3RpdmVEb2N1bWVudCBicmVha3MgdXRpbGl0eSByZW5kZXJpbmcgY2FsbCBzaXRlc1xuXHRjb25zdCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXHRsaW5rRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG5cdGxpbmtFbGVtZW50LmhyZWYgPSB1cmw7XG5cdGlmIChwcmVwZW5kVGV4dCkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYnNpZGlhbm1kL3ByZWZlci1hY3RpdmUtZG9jIC0tIEJSQVQgY29tcGF0aWJpbGl0eTogYWN0aXZlRG9jdW1lbnQgYnJlYWtzIHV0aWxpdHkgcmVuZGVyaW5nIGNhbGwgc2l0ZXNcblx0XHRjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByZXBlbmRUZXh0KTtcblx0XHRuZXdMaW5rLmFwcGVuZENoaWxkKHRleHROb2RlKTtcblx0fVxuXHRuZXdMaW5rLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcblx0aWYgKGFwcGVuZFRleHQpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JzaWRpYW5tZC9wcmVmZXItYWN0aXZlLWRvYyAtLSBCUkFUIGNvbXBhdGliaWxpdHk6IGFjdGl2ZURvY3VtZW50IGJyZWFrcyB1dGlsaXR5IHJlbmRlcmluZyBjYWxsIHNpdGVzXG5cdFx0Y29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhcHBlbmRUZXh0KTtcblx0XHRuZXdMaW5rLmFwcGVuZENoaWxkKHRleHROb2RlKTtcblx0fVxuXHRyZXR1cm4gbmV3TGluaztcbn1cbiIsICJpbXBvcnQgeyBnZXRMYW5ndWFnZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgZGUgfSBmcm9tIFwiLi9sb2NhbGVzL2RlXCI7XG5pbXBvcnQgeyBlbiwgdHlwZSBMb2NhbGVTdHJpbmdzIH0gZnJvbSBcIi4vbG9jYWxlcy9lblwiO1xuaW1wb3J0IHsgamEgfSBmcm9tIFwiLi9sb2NhbGVzL2phXCI7XG5pbXBvcnQgeyB6aENuIH0gZnJvbSBcIi4vbG9jYWxlcy96aC1jblwiO1xuXG5jb25zdCBsb2NhbGVzOiBSZWNvcmQ8c3RyaW5nLCBMb2NhbGVTdHJpbmdzPiA9IHtcblx0ZGUsXG5cdGVuLFxuXHRqYSxcblx0XCJ6aC1jblwiOiB6aENuLFxufTtcblxuY29uc3QgbG9jYWxlQWxpYXNlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcblx0XCJlbi1nYlwiOiBcImVuXCIsXG5cdFwiZW4tdXNcIjogXCJlblwiLFxuXHR6aDogXCJ6aC1jblwiLFxuXHRcInpoLWhhbnNcIjogXCJ6aC1jblwiLFxuXHRcInpoLXNnXCI6IFwiemgtY25cIixcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csIFwiLVwiKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUxvY2FsZShsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3Qgbm9ybWFsaXplZExhbmd1YWdlID0gbm9ybWFsaXplTGFuZ3VhZ2UobGFuZ3VhZ2UpO1xuXG5cdGlmIChsb2NhbGVzW25vcm1hbGl6ZWRMYW5ndWFnZV0pIHtcblx0XHRyZXR1cm4gbm9ybWFsaXplZExhbmd1YWdlO1xuXHR9XG5cblx0Y29uc3QgYWxpYXMgPSBsb2NhbGVBbGlhc2VzW25vcm1hbGl6ZWRMYW5ndWFnZV07XG5cdGlmIChhbGlhcykge1xuXHRcdHJldHVybiBhbGlhcztcblx0fVxuXG5cdGNvbnN0IGJhc2VMYW5ndWFnZSA9IG5vcm1hbGl6ZWRMYW5ndWFnZS5zcGxpdChcIi1cIilbMF07XG5cdHJldHVybiBsb2NhbGVzW2Jhc2VMYW5ndWFnZV0gPyBiYXNlTGFuZ3VhZ2UgOiBub3JtYWxpemVkTGFuZ3VhZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbnMobGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZSgpKTogTG9jYWxlU3RyaW5ncyB7XG5cdHJldHVybiBsb2NhbGVzW3Jlc29sdmVMb2NhbGUobGFuZ3VhZ2UpXSA/PyBlbjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IExvY2FsZVN0cmluZ3MgfSBmcm9tIFwiLi9lblwiO1xuXG5leHBvcnQgY29uc3QgZGUgPSB7XG5cdGNvbW1vbjoge1xuXHRcdGFuZDogXCIgdW5kIFwiLFxuXHRcdHByb21vdGlvbmFsOiB7XG5cdFx0XHRsZWFybk1vcmU6IFwiTWVociBcdTAwRkNiZXIgbWVpbmUgQXJiZWl0OlwiLFxuXHRcdH0sXG5cdH0sXG5cdHNldHRpbmdzOiB7XG5cdFx0Z2VuZXJhbDoge1xuXHRcdFx0YXV0b0VuYWJsZVBsdWdpbnNBZnRlckluc3RhbGxhdGlvbjoge1xuXHRcdFx0XHRuYW1lOiBcIkJldGEtUGx1Z2lucyBuYWNoIGRlciBJbnN0YWxsYXRpb24gYXV0b21hdGlzY2ggYWt0aXZpZXJlblwiLFxuXHRcdFx0XHRkZXNjOiBcIldlbm4gYWt0aXZpZXJ0LCB3ZXJkZW4gbmV1IGluc3RhbGxpZXJ0ZSBCZXRhLVBsdWdpbnMgc3RhbmRhcmRtXHUwMEU0XHUwMERGaWcgYXV0b21hdGlzY2ggYWt0aXZpZXJ0LiBEaWVzZSBPcHRpb24ga2FubiBpbSBGb3JtdWxhciB6dW0gSGluenVmXHUwMEZDZ2VuIGVpbmVzIFBsdWdpbnMgcHJvIFBsdWdpbiBhbmdlcGFzc3Qgd2VyZGVuLlwiLFxuXHRcdFx0fSxcblx0XHRcdGF1dG9VcGRhdGVQbHVnaW5zQXRTdGFydHVwOiB7XG5cdFx0XHRcdG5hbWU6IFwiQmV0YS1QbHVnaW5zIGJlaW0gU3RhcnQgYXV0b21hdGlzY2ggYWt0dWFsaXNpZXJlblwiLFxuXHRcdFx0XHRkZXNjOiBcIldlbm4gYWt0aXZpZXJ0LCBwclx1MDBGQ2Z0IEJSQVQgYmVpIGplZGVtIFN0YXJ0IHZvbiBPYnNpZGlhbiBhbGxlIEJldGEtUGx1Z2lucyBhdWYgVXBkYXRlcy4gUGx1Z2lucyBtaXQgZml4aWVydGVyIFZlcnNpb24gd2VyZGVuIG5pY2h0IGFrdHVhbGlzaWVydC5cIixcblx0XHRcdH0sXG5cdFx0XHRhdXRvVXBkYXRlVGhlbWVzQXRTdGFydHVwOiB7XG5cdFx0XHRcdG5hbWU6IFwiQmV0YS1UaGVtZXMgYmVpbSBTdGFydCBhdXRvbWF0aXNjaCBha3R1YWxpc2llcmVuXCIsXG5cdFx0XHRcdGRlc2M6IFwiV2VubiBha3RpdmllcnQsIHByXHUwMEZDZnQgQlJBVCBiZWkgamVkZW0gU3RhcnQgdm9uIE9ic2lkaWFuIGFsbGUgQmV0YS1UaGVtZXMgYXVmIFVwZGF0ZXMuXCIsXG5cdFx0XHR9LFxuXHRcdFx0c2VsZWN0TGF0ZXN0UGx1Z2luVmVyc2lvbkJ5RGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiBcIk5ldWVzdGUgUGx1Z2luLVZlcnNpb24gc3RhbmRhcmRtXHUwMEU0XHUwMERGaWcgYXVzd1x1MDBFNGhsZW5cIixcblx0XHRcdFx0ZGVzYzogXCJXZW5uIGFrdGl2aWVydCwgd2lyZCBiZWltIEhpbnp1Zlx1MDBGQ2dlbiBlaW5lcyBuZXVlbiBQbHVnaW5zIHN0YW5kYXJkbVx1MDBFNFx1MDBERmlnIGRpZSBuZXVlc3RlIFZlcnNpb24gYXVzZ2V3XHUwMEU0aGx0LlwiLFxuXHRcdFx0fSxcblx0XHRcdGFsbG93SW5jb21wYXRpYmxlUGx1Z2luczoge1xuXHRcdFx0XHRuYW1lOiBcIklua29tcGF0aWJsZSBQbHVnaW5zIGVybGF1YmVuXCIsXG5cdFx0XHRcdGRlc2M6IFwiV2VubiBha3RpdmllcnQsIGtcdTAwRjZubmVuIFBsdWdpbnMgaW5zdGFsbGllcnQgd2VyZGVuLCBkaWUgZWluZSBoXHUwMEY2aGVyZSBPYnNpZGlhbi1WZXJzaW9uIHZvcmF1c3NldHplbi4gQXVcdTAwREZlcmRlbSBrXHUwMEY2bm5lbiBEZXNrdG9wLW9ubHktUGx1Z2lucyBhdWYgTW9iaWxnZXJcdTAwRTR0ZW4gaW5zdGFsbGllcnQgd2VyZGVuLlwiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdG1vbml0b3Jpbmc6IHtcblx0XHRcdGhlYWRpbmc6IFwiXHUwMERDYmVyd2FjaHVuZ1wiLFxuXHRcdFx0ZW5hYmxlTm90aWZpY2F0aW9uczoge1xuXHRcdFx0XHRuYW1lOiBcIkJlbmFjaHJpY2h0aWd1bmdlbiBha3RpdmllcmVuXCIsXG5cdFx0XHRcdGRlc2M6IFwiV2VubiBha3RpdmllcnQsIHplaWd0IEJSQVQgUG9wdXAtQmVuYWNocmljaHRpZ3VuZ2VuIHp1IHZlcnNjaGllZGVuZW4gQWt0aXZpdFx1MDBFNHRlbiBhbi4gV2VubiBkZWFrdGl2aWVydCwgd2VyZGVuIGtlaW5lIEJlbmFjaHJpY2h0aWd1bmdlbiBhbmdlemVpZ3QuXCIsXG5cdFx0XHR9LFxuXHRcdFx0ZW5hYmxlTG9nZ2luZzoge1xuXHRcdFx0XHRuYW1lOiBcIlByb3Rva29sbGllcnVuZyBha3RpdmllcmVuXCIsXG5cdFx0XHRcdGRlc2M6IFwiUGx1Z2luLVVwZGF0ZXMgd2VyZGVuIGluIGVpbmUgUHJvdG9rb2xsZGF0ZWkgZ2VzY2hyaWViZW4uXCIsXG5cdFx0XHR9LFxuXHRcdFx0YnJhdExvZ0ZpbGVMb2NhdGlvbjoge1xuXHRcdFx0XHRuYW1lOiBcIlNwZWljaGVyb3J0IGRlciBCUkFULVByb3Rva29sbGRhdGVpXCIsXG5cdFx0XHRcdGRlc2M6IFwiUHJvdG9rb2xsZSB3ZXJkZW4gaW4gZGllc2VyIERhdGVpIGdlc3BlaWNoZXJ0LiBGXHUwMEZDZ2UgZGVtIERhdGVpbmFtZW4ga2VpbiAubWQgaGluenUuXCIsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBcIkJlaXNwaWVsOiBCUkFULWxvZ1wiLFxuXHRcdFx0fSxcblx0XHRcdGVuYWJsZVZlcmJvc2VMb2dnaW5nOiB7XG5cdFx0XHRcdG5hbWU6IFwiQXVzZlx1MDBGQ2hybGljaGUgUHJvdG9rb2xsaWVydW5nIGFrdGl2aWVyZW5cIixcblx0XHRcdFx0ZGVzYzogXCJTY2hyZWlidCBkZXV0bGljaCBtZWhyIEluZm9ybWF0aW9uZW4gaW4gZGFzIFByb3Rva29sbC5cIixcblx0XHRcdH0sXG5cdFx0XHRkZWJ1Z2dpbmdNb2RlOiB7XG5cdFx0XHRcdG5hbWU6IFwiRGVidWctTW9kdXNcIixcblx0XHRcdFx0ZGVzYzogXCJTZWhyIGF1c2ZcdTAwRkNocmxpY2hlIEtvbnNvbGVucHJvdG9rb2xsaWVydW5nLiBLYW5uIHp1ciBGZWhsZXJiZWhlYnVuZyB1bmQgRW50d2lja2x1bmcgdmVyd2VuZGV0IHdlcmRlbi5cIixcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRnaXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuOiB7XG5cdFx0XHRoZWFkaW5nOiBcIkdpdEh1YiBQZXJzb25hbCBBY2Nlc3MgVG9rZW5cIixcblx0XHRcdHBlcnNvbmFsQWNjZXNzVG9rZW46IHtcblx0XHRcdFx0bmFtZTogXCJQZXJzXHUwMEY2bmxpY2hlcyBadWdyaWZmc3Rva2VuXCIsXG5cdFx0XHRcdGRlc2M6IHtcblx0XHRcdFx0XHRwcmVwZW5kVGV4dDpcblx0XHRcdFx0XHRcdFwiTGVnZSBlaW4gcGVyc1x1MDBGNm5saWNoZXMgWnVncmlmZnN0b2tlbiBmZXN0LCB1bSBkaWUgUmF0ZSBMaW1pdHMgZlx1MDBGQ3IgXHUwMEY2ZmZlbnRsaWNoZSBHaXRIdWItUmVwb3NpdG9yeXMgenUgZXJoXHUwMEY2aGVuLiBEdSBrYW5uc3QgZXMgaW4gXCIsXG5cdFx0XHRcdFx0bGlua1RleHQ6IFwiZGVpbmVuIEdpdEh1Yi1Lb250b2VpbnN0ZWxsdW5nZW5cIixcblx0XHRcdFx0XHRhcHBlbmRUZXh0OiBcIiBlcnN0ZWxsZW4gdW5kIGFuc2NobGllXHUwMERGZW5kIGhpZXIgaGluenVmXHUwMEZDZ2VuLiBXZWl0ZXJlIEluZm9ybWF0aW9uZW4gZmluZGVzdCBkdSBpbiBkZXIgRG9rdW1lbnRhdGlvbi5cIixcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRjbGVhclBlcnNvbmFsQWNjZXNzVG9rZW46IFwiUGVyc1x1MDBGNm5saWNoZXMgWnVncmlmZnN0b2tlbiBsXHUwMEY2c2NoZW5cIixcblx0XHRcdHZhbGlkYXRlOiBcIlZhbGlkaWVyZW5cIixcblx0XHR9LFxuXHRcdGJldGFQbHVnaW5MaXN0OiB7XG5cdFx0XHRoZWFkaW5nOiBcIkJldGEtUGx1Z2luLUxpc3RlXCIsXG5cdFx0XHRmaWx0ZXJQbGFjZWhvbGRlcjogXCJQbHVnaW5zIGZpbHRlcm5cIixcblx0XHRcdGRlc2NyaXB0aW9uOiB7XG5cdFx0XHRcdGludHJvOlxuXHRcdFx0XHRcdCdEaWVzIGlzdCBkaWUgTGlzdGUgZGVyIEJldGEtUGx1Z2lucywgZGllIFx1MDBGQ2JlciBkZW4gQmVmZWhsIFwiYWRkIGEgYmV0YSBwbHVnaW4gZm9yIHRlc3RpbmdcIiBoaW56dWdlZlx1MDBGQ2d0IHd1cmRlbi4gRHUga2FubnN0IGRpZSBuZXVlc3RlIFZlcnNpb24gdmVyd2VuZGVuIG9kZXIgZWluZSBWZXJzaW9uIGZpeGllcmVuLiBFaW5lIGZpeGllcnRlIFZlcnNpb24gaXN0IGVpbiBiZXN0aW1tdGVzIFBsdWdpbi1SZWxlYXNlIGFuaGFuZCBzZWluZXMgUmVsZWFzZS1UYWdzLicsXG5cdFx0XHRcdGVkaXRBbmRSZW1vdmU6XG5cdFx0XHRcdFx0J0tsaWNrZSBhdWYgZGllIFNjaGFsdGZsXHUwMEU0Y2hlIFwiQmVhcmJlaXRlblwiIG5lYmVuIGVpbmVtIFBsdWdpbiwgdW0gZGllIGluc3RhbGxpZXJ0ZSBWZXJzaW9uIHp1IFx1MDBFNG5kZXJuLiBLbGlja2UgYXVmIGRpZSBTY2hhbHRmbFx1MDBFNGNoZSBcIlhcIiBuZWJlbiBlaW5lbSBQbHVnaW4sIHVtIGVzIGF1cyBkZXIgTGlzdGUgenUgZW50ZmVybmVuLicsXG5cdFx0XHRcdG5vdGVMYWJlbDogXCJIaW53ZWlzOiBcIixcblx0XHRcdFx0bm90ZVRleHQ6XG5cdFx0XHRcdFx0XCJEYXMgRW50ZmVybmVuIGF1cyBkZXIgTGlzdGUgbFx1MDBGNnNjaHQgZGFzIFBsdWdpbiBuaWNodC4gRGFzIHNvbGx0ZSBcdTAwRkNiZXIgZGVuIEJlcmVpY2ggQ29tbXVuaXR5LVBsdWdpbnMgaW4gZGVuIEVpbnN0ZWxsdW5nZW4gZXJmb2xnZW4uXCIsXG5cdFx0XHR9LFxuXHRcdFx0YWRkQmV0YVBsdWdpbjogXCJCZXRhLVBsdWdpbiBoaW56dWZcdTAwRkNnZW5cIixcblx0XHRcdHRyYWNrZWRWZXJzaW9uOiAodmVyc2lvbjogc3RyaW5nLCBmcm96ZW46IGJvb2xlYW4pOiBzdHJpbmcgPT5cblx0XHRcdFx0YCBWZXJmb2xndGUgVmVyc2lvbjogJHt2ZXJzaW9uID09PSBcImxhdGVzdFwiID8gXCJuZXVlc3RlIFZlcnNpb25cIiA6IHZlcnNpb259ICR7ZnJvemVuID8gXCIoZml4aWVydClcIiA6IFwiXCJ9YCxcblx0XHRcdGluY29tcGF0aWJsZTogXCIgKGlua29tcGF0aWJlbClcIixcblx0XHRcdHNlY3JldE1pc3Npbmc6IChzZWNyZXROYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCBTZWNyZXQgbmljaHQgZGVmaW5pZXJ0IG9kZXIgbGVlcjogJHtzZWNyZXROYW1lfWAsXG5cdFx0XHRzZWNyZXRNaXNzaW5nVGl0bGU6XG5cdFx0XHRcdFwiRWluIFRva2VuLU5hbWUgaXN0IGtvbmZpZ3VyaWVydCwgYWJlciBkYXMgU2VjcmV0IGZlaGx0LiBGXHUwMEZDZ2UgZGFzIFNlY3JldCBoaW56dSBvZGVyIGFrdHVhbGlzaWVyZSBkaWUgUGx1Z2luLUtvbmZpZ3VyYXRpb24uXCIsXG5cdFx0XHRzZWNyZXRNaXNzaW5nVG9vbHRpcDogKHNlY3JldE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxuXHRcdFx0XHRgU2VjcmV0IGZlaGx0OiAke3NlY3JldE5hbWV9LiBCaXR0ZSBmXHUwMEZDZ2UgZGFzIFNlY3JldCBoaW56dSBvZGVyIGFrdHVhbGlzaWVyZSBkaWUgUGx1Z2luLUtvbmZpZ3VyYXRpb24uYCxcblx0XHRcdGNoZWNrQW5kVXBkYXRlUGx1Z2luOiBcIlBsdWdpbiBwclx1MDBGQ2ZlbiB1bmQgYWt0dWFsaXNpZXJlblwiLFxuXHRcdFx0Y2hhbmdlVmVyc2lvbkFuZFVwZGF0ZVNldHRpbmdzOiBcIlZlcnNpb24gXHUwMEU0bmRlcm4gdW5kIEVpbnN0ZWxsdW5nZW4gYWt0dWFsaXNpZXJlblwiLFxuXHRcdFx0cmVtb3ZlVGhpc0JldGFQbHVnaW46IFwiRGllc2VzIEJldGEtUGx1Z2luIGVudGZlcm5lblwiLFxuXHRcdFx0Y29uZmlybVJlbW92YWw6IFwiWnVtIEJlc3RcdTAwRTR0aWdlbiBlcm5ldXQga2xpY2tlblwiLFxuXHRcdFx0Y29weVBsdWdpbklkZW50aWZpZXI6IFwiUGx1Z2luLUtlbm51bmcga29waWVyZW5cIixcblx0XHR9LFxuXHRcdGJldGFUaGVtZUxpc3Q6IHtcblx0XHRcdGhlYWRpbmc6IFwiQmV0YS1UaGVtZS1MaXN0ZVwiLFxuXHRcdFx0YWRkQmV0YVRoZW1lOiBcIkJldGEtVGhlbWUgaGluenVmXHUwMEZDZ2VuXCIsXG5cdFx0XHRmaWx0ZXJQbGFjZWhvbGRlcjogXCJUaGVtZXMgZmlsdGVyblwiLFxuXHRcdFx0ZGVsZXRlVGhpc0JldGFUaGVtZTogXCJEaWVzZXMgQmV0YS1UaGVtZSBsXHUwMEY2c2NoZW5cIixcblx0XHRcdGNvbmZpcm1SZW1vdmFsOiBcIlp1bSBCZXN0XHUwMEU0dGlnZW4gZXJuZXV0IGtsaWNrZW5cIixcblx0XHRcdGNvcHlUaGVtZUlkZW50aWZpZXI6IFwiVGhlbWUtS2VubnVuZyBrb3BpZXJlblwiLFxuXHRcdH0sXG5cdFx0Y29weUlkZW50aWZpZXI6IHtcblx0XHRcdGNvcGllZDogKGlkZW50aWZpZXI6IHN0cmluZyk6IHN0cmluZyA9PiBgS29waWVydDogJHtpZGVudGlmaWVyfWAsXG5cdFx0XHRmYWlsZWQ6IFwiS2VubnVuZyBrb25udGUgbmljaHQga29waWVydCB3ZXJkZW4uIEJpdHRlIHByXHUwMEZDZmUgZGllIENsaXBib2FyZC1CZXJlY2h0aWd1bmdlbi5cIixcblx0XHR9LFxuXHR9LFxuXHRhZGRCZXRhUGx1Z2luTW9kYWw6IHtcblx0XHRidXR0b25zOiB7XG5cdFx0XHRhZGRQbHVnaW46IFwiUGx1Z2luIGhpbnp1Zlx1MDBGQ2dlblwiLFxuXHRcdFx0Y2hhbmdlVmVyc2lvbjogXCJWZXJzaW9uIFx1MDBFNG5kZXJuXCIsXG5cdFx0XHRpbnN0YWxsaW5nOiBcIldpcmQgaW5zdGFsbGllcnQgXHUyMDI2XCIsXG5cdFx0XHRuZXZlck1pbmQ6IFwiQWJicmVjaGVuXCIsXG5cdFx0XHR2YWxpZDogXCJHXHUwMEZDbHRpZ1wiLFxuXHRcdFx0aW52YWxpZDogXCJVbmdcdTAwRkNsdGlnXCIsXG5cdFx0fSxcblx0XHRoZWFkaW5nOiB7XG5cdFx0XHRjaGFuZ2VQbHVnaW5WZXJzaW9uOiBcIlBsdWdpbi1WZXJzaW9uIFx1MDBFNG5kZXJuOiBcIixcblx0XHRcdGdpdGh1YlJlcG9zaXRvcnlGb3JCZXRhUGx1Z2luOiBcIkdpdEh1Yi1SZXBvc2l0b3J5IGZcdTAwRkNyIGRhcyBCZXRhLVBsdWdpbjpcIixcblx0XHR9LFxuXHRcdHJlcG9zaXRvcnk6IHtcblx0XHRcdGxhYmVsOiBcIlJlcG9zaXRvcnlcIixcblx0XHRcdHBsYWNlaG9sZGVyOiBcIlJlcG9zaXRvcnkgKEJlaXNwaWVsOiBodHRwczovL0dpdEh1Yi5jb20vZ2l0aHVidXNlcm5hbWUvcmVwb3NpdG9yeS1uYW1lKVwiLFxuXHRcdFx0ZW50ZXJBZGRyZXNzVG9WYWxpZGF0ZTogXCJHaWIgZWluZSBHaXRIdWItUmVwb3NpdG9yeS1BZHJlc3NlIGVpbiwgdW0gc2llIHp1IHZhbGlkaWVyZW4uXCIsXG5cdFx0XHRhZGRyZXNzUmVxdWlyZWQ6IFwiUmVwb3NpdG9yeS1BZHJlc3NlIGlzdCBlcmZvcmRlcmxpY2guXCIsXG5cdFx0XHR2YWxpZGF0aW5nOiBcIlJlcG9zaXRvcnktQWRyZXNzZSB3aXJkIHZhbGlkaWVydC4uLlwiLFxuXHRcdFx0bm9SZWxlYXNlc0ZvdW5kOiBcIkZlaGxlcjogSW4gZGllc2VtIFJlcG9zaXRvcnkgd3VyZGVuIGtlaW5lIFJlbGVhc2VzIGdlZnVuZGVuLlwiLFxuXHRcdFx0bm90Rm91bmQ6IFwiUmVwb3NpdG9yeSBuaWNodCBnZWZ1bmRlbi4gUHJcdTAwRkNmZSBkaWUgQWRyZXNzZSBvZGVyIGdpYiBlaW4gZ1x1MDBGQ2x0aWdlcyBUb2tlbiBmXHUwMEZDciBkZW4gWnVncmlmZiBhdWYgZWluIHByaXZhdGVzIFJlcG9zaXRvcnkgYW4uXCIsXG5cdFx0XHRhY2Nlc3NEZW5pZWQ6IFwiWnVncmlmZiB2ZXJ3ZWlnZXJ0LiBQclx1MDBGQ2ZlIGRlaW4gcGVyc1x1MDBGNm5saWNoZXMgWnVncmlmZnN0b2tlbi5cIixcblx0XHRcdGVycm9yOiAobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nID0+IGBGZWhsZXI6ICR7bWVzc2FnZX1gLFxuXHRcdFx0cmF0ZUxpbWl0RXhjZWVkZWQ6IChtaW51dGVzOiBudW1iZXIpOiBzdHJpbmcgPT4gYEdpdEh1YiBBUEkgUmF0ZSBMaW1pdCBcdTAwRkNiZXJzY2hyaXR0ZW4uIFZlcnN1Y2hlIGVzIGluICR7bWludXRlc30gTWludXRlbiBlcm5ldXQuYCxcblx0XHRcdHJhdGVMaW1pdFRvYXN0OiAobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nID0+XG5cdFx0XHRcdGAke21lc3NhZ2V9IER1IGthbm5zdCBpbiBkZW4gQlJBVC1FaW5zdGVsbHVuZ2VuIGVpbiBwZXJzXHUwMEY2bmxpY2hlcyBadWdyaWZmc3Rva2VuIGhpbnp1Zlx1MDBGQ2dlbiwgdW0gaFx1MDBGNmhlcmUgTGltaXRzIHp1IGVyaGFsdGVuLiBTaWVoZSBEb2t1bWVudGF0aW9uIGZcdTAwRkNyIERldGFpbHMuYCxcblx0XHRcdGdpdEh1YlJlc3BvbnNlVG9hc3Q6IChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7bWVzc2FnZX0gYCxcblx0XHR9LFxuXHRcdHZlcnNpb246IHtcblx0XHRcdHNlbGVjdFZlcnNpb246IFwiVmVyc2lvbiBhdXN3XHUwMEU0aGxlblwiLFxuXHRcdFx0c2VsZWN0VmVyc2lvbkVsbGlwc2lzOiBcIlZlcnNpb24gYXVzd1x1MDBFNGhsZW4uLi5cIixcblx0XHRcdGxhdGVzdFZlcnNpb246IFwiTmV1ZXN0ZSBWZXJzaW9uXCIsXG5cdFx0XHRwcmVyZWxlYXNlU3VmZml4OiBcIihWb3JhYnZlcnNpb24pXCIsXG5cdFx0fSxcblx0XHR0b2tlbjoge1xuXHRcdFx0bmFtZTogXCJHaXRIdWItVG9rZW5cIixcblx0XHRcdGRlc2M6IFwiV1x1MDBFNGhsZSBlaW4gU2VjcmV0IGFscyBUb2tlbiBmXHUwMEZDciBkaWVzZXMgUmVwb3NpdG9yeSBhdXMgKG9wdGlvbmFsKVwiLFxuXHRcdFx0c2V0dGluZ0NsZWFyZWQ6IChyZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT4gYFRva2VuLUVpbnN0ZWxsdW5nIGZcdTAwRkNyICR7cmVwb3NpdG9yeX0gZ2VsXHUwMEY2c2NodGAsXG5cdFx0XHRzZXR0aW5nVXBkYXRlZDogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgVG9rZW4tRWluc3RlbGx1bmcgZlx1MDBGQ3IgJHtyZXBvc2l0b3J5fSBha3R1YWxpc2llcnRgLFxuXHRcdH0sXG5cdFx0ZW5hYmxlQWZ0ZXJJbnN0YWxsOiBcIlBsdWdpbiBuYWNoIGRlciBJbnN0YWxsYXRpb24gYWt0aXZpZXJlblwiLFxuXHRcdGFscmVhZHlJbkxpc3Q6IFwiRGllc2VzIFBsdWdpbiBpc3QgYmVyZWl0cyBpbiBkZXIgQmV0YS1UZXN0bGlzdGVcIixcblx0fSxcblx0YWRkQmV0YVRoZW1lTW9kYWw6IHtcblx0XHRoZWFkaW5nOiB7XG5cdFx0XHRnaXRodWJSZXBvc2l0b3J5Rm9yQmV0YVRoZW1lOiBcIkdpdEh1Yi1SZXBvc2l0b3J5IGZcdTAwRkNyIGRhcyBCZXRhLVRoZW1lOlwiLFxuXHRcdH0sXG5cdFx0YWxyZWFkeUluTGlzdDogXCJEaWVzZXMgVGhlbWUgaXN0IGJlcmVpdHMgaW4gZGVyIEJldGEtVGVzdGxpc3RlXCIsXG5cdH0sXG5cdHRoZW1lTWVzc2FnZXM6IHtcblx0XHRub1RoZW1lQ3NzRmlsZTpcblx0XHRcdFwiSW0gU3RhbW12ZXJ6ZWljaG5pcyBkaWVzZXMgUmVwb3NpdG9yeXMgZ2lidCBlcyBrZWluZSBEYXRlaSB0aGVtZS5jc3Mgb2RlciB0aGVtZS1iZXRhLmNzcywgZGFoZXIga2FubiBrZWluIFRoZW1lIGluc3RhbGxpZXJ0IHdlcmRlbi5cIixcblx0XHRub01hbmlmZXN0RmlsZTpcblx0XHRcdFwiSW0gU3RhbW12ZXJ6ZWljaG5pcyBkaWVzZXMgUmVwb3NpdG9yeXMgZ2lidCBlcyBrZWluZSBEYXRlaSBtYW5pZmVzdC5qc29uLCBkYWhlciBrYW5uIGRhcyBUaGVtZSBuaWNodCBpbnN0YWxsaWVydCB3ZXJkZW4uXCIsXG5cdFx0aW5zdGFsbGVkOiAodGhlbWVOYW1lOiBzdHJpbmcsIHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgVGhlbWUgJHt0aGVtZU5hbWV9IHd1cmRlIGF1cyAke3JlcG9zaXRvcnl9IGluc3RhbGxpZXJ0LiBgLFxuXHRcdHVwZGF0ZWQ6ICh0aGVtZU5hbWU6IHN0cmluZywgcmVwb3NpdG9yeTogc3RyaW5nKTogc3RyaW5nID0+IGBUaGVtZSAke3RoZW1lTmFtZX0gd3VyZGUgYXVzICR7cmVwb3NpdG9yeX0gYWt0dWFsaXNpZXJ0LmAsXG5cdFx0cmVtb3ZlZDogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PlxuXHRcdFx0YCR7cmVwb3NpdG9yeX0gd3VyZGUgYXVzIGRlciBCUkFULVRoZW1lLUxpc3RlIGVudGZlcm50IHVuZCB3aXJkIG5pY2h0IG1laHIgYWt0dWFsaXNpZXJ0LiBEaWUgVGhlbWUtRGF0ZWllbiBzaW5kIGplZG9jaCB3ZWl0ZXJoaW4gaW0gVmF1bHQgdm9yaGFuZGVuLiBVbSBzaWUgenUgZW50ZmVybmVuLCBcdTAwRjZmZm5lIEVpbnN0ZWxsdW5nZW4gPiBFcnNjaGVpbnVuZ3NiaWxkIHVuZCBlbnRmZXJuZSBkYXMgVGhlbWUgZG9ydC5gLFxuXHR9LFxuXHR2ZXJzaW9uU3VnZ2VzdE1vZGFsOiB7XG5cdFx0dGl0bGU6IFwiVmVyc2lvbiBhdXN3XHUwMEU0aGxlblwiLFxuXHRcdHBsYWNlaG9sZGVyOiAocmVwb3NpdG9yeTogc3RyaW5nKTogc3RyaW5nID0+IGBWZXJzaW9uIGZcdTAwRkNyICR7cmVwb3NpdG9yeX0gc3VjaGVuYCxcblx0XHR2ZXJzaW9uTGFiZWw6ICh2ZXJzaW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4gKHZlcnNpb24gPT09IFwibGF0ZXN0XCIgPyBcIk5ldWVzdGUgVmVyc2lvblwiIDogdmVyc2lvbiksXG5cdFx0aW5zdHJ1Y3Rpb25zOiB7XG5cdFx0XHRuYXZpZ2F0ZVZlcnNpb25zOiBcIlZlcnNpb25lbiBkdXJjaHN1Y2hlblwiLFxuXHRcdFx0c2VsZWN0VmVyc2lvbjogXCJWZXJzaW9uIGF1c3dcdTAwRTRobGVuXCIsXG5cdFx0XHRkaXNtaXNzTW9kYWw6IFwiRGlhbG9nIHNjaGxpZVx1MDBERmVuXCIsXG5cdFx0fSxcblx0XHRwcmVyZWxlYXNlU3VmZml4OiBcIihWb3JhYnZlcnNpb24pXCIsXG5cdH0sXG59IHNhdGlzZmllcyBMb2NhbGVTdHJpbmdzO1xuIiwgImV4cG9ydCBjb25zdCBlbiA9IHtcblx0Y29tbW9uOiB7XG5cdFx0YW5kOiBcIiBhbmQgXCIsXG5cdFx0cHJvbW90aW9uYWw6IHtcblx0XHRcdGxlYXJuTW9yZTogXCJMZWFybiBtb3JlIGFib3V0IG15IHdvcmsgYXQ6XCIsXG5cdFx0fSxcblx0fSxcblx0c2V0dGluZ3M6IHtcblx0XHRnZW5lcmFsOiB7XG5cdFx0XHRhdXRvRW5hYmxlUGx1Z2luc0FmdGVySW5zdGFsbGF0aW9uOiB7XG5cdFx0XHRcdG5hbWU6IFwiQXV0by1lbmFibGUgcGx1Z2lucyBhZnRlciBpbnN0YWxsYXRpb25cIixcblx0XHRcdFx0ZGVzYzogJ0lmIGVuYWJsZWQgYmV0YSBwbHVnaW5zIHdpbGwgYmUgYXV0b21hdGljYWxseSBlbmFibGVkIGFmdGVyIGluc3RhbGx0aW9uIGJ5IGRlZmF1bHQuIE5vdGU6IHlvdSBjYW4gdG9nZ2xlIHRoaXMgb24gYW5kIG9mZiBmb3IgZWFjaCBwbHVnaW4gaW4gdGhlIFwiYWRkIHBsdWdpblwiIGZvcm0uJyxcblx0XHRcdH0sXG5cdFx0XHRhdXRvVXBkYXRlUGx1Z2luc0F0U3RhcnR1cDoge1xuXHRcdFx0XHRuYW1lOiBcIkF1dG8tdXBkYXRlIHBsdWdpbnMgYXQgc3RhcnR1cFwiLFxuXHRcdFx0XHRkZXNjOiBcIklmIGVuYWJsZWQgYWxsIGJldGEgcGx1Z2lucyB3aWxsIGJlIGNoZWNrZWQgZm9yIHVwZGF0ZXMgZWFjaCB0aW1lIE9ic2lkaWFuIHN0YXJ0cy4gTm90ZTogdGhpcyBkb2VzIG5vdCB1cGRhdGUgZnJvemVuIHZlcnNpb24gcGx1Z2lucy5cIixcblx0XHRcdH0sXG5cdFx0XHRhdXRvVXBkYXRlVGhlbWVzQXRTdGFydHVwOiB7XG5cdFx0XHRcdG5hbWU6IFwiQXV0by11cGRhdGUgdGhlbWVzIGF0IHN0YXJ0dXBcIixcblx0XHRcdFx0ZGVzYzogXCJJZiBlbmFibGVkIGFsbCBiZXRhIHRoZW1lcyB3aWxsIGJlIGNoZWNrZWQgZm9yIHVwZGF0ZXMgZWFjaCB0aW1lIE9ic2lkaWFuIHN0YXJ0cy5cIixcblx0XHRcdH0sXG5cdFx0XHRzZWxlY3RMYXRlc3RQbHVnaW5WZXJzaW9uQnlEZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IFwiU2VsZWN0IGxhdGVzdCBwbHVnaW4gdmVyc2lvbiBieSBkZWZhdWx0XCIsXG5cdFx0XHRcdGRlc2M6IFwiSWYgZW5hYmxlZCB0aGUgbGF0ZXN0IHZlcnNpb24gd2lsbCBiZSBzZWxlY3RlZCBieSBkZWZhdWx0IHdoZW4gYWRkaW5nIGEgbmV3IHBsdWdpbi5cIixcblx0XHRcdH0sXG5cdFx0XHRhbGxvd0luY29tcGF0aWJsZVBsdWdpbnM6IHtcblx0XHRcdFx0bmFtZTogXCJBbGxvdyBpbmNvbXBhdGlibGUgcGx1Z2luc1wiLFxuXHRcdFx0XHRkZXNjOiBcIklmIGVuYWJsZWQsIHBsdWdpbnMgd2l0aCBoaWdoZXIgYXBwIHZlcnNpb25zIHdpbGwgYmUgYWxsb3dlZCB0byBiZSBpbnN0YWxsZWQuIEFsc28gaXQgYWxsb3dzIGRlc2t0b3Atb25seSBwbHVnaW5zIHRvIGJlIGluc3RhbGxlZCBvbiBtb2JpbGUgZGV2aWNlcy5cIixcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRtb25pdG9yaW5nOiB7XG5cdFx0XHRoZWFkaW5nOiBcIk1vbml0b3JpbmdcIixcblx0XHRcdGVuYWJsZU5vdGlmaWNhdGlvbnM6IHtcblx0XHRcdFx0bmFtZTogXCJFbmFibGUgbm90aWZpY2F0aW9uc1wiLFxuXHRcdFx0XHRkZXNjOiBcIkJSQVQgd2lsbCBwcm92aWRlIHBvcHVwIG5vdGlmaWNhdGlvbnMgZm9yIGl0cyB2YXJpb3VzIGFjdGl2aXRpZXMuIFR1cm4gdGhpcyBvZmYgbWVhbnMgbm8gbm90aWZpY2F0aW9ucy5cIixcblx0XHRcdH0sXG5cdFx0XHRlbmFibGVMb2dnaW5nOiB7XG5cdFx0XHRcdG5hbWU6IFwiRW5hYmxlIGxvZ2dpbmdcIixcblx0XHRcdFx0ZGVzYzogXCJQbHVnaW4gdXBkYXRlcyB3aWxsIGJlIGxvZ2dlZCB0byBhIGZpbGUgaW4gdGhlIGxvZyBmaWxlLlwiLFxuXHRcdFx0fSxcblx0XHRcdGJyYXRMb2dGaWxlTG9jYXRpb246IHtcblx0XHRcdFx0bmFtZTogXCJCUkFUIGxvZyBmaWxlIGxvY2F0aW9uXCIsXG5cdFx0XHRcdGRlc2M6IFwiTG9ncyB3aWxsIGJlIHNhdmVkIHRvIHRoaXMgZmlsZS4gRG9uJ3QgYWRkIC5tZCB0byB0aGUgZmlsZSBuYW1lLlwiLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJFeGFtcGxlOiBCUkFULWxvZ1wiLFxuXHRcdFx0fSxcblx0XHRcdGVuYWJsZVZlcmJvc2VMb2dnaW5nOiB7XG5cdFx0XHRcdG5hbWU6IFwiRW5hYmxlIHZlcmJvc2UgbG9nZ2luZ1wiLFxuXHRcdFx0XHRkZXNjOiBcIkdldCBhIGxvdCAgbW9yZSBpbmZvcm1hdGlvbiBpbiAgdGhlIGxvZy5cIixcblx0XHRcdH0sXG5cdFx0XHRkZWJ1Z2dpbmdNb2RlOiB7XG5cdFx0XHRcdG5hbWU6IFwiRGVidWdnaW5nIG1vZGVcIixcblx0XHRcdFx0ZGVzYzogXCJBdG9taWMgYm9tYiBsZXZlbCBjb25zb2xlIGxvZ2dpbmcuIENhbiBiZSB1c2VkIGZvciB0cm91Ymxlc2hvb3RpbmcgYW5kIGRldmVsb3BtZW50LlwiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW46IHtcblx0XHRcdGhlYWRpbmc6IFwiR2l0SHViIFBlcnNvbmFsIEFjY2VzcyBUb2tlblwiLFxuXHRcdFx0cGVyc29uYWxBY2Nlc3NUb2tlbjoge1xuXHRcdFx0XHRuYW1lOiBcIlBlcnNvbmFsIGFjY2VzcyB0b2tlblwiLFxuXHRcdFx0XHRkZXNjOiB7XG5cdFx0XHRcdFx0cHJlcGVuZFRleHQ6IFwiU2V0IGEgcGVyc29uYWwgYWNjZXNzIHRva2VuIHRvIGluY3JlYXNlIHJhdGUgbGltaXRzIGZvciBwdWJsaWMgcmVwb3NpdG9yaWVzIG9uIEdpdEh1Yi4gWW91IGNhbiBjcmVhdGUgb25lIGluIFwiLFxuXHRcdFx0XHRcdGxpbmtUZXh0OiBcInlvdXIgR2l0SHViIGFjY291bnQgc2V0dGluZ3NcIixcblx0XHRcdFx0XHRhcHBlbmRUZXh0OiBcIiBhbmQgdGhlbiBhZGQgaXQgaGVyZS4gUGxlYXNlIGNvbnN1bHQgdGhlIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscy5cIixcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRjbGVhclBlcnNvbmFsQWNjZXNzVG9rZW46IFwiQ2xlYXIgcGVyc29uYWwgYWNjZXNzIHRva2VuXCIsXG5cdFx0XHR2YWxpZGF0ZTogXCJWYWxpZGF0ZVwiLFxuXHRcdH0sXG5cdFx0YmV0YVBsdWdpbkxpc3Q6IHtcblx0XHRcdGhlYWRpbmc6IFwiQmV0YSBwbHVnaW4gbGlzdFwiLFxuXHRcdFx0ZmlsdGVyUGxhY2Vob2xkZXI6IFwiRmlsdGVyIHBsdWdpbnNcIixcblx0XHRcdGRlc2NyaXB0aW9uOiB7XG5cdFx0XHRcdGludHJvOlxuXHRcdFx0XHRcdCdUaGUgZm9sbG93aW5nIGlzIGEgbGlzdCBvZiBiZXRhIHBsdWdpbnMgYWRkZWQgdmlhIHRoZSBjb21tYW5kIFwiYWRkIGEgYmV0YSBwbHVnaW4gZm9yIHRlc3RpbmdcIi4gWW91IGNhbiBjaG9zZSB0byBhZGQgdGhlIGxhdGVzdCB2ZXJzaW9uIG9yIGEgZnJvemVuIHZlcnNpb24uIEEgZnJvemVuIHZlcnNpb24gaXMgYSBzcGVjaWZpYyByZWxlYXNlIG9mIGEgcGx1Z2luIGJhc2VkIG9uIGl0cyByZWxlYXNlIHRhZy4nLFxuXHRcdFx0XHRlZGl0QW5kUmVtb3ZlOlxuXHRcdFx0XHRcdCdDbGljayB0aGUgXCJlZGl0XCIgYnV0dG9uIG5leHQgdG8gYSBwbHVnaW4gdG8gY2hhbmdlIHRoZSBpbnN0YWxsZWQgdmVyc2lvbi4gQ2xpY2sgdGhlIFwiWFwiIGJ1dHRvbiBuZXh0IHRvIGEgcGx1Z2luIHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBsaXN0LicsXG5cdFx0XHRcdG5vdGVMYWJlbDogXCJOb3RlOiBcIixcblx0XHRcdFx0bm90ZVRleHQ6IFwiUmVtb3ZpbmcgZnJvbSB0aGUgbGlzdCBkb2VzIG5vdCBkZWxldGUgdGhlIHBsdWdpbiwgdGhpcyBzaG91bGQgYmUgZG9uZSBmcm9tIHRoZSBDb21tdW5pdHkgUGx1Z2lucyB0YWIgaW4gU2V0dGluZ3MuXCIsXG5cdFx0XHR9LFxuXHRcdFx0YWRkQmV0YVBsdWdpbjogXCJBZGQgYmV0YSBwbHVnaW5cIixcblx0XHRcdHRyYWNrZWRWZXJzaW9uOiAodmVyc2lvbjogc3RyaW5nLCBmcm96ZW46IGJvb2xlYW4pOiBzdHJpbmcgPT4gYCBUcmFja2VkIHZlcnNpb246ICR7dmVyc2lvbn0gJHtmcm96ZW4gPyBcIihmcm96ZW4pXCIgOiBcIlwifWAsXG5cdFx0XHRpbmNvbXBhdGlibGU6IFwiIChpbmNvbXBhdGlibGUpXCIsXG5cdFx0XHRzZWNyZXRNaXNzaW5nOiAoc2VjcmV0TmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAgU2VjcmV0IG5vdCBkZWZpbmVkIG9yIGVtcHR5OiAke3NlY3JldE5hbWV9YCxcblx0XHRcdHNlY3JldE1pc3NpbmdUaXRsZTogXCJUb2tlbiBuYW1lIGNvbmZpZ3VyZWQgYnV0IHNlY3JldCBpcyBtaXNzaW5nLiBBZGQgdGhlIHNlY3JldCBvciB1cGRhdGUgdGhlIHBsdWdpbiBjb25maWd1cmF0aW9uLlwiLFxuXHRcdFx0c2VjcmV0TWlzc2luZ1Rvb2x0aXA6IChzZWNyZXROYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cblx0XHRcdFx0YFNlY3JldCBtaXNzaW5nOiAke3NlY3JldE5hbWV9LiBQbGVhc2UgYWRkIHRoZSBzZWNyZXQgb3IgdXBkYXRlIHRoZSBwbHVnaW4gY29uZmlndXJhdGlvbi5gLFxuXHRcdFx0Y2hlY2tBbmRVcGRhdGVQbHVnaW46IFwiQ2hlY2sgYW5kIHVwZGF0ZSBwbHVnaW5cIixcblx0XHRcdGNoYW5nZVZlcnNpb25BbmRVcGRhdGVTZXR0aW5nczogXCJDaGFuZ2UgdmVyc2lvbiBhbmQgdXBkYXRlIHNldHRpbmdzXCIsXG5cdFx0XHRyZW1vdmVUaGlzQmV0YVBsdWdpbjogXCJSZW1vdmUgdGhpcyBiZXRhIHBsdWdpblwiLFxuXHRcdFx0Y29uZmlybVJlbW92YWw6IFwiQ2xpY2sgb25jZSBtb3JlIHRvIGNvbmZpcm0gcmVtb3ZhbFwiLFxuXHRcdFx0Y29weVBsdWdpbklkZW50aWZpZXI6IFwiQ29weSBwbHVnaW4gaWRlbnRpZmllclwiLFxuXHRcdH0sXG5cdFx0YmV0YVRoZW1lTGlzdDoge1xuXHRcdFx0aGVhZGluZzogXCJCZXRhIHRoZW1lcyBsaXN0XCIsXG5cdFx0XHRhZGRCZXRhVGhlbWU6IFwiQWRkIGJldGEgdGhlbWVcIixcblx0XHRcdGZpbHRlclBsYWNlaG9sZGVyOiBcIkZpbHRlciB0aGVtZXNcIixcblx0XHRcdGRlbGV0ZVRoaXNCZXRhVGhlbWU6IFwiRGVsZXRlIHRoaXMgYmV0YSB0aGVtZVwiLFxuXHRcdFx0Y29uZmlybVJlbW92YWw6IFwiQ2xpY2sgb25jZSBtb3JlIHRvIGNvbmZpcm0gcmVtb3ZhbFwiLFxuXHRcdFx0Y29weVRoZW1lSWRlbnRpZmllcjogXCJDb3B5IHRoZW1lIGlkZW50aWZpZXJcIixcblx0XHR9LFxuXHRcdGNvcHlJZGVudGlmaWVyOiB7XG5cdFx0XHRjb3BpZWQ6IChpZGVudGlmaWVyOiBzdHJpbmcpOiBzdHJpbmcgPT4gYENvcGllZDogJHtpZGVudGlmaWVyfWAsXG5cdFx0XHRmYWlsZWQ6IFwiRmFpbGVkIHRvIGNvcHkgaWRlbnRpZmllci4gQ2hlY2sgY2xpcGJvYXJkIHBlcm1pc3Npb25zLlwiLFxuXHRcdH0sXG5cdH0sXG5cdGFkZEJldGFQbHVnaW5Nb2RhbDoge1xuXHRcdGJ1dHRvbnM6IHtcblx0XHRcdGFkZFBsdWdpbjogXCJBZGQgcGx1Z2luXCIsXG5cdFx0XHRjaGFuZ2VWZXJzaW9uOiBcIkNoYW5nZSB2ZXJzaW9uXCIsXG5cdFx0XHRpbnN0YWxsaW5nOiBcIkluc3RhbGxpbmcgXHUyMDI2XCIsXG5cdFx0XHRuZXZlck1pbmQ6IFwiTmV2ZXIgbWluZFwiLFxuXHRcdFx0dmFsaWQ6IFwiVmFsaWRcIixcblx0XHRcdGludmFsaWQ6IFwiSW52YWxpZFwiLFxuXHRcdH0sXG5cdFx0aGVhZGluZzoge1xuXHRcdFx0Y2hhbmdlUGx1Z2luVmVyc2lvbjogXCJDaGFuZ2UgcGx1Z2luIHZlcnNpb246IFwiLFxuXHRcdFx0Z2l0aHViUmVwb3NpdG9yeUZvckJldGFQbHVnaW46IFwiR2l0SHViIHJlcG9zaXRvcnkgZm9yIGJldGEgcGx1Z2luOlwiLFxuXHRcdH0sXG5cdFx0cmVwb3NpdG9yeToge1xuXHRcdFx0bGFiZWw6IFwiUmVwb3NpdG9yeVwiLFxuXHRcdFx0cGxhY2Vob2xkZXI6IFwiUmVwb3NpdG9yeSAoZXhhbXBsZTogaHR0cHM6Ly9HaXRIdWIuY29tL2dpdGh1YnVzZXJuYW1lL3JlcG9zaXRvcnktbmFtZSlcIixcblx0XHRcdGVudGVyQWRkcmVzc1RvVmFsaWRhdGU6IFwiRW50ZXIgYSBHaXRIdWIgcmVwb3NpdG9yeSBhZGRyZXNzIHRvIHZhbGlkYXRlIGl0LlwiLFxuXHRcdFx0YWRkcmVzc1JlcXVpcmVkOiBcIlJlcG9zaXRvcnkgYWRkcmVzcyBpcyByZXF1aXJlZC5cIixcblx0XHRcdHZhbGlkYXRpbmc6IFwiVmFsaWRhdGluZyByZXBvc2l0b3J5IGFkZHJlc3MuLi5cIixcblx0XHRcdG5vUmVsZWFzZXNGb3VuZDogXCJFcnJvcjogTm8gcmVsZWFzZXMgZm91bmQgaW4gdGhpcyByZXBvc2l0b3J5LlwiLFxuXHRcdFx0bm90Rm91bmQ6IFwiUmVwb3NpdG9yeSBub3QgZm91bmQuIENoZWNrIHRoZSBhZGRyZXNzIG9yIHByb3ZpZGUgYSB2YWxpZCB0b2tlbiBmb3IgYWNjZXNzIHRvIGEgcHJpdmF0ZSByZXBvc2l0b3J5LlwiLFxuXHRcdFx0YWNjZXNzRGVuaWVkOiBcIkFjY2VzcyBkZW5pZWQuIENoZWNrIHlvdXIgcGVyc29uYWwgYWNjZXNzIHRva2VuLlwiLFxuXHRcdFx0ZXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYEVycm9yOiAke21lc3NhZ2V9YCxcblx0XHRcdHJhdGVMaW1pdEV4Y2VlZGVkOiAobWludXRlczogbnVtYmVyKTogc3RyaW5nID0+IGBHaXRIdWIgQVBJIHJhdGUgbGltaXQgZXhjZWVkZWQuIFRyeSBhZ2FpbiBpbiAke21pbnV0ZXN9IG1pbnV0ZXMuYCxcblx0XHRcdHJhdGVMaW1pdFRvYXN0OiAobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nID0+XG5cdFx0XHRcdGAke21lc3NhZ2V9IENvbnNpZGVyIGFkZGluZyBhIHBlcnNvbmFsIGFjY2VzcyB0b2tlbiBpbiBCUkFUIHNldHRpbmdzIGZvciBoaWdoZXIgbGltaXRzLiBTZWUgZG9jdW1lbnRhdGlvbiBmb3IgZGV0YWlscy5gLFxuXHRcdFx0Z2l0SHViUmVzcG9uc2VUb2FzdDogKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgJHttZXNzYWdlfSBgLFxuXHRcdH0sXG5cdFx0dmVyc2lvbjoge1xuXHRcdFx0c2VsZWN0VmVyc2lvbjogXCJTZWxlY3QgYSB2ZXJzaW9uXCIsXG5cdFx0XHRzZWxlY3RWZXJzaW9uRWxsaXBzaXM6IFwiU2VsZWN0IGEgdmVyc2lvbi4uLlwiLFxuXHRcdFx0bGF0ZXN0VmVyc2lvbjogXCJMYXRlc3QgdmVyc2lvblwiLFxuXHRcdFx0cHJlcmVsZWFzZVN1ZmZpeDogXCIoUHJlcmVsZWFzZSlcIixcblx0XHR9LFxuXHRcdHRva2VuOiB7XG5cdFx0XHRuYW1lOiBcIkdpdEh1YiB0b2tlblwiLFxuXHRcdFx0ZGVzYzogXCJTZWxlY3QgYSBzZWNyZXQgYXMgdG9rZW4gZm9yIHRoaXMgcmVwb3NpdG9yeSAob3B0aW9uYWwpXCIsXG5cdFx0XHRzZXR0aW5nQ2xlYXJlZDogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgVG9rZW4gc2V0dGluZyBjbGVhcmVkIGZvciAke3JlcG9zaXRvcnl9YCxcblx0XHRcdHNldHRpbmdVcGRhdGVkOiAocmVwb3NpdG9yeTogc3RyaW5nKTogc3RyaW5nID0+IGBUb2tlbiBzZXR0aW5nIHVwZGF0ZWQgZm9yICR7cmVwb3NpdG9yeX1gLFxuXHRcdH0sXG5cdFx0ZW5hYmxlQWZ0ZXJJbnN0YWxsOiBcIkVuYWJsZSBhZnRlciBpbnN0YWxsaW5nIHRoZSBwbHVnaW5cIixcblx0XHRhbHJlYWR5SW5MaXN0OiBcIlRoaXMgcGx1Z2luIGlzIGFscmVhZHkgaW4gdGhlIGxpc3QgZm9yIGJldGEgdGVzdGluZ1wiLFxuXHR9LFxuXHRhZGRCZXRhVGhlbWVNb2RhbDoge1xuXHRcdGhlYWRpbmc6IHtcblx0XHRcdGdpdGh1YlJlcG9zaXRvcnlGb3JCZXRhVGhlbWU6IFwiR2l0SHViIHJlcG9zaXRvcnkgZm9yIGJldGEgdGhlbWU6XCIsXG5cdFx0fSxcblx0XHRhbHJlYWR5SW5MaXN0OiBcIlRoaXMgdGhlbWUgaXMgYWxyZWFkeSBpbiB0aGUgbGlzdCBmb3IgYmV0YSB0ZXN0aW5nXCIsXG5cdH0sXG5cdHRoZW1lTWVzc2FnZXM6IHtcblx0XHRub1RoZW1lQ3NzRmlsZTogXCJUaGVyZSBpcyBubyB0aGVtZS5jc3Mgb3IgdGhlbWUtYmV0YS5jc3MgZmlsZSBpbiB0aGUgcm9vdCBwYXRoIG9mIHRoaXMgcmVwb3NpdG9yeSwgc28gdGhlcmUgaXMgbm8gdGhlbWUgdG8gaW5zdGFsbC5cIixcblx0XHRub01hbmlmZXN0RmlsZTogXCJUaGVyZSBpcyBubyBtYW5pZmVzdC5qc29uIGZpbGUgaW4gdGhlIHJvb3QgcGF0aCBvZiB0aGlzIHJlcG9zaXRvcnksIHNvIHRoZW1lIGNhbm5vdCBiZSBpbnN0YWxsZWQuXCIsXG5cdFx0aW5zdGFsbGVkOiAodGhlbWVOYW1lOiBzdHJpbmcsIHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgJHt0aGVtZU5hbWV9IHRoZW1lIGluc3RhbGxlZCBmcm9tICR7cmVwb3NpdG9yeX0uIGAsXG5cdFx0dXBkYXRlZDogKHRoZW1lTmFtZTogc3RyaW5nLCByZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7dGhlbWVOYW1lfSB0aGVtZSB1cGRhdGVkIGZyb20gJHtyZXBvc2l0b3J5fS5gLFxuXHRcdHJlbW92ZWQ6IChyZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT5cblx0XHRcdGBSZW1vdmVkICR7cmVwb3NpdG9yeX0gZnJvbSBCUkFUIHRoZW1lcyBsaXN0IGFuZCB3aWxsIG5vIGxvbmdlciBiZSB1cGRhdGVkLiBIb3dldmVyLCB0aGUgdGhlbWUgZmlsZXMgc3RpbGwgZXhpc3QgaW4gdGhlIHZhdWx0LiBUbyByZW1vdmUgdGhlbSwgZ28gaW50byBTZXR0aW5ncyA+IEFwcGVhcmFuY2UgYW5kIHJlbW92ZSB0aGUgdGhlbWUuYCxcblx0fSxcblx0dmVyc2lvblN1Z2dlc3RNb2RhbDoge1xuXHRcdHRpdGxlOiBcIlNlbGVjdCBhIHZlcnNpb25cIixcblx0XHRwbGFjZWhvbGRlcjogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgVHlwZSB0byBzZWFyY2ggZm9yIGEgdmVyc2lvbiBmb3IgJHtyZXBvc2l0b3J5fWAsXG5cdFx0dmVyc2lvbkxhYmVsOiAodmVyc2lvbjogc3RyaW5nKTogc3RyaW5nID0+IHZlcnNpb24sXG5cdFx0aW5zdHJ1Y3Rpb25zOiB7XG5cdFx0XHRuYXZpZ2F0ZVZlcnNpb25zOiBcIk5hdmlnYXRlIHZlcnNpb25zXCIsXG5cdFx0XHRzZWxlY3RWZXJzaW9uOiBcIlNlbGVjdCB2ZXJzaW9uXCIsXG5cdFx0XHRkaXNtaXNzTW9kYWw6IFwiRGlzbWlzcyBtb2RhbFwiLFxuXHRcdH0sXG5cdFx0cHJlcmVsZWFzZVN1ZmZpeDogXCIoUHJlcmVsZWFzZSlcIixcblx0fSxcbn07XG5cbmV4cG9ydCB0eXBlIExvY2FsZVN0cmluZ3MgPSB0eXBlb2YgZW47XG4iLCAiaW1wb3J0IHR5cGUgeyBMb2NhbGVTdHJpbmdzIH0gZnJvbSBcIi4vZW5cIjtcblxuZXhwb3J0IGNvbnN0IGphID0ge1xuXHRjb21tb246IHtcblx0XHRhbmQ6IFwiIFx1MzA2OCBcIixcblx0XHRwcm9tb3Rpb25hbDoge1xuXHRcdFx0bGVhcm5Nb3JlOiBcIlx1NEY1Q1x1ODAwNVx1MzA2RVx1NEVENlx1MzA2RVx1NEY1Q1x1NTRDMVx1MzA5Mlx1ODk4Qlx1MzA4Qlx1RkYxQVwiLFxuXHRcdH0sXG5cdH0sXG5cdHNldHRpbmdzOiB7XG5cdFx0Z2VuZXJhbDoge1xuXHRcdFx0YXV0b0VuYWJsZVBsdWdpbnNBZnRlckluc3RhbGxhdGlvbjoge1xuXHRcdFx0XHRuYW1lOiBcIlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1NUY4Q1x1MzA2QiBCZXRhIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1ODFFQVx1NTJENVx1MzA2N1x1NjcwOVx1NTJCOVx1NTMxNlwiLFxuXHRcdFx0XHRkZXNjOiBcIlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1NjVCMFx1MzA1N1x1MzA0Rlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1MzA1N1x1MzA1RiBCZXRhIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2Rlx1NjVFMlx1NUI5QVx1MzA2N1x1ODFFQVx1NTJENVx1NzY4NFx1MzA2Qlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA2QVx1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMlx1NTAwQlx1NTIyNVx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2Qlx1MzA2NFx1MzA0NFx1MzA2Nlx1MzA2Rlx1MzAwQ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1OEZGRFx1NTJBMFx1MzAwRFx1MzBENVx1MzBBOVx1MzBGQ1x1MzBFMFx1MzA2N1x1NTIwN1x1MzA4QVx1NjZGRlx1MzA0OFx1MzA4OVx1MzA4Q1x1MzA3RVx1MzA1OVx1MzAwMlwiLFxuXHRcdFx0fSxcblx0XHRcdGF1dG9VcGRhdGVQbHVnaW5zQXRTdGFydHVwOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU4RDc3XHU1MkQ1XHU2NjQyXHUzMDZCIEJldGEgXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU4MUVBXHU1MkQ1XHU2NkY0XHU2NUIwXCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU2NzA5XHU1MkI5XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDY4XHUzMDAxT2JzaWRpYW4gXHUzMDZFXHU4RDc3XHU1MkQ1XHU2NjQyXHUzMDZCXHUzMDU5XHUzMDc5XHUzMDY2XHUzMDZFIEJldGEgXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDZFXHU2NkY0XHU2NUIwXHUzMDkyXHU3OEJBXHU4QThEXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyXHU1NkZBXHU1QjlBXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXHUzMDZFXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDZGXHU2NkY0XHU2NUIwXHUzMDU1XHUzMDhDXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0YXV0b1VwZGF0ZVRoZW1lc0F0U3RhcnR1cDoge1xuXHRcdFx0XHRuYW1lOiBcIlx1OEQ3N1x1NTJENVx1NjY0Mlx1MzA2QiBCZXRhIFx1MzBDNlx1MzBGQ1x1MzBERVx1MzA5Mlx1ODFFQVx1NTJENVx1NjZGNFx1NjVCMFwiLFxuXHRcdFx0XHRkZXNjOiBcIlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMU9ic2lkaWFuIFx1MzA2RVx1OEQ3N1x1NTJENVx1NjY0Mlx1MzA2Qlx1MzA1OVx1MzA3OVx1MzA2Nlx1MzA2RSBCZXRhIFx1MzBDNlx1MzBGQ1x1MzBERVx1MzA2RVx1NjZGNFx1NjVCMFx1MzA5Mlx1NzhCQVx1OEE4RFx1MzA1N1x1MzA3RVx1MzA1OVx1MzAwMlwiLFxuXHRcdFx0fSxcblx0XHRcdHNlbGVjdExhdGVzdFBsdWdpblZlcnNpb25CeURlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogXCJcdTY1RTJcdTVCOUFcdTMwNjdcdTY3MDBcdTY1QjBcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwRDBcdTMwRkNcdTMwQjhcdTMwRTdcdTMwRjNcdTMwOTJcdTkwNzhcdTYyOUVcIixcblx0XHRcdFx0ZGVzYzogXCJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFcdTY1QjBcdTMwNTdcdTMwNDRcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdThGRkRcdTUyQTBcdTMwNTlcdTMwOEJcdTMwNjhcdTMwNERcdTMwNkJcdTY3MDBcdTY1QjBcdTMwRDBcdTMwRkNcdTMwQjhcdTMwRTdcdTMwRjNcdTMwNENcdTY1RTJcdTVCOUFcdTMwNjdcdTkwNzhcdTYyOUVcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTlcdTMwMDJcIixcblx0XHRcdH0sXG5cdFx0XHRhbGxvd0luY29tcGF0aWJsZVBsdWdpbnM6IHtcblx0XHRcdFx0bmFtZTogXCJcdTRFOTJcdTYzREJcdTYwMjdcdTMwNkVcdTMwNkFcdTMwNDRcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdThBMzFcdTUzRUZcIixcblx0XHRcdFx0ZGVzYzogXCJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFcdTMwODhcdTMwOEFcdTY1QjBcdTMwNTdcdTMwNDQgT2JzaWRpYW4gXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXHUzMDkyXHU1RkM1XHU4OTgxXHUzMDY4XHUzMDU5XHUzMDhCXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXHUzMDdFXHUzMDVGXHUzMDAxXHUzMEM3XHUzMEI5XHUzMEFGXHUzMEM4XHUzMEMzXHUzMEQ3XHU1QzAyXHU3NTI4XHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHUzMEUyXHUzMEQwXHUzMEE0XHUzMEVCXHU3QUVGXHU2NzJCXHUzMDZCXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXHUzMDU5XHUzMDhCXHUzMDUzXHUzMDY4XHUzMDgyXHU4QTMxXHU1M0VGXHUzMDU1XHUzMDhDXHUzMDdFXHUzMDU5XHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0bW9uaXRvcmluZzoge1xuXHRcdFx0aGVhZGluZzogXCJcdTc2RTNcdTg5OTZcIixcblx0XHRcdGVuYWJsZU5vdGlmaWNhdGlvbnM6IHtcblx0XHRcdFx0bmFtZTogXCJcdTkwMUFcdTc3RTVcdTMwOTJcdTY3MDlcdTUyQjlcdTUzMTZcIixcblx0XHRcdFx0ZGVzYzogXCJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFCUkFUIFx1MzA2Rlx1NTQwNFx1N0EyRVx1MzBBMlx1MzBBRlx1MzBDNlx1MzBBM1x1MzBEM1x1MzBDNlx1MzBBM1x1MzA2Qlx1MzA2NFx1MzA0NFx1MzA2Nlx1MzBERFx1MzBDM1x1MzBEN1x1MzBBMlx1MzBDM1x1MzBEN1x1OTAxQVx1NzdFNVx1MzA5Mlx1ODg2OFx1NzkzQVx1MzA1N1x1MzA3RVx1MzA1OVx1MzAwMlx1MzBBQVx1MzBENVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1OTAxQVx1NzdFNVx1MzA2Rlx1ODg2OFx1NzkzQVx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1Qlx1MzA5M1x1MzAwMlwiLFxuXHRcdFx0fSxcblx0XHRcdGVuYWJsZUxvZ2dpbmc6IHtcblx0XHRcdFx0bmFtZTogXCJcdTMwRURcdTMwQjBcdTMwOTJcdTY3MDlcdTUyQjlcdTUzMTZcIixcblx0XHRcdFx0ZGVzYzogXCJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTY2RjRcdTY1QjBcdTMwNkZcdTMwRURcdTMwQjBcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkJcdThBMThcdTkzMzJcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTlcdTMwMDJcIixcblx0XHRcdH0sXG5cdFx0XHRicmF0TG9nRmlsZUxvY2F0aW9uOiB7XG5cdFx0XHRcdG5hbWU6IFwiQlJBVCBcdTMwRURcdTMwQjBcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkVcdTU4MzRcdTYyNDBcIixcblx0XHRcdFx0ZGVzYzogXCJcdTMwRURcdTMwQjBcdTMwNkZcdTMwNTNcdTMwNkVcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkJcdTRGRERcdTVCNThcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTlcdTMwMDJcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTU0MERcdTMwNkIgLm1kIFx1MzA2Rlx1OEZGRFx1NTJBMFx1MzA1N1x1MzA2QVx1MzA0NFx1MzA2N1x1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMlwiLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJcdTRGOEJcdUZGMUFCUkFULWxvZ1wiLFxuXHRcdFx0fSxcblx0XHRcdGVuYWJsZVZlcmJvc2VMb2dnaW5nOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU4QTczXHU3RDMwXHUzMEVEXHUzMEIwXHUzMDkyXHU2NzA5XHU1MkI5XHU1MzE2XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHUzMEVEXHUzMEIwXHUzMDZCXHUzMDg4XHUzMDhBXHU1OTFBXHUzMDRGXHUzMDZFXHU2MEM1XHU1ODMxXHUzMDkyXHU4QTE4XHU5MzMyXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0ZGVidWdnaW5nTW9kZToge1xuXHRcdFx0XHRuYW1lOiBcIlx1MzBDN1x1MzBEMFx1MzBDM1x1MzBCMFx1MzBFMlx1MzBGQ1x1MzBDOVwiLFxuXHRcdFx0XHRkZXNjOiBcIlx1OTc1RVx1NUUzOFx1MzA2Qlx1OEE3M1x1N0QzMFx1MzA2QVx1MzBCM1x1MzBGM1x1MzBCRFx1MzBGQ1x1MzBFQlx1MzBFRFx1MzBCMFx1MzA5Mlx1NTFGQVx1NTI5Qlx1MzA1N1x1MzA3RVx1MzA1OVx1MzAwMlx1MzBDOFx1MzBFOVx1MzBENlx1MzBFQlx1MzBCN1x1MzBFNVx1MzBGQ1x1MzBDNlx1MzBBM1x1MzBGM1x1MzBCMFx1MzA4NFx1OTU4Qlx1NzY3QVx1MzA2Qlx1NEY3Rlx1NzUyOFx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzAwMlwiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW46IHtcblx0XHRcdGhlYWRpbmc6IFwiR2l0SHViIFx1NTAwQlx1NEVCQVx1MzBBMlx1MzBBRlx1MzBCQlx1MzBCOVx1MzBDOFx1MzBGQ1x1MzBBRlx1MzBGM1wiLFxuXHRcdFx0cGVyc29uYWxBY2Nlc3NUb2tlbjoge1xuXHRcdFx0XHRuYW1lOiBcIlx1NTAwQlx1NEVCQVx1MzBBMlx1MzBBRlx1MzBCQlx1MzBCOVx1MzBDOFx1MzBGQ1x1MzBBRlx1MzBGM1wiLFxuXHRcdFx0XHRkZXNjOiB7XG5cdFx0XHRcdFx0cHJlcGVuZFRleHQ6IFwiXHU1MDBCXHU0RUJBXHUzMEEyXHUzMEFGXHUzMEJCXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHUzMDkyXHU4QTJEXHU1QjlBXHUzMDU5XHUzMDhCXHUzMDY4XHUzMDAxR2l0SHViIFx1MzA2RVx1NTE2Q1x1OTU4Qlx1MzBFQVx1MzBERFx1MzBCOFx1MzBDOFx1MzBFQVx1MzA2Qlx1NUJGRVx1MzA1OVx1MzA4Qlx1MzBFQ1x1MzBGQ1x1MzBDOFx1NTIzNlx1OTY1MFx1MzA5Mlx1N0RFOVx1NTQ4Q1x1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzAwMlx1MzBDOFx1MzBGQ1x1MzBBRlx1MzBGM1x1MzA2RiBcIixcblx0XHRcdFx0XHRsaW5rVGV4dDogXCJHaXRIdWIgXHUzMEEyXHUzMEFCXHUzMEE2XHUzMEYzXHUzMEM4XHU4QTJEXHU1QjlBXCIsXG5cdFx0XHRcdFx0YXBwZW5kVGV4dDogXCIgXHUzMDY3XHU0RjVDXHU2MjEwXHUzMDU3XHUzMDAxXHUzMDUzXHUzMDUzXHUzMDZCXHU4RkZEXHU1MkEwXHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXHU4QTczXHUzMDU3XHUzMDRGXHUzMDZGXHUzMEM5XHUzMEFEXHUzMEU1XHUzMEUxXHUzMEYzXHUzMEM4XHUzMDkyXHU1M0MyXHU3MTY3XHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0Y2xlYXJQZXJzb25hbEFjY2Vzc1Rva2VuOiBcIlx1NTAwQlx1NEVCQVx1MzBBMlx1MzBBRlx1MzBCQlx1MzBCOVx1MzBDOFx1MzBGQ1x1MzBBRlx1MzBGM1x1MzA5Mlx1MzBBRlx1MzBFQVx1MzBBMlwiLFxuXHRcdFx0dmFsaWRhdGU6IFwiXHU2OTFDXHU4QTNDXCIsXG5cdFx0fSxcblx0XHRiZXRhUGx1Z2luTGlzdDoge1xuXHRcdFx0aGVhZGluZzogXCJCZXRhIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1NEUwMFx1ODlBN1wiLFxuXHRcdFx0ZmlsdGVyUGxhY2Vob2xkZXI6IFwiXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU3RDVFXHUzMDhBXHU4RkJDXHUzMDdGXCIsXG5cdFx0XHRkZXNjcmlwdGlvbjoge1xuXHRcdFx0XHRpbnRybzpcblx0XHRcdFx0XHQnXHU0RUU1XHU0RTBCXHUzMDZGXHUzMDAxXCJhZGQgYSBiZXRhIHBsdWdpbiBmb3IgdGVzdGluZ1wiIFx1MzBCM1x1MzBERVx1MzBGM1x1MzBDOVx1MzA2N1x1OEZGRFx1NTJBMFx1MzA1NVx1MzA4Q1x1MzA1RiBCZXRhIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1NEUwMFx1ODlBN1x1MzA2N1x1MzA1OVx1MzAwMlx1NjcwMFx1NjVCMFx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1MzA5Mlx1NEY3Rlx1MzA0Nlx1MzA1M1x1MzA2OFx1MzA4Mlx1MzAwMVx1NzI3OVx1NUI5QVx1MzA2RVx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1MzA2Qlx1NTZGQVx1NUI5QVx1MzA1OVx1MzA4Qlx1MzA1M1x1MzA2OFx1MzA4Mlx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzAwMlx1NTZGQVx1NUI5QVx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1MzA2OFx1MzA2Rlx1MzAwMVx1MzBFQVx1MzBFQVx1MzBGQ1x1MzBCOVx1MzBCRlx1MzBCMFx1MzA2Qlx1NTdGQVx1MzA2NVx1MzA0Rlx1NzI3OVx1NUI5QVx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzBFQVx1MzBFQVx1MzBGQ1x1MzBCOVx1MzA2N1x1MzA1OVx1MzAwMicsXG5cdFx0XHRcdGVkaXRBbmRSZW1vdmU6XG5cdFx0XHRcdFx0XCJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTZBMkFcdTMwNkVcdTMwMENcdTdERThcdTk2QzZcdTMwMERcdTMwRENcdTMwQkZcdTMwRjNcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwQUZcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUJcdTMwNTlcdTMwOEJcdTMwRDBcdTMwRkNcdTMwQjhcdTMwRTdcdTMwRjNcdTMwOTJcdTU5MDlcdTY2RjRcdTMwNjdcdTMwNERcdTMwN0VcdTMwNTlcdTMwMDJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTZBMkFcdTMwNkVcdTMwMENYXHUzMDBEXHUzMERDXHUzMEJGXHUzMEYzXHUzMDkyXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEFGXHUzMDU5XHUzMDhCXHUzMDY4XHUzMDAxXHU0RTAwXHU4OUE3XHUzMDRCXHUzMDg5XHU1MjRBXHU5NjY0XHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXCIsXG5cdFx0XHRcdG5vdGVMYWJlbDogXCJcdTZDRThcdTYxMEZcdUZGMUFcIixcblx0XHRcdFx0bm90ZVRleHQ6IFwiXHU0RTAwXHU4OUE3XHUzMDRCXHUzMDg5XHU1MjRBXHU5NjY0XHUzMDU3XHUzMDY2XHUzMDgyXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHU2NzJDXHU0RjUzXHUzMDZGXHU1MjRBXHU5NjY0XHUzMDU1XHUzMDhDXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXHU1MjRBXHU5NjY0XHUzMDU5XHUzMDhCXHUzMDZCXHUzMDZGXHUzMDAxXHU4QTJEXHU1QjlBXHUzMDZFXHUzMEIzXHUzMERGXHUzMEU1XHUzMENCXHUzMEM2XHUzMEEzXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMEJGXHUzMEQ2XHUzMDRCXHUzMDg5XHU2NENEXHU0RjVDXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0YWRkQmV0YVBsdWdpbjogXCJCZXRhIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1OEZGRFx1NTJBMFwiLFxuXHRcdFx0dHJhY2tlZFZlcnNpb246ICh2ZXJzaW9uOiBzdHJpbmcsIGZyb3plbjogYm9vbGVhbik6IHN0cmluZyA9PlxuXHRcdFx0XHRgIFx1OEZGRFx1OERFMVx1NEUyRFx1MzA2RVx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1RkYxQSR7dmVyc2lvbiA9PT0gXCJsYXRlc3RcIiA/IFwiXHU2NzAwXHU2NUIwXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXCIgOiB2ZXJzaW9ufSR7ZnJvemVuID8gXCJcdUZGMDhcdTU2RkFcdTVCOUFcdUZGMDlcIiA6IFwiXCJ9YCxcblx0XHRcdGluY29tcGF0aWJsZTogXCJcdUZGMDhcdTRFOTJcdTYzREJcdTYwMjdcdTMwNkFcdTMwNTdcdUZGMDlcIixcblx0XHRcdHNlY3JldE1pc3Npbmc6IChzZWNyZXROYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCBcdTMwQjdcdTMwRkNcdTMwQUZcdTMwRUNcdTMwQzNcdTMwQzhcdTMwNENcdTY3MkFcdTVCOUFcdTdGQTlcdTMwN0VcdTMwNUZcdTMwNkZcdTdBN0FcdTMwNjdcdTMwNTlcdUZGMUEke3NlY3JldE5hbWV9YCxcblx0XHRcdHNlY3JldE1pc3NpbmdUaXRsZTpcblx0XHRcdFx0XCJcdTMwQzhcdTMwRkNcdTMwQUZcdTMwRjNcdTU0MERcdTMwNkZcdThBMkRcdTVCOUFcdTMwNTVcdTMwOENcdTMwNjZcdTMwNDRcdTMwN0VcdTMwNTlcdTMwNENcdTMwMDFcdTMwQjdcdTMwRkNcdTMwQUZcdTMwRUNcdTMwQzNcdTMwQzhcdTMwNENcdTg5OEJcdTMwNjRcdTMwNEJcdTMwODlcdTMwNkFcdTMwNDRcdTMwNEJcdTdBN0FcdTMwNjdcdTMwNTlcdTMwMDJcdTMwQjdcdTMwRkNcdTMwQUZcdTMwRUNcdTMwQzNcdTMwQzhcdTMwOTJcdThGRkRcdTUyQTBcdTMwNTlcdTMwOEJcdTMwNEJcdTMwMDFcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdThBMkRcdTVCOUFcdTMwOTJcdTY2RjRcdTY1QjBcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHRcdHNlY3JldE1pc3NpbmdUb29sdGlwOiAoc2VjcmV0TmFtZTogc3RyaW5nKTogc3RyaW5nID0+XG5cdFx0XHRcdGBcdTMwQjdcdTMwRkNcdTMwQUZcdTMwRUNcdTMwQzNcdTMwQzhcdTMwNENcdTg5OEJcdTMwNjRcdTMwNEJcdTMwOEFcdTMwN0VcdTMwNUJcdTMwOTNcdUZGMUEke3NlY3JldE5hbWV9XHUzMDAyXHUzMEI3XHUzMEZDXHUzMEFGXHUzMEVDXHUzMEMzXHUzMEM4XHUzMDkyXHU4RkZEXHU1MkEwXHUzMDU5XHUzMDhCXHUzMDRCXHUzMDAxXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHU4QTJEXHU1QjlBXHUzMDkyXHU2NkY0XHU2NUIwXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyYCxcblx0XHRcdGNoZWNrQW5kVXBkYXRlUGx1Z2luOiBcIlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1NzhCQVx1OEE4RFx1MzA1N1x1MzA2Nlx1NjZGNFx1NjVCMFwiLFxuXHRcdFx0Y2hhbmdlVmVyc2lvbkFuZFVwZGF0ZVNldHRpbmdzOiBcIlx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1MzA5Mlx1NTkwOVx1NjZGNFx1MzA1N1x1MzA2Nlx1OEEyRFx1NUI5QVx1MzA5Mlx1NjZGNFx1NjVCMFwiLFxuXHRcdFx0cmVtb3ZlVGhpc0JldGFQbHVnaW46IFwiXHUzMDUzXHUzMDZFIEJldGEgXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU1MjRBXHU5NjY0XCIsXG5cdFx0XHRjb25maXJtUmVtb3ZhbDogXCJcdTMwODJcdTMwNDZcdTRFMDBcdTVFQTZcdTMwQUZcdTMwRUFcdTMwQzNcdTMwQUZcdTMwNTdcdTMwNjZcdTUyNEFcdTk2NjRcdTMwOTJcdTc4QkFcdThBOERcIixcblx0XHRcdGNvcHlQbHVnaW5JZGVudGlmaWVyOiBcIlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1OEI1OFx1NTIyNVx1NUI1MFx1MzA5Mlx1MzBCM1x1MzBENFx1MzBGQ1wiLFxuXHRcdH0sXG5cdFx0YmV0YVRoZW1lTGlzdDoge1xuXHRcdFx0aGVhZGluZzogXCJCZXRhIFx1MzBDNlx1MzBGQ1x1MzBERVx1NEUwMFx1ODlBN1wiLFxuXHRcdFx0YWRkQmV0YVRoZW1lOiBcIkJldGEgXHUzMEM2XHUzMEZDXHUzMERFXHUzMDkyXHU4RkZEXHU1MkEwXCIsXG5cdFx0XHRmaWx0ZXJQbGFjZWhvbGRlcjogXCJcdTMwQzZcdTMwRkNcdTMwREVcdTMwOTJcdTdENUVcdTMwOEFcdThGQkNcdTMwN0ZcIixcblx0XHRcdGRlbGV0ZVRoaXNCZXRhVGhlbWU6IFwiXHUzMDUzXHUzMDZFIEJldGEgXHUzMEM2XHUzMEZDXHUzMERFXHUzMDkyXHU1MjRBXHU5NjY0XCIsXG5cdFx0XHRjb25maXJtUmVtb3ZhbDogXCJcdTMwODJcdTMwNDZcdTRFMDBcdTVFQTZcdTMwQUZcdTMwRUFcdTMwQzNcdTMwQUZcdTMwNTdcdTMwNjZcdTUyNEFcdTk2NjRcdTMwOTJcdTc4QkFcdThBOERcIixcblx0XHRcdGNvcHlUaGVtZUlkZW50aWZpZXI6IFwiXHUzMEM2XHUzMEZDXHUzMERFXHU4QjU4XHU1MjI1XHU1QjUwXHUzMDkyXHUzMEIzXHUzMEQ0XHUzMEZDXCIsXG5cdFx0fSxcblx0XHRjb3B5SWRlbnRpZmllcjoge1xuXHRcdFx0Y29waWVkOiAoaWRlbnRpZmllcjogc3RyaW5nKTogc3RyaW5nID0+IGBcdTMwQjNcdTMwRDRcdTMwRkNcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdUZGMUEke2lkZW50aWZpZXJ9YCxcblx0XHRcdGZhaWxlZDogXCJcdThCNThcdTUyMjVcdTVCNTBcdTMwNkVcdTMwQjNcdTMwRDRcdTMwRkNcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwRENcdTMwRkNcdTMwQzlcdTMwNkVcdTZBMjlcdTk2NTBcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHR9LFxuXHR9LFxuXHRhZGRCZXRhUGx1Z2luTW9kYWw6IHtcblx0XHRidXR0b25zOiB7XG5cdFx0XHRhZGRQbHVnaW46IFwiXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU4RkZEXHU1MkEwXCIsXG5cdFx0XHRjaGFuZ2VWZXJzaW9uOiBcIlx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1MzA5Mlx1NTkwOVx1NjZGNFwiLFxuXHRcdFx0aW5zdGFsbGluZzogXCJcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUJcdTRFMkRcdTIwMjZcIixcblx0XHRcdG5ldmVyTWluZDogXCJcdTMwQURcdTMwRTNcdTMwRjNcdTMwQkJcdTMwRUJcIixcblx0XHRcdHZhbGlkOiBcIlx1NjcwOVx1NTJCOVwiLFxuXHRcdFx0aW52YWxpZDogXCJcdTcxMjFcdTUyQjlcIixcblx0XHR9LFxuXHRcdGhlYWRpbmc6IHtcblx0XHRcdGNoYW5nZVBsdWdpblZlcnNpb246IFwiXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDZFXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXHUzMDkyXHU1OTA5XHU2NkY0XHVGRjFBXCIsXG5cdFx0XHRnaXRodWJSZXBvc2l0b3J5Rm9yQmV0YVBsdWdpbjogXCJCZXRhIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RSBHaXRIdWIgXHUzMEVBXHUzMEREXHUzMEI4XHUzMEM4XHUzMEVBXHVGRjFBXCIsXG5cdFx0fSxcblx0XHRyZXBvc2l0b3J5OiB7XG5cdFx0XHRsYWJlbDogXCJcdTMwRUFcdTMwRERcdTMwQjhcdTMwQzhcdTMwRUFcIixcblx0XHRcdHBsYWNlaG9sZGVyOiBcIlx1MzBFQVx1MzBERFx1MzBCOFx1MzBDOFx1MzBFQVx1RkYwOFx1NEY4Qlx1RkYxQWh0dHBzOi8vR2l0SHViLmNvbS9naXRodWJ1c2VybmFtZS9yZXBvc2l0b3J5LW5hbWVcdUZGMDlcIixcblx0XHRcdGVudGVyQWRkcmVzc1RvVmFsaWRhdGU6IFwiXHU2OTFDXHU4QTNDXHUzMDU5XHUzMDhCIEdpdEh1YiBcdTMwRUFcdTMwRERcdTMwQjhcdTMwQzhcdTMwRUFcdTMwQTJcdTMwQzlcdTMwRUNcdTMwQjlcdTMwOTJcdTUxNjVcdTUyOUJcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHRcdGFkZHJlc3NSZXF1aXJlZDogXCJcdTMwRUFcdTMwRERcdTMwQjhcdTMwQzhcdTMwRUFcdTMwQTJcdTMwQzlcdTMwRUNcdTMwQjlcdTMwNENcdTVGQzVcdTg5ODFcdTMwNjdcdTMwNTlcdTMwMDJcIixcblx0XHRcdHZhbGlkYXRpbmc6IFwiXHUzMEVBXHUzMEREXHUzMEI4XHUzMEM4XHUzMEVBXHUzMEEyXHUzMEM5XHUzMEVDXHUzMEI5XHUzMDkyXHU2OTFDXHU4QTNDXHU0RTJELi4uXCIsXG5cdFx0XHRub1JlbGVhc2VzRm91bmQ6IFwiXHUzMEE4XHUzMEU5XHUzMEZDXHVGRjFBXHUzMDUzXHUzMDZFXHUzMEVBXHUzMEREXHUzMEI4XHUzMEM4XHUzMEVBXHUzMDZCXHUzMEVBXHUzMEVBXHUzMEZDXHUzMEI5XHUzMDRDXHU4OThCXHUzMDY0XHUzMDRCXHUzMDhBXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXCIsXG5cdFx0XHRub3RGb3VuZDpcblx0XHRcdFx0XCJcdTMwRUFcdTMwRERcdTMwQjhcdTMwQzhcdTMwRUFcdTMwNENcdTg5OEJcdTMwNjRcdTMwNEJcdTMwOEFcdTMwN0VcdTMwNUJcdTMwOTNcdTMwMDJcdTMwQTJcdTMwQzlcdTMwRUNcdTMwQjlcdTMwOTJcdTc4QkFcdThBOERcdTMwNTlcdTMwOEJcdTMwNEJcdTMwMDFcdTMwRDdcdTMwRTlcdTMwQTRcdTMwRDlcdTMwRkNcdTMwQzhcdTMwRUFcdTMwRERcdTMwQjhcdTMwQzhcdTMwRUFcdTMwNkJcdTMwQTJcdTMwQUZcdTMwQkJcdTMwQjlcdTMwNjdcdTMwNERcdTMwOEJcdTY3MDlcdTUyQjlcdTMwNkFcdTMwQzhcdTMwRkNcdTMwQUZcdTMwRjNcdTMwOTJcdTYzMDdcdTVCOUFcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHRcdGFjY2Vzc0RlbmllZDogXCJcdTMwQTJcdTMwQUZcdTMwQkJcdTMwQjlcdTMwNENcdTYyRDJcdTU0MjZcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDJcdTUwMEJcdTRFQkFcdTMwQTJcdTMwQUZcdTMwQkJcdTMwQjlcdTMwQzhcdTMwRkNcdTMwQUZcdTMwRjNcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHRcdGVycm9yOiAobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nID0+IGBcdTMwQThcdTMwRTlcdTMwRkNcdUZGMUEke21lc3NhZ2V9YCxcblx0XHRcdHJhdGVMaW1pdEV4Y2VlZGVkOiAobWludXRlczogbnVtYmVyKTogc3RyaW5nID0+IGBHaXRIdWIgQVBJIFx1MzA2RVx1MzBFQ1x1MzBGQ1x1MzBDOFx1NTIzNlx1OTY1MFx1MzA5Mlx1OEQ4NVx1OTA0RVx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1Rlx1MzAwMiR7bWludXRlc30gXHU1MjA2XHU1RjhDXHUzMDZCXHUzMDgyXHUzMDQ2XHU0RTAwXHU1RUE2XHUzMDRBXHU4QTY2XHUzMDU3XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyYCxcblx0XHRcdHJhdGVMaW1pdFRvYXN0OiAobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nID0+XG5cdFx0XHRcdGAke21lc3NhZ2V9IEJSQVQgXHU4QTJEXHU1QjlBXHUzMDY3XHU1MDBCXHU0RUJBXHUzMEEyXHUzMEFGXHUzMEJCXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHUzMDkyXHU4RkZEXHU1MkEwXHUzMDU5XHUzMDhCXHUzMDY4XHUzMDAxXHUzMDg4XHUzMDhBXHU5QUQ4XHUzMDQ0XHU1MjM2XHU5NjUwXHUzMDkyXHU1MjI5XHU3NTI4XHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXHU4QTczXHUzMDU3XHUzMDRGXHUzMDZGXHUzMEM5XHUzMEFEXHUzMEU1XHUzMEUxXHUzMEYzXHUzMEM4XHUzMDkyXHU1M0MyXHU3MTY3XHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyYCxcblx0XHRcdGdpdEh1YlJlc3BvbnNlVG9hc3Q6IChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7bWVzc2FnZX0gYCxcblx0XHR9LFxuXHRcdHZlcnNpb246IHtcblx0XHRcdHNlbGVjdFZlcnNpb246IFwiXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXHUzMDkyXHU5MDc4XHU2MjlFXCIsXG5cdFx0XHRzZWxlY3RWZXJzaW9uRWxsaXBzaXM6IFwiXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXHUzMDkyXHU5MDc4XHU2MjlFLi4uXCIsXG5cdFx0XHRsYXRlc3RWZXJzaW9uOiBcIlx1NjcwMFx1NjVCMFx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1wiLFxuXHRcdFx0cHJlcmVsZWFzZVN1ZmZpeDogXCJcdUZGMDhcdTMwRDdcdTMwRUNcdTMwRUFcdTMwRUFcdTMwRkNcdTMwQjlcdUZGMDlcIixcblx0XHR9LFxuXHRcdHRva2VuOiB7XG5cdFx0XHRuYW1lOiBcIkdpdEh1YiBcdTMwQzhcdTMwRkNcdTMwQUZcdTMwRjNcIixcblx0XHRcdGRlc2M6IFwiXHUzMDUzXHUzMDZFXHUzMEVBXHUzMEREXHUzMEI4XHUzMEM4XHUzMEVBXHU3NTI4XHUzMDZFXHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHUzMDY4XHUzMDU3XHUzMDY2XHU0RjdGXHU3NTI4XHUzMDU5XHUzMDhCXHUzMEI3XHUzMEZDXHUzMEFGXHUzMEVDXHUzMEMzXHUzMEM4XHUzMDkyXHU5MDc4XHU2MjlFXHUzMDU3XHUzMDdFXHUzMDU5XHVGRjA4XHU0RUZCXHU2MTBGXHVGRjA5XCIsXG5cdFx0XHRzZXR0aW5nQ2xlYXJlZDogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtyZXBvc2l0b3J5fSBcdTMwNkVcdTMwQzhcdTMwRkNcdTMwQUZcdTMwRjNcdThBMkRcdTVCOUFcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQTJcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZgLFxuXHRcdFx0c2V0dGluZ1VwZGF0ZWQ6IChyZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7cmVwb3NpdG9yeX0gXHUzMDZFXHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHU4QTJEXHU1QjlBXHUzMDkyXHU2NkY0XHU2NUIwXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGYCxcblx0XHR9LFxuXHRcdGVuYWJsZUFmdGVySW5zdGFsbDogXCJcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUJcdTVGOENcdTMwNkJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTY3MDlcdTUyQjlcdTUzMTZcIixcblx0XHRhbHJlYWR5SW5MaXN0OiBcIlx1MzA1M1x1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2Rlx1MzA1OVx1MzA2N1x1MzA2QiBCZXRhIFx1MzBDNlx1MzBCOVx1MzBDOFx1NEUwMFx1ODlBN1x1MzA2Qlx1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVwiLFxuXHR9LFxuXHRhZGRCZXRhVGhlbWVNb2RhbDoge1xuXHRcdGhlYWRpbmc6IHtcblx0XHRcdGdpdGh1YlJlcG9zaXRvcnlGb3JCZXRhVGhlbWU6IFwiQmV0YSBcdTMwQzZcdTMwRkNcdTMwREVcdTMwNkUgR2l0SHViIFx1MzBFQVx1MzBERFx1MzBCOFx1MzBDOFx1MzBFQVx1RkYxQVwiLFxuXHRcdH0sXG5cdFx0YWxyZWFkeUluTGlzdDogXCJcdTMwNTNcdTMwNkVcdTMwQzZcdTMwRkNcdTMwREVcdTMwNkZcdTMwNTlcdTMwNjdcdTMwNkIgQmV0YSBcdTMwQzZcdTMwQjlcdTMwQzhcdTRFMDBcdTg5QTdcdTMwNkJcdTMwNDJcdTMwOEFcdTMwN0VcdTMwNTlcIixcblx0fSxcblx0dGhlbWVNZXNzYWdlczoge1xuXHRcdG5vVGhlbWVDc3NGaWxlOiBcIlx1MzA1M1x1MzA2RVx1MzBFQVx1MzBERFx1MzBCOFx1MzBDOFx1MzBFQVx1MzA2RVx1MzBFQlx1MzBGQ1x1MzBDOFx1MzBEMVx1MzBCOVx1MzA2Qlx1MzA2RiB0aGVtZS5jc3MgXHUzMDdFXHUzMDVGXHUzMDZGIHRoZW1lLWJldGEuY3NzIFx1MzA0Q1x1MzA2QVx1MzA0NFx1MzA1Rlx1MzA4MVx1MzAwMVx1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1MzA2N1x1MzA0RFx1MzA4Qlx1MzBDNlx1MzBGQ1x1MzBERVx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1Qlx1MzA5M1x1MzAwMlwiLFxuXHRcdG5vTWFuaWZlc3RGaWxlOiBcIlx1MzA1M1x1MzA2RVx1MzBFQVx1MzBERFx1MzBCOFx1MzBDOFx1MzBFQVx1MzA2RVx1MzBFQlx1MzBGQ1x1MzBDOFx1MzBEMVx1MzBCOVx1MzA2Qlx1MzA2RiBtYW5pZmVzdC5qc29uIFx1MzA0Q1x1MzA2QVx1MzA0NFx1MzA1Rlx1MzA4MVx1MzAwMVx1MzBDNlx1MzBGQ1x1MzBERVx1MzA5Mlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1Qlx1MzA5M1x1MzAwMlwiLFxuXHRcdGluc3RhbGxlZDogKHRoZW1lTmFtZTogc3RyaW5nLCByZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7cmVwb3NpdG9yeX0gXHUzMDRCXHUzMDg5XHUzMEM2XHUzMEZDXHUzMERFICR7dGhlbWVOYW1lfSBcdTMwOTJcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUJcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDJgLFxuXHRcdHVwZGF0ZWQ6ICh0aGVtZU5hbWU6IHN0cmluZywgcmVwb3NpdG9yeTogc3RyaW5nKTogc3RyaW5nID0+IGAke3JlcG9zaXRvcnl9IFx1MzA0Qlx1MzA4OVx1MzBDNlx1MzBGQ1x1MzBERSAke3RoZW1lTmFtZX0gXHUzMDkyXHU2NkY0XHU2NUIwXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXHUzMDAyYCxcblx0XHRyZW1vdmVkOiAocmVwb3NpdG9yeTogc3RyaW5nKTogc3RyaW5nID0+XG5cdFx0XHRgJHtyZXBvc2l0b3J5fSBcdTMwOTIgQlJBVCBcdTMwNkVcdTMwQzZcdTMwRkNcdTMwREVcdTRFMDBcdTg5QTdcdTMwNEJcdTMwODlcdTUyNEFcdTk2NjRcdTMwNTdcdTMwNUZcdTMwNUZcdTMwODFcdTMwMDFcdTRFQ0FcdTVGOENcdTMwNkZcdTY2RjRcdTY1QjBcdTMwNTVcdTMwOENcdTMwN0VcdTMwNUJcdTMwOTNcdTMwMDJcdTMwNUZcdTMwNjBcdTMwNTdcdTMwMDFcdTMwQzZcdTMwRkNcdTMwREVcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTgxRUFcdTRGNTNcdTMwNkYgVmF1bHQgXHUzMDZCXHU2QjhCXHUzMDhBXHUzMDdFXHUzMDU5XHUzMDAyXHU1MjRBXHU5NjY0XHUzMDU5XHUzMDhCXHUzMDZCXHUzMDZGXHUzMDAxXHU4QTJEXHU1QjlBID4gXHU1OTE2XHU4OUIzIFx1MzA0Qlx1MzA4OVx1MzBDNlx1MzBGQ1x1MzBERVx1MzA5Mlx1NTI0QVx1OTY2NFx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMmAsXG5cdH0sXG5cdHZlcnNpb25TdWdnZXN0TW9kYWw6IHtcblx0XHR0aXRsZTogXCJcdTMwRDBcdTMwRkNcdTMwQjhcdTMwRTdcdTMwRjNcdTMwOTJcdTkwNzhcdTYyOUVcIixcblx0XHRwbGFjZWhvbGRlcjogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtyZXBvc2l0b3J5fSBcdTMwNkVcdTMwRDBcdTMwRkNcdTMwQjhcdTMwRTdcdTMwRjNcdTMwOTJcdTY5MUNcdTdEMjJgLFxuXHRcdHZlcnNpb25MYWJlbDogKHZlcnNpb246IHN0cmluZyk6IHN0cmluZyA9PiAodmVyc2lvbiA9PT0gXCJsYXRlc3RcIiA/IFwiXHU2NzAwXHU2NUIwXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXCIgOiB2ZXJzaW9uKSxcblx0XHRpbnN0cnVjdGlvbnM6IHtcblx0XHRcdG5hdmlnYXRlVmVyc2lvbnM6IFwiXHUzMEQwXHUzMEZDXHUzMEI4XHUzMEU3XHUzMEYzXHUzMDkyXHU3OUZCXHU1MkQ1XCIsXG5cdFx0XHRzZWxlY3RWZXJzaW9uOiBcIlx1MzBEMFx1MzBGQ1x1MzBCOFx1MzBFN1x1MzBGM1x1MzA5Mlx1OTA3OFx1NjI5RVwiLFxuXHRcdFx0ZGlzbWlzc01vZGFsOiBcIlx1MzBFMlx1MzBGQ1x1MzBDMFx1MzBFQlx1MzA5Mlx1OTU4OVx1MzA1OFx1MzA4QlwiLFxuXHRcdH0sXG5cdFx0cHJlcmVsZWFzZVN1ZmZpeDogXCJcdUZGMDhcdTMwRDdcdTMwRUNcdTMwRUFcdTMwRUFcdTMwRkNcdTMwQjlcdUZGMDlcIixcblx0fSxcbn0gc2F0aXNmaWVzIExvY2FsZVN0cmluZ3M7XG4iLCAiaW1wb3J0IHR5cGUgeyBMb2NhbGVTdHJpbmdzIH0gZnJvbSBcIi4vZW5cIjtcblxuZXhwb3J0IGNvbnN0IHpoQ24gPSB7XG5cdGNvbW1vbjoge1xuXHRcdGFuZDogXCIgXHU1NDhDIFwiLFxuXHRcdHByb21vdGlvbmFsOiB7XG5cdFx0XHRsZWFybk1vcmU6IFwiXHU0RTg2XHU4OUUzXHU0RjVDXHU4MDA1XHU3Njg0XHU2NkY0XHU1OTFBXHU0RjVDXHU1NEMxXHVGRjFBXCIsXG5cdFx0fSxcblx0fSxcblx0c2V0dGluZ3M6IHtcblx0XHRnZW5lcmFsOiB7XG5cdFx0XHRhdXRvRW5hYmxlUGx1Z2luc0FmdGVySW5zdGFsbGF0aW9uOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU1Qjg5XHU4OEM1XHU1NDBFXHU4MUVBXHU1MkE4XHU1NDJGXHU3NTI4IEJldGEgXHU2M0QyXHU0RUY2XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU1RjAwXHU1NDJGXHU1NDBFXHVGRjBDXHU2NUIwXHU1Qjg5XHU4OEM1XHU3Njg0IEJldGEgXHU2M0QyXHU0RUY2XHU0RjFBXHU5RUQ4XHU4QkE0XHU4MUVBXHU1MkE4XHU1NDJGXHU3NTI4XHUzMDAyXHU0RjYwXHU0RUNEXHU3MTM2XHU1M0VGXHU0RUU1XHU1NzI4XHUyMDFDXHU2REZCXHU1MkEwXHU2M0QyXHU0RUY2XHUyMDFEXHU4ODY4XHU1MzU1XHU0RTJEXHU0RTNBXHU1MzU1XHU0RTJBXHU2M0QyXHU0RUY2XHU1MzU1XHU3MkVDXHU4QzAzXHU2NTc0XHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0YXV0b1VwZGF0ZVBsdWdpbnNBdFN0YXJ0dXA6IHtcblx0XHRcdFx0bmFtZTogXCJcdTU0MkZcdTUyQThcdTY1RjZcdTgxRUFcdTUyQThcdTY2RjRcdTY1QjAgQmV0YSBcdTYzRDJcdTRFRjZcIixcblx0XHRcdFx0ZGVzYzogXCJcdTVGMDBcdTU0MkZcdTU0MEVcdUZGMENcdTZCQ0ZcdTZCMjEgT2JzaWRpYW4gXHU1NDJGXHU1MkE4XHU2NUY2XHU5MEZEXHU0RjFBXHU2OEMwXHU2N0U1XHU1RTc2XHU1Qjg5XHU4OEM1IEJldGEgXHU2M0QyXHU0RUY2XHU2NkY0XHU2NUIwXHUzMDAyXHU1NkZBXHU1QjlBXHU3MjQ4XHU2NzJDXHU0RTBEXHU0RjFBXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0YXV0b1VwZGF0ZVRoZW1lc0F0U3RhcnR1cDoge1xuXHRcdFx0XHRuYW1lOiBcIlx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NjZGNFx1NjVCMCBCZXRhIFx1NEUzQlx1OTg5OFwiLFxuXHRcdFx0XHRkZXNjOiBcIlx1NUYwMFx1NTQyRlx1NTQwRVx1RkYwQ1x1NkJDRlx1NkIyMSBPYnNpZGlhbiBcdTU0MkZcdTUyQThcdTY1RjZcdTkwRkRcdTRGMUFcdTY4QzBcdTY3RTVcdTVFNzZcdTVCODlcdTg4QzUgQmV0YSBcdTRFM0JcdTk4OThcdTY2RjRcdTY1QjBcdTMwMDJcIixcblx0XHRcdH0sXG5cdFx0XHRzZWxlY3RMYXRlc3RQbHVnaW5WZXJzaW9uQnlEZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU5RUQ4XHU4QkE0XHU5MDA5XHU2MkU5XHU2M0QyXHU0RUY2XHU2NzAwXHU2NUIwXHU3MjQ4XHU2NzJDXCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU1RjAwXHU1NDJGXHU1NDBFXHVGRjBDXHU2REZCXHU1MkEwXHU2NUIwXHU2M0QyXHU0RUY2XHU2NUY2XHU0RjFBXHU5RUQ4XHU4QkE0XHU5MDA5XHU2MkU5XHU2NzAwXHU2NUIwXHU3MjQ4XHU2NzJDXHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0YWxsb3dJbmNvbXBhdGlibGVQbHVnaW5zOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU1MTQxXHU4QkI4XHU1Qjg5XHU4OEM1XHU0RTBEXHU1MTdDXHU1QkI5XHU2M0QyXHU0RUY2XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU1RjAwXHU1NDJGXHU1NDBFXHVGRjBDXHU1M0VGXHU0RUU1XHU1Qjg5XHU4OEM1XHU4OTgxXHU2QzQyXHU2NkY0XHU5QUQ4IE9ic2lkaWFuIFx1NzI0OFx1NjcyQ1x1NzY4NFx1NjNEMlx1NEVGNlx1RkYwQ1x1NEU1Rlx1NTNFRlx1NEVFNVx1NTcyOFx1NzlGQlx1NTJBOFx1N0FFRlx1NUI4OVx1ODhDNVx1NEVDNVx1NjUyRlx1NjMwMVx1Njg0Q1x1OTc2Mlx1N0FFRlx1NzY4NFx1NjNEMlx1NEVGNlx1MzAwMlwiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdG1vbml0b3Jpbmc6IHtcblx0XHRcdGhlYWRpbmc6IFwiXHU5MDFBXHU3N0U1XHU0RTBFXHU2NUU1XHU1RkQ3XCIsXG5cdFx0XHRlbmFibGVOb3RpZmljYXRpb25zOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU1NDJGXHU3NTI4XHU5MDFBXHU3N0U1XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU1RjAwXHU1NDJGXHU1NDBFXHVGRjBDQlJBVCBcdTRGMUFcdTc1MjhcdTVGMzlcdTdBOTdcdTYzRDBcdTc5M0FcdTVCODlcdTg4QzVcdTMwMDFcdTY2RjRcdTY1QjBcdTdCNDlcdTY0Q0RcdTRGNUNcdTcyQjZcdTYwMDFcdTMwMDJcdTUxNzNcdTk1RURcdTU0MEVcdTRFMERcdTUxOERcdTY2M0VcdTc5M0FcdThGRDlcdTRFOUJcdTkwMUFcdTc3RTVcdTMwMDJcIixcblx0XHRcdH0sXG5cdFx0XHRlbmFibGVMb2dnaW5nOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU1NDJGXHU3NTI4XHU2NUU1XHU1RkQ3XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU1RjAwXHU1NDJGXHU1NDBFXHVGRjBDXHU2M0QyXHU0RUY2XHU2NkY0XHU2NUIwXHU4QkIwXHU1RjU1XHU0RjFBXHU1MTk5XHU1MTY1XHU2NUU1XHU1RkQ3XHU2NTg3XHU0RUY2XHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0YnJhdExvZ0ZpbGVMb2NhdGlvbjoge1xuXHRcdFx0XHRuYW1lOiBcIkJSQVQgXHU2NUU1XHU1RkQ3XHU2NTg3XHU0RUY2XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU2NUU1XHU1RkQ3XHU0RjFBXHU0RkREXHU1QjU4XHU1MjMwXHU4RkQ5XHU0RTJBXHU2NTg3XHU0RUY2XHUzMDAyXHU1ODZCXHU1MTk5XHU2NTg3XHU0RUY2XHU1NDBEXHU2MjE2XHU1RTkzXHU1MTg1XHU4REVGXHU1Rjg0XHU2NUY2XHU0RTBEXHU4OTgxXHU1MkEwIC5tZFx1MzAwMlwiLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJcdTc5M0FcdTRGOEJcdUZGMUFCUkFULWxvZ1wiLFxuXHRcdFx0fSxcblx0XHRcdGVuYWJsZVZlcmJvc2VMb2dnaW5nOiB7XG5cdFx0XHRcdG5hbWU6IFwiXHU1NDJGXHU3NTI4XHU4QkU2XHU3RUM2XHU2NUU1XHU1RkQ3XCIsXG5cdFx0XHRcdGRlc2M6IFwiXHU1RjAwXHU1NDJGXHU1NDBFXHVGRjBDXHU2NUU1XHU1RkQ3XHU0RjFBXHU4QkIwXHU1RjU1XHU2NkY0XHU1OTFBXHU2MzkyXHU2N0U1XHU0RkUxXHU2MDZGXHUzMDAyXCIsXG5cdFx0XHR9LFxuXHRcdFx0ZGVidWdnaW5nTW9kZToge1xuXHRcdFx0XHRuYW1lOiBcIlx1OEMwM1x1OEJENVx1NkEyMVx1NUYwRlwiLFxuXHRcdFx0XHRkZXNjOiBcIlx1NUYwMFx1NTQyRlx1NTQwRVx1RkYwQ1x1NjNBN1x1NTIzNlx1NTNGMFx1NEYxQVx1OEY5M1x1NTFGQVx1NTkyN1x1OTFDRlx1OEMwM1x1OEJENVx1NEZFMVx1NjA2Rlx1RkYwQ1x1NEUzQlx1ODk4MVx1NzUyOFx1NEU4RVx1NjM5Mlx1NjdFNVx1OTVFRVx1OTg5OFx1NTQ4Q1x1NUYwMFx1NTNEMVx1MzAwMlwiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW46IHtcblx0XHRcdGhlYWRpbmc6IFwiR2l0SHViIFx1NEUyQVx1NEVCQVx1OEJCRlx1OTVFRVx1NEVFNFx1NzI0Q1wiLFxuXHRcdFx0cGVyc29uYWxBY2Nlc3NUb2tlbjoge1xuXHRcdFx0XHRuYW1lOiBcIlx1NEUyQVx1NEVCQVx1OEJCRlx1OTVFRVx1NEVFNFx1NzI0Q1wiLFxuXHRcdFx0XHRkZXNjOiB7XG5cdFx0XHRcdFx0cHJlcGVuZFRleHQ6IFwiXHU4QkJFXHU3RjZFXHU0RTJBXHU0RUJBXHU4QkJGXHU5NUVFXHU0RUU0XHU3MjRDXHU1M0VGXHU0RUU1XHU2M0QwXHU5QUQ4XHU4QkJGXHU5NUVFIEdpdEh1YiBcdTUxNkNcdTUxNzFcdTRFRDNcdTVFOTNcdTY1RjZcdTc2ODRcdThCRjdcdTZDNDJcdTk4OURcdTVFQTZcdTMwMDJcdTRGNjBcdTUzRUZcdTRFRTVcdTU3MjggXCIsXG5cdFx0XHRcdFx0bGlua1RleHQ6IFwiR2l0SHViIFx1NEVFNFx1NzI0Q1x1OEJCRVx1N0Y2RVwiLFxuXHRcdFx0XHRcdGFwcGVuZFRleHQ6IFwiIFx1NEUyRFx1NTIxQlx1NUVGQVx1NEVFNFx1NzI0Q1x1RkYwQ1x1NzEzNlx1NTQwRVx1NTcyOFx1OEZEOVx1OTFDQ1x1OTAwOVx1NjJFOVx1NEZERFx1NUI1OFx1OEJFNVx1NEVFNFx1NzI0Q1x1NzY4NFx1NUJDNlx1OTRBNVx1MzAwMlx1NjZGNFx1NTkxQVx1NEZFMVx1NjA2Rlx1OEJGN1x1NTNDMlx1ODAwM1x1NjU4N1x1Njg2M1x1MzAwMlwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdGNsZWFyUGVyc29uYWxBY2Nlc3NUb2tlbjogXCJcdTZFMDVcdTk2NjRcdTRFMkFcdTRFQkFcdThCQkZcdTk1RUVcdTRFRTRcdTcyNENcdThCQkVcdTdGNkVcIixcblx0XHRcdHZhbGlkYXRlOiBcIlx1OUE4Q1x1OEJDMVwiLFxuXHRcdH0sXG5cdFx0YmV0YVBsdWdpbkxpc3Q6IHtcblx0XHRcdGhlYWRpbmc6IFwiQmV0YSBcdTYzRDJcdTRFRjZcdTUyMTdcdTg4NjhcIixcblx0XHRcdGZpbHRlclBsYWNlaG9sZGVyOiBcIlx1N0I1Qlx1OTAwOVx1NjNEMlx1NEVGNlwiLFxuXHRcdFx0ZGVzY3JpcHRpb246IHtcblx0XHRcdFx0aW50cm86XG5cdFx0XHRcdFx0XCJcdTRFMEJcdTY1QjlcdTUyMTdcdTUxRkFcdTVERjJcdTkwMUFcdThGQzcgQlJBVCBcdTZERkJcdTUyQTBcdTc2ODQgQmV0YSBcdTYzRDJcdTRFRjZcdTMwMDJcdTRGNjBcdTUzRUZcdTRFRTVcdThCQTlcdTYzRDJcdTRFRjZcdThEREZcdTk2OEZcdTY3MDBcdTY1QjBcdTcyNDhcdTY3MkNcdUZGMENcdTRFNUZcdTUzRUZcdTRFRTVcdTU2RkFcdTVCOUFcdTUyMzBcdTY3RDBcdTRFMkFcdTUzRDFcdTVFMDNcdTcyNDhcdTY3MkNcdTMwMDJcdTU2RkFcdTVCOUFcdTcyNDhcdTY3MkNcdTYzMDdcdTU3RkFcdTRFOEUgcmVsZWFzZSBcdTY4MDdcdTdCN0VcdTYzMDdcdTVCOUFcdTc2ODRcdTY3RDBcdTRFMkFcdTYzRDJcdTRFRjZcdTcyNDhcdTY3MkNcdTMwMDJcIixcblx0XHRcdFx0ZWRpdEFuZFJlbW92ZTogXCJcdTcwQjlcdTUxRkJcdTYzRDJcdTRFRjZcdTY1QzFcdTc2ODRcdTdGMTZcdThGOTFcdTYzMDlcdTk0QUVcdTUzRUZcdTRFRTVcdTY2RjRcdTY1MzlcdTVCODlcdTg4QzVcdTcyNDhcdTY3MkNcdUZGMUJcdTcwQjlcdTUxRkIgWCBcdTYzMDlcdTk0QUVcdTRGMUFcdTVDMDZcdTVCODNcdTRFQ0VcdTUyMTdcdTg4NjhcdTRFMkRcdTc5RkJcdTk2NjRcdTMwMDJcIixcblx0XHRcdFx0bm90ZUxhYmVsOiBcIlx1NkNFOFx1NjEwRlx1RkYxQVwiLFxuXHRcdFx0XHRub3RlVGV4dDogXCJcdTRFQ0VcdTUyMTdcdTg4NjhcdTRFMkRcdTc5RkJcdTk2NjRcdTRFMERcdTRGMUFcdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZcdTY3MkNcdTRGNTNcdTMwMDJcdTU5ODJcdTk3MDBcdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZcdUZGMENcdThCRjdcdTUyMzBcdThCQkVcdTdGNkVcdTRFMkRcdTc2ODRcdTIwMUNcdTdCMkNcdTRFMDlcdTY1QjlcdTYzRDJcdTRFRjZcdTIwMURcdTk4NzVcdTk3NjJcdTY0Q0RcdTRGNUNcdTMwMDJcIixcblx0XHRcdH0sXG5cdFx0XHRhZGRCZXRhUGx1Z2luOiBcIlx1NkRGQlx1NTJBMCBCZXRhIFx1NjNEMlx1NEVGNlwiLFxuXHRcdFx0dHJhY2tlZFZlcnNpb246ICh2ZXJzaW9uOiBzdHJpbmcsIGZyb3plbjogYm9vbGVhbik6IHN0cmluZyA9PlxuXHRcdFx0XHRgXHU4RERGXHU4RTJBXHU3MjQ4XHU2NzJDXHVGRjFBJHt2ZXJzaW9uID09PSBcImxhdGVzdFwiID8gXCJcdTY3MDBcdTY1QjBcdTcyNDhcdTY3MkNcIiA6IHZlcnNpb259JHtmcm96ZW4gPyBcIlx1RkYwOFx1NTZGQVx1NUI5QVx1RkYwOVwiIDogXCJcIn1gLFxuXHRcdFx0aW5jb21wYXRpYmxlOiBcIlx1RkYwOFx1NEUwRFx1NTE3Q1x1NUJCOVx1RkYwOVwiLFxuXHRcdFx0c2VjcmV0TWlzc2luZzogKHNlY3JldE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgXHU1QkM2XHU5NEE1XHU2NzJBXHU1QjlBXHU0RTQ5XHU2MjE2XHU0RTNBXHU3QTdBXHVGRjFBJHtzZWNyZXROYW1lfWAsXG5cdFx0XHRzZWNyZXRNaXNzaW5nVGl0bGU6IFwiXHU1REYyXHU5MTREXHU3RjZFXHU1QkM2XHU5NEE1XHU1NDBEXHU3OUYwXHVGRjBDXHU0RjQ2XHU1QkM2XHU5NEE1XHU0RTBEXHU1QjU4XHU1NzI4XHU2MjE2XHU0RTNBXHU3QTdBXHUzMDAyXHU4QkY3XHU2REZCXHU1MkEwXHU1QkM2XHU5NEE1XHVGRjBDXHU2MjE2XHU2NkY0XHU2NUIwXHU4QkU1XHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHUzMDAyXCIsXG5cdFx0XHRzZWNyZXRNaXNzaW5nVG9vbHRpcDogKHNlY3JldE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgXHU1QkM2XHU5NEE1XHU3RjNBXHU1OTMxXHVGRjFBJHtzZWNyZXROYW1lfVx1MzAwMlx1OEJGN1x1NkRGQlx1NTJBMFx1NUJDNlx1OTRBNVx1RkYwQ1x1NjIxNlx1NjZGNFx1NjVCMFx1OEJFNVx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVx1MzAwMmAsXG5cdFx0XHRjaGVja0FuZFVwZGF0ZVBsdWdpbjogXCJcdTY4QzBcdTY3RTVcdTVFNzZcdTY2RjRcdTY1QjBcdTYzRDJcdTRFRjZcIixcblx0XHRcdGNoYW5nZVZlcnNpb25BbmRVcGRhdGVTZXR0aW5nczogXCJcdTY2RjRcdTY1MzlcdTcyNDhcdTY3MkNcdTU0OENcdThCQkVcdTdGNkVcIixcblx0XHRcdHJlbW92ZVRoaXNCZXRhUGx1Z2luOiBcIlx1NzlGQlx1OTY2NFx1NkI2NCBCZXRhIFx1NjNEMlx1NEVGNlwiLFxuXHRcdFx0Y29uZmlybVJlbW92YWw6IFwiXHU1MThEXHU2QjIxXHU3MEI5XHU1MUZCXHU3ODZFXHU4QkE0XHU3OUZCXHU5NjY0XCIsXG5cdFx0XHRjb3B5UGx1Z2luSWRlbnRpZmllcjogXCJcdTU5MERcdTUyMzZcdTYzRDJcdTRFRjZcdTY4MDdcdThCQzZcdTdCMjZcIixcblx0XHR9LFxuXHRcdGJldGFUaGVtZUxpc3Q6IHtcblx0XHRcdGhlYWRpbmc6IFwiQmV0YSBcdTRFM0JcdTk4OThcdTUyMTdcdTg4NjhcIixcblx0XHRcdGFkZEJldGFUaGVtZTogXCJcdTZERkJcdTUyQTAgQmV0YSBcdTRFM0JcdTk4OThcIixcblx0XHRcdGZpbHRlclBsYWNlaG9sZGVyOiBcIlx1N0I1Qlx1OTAwOVx1NEUzQlx1OTg5OFwiLFxuXHRcdFx0ZGVsZXRlVGhpc0JldGFUaGVtZTogXCJcdTUyMjBcdTk2NjRcdTZCNjQgQmV0YSBcdTRFM0JcdTk4OThcIixcblx0XHRcdGNvbmZpcm1SZW1vdmFsOiBcIlx1NTE4RFx1NkIyMVx1NzBCOVx1NTFGQlx1Nzg2RVx1OEJBNFx1NzlGQlx1OTY2NFwiLFxuXHRcdFx0Y29weVRoZW1lSWRlbnRpZmllcjogXCJcdTU5MERcdTUyMzZcdTRFM0JcdTk4OThcdTY4MDdcdThCQzZcdTdCMjZcIixcblx0XHR9LFxuXHRcdGNvcHlJZGVudGlmaWVyOiB7XG5cdFx0XHRjb3BpZWQ6IChpZGVudGlmaWVyOiBzdHJpbmcpOiBzdHJpbmcgPT4gYFx1NURGMlx1NTkwRFx1NTIzNlx1RkYxQSR7aWRlbnRpZmllcn1gLFxuXHRcdFx0ZmFpbGVkOiBcIlx1NTkwRFx1NTIzNlx1NjgwN1x1OEJDNlx1N0IyNlx1NTkzMVx1OEQyNVx1RkYwQ1x1OEJGN1x1NjhDMFx1NjdFNVx1NTI2QVx1OEQzNFx1Njc3Rlx1Njc0M1x1OTY1MFx1MzAwMlwiLFxuXHRcdH0sXG5cdH0sXG5cdGFkZEJldGFQbHVnaW5Nb2RhbDoge1xuXHRcdGJ1dHRvbnM6IHtcblx0XHRcdGFkZFBsdWdpbjogXCJcdTZERkJcdTUyQTBcdTYzRDJcdTRFRjZcIixcblx0XHRcdGNoYW5nZVZlcnNpb246IFwiXHU2NkY0XHU2NTM5XHU3MjQ4XHU2NzJDXCIsXG5cdFx0XHRpbnN0YWxsaW5nOiBcIlx1NkI2M1x1NTcyOFx1NUI4OVx1ODhDNVx1MjAyNlwiLFxuXHRcdFx0bmV2ZXJNaW5kOiBcIlx1NTNENlx1NkQ4OFwiLFxuXHRcdFx0dmFsaWQ6IFwiXHU2NzA5XHU2NTQ4XCIsXG5cdFx0XHRpbnZhbGlkOiBcIlx1NjVFMFx1NjU0OFwiLFxuXHRcdH0sXG5cdFx0aGVhZGluZzoge1xuXHRcdFx0Y2hhbmdlUGx1Z2luVmVyc2lvbjogXCJcdTY2RjRcdTY1MzlcdTYzRDJcdTRFRjZcdTcyNDhcdTY3MkNcdUZGMUFcIixcblx0XHRcdGdpdGh1YlJlcG9zaXRvcnlGb3JCZXRhUGx1Z2luOiBcIkJldGEgXHU2M0QyXHU0RUY2XHU3Njg0IEdpdEh1YiBcdTRFRDNcdTVFOTNcdUZGMUFcIixcblx0XHR9LFxuXHRcdHJlcG9zaXRvcnk6IHtcblx0XHRcdGxhYmVsOiBcIlx1NEVEM1x1NUU5M1wiLFxuXHRcdFx0cGxhY2Vob2xkZXI6IFwiXHU0RUQzXHU1RTkzXHVGRjA4XHU3OTNBXHU0RjhCXHVGRjFBaHR0cHM6Ly9HaXRIdWIuY29tL2dpdGh1YnVzZXJuYW1lL3JlcG9zaXRvcnktbmFtZVx1RkYwOVwiLFxuXHRcdFx0ZW50ZXJBZGRyZXNzVG9WYWxpZGF0ZTogXCJcdThGOTNcdTUxNjUgR2l0SHViIFx1NEVEM1x1NUU5M1x1NTczMFx1NTc0MFx1NTQwRVx1NEYxQVx1ODFFQVx1NTJBOFx1OUE4Q1x1OEJDMVx1MzAwMlwiLFxuXHRcdFx0YWRkcmVzc1JlcXVpcmVkOiBcIlx1OTcwMFx1ODk4MVx1NTg2Qlx1NTE5OVx1NEVEM1x1NUU5M1x1NTczMFx1NTc0MFx1MzAwMlwiLFxuXHRcdFx0dmFsaWRhdGluZzogXCJcdTZCNjNcdTU3MjhcdTlBOENcdThCQzFcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDAuLi5cIixcblx0XHRcdG5vUmVsZWFzZXNGb3VuZDogXCJcdTk1MTlcdThCRUZcdUZGMUFcdTZCNjRcdTRFRDNcdTVFOTNcdTRFMkRcdTZDQTFcdTY3MDlcdTYyN0VcdTUyMzBcdTUzRDFcdTVFMDNcdTcyNDhcdTY3MkNcdTMwMDJcIixcblx0XHRcdG5vdEZvdW5kOiBcIlx1NjI3RVx1NEUwRFx1NTIzMFx1NEVEM1x1NUU5M1x1MzAwMlx1OEJGN1x1NjhDMFx1NjdFNVx1NTczMFx1NTc0MFx1RkYwQ1x1NjIxNlx1NjNEMFx1NEY5Qlx1NTNFRlx1OEJCRlx1OTVFRVx1NzlDMVx1NjcwOVx1NEVEM1x1NUU5M1x1NzY4NFx1NjcwOVx1NjU0OFx1NEVFNFx1NzI0Q1x1MzAwMlwiLFxuXHRcdFx0YWNjZXNzRGVuaWVkOiBcIlx1OEJCRlx1OTVFRVx1ODhBQlx1NjJEMlx1N0VERFx1MzAwMlx1OEJGN1x1NjhDMFx1NjdFNVx1NEUyQVx1NEVCQVx1OEJCRlx1OTVFRVx1NEVFNFx1NzI0Q1x1MzAwMlwiLFxuXHRcdFx0ZXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYFx1OTUxOVx1OEJFRlx1RkYxQSR7bWVzc2FnZX1gLFxuXHRcdFx0cmF0ZUxpbWl0RXhjZWVkZWQ6IChtaW51dGVzOiBudW1iZXIpOiBzdHJpbmcgPT4gYEdpdEh1YiBBUEkgXHU4QkY3XHU2QzQyXHU5ODlEXHU1RUE2XHU1REYyXHU3NTI4XHU1QzNEXHUzMDAyXHU4QkY3XHU1NzI4ICR7bWludXRlc30gXHU1MjA2XHU5NDlGXHU1NDBFXHU5MUNEXHU4QkQ1XHUzMDAyYCxcblx0XHRcdHJhdGVMaW1pdFRvYXN0OiAoKTogc3RyaW5nID0+IFwiR2l0SHViIEFQSSBcdThCRjdcdTZDNDJcdTk4OURcdTVFQTZcdTVERjJcdTc1MjhcdTVDM0RcdTMwMDJcdTUzRUZcdTRFRTVcdTU3MjggQlJBVCBcdThCQkVcdTdGNkVcdTRFMkRcdTZERkJcdTUyQTBcdTRFMkFcdTRFQkFcdThCQkZcdTk1RUVcdTRFRTRcdTcyNENcdTRFRTVcdTYzRDBcdTlBRDhcdTk4OURcdTVFQTZcdTMwMDJcdThCRTZcdTYwQzVcdThCRjdcdTY3RTVcdTc3MEJcdTY1ODdcdTY4NjNcdTMwMDJcIixcblx0XHRcdGdpdEh1YlJlc3BvbnNlVG9hc3Q6IChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7bWVzc2FnZX0gYCxcblx0XHR9LFxuXHRcdHZlcnNpb246IHtcblx0XHRcdHNlbGVjdFZlcnNpb246IFwiXHU5MDA5XHU2MkU5XHU3MjQ4XHU2NzJDXCIsXG5cdFx0XHRzZWxlY3RWZXJzaW9uRWxsaXBzaXM6IFwiXHU5MDA5XHU2MkU5XHU3MjQ4XHU2NzJDLi4uXCIsXG5cdFx0XHRsYXRlc3RWZXJzaW9uOiBcIlx1NjcwMFx1NjVCMFx1NzI0OFx1NjcyQ1wiLFxuXHRcdFx0cHJlcmVsZWFzZVN1ZmZpeDogXCJcdUZGMDhcdTk4ODRcdTUzRDFcdTVFMDNcdUZGMDlcIixcblx0XHR9LFxuXHRcdHRva2VuOiB7XG5cdFx0XHRuYW1lOiBcIkdpdEh1YiBcdTRFRTRcdTcyNENcIixcblx0XHRcdGRlc2M6IFwiXHU5MDA5XHU2MkU5XHU0RTAwXHU0RTJBXHU1QkM2XHU5NEE1XHVGRjBDXHU0RjVDXHU0RTNBXHU4QkJGXHU5NUVFXHU2QjY0XHU0RUQzXHU1RTkzXHU3Njg0XHU0RUU0XHU3MjRDXHVGRjA4XHU1M0VGXHU5MDA5XHVGRjA5XCIsXG5cdFx0XHRzZXR0aW5nQ2xlYXJlZDogKHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgXHU1REYyXHU2RTA1XHU5NjY0ICR7cmVwb3NpdG9yeX0gXHU3Njg0XHU0RUU0XHU3MjRDXHU4QkJFXHU3RjZFYCxcblx0XHRcdHNldHRpbmdVcGRhdGVkOiAocmVwb3NpdG9yeTogc3RyaW5nKTogc3RyaW5nID0+IGBcdTVERjJcdTY2RjRcdTY1QjAgJHtyZXBvc2l0b3J5fSBcdTc2ODRcdTRFRTRcdTcyNENcdThCQkVcdTdGNkVgLFxuXHRcdH0sXG5cdFx0ZW5hYmxlQWZ0ZXJJbnN0YWxsOiBcIlx1NUI4OVx1ODhDNVx1NTQwRVx1NTQyRlx1NzUyOFx1NkI2NFx1NjNEMlx1NEVGNlwiLFxuXHRcdGFscmVhZHlJbkxpc3Q6IFwiXHU4RkQ5XHU0RTJBXHU2M0QyXHU0RUY2XHU1REYyXHU3RUNGXHU1NzI4IEJldGEgXHU2RDRCXHU4QkQ1XHU1MjE3XHU4ODY4XHU0RTJEXCIsXG5cdH0sXG5cdGFkZEJldGFUaGVtZU1vZGFsOiB7XG5cdFx0aGVhZGluZzoge1xuXHRcdFx0Z2l0aHViUmVwb3NpdG9yeUZvckJldGFUaGVtZTogXCJCZXRhIFx1NEUzQlx1OTg5OFx1NzY4NCBHaXRIdWIgXHU0RUQzXHU1RTkzXHVGRjFBXCIsXG5cdFx0fSxcblx0XHRhbHJlYWR5SW5MaXN0OiBcIlx1OEZEOVx1NEUyQVx1NEUzQlx1OTg5OFx1NURGMlx1N0VDRlx1NTcyOCBCZXRhIFx1NkQ0Qlx1OEJENVx1NTIxN1x1ODg2OFx1NEUyRFwiLFxuXHR9LFxuXHR0aGVtZU1lc3NhZ2VzOiB7XG5cdFx0bm9UaGVtZUNzc0ZpbGU6IFwiXHU4RkQ5XHU0RTJBXHU0RUQzXHU1RTkzXHU3Njg0XHU2ODM5XHU3NkVFXHU1RjU1XHU5MUNDXHU2Q0ExXHU2NzA5IHRoZW1lLmNzcyBcdTYyMTYgdGhlbWUtYmV0YS5jc3MgXHU2NTg3XHU0RUY2XHVGRjBDXHU1NkUwXHU2QjY0XHU2Q0ExXHU2NzA5XHU1M0VGXHU1Qjg5XHU4OEM1XHU3Njg0XHU0RTNCXHU5ODk4XHUzMDAyXCIsXG5cdFx0bm9NYW5pZmVzdEZpbGU6IFwiXHU4RkQ5XHU0RTJBXHU0RUQzXHU1RTkzXHU3Njg0XHU2ODM5XHU3NkVFXHU1RjU1XHU5MUNDXHU2Q0ExXHU2NzA5IG1hbmlmZXN0Lmpzb24gXHU2NTg3XHU0RUY2XHVGRjBDXHU1NkUwXHU2QjY0XHU2NUUwXHU2Q0Q1XHU1Qjg5XHU4OEM1XHU4QkU1XHU0RTNCXHU5ODk4XHUzMDAyXCIsXG5cdFx0aW5zdGFsbGVkOiAodGhlbWVOYW1lOiBzdHJpbmcsIHJlcG9zaXRvcnk6IHN0cmluZyk6IHN0cmluZyA9PiBgXHU1REYyXHU0RUNFICR7cmVwb3NpdG9yeX0gXHU1Qjg5XHU4OEM1XHU0RTNCXHU5ODk4ICR7dGhlbWVOYW1lfVx1MzAwMmAsXG5cdFx0dXBkYXRlZDogKHRoZW1lTmFtZTogc3RyaW5nLCByZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT4gYFx1NURGMlx1NEVDRSAke3JlcG9zaXRvcnl9IFx1NjZGNFx1NjVCMFx1NEUzQlx1OTg5OCAke3RoZW1lTmFtZX1cdTMwMDJgLFxuXHRcdHJlbW92ZWQ6IChyZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT5cblx0XHRcdGBcdTVERjJcdTVDMDYgJHtyZXBvc2l0b3J5fSBcdTRFQ0UgQlJBVCBcdTRFM0JcdTk4OThcdTUyMTdcdTg4NjhcdTRFMkRcdTc5RkJcdTk2NjRcdUZGMENcdTRFNEJcdTU0MEVcdTRFMERcdTRGMUFcdTUxOERcdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBcdTMwMDJcdTRFMERcdThGQzdcdTRFM0JcdTk4OThcdTY1ODdcdTRFRjZcdTRFQ0RcdTcxMzZcdTRGRERcdTc1NTlcdTU3MjhcdTVFOTNcdTRFMkRcdTMwMDJcdTU5ODJcdTk3MDBcdTUyMjBcdTk2NjRcdUZGMENcdThCRjdcdTUyNERcdTVGODBcdTIwMUNcdThCQkVcdTdGNkUgPiBcdTU5MTZcdTg5QzJcdTIwMURcdTRFMkRcdTc5RkJcdTk2NjRcdThCRTVcdTRFM0JcdTk4OThcdTMwMDJgLFxuXHR9LFxuXHR2ZXJzaW9uU3VnZ2VzdE1vZGFsOiB7XG5cdFx0dGl0bGU6IFwiXHU5MDA5XHU2MkU5XHU3MjQ4XHU2NzJDXCIsXG5cdFx0cGxhY2Vob2xkZXI6IChyZXBvc2l0b3J5OiBzdHJpbmcpOiBzdHJpbmcgPT4gYFx1OEY5M1x1NTE2NVx1NTE3M1x1OTUyRVx1OEJDRFx1RkYwQ1x1NjQxQ1x1N0QyMiAke3JlcG9zaXRvcnl9IFx1NzY4NFx1NzI0OFx1NjcyQ2AsXG5cdFx0dmVyc2lvbkxhYmVsOiAodmVyc2lvbjogc3RyaW5nKTogc3RyaW5nID0+ICh2ZXJzaW9uID09PSBcImxhdGVzdFwiID8gXCJcdTY3MDBcdTY1QjBcdTcyNDhcdTY3MkNcIiA6IHZlcnNpb24pLFxuXHRcdGluc3RydWN0aW9uczoge1xuXHRcdFx0bmF2aWdhdGVWZXJzaW9uczogXCJcdTZENEZcdTg5QzhcdTcyNDhcdTY3MkNcIixcblx0XHRcdHNlbGVjdFZlcnNpb246IFwiXHU5MDA5XHU2MkU5XHU3MjQ4XHU2NzJDXCIsXG5cdFx0XHRkaXNtaXNzTW9kYWw6IFwiXHU1MTczXHU5NUVEXHU1RjM5XHU3QTk3XCIsXG5cdFx0fSxcblx0XHRwcmVyZWxlYXNlU3VmZml4OiBcIlx1RkYwOFx1OTg4NFx1NTNEMVx1NUUwM1x1RkYwOVwiLFxuXHR9LFxufSBzYXRpc2ZpZXMgTG9jYWxlU3RyaW5ncztcbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsYXRmb3JtIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSBCcmF0UGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5cbi8qKlxuICogRGlzcGxheXMgYSBub3RpY2UgdG8gdGhlIHVzZXJcbiAqXG4gKiBAcGFyYW0gcGx1Z2luICAgICAgICAgICAgICAtIFBsdWdpbiBvYmplY3RcbiAqIEBwYXJhbSBtc2cgICAgICAgICAgICAgICAgIC0gVGV4dCB0byBkaXNwbGF5IHRvIHRoZSB1c2VyXG4gKiBAcGFyYW0gdGltZW91dEluU2Vjb25kcyAgICAtIE51bWJlciBvZiBzZWNvbmRzIHRvIHNob3cgdGhlIFRvYXN0IG1lc3NhZ2VcbiAqIEBwYXJhbSBjb250ZXh0TWVudUNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gY2FsbCBpZiByaWdodCBtb3VzZSBjbGlja2VkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2FzdE1lc3NhZ2UoXG5cdHBsdWdpbjogQnJhdFBsdWdpbixcblx0bXNnOiBzdHJpbmcsXG5cdHRpbWVvdXRJblNlY29uZHMgPSAxMCxcblx0Y29udGV4dE1lbnVDYWxsYmFjaz86ICgpID0+IHZvaWQsXG4pOiB2b2lkIHtcblx0aWYgKCFwbHVnaW4uc2V0dGluZ3Mubm90aWZpY2F0aW9uc0VuYWJsZWQpIHJldHVybjtcblx0Y29uc3QgYWRkaXRpb25hbEluZm8gPSBjb250ZXh0TWVudUNhbGxiYWNrXG5cdFx0PyBQbGF0Zm9ybS5pc0Rlc2t0b3Bcblx0XHRcdD8gXCIoY2xpY2s9ZGlzbWlzcywgcmlnaHQtY2xpY2s9SW5mbylcIlxuXHRcdFx0OiBcIihjbGljaz1kaXNtaXNzKVwiXG5cdFx0OiBcIlwiO1xuXHRjb25zdCBuZXdOb3RpY2U6IE5vdGljZSA9IG5ldyBOb3RpY2UoXG5cdFx0YEJSQVRcXG4ke21zZ31cXG4ke2FkZGl0aW9uYWxJbmZvfWAsXG5cdFx0dGltZW91dEluU2Vjb25kcyAqIDEwMDAsXG5cdCk7XG5cdGlmIChjb250ZXh0TWVudUNhbGxiYWNrKVxuXHRcdG5ld05vdGljZS5tZXNzYWdlRWwub25jb250ZXh0bWVudSA9ICgpID0+IHtcblx0XHRcdGNvbnRleHRNZW51Q2FsbGJhY2soKTtcblx0XHR9O1xufVxuIiwgImltcG9ydCB7IGdldFRyYW5zbGF0aW9ucyB9IGZyb20gXCIuLi9pMThuXCI7XG5cbmV4cG9ydCBjb25zdCBwcm9tb3Rpb25hbExpbmtzID0gKGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudCwgc2V0dGluZ3NUYWIgPSB0cnVlKTogSFRNTEVsZW1lbnQgPT4ge1xuXHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuY29tbW9uLnByb21vdGlvbmFsO1xuXHRjb25zdCBsaW5rc0RpdiA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcImJyYXQtcHJvbW90aW9uYWwtbGlua3NcIiB9KTtcblxuXHRpZiAoIXNldHRpbmdzVGFiKSB7XG5cdFx0bGlua3NEaXYuYWRkQ2xhc3MoXCJicmF0LXByb21vdGlvbmFsLWxpbmtzLW1vZGFsXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxpbmtzRGl2LmFkZENsYXNzKFwiYnJhdC1wcm9tb3Rpb25hbC1saW5rcy1zZXR0aW5nc1wiKTtcblx0fVxuXG5cdGNvbnN0IHR3aXR0ZXJTcGFuID0gbGlua3NEaXYuY3JlYXRlRGl2KFwiY29mZmVlXCIpO1xuXHR0d2l0dGVyU3Bhbi5hZGRDbGFzcyhcImV4LXR3aXR0ZXItc3BhblwiKTtcblx0dHdpdHRlclNwYW4uYWRkQ2xhc3MoXCJicmF0LXByb21vdGlvbmFsLWxpbmtzLWNvZmZlZVwiKTtcblx0Y29uc3QgY2FwdGlvblRleHQgPSB0d2l0dGVyU3Bhbi5jcmVhdGVEaXYoKTtcblx0Y2FwdGlvblRleHQuaW5uZXJUZXh0ID0gdGV4dC5sZWFybk1vcmU7XG5cdHR3aXR0ZXJTcGFuLmFwcGVuZENoaWxkKGNhcHRpb25UZXh0KTtcblx0Y29uc3QgdHdpdHRlckxpbmsgPSB0d2l0dGVyU3Bhbi5jcmVhdGVFbChcImFcIiwge1xuXHRcdGhyZWY6IFwiaHR0cHM6Ly90ZnRoYWNrZXIuY29tXCIsXG5cdH0pO1xuXHR0d2l0dGVyTGluay5pbm5lclRleHQgPSBcImh0dHBzOi8vdGZ0aGFja2VyLmNvbVwiO1xuXG5cdHJldHVybiBsaW5rc0Rpdjtcbn07XG4iLCAiaW1wb3J0IHsgdHlwZSBBcHAsIFN1Z2dlc3RNb2RhbCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBSZWxlYXNlVmVyc2lvbiB9IGZyb20gXCJzcmMvZmVhdHVyZXMvZ2l0aHViVXRpbHNcIjtcbmltcG9ydCB7IGdldFRyYW5zbGF0aW9ucyB9IGZyb20gXCIuLi9pMThuXCI7XG5cbmV4cG9ydCBjbGFzcyBWZXJzaW9uU3VnZ2VzdE1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPFJlbGVhc2VWZXJzaW9uPiB7XG5cdHNlbGVjdGVkOiBzdHJpbmc7XG5cdHZlcnNpb25zOiBSZWxlYXNlVmVyc2lvbltdO1xuXHRvbkNob29zZTogKHZlcnNpb246IHN0cmluZykgPT4gdm9pZDtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcmVwb3NpdG9yeTogc3RyaW5nLCB2ZXJzaW9uczogUmVsZWFzZVZlcnNpb25bXSwgc2VsZWN0ZWQ6IHN0cmluZywgb25DaG9vc2U6ICh2ZXJzaW9uOiBzdHJpbmcpID0+IHZvaWQpIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKS52ZXJzaW9uU3VnZ2VzdE1vZGFsO1xuXHRcdHRoaXMudmVyc2lvbnMgPSB2ZXJzaW9ucztcblx0XHR0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG5cdFx0dGhpcy5vbkNob29zZSA9IG9uQ2hvb3NlO1xuXHRcdHRoaXMuc2V0VGl0bGUodGV4dC50aXRsZSk7XG5cdFx0dGhpcy5zZXRQbGFjZWhvbGRlcih0ZXh0LnBsYWNlaG9sZGVyKHJlcG9zaXRvcnkpKTtcblx0XHR0aGlzLnNldEluc3RydWN0aW9ucyhbXG5cdFx0XHR7IGNvbW1hbmQ6IFwiXHUyMTkxXHUyMTkzXCIsIHB1cnBvc2U6IHRleHQuaW5zdHJ1Y3Rpb25zLm5hdmlnYXRlVmVyc2lvbnMgfSxcblx0XHRcdHsgY29tbWFuZDogXCJcdTIxQjVcIiwgcHVycG9zZTogdGV4dC5pbnN0cnVjdGlvbnMuc2VsZWN0VmVyc2lvbiB9LFxuXHRcdFx0eyBjb21tYW5kOiBcImVzY1wiLCBwdXJwb3NlOiB0ZXh0Lmluc3RydWN0aW9ucy5kaXNtaXNzTW9kYWwgfSxcblx0XHRdKTtcblx0fVxuXG5cdGdldFN1Z2dlc3Rpb25zKHF1ZXJ5OiBzdHJpbmcpOiBSZWxlYXNlVmVyc2lvbltdIHtcblx0XHRjb25zdCBsb3dlclF1ZXJ5ID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gdGhpcy52ZXJzaW9ucy5maWx0ZXIoKHZlcnNpb24pID0+IHZlcnNpb24udmVyc2lvbi50b0xvd2VyQ2FzZSgpLmNvbnRhaW5zKGxvd2VyUXVlcnkpKTtcblx0fVxuXG5cdHJlbmRlclN1Z2dlc3Rpb24odmVyc2lvbjogUmVsZWFzZVZlcnNpb24sIGVsOiBIVE1MRWxlbWVudCkge1xuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKS52ZXJzaW9uU3VnZ2VzdE1vZGFsO1xuXHRcdGVsLmNyZWF0ZUVsKFwiZGl2XCIsIHtcblx0XHRcdHRleHQ6IGAke3RleHQudmVyc2lvbkxhYmVsKHZlcnNpb24udmVyc2lvbil9ICR7dmVyc2lvbi5wcmVyZWxlYXNlID8gdGV4dC5wcmVyZWxlYXNlU3VmZml4IDogXCJcIn1gLFxuXHRcdH0pO1xuXHR9XG5cblx0b25DaG9vc2VTdWdnZXN0aW9uKHZlcnNpb246IFJlbGVhc2VWZXJzaW9uKSB7XG5cdFx0dGhpcy5vbkNob29zZSh2ZXJzaW9uLnZlcnNpb24pO1xuXHR9XG5cblx0b25Ob1N1Z2dlc3Rpb24oKTogdm9pZCB7XG5cdFx0dGhpcy5vbkNob29zZSh0aGlzLnNlbGVjdGVkID8gdGhpcy5zZWxlY3RlZCA6IFwiXCIpO1xuXHRcdHRoaXMuY2xvc2UoKTtcblx0fVxufVxuIiwgImltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGVyZSBpcyBhbiBpbnRlcm5ldCBjb25uZWN0aW9uXG4gKiBAcmV0dXJucyB0cnVlIGlmIGNvbm5lY3RlZCwgZmFsc2UgaWYgbm8gaW50ZXJuZXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQ29ubmVjdGVkVG9JbnRlcm5ldCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0dHJ5IHtcblx0XHRjb25zdCBvbmxpbmUgPSBhd2FpdCByZXF1ZXN0VXJsKGBodHRwczovL29ic2lkaWFuLm1kLz8ke01hdGgucmFuZG9tKCl9YCk7XG5cdFx0cmV0dXJuIG9ubGluZS5zdGF0dXMgPj0gMjAwICYmIG9ubGluZS5zdGF0dXMgPCAzMDA7XG5cdH0gY2F0Y2gge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIiwgImltcG9ydCB0eXBlIHsgVGhlbWVNYW5pZmVzdCB9IGZyb20gXCJAb2JzaWRpYW4tdHlwaW5ncy9vYnNpZGlhbi1wdWJsaWMtMS4xMS40XCI7XG5pbXBvcnQgeyBOb3RpY2UsIG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGdldFRyYW5zbGF0aW9ucyB9IGZyb20gXCIuLi9pMThuXCI7XG5pbXBvcnQgdHlwZSBCcmF0UGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5pbXBvcnQgeyBhZGRCZXRhVGhlbWVUb0xpc3QsIHVwZGF0ZUJldGFUaGVtZUxhc3RVcGRhdGVDaGVja3N1bSB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgaXNDb25uZWN0ZWRUb0ludGVybmV0IH0gZnJvbSBcIi4uL3V0aWxzL2ludGVybmV0Y29ubmVjdGlvblwiO1xuaW1wb3J0IHsgdG9hc3RNZXNzYWdlIH0gZnJvbSBcIi4uL3V0aWxzL25vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IGNoZWNrc3VtRm9yU3RyaW5nLCBncmFiQ2hlY2tzdW1PZlRoZW1lQ3NzRmlsZSwgZ3JhYkNvbW1tdW5pdHlUaGVtZUNzc0ZpbGUsIGdyYWJDb21tbXVuaXR5VGhlbWVNYW5pZmVzdEZpbGUgfSBmcm9tIFwiLi9naXRodWJVdGlsc1wiO1xuXG4vKipcbiAqIEluc3RhbGxzIG9yIHVwZGF0ZXMgYSB0aGVtZVxuICpcbiAqIEBwYXJhbSBwbHVnaW4gICAgICAgICAgICAgIC0gVGhlUGx1Z2luXG4gKiBAcGFyYW0gY3NzR2l0aHViUmVwb3NpdG9yeSAtIFRoZSByZXBvc2l0b3J5IHdpdGggdGhlIHRoZW1lXG4gKiBAcGFyYW0gbmV3SW5zdGFsbCAgICAgICAgICAtIHRydWUgPSBOZXcgdGhlbWUgaW5zdGFsbCwgZmFsc2UgdXBkYXRlIHRoZSB0aGVtZVxuICpcbiAqIEByZXR1cm5zIHRydWUgZm9yIHN1Y2NjZXNzXG4gKi9cbmV4cG9ydCBjb25zdCB0aGVtZVNhdmUgPSBhc3luYyAocGx1Z2luOiBCcmF0UGx1Z2luLCBjc3NHaXRodWJSZXBvc2l0b3J5OiBzdHJpbmcsIG5ld0luc3RhbGw6IGJvb2xlYW4pOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcblx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpLnRoZW1lTWVzc2FnZXM7XG5cdC8vIHRlc3QgZm9yIHRoZW1lcy1iZXRhLmNzc1xuXHRsZXQgdGhlbWVDc3MgPSBhd2FpdCBncmFiQ29tbW11bml0eVRoZW1lQ3NzRmlsZShjc3NHaXRodWJSZXBvc2l0b3J5LCB0cnVlLCBwbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSk7XG5cdC8vIGdyYWJlIHRoZW1lcy5jc3MgaWYgbm8gYmV0YVxuXHRpZiAoIXRoZW1lQ3NzKSB0aGVtZUNzcyA9IGF3YWl0IGdyYWJDb21tbXVuaXR5VGhlbWVDc3NGaWxlKGNzc0dpdGh1YlJlcG9zaXRvcnksIGZhbHNlLCBwbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSk7XG5cblx0aWYgKCF0aGVtZUNzcykge1xuXHRcdHRvYXN0TWVzc2FnZShwbHVnaW4sIHRleHQubm9UaGVtZUNzc0ZpbGUpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNvbnN0IHRoZW1lTWFuaWZlc3QgPSBhd2FpdCBncmFiQ29tbW11bml0eVRoZW1lTWFuaWZlc3RGaWxlKGNzc0dpdGh1YlJlcG9zaXRvcnksIHBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKTtcblx0aWYgKCF0aGVtZU1hbmlmZXN0KSB7XG5cdFx0dG9hc3RNZXNzYWdlKHBsdWdpbiwgdGV4dC5ub01hbmlmZXN0RmlsZSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y29uc3QgbWFuaWZlc3RJbmZvID0gKGF3YWl0IEpTT04ucGFyc2UodGhlbWVNYW5pZmVzdCkpIGFzIFRoZW1lTWFuaWZlc3Q7XG5cblx0Y29uc3QgdGhlbWVUYXJnZXRGb2xkZXJQYXRoID0gbm9ybWFsaXplUGF0aCh0aGVtZXNSb290UGF0aChwbHVnaW4pICsgbWFuaWZlc3RJbmZvLm5hbWUpO1xuXG5cdGNvbnN0IHsgYWRhcHRlciB9ID0gcGx1Z2luLmFwcC52YXVsdDtcblx0aWYgKCEoYXdhaXQgYWRhcHRlci5leGlzdHModGhlbWVUYXJnZXRGb2xkZXJQYXRoKSkpIGF3YWl0IGFkYXB0ZXIubWtkaXIodGhlbWVUYXJnZXRGb2xkZXJQYXRoKTtcblxuXHRhd2FpdCBhZGFwdGVyLndyaXRlKG5vcm1hbGl6ZVBhdGgoYCR7dGhlbWVUYXJnZXRGb2xkZXJQYXRofS90aGVtZS5jc3NgKSwgdGhlbWVDc3MpO1xuXHRhd2FpdCBhZGFwdGVyLndyaXRlKG5vcm1hbGl6ZVBhdGgoYCR7dGhlbWVUYXJnZXRGb2xkZXJQYXRofS9tYW5pZmVzdC5qc29uYCksIHRoZW1lTWFuaWZlc3QpO1xuXG5cdHVwZGF0ZUJldGFUaGVtZUxhc3RVcGRhdGVDaGVja3N1bShwbHVnaW4sIGNzc0dpdGh1YlJlcG9zaXRvcnksIGNoZWNrc3VtRm9yU3RyaW5nKHRoZW1lQ3NzKSk7XG5cblx0bGV0IG1zZyA9IFwiXCI7XG5cblx0aWYgKG5ld0luc3RhbGwpIHtcblx0XHRhZGRCZXRhVGhlbWVUb0xpc3QocGx1Z2luLCBjc3NHaXRodWJSZXBvc2l0b3J5LCB0aGVtZUNzcyk7XG5cdFx0bXNnID0gdGV4dC5pbnN0YWxsZWQobWFuaWZlc3RJbmZvLm5hbWUsIGNzc0dpdGh1YlJlcG9zaXRvcnkpO1xuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHBsdWdpbi5hcHAuY3VzdG9tQ3NzLnNldFRoZW1lKG1hbmlmZXN0SW5mby5uYW1lKTtcblx0XHR9LCA1MDApO1xuXHR9IGVsc2Uge1xuXHRcdG1zZyA9IHRleHQudXBkYXRlZChtYW5pZmVzdEluZm8ubmFtZSwgY3NzR2l0aHViUmVwb3NpdG9yeSk7XG5cdH1cblxuXHR2b2lkIHBsdWdpbi5sb2coYCR7bXNnfVtUaGVtZSBJbmZvXShodHRwczovL2dpdGh1Yi5jb20vJHtjc3NHaXRodWJSZXBvc2l0b3J5fSlgLCBmYWxzZSk7XG5cdHRvYXN0TWVzc2FnZShwbHVnaW4sIG1zZywgMjAsICgpOiB2b2lkID0+IHtcblx0XHR3aW5kb3cub3BlbihgaHR0cHM6Ly9naXRodWIuY29tLyR7Y3NzR2l0aHViUmVwb3NpdG9yeX1gKTtcblx0fSk7XG5cdHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBDaGVja3MgIGlmIHRoZXJlICBhcmUgdGhlbWUgdXBkYXRlcyBiYXNlZCBvbiB0aGUgY29tbWl0IGRhdGUgb2YgdGhlIG9ic2lkaWFuLmNzcyBmaWxlIG9uIGdpdGh1YiBpbiBjb21wYXJpc29uIHRvIHdoYXQgaXMgc3RvcmVkIGluIHRoZSBCUkFUIHRoZW1lIGxpc3RcbiAqXG4gKiBAcGFyYW0gcGx1Z2luICAgLSBUaGVQbHVnaW5cbiAqIEBwYXJhbSBzaG93SW5mbyAtIHByb3ZpZGUgIG5vdGljZXMgZHVyaW5nIHRoZSB1cGRhdGUgcHJvY2VzXG4gKlxuICovXG5leHBvcnQgY29uc3QgdGhlbWVzQ2hlY2tBbmRVcGRhdGVzID0gYXN5bmMgKHBsdWdpbjogQnJhdFBsdWdpbiwgc2hvd0luZm86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0aWYgKCEoYXdhaXQgaXNDb25uZWN0ZWRUb0ludGVybmV0KCkpKSB7XG5cdFx0Y29uc29sZS5kZWJ1ZyhcIkJSQVQ6IE5vIGludGVybmV0IGRldGVjdGVkLlwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0bGV0IG5ld05vdGljZTogTm90aWNlIHwgdW5kZWZpbmVkO1xuXHRjb25zdCBtc2cxID0gXCJDaGVja2luZyBmb3IgYmV0YSB0aGVtZSB1cGRhdGVzIFNUQVJURURcIjtcblx0YXdhaXQgcGx1Z2luLmxvZyhtc2cxLCB0cnVlKTtcblx0aWYgKHNob3dJbmZvICYmIHBsdWdpbi5zZXR0aW5ncy5ub3RpZmljYXRpb25zRW5hYmxlZCkgbmV3Tm90aWNlID0gbmV3IE5vdGljZShgQlJBVFxcbiR7bXNnMX1gLCAzMDAwMCk7XG5cdGZvciAoY29uc3QgdCBvZiBwbHVnaW4uc2V0dGluZ3MudGhlbWVzTGlzdCkge1xuXHRcdC8vIGZpcnN0IHRlc3QgdG8gc2VlIGlmIHRoZW1lLWJldGEuY3NzIGV4aXN0c1xuXHRcdGxldCBsYXN0VXBkYXRlT25saW5lID0gYXdhaXQgZ3JhYkNoZWNrc3VtT2ZUaGVtZUNzc0ZpbGUodC5yZXBvLCB0cnVlLCBwbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSk7XG5cdFx0Ly8gaWYgdGhlbWUtYmV0YS5jc3MgZG9lcyBOT1QgZXhpc3QsIHRyeSB0byBnZXQgdGhlbWUuY3NzXG5cdFx0aWYgKGxhc3RVcGRhdGVPbmxpbmUgPT09IFwiMFwiKSBsYXN0VXBkYXRlT25saW5lID0gYXdhaXQgZ3JhYkNoZWNrc3VtT2ZUaGVtZUNzc0ZpbGUodC5yZXBvLCBmYWxzZSwgcGx1Z2luLnNldHRpbmdzLmRlYnVnZ2luZ01vZGUpO1xuXHRcdGNvbnNvbGUuZGVidWcoXCJCUkFUOiBsYXN0VXBkYXRlT25saW5lXCIsIGxhc3RVcGRhdGVPbmxpbmUpO1xuXHRcdGlmIChsYXN0VXBkYXRlT25saW5lICE9PSB0Lmxhc3RVcGRhdGUpIGF3YWl0IHRoZW1lU2F2ZShwbHVnaW4sIHQucmVwbywgZmFsc2UpO1xuXHR9XG5cdGNvbnN0IG1zZzIgPSBcIkNoZWNraW5nIGZvciBiZXRhIHRoZW1lIHVwZGF0ZXMgQ09NUExFVEVEXCI7XG5cdGF3YWl0IHBsdWdpbi5sb2cobXNnMiwgdHJ1ZSk7XG5cdGlmIChzaG93SW5mbykge1xuXHRcdGlmIChwbHVnaW4uc2V0dGluZ3Mubm90aWZpY2F0aW9uc0VuYWJsZWQgJiYgbmV3Tm90aWNlKSBuZXdOb3RpY2UuaGlkZSgpO1xuXHRcdHRvYXN0TWVzc2FnZShwbHVnaW4sIG1zZzIpO1xuXHR9XG59O1xuXG4vKipcbiAqIERlbGV0ZXMgYSB0aGVtZSBmcm9tIHRoZSBCUkFUIGxpc3QgKERvZXMgbm90IHBoeXNpY2FsbHkgZGVsZXRlIHRoZSB0aGVtZSlcbiAqXG4gKiBAcGFyYW0gcGx1Z2luICAgICAgICAgICAgICAtIFRoZVBsdWdpblxuICogQHBhcmFtIGNzc0dpdGh1YlJlcG9zaXRvcnkgLSBSZXBvc2l0b3J5IHBhdGhcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCB0aGVtZURlbGV0ZSA9IChwbHVnaW46IEJyYXRQbHVnaW4sIGNzc0dpdGh1YlJlcG9zaXRvcnk6IHN0cmluZyk6IHZvaWQgPT4ge1xuXHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkudGhlbWVNZXNzYWdlcztcblx0cGx1Z2luLnNldHRpbmdzLnRoZW1lc0xpc3QgPSBwbHVnaW4uc2V0dGluZ3MudGhlbWVzTGlzdC5maWx0ZXIoKHQpID0+IHQucmVwbyAhPT0gY3NzR2l0aHViUmVwb3NpdG9yeSk7XG5cdHZvaWQgcGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRjb25zdCBtc2cgPSB0ZXh0LnJlbW92ZWQoY3NzR2l0aHViUmVwb3NpdG9yeSk7XG5cdHZvaWQgcGx1Z2luLmxvZyhtc2csIHRydWUpO1xuXHR0b2FzdE1lc3NhZ2UocGx1Z2luLCBtc2cpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggdG8gdGhlIHRoZW1lcyBmb2xkZXIgZm8gcnRoaXMgdmF1bHRcbiAqXG4gKiBAcGFyYW0gcGx1Z2luIC0gVGhQbHVnaW5cbiAqXG4gKiBAcmV0dXJucyBwYXRoIHRvIHRoZW1lcyBmb2xkZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHRoZW1lc1Jvb3RQYXRoID0gKHBsdWdpbjogQnJhdFBsdWdpbik6IHN0cmluZyA9PiB7XG5cdHJldHVybiBgJHtub3JtYWxpemVQYXRoKGAke3BsdWdpbi5hcHAudmF1bHQuY29uZmlnRGlyfS90aGVtZXNgKX0vYDtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIHsgU2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuXG4vKipcbiAqIE1pZ3JhdGlvbiBsb2cgZW50cnkgZm9yIHRyYWNraW5nIHdoaWNoIG1pZ3JhdGlvbnMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqL1xuaW50ZXJmYWNlIE1pZ3JhdGlvbkxvZyB7XG5cdGFwcGxpZWRNaWdyYXRpb25zOiBzdHJpbmdbXTtcbn1cblxuY29uc3QgTUlHUkFUSU9OX0xPR19LRVkgPSBcImJyYXQtbWlncmF0aW9uc1wiO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1pZ3JhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gaGFzTWlncmF0aW9uUnVuKFxuXHRhcHA6IEFwcCxcblx0bWlncmF0aW9uSWQ6IHN0cmluZyxcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHR0cnkge1xuXHRcdGNvbnN0IGxvZ0RhdGEgPSBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5yZWFkKFxuXHRcdFx0YCR7YXBwLnZhdWx0LmNvbmZpZ0Rpcn0vcGx1Z2lucy9vYnNpZGlhbjQyLWJyYXQvJHtNSUdSQVRJT05fTE9HX0tFWX0uanNvbmAsXG5cdFx0KTtcblx0XHRjb25zdCBsb2cgPSBKU09OLnBhcnNlKGxvZ0RhdGEpIGFzIE1pZ3JhdGlvbkxvZztcblx0XHRyZXR1cm4gbG9nLmFwcGxpZWRNaWdyYXRpb25zLmluY2x1ZGVzKG1pZ3JhdGlvbklkKTtcblx0fSBjYXRjaCB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbi8qKlxuICogTWFya3MgYSBtaWdyYXRpb24gYXMgY29tcGxldGVkXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG1hcmtNaWdyYXRpb25Db21wbGV0ZShcblx0YXBwOiBBcHAsXG5cdG1pZ3JhdGlvbklkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRjb25zdCBsb2dQYXRoID0gYCR7YXBwLnZhdWx0LmNvbmZpZ0Rpcn0vcGx1Z2lucy9vYnNpZGlhbjQyLWJyYXQvJHtNSUdSQVRJT05fTE9HX0tFWX0uanNvbmA7XG5cdFx0bGV0IGxvZzogTWlncmF0aW9uTG9nID0geyBhcHBsaWVkTWlncmF0aW9uczogW10gfTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBsb2dEYXRhID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIucmVhZChsb2dQYXRoKTtcblx0XHRcdGxvZyA9IEpTT04ucGFyc2UobG9nRGF0YSkgYXMgTWlncmF0aW9uTG9nO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0Ly8gTm8gZXhpc3RpbmcgbG9nLCBzdGFydCBmcmVzaFxuXHRcdH1cblxuXHRcdGlmICghbG9nLmFwcGxpZWRNaWdyYXRpb25zLmluY2x1ZGVzKG1pZ3JhdGlvbklkKSkge1xuXHRcdFx0bG9nLmFwcGxpZWRNaWdyYXRpb25zLnB1c2gobWlncmF0aW9uSWQpO1xuXHRcdFx0YXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobG9nUGF0aCwgSlNPTi5zdHJpbmdpZnkobG9nLCBudWxsLCAyKSk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRgQlJBVDogRmFpbGVkIHRvIG1hcmsgbWlncmF0aW9uICR7bWlncmF0aW9uSWR9IGNvbXBsZXRlOmAsXG5cdFx0XHRlcnJvcixcblx0XHQpO1xuXHR9XG59XG5cbi8qKlxuICogTWlncmF0ZXMgdG9rZW5zIGZyb20gc2V0dGluZ3MgdG8gU2VjcmV0U3RvcmFnZSAoT2JzaWRpYW4gMS4xMS40KylcbiAqXG4gKiBUaGlzIG1pZ3JhdGlvbiBtb3ZlczpcbiAqIDEuIEdsb2JhbCBwZXJzb25hbCBhY2Nlc3MgdG9rZW4gZnJvbSBzZXR0aW5ncy5wZXJzb25hbEFjY2Vzc1Rva2VuXG4gKiAyLiBQZXItcmVwb3NpdG9yeSB0b2tlbnMgZnJvbSBzZXR0aW5ncy5wbHVnaW5TdWJMaXN0RnJvemVuVmVyc2lvbltdLnRva2VuXG4gKlxuICogU2VjcmV0IElEcyBjcmVhdGVkIChsb3dlcmNhc2UsIG51bWJlcnMsIGRhc2hlcyBvbmx5LCBtYXggNjQgY2hhcnMpOlxuICogLSAnYnJhdC1naC1nbG9iYWwnIGZvciB0aGUgZ2xvYmFsIFBBVFxuICogLSAnYnJhdC1naC17b3duZXJ9LXtyZXBvfScgZm9yIHBlci1yZXBvc2l0b3J5IHRva2Vuc1xuICpcbiAqIERlZHVwbGljYXRpb246IElmIHRoZSBzYW1lIHRva2VuIHZhbHVlIGFscmVhZHkgZXhpc3RzIGluIGEgc2VjcmV0LFxuICogdGhhdCBzZWNyZXQgbmFtZSBpcyByZXVzZWQgaW5zdGVhZCBvZiBjcmVhdGluZyBhIGR1cGxpY2F0ZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGVUb2tlbnNUb1NlY3JldFN0b3JhZ2UoXG5cdGFwcDogQXBwLFxuXHRzZXR0aW5nczogU2V0dGluZ3MsXG5cdHNhdmVTZXR0aW5nczogKCkgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCBNSUdSQVRJT05fSUQgPSBcInRva2Vucy10by1zZWNyZXRzdG9yYWdlLXYxXCI7XG5cblx0Ly8gQ2hlY2sgaWYgbWlncmF0aW9uIGFscmVhZHkgcmFuXG5cdGlmIChhd2FpdCBoYXNNaWdyYXRpb25SdW4oYXBwLCBNSUdSQVRJT05fSUQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRsZXQgbWlncmF0ZWQgPSAwO1xuXG5cdFx0Ly8gSGVscGVyOiBDb252ZXJ0IHJlcG8gcGF0aCB0byB2YWxpZCBzZWNyZXQgSURcblx0XHQvLyBWYWxpZDogbG93ZXJjYXNlIGxldHRlcnMsIG51bWJlcnMsIGRhc2hlcyBvbmx5LCBtYXggNjQgY2hhcnNcblx0XHRjb25zdCBjcmVhdGVTZWNyZXRJZCA9IChyZXBvOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuXHRcdFx0Y29uc3Qgbm9ybWFsaXplZCA9IHJlcG9cblx0XHRcdFx0LnRvTG93ZXJDYXNlKClcblx0XHRcdFx0LnJlcGxhY2UoL1teYS16MC05LV0vZywgXCItXCIpIC8vIFJlcGxhY2UgaW52YWxpZCBjaGFycyB3aXRoIGRhc2hlc1xuXHRcdFx0XHQucmVwbGFjZSgvLSsvZywgXCItXCIpIC8vIFJlcGxhY2UgbXVsdGlwbGUgZGFzaGVzIHdpdGggc2luZ2xlIGRhc2hcblx0XHRcdFx0LnJlcGxhY2UoL14tfC0kL2csIFwiXCIpOyAvLyBSZW1vdmUgbGVhZGluZy90cmFpbGluZyBkYXNoZXNcblxuXHRcdFx0Y29uc3QgaWQgPSBgYnJhdC1naC0ke25vcm1hbGl6ZWR9YDtcblxuXHRcdFx0Ly8gVHJ1bmNhdGUgaWYgdG9vIGxvbmcgKG1heCA2NCBjaGFycylcblx0XHRcdHJldHVybiBpZC5sZW5ndGggPiA2NCA/IGlkLnN1YnN0cmluZygwLCA2NCkucmVwbGFjZSgvLSQvLCBcIlwiKSA6IGlkO1xuXHRcdH07XG5cblx0XHQvLyBIZWxwZXI6IEZpbmQgZXhpc3Rpbmcgc2VjcmV0IHdpdGggc2FtZSB2YWx1ZSAoZm9yIGRlZHVwbGljYXRpb24pXG5cdFx0Y29uc3QgZmluZEV4aXN0aW5nU2VjcmV0ID0gKHRva2VuVmFsdWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xuXHRcdFx0Y29uc3QgYWxsU2VjcmV0cyA9IGFwcC5zZWNyZXRTdG9yYWdlLmxpc3RTZWNyZXRzKCk7XG5cdFx0XHRmb3IgKGNvbnN0IHNlY3JldE5hbWUgb2YgYWxsU2VjcmV0cykge1xuXHRcdFx0XHRjb25zdCBzZWNyZXRWYWx1ZSA9IGFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChzZWNyZXROYW1lKTtcblx0XHRcdFx0aWYgKHNlY3JldFZhbHVlID09PSB0b2tlblZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlY3JldE5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cblx0XHQvLyBIZWxwZXI6IENyZWF0ZSBvciBmaW5kIHNlY3JldCBmb3IgYSB0b2tlbiB2YWx1ZVxuXHRcdGNvbnN0IGdldE9yQ3JlYXRlU2VjcmV0ID0gKFxuXHRcdFx0dG9rZW5WYWx1ZTogc3RyaW5nLFxuXHRcdFx0c2VjcmV0SWQ6IHN0cmluZyxcblx0XHQpOiBzdHJpbmcgPT4ge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhpcyBleGFjdCB0b2tlbiBhbHJlYWR5IGV4aXN0c1xuXHRcdFx0Y29uc3QgZXhpc3RpbmcgPSBmaW5kRXhpc3RpbmdTZWNyZXQodG9rZW5WYWx1ZSk7XG5cdFx0XHRpZiAoZXhpc3RpbmcpIHtcblx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhgQlJBVDogUmV1c2luZyBleGlzdGluZyBzZWNyZXQgXCIke2V4aXN0aW5nfVwiYCk7XG5cdFx0XHRcdHJldHVybiBleGlzdGluZztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ3JlYXRlIG5ldyBzZWNyZXRcblx0XHRcdGFwcC5zZWNyZXRTdG9yYWdlLnNldFNlY3JldChzZWNyZXRJZCwgdG9rZW5WYWx1ZSk7XG5cdFx0XHRjb25zb2xlLmRlYnVnKGBCUkFUOiBDcmVhdGVkIG5ldyBzZWNyZXQgXCIke3NlY3JldElkfVwiYCk7XG5cdFx0XHRyZXR1cm4gc2VjcmV0SWQ7XG5cdFx0fTtcblxuXHRcdC8vIExlZ2FjeSB0b2tlbiBmaWVsZHMgYXJlIGludGVudGlvbmFsbHkgcmVhZC93cml0dGVuIGR1cmluZyBtaWdyYXRpb24uXG5cdFx0LyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWRlcHJlY2F0ZWQgKi9cblx0XHQvLyBNaWdyYXRlIGdsb2JhbCBwZXJzb25hbCBhY2Nlc3MgdG9rZW5cblx0XHRpZiAoXG5cdFx0XHRzZXR0aW5ncy5wZXJzb25hbEFjY2Vzc1Rva2VuICYmXG5cdFx0XHRzZXR0aW5ncy5wZXJzb25hbEFjY2Vzc1Rva2VuLnRyaW0oKSAhPT0gXCJcIlxuXHRcdCkge1xuXHRcdFx0Y29uc3QgdG9rZW5WYWx1ZSA9IHNldHRpbmdzLnBlcnNvbmFsQWNjZXNzVG9rZW4udHJpbSgpO1xuXHRcdFx0Y29uc3Qgc2VjcmV0SWQgPSBcImJyYXQtZ2gtZ2xvYmFsXCI7XG5cdFx0XHRjb25zdCBzZWNyZXROYW1lID0gZ2V0T3JDcmVhdGVTZWNyZXQodG9rZW5WYWx1ZSwgc2VjcmV0SWQpO1xuXHRcdFx0c2V0dGluZ3MuZ2xvYmFsVG9rZW5OYW1lID0gc2VjcmV0TmFtZTtcblx0XHRcdHNldHRpbmdzLnBlcnNvbmFsQWNjZXNzVG9rZW4gPSBcIlwiO1xuXHRcdFx0bWlncmF0ZWQrKztcblx0XHR9XG5cblx0XHQvLyBNaWdyYXRlIHBlci1yZXBvc2l0b3J5IHRva2Vuc1xuXHRcdGlmIChzZXR0aW5ncy5wbHVnaW5TdWJMaXN0RnJvemVuVmVyc2lvbikge1xuXHRcdFx0Zm9yIChjb25zdCBwbHVnaW4gb2Ygc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24pIHtcblx0XHRcdFx0aWYgKHBsdWdpbi50b2tlbiAmJiBwbHVnaW4udG9rZW4udHJpbSgpICE9PSBcIlwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5WYWx1ZSA9IHBsdWdpbi50b2tlbi50cmltKCk7XG5cdFx0XHRcdFx0Y29uc3Qgc2VjcmV0SWQgPSBjcmVhdGVTZWNyZXRJZChwbHVnaW4ucmVwbyk7XG5cdFx0XHRcdFx0Y29uc3Qgc2VjcmV0TmFtZSA9IGdldE9yQ3JlYXRlU2VjcmV0KHRva2VuVmFsdWUsIHNlY3JldElkKTtcblx0XHRcdFx0XHRwbHVnaW4udG9rZW5OYW1lID0gc2VjcmV0TmFtZTtcblx0XHRcdFx0XHRwbHVnaW4udG9rZW4gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0bWlncmF0ZWQrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1kZXByZWNhdGVkICovXG5cblx0XHQvLyBTYXZlIHNldHRpbmdzIGFmdGVyIGNsZWFyaW5nIHRva2Vuc1xuXHRcdGlmIChtaWdyYXRlZCA+IDApIHtcblx0XHRcdGF3YWl0IHNhdmVTZXR0aW5ncygpO1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgQlJBVDogTWlncmF0ZWQgJHttaWdyYXRlZH0gdG9rZW4ocykgdG8gU2VjcmV0U3RvcmFnZWApO1xuXHRcdH1cblxuXHRcdC8vIE1hcmsgbWlncmF0aW9uIGFzIGNvbXBsZXRlXG5cdFx0YXdhaXQgbWFya01pZ3JhdGlvbkNvbXBsZXRlKGFwcCwgTUlHUkFUSU9OX0lEKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKFwiQlJBVDogRmFpbGVkIHRvIG1pZ3JhdGUgdG9rZW5zIHRvIFNlY3JldFN0b3JhZ2U6XCIsIGVycm9yKTtcblx0XHQvLyBEb24ndCB0aHJvdyAtIGFsbG93IHBsdWdpbiB0byBjb250aW51ZSBsb2FkaW5nXG5cdH1cbn1cbiIsICJpbXBvcnQgeyBCdXR0b25Db21wb25lbnQsIE1vZGFsLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyB0aGVtZVNhdmUgfSBmcm9tIFwiLi4vZmVhdHVyZXMvdGhlbWVzXCI7XG5pbXBvcnQgeyBnZXRUcmFuc2xhdGlvbnMgfSBmcm9tIFwiLi4vaTE4blwiO1xuaW1wb3J0IHR5cGUgQnJhdFBsdWdpbiBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHsgZXhpc3RCZXRhVGhlbWVpbkluTGlzdCB9IGZyb20gXCIuLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgdG9hc3RNZXNzYWdlIH0gZnJvbSBcIi4uL3V0aWxzL25vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IHByb21vdGlvbmFsTGlua3MgfSBmcm9tIFwiLi9Qcm9tb3Rpb25hbFwiO1xuXG4vKipcbiAqIEFkZCBhIGJldGEgdGhlbWUgdG8gdGhlIGxpc3Qgb2YgcGx1Z2lucyBiZWluZyB0cmFja2VkIGFuZCB1cGRhdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZE5ld1RoZW1lIGV4dGVuZHMgTW9kYWwge1xuXHRwbHVnaW46IEJyYXRQbHVnaW47XG5cdGFkZHJlc3M6IHN0cmluZztcblx0b3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkczogYm9vbGVhbjtcblx0b25TdWJtaXR0ZWQ/OiAoKSA9PiB2b2lkO1xuXG5cdGNvbnN0cnVjdG9yKHBsdWdpbjogQnJhdFBsdWdpbiwgb3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcyA9IGZhbHNlLCBvblN1Ym1pdHRlZD86ICgpID0+IHZvaWQpIHtcblx0XHRzdXBlcihwbHVnaW4uYXBwKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0XHR0aGlzLmFkZHJlc3MgPSBcIlwiO1xuXHRcdHRoaXMub3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcyA9IG9wZW5TZXR0aW5nc1RhYkFmdGVyd2FyZHM7XG5cdFx0dGhpcy5vblN1Ym1pdHRlZCA9IG9uU3VibWl0dGVkO1xuXHR9XG5cblx0YXN5bmMgc3VibWl0Rm9ybSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCk7XG5cdFx0aWYgKHRoaXMuYWRkcmVzcyA9PT0gXCJcIikgcmV0dXJuO1xuXHRcdGNvbnN0IHNjcnViYmVkQWRkcmVzcyA9IHRoaXMuYWRkcmVzcy5yZXBsYWNlKFwiaHR0cHM6Ly9naXRodWIuY29tL1wiLCBcIlwiKTtcblx0XHRpZiAoZXhpc3RCZXRhVGhlbWVpbkluTGlzdCh0aGlzLnBsdWdpbiwgc2NydWJiZWRBZGRyZXNzKSkge1xuXHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCB0ZXh0LmFkZEJldGFUaGVtZU1vZGFsLmFscmVhZHlJbkxpc3QsIDEwKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoYXdhaXQgdGhlbWVTYXZlKHRoaXMucGx1Z2luLCBzY3J1YmJlZEFkZHJlc3MsIHRydWUpKSB7XG5cdFx0XHR0aGlzLm9uU3VibWl0dGVkPy4oKTtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHRvbk9wZW4oKTogdm9pZCB7XG5cdFx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpO1xuXHRcdGNvbnN0IGNvbW1vblRleHQgPSB0ZXh0LmNvbW1vbjtcblx0XHR0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbChcImg0XCIsIHtcblx0XHRcdHRleHQ6IHRleHQuYWRkQmV0YVRoZW1lTW9kYWwuaGVhZGluZy5naXRodWJSZXBvc2l0b3J5Rm9yQmV0YVRoZW1lLFxuXHRcdH0pO1xuXHRcdHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKFwiZm9ybVwiLCB7fSwgKGZvcm1FbCkgPT4ge1xuXHRcdFx0Zm9ybUVsLmFkZENsYXNzKFwiYnJhdC1tb2RhbFwiKTtcblx0XHRcdG5ldyBTZXR0aW5nKGZvcm1FbCkuYWRkVGV4dCgodGV4dEVsKSA9PiB7XG5cdFx0XHRcdHRleHRFbC5zZXRQbGFjZWhvbGRlcih0ZXh0LmFkZEJldGFQbHVnaW5Nb2RhbC5yZXBvc2l0b3J5LnBsYWNlaG9sZGVyKTtcblx0XHRcdFx0dGV4dEVsLnNldFZhbHVlKHRoaXMuYWRkcmVzcyk7XG5cdFx0XHRcdHRleHRFbC5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLmFkZHJlc3MgPSB2YWx1ZS50cmltKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0ZXh0RWwuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChlLmtleSA9PT0gXCJFbnRlclwiICYmIHRoaXMuYWRkcmVzcyAhPT0gXCIgXCIpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHZvaWQgdGhpcy5zdWJtaXRGb3JtKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGV4dEVsLmlucHV0RWwuYWRkQ2xhc3MoXCJicmF0LWZ1bGwtd2lkdGgtaW5wdXRcIik7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JzaWRpYW5tZC9wcmVmZXItYWN0aXZlLWRvYyAtLSBCUkFUIGNvbXBhdGliaWxpdHk6IGFjdGl2ZURvY3VtZW50IGJyZWFrcyB0aGlzIG1vZGFsIGZsb3dcblx0XHRcdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2V0dGluZy1pdGVtLWluZm9cIik7XG5cdFx0XHRcdFx0aWYgKHRpdGxlKSB0aXRsZS5yZW1vdmUoKTtcblx0XHRcdFx0XHR0ZXh0RWwuaW5wdXRFbC5mb2N1cygpO1xuXHRcdFx0XHR9LCAxMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Zm9ybUVsLmNyZWF0ZURpdihcIm1vZGFsLWJ1dHRvbi1jb250YWluZXJcIiwgKGJ1dHRvbkNvbnRhaW5lckVsKSA9PiB7XG5cdFx0XHRcdG5ldyBCdXR0b25Db21wb25lbnQoYnV0dG9uQ29udGFpbmVyRWwpLnNldEJ1dHRvblRleHQodGV4dC5hZGRCZXRhUGx1Z2luTW9kYWwuYnV0dG9ucy5uZXZlck1pbmQpLm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0bmV3IEJ1dHRvbkNvbXBvbmVudChidXR0b25Db250YWluZXJFbClcblx0XHRcdFx0XHQuc2V0QnV0dG9uVGV4dCh0ZXh0LnNldHRpbmdzLmJldGFUaGVtZUxpc3QuYWRkQmV0YVRoZW1lKVxuXHRcdFx0XHRcdC5zZXRDdGEoKVxuXHRcdFx0XHRcdC5vbkNsaWNrKChlOiBFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhcIkFkZCB0aGVtZSBidXR0b24gY2xpY2tlZFwiKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmFkZHJlc3MgIT09IFwiXCIpIHZvaWQgdGhpcy5zdWJtaXRGb3JtKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3QgbmV3RGl2ID0gZm9ybUVsLmNyZWF0ZURpdigpO1xuXHRcdFx0bmV3RGl2LmFkZENsYXNzKFwiYnJhdC1tb2RhbC1kaXZpZGVyXCIpO1xuXHRcdFx0Y29uc3QgYnlUZlRoYWNrZXIgPSBuZXdEaXYuY3JlYXRlU3BhbigpO1xuXHRcdFx0YnlUZlRoYWNrZXIuY3JlYXRlRWwoXCJhXCIsIHtcblx0XHRcdFx0aHJlZjogXCJodHRwczovL2JpdC5seS9vNDItdHdpdHRlclwiLFxuXHRcdFx0XHR0ZXh0OiBcIlRGVEhhY2tlclwiLFxuXHRcdFx0fSk7XG5cdFx0XHRieVRmVGhhY2tlci5hcHBlbmRUZXh0KGNvbW1vblRleHQuYW5kKTtcblx0XHRcdGJ5VGZUaGFja2VyLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRcdGhyZWY6IFwiaHR0cHM6Ly9naXRodWIuY29tL2pvaGFubnJpY2hhcmRcIixcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9ic2lkaWFubWQvdWkvc2VudGVuY2UtY2FzZSAtLSBwcmVzZXJ2ZSBhdXRob3IncyBsb3dlcmNhc2UgaGFuZGxlXG5cdFx0XHRcdHRleHQ6IFwiam9oYW5ucmljaGFyZFwiLFxuXHRcdFx0fSk7XG5cdFx0XHRieVRmVGhhY2tlci5hZGRDbGFzcyhcImJyYXQtY3JlZGl0c1wiKTtcblx0XHRcdG5ld0Rpdi5hcHBlbmRDaGlsZChieVRmVGhhY2tlcik7XG5cdFx0XHRwcm9tb3Rpb25hbExpbmtzKG5ld0RpdiwgZmFsc2UpO1xuXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHRpdGxlID0gZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnJhdC1tb2RhbCAuc2V0dGluZy1pdGVtLWluZm9cIik7XG5cdFx0XHRcdGZvciAoY29uc3QgdGl0bGVFbCBvZiBBcnJheS5mcm9tKHRpdGxlKSkge1xuXHRcdFx0XHRcdHRpdGxlRWwucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDUwKTtcblx0XHR9KTtcblx0fVxuXG5cdG9uQ2xvc2UoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMub3BlblNldHRpbmdzVGFiQWZ0ZXJ3YXJkcykge1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0dGhpcy5wbHVnaW4uYXBwLnNldHRpbmcub3BlblRhYigpO1xuXHRcdFx0dGhpcy5wbHVnaW4uYXBwLnNldHRpbmcub3BlblRhYkJ5SWQodGhpcy5wbHVnaW4uQVBQX0lEKTtcblx0XHR9XG5cdH1cbn1cbiIsICJpbXBvcnQgeyBhZGRJY29uIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJY29ucygpOiB2b2lkIHtcblx0YWRkSWNvbihcblx0XHRcIkJyYXRJY29uXCIsXG5cdFx0YDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiAgZD1cIk0gNDEuNjY3OTY5IDQxLjY2Nzk2OSBDIDQxLjY2Nzk2OSAzOS4zNjcxODggMzkuODAwNzgxIDM3LjUgMzcuNSAzNy41IEMgMzUuMTk5MjE5IDM3LjUgMzMuMzMyMDMxIDM5LjM2NzE4OCAzMy4zMzIwMzEgNDEuNjY3OTY5IEMgMzMuMzMyMDMxIDQzLjk2ODc1IDM1LjE5OTIxOSA0NS44MzIwMzEgMzcuNSA0NS44MzIwMzEgQyAzOS44MDA3ODEgNDUuODMyMDMxIDQxLjY2Nzk2OSA0My45Njg3NSA0MS42Njc5NjkgNDEuNjY3OTY5IFogTSA2MC40MTc5NjkgNTguNTgyMDMxIEMgNTkuNDYwOTM4IDU4LjAyMzQzOCA1OC4zMjAzMTIgNTcuODY3MTg4IDU3LjI1IDU4LjE0ODQzOCBDIDU2LjE3OTY4OCA1OC40Mjk2ODggNTUuMjY1NjI1IDU5LjEyNSA1NC43MDcwMzEgNjAuMDgyMDMxIEMgNTMuNzQ2MDk0IDYxLjc3NzM0NCA1MS45NDkyMTkgNjIuODIwMzEyIDUwIDYyLjgyMDMxMiBDIDQ4LjA1MDc4MSA2Mi44MjAzMTIgNDYuMjUzOTA2IDYxLjc3NzM0NCA0NS4yOTI5NjkgNjAuMDgyMDMxIEMgNDQuNzM0Mzc1IDU5LjEyNSA0My44MjAzMTIgNTguNDI5Njg4IDQyLjc1IDU4LjE0ODQzOCBDIDQxLjY3OTY4OCA1Ny44NjcxODggNDAuNTM5MDYyIDU4LjAyMzQzOCAzOS41ODIwMzEgNTguNTgyMDMxIEMgMzcuNTk3NjU2IDU5LjcyNjU2MiAzNi45MTAxNTYgNjIuMjU3ODEyIDM4LjA0Mjk2OSA2NC4yNSBDIDQwLjUgNjguNTMxMjUgNDUuMDYyNSA3MS4xNzE4NzUgNTAgNzEuMTcxODc1IEMgNTQuOTM3NSA3MS4xNzE4NzUgNTkuNSA2OC41MzEyNSA2MS45NTcwMzEgNjQuMjUgQyA2My4wODk4NDQgNjIuMjU3ODEyIDYyLjQwMjM0NCA1OS43MjY1NjIgNjAuNDE3OTY5IDU4LjU4MjAzMSBaIE0gNjIuNSAzNy41IEMgNjAuMTk5MjE5IDM3LjUgNTguMzMyMDMxIDM5LjM2NzE4OCA1OC4zMzIwMzEgNDEuNjY3OTY5IEMgNTguMzMyMDMxIDQzLjk2ODc1IDYwLjE5OTIxOSA0NS44MzIwMzEgNjIuNSA0NS44MzIwMzEgQyA2NC44MDA3ODEgNDUuODMyMDMxIDY2LjY2Nzk2OSA0My45Njg3NSA2Ni42Njc5NjkgNDEuNjY3OTY5IEMgNjYuNjY3OTY5IDM5LjM2NzE4OCA2NC44MDA3ODEgMzcuNSA2Mi41IDM3LjUgWiBNIDUwIDguMzMyMDMxIEMgMjYuOTg4MjgxIDguMzMyMDMxIDguMzMyMDMxIDI2Ljk4ODI4MSA4LjMzMjAzMSA1MCBDIDguMzMyMDMxIDczLjAxMTcxOSAyNi45ODgyODEgOTEuNjY3OTY5IDUwIDkxLjY2Nzk2OSBDIDczLjAxMTcxOSA5MS42Njc5NjkgOTEuNjY3OTY5IDczLjAxMTcxOSA5MS42Njc5NjkgNTAgQyA5MS42Njc5NjkgMjYuOTg4MjgxIDczLjAxMTcxOSA4LjMzMjAzMSA1MCA4LjMzMjAzMSBaIE0gNTAgODMuMzMyMDMxIEMgMzMuOTg4MjgxIDgzLjQwMjM0NCAyMC4xOTE0MDYgNzIuMDc4MTI1IDE3LjEzNjcxOSA1Ni4zNjMyODEgQyAxNC4wNzgxMjUgNDAuNjQ0NTMxIDIyLjYyODkwNiAyNC45NzY1NjIgMzcuNSAxOS4wNDI5NjkgQyAzNy40NTcwMzEgMTkuNjM2NzE5IDM3LjQ1NzAzMSAyMC4yMzgyODEgMzcuNSAyMC44MzIwMzEgQyAzNy41IDI3LjczODI4MSA0My4wOTc2NTYgMzMuMzMyMDMxIDUwIDMzLjMzMjAzMSBDIDUyLjMwMDc4MSAzMy4zMzIwMzEgNTQuMTY3OTY5IDMxLjQ2ODc1IDU0LjE2Nzk2OSAyOS4xNjc5NjkgQyA1NC4xNjc5NjkgMjYuODY3MTg4IDUyLjMwMDc4MSAyNSA1MCAyNSBDIDQ3LjY5OTIxOSAyNSA0NS44MzIwMzEgMjMuMTMyODEyIDQ1LjgzMjAzMSAyMC44MzIwMzEgQyA0NS44MzIwMzEgMTguNTMxMjUgNDcuNjk5MjE5IDE2LjY2Nzk2OSA1MCAxNi42Njc5NjkgQyA2OC40MTAxNTYgMTYuNjY3OTY5IDgzLjMzMjAzMSAzMS41ODk4NDQgODMuMzMyMDMxIDUwIEMgODMuMzMyMDMxIDY4LjQxMDE1NiA2OC40MTAxNTYgODMuMzMyMDMxIDUwIDgzLjMzMjAzMSBaIE0gNTAgODMuMzMyMDMxIFwiIC8+YCxcblx0KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEZ1enp5TWF0Y2ggfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IEZ1enp5U3VnZ2VzdE1vZGFsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgdHlwZSBCcmF0UGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5cbi8qKlxuICogU2ltcGxlIGludGVyZmFjZSBmb3Igd2hhdCBzaG91bGQgYmUgZGlzcGxheWVkIGFuZCBzdG9yZWQgZm9yIHN1Z2dlc3RlclxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN1Z2dlc3Rlckl0ZW0ge1xuXHQvLyBkaXNwbGF5ZWQgdG8gdXNlclxuXHRkaXNwbGF5OiBzdHJpbmc7XG5cdC8vIHN1cHBsbWVudGFsIGluZm8gZm9yIHRoZSBjYWxsYmFja1xuXHRpbmZvOiAoKCkgPT4gdm9pZCkgfCBzdHJpbmc7XG59XG5cbi8qKlxuICogR2VuZXJpYyBzdWdnZXN0ZXIgZm9yIHF1aWNrIHJldXNlXG4gKi9cbmV4cG9ydCBjbGFzcyBHZW5lcmljRnV6enlTdWdnZXN0ZXIgZXh0ZW5kcyBGdXp6eVN1Z2dlc3RNb2RhbDxTdWdnZXN0ZXJJdGVtPiB7XG5cdGRhdGE6IFN1Z2dlc3Rlckl0ZW1bXSA9IFtdO1xuXHRjYWxsYmFja0Z1bmN0aW9uITogKFxuXHRcdGl0ZW06IFN1Z2dlc3Rlckl0ZW0sXG5cdFx0ZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCxcblx0KSA9PiB2b2lkO1xuXG5cdGNvbnN0cnVjdG9yKHBsdWdpbjogQnJhdFBsdWdpbikge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXHRcdHRoaXMuc2NvcGUucmVnaXN0ZXIoW1wiU2hpZnRcIl0sIFwiRW50ZXJcIiwgKGV2dCkgPT4ge1xuXHRcdFx0dGhpcy5lbnRlclRyaWdnZXIoZXZ0KTtcblx0XHR9KTtcblx0XHR0aGlzLnNjb3BlLnJlZ2lzdGVyKFtcIkN0cmxcIl0sIFwiRW50ZXJcIiwgKGV2dCkgPT4ge1xuXHRcdFx0dGhpcy5lbnRlclRyaWdnZXIoZXZ0KTtcblx0XHR9KTtcblx0fVxuXG5cdHNldFN1Z2dlc3RlckRhdGEoc3VnZ2VzdGVyRGF0YTogU3VnZ2VzdGVySXRlbVtdKTogdm9pZCB7XG5cdFx0dGhpcy5kYXRhID0gc3VnZ2VzdGVyRGF0YTtcblx0fVxuXG5cdGRpc3BsYXkoXG5cdFx0Y2FsbEJhY2s6IChpdGVtOiBTdWdnZXN0ZXJJdGVtLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSA9PiB2b2lkLFxuXHQpIHtcblx0XHR0aGlzLmNhbGxiYWNrRnVuY3Rpb24gPSBjYWxsQmFjaztcblx0XHR0aGlzLm9wZW4oKTtcblx0fVxuXG5cdGdldEl0ZW1zKCk6IFN1Z2dlc3Rlckl0ZW1bXSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YTtcblx0fVxuXG5cdGdldEl0ZW1UZXh0KGl0ZW06IFN1Z2dlc3Rlckl0ZW0pOiBzdHJpbmcge1xuXHRcdHJldHVybiBpdGVtLmRpc3BsYXk7XG5cdH1cblxuXHRvbkNob29zZUl0ZW0oKTogdm9pZCB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0cmVuZGVyU3VnZ2VzdGlvbihpdGVtOiBGdXp6eU1hdGNoPFN1Z2dlc3Rlckl0ZW0+LCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblx0XHRlbC5jcmVhdGVFbChcImRpdlwiLCB7IHRleHQ6IGl0ZW0uaXRlbS5kaXNwbGF5IH0pO1xuXHR9XG5cblx0ZW50ZXJUcmlnZ2VyKGV2dDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYnNpZGlhbm1kL3ByZWZlci1hY3RpdmUtZG9jIC0tIEJSQVQgY29tcGF0aWJpbGl0eTogYWN0aXZlRG9jdW1lbnQgYnJlYWtzIHN1Z2dlc3RlciBzZWxlY3Rpb25cblx0XHRjb25zdCBzZWxlY3RlZFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XCIuc3VnZ2VzdGlvbi1pdGVtLmlzLXNlbGVjdGVkIGRpdlwiLFxuXHRcdCk/LnRleHRDb250ZW50O1xuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGEuZmluZCgoaSkgPT4gaS5kaXNwbGF5ID09PSBzZWxlY3RlZFRleHQpO1xuXHRcdGlmIChpdGVtKSB7XG5cdFx0XHR0aGlzLmludm9rZUNhbGxiYWNrKGl0ZW0sIGV2dCk7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0b25DaG9vc2VTdWdnZXN0aW9uKFxuXHRcdGl0ZW06IEZ1enp5TWF0Y2g8U3VnZ2VzdGVySXRlbT4sXG5cdFx0ZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCxcblx0KTogdm9pZCB7XG5cdFx0dGhpcy5pbnZva2VDYWxsYmFjayhpdGVtLml0ZW0sIGV2dCk7XG5cdH1cblxuXHRpbnZva2VDYWxsYmFjayhpdGVtOiBTdWdnZXN0ZXJJdGVtLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrRnVuY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dGhpcy5jYWxsYmFja0Z1bmN0aW9uKGl0ZW0sIGV2dCk7XG5cdFx0fVxuXHR9XG59XG4iLCAiaW1wb3J0IHR5cGUge30gZnJvbSBcIkBvYnNpZGlhbi10eXBpbmdzL29ic2lkaWFuLXB1YmxpYy0xLjExLjRcIjtcbmltcG9ydCB0eXBlIHsgU2V0dGluZ1RhYiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBHcmFkdWF0ZWRQbHVnaW4gfSBmcm9tIFwiLi4vZmVhdHVyZXMvQmV0YVBsdWdpbnNcIjtcbmltcG9ydCB0eXBlIHsgQ29tbXVuaXR5UGx1Z2luLCBDb21tdW5pdHlUaGVtZSB9IGZyb20gXCIuLi9mZWF0dXJlcy9naXRodWJVdGlsc1wiO1xuaW1wb3J0IHsgZ3JhYkNvbW1tdW5pdHlQbHVnaW5MaXN0LCBncmFiQ29tbW11bml0eVRoZW1lc0xpc3QgfSBmcm9tIFwiLi4vZmVhdHVyZXMvZ2l0aHViVXRpbHNcIjtcbmltcG9ydCB7IHRoZW1lc0NoZWNrQW5kVXBkYXRlcyB9IGZyb20gXCIuLi9mZWF0dXJlcy90aGVtZXNcIjtcbmltcG9ydCB0eXBlIEJyYXRQbHVnaW4gZnJvbSBcIi4uL21haW5cIjtcbmltcG9ydCB7IHRvYXN0TWVzc2FnZSB9IGZyb20gXCIuLi91dGlscy9ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgQWRkTmV3VGhlbWUgZnJvbSBcIi4vQWRkTmV3VGhlbWVcIjtcbmltcG9ydCB0eXBlIHsgU3VnZ2VzdGVySXRlbSB9IGZyb20gXCIuL0dlbmVyaWNGdXp6eVN1Z2dlc3RlclwiO1xuaW1wb3J0IHsgR2VuZXJpY0Z1enp5U3VnZ2VzdGVyIH0gZnJvbSBcIi4vR2VuZXJpY0Z1enp5U3VnZ2VzdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbkNvbW1hbmRzIHtcblx0cGx1Z2luOiBCcmF0UGx1Z2luO1xuXHRicmF0Q29tbWFuZHMgPSBbXG5cdFx0e1xuXHRcdFx0aWQ6IFwiQWRkQmV0YVBsdWdpblwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBBZGQgYSBiZXRhIHBsdWdpbiBmb3IgdGVzdGluZyAod2l0aCBvciB3aXRob3V0IHZlcnNpb24pXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5kaXNwbGF5QWRkTmV3UGx1Z2luTW9kYWwoZmFsc2UsIHRydWUpO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGlkOiBcImNoZWNrRm9yVXBkYXRlc0FuZFVwZGF0ZVwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBDaGVjayBmb3IgdXBkYXRlcyB0byBhbGwgYmV0YSBwbHVnaW5zIGFuZCBVUERBVEVcIixcblx0XHRcdHNob3dJblJpYmJvbjogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLmJldGFQbHVnaW5zLmNoZWNrRm9yUGx1Z2luVXBkYXRlc0FuZEluc3RhbGxVcGRhdGVzKHRydWUsIGZhbHNlKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJjaGVja0ZvclVwZGF0ZXNBbmREb250VXBkYXRlXCIsXG5cdFx0XHRpY29uOiBcIkJyYXRJY29uXCIsXG5cdFx0XHRuYW1lOiBcIlBsdWdpbnM6IE9ubHkgY2hlY2sgZm9yIHVwZGF0ZXMgdG8gYmV0YSBwbHVnaW5zLCBidXQgZG9uJ3QgVXBkYXRlXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5jaGVja0ZvclBsdWdpblVwZGF0ZXNBbmRJbnN0YWxsVXBkYXRlcyh0cnVlLCB0cnVlKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJ1cGRhdGVPbmVQbHVnaW5cIixcblx0XHRcdGljb246IFwiQnJhdEljb25cIixcblx0XHRcdG5hbWU6IFwiUGx1Z2luczogQ2hvb3NlIGEgc2luZ2xlIHBsdWdpbiB2ZXJzaW9uIHRvIHVwZGF0ZVwiLFxuXHRcdFx0c2hvd0luUmliYm9uOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcblx0XHRcdFx0Y29uc3QgZnJvemVuVmVyc2lvbnMgPSBuZXcgTWFwKFxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpblN1Ykxpc3RGcm96ZW5WZXJzaW9uLm1hcCgoZikgPT4gW1xuXHRcdFx0XHRcdFx0Zi5yZXBvLFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR2ZXJzaW9uOiBmLnZlcnNpb24sXG5cdFx0XHRcdFx0XHRcdHRva2VuTmFtZTogZi50b2tlbk5hbWUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdF0pLFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCBwbHVnaW5MaXN0OiBTdWdnZXN0ZXJJdGVtW10gPSBPYmplY3QudmFsdWVzKHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpbkxpc3QpXG5cdFx0XHRcdFx0LmZpbHRlcigocmVwbykgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgZnJvemVuID0gZnJvemVuVmVyc2lvbnMuZ2V0KHJlcG8pO1xuXHRcdFx0XHRcdFx0cmV0dXJuICFmcm96ZW4/LnZlcnNpb24gfHwgZnJvemVuLnZlcnNpb24gPT09IFwibGF0ZXN0XCI7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQubWFwKChyZXBvKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OiByZXBvLFxuXHRcdFx0XHRcdFx0XHRpbmZvOiByZXBvLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0Y29uc3QgZ2ZzID0gbmV3IEdlbmVyaWNGdXp6eVN1Z2dlc3Rlcih0aGlzLnBsdWdpbik7XG5cdFx0XHRcdGdmcy5zZXRTdWdnZXN0ZXJEYXRhKHBsdWdpbkxpc3QpO1xuXHRcdFx0XHRnZnMuZGlzcGxheSgocmVzdWx0cykgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG1zZyA9IGBDaGVja2luZyBmb3IgdXBkYXRlcyBmb3IgJHtyZXN1bHRzLmluZm8gYXMgc3RyaW5nfWA7XG5cdFx0XHRcdFx0Y29uc3QgZnJvemVuID0gZnJvemVuVmVyc2lvbnMuZ2V0KHJlc3VsdHMuaW5mbyBhcyBzdHJpbmcpO1xuXHRcdFx0XHRcdHZvaWQgdGhpcy5wbHVnaW4ubG9nKG1zZywgdHJ1ZSk7XG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBgXFxuJHttc2d9YCwgMyk7XG5cdFx0XHRcdFx0dm9pZCB0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy51cGRhdGVQbHVnaW4ocmVzdWx0cy5pbmZvIGFzIHN0cmluZywgZmFsc2UsIHRydWUsIGZhbHNlLCBmcm96ZW4/LnRva2VuTmFtZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGlkOiBcInJlaW5zdGFsbE9uZVBsdWdpblwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBDaG9vc2UgYSBzaW5nbGUgcGx1Z2luIHRvIHJlaW5zdGFsbFwiLFxuXHRcdFx0c2hvd0luUmliYm9uOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcblx0XHRcdFx0Y29uc3QgcGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb25OYW1lcyA9IG5ldyBTZXQodGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24ubWFwKChmKSA9PiBmLnJlcG8pKTtcblx0XHRcdFx0Y29uc3QgcGx1Z2luTGlzdDogU3VnZ2VzdGVySXRlbVtdID0gT2JqZWN0LnZhbHVlcyh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MaXN0KVxuXHRcdFx0XHRcdC5maWx0ZXIoKGYpID0+ICFwbHVnaW5TdWJMaXN0RnJvemVuVmVyc2lvbk5hbWVzLmhhcyhmKSlcblx0XHRcdFx0XHQubWFwKChtKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4geyBkaXNwbGF5OiBtLCBpbmZvOiBtIH07XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdGNvbnN0IGdmcyA9IG5ldyBHZW5lcmljRnV6enlTdWdnZXN0ZXIodGhpcy5wbHVnaW4pO1xuXHRcdFx0XHRnZnMuc2V0U3VnZ2VzdGVyRGF0YShwbHVnaW5MaXN0KTtcblx0XHRcdFx0Z2ZzLmRpc3BsYXkoKHJlc3VsdHMpID0+IHtcblx0XHRcdFx0XHRjb25zdCBtc2cgPSBgUmVpbnN0YWxsaW5nICR7cmVzdWx0cy5pbmZvIGFzIHN0cmluZ31gO1xuXHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgYFxcbiR7bXNnfWAsIDMpO1xuXHRcdFx0XHRcdHZvaWQgdGhpcy5wbHVnaW4ubG9nKG1zZywgdHJ1ZSk7XG5cdFx0XHRcdFx0dm9pZCB0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy51cGRhdGVQbHVnaW4ocmVzdWx0cy5pbmZvIGFzIHN0cmluZywgZmFsc2UsIGZhbHNlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQ6IFwicmVzdGFydFBsdWdpblwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBSZXN0YXJ0IGEgcGx1Z2luIHRoYXQgaXMgYWxyZWFkeSBpbnN0YWxsZWRcIixcblx0XHRcdHNob3dJblJpYmJvbjogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHBsdWdpbkxpc3Q6IFN1Z2dlc3Rlckl0ZW1bXSA9IE9iamVjdC52YWx1ZXModGhpcy5wbHVnaW4uYXBwLnBsdWdpbnMubWFuaWZlc3RzKS5tYXAoKG0pID0+IHtcblx0XHRcdFx0XHRyZXR1cm4geyBkaXNwbGF5OiBtLmlkLCBpbmZvOiBtLmlkIH07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb25zdCBnZnMgPSBuZXcgR2VuZXJpY0Z1enp5U3VnZ2VzdGVyKHRoaXMucGx1Z2luKTtcblx0XHRcdFx0Z2ZzLnNldFN1Z2dlc3RlckRhdGEocGx1Z2luTGlzdCk7XG5cdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBgJHtyZXN1bHRzLmluZm8gYXMgc3RyaW5nfVxcblBsdWdpbiByZWxvYWRpbmcgLi4uLi5gLCA1KTtcblx0XHRcdFx0XHR2b2lkIHRoaXMucGx1Z2luLmJldGFQbHVnaW5zLnJlbG9hZFBsdWdpbihyZXN1bHRzLmluZm8gYXMgc3RyaW5nKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQ6IFwiZGlzYWJsZVBsdWdpblwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBEaXNhYmxlIGEgcGx1Z2luIC0gdG9nZ2xlIGl0IG9mZlwiLFxuXHRcdFx0c2hvd0luUmliYm9uOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcblx0XHRcdFx0Y29uc3QgcGx1Z2luTGlzdCA9IHRoaXMucGx1Z2luLmJldGFQbHVnaW5zLmdldEVuYWJsZWREaXNhYmxlZFBsdWdpbnModHJ1ZSkubWFwKChtYW5pZmVzdCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBgJHttYW5pZmVzdC5uYW1lfSAoJHttYW5pZmVzdC5pZH0pYCxcblx0XHRcdFx0XHRcdGluZm86IG1hbmlmZXN0LmlkLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb25zdCBnZnMgPSBuZXcgR2VuZXJpY0Z1enp5U3VnZ2VzdGVyKHRoaXMucGx1Z2luKTtcblx0XHRcdFx0Z2ZzLnNldFN1Z2dlc3RlckRhdGEocGx1Z2luTGlzdCk7XG5cdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0dm9pZCB0aGlzLnBsdWdpbi5sb2coYCR7cmVzdWx0cy5kaXNwbGF5fSBwbHVnaW4gZGlzYWJsZWRgLCBmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlYnVnZ2luZ01vZGUpIGNvbnNvbGUuZGVidWcocmVzdWx0cy5pbmZvKTtcblx0XHRcdFx0XHR2b2lkIHRoaXMucGx1Z2luLmFwcC5wbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKHJlc3VsdHMuaW5mbyBhcyBzdHJpbmcpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJlbmFibGVQbHVnaW5cIixcblx0XHRcdGljb246IFwiQnJhdEljb25cIixcblx0XHRcdG5hbWU6IFwiUGx1Z2luczogRW5hYmxlIGEgcGx1Z2luIC0gdG9nZ2xlIGl0IG9uXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBwbHVnaW5MaXN0ID0gdGhpcy5wbHVnaW4uYmV0YVBsdWdpbnMuZ2V0RW5hYmxlZERpc2FibGVkUGx1Z2lucyhmYWxzZSkubWFwKChtYW5pZmVzdCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBgJHttYW5pZmVzdC5uYW1lfSAoJHttYW5pZmVzdC5pZH0pYCxcblx0XHRcdFx0XHRcdGluZm86IG1hbmlmZXN0LmlkLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb25zdCBnZnMgPSBuZXcgR2VuZXJpY0Z1enp5U3VnZ2VzdGVyKHRoaXMucGx1Z2luKTtcblx0XHRcdFx0Z2ZzLnNldFN1Z2dlc3RlckRhdGEocGx1Z2luTGlzdCk7XG5cdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0dm9pZCB0aGlzLnBsdWdpbi5sb2coYCR7cmVzdWx0cy5kaXNwbGF5fSBwbHVnaW4gZW5hYmxlZGAsIGZhbHNlKTtcblx0XHRcdFx0XHR2b2lkIHRoaXMucGx1Z2luLmFwcC5wbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocmVzdWx0cy5pbmZvIGFzIHN0cmluZyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGlkOiBcIm9wZW5HaXRIdWJaUmVwb3NpdG9yeVwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBPcGVuIHRoZSBHaXRIdWIgcmVwb3NpdG9yeSBmb3IgYSBwbHVnaW5cIixcblx0XHRcdHNob3dJblJpYmJvbjogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbW11bml0eVBsdWdpbnMgPSBhd2FpdCBncmFiQ29tbW11bml0eVBsdWdpbkxpc3QodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSk7XG5cdFx0XHRcdGlmIChjb21tdW5pdHlQbHVnaW5zKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29tbXVuaXR5UGx1Z2luTGlzdDogU3VnZ2VzdGVySXRlbVtdID0gT2JqZWN0LnZhbHVlcyhjb21tdW5pdHlQbHVnaW5zKS5tYXAoKHA6IENvbW11bml0eVBsdWdpbikgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHsgZGlzcGxheTogYFBsdWdpbjogJHtwLm5hbWV9ICAoJHtwLnJlcG99KWAsIGluZm86IHAucmVwbyB9O1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnN0IGJyYXRMaXN0OiBTdWdnZXN0ZXJJdGVtW10gPSBPYmplY3QudmFsdWVzKHRoaXMucGx1Z2luLnNldHRpbmdzLnBsdWdpbkxpc3QpLm1hcCgocCkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHsgZGlzcGxheTogYEJSQVQ6ICR7cH1gLCBpbmZvOiBwIH07XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBzaSBvZiBjb21tdW5pdHlQbHVnaW5MaXN0KSB7XG5cdFx0XHRcdFx0XHRicmF0TGlzdC5wdXNoKHNpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgZ2ZzID0gbmV3IEdlbmVyaWNGdXp6eVN1Z2dlc3Rlcih0aGlzLnBsdWdpbik7XG5cdFx0XHRcdFx0Z2ZzLnNldFN1Z2dlc3RlckRhdGEoYnJhdExpc3QpO1xuXHRcdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0cy5pbmZvKSB3aW5kb3cub3BlbihgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVzdWx0cy5pbmZvIGFzIHN0cmluZ31gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGlkOiBcIm9wZW5Db21tdW5pdHlQYWdlUGx1Z2luXCIsXG5cdFx0XHRpY29uOiBcIkJyYXRJY29uXCIsXG5cdFx0XHRuYW1lOiBcIlBsdWdpbnM6IE9wZW4gdGhlIGNvbW11bml0eSBwYWdlIGZvciBhIHBsdWdpblwiLFxuXHRcdFx0c2hvd0luUmliYm9uOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6IGFzeW5jICgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29tbXVuaXR5UGx1Z2lucyA9IGF3YWl0IGdyYWJDb21tbXVuaXR5UGx1Z2luTGlzdCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKTtcblx0XHRcdFx0aWYgKCFjb21tdW5pdHlQbHVnaW5zKSB7XG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBcIkNvdWxkIG5vdCBsb2FkIHRoZSBPYnNpZGlhbiBjb21tdW5pdHkgcGx1Z2luIGxpc3QuXCIsIDUpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHBsdWdpbkJ5UmVwbyA9IG5ldyBNYXAoY29tbXVuaXR5UGx1Z2lucy5tYXAoKHBsdWdpbikgPT4gW3BsdWdpbi5yZXBvLCBwbHVnaW5dKSk7XG5cdFx0XHRcdGNvbnN0IHNlZW5QbHVnaW5JZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuXHRcdFx0XHRjb25zdCBwcmlvcml0aXplZEJyYXRQbHVnaW5zOiBTdWdnZXN0ZXJJdGVtW10gPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MaXN0XG5cdFx0XHRcdFx0Lm1hcCgocmVwbykgPT4gcGx1Z2luQnlSZXBvLmdldChyZXBvKSlcblx0XHRcdFx0XHQuZmlsdGVyKChwbHVnaW4pOiBwbHVnaW4gaXMgQ29tbXVuaXR5UGx1Z2luID0+IEJvb2xlYW4ocGx1Z2luKSlcblx0XHRcdFx0XHQubWFwKChwbHVnaW4pID0+IHtcblx0XHRcdFx0XHRcdHNlZW5QbHVnaW5JZHMuYWRkKHBsdWdpbi5pZCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBgQlJBVDogJHtwbHVnaW4ubmFtZX0gKCR7cGx1Z2luLmlkfSlgLFxuXHRcdFx0XHRcdFx0XHRpbmZvOiBwbHVnaW4uaWQsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNvbnN0IGNvbW11bml0eVBsdWdpbkxpc3Q6IFN1Z2dlc3Rlckl0ZW1bXSA9IGNvbW11bml0eVBsdWdpbnNcblx0XHRcdFx0XHQuZmlsdGVyKChwbHVnaW4pID0+ICFzZWVuUGx1Z2luSWRzLmhhcyhwbHVnaW4uaWQpKVxuXHRcdFx0XHRcdC5tYXAoKHBsdWdpbikgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTogYFBsdWdpbjogJHtwbHVnaW4ubmFtZX0gKCR7cGx1Z2luLmlkfSlgLFxuXHRcdFx0XHRcdFx0XHRpbmZvOiBwbHVnaW4uaWQsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNvbnN0IGdmcyA9IG5ldyBHZW5lcmljRnV6enlTdWdnZXN0ZXIodGhpcy5wbHVnaW4pO1xuXHRcdFx0XHRnZnMuc2V0U3VnZ2VzdGVyRGF0YShbLi4ucHJpb3JpdGl6ZWRCcmF0UGx1Z2lucywgLi4uY29tbXVuaXR5UGx1Z2luTGlzdF0pO1xuXHRcdFx0XHRnZnMuZGlzcGxheSgocmVzdWx0cykgPT4ge1xuXHRcdFx0XHRcdGlmIChyZXN1bHRzLmluZm8pIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5vcGVuKGBodHRwczovL29ic2lkaWFuLm1kL3BsdWdpbnM/aWQ9JHtlbmNvZGVVUklDb21wb25lbnQocmVzdWx0cy5pbmZvIGFzIHN0cmluZyl9YCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJvcGVuR2l0SHViUmVwb1RoZW1lXCIsXG5cdFx0XHRpY29uOiBcIkJyYXRJY29uXCIsXG5cdFx0XHRuYW1lOiBcIlRoZW1lczogT3BlbiB0aGUgR2l0SHViIHJlcG9zaXRvcnkgZm9yIGEgdGhlbWUgKGFwcGVhcmFuY2UpXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb21tdW5pdHlUaGVtZSA9IGF3YWl0IGdyYWJDb21tbXVuaXR5VGhlbWVzTGlzdCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlKTtcblx0XHRcdFx0aWYgKGNvbW11bml0eVRoZW1lKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29tbXVuaXR5VGhlbWVMaXN0OiBTdWdnZXN0ZXJJdGVtW10gPSBPYmplY3QudmFsdWVzKGNvbW11bml0eVRoZW1lKS5tYXAoKHA6IENvbW11bml0eVRoZW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4geyBkaXNwbGF5OiBgVGhlbWU6ICR7cC5uYW1lfSAgKCR7cC5yZXBvfSlgLCBpbmZvOiBwLnJlcG8gfTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zdCBnZnMgPSBuZXcgR2VuZXJpY0Z1enp5U3VnZ2VzdGVyKHRoaXMucGx1Z2luKTtcblx0XHRcdFx0XHRnZnMuc2V0U3VnZ2VzdGVyRGF0YShjb21tdW5pdHlUaGVtZUxpc3QpO1xuXHRcdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0cy5pbmZvKSB3aW5kb3cub3BlbihgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVzdWx0cy5pbmZvIGFzIHN0cmluZ31gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGlkOiBcIm9wZW50UGx1Z2luU2V0dGluZ3NcIixcblx0XHRcdGljb246IFwiQnJhdEljb25cIixcblx0XHRcdG5hbWU6IFwiUGx1Z2luczogT3BlbiBQbHVnaW4gU2V0dGluZ3MgVGFiXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMucGx1Z2luLmFwcC5zZXR0aW5nO1xuXHRcdFx0XHRjb25zdCBsaXN0T2ZQbHVnaW5TZXR0aW5nc1RhYnM6IFN1Z2dlc3Rlckl0ZW1bXSA9IE9iamVjdC52YWx1ZXMoc2V0dGluZ3MucGx1Z2luVGFicykubWFwKCh0KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHsgZGlzcGxheTogYFBsdWdpbjogJHt0Lm5hbWV9YCwgaW5mbzogdC5pZCB9O1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Y29uc3QgZ2ZzID0gbmV3IEdlbmVyaWNGdXp6eVN1Z2dlc3Rlcih0aGlzLnBsdWdpbik7XG5cdFx0XHRcdGNvbnN0IGxpc3RPZkNvcmVTZXR0aW5nc1RhYnM6IFN1Z2dlc3Rlckl0ZW1bXSA9IE9iamVjdC52YWx1ZXMoc2V0dGluZ3Muc2V0dGluZ1RhYnMpLm1hcCgodCkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB7IGRpc3BsYXk6IGBDb3JlOiAke3QubmFtZX1gLCBpbmZvOiB0LmlkIH07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHNpIG9mIGxpc3RPZlBsdWdpblNldHRpbmdzVGFicykge1xuXHRcdFx0XHRcdGxpc3RPZkNvcmVTZXR0aW5nc1RhYnMucHVzaChzaSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Z2ZzLnNldFN1Z2dlc3RlckRhdGEobGlzdE9mQ29yZVNldHRpbmdzVGFicyk7XG5cdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0c2V0dGluZ3Mub3BlbigpO1xuXHRcdFx0XHRcdHNldHRpbmdzLm9wZW5UYWJCeUlkKHJlc3VsdHMuaW5mbyBhcyBzdHJpbmcpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJHcmFiQmV0YVRoZW1lXCIsXG5cdFx0XHRpY29uOiBcIkJyYXRJY29uXCIsXG5cdFx0XHRuYW1lOiBcIlRoZW1lczogR3JhYiBhIGJldGEgdGhlbWUgZm9yIHRlc3RpbmcgZnJvbSBhIEdpdGh1YiByZXBvc2l0b3J5XCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHRuZXcgQWRkTmV3VGhlbWUodGhpcy5wbHVnaW4pLm9wZW4oKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJ1cGRhdGVCZXRhVGhlbWVzXCIsXG5cdFx0XHRpY29uOiBcIkJyYXRJY29uXCIsXG5cdFx0XHRuYW1lOiBcIlRoZW1lczogVXBkYXRlIGJldGEgdGhlbWVzXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRhd2FpdCB0aGVtZXNDaGVja0FuZFVwZGF0ZXModGhpcy5wbHVnaW4sIHRydWUpO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGlkOiBcInJlbW92ZUdyYWR1YXRlZEZyb21CcmF0XCIsXG5cdFx0XHRpY29uOiBcIkJyYXRJY29uXCIsXG5cdFx0XHRuYW1lOiBcIlBsdWdpbnM6IFJlbW92ZSBhIGdyYWR1YXRlZCBwbHVnaW4gZnJvbSBCUkFUIChrZWVwIGluc3RhbGxlZClcIixcblx0XHRcdHNob3dJblJpYmJvbjogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGdyYWR1YXRlZCA9IGF3YWl0IHRoaXMucGx1Z2luLmJldGFQbHVnaW5zLmdldE9mZmljaWFsbHlSZWxlYXNlZFBsdWdpbnMoKTtcblx0XHRcdFx0aWYgKGdyYWR1YXRlZC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UodGhpcy5wbHVnaW4sIFwiTm8gZ3JhZHVhdGVkIHBsdWdpbnMgZm91bmQuIEFsbCBCUkFUIHBsdWdpbnMgYXJlIHN0aWxsIGluIGJldGEuXCIsIDUpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCBwbHVnaW5MaXN0OiBTdWdnZXN0ZXJJdGVtW10gPSBncmFkdWF0ZWQubWFwKChwOiBHcmFkdWF0ZWRQbHVnaW4pID0+ICh7XG5cdFx0XHRcdFx0ZGlzcGxheTogYCR7cC5yZXBvfSAoaW5zdGFsbGVkOiAke3AuaW5zdGFsbGVkVmVyc2lvbn0sIHN0YWJsZTogJHtwLnN0YWJsZVZlcnNpb259KWAsXG5cdFx0XHRcdFx0aW5mbzogcC5yZXBvLFxuXHRcdFx0XHR9KSk7XG5cdFx0XHRcdGNvbnN0IGdmcyA9IG5ldyBHZW5lcmljRnV6enlTdWdnZXN0ZXIodGhpcy5wbHVnaW4pO1xuXHRcdFx0XHRnZnMuc2V0U3VnZ2VzdGVyRGF0YShwbHVnaW5MaXN0KTtcblx0XHRcdFx0Z2ZzLmRpc3BsYXkoKHJlc3VsdHMpID0+IHtcblx0XHRcdFx0XHRjb25zdCByZXBvID0gcmVzdWx0cy5pbmZvIGFzIHN0cmluZztcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5kZWxldGVQbHVnaW4ocmVwbyk7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3NUYWIudXBkYXRlKCk7XG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBgJHtyZXBvfSByZW1vdmVkIGZyb20gQlJBVC4gT2JzaWRpYW4gd2lsbCBub3cgbWFuYWdlIHVwZGF0ZXMgdmlhIHRoZSBjb21tdW5pdHkgcGx1Z2luIGxpc3QuYCwgMTApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJ1cGRhdGVHcmFkdWF0ZWRUb1N0YWJsZUFuZFJlbW92ZVwiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJQbHVnaW5zOiBVcGRhdGUgYSBncmFkdWF0ZWQgcGx1Z2luIHRvIHN0YWJsZSByZWxlYXNlIGFuZCByZW1vdmUgZnJvbSBCUkFUXCIsXG5cdFx0XHRzaG93SW5SaWJib246IHRydWUsXG5cdFx0XHRjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBncmFkdWF0ZWQgPSBhd2FpdCB0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5nZXRPZmZpY2lhbGx5UmVsZWFzZWRQbHVnaW5zKCk7XG5cdFx0XHRcdGlmIChncmFkdWF0ZWQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCBcIk5vIGdyYWR1YXRlZCBwbHVnaW5zIGZvdW5kLiBBbGwgQlJBVCBwbHVnaW5zIGFyZSBzdGlsbCBpbiBiZXRhLlwiLCA1KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgcGx1Z2luTGlzdDogU3VnZ2VzdGVySXRlbVtdID0gZ3JhZHVhdGVkLm1hcCgocDogR3JhZHVhdGVkUGx1Z2luKSA9PiAoe1xuXHRcdFx0XHRcdGRpc3BsYXk6IGAke3AucmVwb30gKGluc3RhbGxlZDogJHtwLmluc3RhbGxlZFZlcnNpb259IFx1MjE5MiBzdGFibGU6ICR7cC5zdGFibGVWZXJzaW9ufSlgLFxuXHRcdFx0XHRcdGluZm86IHAucmVwbyxcblx0XHRcdFx0fSkpO1xuXHRcdFx0XHRjb25zdCBnZnMgPSBuZXcgR2VuZXJpY0Z1enp5U3VnZ2VzdGVyKHRoaXMucGx1Z2luKTtcblx0XHRcdFx0Z2ZzLnNldFN1Z2dlc3RlckRhdGEocGx1Z2luTGlzdCk7XG5cdFx0XHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0dm9pZCAoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVwbyA9IHJlc3VsdHMuaW5mbyBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGdyYWR1YXRlZC5maW5kKChnKSA9PiBnLnJlcG8gPT09IHJlcG8pO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0Ly8gSW5zdGFsbCBzdGFibGUgcmVsZWFzZSAobm9uLWJldGEgbWFuaWZlc3QsIHNwZWNpZmljIHZlcnNpb24pXG5cdFx0XHRcdFx0XHRjb25zdCBzdWNjZXNzID0gYXdhaXQgdGhpcy5wbHVnaW4uYmV0YVBsdWdpbnMuYWRkUGx1Z2luKFxuXHRcdFx0XHRcdFx0XHRyZXBvLFxuXHRcdFx0XHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRtYXRjaC5zdGFibGVWZXJzaW9uLFxuXHRcdFx0XHRcdFx0XHR0cnVlLCAvLyBmb3JjZSByZWluc3RhbGxcblx0XHRcdFx0XHRcdFx0dHJ1ZSwgLy8gZW5hYmxlIGFmdGVyIGluc3RhbGxcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpZiAoc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5kZWxldGVQbHVnaW4ocmVwbyk7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzVGFiLnVwZGF0ZSgpO1xuXHRcdFx0XHRcdFx0XHR0b2FzdE1lc3NhZ2UodGhpcy5wbHVnaW4sIGAke3JlcG99IHVwZGF0ZWQgdG8gc3RhYmxlICR7bWF0Y2guc3RhYmxlVmVyc2lvbn0gYW5kIHJlbW92ZWQgZnJvbSBCUkFULmAsIDEwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRvYXN0TWVzc2FnZSh0aGlzLnBsdWdpbiwgYEZhaWxlZCB0byBpbnN0YWxsIHN0YWJsZSByZWxlYXNlIGZvciAke3JlcG99LmAsIDEwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJhbGxDb21tYW5kc1wiLFxuXHRcdFx0aWNvbjogXCJCcmF0SWNvblwiLFxuXHRcdFx0bmFtZTogXCJBbGwgQ29tbWFuZHMgbGlzdFwiLFxuXHRcdFx0c2hvd0luUmliYm9uOiBmYWxzZSxcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmliYm9uRGlzcGxheUNvbW1hbmRzKCk7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdF07XG5cblx0cmliYm9uRGlzcGxheUNvbW1hbmRzKCk6IHZvaWQge1xuXHRcdGNvbnN0IGJyYXRDb21tYW5kTGlzdDogU3VnZ2VzdGVySXRlbVtdID0gW107XG5cdFx0Zm9yIChjb25zdCBjbWQgb2YgdGhpcy5icmF0Q29tbWFuZHMpIHtcblx0XHRcdGlmIChjbWQuc2hvd0luUmliYm9uKSBicmF0Q29tbWFuZExpc3QucHVzaCh7IGRpc3BsYXk6IGNtZC5uYW1lLCBpbmZvOiBjbWQuY2FsbGJhY2sgfSk7XG5cdFx0fVxuXHRcdGNvbnN0IGdmcyA9IG5ldyBHZW5lcmljRnV6enlTdWdnZXN0ZXIodGhpcy5wbHVnaW4pO1xuXHRcdGNvbnN0IHNldHRpbmdzID0gdGhpcy5wbHVnaW4uYXBwLnNldHRpbmc7XG5cblx0XHRjb25zdCBsaXN0T2ZDb3JlU2V0dGluZ3NUYWJzOiBTdWdnZXN0ZXJJdGVtW10gPSBPYmplY3QudmFsdWVzKHNldHRpbmdzLnNldHRpbmdUYWJzKS5tYXAoKHQ6IFNldHRpbmdUYWIpID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGRpc3BsYXk6IGBDb3JlOiAke3QubmFtZX1gLFxuXHRcdFx0XHRpbmZvOiAoKSA9PiB7XG5cdFx0XHRcdFx0c2V0dGluZ3Mub3BlbigpO1xuXHRcdFx0XHRcdHNldHRpbmdzLm9wZW5UYWJCeUlkKHQuaWQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHRjb25zdCBsaXN0T2ZQbHVnaW5TZXR0aW5nc1RhYnM6IFN1Z2dlc3Rlckl0ZW1bXSA9IE9iamVjdC52YWx1ZXMoc2V0dGluZ3MucGx1Z2luVGFicykubWFwKCh0OiBTZXR0aW5nVGFiKSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRkaXNwbGF5OiBgUGx1Z2luOiAke3QubmFtZX1gLFxuXHRcdFx0XHRpbmZvOiAoKSA9PiB7XG5cdFx0XHRcdFx0c2V0dGluZ3Mub3BlbigpO1xuXHRcdFx0XHRcdHNldHRpbmdzLm9wZW5UYWJCeUlkKHQuaWQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fTtcblx0XHR9KTtcblxuXHRcdGJyYXRDb21tYW5kTGlzdC5wdXNoKHtcblx0XHRcdGRpc3BsYXk6IFwiLS0tLSBDb3JlIFBsdWdpbiBTZXR0aW5ncyAtLS0tXCIsXG5cdFx0XHRpbmZvOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmliYm9uRGlzcGxheUNvbW1hbmRzKCk7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHRcdGZvciAoY29uc3Qgc2kgb2YgbGlzdE9mQ29yZVNldHRpbmdzVGFicykge1xuXHRcdFx0YnJhdENvbW1hbmRMaXN0LnB1c2goc2kpO1xuXHRcdH1cblx0XHRicmF0Q29tbWFuZExpc3QucHVzaCh7XG5cdFx0XHRkaXNwbGF5OiBcIi0tLS0gUGx1Z2luIFNldHRpbmdzIC0tLS1cIixcblx0XHRcdGluZm86ICgpID0+IHtcblx0XHRcdFx0dGhpcy5yaWJib25EaXNwbGF5Q29tbWFuZHMoKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdFx0Zm9yIChjb25zdCBzaSBvZiBsaXN0T2ZQbHVnaW5TZXR0aW5nc1RhYnMpIHtcblx0XHRcdGJyYXRDb21tYW5kTGlzdC5wdXNoKHNpKTtcblx0XHR9XG5cblx0XHRnZnMuc2V0U3VnZ2VzdGVyRGF0YShicmF0Q29tbWFuZExpc3QpO1xuXHRcdGdmcy5kaXNwbGF5KChyZXN1bHRzKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHJlc3VsdHMuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHJlc3VsdHMuaW5mbygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y29uc3RydWN0b3IocGx1Z2luOiBCcmF0UGx1Z2luKSB7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cblx0XHRmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5icmF0Q29tbWFuZHMpIHtcblx0XHRcdHRoaXMucGx1Z2luLmFkZENvbW1hbmQoe1xuXHRcdFx0XHRpZDogaXRlbS5pZCxcblx0XHRcdFx0bmFtZTogaXRlbS5uYW1lLFxuXHRcdFx0XHRpY29uOiBpdGVtLmljb24sXG5cdFx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XG5cdFx0XHRcdFx0aXRlbS5jYWxsYmFjaygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG4iLCAiaW1wb3J0IHR5cGUge1xuXHRBcHAsXG5cdEJ1dHRvbkNvbXBvbmVudCxcblx0RXh0cmFCdXR0b25Db21wb25lbnQsXG5cdFNlY3JldENvbXBvbmVudCxcblx0U2V0dGluZ0RlZmluaXRpb24sXG5cdFNldHRpbmdEZWZpbml0aW9uR3JvdXAsXG5cdFNldHRpbmdEZWZpbml0aW9uSXRlbSxcblx0U2V0dGluZ0RlZmluaXRpb25MaXN0LFxuXHRTZXR0aW5nR3JvdXBJdGVtLFxuXHRUb2dnbGVDb21wb25lbnQsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgUGx1Z2luU2V0dGluZ1RhYiwgcmVxdWlyZUFwaVZlcnNpb24sIFNlY3JldENvbXBvbmVudCBhcyBTZWNyZXRDb21wb25lbnRDbGFzcywgU2V0dGluZywgU2V0dGluZ0dyb3VwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyB0eXBlIEdpdEh1YlRva2VuSW5mbywgdmFsaWRhdGVHaXRIdWJUb2tlbiB9IGZyb20gXCIuLi9mZWF0dXJlcy9naXRodWJVdGlsc1wiO1xuaW1wb3J0IHsgdGhlbWVEZWxldGUgfSBmcm9tIFwiLi4vZmVhdHVyZXMvdGhlbWVzXCI7XG5pbXBvcnQgeyBnZXRUcmFuc2xhdGlvbnMgfSBmcm9tIFwiLi4vaTE4blwiO1xuaW1wb3J0IHR5cGUgQnJhdFBsdWdpbiBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyBhcyBCcmF0UGx1Z2luU2V0dGluZ3MsIFBsdWdpblZlcnNpb24sIFRoZW1lSW5mb3JhbXRpb24gfSBmcm9tIFwiLi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IHRvYXN0TWVzc2FnZSB9IGZyb20gXCIuLi91dGlscy9ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgeyBjcmVhdGVHaXRIdWJSZXNvdXJjZUxpbmssIGNyZWF0ZUxpbmsgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCBBZGROZXdUaGVtZSBmcm9tIFwiLi9BZGROZXdUaGVtZVwiO1xuXG50eXBlIEJyYXRTZXR0aW5nc0tleSA9IEV4dHJhY3Q8a2V5b2YgQnJhdFBsdWdpblNldHRpbmdzLCBzdHJpbmc+O1xuXG5leHBvcnQgY2xhc3MgQnJhdFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogQnJhdFBsdWdpbjtcblx0YWNjZXNzVG9rZW5TZXR0aW5nOiBTZWNyZXRDb21wb25lbnQgfCBudWxsID0gbnVsbDtcblx0YWNjZXNzVG9rZW5CdXR0b246IEJ1dHRvbkNvbXBvbmVudCB8IG51bGwgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEJyYXRQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGNvcHlSZXBvSWRlbnRpZmllcihpZGVudGlmaWVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAoIWlkZW50aWZpZXIpIHJldHVybjtcblxuXHRcdGNvbnN0IHQgPSBnZXRUcmFuc2xhdGlvbnMoKS5zZXR0aW5ncy5jb3B5SWRlbnRpZmllcjtcblx0XHR0cnkge1xuXHRcdFx0aWYgKCFuYXZpZ2F0b3IuY2xpcGJvYXJkPy53cml0ZVRleHQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2xpcGJvYXJkIEFQSSB1bmF2YWlsYWJsZVwiKTtcblx0XHRcdH1cblx0XHRcdGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGlkZW50aWZpZXIpO1xuXHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCB0LmNvcGllZChpZGVudGlmaWVyKSwgMyk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY29weSByZXBvc2l0b3J5IGlkZW50aWZpZXJcIiwgaWRlbnRpZmllciwgZXJyb3IpO1xuXHRcdFx0dG9hc3RNZXNzYWdlKHRoaXMucGx1Z2luLCB0LmZhaWxlZCwgNSk7XG5cdFx0fVxuXHR9XG5cblx0b3ZlcnJpZGUgZ2V0U2V0dGluZ0RlZmluaXRpb25zKCk6IFNldHRpbmdEZWZpbml0aW9uSXRlbTxCcmF0U2V0dGluZ3NLZXk+W10ge1xuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKS5zZXR0aW5ncztcblxuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IHRleHQuZ2VuZXJhbC5hdXRvRW5hYmxlUGx1Z2luc0FmdGVySW5zdGFsbGF0aW9uLm5hbWUsXG5cdFx0XHRcdGRlc2M6IHRleHQuZ2VuZXJhbC5hdXRvRW5hYmxlUGx1Z2luc0FmdGVySW5zdGFsbGF0aW9uLmRlc2MsXG5cdFx0XHRcdGNvbnRyb2w6IHsgdHlwZTogXCJ0b2dnbGVcIiwga2V5OiBcImVuYWJsZUFmdGVySW5zdGFsbFwiIH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiB0ZXh0LmdlbmVyYWwuYXV0b1VwZGF0ZVBsdWdpbnNBdFN0YXJ0dXAubmFtZSxcblx0XHRcdFx0ZGVzYzogdGV4dC5nZW5lcmFsLmF1dG9VcGRhdGVQbHVnaW5zQXRTdGFydHVwLmRlc2MsXG5cdFx0XHRcdGNvbnRyb2w6IHsgdHlwZTogXCJ0b2dnbGVcIiwga2V5OiBcInVwZGF0ZUF0U3RhcnR1cFwiIH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiB0ZXh0LmdlbmVyYWwuYXV0b1VwZGF0ZVRoZW1lc0F0U3RhcnR1cC5uYW1lLFxuXHRcdFx0XHRkZXNjOiB0ZXh0LmdlbmVyYWwuYXV0b1VwZGF0ZVRoZW1lc0F0U3RhcnR1cC5kZXNjLFxuXHRcdFx0XHRjb250cm9sOiB7IHR5cGU6IFwidG9nZ2xlXCIsIGtleTogXCJ1cGRhdGVUaGVtZXNBdFN0YXJ0dXBcIiB9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogdGV4dC5nZW5lcmFsLnNlbGVjdExhdGVzdFBsdWdpblZlcnNpb25CeURlZmF1bHQubmFtZSxcblx0XHRcdFx0ZGVzYzogdGV4dC5nZW5lcmFsLnNlbGVjdExhdGVzdFBsdWdpblZlcnNpb25CeURlZmF1bHQuZGVzYyxcblx0XHRcdFx0Y29udHJvbDoge1xuXHRcdFx0XHRcdHR5cGU6IFwidG9nZ2xlXCIsXG5cdFx0XHRcdFx0a2V5OiBcInNlbGVjdExhdGVzdFBsdWdpblZlcnNpb25CeURlZmF1bHRcIixcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IHRleHQuZ2VuZXJhbC5hbGxvd0luY29tcGF0aWJsZVBsdWdpbnMubmFtZSxcblx0XHRcdFx0ZGVzYzogdGV4dC5nZW5lcmFsLmFsbG93SW5jb21wYXRpYmxlUGx1Z2lucy5kZXNjLFxuXHRcdFx0XHRjb250cm9sOiB7IHR5cGU6IFwidG9nZ2xlXCIsIGtleTogXCJhbGxvd0luY29tcGF0aWJsZVBsdWdpbnNcIiB9LFxuXHRcdFx0fSxcblx0XHRcdHRoaXMuY3JlYXRlUGx1Z2luTGlzdERlZmluaXRpb24oKSxcblx0XHRcdHRoaXMuY3JlYXRlVGhlbWVMaXN0RGVmaW5pdGlvbigpLFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcImdyb3VwXCIsXG5cdFx0XHRcdGhlYWRpbmc6IHRleHQubW9uaXRvcmluZy5oZWFkaW5nLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6IHRleHQubW9uaXRvcmluZy5lbmFibGVOb3RpZmljYXRpb25zLm5hbWUsXG5cdFx0XHRcdFx0XHRkZXNjOiB0ZXh0Lm1vbml0b3JpbmcuZW5hYmxlTm90aWZpY2F0aW9ucy5kZXNjLFxuXHRcdFx0XHRcdFx0Y29udHJvbDogeyB0eXBlOiBcInRvZ2dsZVwiLCBrZXk6IFwibm90aWZpY2F0aW9uc0VuYWJsZWRcIiB9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogdGV4dC5tb25pdG9yaW5nLmVuYWJsZUxvZ2dpbmcubmFtZSxcblx0XHRcdFx0XHRcdGRlc2M6IHRleHQubW9uaXRvcmluZy5lbmFibGVMb2dnaW5nLmRlc2MsXG5cdFx0XHRcdFx0XHRjb250cm9sOiB7IHR5cGU6IFwidG9nZ2xlXCIsIGtleTogXCJsb2dnaW5nRW5hYmxlZFwiIH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiB0ZXh0Lm1vbml0b3JpbmcuYnJhdExvZ0ZpbGVMb2NhdGlvbi5uYW1lLFxuXHRcdFx0XHRcdFx0ZGVzYzogdGV4dC5tb25pdG9yaW5nLmJyYXRMb2dGaWxlTG9jYXRpb24uZGVzYyxcblx0XHRcdFx0XHRcdGNvbnRyb2w6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0ZXh0XCIsXG5cdFx0XHRcdFx0XHRcdGtleTogXCJsb2dnaW5nUGF0aFwiLFxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcjogdGV4dC5tb25pdG9yaW5nLmJyYXRMb2dGaWxlTG9jYXRpb24ucGxhY2Vob2xkZXIsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogdGV4dC5tb25pdG9yaW5nLmVuYWJsZVZlcmJvc2VMb2dnaW5nLm5hbWUsXG5cdFx0XHRcdFx0XHRkZXNjOiB0ZXh0Lm1vbml0b3JpbmcuZW5hYmxlVmVyYm9zZUxvZ2dpbmcuZGVzYyxcblx0XHRcdFx0XHRcdGNvbnRyb2w6IHsgdHlwZTogXCJ0b2dnbGVcIiwga2V5OiBcImxvZ2dpbmdWZXJib3NlRW5hYmxlZFwiIH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiB0ZXh0Lm1vbml0b3JpbmcuZGVidWdnaW5nTW9kZS5uYW1lLFxuXHRcdFx0XHRcdFx0ZGVzYzogdGV4dC5tb25pdG9yaW5nLmRlYnVnZ2luZ01vZGUuZGVzYyxcblx0XHRcdFx0XHRcdGNvbnRyb2w6IHsgdHlwZTogXCJ0b2dnbGVcIiwga2V5OiBcImRlYnVnZ2luZ01vZGVcIiB9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcImdyb3VwXCIsXG5cdFx0XHRcdGhlYWRpbmc6IHRleHQuZ2l0aHViUGVyc29uYWxBY2Nlc3NUb2tlbi5oZWFkaW5nLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6IHRleHQuZ2l0aHViUGVyc29uYWxBY2Nlc3NUb2tlbi5wZXJzb25hbEFjY2Vzc1Rva2VuLm5hbWUsXG5cdFx0XHRcdFx0XHRkZXNjOiBjcmVhdGVMaW5rKHtcblx0XHRcdFx0XHRcdFx0cHJlcGVuZFRleHQ6IHRleHQuZ2l0aHViUGVyc29uYWxBY2Nlc3NUb2tlbi5wZXJzb25hbEFjY2Vzc1Rva2VuLmRlc2MucHJlcGVuZFRleHQsXG5cdFx0XHRcdFx0XHRcdHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vc2V0dGluZ3MvdG9rZW5zL25ldz9zY29wZXM9cHVibGljX3JlcG9cIixcblx0XHRcdFx0XHRcdFx0dGV4dDogdGV4dC5naXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuLnBlcnNvbmFsQWNjZXNzVG9rZW4uZGVzYy5saW5rVGV4dCxcblx0XHRcdFx0XHRcdFx0YXBwZW5kVGV4dDogdGV4dC5naXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuLnBlcnNvbmFsQWNjZXNzVG9rZW4uZGVzYy5hcHBlbmRUZXh0LFxuXHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRyZW5kZXI6IChzZXR0aW5nKSA9PiB0aGlzLnJlbmRlclBlcnNvbmFsQWNjZXNzVG9rZW5TZXR0aW5nKHNldHRpbmcpLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdF07XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblx0XHRjb250YWluZXJFbC5hZGRDbGFzcyhcImJyYXQtc2V0dGluZ3NcIik7XG5cdFx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpLnNldHRpbmdzO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSh0ZXh0LmdlbmVyYWwuYXV0b0VuYWJsZVBsdWdpbnNBZnRlckluc3RhbGxhdGlvbi5uYW1lKVxuXHRcdFx0LnNldERlc2ModGV4dC5nZW5lcmFsLmF1dG9FbmFibGVQbHVnaW5zQWZ0ZXJJbnN0YWxsYXRpb24uZGVzYylcblx0XHRcdC5hZGRUb2dnbGUoKGNiOiBUb2dnbGVDb21wb25lbnQpID0+IHtcblx0XHRcdFx0Y2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQWZ0ZXJJbnN0YWxsKS5vbkNoYW5nZShhc3luYyAodmFsdWU6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVBZnRlckluc3RhbGwgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUodGV4dC5nZW5lcmFsLmF1dG9VcGRhdGVQbHVnaW5zQXRTdGFydHVwLm5hbWUpXG5cdFx0XHQuc2V0RGVzYyh0ZXh0LmdlbmVyYWwuYXV0b1VwZGF0ZVBsdWdpbnNBdFN0YXJ0dXAuZGVzYylcblx0XHRcdC5hZGRUb2dnbGUoKGNiOiBUb2dnbGVDb21wb25lbnQpID0+IHtcblx0XHRcdFx0Y2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXBkYXRlQXRTdGFydHVwKS5vbkNoYW5nZShhc3luYyAodmFsdWU6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy51cGRhdGVBdFN0YXJ0dXAgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUodGV4dC5nZW5lcmFsLmF1dG9VcGRhdGVUaGVtZXNBdFN0YXJ0dXAubmFtZSlcblx0XHRcdC5zZXREZXNjKHRleHQuZ2VuZXJhbC5hdXRvVXBkYXRlVGhlbWVzQXRTdGFydHVwLmRlc2MpXG5cdFx0XHQuYWRkVG9nZ2xlKChjYjogVG9nZ2xlQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVwZGF0ZVRoZW1lc0F0U3RhcnR1cCkub25DaGFuZ2UoYXN5bmMgKHZhbHVlOiBib29sZWFuKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudXBkYXRlVGhlbWVzQXRTdGFydHVwID0gdmFsdWU7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKHRleHQuZ2VuZXJhbC5zZWxlY3RMYXRlc3RQbHVnaW5WZXJzaW9uQnlEZWZhdWx0Lm5hbWUpXG5cdFx0XHQuc2V0RGVzYyh0ZXh0LmdlbmVyYWwuc2VsZWN0TGF0ZXN0UGx1Z2luVmVyc2lvbkJ5RGVmYXVsdC5kZXNjKVxuXHRcdFx0LmFkZFRvZ2dsZSgoY2I6IFRvZ2dsZUNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRjYi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZWxlY3RMYXRlc3RQbHVnaW5WZXJzaW9uQnlEZWZhdWx0KS5vbkNoYW5nZShhc3luYyAodmFsdWU6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZWxlY3RMYXRlc3RQbHVnaW5WZXJzaW9uQnlEZWZhdWx0ID0gdmFsdWU7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKHRleHQuZ2VuZXJhbC5hbGxvd0luY29tcGF0aWJsZVBsdWdpbnMubmFtZSlcblx0XHRcdC5zZXREZXNjKHRleHQuZ2VuZXJhbC5hbGxvd0luY29tcGF0aWJsZVBsdWdpbnMuZGVzYylcblx0XHRcdC5hZGRUb2dnbGUoKGNiOiBUb2dnbGVDb21wb25lbnQpID0+IHtcblx0XHRcdFx0Y2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWxsb3dJbmNvbXBhdGlibGVQbHVnaW5zKS5vbkNoYW5nZShhc3luYyAodmFsdWU6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hbGxvd0luY29tcGF0aWJsZVBsdWdpbnMgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdGNvbnN0IGZyb3plblZlcnNpb25zID0gbmV3IE1hcCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5TdWJMaXN0RnJvemVuVmVyc2lvbi5tYXAoKGYpID0+IFtmLnJlcG8sIGZdKSk7XG5cdFx0Y29uc3QgcGx1Z2luQ29udGFpbmVycyA9IG5ldyBNYXA8c3RyaW5nLCB7IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7IHBsdWdpbk5hbWU6IHN0cmluZyB9PigpO1xuXG5cdFx0Y29uc3QgYmV0YVBsdWdpbkdyb3VwID0gbmV3IFNldHRpbmdHcm91cChjb250YWluZXJFbCkuc2V0SGVhZGluZyh0ZXh0LmJldGFQbHVnaW5MaXN0LmhlYWRpbmcpO1xuXG5cdFx0YmV0YVBsdWdpbkdyb3VwLmFkZFNlYXJjaCgoY2IpID0+IHtcblx0XHRcdGNiLnNldFBsYWNlaG9sZGVyKHRleHQuYmV0YVBsdWdpbkxpc3QuZmlsdGVyUGxhY2Vob2xkZXIpO1xuXG5cdFx0XHRjYi5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXHRcdFx0XHRwbHVnaW5Db250YWluZXJzLmZvckVhY2goKHsgY29udGFpbmVyLCBwbHVnaW5OYW1lIH0pID0+IHtcblx0XHRcdFx0XHRpZiAoZmlsdGVyVmFsdWUgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChwbHVnaW5OYW1lLmluY2x1ZGVzKGZpbHRlclZhbHVlKSkge1xuXHRcdFx0XHRcdFx0XHRjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcInRydWVcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0YmV0YVBsdWdpbkdyb3VwLmFkZFNldHRpbmcoKHNldHRpbmcpID0+IHtcblx0XHRcdHNldHRpbmcuc2V0RGVzYyh0aGlzLmNyZWF0ZVBsdWdpbkxpc3REZXNjcmlwdGlvbkZyYWdtZW50KCkpO1xuXHRcdFx0c2V0dGluZy5hZGRCdXR0b24oKGNiOiBCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdFx0Y2Iuc2V0QnV0dG9uVGV4dCh0ZXh0LmJldGFQbHVnaW5MaXN0LmFkZEJldGFQbHVnaW4pXG5cdFx0XHRcdFx0LnNldEN0YSgpXG5cdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uYmV0YVBsdWdpbnMuZGlzcGxheUFkZE5ld1BsdWdpbk1vZGFsKHRydWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRmb3IgKGNvbnN0IHAgb2YgdGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luTGlzdCkge1xuXHRcdFx0Y29uc3QgYnAgPSBmcm96ZW5WZXJzaW9ucy5nZXQocCk7XG5cdFx0XHRiZXRhUGx1Z2luR3JvdXAuYWRkU2V0dGluZygocGx1Z2luU2V0dGluZ0NvbnRhaW5lcikgPT4ge1xuXHRcdFx0XHRjb25zdCBzZWNyZXROYW1lID0gYnA/LnRva2VuTmFtZSB8fCBcIlwiO1xuXHRcdFx0XHRjb25zdCBzZWNyZXRWYWx1ZSA9IHNlY3JldE5hbWUgPyB0aGlzLnBsdWdpbi5hcHAuc2VjcmV0U3RvcmFnZS5nZXRTZWNyZXQoc2VjcmV0TmFtZSkgOiBcIlwiO1xuXHRcdFx0XHRjb25zdCBpc1NlY3JldE1pc3NpbmcgPSBCb29sZWFuKHNlY3JldE5hbWUgJiYgIXNlY3JldFZhbHVlKTtcblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JzaWRpYW5tZC9wcmVmZXItYWN0aXZlLWRvYyAtLSBCUkFUIGNvbXBhdGliaWxpdHk6IGFjdGl2ZURvY3VtZW50IGJyZWFrcyBzZXR0aW5ncyBkZXNjcmlwdGlvbiByZW5kZXJpbmdcblx0XHRcdFx0Y29uc3QgcGx1Z2luRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdGNvbnN0IHRyYWNrZWRWZXJzaW9uVGV4dCA9IGJwPy52ZXJzaW9uID8gdGV4dC5iZXRhUGx1Z2luTGlzdC50cmFja2VkVmVyc2lvbihicC52ZXJzaW9uLCBicC52ZXJzaW9uICE9PSBcImxhdGVzdFwiKSA6IFwiXCI7XG5cdFx0XHRcdGNvbnN0IGluY29tcGF0aWJsZVRleHQgPSBicD8uaXNJbmNvbXBhdGlibGUgPyB0ZXh0LmJldGFQbHVnaW5MaXN0LmluY29tcGF0aWJsZSA6IFwiXCI7XG5cdFx0XHRcdHBsdWdpbkRlc2NyaXB0aW9uLmNyZWF0ZURpdih7XG5cdFx0XHRcdFx0dGV4dDogYCR7dHJhY2tlZFZlcnNpb25UZXh0fSR7aW5jb21wYXRpYmxlVGV4dH1gLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKGlzU2VjcmV0TWlzc2luZykge1xuXHRcdFx0XHRcdHBsdWdpbkRlc2NyaXB0aW9uLmNyZWF0ZURpdih7XG5cdFx0XHRcdFx0XHR0ZXh0OiB0ZXh0LmJldGFQbHVnaW5MaXN0LnNlY3JldE1pc3Npbmcoc2VjcmV0TmFtZSksXG5cdFx0XHRcdFx0XHRjbHM6IFwibW9kLXdhcm5pbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOiB0ZXh0LmJldGFQbHVnaW5MaXN0LnNlY3JldE1pc3NpbmdUaXRsZSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBsdWdpblNldHRpbmdDb250YWluZXIuc2V0TmFtZShjcmVhdGVHaXRIdWJSZXNvdXJjZUxpbmsocCkpLnNldERlc2MocGx1Z2luRGVzY3JpcHRpb24pO1xuXG5cdFx0XHRcdGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBwbHVnaW5TZXR0aW5nQ29udGFpbmVyLnNldHRpbmdFbDtcblx0XHRcdFx0Y29udGFpbmVyRWxlbWVudC5hZGRDbGFzcyhcImJyYXQtcGx1Z2luLWl0ZW1cIik7XG5cdFx0XHRcdHBsdWdpbkNvbnRhaW5lcnMuc2V0KHAsIHtcblx0XHRcdFx0XHRjb250YWluZXI6IGNvbnRhaW5lckVsZW1lbnQsXG5cdFx0XHRcdFx0cGx1Z2luTmFtZTogcC50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRwbHVnaW5TZXR0aW5nQ29udGFpbmVyLmFkZEV4dHJhQnV0dG9uKChidG46IEV4dHJhQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdFx0YnRuXG5cdFx0XHRcdFx0XHQuc2V0SWNvbihcImNvcHlcIilcblx0XHRcdFx0XHRcdC5zZXRUb29sdGlwKHRleHQuYmV0YVBsdWdpbkxpc3QuY29weVBsdWdpbklkZW50aWZpZXIpXG5cdFx0XHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuY29weVJlcG9JZGVudGlmaWVyKHApO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICghYnA/LnZlcnNpb24gfHwgYnAudmVyc2lvbiA9PT0gXCJsYXRlc3RcIikge1xuXHRcdFx0XHRcdC8vIE9ubHkgc2hvdyB1cGRhdGUgYnV0dG9uIGZvciBwbHVnaW5zIHRyYWNraW5nIGxhdGVzdCB2ZXJzaW9uXG5cdFx0XHRcdFx0cGx1Z2luU2V0dGluZ0NvbnRhaW5lci5hZGRCdXR0b24oKGJ0bjogQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoaXNTZWNyZXRNaXNzaW5nKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFRva2VuIG5hbWUgY29uZmlndXJlZCBidXQgc2VjcmV0IG1pc3Npbmc6IG1ha2UgYnV0dG9uIHJlZCwgZGlzYWJsZWQsIGFuZCBzaG93IGluZm9ybWF0aXZlIHRvb2x0aXBcblx0XHRcdFx0XHRcdFx0YnRuLnNldEljb24oXCJzeW5jXCIpLnNldFRvb2x0aXAodGV4dC5iZXRhUGx1Z2luTGlzdC5zZWNyZXRNaXNzaW5nVG9vbHRpcChzZWNyZXROYW1lKSkuc2V0V2FybmluZygpLnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YnRuXG5cdFx0XHRcdFx0XHRcdFx0LnNldEljb24oXCJzeW5jXCIpXG5cdFx0XHRcdFx0XHRcdFx0LnNldFRvb2x0aXAodGV4dC5iZXRhUGx1Z2luTGlzdC5jaGVja0FuZFVwZGF0ZVBsdWdpbilcblx0XHRcdFx0XHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy51cGRhdGVQbHVnaW4ocCwgZmFsc2UsIHRydWUsIGZhbHNlLCBicD8udG9rZW5OYW1lIHx8IFwiXCIpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ29udGFpbmVyIGZvciB0aGUgZWRpdCBhbmQgcmVtb3ZhbCBidXR0b25zXG5cdFx0XHRcdHBsdWdpblNldHRpbmdDb250YWluZXJcblx0XHRcdFx0XHQuYWRkQnV0dG9uKChidG46IEJ1dHRvbkNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0YnRuLnNldEljb24oXCJlZGl0XCIpLnNldFRvb2x0aXAodGV4dC5iZXRhUGx1Z2luTGlzdC5jaGFuZ2VWZXJzaW9uQW5kVXBkYXRlU2V0dGluZ3MpO1xuXG5cdFx0XHRcdFx0XHRpZiAoaXNTZWNyZXRNaXNzaW5nKSB7XG5cdFx0XHRcdFx0XHRcdGJ0bi5zZXRXYXJuaW5nKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGJ0bi5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uYmV0YVBsdWdpbnMuZGlzcGxheUFkZE5ld1BsdWdpbk1vZGFsKFxuXHRcdFx0XHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRwLFxuXHRcdFx0XHRcdFx0XHRcdGJwPy52ZXJzaW9uLFxuXHRcdFx0XHRcdFx0XHRcdGJwPy50b2tlbk5hbWUgfHwgXCJcIiwgLy8gUGFzcyBzZWNyZXQgbmFtZSwgbm90IHRva2VuIHZhbHVlXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLmFwcC5zZXR0aW5nLnVwZGF0ZVBsdWdpblNlY3Rpb24oKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmFkZEJ1dHRvbigoYnRuOiBCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdFx0XHRcdGJ0blxuXHRcdFx0XHRcdFx0XHQuc2V0SWNvbihcImNyb3NzXCIpXG5cdFx0XHRcdFx0XHRcdC5zZXRUb29sdGlwKHRleHQuYmV0YVBsdWdpbkxpc3QucmVtb3ZlVGhpc0JldGFQbHVnaW4pXG5cdFx0XHRcdFx0XHRcdC5zZXRXYXJuaW5nKClcblx0XHRcdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChidG4uYnV0dG9uRWwudGV4dENvbnRlbnQgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGJ0bi5zZXRCdXR0b25UZXh0KHRleHQuYmV0YVBsdWdpbkxpc3QuY29uZmlybVJlbW92YWwpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB7IGJ1dHRvbkVsIH0gPSBidG47XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB7IHBhcmVudEVsZW1lbnQgfSA9IGJ1dHRvbkVsO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5kZWxldGVQbHVnaW4ocCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRoZW1lQ29udGFpbmVycyA9IG5ldyBNYXA8c3RyaW5nLCB7IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7IHRoZW1lTmFtZTogc3RyaW5nIH0+KCk7XG5cdFx0Y29uc3QgYmV0YVRoZW1lR3JvdXAgPSBuZXcgU2V0dGluZ0dyb3VwKGNvbnRhaW5lckVsKS5zZXRIZWFkaW5nKHRleHQuYmV0YVRoZW1lTGlzdC5oZWFkaW5nKTtcblxuXHRcdGJldGFUaGVtZUdyb3VwLmFkZFNldHRpbmcoKHNldHRpbmcpID0+IHtcblx0XHRcdHNldHRpbmcuYWRkQnV0dG9uKChjYjogQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdGNiLnNldEJ1dHRvblRleHQodGV4dC5iZXRhVGhlbWVMaXN0LmFkZEJldGFUaGVtZSlcblx0XHRcdFx0XHQuc2V0Q3RhKClcblx0XHRcdFx0XHQub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5hcHAuc2V0dGluZy5jbG9zZSgpO1xuXHRcdFx0XHRcdFx0bmV3IEFkZE5ld1RoZW1lKHRoaXMucGx1Z2luKS5vcGVuKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGJldGFUaGVtZUdyb3VwLmFkZFNlYXJjaCgoY2IpID0+IHtcblx0XHRcdGNiLnNldFBsYWNlaG9sZGVyKHRleHQuYmV0YVRoZW1lTGlzdC5maWx0ZXJQbGFjZWhvbGRlcik7XG5cblx0XHRcdGNiLm9uQ2hhbmdlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cdFx0XHRcdHRoZW1lQ29udGFpbmVycy5mb3JFYWNoKCh7IGNvbnRhaW5lciwgdGhlbWVOYW1lIH0pID0+IHtcblx0XHRcdFx0XHRpZiAoZmlsdGVyVmFsdWUgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICh0aGVtZU5hbWUuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRmb3IgKGNvbnN0IGJwIG9mIHRoaXMucGx1Z2luLnNldHRpbmdzLnRoZW1lc0xpc3QpIHtcblx0XHRcdGJldGFUaGVtZUdyb3VwLmFkZFNldHRpbmcoKHRoZW1lU2V0dGluZ0NvbnRhaW5lcikgPT4ge1xuXHRcdFx0XHR0aGVtZVNldHRpbmdDb250YWluZXIuc2V0TmFtZShjcmVhdGVHaXRIdWJSZXNvdXJjZUxpbmsoYnAucmVwbykpO1xuXG5cdFx0XHRcdGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSB0aGVtZVNldHRpbmdDb250YWluZXIuc2V0dGluZ0VsO1xuXHRcdFx0XHRjb250YWluZXJFbGVtZW50LmFkZENsYXNzKFwiYnJhdC10aGVtZS1pdGVtXCIpO1xuXHRcdFx0XHR0aGVtZUNvbnRhaW5lcnMuc2V0KGJwLnJlcG8sIHtcblx0XHRcdFx0XHRjb250YWluZXI6IGNvbnRhaW5lckVsZW1lbnQsXG5cdFx0XHRcdFx0dGhlbWVOYW1lOiBicC5yZXBvLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoZW1lU2V0dGluZ0NvbnRhaW5lci5hZGRFeHRyYUJ1dHRvbigoYnRuOiBFeHRyYUJ1dHRvbkNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRcdGJ0blxuXHRcdFx0XHRcdFx0LnNldEljb24oXCJjb3B5XCIpXG5cdFx0XHRcdFx0XHQuc2V0VG9vbHRpcCh0ZXh0LmJldGFUaGVtZUxpc3QuY29weVRoZW1lSWRlbnRpZmllcilcblx0XHRcdFx0XHRcdC5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5jb3B5UmVwb0lkZW50aWZpZXIoYnAucmVwbyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhlbWVTZXR0aW5nQ29udGFpbmVyLmFkZEJ1dHRvbigoYnRuOiBCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdFx0XHRidG5cblx0XHRcdFx0XHRcdC5zZXRJY29uKFwiY3Jvc3NcIilcblx0XHRcdFx0XHRcdC5zZXRUb29sdGlwKHRleHQuYmV0YVRoZW1lTGlzdC5kZWxldGVUaGlzQmV0YVRoZW1lKVxuXHRcdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoYnRuLmJ1dHRvbkVsLnRleHRDb250ZW50ID09PSBcIlwiKSBidG4uc2V0QnV0dG9uVGV4dCh0ZXh0LmJldGFUaGVtZUxpc3QuY29uZmlybVJlbW92YWwpO1xuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB7IGJ1dHRvbkVsIH0gPSBidG47XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgeyBwYXJlbnRFbGVtZW50IH0gPSBidXR0b25FbDtcblx0XHRcdFx0XHRcdFx0XHRpZiAocGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhlbWVEZWxldGUodGhpcy5wbHVnaW4sIGJwLnJlcG8pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbW9uaXRvcmluZ0dyb3VwID0gbmV3IFNldHRpbmdHcm91cChjb250YWluZXJFbCkuc2V0SGVhZGluZyh0ZXh0Lm1vbml0b3JpbmcuaGVhZGluZyk7XG5cblx0XHRtb25pdG9yaW5nR3JvdXAuYWRkU2V0dGluZygoc2V0dGluZykgPT4ge1xuXHRcdFx0c2V0dGluZ1xuXHRcdFx0XHQuc2V0TmFtZSh0ZXh0Lm1vbml0b3JpbmcuZW5hYmxlTm90aWZpY2F0aW9ucy5uYW1lKVxuXHRcdFx0XHQuc2V0RGVzYyh0ZXh0Lm1vbml0b3JpbmcuZW5hYmxlTm90aWZpY2F0aW9ucy5kZXNjKVxuXHRcdFx0XHQuYWRkVG9nZ2xlKChjYjogVG9nZ2xlQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdFx0Y2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mubm90aWZpY2F0aW9uc0VuYWJsZWQpO1xuXHRcdFx0XHRcdGNiLm9uQ2hhbmdlKCh2YWx1ZTogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Mubm90aWZpY2F0aW9uc0VuYWJsZWQgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdHZvaWQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0bW9uaXRvcmluZ0dyb3VwLmFkZFNldHRpbmcoKHNldHRpbmcpID0+IHtcblx0XHRcdHNldHRpbmdcblx0XHRcdFx0LnNldE5hbWUodGV4dC5tb25pdG9yaW5nLmVuYWJsZUxvZ2dpbmcubmFtZSlcblx0XHRcdFx0LnNldERlc2ModGV4dC5tb25pdG9yaW5nLmVuYWJsZUxvZ2dpbmcuZGVzYylcblx0XHRcdFx0LmFkZFRvZ2dsZSgoY2I6IFRvZ2dsZUNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRcdGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ2dpbmdFbmFibGVkKS5vbkNoYW5nZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ2dpbmdFbmFibGVkID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR2b2lkIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdG1vbml0b3JpbmdHcm91cC5hZGRTZXR0aW5nKChzZXR0aW5nKSA9PiB7XG5cdFx0XHRzZXR0aW5nXG5cdFx0XHRcdC5zZXROYW1lKHRleHQubW9uaXRvcmluZy5icmF0TG9nRmlsZUxvY2F0aW9uLm5hbWUpXG5cdFx0XHRcdC5zZXREZXNjKHRleHQubW9uaXRvcmluZy5icmF0TG9nRmlsZUxvY2F0aW9uLmRlc2MpXG5cdFx0XHRcdC5hZGRTZWFyY2goKGNiKSA9PiB7XG5cdFx0XHRcdFx0Y2Iuc2V0UGxhY2Vob2xkZXIodGV4dC5tb25pdG9yaW5nLmJyYXRMb2dGaWxlTG9jYXRpb24ucGxhY2Vob2xkZXIpXG5cdFx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nZ2luZ1BhdGgpXG5cdFx0XHRcdFx0XHQub25DaGFuZ2UoKG5ld0ZvbGRlcikgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dnaW5nUGF0aCA9IG5ld0ZvbGRlcjtcblx0XHRcdFx0XHRcdFx0dm9pZCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdG1vbml0b3JpbmdHcm91cC5hZGRTZXR0aW5nKChzZXR0aW5nKSA9PiB7XG5cdFx0XHRzZXR0aW5nXG5cdFx0XHRcdC5zZXROYW1lKHRleHQubW9uaXRvcmluZy5lbmFibGVWZXJib3NlTG9nZ2luZy5uYW1lKVxuXHRcdFx0XHQuc2V0RGVzYyh0ZXh0Lm1vbml0b3JpbmcuZW5hYmxlVmVyYm9zZUxvZ2dpbmcuZGVzYylcblx0XHRcdFx0LmFkZFRvZ2dsZSgoY2I6IFRvZ2dsZUNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRcdGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ2dpbmdWZXJib3NlRW5hYmxlZCkub25DaGFuZ2UoKHZhbHVlOiBib29sZWFuKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dnaW5nVmVyYm9zZUVuYWJsZWQgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdHZvaWQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0bW9uaXRvcmluZ0dyb3VwLmFkZFNldHRpbmcoKHNldHRpbmcpID0+IHtcblx0XHRcdHNldHRpbmdcblx0XHRcdFx0LnNldE5hbWUodGV4dC5tb25pdG9yaW5nLmRlYnVnZ2luZ01vZGUubmFtZSlcblx0XHRcdFx0LnNldERlc2ModGV4dC5tb25pdG9yaW5nLmRlYnVnZ2luZ01vZGUuZGVzYylcblx0XHRcdFx0LmFkZFRvZ2dsZSgoY2I6IFRvZ2dsZUNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRcdGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlYnVnZ2luZ01vZGUpLm9uQ2hhbmdlKCh2YWx1ZTogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dm9pZCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBQZXJzb25hbCBhY2Nlc3MgdG9rZW4gc2V0dGluZ1xuXHRcdGNvbnN0IHRva2VuU2VjdGlvbiA9IG5ldyBTZXR0aW5nR3JvdXAoY29udGFpbmVyRWwpLnNldEhlYWRpbmcodGV4dC5naXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuLmhlYWRpbmcpO1xuXG5cdFx0bGV0IGN1cnJlbnRUb2tlblZhbHVlID0gXCJcIjtcblx0XHR0b2tlblNlY3Rpb24uYWRkU2V0dGluZygodG9rZW5TZXR0aW5nKSA9PiB7XG5cdFx0XHR0b2tlblNldHRpbmcuc2V0TmFtZSh0ZXh0LmdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW4ucGVyc29uYWxBY2Nlc3NUb2tlbi5uYW1lKS5zZXREZXNjKFxuXHRcdFx0XHRjcmVhdGVMaW5rKHtcblx0XHRcdFx0XHRwcmVwZW5kVGV4dDogdGV4dC5naXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuLnBlcnNvbmFsQWNjZXNzVG9rZW4uZGVzYy5wcmVwZW5kVGV4dCxcblx0XHRcdFx0XHR1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL3NldHRpbmdzL3Rva2Vucy9uZXc/c2NvcGVzPXB1YmxpY19yZXBvXCIsXG5cdFx0XHRcdFx0dGV4dDogdGV4dC5naXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuLnBlcnNvbmFsQWNjZXNzVG9rZW4uZGVzYy5saW5rVGV4dCxcblx0XHRcdFx0XHRhcHBlbmRUZXh0OiB0ZXh0LmdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW4ucGVyc29uYWxBY2Nlc3NUb2tlbi5kZXNjLmFwcGVuZFRleHQsXG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gQ3JlYXRlIFNlY3JldENvbXBvbmVudCAtIGRpc3BsYXlzIHNlY3JldCBOQU1FIHNlbGVjdG9yXG5cdFx0XHR0aGlzLmFjY2Vzc1Rva2VuU2V0dGluZyA9IG5ldyBTZWNyZXRDb21wb25lbnRDbGFzcyh0aGlzLnBsdWdpbi5hcHAsIHRva2VuU2V0dGluZy5jb250cm9sRWwpO1xuXG5cdFx0XHQvLyBTZXQgdGhlIGNvbXBvbmVudCB0byBzaG93IHRoZSBjdXJyZW50IHNlY3JldCBuYW1lIGZyb20gc2V0dGluZ3Ncblx0XHRcdHRoaXMuYWNjZXNzVG9rZW5TZXR0aW5nLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSB8fCBcIlwiKS5vbkNoYW5nZSgoc2VjcmV0TmFtZTogc3RyaW5nIHwgbnVsbCkgPT4ge1xuXHRcdFx0XHR2b2lkIChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gc2VjcmV0TmFtZSBpcyB0aGUgTkFNRSBvZiB0aGUgc2VjcmV0LCBub3QgdGhlIHZhbHVlIChjYW4gYmUgbnVsbCB3aGVuIGNsZWFyZWQpXG5cdFx0XHRcdFx0Y29uc3Qgbm9ybWFsaXplZE5hbWUgPSBzZWNyZXROYW1lPy50cmltKCkgfHwgXCJcIjtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5nbG9iYWxUb2tlbk5hbWUgPSBub3JtYWxpemVkTmFtZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblxuXHRcdFx0XHRcdC8vIEdldCB0aGUgYWN0dWFsIHRva2VuIHZhbHVlIGZvciB2YWxpZGF0aW9uXG5cdFx0XHRcdFx0aWYgKG5vcm1hbGl6ZWROYW1lKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChub3JtYWxpemVkTmFtZSkgfHwgXCJcIjtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGVHbG9iYWxUb2tlbkFuZFVwZGF0ZUJ1dHRvbihjdXJyZW50VG9rZW5WYWx1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRUb2tlblZhbHVlID0gXCJcIjtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGVHbG9iYWxUb2tlbkFuZFVwZGF0ZUJ1dHRvbihcIlwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gR2V0IGluaXRpYWwgdG9rZW4gdmFsdWUgZm9yIHZhbGlkYXRpb25cblx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5nbG9iYWxUb2tlbk5hbWUpIHtcblx0XHRcdFx0Y3VycmVudFRva2VuVmFsdWUgPSB0aGlzLnBsdWdpbi5hcHAuc2VjcmV0U3RvcmFnZS5nZXRTZWNyZXQodGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2xvYmFsVG9rZW5OYW1lKSB8fCBcIlwiO1xuXHRcdFx0fVxuXG5cdFx0XHR0b2tlblNldHRpbmdcblx0XHRcdFx0LmFkZEV4dHJhQnV0dG9uKChjYjogRXh0cmFCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdFx0XHRjYi5zZXRJY29uKFwiY3Jvc3NcIilcblx0XHRcdFx0XHRcdC5zZXRUb29sdGlwKHRleHQuZ2l0aHViUGVyc29uYWxBY2Nlc3NUb2tlbi5jbGVhclBlcnNvbmFsQWNjZXNzVG9rZW4pXG5cdFx0XHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFjY2Vzc1Rva2VuU2V0dGluZz8uc2V0VmFsdWUoXCJcIik7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUb2tlblZhbHVlID0gXCJcIjtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy52YWxpZGF0ZUdsb2JhbFRva2VuQW5kVXBkYXRlQnV0dG9uKFwiXCIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5hZGRCdXR0b24oKGJ0bjogQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5hY2Nlc3NUb2tlbkJ1dHRvbiA9IGJ0bjtcblxuXHRcdFx0XHRcdGJ0blxuXHRcdFx0XHRcdFx0LnNldEJ1dHRvblRleHQodGV4dC5naXRodWJQZXJzb25hbEFjY2Vzc1Rva2VuLnZhbGlkYXRlKVxuXHRcdFx0XHRcdFx0LnNldEN0YSgpXG5cdFx0XHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChjdXJyZW50VG9rZW5WYWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGVHbG9iYWxUb2tlbkFuZFVwZGF0ZUJ1dHRvbihjdXJyZW50VG9rZW5WYWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dm9pZCB0aGlzLnZhbGlkYXRlR2xvYmFsVG9rZW5BbmRVcGRhdGVCdXR0b24oY3VycmVudFRva2VuVmFsdWUpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlUGx1Z2luTGlzdERlZmluaXRpb24oKTogU2V0dGluZ0RlZmluaXRpb25MaXN0PEJyYXRTZXR0aW5nc0tleT4ge1xuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKS5zZXR0aW5ncztcblx0XHRjb25zdCBmcm96ZW5WZXJzaW9ucyA9IG5ldyBNYXAodGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luU3ViTGlzdEZyb3plblZlcnNpb24ubWFwKChmKSA9PiBbZi5yZXBvLCBmXSkpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwibGlzdFwiLFxuXHRcdFx0aGVhZGluZzogdGV4dC5iZXRhUGx1Z2luTGlzdC5oZWFkaW5nLFxuXHRcdFx0c2VhcmNoOiB0aGlzLmNyZWF0ZUxpc3RTZWFyY2godGV4dC5iZXRhUGx1Z2luTGlzdC5maWx0ZXJQbGFjZWhvbGRlciksXG5cdFx0XHRhZGRJdGVtOiB7XG5cdFx0XHRcdG5hbWU6IHRleHQuYmV0YVBsdWdpbkxpc3QuYWRkQmV0YVBsdWdpbixcblx0XHRcdFx0YWN0aW9uOiAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uYmV0YVBsdWdpbnMuZGlzcGxheUFkZE5ld1BsdWdpbk1vZGFsKHRydWUsIGZhbHNlLCBcIlwiLCBcIlwiLCBcIlwiLCAoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRpdGVtczogW1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVBsdWdpbkxpc3REZXNjcmlwdGlvbkl0ZW0oKSxcblx0XHRcdFx0Li4udGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luTGlzdC5tYXAoKHJlcG9zaXRvcnkpID0+IHtcblx0XHRcdFx0XHRjb25zdCB0cmFja2VkUGx1Z2luID0gZnJvemVuVmVyc2lvbnMuZ2V0KHJlcG9zaXRvcnkpO1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRuYW1lOiByZXBvc2l0b3J5LFxuXHRcdFx0XHRcdFx0ZGVzYzogdGhpcy5jcmVhdGVUcmFja2VkUGx1Z2luRGVzY3JpcHRpb25UZXh0KHRyYWNrZWRQbHVnaW4pLFxuXHRcdFx0XHRcdFx0cmVuZGVyOiAoc2V0dGluZzogU2V0dGluZykgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbmRlclRyYWNrZWRQbHVnaW5TZXR0aW5nKHNldHRpbmcsIHJlcG9zaXRvcnksIHRyYWNrZWRQbHVnaW4pO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9KSxcblx0XHRcdF0sXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlVGhlbWVMaXN0RGVmaW5pdGlvbigpOiBTZXR0aW5nRGVmaW5pdGlvbkxpc3Q8QnJhdFNldHRpbmdzS2V5PiB7XG5cdFx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpLnNldHRpbmdzO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwibGlzdFwiLFxuXHRcdFx0aGVhZGluZzogdGV4dC5iZXRhVGhlbWVMaXN0LmhlYWRpbmcsXG5cdFx0XHRzZWFyY2g6IHRoaXMuY3JlYXRlTGlzdFNlYXJjaCh0ZXh0LmJldGFUaGVtZUxpc3QuZmlsdGVyUGxhY2Vob2xkZXIpLFxuXHRcdFx0YWRkSXRlbToge1xuXHRcdFx0XHRuYW1lOiB0ZXh0LmJldGFUaGVtZUxpc3QuYWRkQmV0YVRoZW1lLFxuXHRcdFx0XHRhY3Rpb246ICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5hcHAuc2V0dGluZy5jbG9zZSgpO1xuXHRcdFx0XHRcdG5ldyBBZGROZXdUaGVtZSh0aGlzLnBsdWdpbiwgdHJ1ZSwgKCkgPT4gdGhpcy51cGRhdGUoKSkub3BlbigpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdGl0ZW1zOiB0aGlzLnBsdWdpbi5zZXR0aW5ncy50aGVtZXNMaXN0Lm1hcCgodGhlbWUpID0+ICh7XG5cdFx0XHRcdG5hbWU6IHRoZW1lLnJlcG8sXG5cdFx0XHRcdHJlbmRlcjogKHNldHRpbmcpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlbmRlclRyYWNrZWRUaGVtZVNldHRpbmcoc2V0dGluZywgdGhlbWUpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSkpLFxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZVBsdWdpbkxpc3REZXNjcmlwdGlvbkl0ZW0oKTogU2V0dGluZ0dyb3VwSXRlbTxCcmF0U2V0dGluZ3NLZXk+IHtcblx0XHRjb25zdCBndWlkZVVybCA9XG5cdFx0XHRcImh0dHBzOi8vZ2l0aHViLmNvbS9UZlRIYWNrZXIvb2JzaWRpYW40Mi1icmF0L2Jsb2IvbWFpbi9CUkFULURFVkVMT1BFUi1HVUlERS5tZCNtYW5hZ2luZy1iZXRhLXBsdWdpbi1hbmQtdGhlbWUtbGlzdHMtaW4tc2V0dGluZ3NcIjtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRuYW1lOiBcIlwiLFxuXHRcdFx0c2VhcmNoYWJsZTogZmFsc2UsXG5cdFx0XHRyZW5kZXI6IChzZXR0aW5nKSA9PiB7XG5cdFx0XHRcdHNldHRpbmcuc2V0dGluZ0VsLmVtcHR5KCk7XG5cdFx0XHRcdGNvbnN0IGxpbmUgPSBzZXR0aW5nLnNldHRpbmdFbC5jcmVhdGVEaXYoKTtcblx0XHRcdFx0bGluZS5jcmVhdGVTcGFuKHtcblx0XHRcdFx0XHR0ZXh0OiBnZXRUcmFuc2xhdGlvbnMoKS5zZXR0aW5ncy5iZXRhUGx1Z2luTGlzdC5kZXNjcmlwdGlvbi5lZGl0QW5kUmVtb3ZlLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0bGluZS5hcHBlbmRUZXh0KFwiIFwiKTtcblx0XHRcdFx0bGluZS5jcmVhdGVFbChcImFcIiwge1xuXHRcdFx0XHRcdGhyZWY6IGd1aWRlVXJsLFxuXHRcdFx0XHRcdHRleHQ6IFwiTGVhcm4gbW9yZVwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlUGx1Z2luTGlzdERlc2NyaXB0aW9uRnJhZ21lbnQoKTogRG9jdW1lbnRGcmFnbWVudCB7XG5cdFx0Y29uc3QgZ3VpZGVVcmwgPVxuXHRcdFx0XCJodHRwczovL2dpdGh1Yi5jb20vVGZUSGFja2VyL29ic2lkaWFuNDItYnJhdC9ibG9iL21haW4vQlJBVC1ERVZFTE9QRVItR1VJREUubWQjbWFuYWdpbmctYmV0YS1wbHVnaW4tYW5kLXRoZW1lLWxpc3RzLWluLXNldHRpbmdzXCI7XG5cdFx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpLnNldHRpbmdzLmJldGFQbHVnaW5MaXN0LmRlc2NyaXB0aW9uO1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYnNpZGlhbm1kL3ByZWZlci1hY3RpdmUtZG9jIC0tIEJSQVQgY29tcGF0aWJpbGl0eTogYWN0aXZlRG9jdW1lbnQgYnJlYWtzIHNldHRpbmdzIGRlc2NyaXB0aW9uIHJlbmRlcmluZ1xuXHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdGNvbnN0IGxpbmUgPSBmcmFnbWVudC5jcmVhdGVFbChcImRpdlwiKTtcblx0XHRsaW5lLmNyZWF0ZVNwYW4oeyB0ZXh0OiB0ZXh0LmVkaXRBbmRSZW1vdmUgfSk7XG5cdFx0bGluZS5hcHBlbmRUZXh0KFwiIFwiKTtcblx0XHRsaW5lLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRocmVmOiBndWlkZVVybCxcblx0XHRcdHRleHQ6IFwiTGVhcm4gbW9yZVwiLFxuXHRcdH0pO1xuXHRcdHJldHVybiBmcmFnbWVudDtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlVHJhY2tlZFBsdWdpbkRlc2NyaXB0aW9uRnJhZ21lbnQodHJhY2tlZFBsdWdpbj86IFBsdWdpblZlcnNpb24pOiBEb2N1bWVudEZyYWdtZW50IHtcblx0XHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuc2V0dGluZ3MuYmV0YVBsdWdpbkxpc3Q7XG5cdFx0Y29uc3Qgc2VjcmV0TmFtZSA9IHRyYWNrZWRQbHVnaW4/LnRva2VuTmFtZSB8fCBcIlwiO1xuXHRcdGNvbnN0IHNlY3JldFZhbHVlID0gc2VjcmV0TmFtZSA/IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChzZWNyZXROYW1lKSA6IFwiXCI7XG5cdFx0Y29uc3QgaXNTZWNyZXRNaXNzaW5nID0gQm9vbGVhbihzZWNyZXROYW1lICYmICFzZWNyZXRWYWx1ZSk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9ic2lkaWFubWQvcHJlZmVyLWFjdGl2ZS1kb2MgLS0gQlJBVCBjb21wYXRpYmlsaXR5OiBhY3RpdmVEb2N1bWVudCBicmVha3Mgc2V0dGluZ3MgZGVzY3JpcHRpb24gcmVuZGVyaW5nXG5cdFx0Y29uc3QgcGx1Z2luRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0Y29uc3QgdHJhY2tlZFZlcnNpb25UZXh0ID0gdHJhY2tlZFBsdWdpbj8udmVyc2lvbiA/IHRleHQudHJhY2tlZFZlcnNpb24odHJhY2tlZFBsdWdpbi52ZXJzaW9uLCB0cmFja2VkUGx1Z2luLnZlcnNpb24gIT09IFwibGF0ZXN0XCIpIDogXCJcIjtcblx0XHRjb25zdCBpbmNvbXBhdGlibGVUZXh0ID0gdHJhY2tlZFBsdWdpbj8uaXNJbmNvbXBhdGlibGUgPyB0ZXh0LmluY29tcGF0aWJsZSA6IFwiXCI7XG5cdFx0cGx1Z2luRGVzY3JpcHRpb24uY3JlYXRlRGl2KHtcblx0XHRcdHRleHQ6IGAke3RyYWNrZWRWZXJzaW9uVGV4dH0ke2luY29tcGF0aWJsZVRleHR9YCxcblx0XHR9KTtcblx0XHRpZiAoaXNTZWNyZXRNaXNzaW5nKSB7XG5cdFx0XHRwbHVnaW5EZXNjcmlwdGlvbi5jcmVhdGVEaXYoe1xuXHRcdFx0XHR0ZXh0OiB0ZXh0LnNlY3JldE1pc3Npbmcoc2VjcmV0TmFtZSksXG5cdFx0XHRcdGNsczogXCJtb2Qtd2FybmluZ1wiLFxuXHRcdFx0XHR0aXRsZTogdGV4dC5zZWNyZXRNaXNzaW5nVGl0bGUsXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHBsdWdpbkRlc2NyaXB0aW9uO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVUcmFja2VkUGx1Z2luRGVzY3JpcHRpb25UZXh0KHRyYWNrZWRQbHVnaW4/OiBQbHVnaW5WZXJzaW9uKTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuc2V0dGluZ3MuYmV0YVBsdWdpbkxpc3Q7XG5cdFx0Y29uc3QgdHJhY2tlZFZlcnNpb25UZXh0ID0gdHJhY2tlZFBsdWdpbj8udmVyc2lvbiA/IHRleHQudHJhY2tlZFZlcnNpb24odHJhY2tlZFBsdWdpbi52ZXJzaW9uLCB0cmFja2VkUGx1Z2luLnZlcnNpb24gIT09IFwibGF0ZXN0XCIpIDogXCJcIjtcblx0XHRjb25zdCBpbmNvbXBhdGlibGVUZXh0ID0gdHJhY2tlZFBsdWdpbj8uaXNJbmNvbXBhdGlibGUgPyB0ZXh0LmluY29tcGF0aWJsZSA6IFwiXCI7XG5cdFx0Y29uc3Qgc2VjcmV0TmFtZSA9IHRyYWNrZWRQbHVnaW4/LnRva2VuTmFtZSB8fCBcIlwiO1xuXHRcdGNvbnN0IHNlY3JldFZhbHVlID0gc2VjcmV0TmFtZSA/IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChzZWNyZXROYW1lKSA6IFwiXCI7XG5cdFx0Y29uc3Qgc2VjcmV0VGV4dCA9IHNlY3JldE5hbWUgJiYgIXNlY3JldFZhbHVlID8gdGV4dC5zZWNyZXRNaXNzaW5nKHNlY3JldE5hbWUpIDogXCJcIjtcblx0XHRyZXR1cm4gYCR7dHJhY2tlZFZlcnNpb25UZXh0fSR7aW5jb21wYXRpYmxlVGV4dH0ke3NlY3JldFRleHR9YC50cmltKCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlclRyYWNrZWRQbHVnaW5TZXR0aW5nKHNldHRpbmc6IFNldHRpbmcsIHJlcG9zaXRvcnk6IHN0cmluZywgdHJhY2tlZFBsdWdpbj86IFBsdWdpblZlcnNpb24pOiB2b2lkIHtcblx0XHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuc2V0dGluZ3MuYmV0YVBsdWdpbkxpc3Q7XG5cdFx0Y29uc3Qgc2VjcmV0TmFtZSA9IHRyYWNrZWRQbHVnaW4/LnRva2VuTmFtZSB8fCBcIlwiO1xuXHRcdGNvbnN0IHNlY3JldFZhbHVlID0gc2VjcmV0TmFtZSA/IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChzZWNyZXROYW1lKSA6IFwiXCI7XG5cdFx0Y29uc3QgaXNTZWNyZXRNaXNzaW5nID0gQm9vbGVhbihzZWNyZXROYW1lICYmICFzZWNyZXRWYWx1ZSk7XG5cblx0XHRzZXR0aW5nLnNldE5hbWUoY3JlYXRlR2l0SHViUmVzb3VyY2VMaW5rKHJlcG9zaXRvcnkpKS5zZXREZXNjKHRoaXMuY3JlYXRlVHJhY2tlZFBsdWdpbkRlc2NyaXB0aW9uRnJhZ21lbnQodHJhY2tlZFBsdWdpbikpO1xuXHRcdHNldHRpbmcuc2V0dGluZ0VsLmFkZENsYXNzKFwiYnJhdC1wbHVnaW4taXRlbVwiKTtcblxuXHRcdHNldHRpbmcuYWRkRXh0cmFCdXR0b24oKGJ0bjogRXh0cmFCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdGJ0blxuXHRcdFx0XHQuc2V0SWNvbihcImNvcHlcIilcblx0XHRcdFx0LnNldFRvb2x0aXAodGV4dC5jb3B5UGx1Z2luSWRlbnRpZmllcilcblx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuY29weVJlcG9JZGVudGlmaWVyKHJlcG9zaXRvcnkpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmICghdHJhY2tlZFBsdWdpbj8udmVyc2lvbiB8fCB0cmFja2VkUGx1Z2luLnZlcnNpb24gPT09IFwibGF0ZXN0XCIpIHtcblx0XHRcdHNldHRpbmcuYWRkQnV0dG9uKChidG46IEJ1dHRvbkNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoaXNTZWNyZXRNaXNzaW5nKSB7XG5cdFx0XHRcdFx0YnRuLnNldEljb24oXCJzeW5jXCIpLnNldFRvb2x0aXAodGV4dC5zZWNyZXRNaXNzaW5nVG9vbHRpcChzZWNyZXROYW1lKSkuc2V0V2FybmluZygpLnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJ0blxuXHRcdFx0XHRcdFx0LnNldEljb24oXCJzeW5jXCIpXG5cdFx0XHRcdFx0XHQuc2V0VG9vbHRpcCh0ZXh0LmNoZWNrQW5kVXBkYXRlUGx1Z2luKVxuXHRcdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy51cGRhdGVQbHVnaW4ocmVwb3NpdG9yeSwgZmFsc2UsIHRydWUsIGZhbHNlLCB0cmFja2VkUGx1Z2luPy50b2tlbk5hbWUgfHwgXCJcIik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0dGluZy5hZGRCdXR0b24oKGJ0bjogQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRidG4uc2V0SWNvbihcImVkaXRcIikuc2V0VG9vbHRpcCh0ZXh0LmNoYW5nZVZlcnNpb25BbmRVcGRhdGVTZXR0aW5ncyk7XG5cblx0XHRcdGlmIChpc1NlY3JldE1pc3NpbmcpIHtcblx0XHRcdFx0YnRuLnNldFdhcm5pbmcoKTtcblx0XHRcdH1cblxuXHRcdFx0YnRuLm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5kaXNwbGF5QWRkTmV3UGx1Z2luTW9kYWwoXG5cdFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdHJlcG9zaXRvcnksXG5cdFx0XHRcdFx0dHJhY2tlZFBsdWdpbj8udmVyc2lvbixcblx0XHRcdFx0XHR0cmFja2VkUGx1Z2luPy50b2tlbk5hbWUgfHwgXCJcIixcblx0XHRcdFx0XHQoKSA9PiB0aGlzLnVwZGF0ZSgpLFxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRzZXR0aW5nLmFkZEJ1dHRvbigoYnRuOiBCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdGJ0blxuXHRcdFx0XHQuc2V0SWNvbihcImNyb3NzXCIpXG5cdFx0XHRcdC5zZXRUb29sdGlwKHRleHQucmVtb3ZlVGhpc0JldGFQbHVnaW4pXG5cdFx0XHRcdC5zZXRXYXJuaW5nKClcblx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChidG4uYnV0dG9uRWwudGV4dENvbnRlbnQgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdGJ0bi5zZXRCdXR0b25UZXh0KHRleHQuY29uZmlybVJlbW92YWwpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5iZXRhUGx1Z2lucy5kZWxldGVQbHVnaW4ocmVwb3NpdG9yeSk7XG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlclRyYWNrZWRUaGVtZVNldHRpbmcoc2V0dGluZzogU2V0dGluZywgdGhlbWU6IFRoZW1lSW5mb3JhbXRpb24pOiB2b2lkIHtcblx0XHRjb25zdCB0ZXh0ID0gZ2V0VHJhbnNsYXRpb25zKCkuc2V0dGluZ3MuYmV0YVRoZW1lTGlzdDtcblx0XHRzZXR0aW5nLnNldE5hbWUoY3JlYXRlR2l0SHViUmVzb3VyY2VMaW5rKHRoZW1lLnJlcG8pKTtcblx0XHRzZXR0aW5nLnNldHRpbmdFbC5hZGRDbGFzcyhcImJyYXQtdGhlbWUtaXRlbVwiKTtcblx0XHRzZXR0aW5nLmFkZEV4dHJhQnV0dG9uKChidG46IEV4dHJhQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRidG5cblx0XHRcdFx0LnNldEljb24oXCJjb3B5XCIpXG5cdFx0XHRcdC5zZXRUb29sdGlwKHRleHQuY29weVRoZW1lSWRlbnRpZmllcilcblx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMuY29weVJlcG9JZGVudGlmaWVyKHRoZW1lLnJlcG8pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHNldHRpbmcuYWRkQnV0dG9uKChidG46IEJ1dHRvbkNvbXBvbmVudCkgPT4ge1xuXHRcdFx0YnRuXG5cdFx0XHRcdC5zZXRJY29uKFwiY3Jvc3NcIilcblx0XHRcdFx0LnNldFRvb2x0aXAodGV4dC5kZWxldGVUaGlzQmV0YVRoZW1lKVxuXHRcdFx0XHQuc2V0V2FybmluZygpXG5cdFx0XHRcdC5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoYnRuLmJ1dHRvbkVsLnRleHRDb250ZW50ID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRidG4uc2V0QnV0dG9uVGV4dCh0ZXh0LmNvbmZpcm1SZW1vdmFsKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhlbWVEZWxldGUodGhpcy5wbHVnaW4sIHRoZW1lLnJlcG8pO1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSByZW5kZXJQZXJzb25hbEFjY2Vzc1Rva2VuU2V0dGluZyhzZXR0aW5nOiBTZXR0aW5nKTogKCkgPT4gdm9pZCB7XG5cdFx0Y29uc3QgdGV4dCA9IGdldFRyYW5zbGF0aW9ucygpLnNldHRpbmdzLmdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW47XG5cdFx0bGV0IGN1cnJlbnRUb2tlblZhbHVlID0gXCJcIjtcblxuXHRcdHRoaXMuYWNjZXNzVG9rZW5TZXR0aW5nID0gbmV3IFNlY3JldENvbXBvbmVudENsYXNzKHRoaXMucGx1Z2luLmFwcCwgc2V0dGluZy5jb250cm9sRWwpO1xuXG5cdFx0dGhpcy5hY2Nlc3NUb2tlblNldHRpbmcuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2xvYmFsVG9rZW5OYW1lIHx8IFwiXCIpLm9uQ2hhbmdlKChzZWNyZXROYW1lOiBzdHJpbmcgfCBudWxsKSA9PiB7XG5cdFx0XHR2b2lkIChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gc2VjcmV0TmFtZT8udHJpbSgpIHx8IFwiXCI7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmdsb2JhbFRva2VuTmFtZSA9IG5vcm1hbGl6ZWROYW1lO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblxuXHRcdFx0XHRpZiAobm9ybWFsaXplZE5hbWUpIHtcblx0XHRcdFx0XHRjdXJyZW50VG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldChub3JtYWxpemVkTmFtZSkgfHwgXCJcIjtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlR2xvYmFsVG9rZW5BbmRVcGRhdGVCdXR0b24oY3VycmVudFRva2VuVmFsdWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGN1cnJlbnRUb2tlblZhbHVlID0gXCJcIjtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnZhbGlkYXRlR2xvYmFsVG9rZW5BbmRVcGRhdGVCdXR0b24oXCJcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pKCk7XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2xvYmFsVG9rZW5OYW1lKSB7XG5cdFx0XHRjdXJyZW50VG9rZW5WYWx1ZSA9IHRoaXMucGx1Z2luLmFwcC5zZWNyZXRTdG9yYWdlLmdldFNlY3JldCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5nbG9iYWxUb2tlbk5hbWUpIHx8IFwiXCI7XG5cdFx0fVxuXG5cdFx0c2V0dGluZ1xuXHRcdFx0LmFkZEV4dHJhQnV0dG9uKChjYjogRXh0cmFCdXR0b25Db21wb25lbnQpID0+IHtcblx0XHRcdFx0Y2Iuc2V0SWNvbihcImNyb3NzXCIpXG5cdFx0XHRcdFx0LnNldFRvb2x0aXAodGV4dC5jbGVhclBlcnNvbmFsQWNjZXNzVG9rZW4pXG5cdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2xvYmFsVG9rZW5OYW1lID0gXCJcIjtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0dGhpcy5hY2Nlc3NUb2tlblNldHRpbmc/LnNldFZhbHVlKFwiXCIpO1xuXHRcdFx0XHRcdFx0Y3VycmVudFRva2VuVmFsdWUgPSBcIlwiO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy52YWxpZGF0ZUdsb2JhbFRva2VuQW5kVXBkYXRlQnV0dG9uKFwiXCIpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0XHRcdC5hZGRCdXR0b24oKGJ0bjogQnV0dG9uQ29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdHRoaXMuYWNjZXNzVG9rZW5CdXR0b24gPSBidG47XG5cdFx0XHRcdGJ0blxuXHRcdFx0XHRcdC5zZXRCdXR0b25UZXh0KHRleHQudmFsaWRhdGUpXG5cdFx0XHRcdFx0LnNldEN0YSgpXG5cdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRUb2tlblZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMudmFsaWRhdGVHbG9iYWxUb2tlbkFuZFVwZGF0ZUJ1dHRvbihjdXJyZW50VG9rZW5WYWx1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR2b2lkIHRoaXMudmFsaWRhdGVHbG9iYWxUb2tlbkFuZFVwZGF0ZUJ1dHRvbihjdXJyZW50VG9rZW5WYWx1ZSk7XG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHR0aGlzLmFjY2Vzc1Rva2VuU2V0dGluZyA9IG51bGw7XG5cdFx0XHR0aGlzLmFjY2Vzc1Rva2VuQnV0dG9uID0gbnVsbDtcblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVMaXN0U2VhcmNoKHBsYWNlaG9sZGVyOiBzdHJpbmcpOiBTZXR0aW5nRGVmaW5pdGlvbkdyb3VwPEJyYXRTZXR0aW5nc0tleT5bXCJzZWFyY2hcIl0gfCB1bmRlZmluZWQge1xuXHRcdGlmICghcmVxdWlyZUFwaVZlcnNpb24oXCIxLjEzLjFcIikpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHBsYWNlaG9sZGVyLFxuXHRcdFx0bWF0Y2g6IChkZWY6IFNldHRpbmdEZWZpbml0aW9uLCBxdWVyeTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5vcm1hbGl6ZWRRdWVyeSA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXHRcdFx0XHRpZiAobm9ybWFsaXplZFF1ZXJ5ID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBkZXNjcmlwdGlvblRleHQgPSB0eXBlb2YgZGVmLmRlc2MgPT09IFwic3RyaW5nXCIgPyBkZWYuZGVzYyA6IGRlZi5kZXNjPy50ZXh0Q29udGVudCB8fCBcIlwiO1xuXHRcdFx0XHRjb25zdCBzZWFyY2hUZXh0ID0gW2RlZi5uYW1lLCBkZXNjcmlwdGlvblRleHQsIC4uLihkZWYuYWxpYXNlcyB8fCBbXSldLmpvaW4oXCIgXCIpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hUZXh0LmluY2x1ZGVzKG5vcm1hbGl6ZWRRdWVyeSk7XG5cdFx0XHR9LFxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIHZhbGlkYXRlR2xvYmFsVG9rZW5BbmRVcGRhdGVCdXR0b24odG9rZW46IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGlmICghdGhpcy5hY2Nlc3NUb2tlbkJ1dHRvbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRleHQgPSBnZXRUcmFuc2xhdGlvbnMoKTtcblx0XHRjb25zdCB2YWxpZGF0ZUJ1dHRvbiA9IHRoaXMuYWNjZXNzVG9rZW5CdXR0b247XG5cdFx0dmFsaWRhdGVCdXR0b24uYnV0dG9uRWwucmVtb3ZlQ2xhc3MoXCJtb2Qtd2FybmluZ1wiKTtcblx0XHR2YWxpZGF0ZUJ1dHRvbi5zZXRUb29sdGlwKFwiXCIpO1xuXG5cdFx0aWYgKCF0b2tlbikge1xuXHRcdFx0dmFsaWRhdGVCdXR0b24uc2V0QnV0dG9uVGV4dCh0ZXh0LnNldHRpbmdzLmdpdGh1YlBlcnNvbmFsQWNjZXNzVG9rZW4udmFsaWRhdGUpO1xuXHRcdFx0dmFsaWRhdGVCdXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHRva2VuSW5mbyA9IGF3YWl0IHZhbGlkYXRlR2l0SHViVG9rZW4odG9rZW4pO1xuXHRcdFx0aWYgKHRva2VuSW5mby52YWxpZFRva2VuKSB7XG5cdFx0XHRcdHZhbGlkYXRlQnV0dG9uLnNldEJ1dHRvblRleHQodGV4dC5hZGRCZXRhUGx1Z2luTW9kYWwuYnV0dG9ucy52YWxpZCkuc2V0Q3RhKCk7XG5cdFx0XHRcdHZhbGlkYXRlQnV0dG9uLnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHR2YWxpZGF0ZUJ1dHRvbi5zZXRUb29sdGlwKHRoaXMuYnVpbGRUb2tlblZhbGlkYXRpb25Ub29sdGlwKHRva2VuSW5mbykpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFsaWRhdGVCdXR0b24uc2V0QnV0dG9uVGV4dCh0ZXh0LmFkZEJldGFQbHVnaW5Nb2RhbC5idXR0b25zLmludmFsaWQpO1xuXHRcdFx0dmFsaWRhdGVCdXR0b24uYnV0dG9uRWwuYWRkQ2xhc3MoXCJtb2Qtd2FybmluZ1wiKTtcblx0XHRcdHZhbGlkYXRlQnV0dG9uLnNldERpc2FibGVkKGZhbHNlKTtcblx0XHRcdHZhbGlkYXRlQnV0dG9uLnNldFRvb2x0aXAodG9rZW5JbmZvLmVycm9yLm1lc3NhZ2UpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiVG9rZW4gdmFsaWRhdGlvbiBlcnJvcjpcIiwgZXJyb3IpO1xuXHRcdFx0dmFsaWRhdGVCdXR0b24uc2V0QnV0dG9uVGV4dCh0ZXh0LmFkZEJldGFQbHVnaW5Nb2RhbC5idXR0b25zLmludmFsaWQpO1xuXHRcdFx0dmFsaWRhdGVCdXR0b24uYnV0dG9uRWwuYWRkQ2xhc3MoXCJtb2Qtd2FybmluZ1wiKTtcblx0XHRcdHZhbGlkYXRlQnV0dG9uLnNldERpc2FibGVkKGZhbHNlKTtcblx0XHRcdHZhbGlkYXRlQnV0dG9uLnNldFRvb2x0aXAoXCJGYWlsZWQgdG8gdmFsaWRhdGUgdG9rZW5cIik7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBidWlsZFRva2VuVmFsaWRhdGlvblRvb2x0aXAodG9rZW5JbmZvOiBHaXRIdWJUb2tlbkluZm8pOiBzdHJpbmcge1xuXHRcdGNvbnN0IHRvb2x0aXBMaW5lczogc3RyaW5nW10gPSBbXTtcblxuXHRcdGlmICh0b2tlbkluZm8uY3VycmVudFNjb3Blcz8ubGVuZ3RoKSB7XG5cdFx0XHR0b29sdGlwTGluZXMucHVzaChgU2NvcGVzOiAke3Rva2VuSW5mby5jdXJyZW50U2NvcGVzLmpvaW4oXCIsIFwiKX1gKTtcblx0XHR9XG5cblx0XHRpZiAodG9rZW5JbmZvLnJhdGVMaW1pdCkge1xuXHRcdFx0dG9vbHRpcExpbmVzLnB1c2goYFJhdGUgTGltaXQ6ICR7dG9rZW5JbmZvLnJhdGVMaW1pdC5yZW1haW5pbmd9LyR7dG9rZW5JbmZvLnJhdGVMaW1pdC5saW1pdH1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdG9vbHRpcExpbmVzLmpvaW4oXCJcXG5cIik7XG5cdH1cbn1cbiIsICJpbXBvcnQge1xuXHRncmFiQ2hlY2tzdW1PZlRoZW1lQ3NzRmlsZSxcblx0Z3JhYkNvbW1tdW5pdHlUaGVtZUNzc0ZpbGUsXG5cdGdyYWJMYXN0Q29tbWl0RGF0ZUZvckZpbGUsXG59IGZyb20gXCIuLi9mZWF0dXJlcy9naXRodWJVdGlsc1wiO1xuaW1wb3J0IHtcblx0dGhlbWVEZWxldGUsXG5cdHRoZW1lU2F2ZSxcblx0dGhlbWVzQ2hlY2tBbmRVcGRhdGVzLFxufSBmcm9tIFwiLi4vZmVhdHVyZXMvdGhlbWVzXCI7XG5pbXBvcnQgdHlwZSBCcmF0UGx1Z2luIGZyb20gXCIuLi9tYWluXCI7XG5cbi8vIFRoaXMgbW9kdWxlIGlzIGZvciBBUEkgYWNjZXNzIGZvciB1c2UgaW4gZGVidWdpbmcgY29uc29sZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmF0QVBJIHtcblx0cGx1Z2luOiBCcmF0UGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKHBsdWdpbjogQnJhdFBsdWdpbikge1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0Y29uc29sZSA9IChcblx0XHRsb2dEZXNjcmlwdGlvbjogc3RyaW5nLFxuXHRcdC4uLm91dHB1dHM6IChzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKVtdXG5cdCk6IHZvaWQgPT4ge1xuXHRcdGNvbnNvbGUuZGVidWcoYEJSQVQ6ICR7bG9nRGVzY3JpcHRpb259YCwgLi4ub3V0cHV0cyk7XG5cdH07XG5cblx0dGhlbWVzID0ge1xuXHRcdHRoZW1lc2VDaGVja0FuZFVwYXRlczogYXN5bmMgKHNob3dJbmZvOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRhd2FpdCB0aGVtZXNDaGVja0FuZFVwZGF0ZXModGhpcy5wbHVnaW4sIHNob3dJbmZvKTtcblx0XHR9LFxuXG5cdFx0dGhlbWVJbnN0YWxsVGhlbWU6IGFzeW5jIChjc3NHaXRodWJSZXBvc2l0b3J5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGNvbnN0IHNjcnViYmVkQWRkcmVzcyA9IGNzc0dpdGh1YlJlcG9zaXRvcnkucmVwbGFjZShcblx0XHRcdFx0XCJodHRwczovL2dpdGh1Yi5jb20vXCIsXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHQpO1xuXHRcdFx0YXdhaXQgdGhlbWVTYXZlKHRoaXMucGx1Z2luLCBzY3J1YmJlZEFkZHJlc3MsIHRydWUpO1xuXHRcdH0sXG5cblx0XHR0aGVtZXNEZWxldGU6IChjc3NHaXRodWJSZXBvc2l0b3J5OiBzdHJpbmcpOiB2b2lkID0+IHtcblx0XHRcdGNvbnN0IHNjcnViYmVkQWRkcmVzcyA9IGNzc0dpdGh1YlJlcG9zaXRvcnkucmVwbGFjZShcblx0XHRcdFx0XCJodHRwczovL2dpdGh1Yi5jb20vXCIsXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHQpO1xuXHRcdFx0dGhlbWVEZWxldGUodGhpcy5wbHVnaW4sIHNjcnViYmVkQWRkcmVzcyk7XG5cdFx0fSxcblxuXHRcdGdyYWJDb21tbXVuaXR5VGhlbWVDc3NGaWxlOiBhc3luYyAoXG5cdFx0XHRyZXBvc2l0b3J5UGF0aDogc3RyaW5nLFxuXHRcdFx0YmV0YVZlcnNpb24gPSBmYWxzZSxcblx0XHQpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcblx0XHRcdHJldHVybiBhd2FpdCBncmFiQ29tbW11bml0eVRoZW1lQ3NzRmlsZShcblx0XHRcdFx0cmVwb3NpdG9yeVBhdGgsXG5cdFx0XHRcdGJldGFWZXJzaW9uLFxuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWJ1Z2dpbmdNb2RlLFxuXHRcdFx0KTtcblx0XHR9LFxuXG5cdFx0Z3JhYkNoZWNrc3VtT2ZUaGVtZUNzc0ZpbGU6IGFzeW5jIChcblx0XHRcdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdFx0XHRiZXRhVmVyc2lvbiA9IGZhbHNlLFxuXHRcdCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgZ3JhYkNoZWNrc3VtT2ZUaGVtZUNzc0ZpbGUoXG5cdFx0XHRcdHJlcG9zaXRvcnlQYXRoLFxuXHRcdFx0XHRiZXRhVmVyc2lvbixcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSxcblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdGdyYWJMYXN0Q29tbWl0RGF0ZUZvckZpbGU6IGFzeW5jIChcblx0XHRcdHJlcG9zaXRvcnlQYXRoOiBzdHJpbmcsXG5cdFx0XHRwYXRoOiBzdHJpbmcsXG5cdFx0KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcblx0XHRcdC8vIGV4YW1wbGUgYXdhaXQgZ3JhYkxhc3RDb21taXREYXRlRm9yQUZpbGUodC5yZXBvLCBcInRoZW1lLWJldGEuY3NzXCIpO1xuXHRcdFx0cmV0dXJuIGF3YWl0IGdyYWJMYXN0Q29tbWl0RGF0ZUZvckZpbGUocmVwb3NpdG9yeVBhdGgsIHBhdGgpO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiaW1wb3J0IHsgbW9tZW50LCBQbGF0Zm9ybSwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB0eXBlIEJyYXRQbHVnaW4gZnJvbSBcIi4uL21haW5cIjtcblxuY29uc3QgREVGQVVMVF9EQUlMWV9OT1RFX0ZPUk1BVCA9IFwiWVlZWS1NTS1ERFwiO1xuXG5pbnRlcmZhY2UgRGFpbHlOb3Rlc1BsdWdpbkxpa2Uge1xuXHRpbnN0YW5jZT86IHtcblx0XHRvcHRpb25zPzoge1xuXHRcdFx0Zm9ybWF0Pzogc3RyaW5nO1xuXHRcdH07XG5cdH07XG59XG5cbmludGVyZmFjZSBQZXJpb2RpY05vdGVzUGx1Z2luTGlrZSB7XG5cdHNldHRpbmdzPzoge1xuXHRcdGRhaWx5Pzoge1xuXHRcdFx0ZW5hYmxlZD86IGJvb2xlYW47XG5cdFx0XHRmb3JtYXQ/OiBzdHJpbmc7XG5cdFx0fTtcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0RGFpbHlOb3RlRm9ybWF0KHBsdWdpbjogQnJhdFBsdWdpbik6IHN0cmluZyB7XG5cdGNvbnN0IHBlcmlvZGljTm90ZXMgPSBwbHVnaW4uYXBwLnBsdWdpbnMuZ2V0UGx1Z2luKFxuXHRcdFwicGVyaW9kaWMtbm90ZXNcIixcblx0KSBhcyBQZXJpb2RpY05vdGVzUGx1Z2luTGlrZSB8IG51bGw7XG5cdGNvbnN0IHBlcmlvZGljRGFpbHlTZXR0aW5ncyA9IHBlcmlvZGljTm90ZXM/LnNldHRpbmdzPy5kYWlseTtcblx0aWYgKHBlcmlvZGljRGFpbHlTZXR0aW5ncz8uZW5hYmxlZCkge1xuXHRcdHJldHVybiBwZXJpb2RpY0RhaWx5U2V0dGluZ3MuZm9ybWF0ID8/IERFRkFVTFRfREFJTFlfTk9URV9GT1JNQVQ7XG5cdH1cblxuXHRjb25zdCBkYWlseU5vdGVzID0gcGx1Z2luLmFwcC5pbnRlcm5hbFBsdWdpbnMuZ2V0UGx1Z2luQnlJZChcblx0XHRcImRhaWx5LW5vdGVzXCIsXG5cdCkgYXMgRGFpbHlOb3Rlc1BsdWdpbkxpa2UgfCBudWxsO1xuXHRyZXR1cm4gZGFpbHlOb3Rlcz8uaW5zdGFuY2U/Lm9wdGlvbnM/LmZvcm1hdCA/PyBERUZBVUxUX0RBSUxZX05PVEVfRk9STUFUO1xufVxuXG4vKipcbiAqIExvZ3MgZXZlbnRzIHRvIGEgbG9nIGZpbGVcbiAqXG4gKiBAcGFyYW0gcGx1Z2luICAgICAgICAgICAtIFBsdWdpbiBvYmplY3RcbiAqIEBwYXJhbSB0ZXh0VG9Mb2cgICAgICAgIC0gdGV4dCB0byBiZSBzYXZlZCB0byBsb2cgZmlsZVxuICogQHBhcmFtIHZlcmJvc2VMb2dnaW5nT24gLSBUcnVlIGlmIHNob3VsZCBvbmx5IGJlIGxvZ2dlZCBpZiB2ZXJib3NlIGxvZ2dpbmcgaXMgZW5hYmxlZFxuICpcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2dlcihcblx0cGx1Z2luOiBCcmF0UGx1Z2luLFxuXHR0ZXh0VG9Mb2c6IHN0cmluZyxcblx0dmVyYm9zZUxvZ2dpbmdPbiA9IGZhbHNlLFxuKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChwbHVnaW4uc2V0dGluZ3MuZGVidWdnaW5nTW9kZSkgY29uc29sZS5kZWJ1ZyhgQlJBVDogJHt0ZXh0VG9Mb2d9YCk7XG5cdGlmIChwbHVnaW4uc2V0dGluZ3MubG9nZ2luZ0VuYWJsZWQpIHtcblx0XHRpZiAoIXBsdWdpbi5zZXR0aW5ncy5sb2dnaW5nVmVyYm9zZUVuYWJsZWQgJiYgdmVyYm9zZUxvZ2dpbmdPbikgcmV0dXJuO1xuXG5cdFx0Y29uc3QgZmlsZU5hbWUgPSBgJHtwbHVnaW4uc2V0dGluZ3MubG9nZ2luZ1BhdGh9Lm1kYDtcblx0XHRjb25zdCBub3cgPSBtb21lbnQudW5peChNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSk7XG5cdFx0Y29uc3QgZGF0ZU91dHB1dCA9IGBbWyR7bm93LmZvcm1hdChnZXREYWlseU5vdGVGb3JtYXQocGx1Z2luKSkudG9TdHJpbmcoKX1dXSAke25vdy5mb3JtYXQoXCJISDptbVwiKX1gO1xuXHRcdGNvbnN0IG9zID0gUGxhdGZvcm0uaXNEZXNrdG9wXG5cdFx0XHQ/ICh3aW5kb3cucmVxdWlyZShcIm9zXCIpIGFzIHsgaG9zdG5hbWU6ICgpID0+IHN0cmluZyB9KVxuXHRcdFx0OiBudWxsO1xuXHRcdGNvbnN0IG1hY2hpbmVOYW1lID0gUGxhdGZvcm0uaXNEZXNrdG9wID8gb3M/Lmhvc3RuYW1lKCkgOiBcIk1PQklMRVwiO1xuXHRcdGNvbnN0IG91dHB1dCA9IGAke2RhdGVPdXRwdXR9ICR7bWFjaGluZU5hbWV9ICR7dGV4dFRvTG9nLnJlcGxhY2UoXCJcXG5cIiwgXCIgXCIpfVxcbmA7XG5cblx0XHRjb25zdCBmaWxlID0gcGx1Z2luLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZU5hbWUpO1xuXHRcdGlmICghKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcblx0XHRcdGF3YWl0IHBsdWdpbi5hcHAudmF1bHQuY3JlYXRlKGZpbGVOYW1lLCBvdXRwdXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhd2FpdCBwbHVnaW4uYXBwLnZhdWx0LmFwcGVuZChmaWxlLCBvdXRwdXQpO1xuXHRcdH1cblx0fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUEsdURBQUFBLFNBQUE7QUFBQTtBQUlBLFFBQU0sc0JBQXNCO0FBRTVCLFFBQU0sYUFBYTtBQUNuQixRQUFNLG1CQUFtQixPQUFPO0FBQUEsSUFDTDtBQUczQixRQUFNLDRCQUE0QjtBQUlsQyxRQUFNLHdCQUF3QixhQUFhO0FBRTNDLFFBQU0sZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBRUEsSUFBQUEsUUFBTyxVQUFVO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSx5QkFBeUI7QUFBQSxNQUN6QixZQUFZO0FBQUEsSUFDZDtBQUFBO0FBQUE7OztBQ3BDQTtBQUFBLG1EQUFBQyxTQUFBO0FBQUE7QUFFQSxRQUFNLFFBQ0osT0FBTyxZQUFZLFlBQ25CLFFBQVEsT0FDUixRQUFRLElBQUksY0FDWixjQUFjLEtBQUssUUFBUSxJQUFJLFVBQVUsSUFDdkMsSUFBSSxTQUFTLFFBQVEsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUM1QyxNQUFNO0FBQUEsSUFBQztBQUVYLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ1ZqQjtBQUFBLGdEQUFBQyxTQUFBO0FBQUE7QUFFQSxRQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixJQUFJO0FBQ0osUUFBTSxRQUFRO0FBQ2QsY0FBVUEsUUFBTyxVQUFVLENBQUM7QUFHNUIsUUFBTSxLQUFLLFFBQVEsS0FB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RUFFQSxXQUFpQjtBQUNoQixZQUFRLE1BQU0sYUFBYSxLQUFLLFFBQVEsRUFBRTtBQUFBLEVBQzNDO0FBQUEsRUFFQSxNQUFNLGVBQThCO0FBQ25DLFVBQU0saUJBQWtCLE1BQU0sS0FBSyxTQUFTO0FBQzVDLFNBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQiwwQ0FBa0IsQ0FBQyxDQUFDO0FBQUEsRUFDekU7QUFBQSxFQUVBLE1BQU0sZUFBOEI7QUFDbkMsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQUEsRUFDbEM7QUEyQkQ7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJyZXF1aXJlX3ZhbGlkIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJyZXF1aXJlX3NlbXZlciIsICJtb2R1bGUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfc2VtdmVyIiwgInJlcXVlc3RVcmwiLCAiaW1wb3J0X29ic2lkaWFuIiwgImFzc2V0IiwgInNlbXZlckNvZXJjZSIsICJjb21wYXJlVmVyc2lvbnMiLCAiY2hlY2tzdW0iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgInJlc3VsdCIsICJfYSIsICJpbXBvcnRfb2JzaWRpYW4iLCAic2VtdmVyQ29lcmNlIiwgImNvbXBhcmVWZXJzaW9ucyIsICJtc2ciLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJTZWNyZXRDb21wb25lbnRDbGFzcyIsICJpbXBvcnRfb2JzaWRpYW4iXQp9Cg==
