import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getLocalStorageItems(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  setLocalStorageItems(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
