import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { formFieldDto } from 'src/app/DTO/formFieldDTO';
import { Value } from 'src/app/DTO/value';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-registerReader',
    templateUrl: './registerReader.component.html',
    styleUrls: ['./registerReader.component.css']
})
export class RegisterReaderComponent implements OnInit {
    readerRegForm:FormGroup=new FormGroup({});
    betaReaderRegForm:FormGroup=new FormGroup({});
    taskId='';
    processId = '';
    formFieldsDto:any;
    formFields = new Array<formFieldDto>();
    values = new Array<Value>();
    nextStep = false;
    betaUser = false;

    constructor(private authService:AuthService, private router:Router) {
        
    }

    ngOnInit(): void {
        this.authService.getReaderRegistrationForm().subscribe(
            (res:any)=>{
                console.log(res);
                this.formFieldsDto = res;
                this.formFields = res.formFieldList;
                this.taskId = res.taskId;
                this.processId = res.processId;
                console.log(this.formFields);
                
                this.formFields.forEach((element:any)=>{

                    if(element.type.name == "enum"){
                        for (let key in element.type.values) {
                            let value = element.type.values[key];
                            let fc = new FormControl('');
                            this.readerRegForm.addControl(key, fc);
                            this.values.push(new Value(key, value));
                        }
                    }
                    else {
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
                    }
                });
            },
            (err:any) => {
                console.log(err);
            }
        );
        console.log(this.readerRegForm);
        
    }

    onSubmit(value:any , form:any){
        var formFields2 = new Array();

        if(value["isBetaReader"]==true)
        this.betaUser = true;

        for (let key in this.formFields) {
            if(this.formFields[key].id != 'genres'){
                formFields2.push({id:this.formFields[key].id, value:value[this.formFields[key].id]});
            }
        }
        var genres = "";
        for(let key in this.values){
          if(value[this.values[key].id] != '') {
            genres += this.values[key].id + ",";
          }
        }
        formFields2.push({id:'genres', value:genres});

    
        console.log(formFields2);
        var reader = {
          formFields:formFields2
        };
    
        if(this.formFieldsDto !== null){
          let x = this.authService.registerReader(reader, this.taskId);
    
          x.subscribe(
            res => {
                console.log(res);

                if(res.type == "beta"){
                    this.authService.getAdditionalGenreForm(this.processId).subscribe(
                        (res : any) => {
                            if(res == null) {
                                alert("You registered successfully!");
                                this.router.navigate(['welcome']);
                            }
                            else {
                                this.nextStep = true;
                                this.formFieldsDto = res;
                                this.formFields = res.formFieldList;
                                this.taskId = res.taskId;
                                this.processId = res.processId;
        
                                this.values = new Array<Value>();
        
                                this.formFields.forEach((element:any)=>{
        
                                    if(element.type.name == "enum"){
                                        for (let key in element.type.values) {
                                            let value = element.type.values[key];
                                            let fc2 = new FormControl('');
                                            this.betaReaderRegForm.addControl(key, fc2);
                                            this.values.push(new Value(key, value));
                                        }
                                    }
                                });
                            }
                        },
                        (err: any) => {
                            console.log(err);
                        }
                    );
                }
                else {
                    alert("You registered successfully!");
                    this.router.navigate(['welcome']);
                }    
            },
            err => {
              console.log(err);
            }
          );
        }
    }

    onSubmitBeta(value:any , form:any){
        var formFields2 = new Array();
        var genres = "";
        for(let key in this.values){
          if(value[this.values[key].id] != '') {
            formFields2.push({id:this.values[key].id, value:value[this.values[key].id]});
          }
        }
        
        console.log(formFields2);
        var reader = {
          formFields:formFields2
        };
    
        if(this.formFieldsDto !== null){
          let x = this.authService.addAdditionalGenres(reader, this.processId);
    
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
