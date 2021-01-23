
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDTO } from 'src/app/DTO/book-dto';
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

  getMembershipRequestId(authorId: string) {
    return this.http.get<number>(environment.api+'/membership-requests/author-request/'+authorId);
  }
  
  startBookPublishingProcess(){
		return this.http.get<string>(environment.api+'/publish/start-book-publishing');
	}
  
  startPlagiarismProcess() {
    return this.http.get<string>(environment.api+'/plagiarism/start-plagiarism');
  }

}
