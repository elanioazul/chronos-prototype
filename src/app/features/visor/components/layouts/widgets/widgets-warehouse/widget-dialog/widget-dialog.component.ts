import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef, computed, inject } from '@angular/core';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';
import { VisorService } from '@features/visor/core/services/visor.service';
import { widgetsIndex } from '@features/visor/core/consts/widgets-dictionary';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
@Component({
  selector: 'app-widget-dialog',
  templateUrl: './widget-dialog.component.html',
  styleUrls: ['./widget-dialog.component.scss']
})
export class WidgetDialogComponent implements OnInit {

  visorService = inject(VisorService);
  mapActiveWidget = computed(() => this.visorService.mapActiveWidget());
  
  @Input() widget!: IWidget;
  @Input() toolContainer: string | null = null;

  @ViewChild('container', {
    static: true,
    read: ViewContainerRef,
  })
  container!: ViewContainerRef;

  visible: boolean = false;

  newComponent!: ComponentRef<WidgetComponent>;

  widgetsDictionary = widgetsIndex;

  constructor() {}

  ngOnInit(): void {
    this.loadComponent();
  }

  showDialog(event: any) {
    this.visible = true;
    this.visorService.toogleWidget$.next(this.widget);
    this.newComponent.instance.onClick();
  }

  private async loadComponent() {
    if (this.widgetsDictionary[this.widget.key]) {
      this.container.clear();

      const componentInstance = await this.widget.widget();
      this.newComponent = this.container.createComponent(componentInstance);
      this.newComponent.instance.widget = this.widget;
      this.visorService.addWidget$.next(this.widget);
    }
  }
}
