import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm;

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
		this.loginForm = this.formBuilder.group({
			email: '',
			password: '',
		});
	}

	ngOnInit(): void {}

	onSubmit(value: Object) {
		this.authService.login(value).subscribe(
			(data) => {
				//localStorage.clear();
				localStorage.setItem('User-token', data.accessToken);
				localStorage.setItem('Expires-in', data.expiresIn);
				localStorage.setItem('Refresh-token', data.refreshToken);
				localStorage.setItem('Username', data.username);
				localStorage.setItem('User-role', data.role);
				localStorage.setItem('Id', data.id);
				localStorage.setItem('Status', data.status);
				this.loginForm.reset();
				console.log(data);

				if (data.role == 'ROLE_ADMIN') this.router.navigate(['admin']);
				else if (data.role=='ROLE_PENDING_AUTHOR' && data.status == 'paymentRequired') this.router.navigate(['membership-payment']);
				else if (data.role == 'ROLE_PENDING_AUTHOR' && data.status == 'reviewExpected' ) this.router.navigate(['review-expected']);
				else if (data.role == 'ROLE_PENDING_AUTHOR' || (data.role == 'ROLE_PENDING_AUTHOR' && data.status=='moreDocuments')) this.router.navigate(['upload-documents']);


				else if (data.role == 'ROLE_READER' || data.role == 'ROLE_BETA_READER')
					this.router.navigate(['reader']);
				else if (data.role == 'ROLE_AUTHOR') this.router.navigate(['author']);
				else if (data.role == 'ROLE_COMMITTEE_MEMBER' || data.role == 'ROLE_HEAD_OF_COMMITTEE') this.router.navigate(['committee']);
				else if (data.role == 'ROLE_EDITOR') this.router.navigate(['editor']);
				else if (data.role == 'ROLE_LECTOR') this.router.navigate(['lector']);
				else if (data.role == 'ROLE_CHIEF_EDITOR') this.router.navigate(['chief-editor']);
			},
			(error) => {
				alert(error.error);
			}
		);
	}
}
