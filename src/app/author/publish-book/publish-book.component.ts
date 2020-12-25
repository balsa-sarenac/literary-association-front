import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-publish-book',
  templateUrl: './publish-book.component.html',
  styleUrls: ['./publish-book.component.css']
})
export class PublishBookComponent implements OnInit {
 
  constructor(private authorService:AuthorService) { 

  }

  ngOnInit(): void {

  }


}
