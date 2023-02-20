export const buildMakeMatch =
	(...cases: any[]) =>
	(type: any, catchAll: any = null) => {
		const index = cases.findIndex(value => value === type);

		return (...items: any[]) => items.at(index) ?? catchAll;
	};
