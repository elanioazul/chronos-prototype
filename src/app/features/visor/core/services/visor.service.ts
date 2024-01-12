import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { IReadVisor } from '../interfaces/visor-stuff/visor.interfaz';
import { Message } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface VisorState {
  config: IReadVisor | null;
  loaded: boolean;
  error: Message | null;
}

@Injectable({
  providedIn: 'root',
})
export class VisorService {

  // state
  private state = signal<VisorState>({
    config: null,
    loaded: false,
    error: null,
  });

  //selectors
  config = computed(() => this.state().config)
  loaded = computed(() => this.state().loaded)

  //sources
  readVisorConfig$ = new Subject<IReadVisor>();
  //buildMap$ = new Subject<boolean>();

  constructor() {
    this.readVisorConfig$.pipe(takeUntilDestroyed()).subscribe({
      next: (config:IReadVisor) => 
        this.state.update((state) => ({
          ...state,
          config: config,
          loaded: true
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    })
  

    //effects
    // effect(() => {
    //   // if (this.config()) {
    //   //   const visorConfig = this.config()
    //   //   if (visorConfig) {
    //   //     const mapProps = this.visorToMapMapperService.transform(visorConfig)
    //   //     this.mapService.createMap$.next(mapProps)
    //   //   }
    //   // }
    //   if (this.loaded()) {
    //     //this.mapService.createMap$.next(this.visorToMapMapperService.transform(this.config()!)) //daba una circular dependency
    //     this.buildMap$.next(true)
    //   }
    // })
  }
}
