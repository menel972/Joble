import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// FIREBASE
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// MATERIAL DESIGN
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// NGX TRANSLATE
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

// LAZY LOADING
import { TableModule } from './application/TableModule/table.module';
import { DetailsModule } from './application/DetailsModule/details.module';
import { SettingsModule } from './application/SettingsModule/settings.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { ApplicationComponent, LogoutDialog } from './application/application.component';
import { AuthComponent } from './AuthComponent/auth.component';
import { LoginComponent } from './AuthComponent/login/login.component';
import { RegisterComponent } from './AuthComponent/register/register.component';
import { ResetComponent } from './AuthComponent/reset/reset.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    LogoutDialog,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule,
  BrowserAnimationsModule,
  TableModule,
  DetailsModule,
  SettingsModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
HttpClientModule,
TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
}),
MatSelectModule,
MatOptionModule,
MatCardModule,
MatButtonModule,
MatDatepickerModule,
MatDialogModule,
MatTabsModule,
MatSnackBarModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
