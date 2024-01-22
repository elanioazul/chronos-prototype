import { Component, OnInit, inject } from '@angular/core';
import { mockVisor } from '@features/visor/core/consts/visor-config';
import { VisorService } from '@features/visor/core/services/visor.service';
@Component({
  selector: 'app-barrier',
  templateUrl: './barrier.component.html',
  styleUrls: ['./barrier.component.scss'],
})
export class BarrierComponent implements OnInit {

  visorServ = inject(VisorService);

  constructor() {

  }
  ngOnInit(): void {
    this.visorServ.readVisorConfig$.next(mockVisor);
  }
}
