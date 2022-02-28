import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL DESIGN
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// NGX TRANSLATE
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// COMPONENTS

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details/details.component';
import { NoteComponent, DetailsNoteDialog } from './details/note/note.component';
import { InfoComponent, DetailsInfoDialog } from './details/info/info.component';
import { AppmsgComponent, DetailsAppMsgDialog } from './details/appmsg/appmsg.component';

// PIPES
import { TimestampPipe } from './DetailsShared/timestamp.pipe';
import { LinkPipe } from './DetailsShared/link.pipe';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    DetailsComponent,
    AppmsgComponent,
    DetailsAppMsgDialog,
    InfoComponent,
    DetailsInfoDialog,
    NoteComponent,
    DetailsNoteDialog,
    TimestampPipe,
    LinkPipe

  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
  }
}),
MatIconModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatDialogModule,
MatDatepickerModule,
MatNativeDateModule,
MatSelectModule,
MatCardModule,
ClipboardModule,
MatSnackBarModule
  ]
})
export class DetailsModule { }
