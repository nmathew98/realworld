export const usePreviousValueEffect = (f, from, to) => {
	useEffect(() => {
		const effect = f(from, ...to);

		if (effect !== null && effect !== undefined) from.current = effect;
	}, to);
};
