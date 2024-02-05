import { widgetType } from "../../enums/wiget-type";

export interface IWidget {
	id: number;
	key: string;
	nombre: string;
	descripcion?: string;
	widget: any,
	config: {
		icon: string;
		type: widgetType;
		color?: string;
		active?: boolean;
		position?: {
			fixPosition?: boolean;
			maximizable?: boolean;
			desktop?:
				| 'bottom-right'
				| 'bottom-left'
				| 'bottom-center'
				| 'top-right'
				| 'top-left'
				| 'top-center'
				| 'header'
				| 'none';
			mobile?:
				| 'bottom-right'
				| 'bottom-left'
				| 'bottom-center'
				| 'top-right'
				| 'top-left'
				| 'top-center'
				| 'header'
				| 'none';
		};
		tools?: IWidget[];
	};
}
