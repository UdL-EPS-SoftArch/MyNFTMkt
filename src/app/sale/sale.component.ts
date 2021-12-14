import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Sale} from './sale';
import {SaleService} from './sale.service';
import {Sort} from '@lagoshny/ngx-hal-client';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})

export class SaleComponent implements OnInit {
  public sales: Sale[] = [];
  private sorting: Sort[] = [{path: 'date', order: 'DESC'}];
  public pageSize = 5;
  public page = 1;
  public totalSales = 0;

  constructor(public router: Router,
              private saleService: SaleService) { }

  ngOnInit(): void {
    this.saleService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (sales: Sale[]) => {
        this.sales = sales;
        this.totalSales = this.saleService.totalElement();
      });
  }
}
