import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from '../shared/auth.service';
import { IFormField } from '../shared/iformfield.register';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

	public choice: string;
	show: boolean = true;

	formFieldsDto = null;
	formFields: IFormField[] = [];
	processInstanceId:string = "";
	taskId = '';
	authorRegForm: FormGroup = new FormGroup({});

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onReader() {
		this.authService.startReaderRegistrationProcess().subscribe((res:any) => {
			console.log(res);
			this.processInstanceId = res.processId;
			
			console.log(this.processInstanceId);
			
			this.show = false;
			this.choice="reader";
			
		},
		(err)=>{
			console.log(err);
		});
	}

	onAuthor() {
		this.authService.startAuthorRegistrationProcess().subscribe((res:any) => {
			console.log(res);
			this.processInstanceId = res.processId;
			
			console.log(this.processInstanceId);
			
			this.show = false;
			this.choice="author";
		},
		(err)=>{
			console.log(err);
		});
	}

	
}
