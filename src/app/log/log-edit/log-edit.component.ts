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
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editLogId");
    if (userId) {
      this.editForm.get('id').disable();
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      detail: ['', Validators.required],
      event: ['', Validators.required],
      level: ['', Validators.required],
      environment: ['', Validators.required],
      enabled: ['', Validators.required],
      ip: ['', Validators.required]
    });
    this.apiService.getLogById(+userId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.apiService.updateLog(this.editForm.get('id').value, this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Log updated successfully.');
          this.router.navigate(['list-log']);
        },
        error => {
          alert(error);
        });
  }

}
