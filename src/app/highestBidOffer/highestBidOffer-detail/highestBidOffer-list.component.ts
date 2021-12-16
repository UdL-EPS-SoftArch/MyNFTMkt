import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighestBidOfferService } from '../highestBidOffer.service';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {HighestBidOffer} from '../../login-basic/highestBidOffer';

@Component({
  selector: 'app-user-detail',
  templateUrl: './highestBidOffer-detail.component.html'
})
export class HighestBidOfferDetailComponent implements OnInit {
  public highestBidOffer: HighestBidOffer = new HighestBidOffer();

  constructor(private route: ActivatedRoute,
              private highestBidOfferService: HighestBidOfferService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.highestBidOfferService.get(id).subscribe(
      highestBidOffer => {
        this.highestBidOffer = highestBidOffer;
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
