export const ArticleTabItem = ({ isActive, onClick, children }) => (
	<li className="nav-item">
		<a
			className={joinClasses(isActive, "nav-link", "active")}
			onClick={onClick}>
			{children}
		</a>
	</li>
);
