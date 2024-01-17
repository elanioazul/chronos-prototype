import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ISidebarTab } from '@core/interfaces/sidebar/sidebar-tab.interfaz';
import { SidebarService } from '@core/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visor-sidebar-tab',
  templateUrl: './visor-sidebar-tab.component.html',
  styleUrls: ['./visor-sidebar-tab.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class VisorSidebarTabComponent implements OnInit {
  sidebarService = inject(SidebarService);
  renderer = inject(Renderer2);

  @ViewChild('widget') widgetDiv!: ElementRef<HTMLElement>;

  sidebarDiv: ElementRef<HTMLDivElement> | undefined;

  // divSwitcher?: any;

  @ViewChild('container', {
    static: true,
    read: ViewContainerRef,
  })
  container!: ViewContainerRef;

  @Input() configOptions!: ISidebarTab;

  @Output() messageEvent = new EventEmitter<string>();
  subscriptions: Subscription[] = [];

  constructor() {
    this.getSidebarDomNode();
  }
  
  
  ngOnInit() {
    this.loadWidget();
  }
  
  sendMessageToLoaderComp(tabName: string): void {
    this.messageEvent.emit(
      `mensaje por aqui al comp cargador desde componente ${tabName} dynamico`
    );
  }

  private getSidebarDomNode(): void {
    this.subscriptions.push(
      this.sidebarService.sidebarDiv$.subscribe((domNode) => {
        if (domNode) {
          this.sidebarDiv = domNode;
        }
      })
    );
  }

  private async loadWidget() {
    this.container.clear();

    if (this.configOptions.widget) {
      const componentInstance = await this.configOptions.widget();
      const componentRef: ComponentRef<any> =
        this.container.createComponent(componentInstance);
    }
  }
}
