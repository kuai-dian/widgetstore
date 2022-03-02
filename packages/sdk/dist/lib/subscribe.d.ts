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
export declare const useSubscribe: () => IEvent;
export {};
//# sourceMappingURL=subscribe.d.ts.map