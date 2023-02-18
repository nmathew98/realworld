export const AuthContext = createContext(Object.create(null));

export const AuthProvider = ({ children }) => {
	return (
		<AuthContext.Provider value={Object.create(null)}>
			{children}
		</AuthContext.Provider>
	);
};
