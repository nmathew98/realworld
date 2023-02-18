import type { ElementType } from "react";

export const TagPill = ({ as = "li", ...rest }) => {
	const As = as as unknown as ElementType;

	<As {...rest} className="tag-pill tag-default" />;
};
