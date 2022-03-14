import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { CRUDService } from 'src/app/shared/crud.service';
import { Component, OnInit } from '@angular/core';
import { icon } from 'src/app/shared/lexique';
import { map } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  // BREAKPOINT
  Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
  Large$ = this.breakpoint.observe(Breakpoints.Large);
  XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

// CURRENT JOB
id !: string | null;

Jobs$ = this.crud.readAllJobs$().pipe(
  map(jobs => jobs.filter(job => job.id === this.id))
);

  constructor(
    private crud: CRUDService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private breakpoint: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => this.id = param.get('id'));
  }

  openSnackBar(): void {
    this.snackBar.open(
      ` ${this.translate.instant('JOB.applicationMessage')} ${this.translate.instant('BUTTON.copied')}`,
      '', {
        duration: 3000,
        horizontalPosition: 'end'
      });
  }
}
