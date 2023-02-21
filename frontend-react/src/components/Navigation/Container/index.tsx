import { Link } from "react-router-dom";

export const NavigationContainer = ({ brandName, children }) => (
	<nav className="navbar navbar-light">
		<div className="container">
			<Link className="navbar-brand" to="/">
				{brandName}
			</Link>
			<ul className="nav navbar-nav pull-xs-right">{children}</ul>
		</div>
	</nav>
);
