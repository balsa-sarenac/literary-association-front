import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {IComplaint} from '../../DTO/icomplaint';

@Injectable({
  providedIn: 'root'
})

export class ChiefEditorService
{
  constructor(private http:HttpClient) { }

  getRequests(editorId:string) {
    return this.http.get<any>(environment.api + '/publish/chiefEditor-requests/'+editorId);
  }

  getRequest(requestId: string){
    return this.http.get<any>(environment.api + '/publish/get-request/'+requestId);
  }

  getDocument(url: string) {
		return this.http.get<any>(url);
  }

  getComplaints() {
    return this.http.get<IComplaint[]>(environment.api + '/plagiarism/complaints');
  }

  getComplaint(id: string) {
    return this.http.get<IComplaint>(environment.api + '/plagiarism/complaints/' + id);
  }
}
