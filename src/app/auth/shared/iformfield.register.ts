import { Value } from "src/app/DTO/value";

export interface IFormField {
	id: string;
	name: string;
	label: string;
	type: {
		name: string;
		values: Array<Value>;
	};
	validationConstraints: {
		name: string;
		configuration: string;
	}[];
	properties: {
		name: string;
		value: string;
	}[];
	value: {
		value: object;
	}
}
