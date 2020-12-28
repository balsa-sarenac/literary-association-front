import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
	selector: 'app-home-committee',
	templateUrl: './home-committee.component.html',
	styleUrls: ['./home-committee.component.css'],
})
export class HomeCommitteeComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	logOut() {
		this.authService.logOut();
	}
}
