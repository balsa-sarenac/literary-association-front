import { Component, OnInit } from '@angular/core';
import {ChiefEditorService} from '../shared/chief-editor.service';
import {IComplaint} from '../../DTO/icomplaint';
import {ActivatedRoute, Router} from '@angular/router';
import {FormService} from '../../form/shared/form.service';

@Component({
  selector: 'app-complaint-investigation',
  templateUrl: './complaint-investigation.component.html',
  styleUrls: ['./complaint-investigation.component.css']
})
export class ComplaintInvestigationComponent implements OnInit {
  complaint: IComplaint;
  processInstanceId: string;
  dataReady: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private chiefEditorService: ChiefEditorService,
              private formService: FormService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getComplaint(params.get('id'));
    });
  }

  private getComplaint(id: string) {
    this.chiefEditorService.getComplaint(id).subscribe(
      data => this.complaint = data,
      error => alert(error.error.message)
    )
    this.formService.getProcessInstanceId(id, 'plagiarism-complaint-id').subscribe(
      data => {
        this.processInstanceId = String(data.processId);
        this.dataReady = true;
      },
      error => alert(error.error.message)
    )
  }
}
