import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {
		console.log('new instance of service');
	}

	setProcessId(processId: string) {
		localStorage.setItem('processId', processId);
	}

	getLoggedUser() {
		return localStorage.getItem('Id');
	}

	getToken() {
		let token = localStorage.getItem('User-token');
		return token == null ? '' : 'Bearer ' + token;
	}

	login(data: any) {
		return this.http.post<any>(environment.api + '/auth/login', data);
	}

	startAuthorRegistrationProcess() {
		return this.http.get<string>(environment.api + '/auth/start-author-reg');
	}

	startReaderRegistrationProcess() {
		return this.http.get<string>(environment.api + '/auth/start-reader-reg');
	}

	getReaderRegistrationForm() {
		var res = this.http.get(environment.api + '/auth/form-registration');
		return res;
	}

	registerAuthor(author: {}, taskId: string) {
		console.log(author);
		return this.http.post('http://localhost:8080/auth/register-author/' + taskId, author) as Observable<any>;
	}

	registerReader(reader: {}, taskId: string) {
		console.log(reader);
		return this.http.post('http://localhost:8080/auth/submitRegForm/' + taskId, reader) as Observable<any>;
	}

	getAdditionalGenreForm(processId: string) {
		var res = this.http.get(environment.api + '/auth/form-genres/' + processId);
		return res;
	}

	addAdditionalGenres(reader: {}, processId: string) {
		return this.http.post(
			'http://localhost:8080/auth/submitAdditionalGenres/' + processId,
			reader
		) as Observable<any>;
	}

	logOut() {
		localStorage.removeItem('User-token');
		localStorage.removeItem('Expires-in');
		localStorage.removeItem('Username');
		localStorage.removeItem('User-role');
		localStorage.removeItem('Refresh-token');
		localStorage.removeItem('Cart');
		localStorage.removeItem('Id');
		this.router.navigate(['welcome']);
	}
}
