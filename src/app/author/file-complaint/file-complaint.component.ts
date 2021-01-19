import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../shared/author.service';

@Component({
  selector: 'app-file-complaint',
  templateUrl: './file-complaint.component.html',
  styleUrls: ['./file-complaint.component.css']
})
export class FileComplaintComponent implements OnInit {
  processInstanceId:string="";
  show=false;
  public choice:string;

  constructor(private authorService:AuthorService) { }

  ngOnInit(): void {
    this.authorService.startPlagiarismProcess().subscribe((res:any)=>{
      this.processInstanceId=res.processId;
      this.show =true;

    })
  }

}
