import type { ElementType } from "react";

export const TagContainer = ({ as = "ul", ...rest }) => {
	const As = as as unknown as ElementType;

	return <As {...rest} className="tag-list" />;
};
