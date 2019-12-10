import { Component, OnInit } from '@angular/core';
import { Log } from 'src/model/log.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';
import { first } from "rxjs/operators";
import { LogService } from 'src/service/log.service';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {

  log: Log;
  editLogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private apiService: ApiService,
    private logService: LogService) { }

  ngOnInit() {
    let logId = window.localStorage.getItem("editLogId");
    if (logId) {
      this.logService.getLogById(+logId)
        .subscribe(data => {
          this.editLogForm.setValue(data);
        });
    }
    this.editLogForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      detail: ['', Validators.required],
      event: ['', Validators.required],
      level: ['', Validators.required],
      environment: ['', Validators.required],
      enabled: ['', Validators.required],
      ip: ['', Validators.required]
    });

    this.editLogForm.get('id').disable();
  }

  createLog(log: Log) {
    return (
      log.title = this.editLogForm.get('title').value,
      log.detail = this.editLogForm.get('detail').value,
      log.event = this.editLogForm.get('event').value,
      log.level = this.editLogForm.get('level').value,
      log.environment = this.editLogForm.get('environment').value,
      log.enabled = this.editLogForm.get('enabled').value,
      log.ip = this.editLogForm.get('ip').value,
      log.createdAt = new Date()
    )
  }

  onSubmit() {
    if (this.editLogForm.get('id').value != null) {
      this.logService.updateLog(this.editLogForm.get('id').value, this.editLogForm.value)
        .pipe(first())
        .subscribe(
          res => {
            alert('Log updated successfully.');
            this.router.navigate(['list-log']);
          },
          error => {
            alert(error);
          });
    } else {
      this.logService.createLog(this.editLogForm.value)
        .pipe()
        .subscribe(
          res => {
            alert('Log created successfully.');
            this.router.navigate(['list-log']);
          },
          error => {
            alert(error);
          }
        )
    }
  }

}
