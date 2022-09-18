import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES } from '@routes';

export const AppRoutes: FC = () => {
	const router = useRoutes(ROUTES);
	return router;
};
