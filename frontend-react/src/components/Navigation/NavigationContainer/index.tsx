export const NavigationContainer = ({ brandName, children }) => (
	<nav className="navbar navbar-light">
		<div className="container">
			<a className="navbar-brand" href="/">
				{brandName}
			</a>
			<ul className="nav navbar-nav pull-xs-right">{children}</ul>
		</div>
	</nav>
);
