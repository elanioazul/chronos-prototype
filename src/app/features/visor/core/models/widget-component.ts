import { Component, EventEmitter, Output } from '@angular/core';
import { inject } from '@angular/core';
import { ScreenSizeService } from '@core/services/screen-size.service';
import { MapService } from '@core/services//map.service';
import { VisorService } from '@core/services//visor.service';
import { IWidget } from '@core/interfaces/widgets/widget.interfaz';
import { SCREEN_SIZE } from '@core/enums/screen-size.enum';
import { getEpsgFromMap, getsridFromMap } from '@core/utils/utils-ol';

export abstract class WidgetComponent {
    visorService = inject(VisorService);
    mapService = inject(MapService);
    screeSizeService = inject(ScreenSizeService);
  
    //@Output() messageEvent = new EventEmitter<string>();
  
    public srid: number;
    public epsg: string;
    public widget!: IWidget;
    public icon?: string;
    public screenSize: string;
  
    public get config(): any {
      return this.widget ? this.widget.config : null;
    }
  
    constructor() {
      this.screenSize = this.screeSizeService.category()!;
      this.epsg = getEpsgFromMap(this.mapService.map()!);
      this.srid = getsridFromMap(this.mapService.map()!);
    }

    abstract onClick(): void;
  
}