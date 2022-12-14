import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [    
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},
    Geolocation,
    LaunchNavigator,
    CallNumber
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
