import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from "../../../model/log.model";
import { ApiService } from '../../../service/api.service';
import { LogService } from 'src/service/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  logs: Log[];

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs()
      .subscribe(res => {
        this.logs = res;
      });
  }

  deleteLog(log: Log): void {
    this.logService.deleteLog(log._id)
      .subscribe( data => {
        this.logs = this.logs.filter(u => u !== log);
      })
  };

  editLog(log: Log): void {
    if(log != undefined) {
      window.localStorage.removeItem("editLogId");
      window.localStorage.setItem("editLogId", log._id);
      this.router.navigate(['edit-log']);
    } else {
      this.router.navigate(['edit-log']);
    }
  };
}
