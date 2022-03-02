import { TranslateService } from '@ngx-translate/core';
import { icon } from 'src/app/shared/lexique';
import { Component, OnInit } from '@angular/core';

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

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  changeLang(lang: string): void {
    this.translate.use(lang.toLocaleLowerCase());
  }

}
