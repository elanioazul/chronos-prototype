import { Component } from '@angular/core';
import { WidgetComponent } from '@features/visor/core/models/widget-component';

@Component({
  selector: 'app-home-extent',
  templateUrl: './home-extent.component.html',
  styleUrls: ['./home-extent.component.scss']
})
export class HomeExtentComponent extends WidgetComponent {
  constructor() {
    super();
    console.log('constructor homeExtent comp');
  }
  ngOnInit(): void {
    console.log('ngOninit homeExtent comp');
    
  }

  onClick(): void {
    console.log('eee clicked from homeExtent component');
    
  }
}
