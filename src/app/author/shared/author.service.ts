
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDTO } from 'src/app/DTO/book-dto';
import { IMembershipRequest } from 'src/app/DTO/imembership-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
 
  
  constructor(private http: HttpClient) { }

  getRequest(requestId:string){
    return this.http.get<any>(environment.api + '/publish/get-request/'+requestId);
  }

  getRequests(authorId:string) {
    return this.http.get<any>(environment.api + '/publish/author-requests/'+authorId);
  }

  getMembershipRequest(authorId: string) {
    return this.http.get<IMembershipRequest>(environment.api+'/membership-requests/author-request/'+authorId);
  }
  
  startBookPublishingProcess(){
		return this.http.get<string>(environment.api+'/publish/start-book-publishing');
	}
  
  startPlagiarismProcess() {
    return this.http.get<string>(environment.api+'/plagiarism/start-plagiarism');
  }

}
