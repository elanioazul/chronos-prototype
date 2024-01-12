import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
//import { addMouseControlToMap } from '@features/visor/core/utils/utils-ol';
@Component({
  selector: 'app-visor-notifications-bar',
  templateUrl: './visor-notifications-bar.component.html',
  styleUrls: ['./visor-notifications-bar.component.scss'],
})
export class VisorNotificationsBarComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('coordinates') private coordinatesDiv!: ElementRef<HTMLDivElement>;

  map!: any;

  private unSubscribe = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    //addMouseControlToMap(this.coordinatesDiv.nativeElement, this.map);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
