import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { BidListComponent } from './bid/bid-list/bid-list.component';
import { BidMakeComponent } from './bid/bid-make/bid-make.component';
import { HighestBidOfferAddComponent } from './highestBidOffer/highestBidOffer-add/highestBidOffer-add.component';
import { HighestBidOfferListComponent } from './highestBidOffer/highestBidOffer-list/highestBidOffer-list.component';
import {OfferListComponent} from './offer/offer-list/offer-list.component';
import {HighestBidOfferDetailComponent} from './highestBidOffer/highestBidOffer-detail/highestBidOffer-list.component';
import {UserWalletComponent} from './user/user-wallet/user-wallet.component';
import {SaleComponent} from './sale/sale.component';
import {NftAddComponent} from './nft/nft-add/ntf-add.component';
import {NftDeleteComponent} from './nft/nft-delete/nft-delete.component';
import {NftListComponent} from './nft/nft-list/nft-list.component';
import {NftDetailComponent} from './nft/nft-details/nft-detail.component';
import {SearchByPriceComponent} from './search-by-price/search-by-price.component';
import {DecliningListComponent} from './declining/declining-list/declining-list.component';
import {DecliningDetailComponent} from './declining/declining-detail/declining-detail.component';
import {DecliningAddComponent} from './declining/declining-add/declining-add.component';
import {SaleDeleteComponent} from './sale/sale-delete/sale-delete.component';
import {NftCreateComponent} from './nft/nft-create/nft-create.component';
import { FixedPriceOfferAddComponent } from './offer/fixedPriceOffer/fixed-price-offer-add/fixed-price-offer-add.component';
import { FixedPriceOfferDetailComponent } from './offer/fixedPriceOffer/fixed-price-offer-detail/fixed-price-offer-detail.component';
import { FixedPriceOfferListComponent } from './offer/fixedPriceOffer/fixed-price-offer-list/fixed-price-offer-list.component';
import { NftModifyComponent } from './nft/nft-modify/nft-modify.component';

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/wallet', component: UserWalletComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'bids', component: BidListComponent, canActivate: [LoggedInGuard]},
  { path: 'bids/make/:id', component: BidMakeComponent, canActivate: [LoggedInGuard]},
  { path: 'highestBidOffers/add/:id', component: HighestBidOfferAddComponent, canActivate: [LoggedInGuard]},
  { path: 'highestBidOffers/add', component: HighestBidOfferAddComponent, canActivate: [LoggedInGuard]},
  { path: 'highestBidOffers', component: HighestBidOfferListComponent, canActivate: [LoggedInGuard]},
  { path: 'highestBidOffers/:id', component: HighestBidOfferDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'highestBidOffers/:id/bid', component: BidMakeComponent , canActivate: [LoggedInGuard]},

  { path: 'fixedPriceOffers/add/:id', component: FixedPriceOfferAddComponent, canActivate: [LoggedInGuard]},
  { path: 'fixedPriceOffers', component: FixedPriceOfferListComponent, canActivate: [LoggedInGuard]},
  { path: 'fixedPriceOffers/:id', component: FixedPriceOfferDetailComponent, canActivate: [LoggedInGuard]},

  { path: 'nFTs/create', component: NftCreateComponent, canActivate: [LoggedInGuard]},


  { path: 'nFTs/add', component: NftAddComponent, canActivate: [LoggedInGuard]},
  { path: 'nFTs', component: NftListComponent },
  { path: 'nFTs/:id', component: NftDetailComponent },
  { path: 'nFTs/delete/:id', component: NftDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'nFTs/modify/:id', component: NftModifyComponent, canActivate: [LoggedInGuard]},

  { path: 'offers', component: OfferListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'nFTs', pathMatch: 'full'},
  { path: 'sales', component: SaleComponent},
  { path: 'search-by-price', component: SearchByPriceComponent},

  { path: 'decliningPriceOffers/add/:id', component: DecliningAddComponent},
  { path: 'decliningPriceOffers', component: DecliningListComponent},
  { path: 'decliningPriceOffers/add', component: DecliningAddComponent},
  { path: 'decliningPriceOffers/:id', component: DecliningDetailComponent},
  { path: 'decliningPriceOffers/:id/bid', component: BidMakeComponent},

  { path: 'sales/:id/delete', component: SaleDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
