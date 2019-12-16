import { Component, OnInit } from '@angular/core';
import { ILog, Log } from 'src/model/log.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService } from 'src/service/log.service';
import { AuthenticationService } from 'src/service/authentication.service';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {

  log: ILog;
  currentUserId = localStorage.getItem('currentUserId').slice(1, -1);
  user;
  edit;
  editLogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private logService: LogService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.edit = false;

    this.getLog(this.route.snapshot.params['id']);

    this.editLogForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      detail: ['', Validators.required],
      event: ['', Validators.required],
      level: [null, Validators.required],
      environment: [null, Validators.required],
      enabled: [false, Validators.required],
      ip: ['', Validators.required]
    });

    this.editLogForm.get('id').disable();
    this.user = this.authenticationService.currentUserValue
  }

  private updateForm(log: ILog) {
    this.editLogForm.patchValue({
      id: log.id,
      title: log.title,
      detail: log.detail,
      event: log.event,
      level: log.level,
      environment: log.environment,
      enabled: log.enabled,
      ip: log.ip
    })
  }

  private createFromForm(): ILog {
    if(this.edit == true){
      return {
        ...new Log(),
        id: this.editLogForm.get('id').value,
        title: this.editLogForm.get('title').value,
        detail: this.editLogForm.get('detail').value,
        event: this.editLogForm.get('event').value,
        level: this.editLogForm.get('level').value,
        environment: this.editLogForm.get('environment').value,
        enabled: this.editLogForm.get('enabled').value,
        ip: this.editLogForm.get('ip').value,
        token: this.currentUserId
      };
    } else {
      return {
        ...new Log(),
        title: this.editLogForm.get('title').value,
        detail: this.editLogForm.get('detail').value,
        event: this.editLogForm.get('event').value,
        level: this.editLogForm.get('level').value,
        environment: this.editLogForm.get('environment').value,
        enabled: this.editLogForm.get('enabled').value,
        ip: this.editLogForm.get('ip').value,
        token: this.currentUserId
      }
    }
  }

  private getLog(id: string) {
    if(id != 'new') {
      this.logService.getLogById(id)
        .subscribe(data => {
          this.updateForm(data);
      });
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  private onSubmit() {
    if (this.editLogForm.get('id').value != null) {
      this.logService.updateLog(this.editLogForm.get('id').value, this.createFromForm())
        .subscribe(
          res => {
            this.router.navigate(['logs']);
        });
    } else {
      this.logService.createLog(this.createFromForm())
        .subscribe(
          res => {
            this.router.navigate(['logs']);
        });
    }
  }

  private checkActiveLogValue(event){
    event.checked ? this.editLogForm.get('enabled').setValue(true) : this.editLogForm.get('enabled').setValue(false);
  }

}
