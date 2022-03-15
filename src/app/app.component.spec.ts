import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', ( ) => {
  let TranslateServiceSpy;

  beforeEach( async () => {
    TranslateServiceSpy = jasmine.createSpyObj('TranslateService', ['addLangs', 'setDefaultLang']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {provide: TranslateService, useValue: TranslateServiceSpy}
      ]
    }).compileComponents();

    TestBed.inject(TranslateService);
  });

  it('App title should be JOBLE', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    expect(app.title).toEqual('JOBLE');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
