import { Component, computed, inject } from '@angular/core';
import { VisorService } from '@features/visor/core/services/visor.service';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent {
  visorService = inject(VisorService);
  configWidgets = computed(() => this.visorService.config()!.widgets);

  constructor() {
  }

}
