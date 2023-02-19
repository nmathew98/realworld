export const buildMakeMatch =
	(...cases: any[]) =>
	(type: any, catchAll: any = null) =>
	(...items: any[]) => {
		const index = Object.entries(cases)
			.filter(([, value]) => value === type)
			?.pop()
			?.shift();

		if (!index) return catchAll;

		return items[index];
	};
