import React from "react";

export const AuthContext = React.createContext(Object.create(null));

export const AuthProvider = ({ children }) => {
	return (
		<AuthContext.Provider value={Object.create(null)}>
			{children}
		</AuthContext.Provider>
	);
};
