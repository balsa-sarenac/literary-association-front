import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { BookDTO } from 'src/app/DTO/book-dto';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:BookDTO[]=[];

  constructor(private authorService:AuthorService, private authService:AuthService) { 
    this.refreshTable();
  }

  ngOnInit(): void {

    this.refreshTable();
  }

  refreshTable() {
    var logged=this.authService.getLoggedUser();
		this.authorService.getBooks(logged).subscribe((data: BookDTO[]) =>{this.books = data; console.log(this.books)} );
	}

}
