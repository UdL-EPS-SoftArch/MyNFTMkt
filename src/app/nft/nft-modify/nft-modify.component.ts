
import { Component, OnInit } from '@angular/core';
import {NFT} from '../../login-basic/nft';
import {NftService} from '../nft.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location } from '@angular/common';

@Component({
  selector: 'app-nft-delete',
  templateUrl: './nft-modify.component.html',
})
export class NftModifyComponent implements OnInit {
  public nft: NFT;
  public idNFT: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private nftService: NftService,
              private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.nftService.get(id).subscribe(
      nft => this.nft = nft);
  }

  onSubmit(): void{
    this.nftService.update(this.nft).subscribe(
      (newNFT: NFT) => {
        this.router.navigate(['nFTs']);
    });
  }
  onCancel(): void {
    this.location.back();
  }

}




