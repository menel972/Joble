import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  version = 0.8;
  correctif = 5;

  constructor() { }
}
