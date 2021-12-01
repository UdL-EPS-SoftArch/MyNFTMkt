import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@lagoshny/ngx-hal-client';
import { HighestBidOfferService } from '../highestBidOffer.service';
import { HighestBidOffer } from '../../login-basic/highestBidOffer';

@Component({
  selector: 'app-bid-list',
  templateUrl: './highestBidOffer-list.component.html'
})
export class HighestBidOfferListComponent implements OnInit {
  public highestBidOffers: HighestBidOffer[] = [];
  public pageSize = 5;
  public page = 1;
  public totalHighestBidOffer = 0;
   private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];

  constructor(
    public router: Router,
    private highestBidOfferService: HighestBidOfferService) {
  }

  ngOnInit(): void {
    this.highestBidOfferService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (highestBidOffers: HighestBidOffer[]) => {
        this.highestBidOffers = highestBidOffers;
        this.totalHighestBidOffer = this.highestBidOfferService.totalElement();
      });
  }

  changePage(): void {
    this.highestBidOfferService.page(this.page - 1).subscribe(
      (highestBidOffer: HighestBidOffer[]) => this.highestBidOffers = highestBidOffer);
  }

  detail(highestBidOffer: HighestBidOffer): void {
    this.router.navigate(['HighestBidOffer', highestBidOffer.id]);
  }
}
