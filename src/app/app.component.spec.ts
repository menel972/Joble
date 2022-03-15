import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', ( ) => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('App title should be JOBLE', () => {
    expect(component.title).toEqual('JOBLE');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
