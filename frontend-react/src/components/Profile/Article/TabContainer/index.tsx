import React from "react";

export const ProfileArticleTabContainer = ({ children }) => {
	const [activeTabIdx, setActiveTabIdx] = useState(0);

	return (
		<div className="articles-toggle">
			<ul className="nav nav-pills outline-active">
				{React.Children.map(children, (child, index) => {
					if (typeof child.type === "string") return child;

					const onClick = useCallback(
						() => setActiveTabIdx(index),
						[setActiveTabIdx],
					);

					return React.cloneElement(child, {
						...child.props,
						isActive: activeTabIdx === index,
						onClick,
					});
				})}
			</ul>
		</div>
	);
};
