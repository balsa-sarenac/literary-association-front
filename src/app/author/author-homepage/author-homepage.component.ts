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
  formFields:any[] = [];
  taskId='';
  fileToUpload: File ;
  uploadForm:FormGroup=new FormGroup({});

  constructor(private authorService:AuthorService) { 
    this.fileToUpload = null;

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

  handleFileInput(event) {
    if (event.target.files.length > 0) {

      this.fileToUpload = event.target.files[0];

      if (this.fileToUpload.type.match('pdf\/*') == null) {
      console.log("Not supported");
        return;
      }

    console.log(this.fileToUpload);
  }}

  onSubmit(value:any){

    var author:{id:string, value:File}=null;

    for (var property in value) {
      console.log(property);
      console.log(value[property]);
      author= {id:property, value:this.fileToUpload};
    }

    console.log(author);

      if(this.formFieldsDto !== null){
        let x = this.authorService.submitDocuments(author, this.taskId);

        x.subscribe(
          res => {
            console.log(res);
            
            alert("You have successfully uploaded documents!")

            //this.router.navigate(['welcome'])

          },
          err => {
            console.log(err.message);
          }
        );
      }

      
    }
  
}
