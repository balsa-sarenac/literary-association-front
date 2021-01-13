import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/shared/auth.service';
import { IFormField } from '../auth/shared/iformfield.register';
import { AuthorService } from '../author/shared/author.service';
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

  constructor(private formService:FormService, private authService:AuthService, private router: Router, private activatedRoute:ActivatedRoute, private authorServicxe:AuthorService)
  {
	
  }

  handleFileInput(event) {
	  this.selectedFiles=event.target.files;
	  console.log(this.selectedFiles);
  }

	ngOnInit(): void {
		
		if(this.activatedRoute.snapshot.routeConfig.path.includes('upload-documents') || this.activatedRoute.snapshot.routeConfig.path.includes('membership-payment')){
			this.formService.getProcessId(this.authService.getLoggedUser()).subscribe((res)=>{
				this.processId = res.processId;
				console.log(this.processId);

				this.formService.getForm(this.processId).subscribe((res)=>{
					console.log('init form');
					this.setForm(res);
					this.dataLoaded=true;
			  },
			  (err)=>{
				  console.log(err.message);
			  });
			});

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
			if(element.type.name == "multiselect" || element.type.name == "enum"){
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

		if(this.activatedRoute.snapshot.routeConfig.path.includes('membership-payment')){
			this.authorServicxe.payMembershipFee(this.processId).subscribe((res)=>{
				alert('Success while paying');
				this.router.navigate(['author']);
			});
		}
		else{
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
						alert('Success!');
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
		
	}


	  upload(idx, file) {
		this.formService.upload(this.processId, this.selectedFiles).subscribe(
		  event => {
			if (event.type === HttpEventType.UploadProgress) {
				// add logic if progress bar is required
			} else if (event instanceof HttpResponse) {
			  alert("Documents uploaded successfully!");
			  this.router.navigateByUrl('/welcome');
			}
		  },
		  err => {
			alert('Could not upload the file:' + file.name);
		  });
	  }
}
