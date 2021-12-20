import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighestBidOfferService } from '../highestBidOffer.service';
import { HighestBidOffer } from '../../login-basic/highestBidOffer';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-register',
  templateUrl: './highestBidOffer-add.component.html'
})
export class HighestBidOfferAddComponent implements OnInit {
  public highestBidOffer: HighestBidOffer;
  public idNft: string;

  constructor(private router: Router,
              private location: Location,
              private highestBidOfferService: HighestBidOfferService,
  ) {
  }

  ngOnInit(): void {
    this.idNft = '/nft/' + this.router.url.split('/')[3];
    this.highestBidOffer = new HighestBidOffer();
  }
  onSubmit(): void {
    this.highestBidOffer.nft = this.idNft;
    this.highestBidOfferService.create(this.highestBidOffer).subscribe(
      (newHighestBidOffer: HighestBidOffer) => {
        this.router.navigate(['']);
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
