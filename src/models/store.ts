import { BaseModel } from './base-model';
export interface Store<T extends BaseModel> {
    [key: number]: T;
}
