import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Get the auth token from the service.
		const authToken = this.auth.getToken();
		if (authToken != '') {
			// alert("Why am i here");
			// Clone the request and replace the original headers with
			// cloned headers, updated with the authorization.
			const authReq = req.clone({
				headers: req.headers.set('AuthToken', authToken),
			});

			// send cloned request with header to the next handler.
			return next.handle(authReq);
		} else {
			const request = req.clone({
				headers: req.headers.set('Content-Type', 'application/json'),
			});
			return next.handle(request);
		}
	}
}
