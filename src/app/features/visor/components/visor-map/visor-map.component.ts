import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { bcnCoords } from '@features/visor/core/consts/visor-config';
import { ChronosMap } from '@features/visor/core/models/map-stuff/chronos-map';
import { CursorStyleService } from '@features/visor/core/services/cursor-style.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-visor-map',
  templateUrl: './visor-map.component.html',
  styleUrls: ['./visor-map.component.scss'],
})
export class VisorMapComponent implements OnDestroy {
  private unSubscribe = new Subject<void>();
  cursorService = inject(CursorStyleService);

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;

  @Input('map') map!: ChronosMap | null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cursorService.cursorStyle$.pipe(takeUntil(this.unSubscribe),).subscribe(cursorStyle => {
      this.mapRef.nativeElement.style.cursor = cursorStyle;
    });

    this.map?.setTarget(this.mapRef.nativeElement);

    this.setInitialView();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  setInitialView(): void {
    this.map?.getView().setZoom(5);
    this.map?.getView().setCenter(bcnCoords);
  }

}
