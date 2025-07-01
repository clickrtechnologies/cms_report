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
import { MnoLayoutComponent } from './layout/mno-layout/mno-layout.component';
import { ArtistLayoutComponent } from './layout/artist-layout/artist-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ArtistRoutingModule } from './artist/artist-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MnoRoutingModule } from './mno/mno-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CpLayoutComponent,
    MnoLayoutComponent,
    ArtistLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    CpRoutingModule,
    ArtistRoutingModule,
    AdminRoutingModule,
    MnoRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
