import React from "react";

export const ArticleTabContainer = ({ type = "feed", children }) => {
	const [activeTabIdx, setActiveTabIdx] = useState(0);

	return (
		<div className={`${type}-toggle`}>
			<ul className="nav nav-pills outline-active">
				{React.Children.map(children, (child, index) => {
					const onClick = () => {
						setActiveTabIdx(index);
						child.props.onClick?.(index);
					};

					if (!child) return child;

					if (typeof child.type === "string") return child;

					return React.cloneElement(child, {
						...child.props,
						isActive: child.props?.isActive ?? activeTabIdx === index,
						onClick,
					});
				})}
			</ul>
		</div>
	);
};
