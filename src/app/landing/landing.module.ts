import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  exports: [
    HeaderComponent,FooterComponent,ChatComponent
  ]
})
export class LandingModule { }
