import { VersionService } from './../shared/version.service';
import { AuthService } from 'src/app/core/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/user.service';
import { TranslateService } from '@ngx-translate/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { icon } from '../shared/lexique';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations : [
    trigger('sidenav', [
      state('retract', style({
        width : '3.5vw',
        minWidth : '40px'
      })
      ),
      state('expend', style ({
      width : '15vw',
      minWidth : '15vw'
    })),
    transition('retract => expend', animate(300) ),
    transition('expend => retract', animate(200) )
  ]),
  trigger('logo', [
    state('retract', style({
      width: '3vw',
      minWidth: '33px'
    })
    ),
    state('expend', style({
      width: '10vw'
    })),
    transition('retract => expend', animate(300)),
    transition('expend => retract', animate(200))
  ]),
  trigger('classLogo', [
    state('retract', style({
      justifyContent: 'center'
    })
    ),
    state('expend', style ({
      justifyContent: 'flex-end',
      paddingRight: '1vw'
  })),
  transition('retract => expend', animate(300) ),
  transition('expend => retract', animate(200) )
])
]
})

export class ApplicationComponent implements OnInit {

  // VERSION
  version = this.Version.version;
  correctif = this.Version.correctif;

user$ = this.user.currentUser$;

   // BREAKPOINT
   Medium$ = this.breakpoint.observe(Breakpoints.TabletLandscape);
   Large$ = this.breakpoint.observe(Breakpoints.Large);
   XtraLarge$ = this.breakpoint.observe(Breakpoints.XLarge);

constructor(
  private translate: TranslateService,
  private router: Router,
  private user: UserService,
  private dialog: MatDialog,
  private Version: VersionService,
  private breakpoint: BreakpointObserver
  ) {
  this.router.events.subscribe( (event) => {
    if (event instanceof NavigationEnd) {
      if (router.url.includes('dashboard')) {
        this.route = 'dashboard';
      }
      if (router.url.includes('details')) {
        this.route = 'info';
      }
      if (router.url.includes('dahsboard')) {
        this.route = 'dashboard';
      }
      if (router.url.includes('dahsboard')) {
        this.route = 'dashboard';
      }
      if (router.url.includes('dahsboard')) {
        this.route = 'dashboard';
      }
    }});
}

  // ENUM ICON
  icon = icon;

  // ANIMATION
  state = 'retract';

  // ACTIVATED ROUTE
  route !: string;

  // TRANSLATION LANGUAGE
  language = [{value : 'En'}, {value : 'Fr'}];
  selectedLanguage = this.language[0].value;

  ngOnInit(): void {
    this.user.getCurrentUser$().subscribe();
  }

  changeLang(lang: string): void {
    this.translate.use(lang.toLocaleLowerCase());
  }

// DIALOG
openLogoutDialog(): void {
  this.dialog.open(LogoutDialog, {
    height: '35vh',
    width: '25%'
  });
}
}

/* LogoutDialog COMPONENT */

@Component({
  selector: 'logout-dialog',
  templateUrl: './LogoutDialog/logout-dialog.html',
  styleUrls: ['./LogoutDialog/logout-dialog.scss']
})

export class LogoutDialog implements OnInit {

  // ENUM ICON
  icon = icon;

  constructor(
    private dialogRef: MatDialogRef<LogoutDialog>,
    private auth: AuthService
    ) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.signOut();
    this.Close();
  }

  // CLOSE THE WINDOW
  Close(): void {
    this.dialogRef.close();
  }
  }
