import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { request } from 'http';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { AuthorService } from '../shared/author.service';

@Component({
	selector: 'app-upload-documents',
	templateUrl: './upload-documents.component.html',
	styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent implements OnInit {
	formFieldsDto = null;
	formFields: any[] = [];
	processId: string;
	fileToUpload: File;
	uploadForm: FormGroup = new FormGroup({});

	constructor(private authorService: AuthorService, private authService: AuthService) {
		this.fileToUpload = null;

		//this.processId = this.authorService.startProcess();
	}

	ngOnInit(): void {}

	logOut() {
		this.authService.logOut();
	}
}
