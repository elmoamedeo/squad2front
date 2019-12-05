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
    if (!window.localStorage.getItem('accessToken')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getLogs()
      .subscribe(res => {
        this.logs = res;
      });
  }

  deleteLog(log: Log): void {
    this.apiService.deleteLog(log._id)
      .subscribe( data => {
        this.logs = this.logs.filter(u => u !== log);
      })
  };

  editLog(log: Log): void {
    window.localStorage.removeItem("editLogId");
    window.localStorage.setItem("editLogId", log._id.toString());
    this.router.navigate(['edit-log']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
