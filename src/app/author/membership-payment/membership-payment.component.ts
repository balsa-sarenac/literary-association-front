import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IMembershipRequest } from 'src/app/DTO/imembership-request';
import { FormService } from 'src/app/form/shared/form.service';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-membership-payment',
  templateUrl: './membership-payment.component.html',
  styleUrls: ['./membership-payment.component.css']
})
export class MembershipPaymentComponent implements OnInit {
  processInstanceId: string;
  membershipRequestId: number;
  membershipRequest: IMembershipRequest;
  dataLoaded:boolean = false;

  constructor(private authService:AuthService, private authorService:AuthorService, private formService:FormService) { }

  ngOnInit(): void {
    this.getRequest();

  }

  getRequest() {
    this.authorService.getMembershipRequest(this.authService.getLoggedUser()).subscribe(
        (data: IMembershipRequest) => {
            this.membershipRequest = data;
            this.membershipRequestId = data.id;
            console.log(this.membershipRequestId);
            if(this.membershipRequest.active)
              this.getProcessInstanceId();
        },
        (error) => alert(error.error)
    );
}

  getProcessInstanceId(){
    this.formService.getProcessInstanceId(this.membershipRequestId.toString(), 'membershipRequestId').subscribe(
      (data) => {
          this.processInstanceId = String(data.processId);
          console.log(this.processInstanceId);
          this.dataLoaded = true;
      },
      (error) => alert(error.error)
  );
  }

  logOut() {
		this.authService.logOut();
	}
}
