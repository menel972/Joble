import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.scss']
})
export class ResponsiveComponent implements OnInit {

  constructor(private breakpoint: BreakpointObserver) { }

  // BREAKPOINTS
  XtraXtraSmall$ = this.breakpoint.observe(Breakpoints.HandsetPortrait);
  XtraSmall$ = this.breakpoint.observe(Breakpoints.HandsetLandscape);
  Small$ = this.breakpoint.observe(Breakpoints.TabletPortrait);

  ngOnInit(): void {
  }

}
