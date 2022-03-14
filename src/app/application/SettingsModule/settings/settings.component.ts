import { VersionService } from './../../../shared/version.service';
import { icon } from './../../../shared/lexique';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  // BREAKPOINT
 Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
 Large$ = this.breakpoint.observe(Breakpoints.Large);
 XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  version = this.Version.version;

  constructor(
    private Version: VersionService,
    private breakpoint: BreakpointObserver
    ) { }

  ngOnInit(): void {
  }

}
