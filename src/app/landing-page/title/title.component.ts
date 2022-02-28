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

  constructor() { }

  ngOnInit(): void {
  }

}
