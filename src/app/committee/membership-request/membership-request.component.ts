import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommitteeService } from '../shared/committee.service';

@Component({
	selector: 'app-membership-request',
	templateUrl: './membership-request.component.html',
	styleUrls: ['./membership-request.component.css'],
})
export class MembershipRequestComponent implements OnInit {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private committeeService: CommitteeService
	) {}

	ngOnInit(): void {
		this.activatedRoute.paramMap['id'];
	}
}
