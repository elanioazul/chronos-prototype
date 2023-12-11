import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';

export const SESSION_STORAGE = new InjectionToken<Storage>(
  'session storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? sessionStorage
        : ({} as Storage);
    },
  }
)
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = inject(SESSION_STORAGE);

  constructor() { }

  public saveData(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  public getData(key: string) {
    return this.storage.getItem(key)
  }
  public removeData(key: string) {
    this.storage.removeItem(key);
  }

  public clearData() {
    this.storage.clear();
  }
}
