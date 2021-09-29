import React from 'react';

export const AppContext = React.createContext({
	api: null,
	db: null,
	host: '',
	appKey: '',
});
