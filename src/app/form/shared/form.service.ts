import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  

  constructor(private http:HttpClient) { }

  upload(processId:string, file) {
    console.log('upload in');
    const formData: FormData = new FormData();

    var files:File[] =[]; 
    for(var i=0; i<file.length; i++){
      formData.append('file', file[i]);
    }
      //formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.api}/file/upload/`+processId, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
    //return this.http.post<any>(environment.api+'/file/upload/'+processId, formData);
  }

  getForm(processId:string){
    console.log('http get');
 
      return this.http.get<any>(environment.api+'/form/get/'+processId);
  }

  submitForm(processId:string, data:any){
    return this.http.post<any>(environment.api+'/form/submit/'+processId, data);
  }

  getProcessId(userId:string) {
    console.log('get process id');
    return this.http.get<any>(environment.api+'/form/get-process-id/'+userId);
  }
}
