import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IPublishingRequest } from 'src/app/DTO/ipublishing-request';
import { ChiefEditorService } from '../shared/chief-editor.service';

@Component({
  selector: 'app-read-books-list',
  templateUrl: './read-books-list.component.html',
  styleUrls: ['./read-books-list.component.css']
})
export class ReadBooksListComponent implements OnInit {

  requests: IPublishingRequest[] = [];

  constructor(private editorService:ChiefEditorService, private authService:AuthService, private router: Router) { 
    this.refreshTable();
  }

  ngOnInit(): void {

    this.refreshTable();
  }

  refreshTable() {
    var logged=this.authService.getLoggedUser();
		this.editorService.getListOfBooksToRead(logged).subscribe((data: IPublishingRequest[]) =>{this.requests = data; console.log(data)} );
  }
  
  clickRow(request: IPublishingRequest) {
    if(request.status == "Original"){
      // idemo na approve
      this.router.navigateByUrl('editor/read-books/'+ request.id);
    }
    else if(request.status == "Approved"){
      // idemo na send to beta
      this.router.navigateByUrl('editor/send-to-beta-readers/'+ request.id);
    }
    else if(request.status == "SentToBeta") {
      // idemo na listu beta citalaca
      this.router.navigateByUrl('editor/choose-beta-readers/'+ request.id);
    }
  }
}