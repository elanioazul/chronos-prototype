import { Component, computed, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MapService } from '@features/visor/core/services/map.service';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-visor-simple-toc',
  templateUrl: './visor-simple-toc.component.html',
  styleUrls: ['./visor-simple-toc.component.scss'],
})
export class VisorSimpleTocComponent {
  mapService = inject(MapService);

  tocLyrs = computed(() => this.mapService.simpleTocLayers());


  public dropLayer(event: any/*CdkDragDrop<string[]>*/) {
	/*
		TODO: esto dropLayer tiene que actualizar el state (la signal simpleTocLayers)
		para lo cual habrá que hacer una source de entrada y lo que no se es si
		habrá que sobreescribir los zindex que el state tiene con los que aporta este evento o podré buscar correspondencias
	*/
	moveItemInArray(
		this.tocLyrs(),
		event.previousIndex,
		event.currentIndex
	);
	let init: number;
	let end: number;
	if (event.previousIndex > event.currentIndex) {
		init = event.currentIndex;
		end = event.previousIndex;
	} else {
		init = event.previousIndex;
		end = event.currentIndex;
	}
	for (init; init <= end; init++) {
		const zIndex = this.tocLyrs().length - init;
		this.tocLyrs()[init].zIndex = zIndex;
	}
}
}
