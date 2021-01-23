import { Component, OnInit } from '@angular/core';
import {ChiefEditorService} from '../shared/chief-editor.service';

@Component({
  selector: 'app-complaint-investigation',
  templateUrl: './complaint-investigation.component.html',
  styleUrls: ['./complaint-investigation.component.css']
})
export class ComplaintInvestigationComponent implements OnInit {

  constructor(private chiefEditorService: ChiefEditorService) { }

  ngOnInit(): void {
  }

}
