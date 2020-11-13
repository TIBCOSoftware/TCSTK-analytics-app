import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TcLiveappsLibModule} from '@tibco-tcstk/tc-liveapps-lib';
import {TcSpotfireLibModule} from '@tibco-tcstk/tc-spotfire-lib';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {
  LogService,
  OAuthInterceptor,
  ProxyInterceptor,
  SessionRefreshService,
  TcCoreConfig, TcCoreConfigService,
  TcCoreLibModule
} from '@tibco-tcstk/tc-core-lib';
import {TcFormsLibModule} from '@tibco-tcstk/tc-forms-lib';
import {LoginComponent} from './routes/login/login.component';
import {HomeComponent} from './routes/home/home.component';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {CaseComponent} from './routes/case/case.component';
import { ConfigurationComponent } from './routes/configuration/configuration.component';
import { SplashComponent } from './routes/splash/splash.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeCockpitComponent } from './home-cockpit/home-cockpit.component';
import { SfContainerComponent} from './home-cockpit/sf-container.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";


/** This is the tc core configuration object
 * To use oauth you must also add the OAuthInterceptor to providers
 *  Note: Only HTTP calls that start with / will have oAuth token attached
 * To use proxy you must also add the ProxyInterceptor to providers
 *  Note: Only HTTP calls that start with / will be proxied
 */
const tcCoreConfig: TcCoreConfig = {
  oAuthLocalStorageKey: '',
  proxy_url: '',
  proxy_liveapps_path: '',
  proxy_tce_path: '',
  api_key: '',
  api_key_param: 'api_key',
  enable_tce: false
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent,
    CaseComponent,
    ConfigurationComponent,
    SplashComponent,
    HomeCockpitComponent,
    SfContainerComponent
  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule.forRoot(tcCoreConfig),
    TcFormsLibModule,
    TcLiveappsLibModule.forRoot(),
    TcSpotfireLibModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  entryComponents: [SfContainerComponent],
  providers: [
    LogService,
    // for proxied API calls
    // { provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptor, multi: true },

    // for using oAuth
    // { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public sessionRefreshService: SessionRefreshService, public tcConfigService: TcCoreConfigService) {
    if (!tcConfigService.getConfig().oAuthLocalStorageKey) {
      // setup cookie refresh for every 10 minutes
      // note: if oauth in use then no need since key will be refreshed in local storage by session manager app
      const usingProxy = (this.tcConfigService.getConfig().proxy_url && this.tcConfigService.getConfig().proxy_url !== '') ? true : false;
      this.sessionRefreshService.scheduleCookieRefresh(600000, usingProxy);
    }
  }
}
