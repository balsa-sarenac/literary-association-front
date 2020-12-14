import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { IUserRequest } from '../shared/iuser-request.registration';

@Component({
	selector: 'app-requests',
	templateUrl: './requests.component.html',
	styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
	users: IUserRequest[] = [];

	constructor(private adminService: AdminService) {}

	ngOnInit(): void {
		this.refreshTable();
	}

	approve(user: IUserRequest) {
		this.adminService.approveRequest(user.id).subscribe(() => alert('success'));
		this.refreshTable();
		location.reload();
	}

	delete(user: IUserRequest) {
		this.adminService.deleteRequest(user.id).subscribe(() => alert('success'));
		this.refreshTable();
	}

	refreshTable() {
		this.adminService.getRequests().subscribe((data: IUserRequest[]) => (this.users = data));
	}
}
