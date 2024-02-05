import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { WidgetComponent } from '@core/models/widget-component';

@Component({
  selector: 'app-zoom-in',
  templateUrl: './zoom-in.component.html',
  styleUrls: ['./zoom-in.component.scss']
})
export class ZoomInComponent extends WidgetComponent implements OnInit {

  constructor() {
    super();
    console.log('constructor zoomIn comp');
  }
  ngOnInit(): void {
    console.log('ngOninit zoomIn comp');
    
  }

  onClick(): void {
    console.log('eee clicked from zoomIn component');
    
  }


}
