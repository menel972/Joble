import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { TitleComponent } from './title/title.component';
import { DemoComponent } from './demo/demo.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    TitleComponent,
    DemoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
