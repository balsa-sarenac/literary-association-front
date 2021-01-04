import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormField } from 'src/app/auth/shared/iformfield.register';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-publish-book',
  templateUrl: './publish-book.component.html',
  styleUrls: ['./publish-book.component.css']
})
export class PublishBookComponent implements OnInit {
  processInstanceId: string = "";
  show = true;
  public choice: string;
 
  constructor(private authorService:AuthorService) { 

  }

  ngOnInit(): void {
    
    this.authorService.startBookPublishingProcess().subscribe((res:any) => {
			console.log(res);
      this.processInstanceId = res.processId;
      this.show = false;
      this.choice = "publish";
		},
		(err)=>{
			console.log(err);
		});
  }
}
