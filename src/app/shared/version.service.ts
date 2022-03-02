import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  version = 1.0;
  correctif = 3;

  constructor() { }
}
