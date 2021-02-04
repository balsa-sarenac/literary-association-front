import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { BookDTO } from 'src/app/DTO/book-dto';
import { AuthorService } from '../shared/author.service';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:BookDTO[]=[];

  processInstanceId:string="";
  show=false;
  public choice:string;
  bookId:number;
  role:string;

  constructor(private bookService:BookService, private authService:AuthService, private authorService:AuthorService) { 
    this.refreshTable();
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.refreshTable();
  }

  refreshTable() {
    var logged=this.authService.getLoggedUser();
    if(this.role==='ROLE_AUTHOR'){
      this.bookService.getBooks(logged).subscribe((data: BookDTO[]) =>{this.books = data; console.log(this.books)} );
    }
		else if(this.role=='ROLE_BETA_READER'){
      this.bookService.getAllBooks().subscribe((data: BookDTO[]) =>{this.books = data; console.log(this.books)} );
    }
  }
  
  fileComplaint(bookId:number){
    this.authorService.startPlagiarismProcess().subscribe((res:any)=>{
      this.processInstanceId=res.processId;
      this.show =true;
      this.bookId = bookId;
    })
  }

}
