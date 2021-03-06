import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  
  
  constructor(private http:HttpClient) { }

  getBooks(authorId: string) {
    return this.http.get<any>(environment.api + '/book/get/'+authorId);
  }

  getAllBooks() {
    return this.http.get<any>(environment.api + '/book/get');
  }
  
  getBooksFromOtherAuthors(authorId: string) {
	  return this.http.get<any>(environment.api + '/book/get-others/'+authorId);
  }

  getBook(bookId: number) {
    return this.http.get<any>(environment.api + '/book/get-book/'+bookId);
  }

}
