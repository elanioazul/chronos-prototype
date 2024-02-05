import { Component } from '@angular/core';
import { WidgetComponent } from '@features/visor/core/models/widget-component';

@Component({
  selector: 'app-drag-zoom',
  templateUrl: './drag-zoom.component.html',
  styleUrls: ['./drag-zoom.component.scss']
})
export class DragZoomComponent extends WidgetComponent {
  constructor() {
    super();
    console.log('constructor dragZoom comp');
  }
  ngOnInit(): void {
    console.log('ngOninit dragZoom comp');
    
  }

  onClick(): void {
    console.log('eee clicked from dragZoom component');
    
  }
}
