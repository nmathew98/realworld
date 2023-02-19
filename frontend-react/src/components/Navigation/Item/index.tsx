import { Icon } from "../../Icon";

export const NavigationItem = ({
	href,
	icon,
	avatar,
	username,
	isActive,
	children,
}) => (
	<li className="nav-item">
		<a className={joinClasses(isActive, "nav-link", "active")} href={href}>
			{(icon || avatar) && (
				<>
					{icon && <Icon name={icon} />}
					{avatar && <img src={avatar} className="user-pic" alt={username} />}
					&nbsp;
				</>
			)}
			{children}
		</a>
	</li>
);
