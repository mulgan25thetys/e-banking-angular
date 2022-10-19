import { LandingModule } from './../landing/landing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSpaceRoutingModule } from './client-space-routing.module';
import { ClientSpaceComponent } from './client-space.component';
import { ProfileComponent } from './profile/profile.component';
import { AsideComponent } from './components/aside/aside.component';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    ClientSpaceComponent,
    ProfileComponent,
    AsideComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    ClientSpaceRoutingModule,
    LandingModule
  ],
  exports : [AsideComponent]
})
export class ClientSpaceModule { }
