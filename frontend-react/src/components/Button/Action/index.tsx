import { Icon } from "../../Icon";

export const ButtonAction = ({ type = "primary", onClick, icon, children }) => (
	<button onClick={onClick} className={`btn btn-sm btn-outline-${type}`}>
		<Icon name={icon} />
		&nbsp;{children}
	</button>
);
