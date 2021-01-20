import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/shared/auth.service';
import {IFormField} from '../auth/shared/iformfield.register';
import {AuthorService} from '../author/shared/author.service';
import {Value} from '../DTO/value';
import {FormService} from './shared/form.service';
import {map, startWith} from 'rxjs/operators';
import {BookService} from '../author/shared/book.service';
import {BookDTO} from '../DTO/book-dto';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	dataLoaded: boolean = false;

	@Input() processInstanceId: string;
	@Input() publishingRequestId: number;

	formFieldsDto = null;
	formFields: IFormField[] = [];

	form: FormGroup = new FormGroup({});

	values = new Array<Value>();

	selectedFiles: FileList;

	fileInfos: Observable<any>;

	options: BookDTO[] = [];
	filteredOptions: Observable<BookDTO[]>;

	myBook: BookDTO;

	constructor(private formService: FormService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private authorService: AuthorService, private bookService: BookService) {

	}

	handleFileInput(event) {
		this.selectedFiles = event.target.files;
		console.log(this.selectedFiles);
	}

	ngOnInit(): void {


    let path = this.activatedRoute.snapshot.routeConfig.path;
    if (path.includes('upload-documents') || path.includes('membership-payment')) {
			this.formService.getProcessId(this.authService.getLoggedUser()).subscribe((res) => {
				this.processInstanceId = res.processId;
				console.log(this.processInstanceId);

				this.formService.getForm(this.processInstanceId).subscribe((res) => {
					console.log('init form');
					this.setForm(res);
					this.dataLoaded = true;
				},
					(err) => {
						console.log(err.message);
					});
			});
		}
		else if (path.includes('refusal') || path.includes('requests') || path.includes('choose-beta-readers') || path.includes('beat-books')) {
			console.log('entered');
			this.formService.getRefusalProcessId(this.publishingRequestId).subscribe((res) => {
				this.processInstanceId = res.processId;
				console.log(this.processInstanceId);

				this.formService.getForm(this.processInstanceId).subscribe((res) => {
					console.log('init form');
					this.setForm(res);
					this.dataLoaded = true;
				},
					(err) => {
						console.log(err.message);
					});
			});
		}
		else {
			this.formService.getForm(this.processInstanceId).subscribe((res) => {
				console.log('init form');
				this.setForm(res);
				this.dataLoaded = true;
				if (path.includes('file-a-complaint')) {
          this.getFileAComplaintForm();
        }
					},(err) => {
							console.log(err.message);
          });
				}

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
		console.log(this.values);
		console.log(res);

		res.formFieldList.forEach((element: any) => {
			if ((element.type.name == "multiselect" && element.id != "betaReaders") || element.type.name == "enum") {
				element.type.values = Object.values(element.type.values);
			}
			else if (element.type.name == "multiselect" && element.id == "betaReaders") {
				var values = Object.values(element.type.values);
				var keys = Object.keys(element.type.values);
				element.type.values = new Array<Value>();
				for (var i = 0; i < values.length; i++) {
					var value = new Value(keys[i], values[i].toString());
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
				} else if (validator.name == 'minlength') {
					validators.push(Validators.minLength(<number>validator.configuration));
				}
			});

			fc.setValidators(validators);

			this.form.addControl(element.id, fc);

		});
	}

	onSubmit(value: any, form: any) {
		if (this.activatedRoute.snapshot.routeConfig.path.includes('file-a-complaint')) {
			console.log(this.myBook);
			console.log(value);
			let plagiarism = this.options.find(x => x.title == value["auto-complete"]);
			console.log(plagiarism);
			if (plagiarism != null) {
				this.authorService.fileComplaint(this.myBook, plagiarism, this.authService.getLoggedUser(), this.processInstanceId).subscribe((res) => {
					alert("Success");
					this.router.navigate(['author/books']);
				})
			}
			else {
				alert("Book doesn't exist!");
				this.form.get('auto-complete').patchValue('');
			}
		}
		else if (this.activatedRoute.snapshot.routeConfig.path.includes('membership-payment')) {
			this.authorService.payMembershipFee(this.processInstanceId).subscribe((res) => {
				alert('Success while paying!');
				this.router.navigate(['author']);
			});
		}
		else {
			let formFields = new Array();
			for (var property in value) {
				formFields.push({ id: property, value: value[property] });
			}

			var data = {
				formFields: formFields,
			};

			if (this.formFieldsDto !== null) {
				if (formFields.find(element => element.id == "files") !== undefined) {
					if (formFields.find(element => element.id == "files")) {
						this.upload(this.processInstanceId, this.selectedFiles);
					}
				}
				else {
					this.formService.submitForm(this.processInstanceId, data).subscribe((res) => {


						if (value["isBetaReader"] == true) {
							this.formService.getForm(this.processInstanceId).subscribe((res: any) => {
								this.setForm(res);
								this.dataLoaded = true;
							},
								(err) => {
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
						(err) => {
							console.log(err);
						});
				}

			}
		}

	}


	upload(idx, file) {
		this.formService.upload(this.processInstanceId, this.selectedFiles).subscribe(
			event => {
				if (event.type === HttpEventType.UploadProgress) {
					// add logic if progress bar is required
				} else if (event instanceof HttpResponse) {

					alert("Uploaded successfully!");
					if (this.activatedRoute.snapshot.routeConfig.path.includes('requests'))
						this.router.navigate(['author']);
					else
						this.router.navigateByUrl('/review-expected');
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
}
