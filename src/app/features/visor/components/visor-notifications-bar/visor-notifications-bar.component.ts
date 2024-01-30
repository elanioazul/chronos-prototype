import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { addMouseControlToMap, addNumericScaleToMap, monitorZoomAndScale } from '@features/visor/core/utils/utils-ol';
import { MapService } from '@features/visor/core/services/map.service';
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
  @ViewChild('scale') private scaleDiv!: ElementRef<HTMLDivElement>;

  map!: any;

  private unSubscribe = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    addMouseControlToMap(this.coordinatesDiv.nativeElement, this.mapService.map()!);
    addNumericScaleToMap(this.scaleDiv.nativeElement, this.mapService.map()!)
    monitorZoomAndScale(this.mapService.map()!);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
