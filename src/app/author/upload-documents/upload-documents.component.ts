import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  formFieldsDto = null;
  formFields:any[] = [];
  processId:string;
  fileToUpload: File ;
  uploadForm:FormGroup=new FormGroup({});

  constructor(private authorService:AuthorService) { 
    this.fileToUpload = null;

    this.processId = this.authorService.startProcess();
  }

  ngOnInit(): void {
    this.authorService.loadForm(this.processId).subscribe((res)=>{

    });
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

    // var author:{id:string, value:File}=null;

    // for (var property in value) {
    //   console.log(property);
    //   console.log(value[property]);
    //   author= {id:property, value:this.fileToUpload};
    // }

    // console.log(author);

    //   if(this.formFieldsDto !== null){
    //     let x = this.authorService.submitDocuments(author, this.processId);

    //     x.subscribe(
    //       res => {
    //         console.log(res);
            
    //         alert("You have successfully uploaded documents!")

    //         //this.router.navigate(['welcome'])

    //       },
    //       err => {
    //         console.log(err.message);
    //       }
    //     );
    //   }

      
    }

}
