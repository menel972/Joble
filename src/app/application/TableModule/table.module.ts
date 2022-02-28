import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// MATERIAL DESIGN
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

// NGX TRANSLATE
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { TableRoutingModule } from './table-routing.module';

// COMPONENTS
import { TableComponent } from './table/table.component';
import { TableButtonComponent, DashboardAddDialog, DashboardEditDialog, DashboardDeleteDialog } from './table/table-button/table-button.component';

// PIPES
import { FilterPipe } from './TableShared/filter.pipe';
import { LinkPipe } from './TableShared/link.pipe';
import { TimestampPipe } from './TableShared/timestamp.pipe';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    TableComponent,
    TableButtonComponent,
    DashboardAddDialog,
    DashboardEditDialog,
    DashboardDeleteDialog,
    FilterPipe,
    LinkPipe,
    TimestampPipe
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
  }
}),
MatButtonModule,
MatDialogModule,
ReactiveFormsModule,
MatDatepickerModule,
MatNativeDateModule,
MatSelectModule,
MatCardModule,
MatSnackBarModule,
MatTooltipModule
  ]
})
export class TableModule { }
