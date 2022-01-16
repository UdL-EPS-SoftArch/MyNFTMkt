import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NFT} from '../../login-basic/nft';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService,
              config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get(id).subscribe(
      user => {
        this.user = user;
        user.getRelationArray(NFT, 'favoriteNFTs').subscribe( (favorites: any) => {
          this.user.favoriteNFTs = favorites;
        });
        console.log(this.user);
      });
  }

  open(content): void {
    this.modalService.open(content);
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
