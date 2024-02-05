import { Injectable, computed, signal } from '@angular/core';
import { SCREEN_SIZE } from '@core/enums/screen-size.enum';
import { BREAKPOINTS } from '@core/consts/breakpoints';
import { Observable, Subject, fromEvent, merge } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { IDeviceSize } from '../interfaces/device-size';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface screeSizeState {
  deviceSize: {
    category: string | null;
    innerWidth: string | null;
    innerHeight: string | null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  //state
  private state = signal<screeSizeState>({
    deviceSize : {
      category : null,
      innerWidth : null,
      innerHeight :  null
    }
  });

  //selectors
  deviceSize = computed(() => this.state().deviceSize);
  category = computed(() => this.state().deviceSize.category);

  //sources
  setDeviceSize$ = new Subject<IDeviceSize>();

  constructor() {
    this.setDeviceSize$.pipe(takeUntilDestroyed()).subscribe({
      next: (extent: IDeviceSize) =>
        this.state.update((state) => ({
          ...state,
          deviceSize: {
            category: extent.deviceSize.category,
            innerHeight: extent.deviceSize.innerHeight,
            innerWidth: extent.deviceSize.innerWidth,
          }
        })),
    });
  }

  public getDeviceSize(): void {
    let screenDetailsResizing$: Observable<IDeviceSize> =
      this.getScreenSizeWhenResizing();
    let screenDetailsLoading$: Observable<IDeviceSize> =
      this.getScreenSizeWhenLoaded();
    merge(screenDetailsResizing$, screenDetailsLoading$).subscribe(
      (data: IDeviceSize) => {
        console.log(data);
        this.setDeviceSize$.next(data);
      }
    );
  }

  private getScreenSizeWhenLoaded(): Observable<IDeviceSize> {
    return fromEvent(window, 'load').pipe(
      debounceTime(200),
      startWith(null),
      map(() => this.calculateScreenSize())
    );
  }

  private getScreenSizeWhenResizing(): Observable<IDeviceSize> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(200),
      startWith(null),
      map(() => this.calculateScreenSize())
    );
  }

  private calculateScreenSize(): IDeviceSize {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if (screenWidth < BREAKPOINTS.small) {
      return {
        deviceSize: {
          category: SCREEN_SIZE.Mobile,
          innerWidth: screenWidth + 'px',
          innerHeight: screenHeight + 'px',
        }
      };
    } else if (screenWidth < BREAKPOINTS.medium) {
      return {
        deviceSize: {
          category: SCREEN_SIZE.Tablet,
          innerWidth: screenWidth + 'px',
          innerHeight: screenHeight + 'px',
        }
      };
    } else if (screenWidth < BREAKPOINTS.large) {
      return {
        deviceSize: {
          category: SCREEN_SIZE.Desktop,
          innerWidth: screenWidth + 'px',
          innerHeight: screenHeight + 'px',
        }
      };
    } else if (screenWidth < BREAKPOINTS.extraLarge) {
      return {
        deviceSize: {
          category: SCREEN_SIZE.Desktop,
          innerWidth: screenWidth + 'px',
          innerHeight: screenHeight + 'px',
        }
      };
    } else {
      return {
        deviceSize: {
          category: SCREEN_SIZE.BigDesktop,
          innerWidth: screenWidth + 'px',
          innerHeight: screenHeight + 'px',
        }
      };
    }
  }
}
