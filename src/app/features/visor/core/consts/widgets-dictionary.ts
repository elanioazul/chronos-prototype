import { ZoomInComponent } from "@features/visor/components/layouts/widgets/zoom-in/zoom-in.component";
import { WidgetsDictionary } from "../utils/tools";
import { ZoomOutComponent } from "@features/visor/components/layouts/widgets/zoom-out/zoom-out.component";
import { HomeExtentComponent } from "@features/visor/components/layouts/widgets/home-extent/home-extent.component";
import { DragZoomComponent } from "@features/visor/components/layouts/widgets/drag-zoom/drag-zoom.component";
import { OverviewMapComponent } from "@features/visor/components/layouts/widgets/overview-map/overview-map.component";
import { DefaultCursorComponent } from "@features/visor/components/layouts/widgets/default-cursor/default-cursor.component";
import { BookmarksComponent } from "@features/visor/components/layouts/widgets/bookmarks/bookmarks.component";
import { MeasurementsComponent } from "@features/visor/components/layouts/widgets/measurements/measurements.component";


export const widgetsIndex: WidgetsDictionary = {
	defaultCursor: {
		widgetComponent: DefaultCursorComponent,
	},
    zoomIn: {
		widgetComponent: ZoomInComponent,
	},
	zoomOut: {
		widgetComponent: ZoomOutComponent,
	},
    overviewMap: {
		widgetComponent: OverviewMapComponent,
	},
    homeExtent: {
		widgetComponent: HomeExtentComponent,
	},
    dragZoom: {
		widgetComponent: DragZoomComponent,
	},
    measurements: {
		widgetComponent: MeasurementsComponent,
	},
    bookmarks: {
		widgetComponent: BookmarksComponent,
	}
}