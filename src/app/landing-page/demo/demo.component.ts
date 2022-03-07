import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  // ENUM ICON
  icon = icon;

   // BREAKPOINT
   Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
   Large$ = this.breakpoint.observe(Breakpoints.Large);
   XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

  select = 1;

  constructor(private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
  }
}
