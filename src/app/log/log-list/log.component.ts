import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from "../../../model/log.model";
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  logs: Log[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getLogs()
      .subscribe(data => {
        this.logs = data.result;
      });
  }

  deleteLog(log: Log): void {
    this.apiService.deleteLog(log.id)
      .subscribe( data => {
        this.logs = this.logs.filter(u => u !== log);
      })
  };

  editLog(log: Log): void {
    window.localStorage.removeItem("editLogId");
    window.localStorage.setItem("editLogId", log.id.toString());
    this.router.navigate(['edit-log']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
