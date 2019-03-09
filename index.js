'use strict';
// patches for EDGE broken EventTarget#constructor
require('./fills/poorly');
require('./fills/event-target');

(global => {
  const _customEvent = function(type, init = { detail: null }) {
    return {
      type,
      detail: init.detail || null
    };
  };
  global.CustomEvent = global.CustomEvent || _customEvent;
  // Fantastic, Unique, Creative, Kaleidoscopical IE 11 fix below.
  try {
    new global.CustomEvent('_');
  } catch (e) {
    global.CustomEvent = _customEvent;
  }
})(new Function('return this')());

const Base = class extends EventTarget {
  constructor(props = {}) {
    super();
    this._wm = new WeakMap();
    const me = this;
    Object.keys(props).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return props[key];
        },
        set(value) {
          const previous = props[key];
          props[key] = value;
          me.dispatchEvent(
            new CustomEvent(key, {
              detail: {
                value,
                previous,
                wired: me
              }
            })
          );
        }
      });
    });
  }

  trigger(event, detail = {}) {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...detail,
          wired: this
        }
      })
    );
  }

  wire(target, event, method) {
    const key = `${event}+${method}`;
    let wm = null;
    if (this._wm.has(target)) {
      wm = this._wm.get(target);
    } else {
      wm = new Map();
      this._wm.set(target, wm);
    }
    if (wm.has(key)) return;
    wm.set(key, {
      handleEvent: ({ detail }) => {
        if (method in this) {
          this[method](detail);
        }
      }
    });
    target.addEventListener(event, wm.get(key));
  }

  unwire(target, event, method) {
    const key = `${event}+${method}`;
    if (!this._wm.has(target)) return;
    const wm = this._wm.get(target);
    if (!wm.has(key)) return;
    target.removeEventListener(event, wm.get(key));
    wm.delete(key);
  }
};

module.exports = {
  Model: class Model extends Base {},
  View: class View extends Base {},
  Controller: class Controller extends Base {}
};
