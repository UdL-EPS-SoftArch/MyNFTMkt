import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {decliningPriceOffer} from "./decliningPriceOffer";
import {decliningPriceOfferService} from "./decliningPriceOffer.service";

@Component({
  selector: 'app-decliningPriceOffer-list',
  templateUrl: './decliningPriceOffer.component.html',
  styleUrls: ['./decliningPriceOffer.component.css']
})

export class DecliningPriceOfferComponent implements OnInit {
  public declines: decliningPriceOffer[] = [];
  private sorting: Sort[] = [{path: 'date', order: 'DESC'}];
  public pageSize = 5;
  public page = 1;
  public totalDeclines = 0;

  constructor(public router: Router,
              private declineService: decliningPriceOfferService) { }

  ngOnInit(): void {
    this.declineService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (declines: decliningPriceOffer[]) => {
        this.declines = declines;
        this.totalDeclines = this.declineService.totalElement();
      });
  }
}
