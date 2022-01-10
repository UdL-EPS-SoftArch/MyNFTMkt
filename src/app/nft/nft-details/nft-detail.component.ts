import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NftService } from '../nft.service';
import { UserService} from '../../user/user.service';
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
  private success = new Subject<string>();
  successMessage = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private nftService: NftService,
              private userService: UserService,
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
    if (!this.user.favoriteNFTs.some(e => e.id === this.nft.id)) {
        this.user.favoriteNFTs.push(this.nft);
        console.log('NFT added to favorites');
        this.status = true;
        this.user.updateRelation('favoriteNFTs', this.user.favoriteNFTs);
        console.log(this.user.favoriteNFTs);
    }
    else{
        const index = this.user.favoriteNFTs.findIndex(e => e.id === this.nft.id);
        if (this.user.favoriteNFTs.length === 1) {
            this.user.favoriteNFTs.pop();
        }
        console.log('NFT removed from favorites');
        this.user.favoriteNFTs = this.user.favoriteNFTs.slice(index, 1);
        // this.user.updateRelation('favoriteNFTs', this.user.favoriteNFTs);
        this.status = false;
        console.log(this.user.favoriteNFTs);
    }
  }
  open(content): void {
    this.modalService.open(content);
  }
}
