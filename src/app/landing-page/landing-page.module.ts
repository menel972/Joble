import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

// MATERIAL DESIGN
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// NGX TRANSLATE
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { LandingPageRoutingModule } from './landing-page-routing.module';

// COMPONENT
import { LandingPageComponent } from './landing-page.component';
import { TitleComponent } from './title/title.component';
import { DemoComponent } from './demo/demo.component';
import { FooterComponent } from './footer/footer.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LandingPageComponent,
    TitleComponent,
    DemoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LayoutModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
  }
})
  ]
})
export class LandingPageModule { }
