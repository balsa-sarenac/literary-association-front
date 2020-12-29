import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMembershipRequest } from './imembership-request';

@Injectable({
	providedIn: 'root',
})
export class CommitteeService {
	constructor(private http: HttpClient) {}

	getRequests() {
		return this.http.get<IMembershipRequest[]>(environment.api + '/membership-requests');
	}

	getRequest(id: number) {
		return this.http.get<IMembershipRequest>(environment.api + '/membership-requests/' + id);
	}

	getDocument(id: number) {
		return this.http.get<any>(environment.api + '/membership-requests/documents/' + id);
	}
}
