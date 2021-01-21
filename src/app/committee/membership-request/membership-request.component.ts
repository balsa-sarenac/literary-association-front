import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFile } from 'src/app/DTO/ifile';
import { CommitteeService } from '../shared/committee.service';
import { IMembershipRequest } from '../shared/imembership-request';
import {FormService} from '../../form/shared/form.service';

@Component({
	selector: 'app-membership-request',
	templateUrl: './membership-request.component.html',
	styleUrls: ['./membership-request.component.css'],
})
export class MembershipRequestComponent implements OnInit {
	request: IMembershipRequest;
	dataCollected: boolean = false;
  processInstanceId: string;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private committeeService: CommitteeService,
    private formService: FormService,
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
				this.formService.getProcessInstanceId(String(this.request.id), "membershipRequestId")
          .subscribe((data) => {
            this.processInstanceId = data.processId;
            this.dataCollected = true;
          });
			},
			(error) => alert(error.error)
		);
	}

	download(file: IFile) {
		this.committeeService.getDocument(file.url).subscribe((data) => console.log(data));
	}

}
