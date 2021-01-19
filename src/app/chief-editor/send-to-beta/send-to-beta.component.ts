import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { BookDTO } from 'src/app/DTO/book-dto';
import { ChiefEditorService } from '../shared/chief-editor.service';
import { IFile } from 'src/app/DTO/ifile';

@Component({
  selector: 'app-send-to-beta',
  templateUrl: './send-to-beta.component.html',
  styleUrls: ['./send-to-beta.component.css']
})
export class SendToBetaComponent implements OnInit {
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

    yes() {
      let body={
        publishingRequestId:this.publishingRequest.id,
        response:true
      };

      this.chiefEditorService.sendToBeta(body).subscribe(()=>
        {
          this.router.navigateByUrl('editor/choose-beta-readers/'+ this.publishingRequest.id);
        },
        (error)=> alert(error.console.error)
      );
    }

    no() {
      let body={
        publishingRequestId: this.publishingRequest.id,
        response: false
      };

      this.chiefEditorService.sendToBeta(body).subscribe(()=>
        {
            this.router.navigateByUrl('editor/read-books');
        },
        (error)=> alert(error.console.error)
      );
    }
}
