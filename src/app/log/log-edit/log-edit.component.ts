import { Component, OnInit } from '@angular/core';
import { Log } from 'src/model/log.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {

  log: Log;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

}
