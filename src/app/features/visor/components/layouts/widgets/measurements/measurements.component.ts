import { Component } from '@angular/core';
import { CursorStyle } from '@features/visor/core/enums/cursor.enum';
import { WidgetComponent } from '@features/visor/core/models/widget-component';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent extends WidgetComponent {
  constructor() {
    super();
    console.log('constructor measurements comp');
  }

  onClick(): void {
    console.log('eee clicked from measurements component');
    this.mapService.setCursor(CursorStyle.default);
  }
}
