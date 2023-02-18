import React from "react";

export const ArticleContext = React.createContext(Object.create(null));

export const ArticleProvider = ({ children }) => {
	return (
		<ArticleContext.Provider value={Object.create(null)}>
			{children}
		</ArticleContext.Provider>
	);
};
