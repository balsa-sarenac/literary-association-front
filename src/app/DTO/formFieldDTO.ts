import { MyType } from 'src/app/DTO/myType';
import { Validator } from 'src/app/DTO/validator';

export class formFieldDto {
    id: string;
    label: string;
    type: MyType;
    validationConstraints: Array<Validator>

    constructor(id: string, label:string, type: MyType, valCon: Array<Validator>){
        this.id = id;
        this.label = label;
        this.type = type;
        this.validationConstraints = valCon;
    }

}