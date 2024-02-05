import { Component } from '@angular/core';
import { WidgetComponent } from '@features/visor/core/models/widget-component';

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
    
  }
}
