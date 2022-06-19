import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, StatusCardComponent, SpinnerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
