import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'app-home-editor',
  templateUrl: './home-editor.component.html',
  styleUrls: ['./home-editor.component.css']
})
export class HomeEditorComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
  }

}
