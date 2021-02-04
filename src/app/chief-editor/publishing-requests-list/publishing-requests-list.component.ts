import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { ChiefEditorService } from '../shared/chief-editor.service';

@Component({
  selector: 'app-publishing-requests-list',
  templateUrl: './publishing-requests-list.component.html',
  styleUrls: ['./publishing-requests-list.component.css']
})
export class PublishingRequestsComponent implements OnInit {
  requests: IPublishingRequest[] = [];

  constructor(private authService:AuthService, private chiefEditorService:ChiefEditorService) { }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    var logged=this.authService.getLoggedUser();
		this.chiefEditorService.getRequests(logged).subscribe((data: IPublishingRequest[]) =>{this.requests = data; } );
	}

}
