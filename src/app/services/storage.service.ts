import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(JSON.stringify(value));
    return await this.storage.set(storageKey, encryptedValue);
  }

  async get(storageKey: string) {
    return new Promise((resolve) => {
      this.storage.get(storageKey).then((value) => {
        if (value == null) {
          resolve(false);
        } else {
          resolve(JSON.parse(atob(value)));
        }
      });
    });
  }
  async removeItem(storageKey: string) {
    await this.storage.remove(storageKey);
  }

  async clear() {
    await this.storage.clear();
  }
}
//just add in ts file of component where you want to use ionic storage
