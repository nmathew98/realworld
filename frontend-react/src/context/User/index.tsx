export const UserContext = createContext(Object.create(null));

export const UserProvider = ({ children }) => {
	return (
		<UserContext.Provider value={Object.create(null)}>
			{children}
		</UserContext.Provider>
	);
};
