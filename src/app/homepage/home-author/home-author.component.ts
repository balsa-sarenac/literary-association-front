import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home-author',
	templateUrl: './home-author.component.html',
	styleUrls: ['./home-author.component.css'],
})
export class HomeAuthorComponent implements OnInit {
	constructor(private router: Router) {}

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
