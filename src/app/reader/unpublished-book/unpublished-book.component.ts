import { Component, OnInit } from '@angular/core';
import {IPublishingRequest} from '../shared/ipublishing-request';
import {ReaderService} from '../shared/reader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-unpublished-book',
  templateUrl: './unpublished-book.component.html',
  styleUrls: ['./unpublished-book.component.css']
})
export class UnpublishedBookComponent implements OnInit {
  request: IPublishingRequest;
  notesForm;
  id: string;

  constructor(private readerService: ReaderService, private router: Router,
              private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.notesForm = this.formBuilder.group({notes: ''})
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getRequest(params.get('id'));
      this.id = params.get('id');
    });
  }

  private getRequest(id: string) {
    this.readerService.getRequest(id).subscribe((data: IPublishingRequest) => this.request = data);
  }

  onSubmit(value) {
    let notes = {
      user: null,
      content: value.notes,
      noteType: 'COMMENT'
    };
    this.readerService.sendNotes(this.id, notes).subscribe(
      (data) => {
        this.router.navigate(['/reader/beta-books']),
          (error) => alert(error.error.data)
    });
  }
}
