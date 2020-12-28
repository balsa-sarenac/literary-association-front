import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
	selector: 'app-home-admin',
	templateUrl: './home-admin.component.html',
	styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	logOut() {
		this.authService.logOut();
	}
}
