import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  choice: string = '';
  show: boolean = true;
  formFieldsDto = null;
  formFields = new Array<object>();
  taskId='';
  authorRegForm:FormGroup=new FormGroup({});
  readerRegForm:FormGroup=new FormGroup({});

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onAuthor(){
    this.choice="author";
    this.show = false;
    this.authService.getAuthorRegistrationForm().subscribe(res=>{
      console.log(res);
      this.formFieldsDto = res;
      this.formFields = res.formFieldList;
      this.taskId = res.taskId;
      console.log(this.formFields);
      
  this.formFields.forEach((element:any)=>{
      let fc = new FormControl('');

      let validators:any[]=[];
      element.validationConstraints.map((validator:any)=>{
          if(validator.name == 'required'){
            validators.push(Validators.required);
          }
          else if(validator.name == 'minlength'){
            validators.push(Validators.minLength(<number>validator.configuration));
          }
      })

      fc.setValidators(validators);

      this.authorRegForm.addControl(element.id, fc);
     })

    
  })
console.log(this.authorRegForm);

  }

  onSubmit(value:any , form:any){
    let formFields = new Array();
    for (var property in value) {
      console.log(property);
      console.log(value[property]);
      formFields.push({id : property, value : value[property]});
    }

    console.log(formFields);
    var author = {
      formFields:formFields
    };

    if(this.formFieldsDto !== null){
      let x = this.authService.registerAuthor(author, this.taskId);

      x.subscribe(
        res => {
          console.log(res);
          
          alert("You registered successfully!")

          this.router.navigate(['welcome'])

        },
        err => {
          console.log(err);
        }
      );
    }

    
  }

  onReader(){
    this.choice="reader";
    this.show = false;

    this.authService.getAuthorRegistrationForm().subscribe(res=>{
      console.log(res);
      this.formFieldsDto = res;
      this.formFields = res.formFieldList;
      this.taskId = res.taskId;
      console.log(this.formFields);
      
      this.formFields.forEach((element:any)=>{
        let fc = new FormControl('');

        let validators:any[]=[];
        element.validationConstraints.map((validator:any)=>{
            if(validator.name == 'required'){
              validators.push(Validators.required);
            }
            else if(validator.name == 'minlength'){
              validators.push(Validators.minLength(<number>validator.configuration));
            }
        })

        fc.setValidators(validators);

        this.readerRegForm.addControl(element.id, fc);
      })

    
    })
    console.log(this.authorRegForm);
  }

  onSubmitR(value:any , form:any){
    let formFields = new Array();
    for (var property in value) {
      console.log(property);
      console.log(value[property]);
      formFields.push({id : property, value : value[property]});
    }

    console.log(formFields);
    var author = {
      formFields:formFields
    };

    if(this.formFieldsDto !== null){
      let x = this.authService.registerReader(author, this.taskId);

      x.subscribe(
        res => {
          console.log(res);
          
          alert("You registered successfully!")

          this.router.navigate(['welcome'])

        },
        err => {
          console.log(err);
        }
      );
    }
  }

  
}
