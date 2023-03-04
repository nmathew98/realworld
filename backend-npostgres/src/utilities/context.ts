export const createContext = () => {
	return Object.create(null) as Context;
};

export const CONTEXT = createContext();
