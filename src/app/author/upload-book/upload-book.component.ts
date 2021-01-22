import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/form/shared/form.service';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {

  publishingRequestId:number;
  processInstanceId:string;
  dataLoaded:boolean=false;

  constructor(private activatedRoute:ActivatedRoute, private formService:FormService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.publishingRequestId=+params.get('id');
      this.getProcessInstanceId();
    });
    console.log(this.publishingRequestId);
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
