import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFile } from 'src/app/DTO/ifile';
import { CommitteeService } from '../shared/committee.service';
import { IMembershipRequest } from '../shared/imembership-request';

@Component({
	selector: 'app-membership-request',
	templateUrl: './membership-request.component.html',
	styleUrls: ['./membership-request.component.css'],
})
export class MembershipRequestComponent implements OnInit {
	request: IMembershipRequest;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private committeeService: CommitteeService
	) {}
	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			this.getRequest(params.get('id'));
		});
	}

	getRequest(id: string) {
		this.committeeService.getRequest(id).subscribe(
			(data: IMembershipRequest) => {
				this.request = data;
			},
			(error) => alert(error.error)
		);
	}

	download(file: IFile) {
		this.committeeService.getDocument(file.url).subscribe((data) => console.log(data));
	}

	accept() {
		let body = {
			requestId: this.request.id,
			option: 'approve',
		};
		this.committeeService.vote(body).subscribe(
			() => alert('Accepted'),
			(error) => alert(error.error)
		);
		this.router.navigate(['/committee/requests']);
	}

	refuse() {
		let body = {
			requestId: this.request.id,
			option: 'refuse',
		};
		this.committeeService.vote(body).subscribe(
			() => alert('Refused'),
			(error) => alert(error.error)
		);
		this.router.navigate(['/committee/requests']);
	}

	requestMore() {
		let body = {
			requestId: this.request.id,
			option: 'request_more',
		};
		this.committeeService.vote(body).subscribe(
			() => alert('Requested'),
			(error) => alert(error.error)
		);
		this.router.navigate(['/committee/requests']);
	}
}
