import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {

  publishingRequestId:number;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
			this.publishingRequestId=+params.get('id');
    });
    console.log(this.publishingRequestId);
  }

}
