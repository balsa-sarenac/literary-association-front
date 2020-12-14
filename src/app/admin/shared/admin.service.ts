import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	constructor(private http: HttpClient) {}

	getRequests() {
		return this.http.get<any>(environment.api + '/auth/requests');
	}

	approveRequest(id: number) {
		return this.http.get<any>(environment.api + '/auth/enable/' + id);
	}

	deleteRequest(id: number) {
		return this.http.delete<any>(environment.api + '/auth/delete/' + id);
	}
}
