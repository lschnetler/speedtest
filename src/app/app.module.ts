import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGaugeModule } from 'ngx-gauge';

import { AppComponent } from './app.component';
import { SpeedtestService } from './services/speedtest.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxGaugeModule
  ],
  providers: [SpeedtestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
