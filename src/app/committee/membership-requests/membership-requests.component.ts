import { Component, OnInit } from '@angular/core';
import { CommitteeService } from '../shared/committee.service';
import { IMembershipRequest } from '../shared/imembership-request';

@Component({
	selector: 'app-membership-requests',
	templateUrl: './membership-requests.component.html',
	styleUrls: ['./membership-requests.component.css'],
})
export class MembershipRequestsComponent implements OnInit {
	requests: IMembershipRequest[] = [];

	constructor(private committeeService: CommitteeService) {}

	ngOnInit(): void {
		this.committeeService.getRequests().subscribe((data: IMembershipRequest[]) => (this.requests = data));
	}
}
