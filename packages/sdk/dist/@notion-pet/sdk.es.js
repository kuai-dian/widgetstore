const events = {};
class Event {
  constructor() {
    this.call = this.call.bind(this);
    this.bind = this.bind.bind(this);
  }
  call(key, props) {
    events[key] && Object.entries(events[key]).forEach(([id, fn = () => {
    }]) => {
      fn(props);
    });
  }
  bind(key, callback = () => {
  }) {
    if (!events[key]) {
      events[key] = {};
    }
    const id = new Date().getTime();
    events[key][id] = callback;
    return {
      call: this.call,
      cancel: () => {
        delete events[key][id];
      }
    };
  }
}
const useSubscribe = () => {
  if (!window.NotionPetEvent) {
    window.NotionPetEvent = new Event();
  }
  return window.NotionPetEvent;
};
const update = (props) => {
  const { call } = useSubscribe();
  call("onSaveWidgetData", props);
};
var api = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  update
});
const defineRender = (render) => {
  const { bind, call } = useSubscribe();
  bind("onRenderWidget", render);
  call("onWidgetsRenderDone");
};
const defineUpdate = (update2) => {
  const { bind } = useSubscribe();
  bind("onRenderWidget", update2);
};
export { api, defineRender, defineUpdate };
