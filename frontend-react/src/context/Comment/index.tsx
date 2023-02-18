export const CommentContext = createContext(Object.create(null));

export const CommentProvider = ({ children }) => {
	return (
		<CommentContext.Provider value={Object.create(null)}>
			{children}
		</CommentContext.Provider>
	);
};
