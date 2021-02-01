import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { FormService } from 'src/app/form/shared/form.service';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {

  publishingRequestId:number;
  publishingRequest:IPublishingRequest;
  processInstanceId:string;
  dataLoaded:boolean=false;

  constructor(private activatedRoute:ActivatedRoute, private formService:FormService, private authorService:AuthorService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.publishingRequestId=+params.get('id');
      this.getRequest(this.publishingRequestId.toString());
     
    });
    console.log(this.publishingRequestId);
  }

  getRequest(id: string) {
    this.authorService.getRequest(id).subscribe(
        (data: IPublishingRequest) => {
            this.publishingRequest = data;
            if(this.publishingRequest.status !== 'Editing timeout happened'){
              this.getProcessInstanceId();
            }
        },
        (error) => alert(error.error)
    );
  }
  getProcessInstanceId(){
    this.formService.getProcessInstanceId(this.publishingRequestId.toString(), 'publishingRequestId').subscribe(
      (data) => {
          this.processInstanceId = String(data.processId);
          console.log(this.processInstanceId);
          this.dataLoaded = true;
      },
      (error) => alert(error.error)
  );
  }

}
