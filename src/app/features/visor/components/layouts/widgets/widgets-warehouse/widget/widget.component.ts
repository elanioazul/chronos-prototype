import { Component, EventEmitter, Output, inject } from '@angular/core';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';
import { MapService } from '@features/visor/core/services/map.service';
import { ScreenSizeService } from '@features/visor/core/services/screen-size.service';
import { VisorService } from '@features/visor/core/services/visor.service';
import { getEpsgFromMap, getsridFromMap } from '@core/utils/utils-ol';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  visorService = inject(VisorService);
  mapService = inject(MapService);
  screeSizeService = inject(ScreenSizeService);

  @Output() messageEvent = new EventEmitter<string>();

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

  onClick(): void {}

  sendMessageToLoaderComp(wdgtName: string): void {};
}
