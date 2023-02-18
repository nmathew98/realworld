export const SidebarContainer = ({ title, children }) => (
	<div className="sidebar">
		<p>{title}</p>
		<div className="tag-list">{children}</div>
	</div>
);
