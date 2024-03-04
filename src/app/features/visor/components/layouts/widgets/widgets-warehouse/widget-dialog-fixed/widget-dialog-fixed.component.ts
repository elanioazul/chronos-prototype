import { AfterViewInit, Component, ComponentRef, ElementRef, Input, ViewChild, ViewContainerRef, computed, inject } from '@angular/core';
import { widgetsIndex } from '@features/visor/core/consts/widgets-dictionary';
import { IWidget } from '@features/visor/core/interfaces/widgets/widget.interfaz';
import { WidgetComponent } from '@features/visor/core/models/widget-component';
import { VisorService } from '@features/visor/core/services/visor.service';
import { Dialog } from 'primeng/dialog';
import { DomHandler } from 'primeng/dom';

@Component({
  selector: 'app-widget-dialog-fixed',
  templateUrl: './widget-dialog-fixed.component.html',
  styleUrls: ['./widget-dialog-fixed.component.scss']
})
export class WidgetDialogFixedComponent implements AfterViewInit {
  
  visorService = inject(VisorService);
  mapActiveWidget = computed(() => this.visorService.mapActiveWidget());
  fixedDialogTargetDiv = computed(() => this.visorService.fixedDialogTargetDiv());
  div!: ElementRef<any> | null;
  
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

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.loadComponent();
    this.div = this.fixedDialogTargetDiv()?.nativeElement;
    
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
