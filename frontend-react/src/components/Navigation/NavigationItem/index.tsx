import { joinClasses } from "../../../utilities/joinClasses";

export const NavigationItem = ({ href, icon, isActive, children }) => (
	<li className="nav-item">
		<a className={joinClasses(isActive, "nav-link", "active")} href={href}>
			<i className={icon}></i>&nbsp;{children}
		</a>
	</li>
);
