import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthService {

  constructor(private storageService: StorageService) { }

  public saveToken(token: string): void {
    this.storageService.saveData('access_token', token);
  }

  public isTokenStoraged(): boolean {
    const isPresent = this.storageService.getData('access_token')
    return isPresent ? true : false;
  }
}