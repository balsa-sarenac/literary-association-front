import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	getToken() {
		let token = localStorage.getItem('User-token');
		return token == null ? '' : 'Bearer ' + token;
	}

	login(data: any) {
		return this.http.post<any>(environment.api + '/auth/login', data);
	}

	getAuthorRegistrationForm(){
		return this.http.get<any>(environment.api+'/auth/author-reg-form');
	}

	registerAuthor(author:{}, taskId:string) {
		console.log(author);
		return this.http.post("http://localhost:8080/auth/register-author/"+taskId, author) as Observable<any>;
	  }
}
