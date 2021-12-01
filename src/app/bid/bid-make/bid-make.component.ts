import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
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
    this.idOffer = this.route.url.split('/')[3];
    this.bid = new Bid();
  }
  onSubmit(): void {
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
