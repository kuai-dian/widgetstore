const events = {};
class Event {
  constructor() {
    this.call = this.call.bind(this);
    this.bind = this.bind.bind(this);
  }

  call(key, props) {
    events[key] &&
      Object.entries(events[key]).forEach(([id, fn = () => {}]: any) => {
        fn(props);
      });
  }
  /**
   * 绑定订阅事件
   * @param key
   * @param callback
   */
  bind(key, callback = () => {}) {
    if (!events[key]) {
      events[key] = {};
    }
    const id = new Date().getTime();
    events[key][id] = callback;
    return {
      call: this.call,
      /**
       * 撤销事件
       */
      cancel: () => {
        delete events[key][id];
      },
    };
  }
}

interface IEvent {
  /**
   * 执行事件
   */
  call: Function;
  /**
   * 绑定事件
   */
  bind: Function;
}

/**
 * 发布订阅 基于window
 */
export const useSubscribe = () => {
  if (!(window as any).NotionPetEvent) {
    (window as any).NotionPetEvent = new Event();
  }
  return (window as any).NotionPetEvent as IEvent;
};
