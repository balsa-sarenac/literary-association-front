import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
	selector: 'app-home-reader',
	templateUrl: './home-reader.component.html',
	styleUrls: ['./home-reader.component.css'],
})
export class HomeReaderComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	logOut() {
		this.authService.logOut();
	}
}
