import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { BookDTO } from 'src/app/DTO/book-dto';
import { ChiefEditorService } from '../shared/chief-editor.service';

@Component({
  selector: 'app-pub-req-potential-sources',
  templateUrl: './pub-req-potential-sources.component.html',
  styleUrls: ['./pub-req-potential-sources.component.css']
})
export class PubReqPotentialSourcesComponent implements OnInit {

    publishingRequest :IPublishingRequest;

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

    original() {
      let body={
        publishingRequestId:this.publishingRequest.id,
        response:true
      };

      this.chiefEditorService.originalBook(body).subscribe(()=>
        {
          this.router.navigateByUrl('editor/chief-editor-plagiarism-requests');
        },
        (error)=> alert(error.console.error)
      );
    }

    refuse() {
      let body={
        publishingRequestId: this.publishingRequest.id,
        response: false
      };

      this.chiefEditorService.originalBook(body).subscribe(()=>
        {
          this.router.navigateByUrl('/refusal/'+this.publishingRequest.id)
        },
        (error)=> alert(error.console.error)
      );
    }
}
