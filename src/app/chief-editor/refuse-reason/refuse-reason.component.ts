import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-refuse-reason',
  templateUrl: './refuse-reason.component.html',
  styleUrls: ['./refuse-reason.component.css']
})
export class RefuseReasonComponent implements OnInit {
  constructor(private authService: AuthService, private activatedRoute:ActivatedRoute) {
  }
  
  publishingRequestId:number;

	ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
			this.publishingRequestId = +params.get('id');
		});
  }

	logOut() {
		this.authService.logOut();
	}

}
