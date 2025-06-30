import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CpLayoutComponent } from './layout/cp-layout/cp-layout.component';
import { FormsModule } from '@angular/forms';
import { CpRoutingModule } from './cp/cp-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CpLayoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    CpRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
