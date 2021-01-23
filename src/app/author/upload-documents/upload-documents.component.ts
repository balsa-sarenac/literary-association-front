import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { request } from 'http';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FormService } from 'src/app/form/shared/form.service';
import { AuthorService } from '../shared/author.service';

@Component({
	selector: 'app-upload-documents',
	templateUrl: './upload-documents.component.html',
	styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent implements OnInit {
	membershipRequestId:number;
  	processInstanceId:string;
  	dataLoaded:boolean=false;

	constructor(private authService: AuthService, private formService:FormService, private authorService: AuthorService) {
	}

	ngOnInit(): void {
		this.getRequest()
	}

	logOut() {
		this.authService.logOut();
	}

	getRequest() {
		this.authorService.getMembershipRequestId(this.authService.getLoggedUser()).subscribe(
			(data: number) => {
				this.membershipRequestId = data;
				console.log(this.membershipRequestId);
				this.getProcessInstanceId();
			},
			(error) => alert(error.error)
		);
	}
	
	  getProcessInstanceId(){
		this.formService.getProcessInstanceId(this.membershipRequestId.toString(), 'membershipRequestId').subscribe(
		  (data) => {
			  this.processInstanceId = String(data.processId);
			  console.log(this.processInstanceId);
			  this.dataLoaded = true;
		  },
		  (error) => alert(error.error)
	  );
	  }
}
