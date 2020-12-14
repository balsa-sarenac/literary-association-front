import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-author-homepage',
  templateUrl: './author-homepage.component.html',
  styleUrls: ['./author-homepage.component.css']
})
export class AuthorHomepageComponent implements OnInit {

  constructor(private authorService:AuthorService) { 
    this.authorService.loadForm().subscribe(res=>{
      console.log(res);
    })
  }

  ngOnInit(): void {
  }

}
