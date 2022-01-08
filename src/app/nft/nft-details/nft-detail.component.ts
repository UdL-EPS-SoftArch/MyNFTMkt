import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../login-basic/user';
@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['nft-detail.component.css'],
})
export class NftDetailComponent implements OnInit {
  public nft: NFT = new NFT();
  public status = false;
  constructor(private route: ActivatedRoute,
              private nftService: NftService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
    const user = this.getCurrentUser();
    user.getRelationArray(NFT, 'favoriteNFTs').subscribe( (favorites: any) => {
      user.favoriteNFTs = favorites;
    });
    if (!user.favoriteNFTs.some(e => e.id === this.nft.id)) {
        user.favoriteNFTs.push(this.nft);
        console.log('NFT added to favorites');
        this.status = true;
    }
    else{
        const index = user.favoriteNFTs.findIndex(e => e.id === this.nft.id);
        if (user.favoriteNFTs.length === 1) {
            user.favoriteNFTs.pop();
        }
        console.log('NFT removed from favorites');
        user.favoriteNFTs = user.favoriteNFTs.slice(index, 1);
        this.status = false;
    }
  }
  open(content): void {
    this.modalService.open(content);
  }
}
