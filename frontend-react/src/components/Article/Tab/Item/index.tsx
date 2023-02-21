import type { ElementType } from "react";

export const ArticleTabItem = ({
	as = "a",
	isActive,
	...rest
}: ArticleTabItemProps<any>) => {
	const As = as as unknown as ElementType;

	return (
		<li className="nav-item">
			<As {...rest} className={joinClasses(!!isActive, "nav-link", "active")} />
		</li>
	);
};

interface ArticleTabItemProps<T extends ElementType>
	extends Record<string, any> {
	as?: T;
	isActive?: boolean;
}
