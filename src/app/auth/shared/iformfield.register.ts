export interface IFormField {
	id: string;
	name: string;
	label: string;
	type: {
		name: string;
	};
	validationConstraints: {
		name: string;
		configuration: string;
	}[];
}
