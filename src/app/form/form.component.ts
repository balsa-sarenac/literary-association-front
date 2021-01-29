import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { IFormField } from '../auth/shared/iformfield.register';
import { AuthorService } from '../author/shared/author.service';
import { Value } from '../DTO/value';
import { FormService } from './shared/form.service';
import { map, startWith } from 'rxjs/operators';
import { BookService } from '../author/shared/book.service';
import { BookDTO } from '../DTO/book-dto';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	dataLoaded: boolean = false;

	@Input() processInstanceId: string;

	formFieldsDto = null;
	formFields: IFormField[] = [];

	form: FormGroup = new FormGroup({});

	selectedFiles: FileList;

	options: BookDTO[] = [];
	filteredOptions: Observable<BookDTO[]>;

	myBook: BookDTO;

	hiddenFields: string[] = [];

	onlyOne = false;
	twoFiles = false;

	@ViewChild('myInput')
	myInputVariable: ElementRef;

	constructor(private formService: FormService,
		private authService: AuthService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private authorService: AuthorService,
		private bookService: BookService) { }

	handleFileInput(event) {
		console.log(event.target.files);
		this.selectedFiles = event.target.files;
		let files = Array.from(this.selectedFiles).filter(s => s.type != "application/pdf");
		console.log('files: ', files);
		if (files.length != 0) {
			alert('Only pdf supported!');
			this.selectedFiles = undefined;
			this.myInputVariable.nativeElement.value = "";
		}
		files = undefined;
		console.log('selected files: ', this.selectedFiles);
	}

	ngOnInit(): void {
		let path = this.activatedRoute.snapshot.routeConfig.path;

		this.formService.getForm(this.processInstanceId).subscribe((res) => {
			console.log('init form');
			this.setForm(res);
			this.dataLoaded = true;
			if (path.includes('file-a-complaint')) {
				this.getFileAComplaintForm();
			}
		}, (err) => {
			console.log(err.message);
		});
	}


	private getFileAComplaintForm() {
		this.bookService.getBooksFromOtherAuthors(this.authService.getLoggedUser()).subscribe((res: BookDTO[]) => {
			this.options = res;
			console.log(this.options);
		},
			(error) => {
				alert(error.message);
			});

		this.activatedRoute.paramMap.subscribe((params) => {
			this.bookService.getBook(+params.get('id')).subscribe((res) => {
				this.myBook = res;
			},
				(error) => {
					console.log(error.message);
				});
		});

		this.filteredOptions = this.form
			.get('auto-complete')!.valueChanges.pipe(
				startWith(''),
				map((value) => this._filter(value))
			);
	}

	setForm(res: any) {
		console.log(res);

		res.formFieldList.forEach((element: any) => {
			if (element.type.name == 'multiselect' || element.type.name == 'enum') {
				let values = Object.values(element.type.values);
				let keys = Object.keys(element.type.values);
				element.type.values = new Array<Value>();
				for (let i = 0; i < values.length; i++) {
					let value = new Value(keys[i], values[i].toString());
					element.type.values.push(value);
				}
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
				}
				if (validator.name == 'minlength') {
					validators.push(Validators.minLength(<number>validator.configuration));
				}
			});
			if (element.properties['minEditors'] != undefined) {
				validators.push(Validators.minLength(<number>element.properties['minEditors']));
			}
			if (element.properties['oneFile'] != undefined && element.properties['oneFile']) {
				this.onlyOne = true;
			}
			if (element.properties['twoFiles'] != undefined && element.properties['twoFiles']) {
				this.twoFiles = true;
			}
			if (element.properties['oneIfNeeded'] != undefined) {
				if (element.properties['oneIfNeeded'] == "false") {
					this.onlyOne = false;
					console.log(this.onlyOne);
				}
				else {
					this.onlyOne = true;
					console.log(this.onlyOne);
				}

			}
			if (element.properties['maxEditors'] != undefined) {
				validators.push(Validators.maxLength(<number>element.properties['maxEditors']));
			}

			console.log(element.properties);
			if (element.properties['hidden']) {
				this.hiddenFields.push(element.id);
			}
			console.log(this.hiddenFields);
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

		console.log(data);
		if (this.formFieldsDto !== null) {
			if (formFields.find(element => element.id == "files") !== undefined) {
				if (formFields.find(element => element.id == "files")) {
					this.upload(this.processInstanceId, this.selectedFiles);
				}
			}
			else if (formFields.find(element => element.id == "reupload") !== undefined) {
				if (formFields.find(element => element.id == "reupload")) {
					this.upload(this.processInstanceId, this.selectedFiles);
				}
			}
			else {
				if (formFields.find(element => element.id == "authorBook") !== undefined && formFields.find(element => element.id == "plagiarismBook") !== undefined) {
					let element;
					if (formFields.find(element => element.id == "authorBook")) {
						element = formFields.find(element => element.id == "authorBook");
						element.value = this.myBook.id;
					}
					if (formFields.find(element => element.id == "plagiarismBook")) {
						let plagiarism: BookDTO = this.options.find(x => x.title == value["auto-complete"]);
						if (plagiarism == null) {
							alert("Book doesn't exist!");
							this.form.get('auto-complete').patchValue('');
						}
						element = formFields.find(element => element.id == "plagiarismBook");
						element.value = plagiarism.id;
					}
				}
				this.formService.submitForm(this.processInstanceId, data).subscribe((res) => {


					if (value["isBetaReader"] == true) {
						this.formService.getForm(this.processInstanceId).subscribe((res: any) => {
							this.setForm(res);
							this.dataLoaded = true;
						},
							(err) => {
								console.log(err.message);
								alert(err.error)
							});
					}
					else {
						console.log(res);
						alert('Success!');
						this.route();
					}
				},
					(err) => {
						console.log(err);
						alert(err.error)
					});
			}

		}


	}



	upload(idx, file) {
		this.formService.upload(this.processInstanceId, this.selectedFiles).subscribe(
			event => {
				if (event instanceof HttpResponse) {

					alert("Uploaded successfully!");
					this.route();
				}
			},
			err => {
				alert('Could not upload the file:' + file.name);
			});
	}

	private _filter(value: string): BookDTO[] {
		const filterValue = value.toLowerCase();
		console.log(filterValue);

		return this.options.filter((option) =>
			option.title.toLowerCase().includes(filterValue)
		);

	}


	route() {
		if (this.activatedRoute.snapshot.routeConfig.path.includes('membership-requests')) {
			this.router.navigate(['committee']);
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('membership-payment') || this.activatedRoute.snapshot.routeConfig.path.includes('requests') ||
			this.activatedRoute.snapshot.routeConfig.path.includes('publish-book')) {
			this.router.navigate(['author']);
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('register')) {
			this.router.navigateByUrl('/welcome/login');
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('upload-documents') && this.authService.getRole() == "ROLE_PENDING_AUTHOR") {
			this.router.navigateByUrl('/review-expected');
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('file-a-complaint')) {
			this.router.navigate(['author/books']);
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('publishing-request')) {
			this.activatedRoute.paramMap.subscribe((params) => {
				let path = '/chief-editor/publishing-request/' + params.get('id');

				this.router.navigateByUrl('/chief-editor/publishing-requests', { skipLocationChange: true }).then(() => {
					this.router.navigate([path]);
				});
			});


		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('beta-books')) {
			this.router.navigate(['reader/beta-books']);
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('lector-request')) {
			this.activatedRoute.paramMap.subscribe((params) => {
				let path = '/lector/lector-request/' + params.get('id');

				this.router.navigateByUrl('/lector/lector-requests', { skipLocationChange: true }).then(() => {
					this.router.navigate([path]);
				});
			});
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('complaints')) {
			if (localStorage.getItem('User-role') === 'ROLE_EDITOR')
				this.router.navigate(['editor/complaints']);
			else if (localStorage.getItem('User-role') === 'ROLE_CHIEF_EDITOR')
				this.router.navigate(['chief-editor/complaints']);
			else
				this.router.navigate(['committee/complaints']);
		}
	}
}
