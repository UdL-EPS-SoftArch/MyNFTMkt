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
    this.highestBidOffer = new HighestBidOffer();
    console.log(this.router.url.split('/')[3]);
    this.nftService.get(this.router.url.split('/')[3]).subscribe(
      nft => {
        this.nft = nft;
        nft.getRelation(User, 'owner').subscribe((owner: User) => {this.nft.owner = owner; });
        console.log(this.nft);
      });

  }
  onSubmit(): void {
    this.highestBidOffer.nft = this.nft;
    console.log(this.highestBidOffer.nft);
    this.highestBidOfferService.create(this.highestBidOffer).subscribe(
      (newHighestBidOffer: HighestBidOffer) => {
        this.highestBidOffer.updateRelation('nft', this.nft).subscribe(() => {
          this.router.navigate(['']);
        });
      }
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
