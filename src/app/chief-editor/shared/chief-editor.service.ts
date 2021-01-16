import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChiefEditorService {
  
 
  constructor(private http:HttpClient) { }

  getRequests(editorId:string) {
    return this.http.get<any>(environment.api + '/publish/chiefEditor-requests/'+editorId);
  }

  getRequest(requestId: string){
    return this.http.get<any>(environment.api + '/publish/get-request/'+requestId);
  }

  read(body:{}) {
    return this.http.post<any>(environment.api+'/publish/read', body);
  }
}
