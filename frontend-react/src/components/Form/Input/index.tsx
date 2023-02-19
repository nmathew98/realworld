import type { ElementType } from "react";

export const FormInput = ({ as = "input", size = "md", children, ...rest }) => {
	const As = as as unknown as ElementType;

	return (
		<fieldset className="form-group">
			<As className={`form-control form-control-${size}`} {...rest} />
			{children}
		</fieldset>
	);
};
