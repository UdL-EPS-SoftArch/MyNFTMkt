import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';
import {User} from '../../login-basic/user';
import {switchMap} from 'rxjs/operators';
import {OfferService} from '../../offer/offer.service';
import {HighestBidOffer} from '../../login-basic/highestBidOffer';
import {FixedPriceOffer} from '../../offer/fixedPriceOffer/fixedpriceoffer';
import {HighestBidOfferService} from '../../highestBidOffer/highestBidOffer.service';
import {FixedPriceOfferService} from '../../offer/fixedPriceOffer/fixed-price-offer.service';
import {DecliningService} from '../../declining/declining.service';
import {Offer} from '../../login-basic/offer';
import {Observable} from 'rxjs/internal/Observable';
import {Declining} from '../../declining/declining';
import { of } from 'rxjs';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['nft-list.component.css'],

})
export class NftListComponent implements OnInit {
  public NFTs: NFT[] = [];
  public pageSize = 5;
  public page = 1;
  public totalNFTs = 0;
  public highestBidOffer: HighestBidOffer = new HighestBidOffer();
  public fixedPriceOffer: FixedPriceOffer = new FixedPriceOffer();
  public decline: Declining = new Declining();
  constructor(
    public router: Router,
    private nftService: NftService,
    private offerService: OfferService,
    private highestBidOfferService: HighestBidOfferService,
    private fixedPriceOfferService: FixedPriceOfferService,
    private decliningService: DecliningService) {
  }
  deriveOffer(offers: Offer[]): Observable<any> {
    if (offers.length > 0) {
      if (offers[0].uri.split('/')[1] === 'highestBidOffers') {
        return this.highestBidOfferService.get(offers[0].uri.split('/')[2]);
      } else if (offers[0].uri.split('/')[1] === 'fixedPriceOffers') {
        return this.fixedPriceOfferService.get(offers[0].uri.split('/')[2]);
      } else {
        return this.decliningService.get(offers[0].uri.split('/')[2]);
      }
    }
    return of(undefined);
  }
  checkNftAvailability(nft: NFT): string {
    if (nft.offer instanceof  HighestBidOffer) {
      return 'Open for bids starting at €' + nft.offer.minimumBid;
    } else if (nft.offer instanceof  FixedPriceOffer) {
      return 'Purchase for €' + nft.offer.price;
    } else if (nft.offer instanceof  Declining) {
      return 'Declining auction starting at €' + nft.offer.startingPrice;
    } else {
      return 'Not available for purchase';
    }
  }
  getNftOffers(NFTs: NFT[]): void {
    for (const nft of this.NFTs) {
      this.offerService.findByNftOrderByDateTime(nft).pipe(
        switchMap( offers => this.deriveOffer(offers)),
      ).subscribe((offer: any) => {
        nft.offer = offer;
      });
    }
  }
  ngOnInit(): void {
    this.nftService.getAll().subscribe(
      (NFTs: NFT[]) => {
        this.NFTs = NFTs;
        this.totalNFTs = this.nftService.totalElement();
        this.getNftOffers(this.NFTs);
        for (const nft of this.NFTs) {
          nft.getRelation(User, 'owner').subscribe((owner: User) => {
            nft.owner = owner;
          });
        }
      });
  }

  changePage(): void {
    this.nftService.page(this.page - 1).subscribe(
      (NFTs: NFT[]) => this.NFTs = NFTs);
  }

  detail(nft: NFT): void {
    this.router.navigate(['nFTs', nft.id]);
  }
}
