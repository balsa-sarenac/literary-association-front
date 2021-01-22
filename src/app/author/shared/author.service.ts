
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDTO } from 'src/app/DTO/book-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  
   
  constructor(private http: HttpClient) { }

  loadForm(processId:string){
    return this.http.get<any>(environment.api + '/form/get/'+processId);
  }

  getRequests(authorId:string) {
    return this.http.get<any>(environment.api + '/publish/author-requests/'+authorId);
  }

  
  
  startBookPublishingProcess(){
		return this.http.get<string>(environment.api+'/publish/start-book-publishing');
	}
  
  startPlagiarismProcess() {
    return this.http.get<string>(environment.api+'/plagiarism/start-plagiarism');
  }

  fileComplaint(myBook: BookDTO, plagiarism: BookDTO, authorId:string, processId:string) {
    let plagiarismComplaint = {
      plagiated:myBook,
      plagiarism:plagiarism
    }
	  return this.http.post<any>(environment.api+'/plagiarism/file-a-complaint/'+authorId+"/"+processId, plagiarismComplaint );
  }
}
