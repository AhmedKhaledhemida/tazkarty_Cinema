import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isRtl: boolean = false;

  toggleLayout() {
    this.isRtl = !this.isRtl;

    if (this.isRtl) {
      document.documentElement.dir = 'rtl';
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
  }
}