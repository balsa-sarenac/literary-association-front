import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { BookDTO } from 'src/app/DTO/book-dto';
import { ChiefEditorService } from '../shared/chief-editor.service';

@Component({
  selector: 'app-pub-req-detail',
  templateUrl: './pub-req-detail.component.html',
  styleUrls: ['./pub-req-detail.component.css']
})
export class PubReqDetailComponent implements OnInit {
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
  
  read(){
    let body={
      publishingRequestId:this.publishingRequest.id,
      response:true
    };
      this.chiefEditorService.read( body).subscribe(()=>{

      },
      (error)=> alert(error.console.error)
      );
  }

  refuse(){
    let body={
      publishingRequestId:this.publishingRequest.id,
      response:false
    };
    this.chiefEditorService.read(body).subscribe(()=>{
        this.router.navigateByUrl('/refusal/'+this.publishingRequest.id)
    },
    (error)=> alert(error.console.error)
    );
  }
}
