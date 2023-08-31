import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storeage?: Storage;
  constructor() {
    this.storeage = window.localStorage;
  }
  set(key: string, value: string): void {
    this.storeage?.setItem(key, value);
  }
  get(key: string): any {
    return this.storeage?.getItem(key) || false;
  }

  setObj(key: string, value: any): void {
    if (!value) {
      return;
    }
    this.storeage?.setItem(key, JSON.stringify(value));
  }
  getObj(key: string) {
    const obj: any = this.storeage?.getItem(key) || {};
    return JSON.parse(obj);
  }
  getValue<T>(key: string): T {
    const obj = this.storeage?.getItem(key);
    return <T>obj;
  }
  remove(key: string) {
    this.storeage?.removeItem(key);
  }
  clear() {
    this.storeage?.clear();
  }
  getLength(): number | undefined {
    return this.storeage?.length;
  }

  getStoreageIsEmpty(): boolean {
    return this.getLength() === 0;
  }
}
