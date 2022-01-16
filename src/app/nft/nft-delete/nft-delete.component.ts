
import { Component, OnInit } from '@angular/core';
import {NFT} from '../../login-basic/nft';
import {User} from '../../login-basic/user';
import {NftService} from '../nft.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location } from '@angular/common';

@Component({
  selector: 'app-nft-delete',
  templateUrl: './nft-delete.component.html',
})
export class NftDeleteComponent implements OnInit {
  public nft: NFT = new NFT();
  public id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private nftService: NftService,
              private authenticationService: AuthenticationBasicService,
              private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.nftService.get(this.id).subscribe(
      nft => this.nft = nft);
  }
  delete(): void {
    this.nftService.delete(this.nft).subscribe(
      () => {
        this.router.navigate(['/nFTs']);
      });
  }

  onCancel(): void {
    this.location.back();
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

}
