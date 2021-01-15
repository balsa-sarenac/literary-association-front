import { Component, OnInit } from '@angular/core';
import {IPublishingRequest} from '../shared/ipublishing-request';
import {ReaderService} from '../shared/reader.service';

@Component({
  selector: 'app-beta-reader-books',
  templateUrl: './beta-reader-books.component.html',
  styleUrls: ['./beta-reader-books.component.css']
})
export class BetaReaderBooksComponent implements OnInit {
  requests: IPublishingRequest[] = [];

  constructor(private readerService: ReaderService) { }

  ngOnInit(): void {
    this.readerService.getPublishingRequests().subscribe( (data: IPublishingRequest[]) => this.requests = data);
  }

}
