import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-author-homepage',
  templateUrl: './author-homepage.component.html',
  styleUrls: ['./author-homepage.component.css']
})
export class AuthorHomepageComponent implements OnInit {

  formFieldsDto = null;
  formFields = [];
  taskId='';
 uploadForm:FormGroup=new FormGroup({});

  constructor(private authorService:AuthorService) { 
    this.authorService.loadForm().subscribe(res=>{
      this.formFieldsDto = res;
      this.formFields = res.formFieldList;
      this.taskId = res.taskId;
      console.log(this.formFields);
      
  this.formFields.forEach((element:any)=>{
      let fc = new FormControl('');

      console.log(element);
      let validators:any[]=[];
      element.validationConstraints.map((validator:any)=>{
          if(validator.name == 'required'){
            validators.push(Validators.required);
          }
      })
      console.log(validators);
      fc.setValidators(validators);

      console.log(fc);
      this.uploadForm.addControl(element.id, fc);
    })
  })
  }

  ngOnInit(): void {
  }

}
