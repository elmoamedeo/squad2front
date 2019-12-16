import { Component, OnInit } from '@angular/core';
import { ILog } from 'src/model/log.model';
import { LogService } from 'src/service/log.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss']
})
export class LogDetailComponent implements OnInit {

  log: ILog;

  constructor(
    private logService: LogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getLog(this.route.snapshot.params['id']);
  }

  private getLog(id: string) {
    this.logService.getLogById(id)
      .subscribe(data => {
        this.log = data;
    });
  }

}
