import { Component } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
import { setCursor } from '@features/visor/core/utils/utils-ol';

@Component({
  selector: 'app-zoom-out',
  templateUrl: './zoom-out.component.html',
  styleUrls: ['./zoom-out.component.scss']
})
export class ZoomOutComponent extends WidgetComponent {

  constructor() {
    super();
    console.log('constructor zoom-out comp');
  }
  ngOnInit(): void {
    console.log('ngOninit zoom-in comp');
    
  }

  onClick(): void {
    console.log('eee clicked from zoomOut component');
    setCursor(this.mapService.map()!, CursorStyle.default);
    this.mapService.map()?.getView().animate({
      zoom: this.mapService.map()?.getView().getZoom()! - 1,
      duration: 250
    })
    
  }
}
