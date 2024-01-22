import { Component, ElementRef, Input, Signal, ViewChild, inject } from '@angular/core';
import { bcnCoords } from '@features/visor/core/consts/config-visor';
import { ChronosMap } from '@features/visor/core/models/map-stuff/chronos-map';
import { CursorStyleService } from '@features/visor/core/services/cursor-style.service';
@Component({
  selector: 'app-visor-map',
  templateUrl: './visor-map.component.html',
  styleUrls: ['./visor-map.component.scss'],
})
export class VisorMapComponent {
  cursorService = inject(CursorStyleService);

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;

  @Input('map') map!: ChronosMap | null;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapRef.nativeElement.style.cursor  = this.cursorService.style();

    this.map?.setTarget(this.mapRef.nativeElement);
    
    this.setInitialView();
  }

  setInitialView(): void {
    this.map?.getView().setZoom(5);
    this.map?.getView().setCenter(bcnCoords);
  }
}
