import { VersionService } from './../../../shared/version.service';
import { icon } from './../../../shared/lexique';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // ENUM ICON
  icon = icon;

  version = this.Version.version;

  constructor(private Version: VersionService) { }

  ngOnInit(): void {
  }

}
