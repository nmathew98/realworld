export const ButtonAction = ({ onClick, icon, children }) => (
	<button onClick={onClick} className="btn btn-sm btn-outline-primary">
		<i className={icon}></i>
		&nbsp;{children}
	</button>
);
