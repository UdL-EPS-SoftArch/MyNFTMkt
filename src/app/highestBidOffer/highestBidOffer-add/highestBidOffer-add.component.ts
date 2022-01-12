import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighestBidOfferService } from '../highestBidOffer.service';
import { HighestBidOffer } from '../../login-basic/highestBidOffer';
import { Location } from '@angular/common';
import {NFT} from '../../login-basic/nft';
import {NftService} from '../../nft/nft.service';
import {User} from '../../login-basic/user';


@Component({
  selector: 'app-user-register',
  templateUrl: './highestBidOffer-add.component.html'
})
export class HighestBidOfferAddComponent implements OnInit {
  public highestBidOffer: HighestBidOffer;
  public nft: NFT;
  constructor(private router: Router,
              private location: Location,
              private highestBidOfferService: HighestBidOfferService,
              private nftService: NftService
  ) {
  }

  ngOnInit(): void {
    this.nftService.get('/nft/' + this.router.url.split('/')[3]).subscribe(
      nft => {
        this.nft = nft;
        nft.getRelation(User, 'owner').subscribe((owner: User) => {this.nft.owner = owner; });
        console.log(this.nft);
      });
    this.highestBidOffer = new HighestBidOffer();
  }
  onSubmit(): void {
    this.highestBidOffer.nft = this.nft;
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
