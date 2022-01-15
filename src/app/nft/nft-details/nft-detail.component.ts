import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../nft.service';
import { NFT } from '../../login-basic/nft';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html'
})
export class NftDetailComponent implements OnInit {
  public nft: NFT = new NFT();

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
        console.log(this.nft);
      });
  }

  open(content): void {
    this.modalService.open(content);
  }
}
