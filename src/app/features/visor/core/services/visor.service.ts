import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { IReadVisor } from '../interfaces/visor-stuff/visor.interfaz';
import { Message } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IWidget } from '../interfaces/widgets/widget.interfaz';
import { widgetType } from '../enums/wiget-type';

export interface VisorState {
  config: IReadVisor | null;
  mapWidgets: IWidget[],
  mapActiveWidget: IWidget | null;
  loaded: boolean;
  error: Message | null;
}

// export interface IWdgt {
// 	key: string;
// 	type: widgetType;
// 	toolContainer: string;
// 	active: boolean;
// }

@Injectable({
  providedIn: 'root',
})
export class VisorService {

  // state
  private state = signal<VisorState>({
    config: null,
    mapWidgets: [],
    mapActiveWidget: null,
    loaded: false,
    error: null,
  });

  //selectors
  config = computed(() => this.state().config)
  mapWidgets = computed(() => this.state().mapWidgets)
  mapActiveWidget = computed(() => this.state().mapActiveWidget)
  loaded = computed(() => this.state().loaded)

  //sources
  readVisorConfig$ = new Subject<IReadVisor>();
  addWidget$ = new Subject<IWidget>();
  toogleWidget$ = new Subject<IWidget>();
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

    this.addWidget$.pipe(takeUntilDestroyed()).subscribe((wgdt: IWidget) =>
      this.state.update((state) => ({
        ...state,
        mapWidgets: [...state.mapWidgets, wgdt]
      }))
    )

    this.toogleWidget$.pipe(takeUntilDestroyed()).subscribe((wgdt: IWidget) => {
      this.state.update((state) => ({
        ...state,
        mapWidgets: state.mapWidgets.map((item: IWidget) =>
          item.key === wgdt.key
            ? { ...item, checked: !item.config.active }
            : item
        ),
        mapActiveWidget: wgdt
      }))
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
