import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FixedPriceOfferService } from '../fixed-price-offer.service';
import { User } from '../../../login-basic/user';
import { AuthenticationBasicService } from '../../../login-basic/authentication-basic.service';
import { FixedPriceOffer } from '../fixedpriceoffer';

@Component({
  selector: 'app-fixed-price-offer-detail',
  templateUrl: './fixed-price-offer-detail.component.html',
  styleUrls: ['./fixed-price-offer-detail.component.css']
})
export class FixedPriceOfferDetailComponent implements OnInit {

  public fixedPriceOffer: FixedPriceOffer = new FixedPriceOffer();

    constructor(private route: ActivatedRoute,
                private fixedPriceOfferService: FixedPriceOfferService,
                private authenticationService: AuthenticationBasicService) {
    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.fixedPriceOfferService.get(id).subscribe(
        fixedPriceOffer => {
          this.fixedPriceOffer = fixedPriceOffer;
        });
    }

    getCurrentUser(): User {
      return this.authenticationService.getCurrentUser();
    }

}
