import { Component, Input } from '@angular/core';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';

@Component({
  selector: 'app-widget-dialog',
  templateUrl: './widget-dialog.component.html',
  styleUrls: ['./widget-dialog.component.scss']
})
export class WidgetDialogComponent {
  @Input() widget!: IWidget;
  @Input() toolContainer: string | null = null;
}
