import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  choice: string = '';
  show: boolean = true;

   formFieldsDto = null;
   formFields = [];

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onReader(){
    this.choice = "reader";
    this.show = false;
  }

  onAuthor(){
    this.choice="author";
    this.show = false;
    this.authService.getAuthorRegistrationForm().subscribe(res=>{
      console.log(res);
      this.formFieldsDto = res;
      this.formFields = res.formFieldList;

      console.log(this.formFields);
    })
  }

  onSubmit(){
    console.log('form submitted: ' );
  }
}
