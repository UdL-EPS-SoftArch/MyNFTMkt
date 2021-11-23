import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
              private location: Location,
              private bidService: BidService,
             ) {
  }

  ngOnInit(): void {
    this.bid = new Bid();
  }
  onSubmit(): void {
    this.bidService.create(this.bid).subscribe(
      (newBid: Bid) => {
        this.router.navigate(['']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
