import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FixedPriceOfferService } from '../fixed-price-offer.service';
import { FixedPriceOffer } from '../fixedpriceoffer';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fixed-price-offer-add',
  templateUrl: './fixed-price-offer-add.component.html',
  styleUrls: ['./fixed-price-offer-add.component.css']
})
export class FixedPriceOfferAddComponent implements OnInit {

  public fixedPriceOffer: FixedPriceOffer;
  public idNft: string;
  public routerUrl: string;

  constructor(private router: Router,
              private location: Location,
              private fixedPriceOfferService: FixedPriceOfferService) {
  }

    ngOnInit(): void {
      this.idNft = '/nft/' + this.router.url.split('/')[3];
      this.fixedPriceOffer = new FixedPriceOffer();
      this.routerUrl = this.router.url;
    }

    onSubmit(): void {
      this.fixedPriceOffer.nft = this.idNft;
      this.fixedPriceOffer.dateTime = new Date(this.fixedPriceOffer.dateTime);
      this.fixedPriceOfferService.create(this.fixedPriceOffer).subscribe(
        (newFixedPriceOffer: FixedPriceOffer) => {
          this.router.navigate([newFixedPriceOffer.uri]);
        }
      );
    }

    onCancel(): void {
      this.location.back();
    }

}
