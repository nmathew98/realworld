import { Icon } from "../../Icon";

export const NavigationItem = ({ href, icon, isActive, children }) => (
	<li className="nav-item">
		<a className={joinClasses(isActive, "nav-link", "active")} href={href}>
			<Icon name={icon} />
			&nbsp;{children}
		</a>
	</li>
);
