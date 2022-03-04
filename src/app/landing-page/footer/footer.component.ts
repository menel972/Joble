import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contactForm !: FormGroup;

        // BREAKPOINT
        Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
        Large$ = this.breakpoint.observe(Breakpoints.Large);
        XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

        constructor(private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  submit(): void {}

}
