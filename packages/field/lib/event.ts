export class NotionPetEvent {
  events: any = {};

  constructor() {
    this.call = this.call.bind(this);
    this.bind = this.bind.bind(this);
  }

  call(key, props) {
    this.events[key] &&
      Object.entries(this.events[key]).forEach(([id, fn = () => {}]: any) => {
        fn(props);
      });
  }
  /**
   * 绑定订阅事件
   * @param key
   * @param callback
   */
  bind(key, callback = () => {}) {
    if (!this.events[key]) {
      this.events[key] = {};
    }
    const id = new Date().getTime();
    this.events[key][id] = callback;
    return {
      call: this.call,
      /**
       * 撤销事件
       */
      cancel: () => {
        delete this.events[key][id];
      },
    };
  }
}

export interface IEvent {
  /**
   * 执行事件
   */
  call: Function;
  /**
   * 绑定事件
   */
  bind: Function;
}
