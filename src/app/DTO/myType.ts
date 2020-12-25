import { Value } from './value';

export class MyType {
    name: string;
    values: Array<Value>;

    constructor(name: string, val:Array<Value>){
        this.name = name;
        this.values = val;
    }

}