import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NftService } from '../nft.service';
import { UserService} from '../../user/user.service';
import {OfferService} from '../../offer/offer.service';
import {Offer} from '../../login-basic/offer';
import { NFT } from '../../login-basic/nft';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../login-basic/user';
import {HighestBidOfferService} from '../../highestBidOffer/highestBidOffer.service';
import {HighestBidOffer} from '../../login-basic/highestBidOffer';
import {FixedPriceOfferService} from '../../offer/fixedPriceOffer/fixed-price-offer.service';
import {FixedPriceOffer} from '../../offer/fixedPriceOffer/fixedpriceoffer';
import {Declining} from '../../declining/declining';
import {DecliningService} from '../../declining/declining.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['nft-detail.component.css'],
})
export class NftDetailComponent implements OnInit {
  public nft: NFT = new NFT();
  public status = false;
  public user: User = new User();
  public users: User[] = [];
  public highestBidOffer: HighestBidOffer = new HighestBidOffer();
  public fixedPriceOffer: FixedPriceOffer = new FixedPriceOffer();
  public decline: Declining = new Declining();
  public pageSize = 5;
  public page = 1;
  public totalUsers = 0;
  public totalFavorites = 0;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private nftService: NftService,
              private userService: UserService,
              private offerService: OfferService,
              private highestBidOfferService: HighestBidOfferService,
              private fixedPriceOfferService: FixedPriceOfferService,
              private decliningService: DecliningService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
  }
  deriveOffer(offer: Offer): Observable<any> {
    if (offer !== null) {
      if (offer.uri.split('/')[1] === 'highestBidOffers') {
        return this.highestBidOfferService.get(offer.uri.split('/')[2]);
      } else if (offer.uri.split('/')[1] === 'fixedPriceOffers') {
        return this.fixedPriceOfferService.get(offer.uri.split('/')[2]);
      } else {
        return this.decliningService.get(offer.uri.split('/')[2]);
      }
    }
  }
  checkIfEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
  ngOnInit(): void {
    // Find nft
    const id = this.route.snapshot.paramMap.get('id');
    // Get nft, then find all the offers for that nft, display the newest offer
    this.nftService.get(id).pipe(
      switchMap( nft => { this.nft = nft; return this.nft.getRelation(User, 'owner'); }),
      switchMap( owner => { this.nft.owner = owner; return this.offerService.findByNftOrderByDateTime(this.nft); }),
      switchMap( offers => this.deriveOffer(offers[0])),
    ).subscribe((offer: any) => {
      if (offer instanceof HighestBidOffer) {
        this.highestBidOffer = offer;
      }
      else if (offer instanceof FixedPriceOffer) {
        this.fixedPriceOffer = offer;
      }
      else {
        this.decline = offer;
      }
    });
    // Get current user and check if this nft is one of his favorites
    this.userService.get(this.getCurrentUser().id).subscribe(
      user => {
        this.user = user;
        user.getRelationArray(NFT, 'favoriteNFTs').subscribe( (favorites: any) => {
          this.user.favoriteNFTs = favorites;
          this.status = this.user.favoriteNFTs.some(e => e.uri === '/nFTs/' + id);
        });
      });
    // How many favorites does an NFT have
    this.userService.getAll({size: this.pageSize}).subscribe(
      (users: User[]) => {
        this.users = users;
        this.totalUsers = this.userService.totalElement();
        for (const user of this.users){
          user.getRelationArray(NFT, 'favoriteNFTs').subscribe( (favorites: any) => {
            this.totalFavorites += favorites.some(e => e.uri === '/nFTs/' + id) ? 1 : 0;
          });
        }
      });
  }
  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  ownerIsLoggedIn(): boolean {
    return this.getCurrentUser().id === this.nft?.owner?.id;
  }
  onSubmit(): void {
    if (!this.user.favoriteNFTs.some(e => e.uri === this.nft.uri)) {
        this.user.favoriteNFTs.push(this.nft);
        this.user.updateRelation('favoriteNFTs', this.user.favoriteNFTs).subscribe(() => {
          this.status = true;
          this.totalFavorites++;
        });
    }
    else{
        const index = this.user.favoriteNFTs.findIndex(e => e.uri === this.nft.uri);
        if (this.user.favoriteNFTs.length === 1) {
            this.user.favoriteNFTs.pop();
        }
        this.user.favoriteNFTs = this.user.favoriteNFTs.slice(index, 1);
        this.user.deleteRelation('favoriteNFTs', this.nft).subscribe(() => {
          this.status = false;
          this.totalFavorites--;
        });
    }
  }
  open(content): void {
    this.modalService.open(content);
  }
}
