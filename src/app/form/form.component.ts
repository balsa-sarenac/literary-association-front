import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
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

  selectedFiles: FileList;

  fileInfos: Observable<any>;

  constructor(private formService:FormService, private authService:AuthService, private router: Router) { 
	
  }

  handleFileInput(event) {
	  this.selectedFiles=event.target.files;
	  console.log(this.selectedFiles);
  }

	ngOnInit(): void {
		if(this.processId === '' || this.processId===undefined || this.processId===null){
			console.log('getting process id');
			let loggedUser:string = this.authService.getLoggedUser();
			this.formService.getProcessId(loggedUser).subscribe((res:any)=>{
				this.processId = res.processId;
				console.log('get id: ', this.processId);
				this.formService.getForm(this.processId).subscribe((res)=>{
					console.log('init form');
					this.setForm(res);
					this.dataLoaded=true;
			  },
			  (err)=>{
				  console.log(err.message);
			  });
		  
				
			})
		}
		else{
			this.formService.getForm(this.processId).subscribe((res)=>{
				console.log('init form');
				this.setForm(res);
				this.dataLoaded=true;
		  },
		  (err)=>{
			  console.log(err.message);
		  });
	  
		}
			
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
				formFields.push({ id: property, value: value[property] });
		}

		var data = {
			formFields: formFields,
		};

		if (this.formFieldsDto !== null) {
			if(formFields.find(element=>element.id=="files")!==undefined){
				if(formFields.find(element=>element.id=="files")){
					this.upload(this.processId, this.selectedFiles);
				}	
			}
			else{
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

	uploadFiles() {
	  
		for (let i = 0; i < this.selectedFiles.length; i++) {
		  this.upload(i, this.selectedFiles[i]);
		}
	  }

	  upload(idx, file) {
		this.formService.upload(this.processId, this.selectedFiles).subscribe(
		  event => {
			if (event.type === HttpEventType.UploadProgress) {
				// add logic if progress bar is required
			} else if (event instanceof HttpResponse) {
			  alert("Documents uploaded successfully!");
			}
		  },
		  err => {
			alert('Could not upload the file:' + file.name);
		  });
	  }
}
