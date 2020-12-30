import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
	selector: 'app-home-author',
	templateUrl: './home-author.component.html',
	styleUrls: ['./home-author.component.css'],
})
export class HomeAuthorComponent implements OnInit {
	authorId:string = '';
	constructor(private router: Router, private authService:AuthService) {
		this.authorId = authService.getLoggedUser();
	}

	ngOnInit(): void {}

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
