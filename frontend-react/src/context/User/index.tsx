import React from "react";

export const UserContext = React.createContext(Object.create(null));

export const UserProvider = ({ children }) => {
	return (
		<UserContext.Provider value={Object.create(null)}>
			{children}
		</UserContext.Provider>
	);
};
