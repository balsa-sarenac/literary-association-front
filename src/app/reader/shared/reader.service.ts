import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IPublishingRequest} from './ipublishing-request';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http: HttpClient) { }

  getPublishingRequests() {
    return this.http.get<IPublishingRequest[]>(environment.api + "/beta-readers/requests");
  }

  getRequest(id: string) {
    return this.http.get<IPublishingRequest>(environment.api + "/beta-readers/requests/" + id);
  }

  sendNotes(id: String, value: Object) {
    return this.http.post(environment.api + "/beta-readers/requests/" + id + "/notes", value);
  }
}
