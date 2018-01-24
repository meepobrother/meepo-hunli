import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MnFullpageModule } from './fullpage';
import { LazyLoadImageModule } from './lazyload';
import { LazyBackgroundDirective } from './lazyload-background/lazyload-background';
import { LazyloadDirective } from './lazyload-background/lazyload-image';
import { DialogComponent } from './dialog/dialog';


import { DanmuItemComponent } from './danmus/danmu-item';

import { NoticeBarModule } from 'ng-antd-mobile-notice-bar';

import { BASE_SRC } from './lazyload-background/lazyload-background';
@NgModule({
  declarations: [
    AppComponent,
    LazyBackgroundDirective,
    DanmuItemComponent,
    LazyloadDirective,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    LazyLoadImageModule,
    MnFullpageModule.forRoot(),
    HttpClientModule,
    NoticeBarModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: './'
    },
    {
      provide: BASE_SRC,
      useValue: '../addons/imeepos_runner/template/mobile/hunli/'
    }
  ],
  entryComponents: [DanmuItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
