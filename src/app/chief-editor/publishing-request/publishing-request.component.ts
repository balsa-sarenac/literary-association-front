import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFile } from 'src/app/DTO/ifile';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { FormService } from 'src/app/form/shared/form.service';
import { ChiefEditorService } from '../shared/chief-editor.service';

@Component({
    selector: 'app-publishing-request',
    templateUrl: './publishing-request.component.html',
    styleUrls: ['./publishing-request.component.css']
})
export class PublishingRequestComponent implements OnInit {
    publishingRequest: IPublishingRequest;
    processInstanceId: string;
    dataLoaded:boolean=false;

    constructor(private router: Router,
         private activatedRoute: ActivatedRoute,
          private chiefEditorService: ChiefEditorService,
          private formService:FormService) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.getRequest(params.get('id'));
        });
    }

    getRequest(id: string) {
        this.chiefEditorService.getRequest(id).subscribe(
            (data: IPublishingRequest) => {
                this.publishingRequest = data;
                console.log(this.publishingRequest);
                if (this.publishingRequest.status != 'Book is published' && this.publishingRequest.status != 'Editing timeout happened') {
                  this.formService.getProcessInstanceId(id, "publishingRequestId").subscribe(
                    (data) => {
                      this.processInstanceId = String(data.processId);
                      this.dataLoaded= true;
                    },
                    (error) => {
                      alert(error.error)
                    }
                  );
                }
            },
            (error) => alert(error.error)
        );

    }

    download(file: IFile) {
        this.chiefEditorService.getDocument(file.url).subscribe((data) => console.log(data));
    }

    showForm() {
        switch (this.publishingRequest.status) {
            case 'New request':
                return true;
            case 'Book uploaded':
                return true;
            case 'Book is original':
                return true;
            case 'Book is approved for publishing':
                return true;
            case 'Editor review':
                return true;
            case 'Final editor check':
                return true;
            default:
                return false;
        }
    }

}
