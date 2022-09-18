import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface IRoute extends RouteObject {
	text?: ReactNode;
	icon?: ReactNode;
	hideFromMenu?: boolean;
	children?: IRoute[];
}
