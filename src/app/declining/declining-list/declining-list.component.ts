import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Declining} from '../declining';
import {DecliningService} from '../declining.service';

@Component({
  selector: 'app-declining-list',
  templateUrl: './declining-list.component.html',
  styleUrls: ['./declining-list.component.css']
})

export class DecliningListComponent implements OnInit {
  public declines: Declining[] = [];
  private sorting: Sort[] = [{path: 'date', order: 'DESC'}];
  public pageSize = 5;
  public page = 1;
  public totalDeclines = 0;

  constructor(public router: Router,
              private declineService: DecliningService) { }

  ngOnInit(): void {
    this.declineService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (declines: Declining[]) => {
        this.declines = declines;
        this.totalDeclines = this.declineService.totalElement();
      });
  }
}
