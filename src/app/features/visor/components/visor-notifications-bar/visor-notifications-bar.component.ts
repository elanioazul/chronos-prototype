import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { addMouseControlToMap, addNumericScaleToMap, addLineScaleToMap } from '@features/visor/core/utils/utils-ol';
import { MapService } from '@features/visor/core/services/map.service';
import { standardizedRenderingPixelSize } from '@features/visor/core/consts/pixel-size';
@Component({
  selector: 'app-visor-notifications-bar',
  templateUrl: './visor-notifications-bar.component.html',
  styleUrls: ['./visor-notifications-bar.component.scss'],
})
export class VisorNotificationsBarComponent
  implements OnInit, AfterViewInit, OnDestroy
{

  mapService = inject(MapService);
  @ViewChild('coordinates') private coordinatesDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('numericscale') private numericScaleDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('linescale') private lineScaleDiv!: ElementRef<HTMLDivElement>;

  map!: any;
  currZoom: any;

  private unSubscribe = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.monitorZoomAndScale()
  }
  ngAfterViewInit(): void {
    addMouseControlToMap(this.coordinatesDiv.nativeElement, this.mapService.map()!);
    addNumericScaleToMap(this.numericScaleDiv.nativeElement, this.mapService.map()!);
    addLineScaleToMap(this.lineScaleDiv.nativeElement, this.mapService.map()!);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  monitorZoomAndScale(): void {
    this.currZoom = this.mapService.map()!.getView().getZoom();
    this.mapService.map()!.on('moveend', (e) => {
      const newZoom = this.mapService.map()!.getView().getZoom();
      const resolution = this.mapService.map()!.getView().getResolution();
      const scale = resolution! / (standardizedRenderingPixelSize / 1000); //projection 25831 es metros
  
      if (this.currZoom !== newZoom) {
        console.log(
          'Zoom changed, new zoom: ' + newZoom + ', new scale: ' + scale
        );
        this.currZoom = Math.round(newZoom!);
      }
    });
  }
}
