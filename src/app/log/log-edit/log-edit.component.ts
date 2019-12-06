import { Component, OnInit } from '@angular/core';
import { Log } from 'src/model/log.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {

  log: Log;
  editLogForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let logId = window.localStorage.getItem("editLogId");
    if (logId) {
      this.apiService.getLogById(+logId)
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

  onSubmit() {
    if (this.editLogForm.get('id').value != null) {
      this.apiService.updateLog(this.editLogForm.get('id').value, this.editLogForm.value)
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
      this.apiService.createLog(this.editLogForm.value)
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
