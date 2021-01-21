import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFile } from 'src/app/DTO/ifile';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { ChiefEditorService } from '../shared/chief-editor.service';

@Component({
    selector: 'app-publishing-request',
    templateUrl: './publishing-request.component.html',
    styleUrls: ['./publishing-request.component.css']
})
export class PublishingRequestComponent implements OnInit {
    publishingRequest: IPublishingRequest;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private chiefEditorService: ChiefEditorService) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.getRequest(params.get('id'));
        });
    }

    getRequest(id: string) {
        this.chiefEditorService.getRequest(id).subscribe(
            (data: IPublishingRequest) => {
                this.publishingRequest = data;
            },
            (error) => alert(error.error)
        );
    }

    download(file: IFile) {
        this.chiefEditorService.getDocument(file.url).subscribe((data) => console.log(data));
    }

}
