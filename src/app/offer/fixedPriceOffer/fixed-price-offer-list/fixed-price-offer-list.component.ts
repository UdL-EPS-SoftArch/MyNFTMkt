import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@lagoshny/ngx-hal-client';
import { FixedPriceOfferService } from '../fixed-price-offer.service';
import { FixedPriceOffer } from '../fixedpriceoffer';

@Component({
  selector: 'app-fixed-price-offer-list',
  templateUrl: './fixed-price-offer-list.component.html',
  styleUrls: ['./fixed-price-offer-list.component.css']
})
export class FixedPriceOfferListComponent implements OnInit {

  public fixedPriceOffers: FixedPriceOffer[] = [];
  public pageSize = 5;
  public page = 1;
  public sizeFixedPriceOffers = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];

  constructor(
    public router: Router,
    private fixedPriceOfferService: FixedPriceOfferService) {
  }

  ngOnInit(): void {
    this.fixedPriceOfferService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (fixedPriceOffers: FixedPriceOffer[]) => {
        this.fixedPriceOffers = fixedPriceOffers;
        this.sizeFixedPriceOffers = this.fixedPriceOfferService.totalElement();
      });
  }

  changePage(): void {
    this.fixedPriceOfferService.page(this.page - 1).subscribe(
      (fixedPriceOffer: FixedPriceOffer[]) => this.fixedPriceOffers = fixedPriceOffer);
  }

  detail(fixedPriceOffer: FixedPriceOffer): void {
    this.router.navigate(['FixedPriceOffer', fixedPriceOffer.id]);
  }

}
