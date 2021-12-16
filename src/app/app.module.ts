import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserDeleteComponent} from './user/user-delete/user-delete.component';
import {UserSearchComponent} from './user/user-search/user-search.component';
import {UserWalletComponent} from './user/user-wallet/user-wallet.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {LoginBasicModule} from './login-basic/login-basic.module';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {AuthInterceptor} from './login-basic/auth-interceptor';
import {HttpErrorInterceptor} from './error-handler/http-error-interceptor';
import {ExternalConfigurationService} from './external-configuration-service';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {LoggedInGuard} from './login-basic/loggedin.guard';
import {UserService} from './user/user.service';
import {BidListComponent} from './bid/bid-list/bid-list.component';
import {BidService} from './bid/bid.service';
import {BidMakeComponent} from './bid/bid-make/bid-make.component';
import {HighestBidOfferService} from './highestBidOffer/highestBidOffer.service';
import {HighestBidOfferAddComponent} from './highestBidOffer/highestBidOffer-add/highestBidOffer-add.component';
import { HighestBidOfferListComponent } from './highestBidOffer/highestBidOffer-list/highestBidOffer-list.component';
import {OfferService} from './offer/offer.service';
import {OfferListComponent} from './offer/offer-list/offer-list.component';
import {HighestBidOfferDetailComponent} from './highestBidOffer/highestBidOffer-detail/highestBidOffer-list.component';
import {SaleComponent} from './sale/sale.component';
import {SaleDeleteComponent} from './sale/sale-delete/sale-delete.component';
import {DecliningListComponent} from './declining/declining-list/declining-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserDetailComponent,
    UserRegisterComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserSearchComponent,
    BidListComponent,
    BidMakeComponent,
    HighestBidOfferAddComponent,
    HighestBidOfferListComponent,
    HighestBidOfferDetailComponent,
    OfferListComponent,
    UserSearchComponent,
    UserWalletComponent,
    SaleComponent,
    SaleDeleteComponent,
    DecliningListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxHalClientModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
    NgbModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    AuthenticationBasicService, LoggedInGuard, UserService , BidService, HighestBidOfferService, OfferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
