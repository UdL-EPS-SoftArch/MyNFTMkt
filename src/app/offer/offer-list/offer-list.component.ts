import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@lagoshny/ngx-hal-client';
import {OfferService} from '../offer.service';
import {Offer} from '../../login-basic/offer';

@Component({
  selector: 'app-bid-list',
  templateUrl: './offer-list.component.html'
})
export class OfferListComponent implements OnInit {
  public offers: Offer[] = [];
  public pageSize = 5;
  public page = 1;
  public totalOffers = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];

  constructor(
    public router: Router,
    private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (offers: Offer[]) => {
        this.offers = offers;
        this.totalOffers = this.offerService.totalElement();
      });
  }

  changePage(): void {
    this.offerService.page(this.page - 1).subscribe(
      (offers: Offer[]) => this.offers = offers);
  }

  detail(offer: Offer): void {
    this.router.navigate(['Offer', offer.id]);
  }
  deleteRow(offer): void{
    this.offerService.delete(offer).subscribe(() => {
      console.log('Offer removed');
      window.location.reload();
    });
  }
}
