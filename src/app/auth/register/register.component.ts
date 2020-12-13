import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
   taskId='';

  constructor(private authService:AuthService, private router:Router) { }

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
      this.taskId = res.taskId;
      console.log(this.formFields);
    })
  }

  onSubmit(value:any , form:any){
    let formFields = new Array();
    for (var property in value) {
      console.log(property);
      console.log(value[property]);
      formFields.push({id : property, value : value[property]});
    }

    console.log(formFields);
    var author = {
      formFields:formFields
    };

    if(this.formFieldsDto !== null){
      let x = this.authService.registerAuthor(author, this.taskId);

      x.subscribe(
        res => {
          console.log(res);
          
          alert("You registered successfully!")

          this.router.navigate(['welcome'])

        },
        err => {
          console.log(err);
        }
      );
    }

    
  }
}
