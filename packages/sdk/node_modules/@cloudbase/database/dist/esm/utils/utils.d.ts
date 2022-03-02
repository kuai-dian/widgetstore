import { Db } from '../';
export declare const sleep: (ms?: number) => Promise<unknown>;
export declare const autoCount: (domain?: string) => number;
export declare function getWsInstance(db: Db): any;
