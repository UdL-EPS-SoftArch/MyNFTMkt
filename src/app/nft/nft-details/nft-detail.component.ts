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
import {Subject} from 'rxjs';
@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['nft-detail.component.css'],
})
export class NftDetailComponent implements OnInit {
  public nft: NFT = new NFT();
  public status = false;
  public user: User = new User();
  public offers: Offer[] = [];
  public pageSize = 5;
  public page = 1;
  public totalOffers = 0;
  private success = new Subject<string>();
  successMessage = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private nftService: NftService,
              private userService: UserService,
              private offerService: OfferService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.getCurrentUser().id).subscribe(
      user => {
        this.user = user;
        user.getRelationArray(NFT, 'favoriteNFTs').subscribe( (favorites: any) => {
          this.user.favoriteNFTs = favorites;
          this.status = this.user.favoriteNFTs.some(e => e.uri === '/nFTs/' + id);
        });
      });
    let offersAll;
    this.offerService.getAll({size: this.pageSize}).subscribe(
      (offers: Offer[]) => {
        offersAll = offers;
        this.totalOffers = this.offerService.totalElement();
      });
    console.log(this.totalOffers);
    for (let i = 0; i < this.totalOffers; i++) {
        if (offersAll[i].nft === this.nft){
          this.offers.push(offersAll[i]);
        }
    }
    this.totalOffers = this.offers.length;
    console.log(this.totalOffers);
    this.nftService.get(id).subscribe(
      nft => {
        this.nft = nft;
        nft.getRelation(User, 'owner').subscribe((owner: User) => {this.nft.owner = owner; });
        console.log(this.nft);
      });
  }
  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
  onSubmit(): void {
    if (!this.user.favoriteNFTs.some(e => e.uri === this.nft.uri)) {
        this.user.favoriteNFTs.push(this.nft);
        this.user.updateRelation('favoriteNFTs', this.user.favoriteNFTs).subscribe(() => {
          console.log('NFT added to favorites');
          this.status = true;
        });
        console.log(this.user.favoriteNFTs);
    }
    else{
        const index = this.user.favoriteNFTs.findIndex(e => e.uri === this.nft.uri);
        if (this.user.favoriteNFTs.length === 1) {
            this.user.favoriteNFTs.pop();
        }
        console.log('NFT removed from favorites');
        this.user.favoriteNFTs = this.user.favoriteNFTs.slice(index, 1);
        this.user.deleteRelation('favoriteNFTs', this.nft).subscribe(() =>
          this.status = false
        );
        console.log(this.user.favoriteNFTs);
    }
  }
  open(content): void {
    this.modalService.open(content);
  }
}
