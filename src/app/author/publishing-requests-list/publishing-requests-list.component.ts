import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { AuthorService } from '../shared/author.service';
import { IPublishingRequest } from '../../DTO/ipublishing-request';

@Component({
  selector: 'app-publishing-requests-list',
  templateUrl: './publishing-requests-list.component.html',
  styleUrls: ['./publishing-requests-list.component.css']
})
export class PublishingRequestsListComponent implements OnInit {

  requests: IPublishingRequest[] = [];

  constructor(private authorService:AuthorService, private authService:AuthService) { 
    this.refreshTable();
  }

  ngOnInit(): void {

    this.refreshTable();
  }

  refreshTable() {
    var logged=this.authService.getLoggedUser();
		this.authorService.getRequests(logged).subscribe((data: IPublishingRequest[]) =>{this.requests = data; console.log(data)} );
	}
}
