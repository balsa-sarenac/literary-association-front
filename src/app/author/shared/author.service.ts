
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  

  constructor(private http: HttpClient) { }

  loadForm(processId:string){
    return this.http.get<any>(environment.api + '/form/get/'+processId);
  }

  payMembershipFee(processId: string) {
	  return this.http.put<any>(environment.api+'/membership-payment/pay'+processId, {});
  }

  getRequests(authorId:string) {
    return this.http.get<any>(environment.api + '/publish/author-requests/'+authorId);
  }
  
  startBookPublishingProcess(){
		return this.http.get<string>(environment.api+'/publish/start-book-publishing');
	}
  
}
