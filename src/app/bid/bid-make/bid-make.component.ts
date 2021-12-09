import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { BidService } from '../bid.service';
import { Bid } from '../../login-basic/bid';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-register',
  templateUrl: './bid-make.component.html'
})
export class BidMakeComponent implements OnInit {
  public bid: Bid;
  public idOffer: string;

  constructor(private route: Router,
              private location: Location,
              private bidService: BidService,
             ) {
  }

  ngOnInit(): void {
    this.idOffer = this.route.url.substr(0, this.route.url.lastIndexOf('/bid'));
    this.bid = new Bid();
  }
  onSubmit(): void {
    this.bid.offer = this.idOffer;
    this.bidService.create(this.bid).subscribe(
      (newBid: Bid) => {
        this.route.navigate(['bids']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
