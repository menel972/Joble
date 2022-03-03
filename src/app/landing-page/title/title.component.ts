import { TranslateService } from '@ngx-translate/core';
import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  // ENUM ICON
  icon = icon;

    // TRANSLATION LANGUAGE
    language = [{value : 'En'}, {value : 'Fr'}];
    selectedLanguage = this.language[0].value;

    // BREAKPOINT
    Large$ = this.breakpoint.observe(Breakpoints.Large);
    Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
    XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  constructor(
    private translate: TranslateService,
    private breakpoint: BreakpointObserver
    ) { }

  ngOnInit(): void {
  }

  changeLang(lang: string): void {
    this.translate.use(lang.toLocaleLowerCase());
  }

}
