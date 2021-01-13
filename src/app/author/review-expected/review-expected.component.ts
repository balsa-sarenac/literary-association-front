import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-review-expected',
  templateUrl: './review-expected.component.html',
  styleUrls: ['./review-expected.component.css']
})
export class ReviewExpectedComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
		this.authService.logOut();
	}
}
