import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { IFormField } from '../auth/shared/iformfield.register';
import { Value } from '../DTO/value';
import { FormService } from './shared/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  dataLoaded: boolean=false;

  @Input() processId:string;

  formFieldsDto = null;
  formFields: IFormField[] = [];

  form: FormGroup=new FormGroup({});
  
  values = new Array<Value>();

  constructor(private formService:FormService, private router: Router) { 
	  
  }
	ngOnInit(): void {
		this.formService.getForm(this.processId).subscribe((res:any)=>{
			this.setForm(res);
			this.dataLoaded=true;
		},
		(err)=>{
			console.log(err.message);
		});
	  
	}

	setForm(res:any){
		console.log(this.values);
		console.log(res);

		res.formFieldList.forEach((element:any) => {
			if(element.type.name == "multiselect"){
				element.type.values = Object.values(element.type.values);
			}
		});

		this.formFieldsDto = res;
		this.formFields = res.formFieldList;

		this.form = new FormGroup({});

		this.formFields.forEach((element: any) => {
			let fc = new FormControl('');

			let validators: any[] = [];
			element.validationConstraints.map((validator: any) => {
				if (validator.name == 'required') {
					validators.push(Validators.required);
				} else if (validator.name == 'minlength') {
					validators.push(Validators.minLength(<number>validator.configuration));
				}
			});

			fc.setValidators(validators);

			this.form.addControl(element.id, fc);
			
		});
	}

	onSubmit(value: any, form: any) {
		let formFields = new Array();
		for (var property in value) {
			console.log(property);
			console.log(value[property]);
			formFields.push({ id: property, value: value[property] });
		}

		console.log(formFields);
		var data = {
			formFields: formFields,
		};

		console.log(data);

		if (this.formFieldsDto !== null) {
			this.formService.submitForm(this.processId, data).subscribe((res)=>{
				
				
				if(value["isBetaReader"] == true) {
					this.formService.getForm(this.processId).subscribe((res:any)=>{
						this.setForm(res);
						this.dataLoaded=true;
					},
					(err)=>{
						console.log(err.message);
					});
				}
				else {
					console.log(res);
					alert('You registered successfully!');
					console.log(this.router.url);
					this.router.navigateByUrl('/welcome/login');
				}
				
			},
			(err)=>{
				console.log(err);
			});
		}
	}
}
