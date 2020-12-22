import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifiedAccount',
  templateUrl: './verifiedAccount.component.html',
  styleUrls: ['./verifiedAccount.component.css']
})
export class VerifiedAccountComponent implements OnInit {
  
    constructor(private router: Router) { 
    }

	ngOnInit(): void {
	}

    LogIn() {
        this.router.navigateByUrl('/welcome/login');
    }
}
