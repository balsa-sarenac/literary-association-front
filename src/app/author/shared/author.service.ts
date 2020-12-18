import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  startProcess():string{
    return '';
  }

  loadForm(processId:string){
    return this.http.get<any>(environment.api + '/form/get/'+processId);
  }

  submitDocuments(file:{id:string, value:File}, taskId:string ){
    console.log('entered');
    let formData:FormData = new FormData();
    console.log();
    
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/pdf');
    
    return this.http.post<any>(environment.api + '/membership/submitForm/'+taskId, file, {headers:headers});
  }
}
