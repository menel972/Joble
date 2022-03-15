import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'JOBLE';

  Medium$ = this.breakpoint.observe([Breakpoints.TabletLandscape]);
  Large$ = this.breakpoint.observe([Breakpoints.Large]);
  XtraLarge$ = this.breakpoint.observe([Breakpoints.XLarge]);

  constructor(
  private translate: TranslateService,
  private breakpoint: BreakpointObserver
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
}
