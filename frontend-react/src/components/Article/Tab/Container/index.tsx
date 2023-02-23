import React from "react";

export const ArticleTabContainer = ({ type = "feed", children }) => {
	const [activeTabIdx, setActiveTabIdx] = useState(0);

	useEffect(() => {
		const activeChild = React.Children.toArray(children)
			.map((child, index) => [!!child.props?.isActive, index])
			.filter(([isActive]) => Boolean(isActive))
			.flat()
			.pop();

		setActiveTabIdx(activeChild);
	}, []);

	return (
		<div className={`${type}-toggle`}>
			<ul className="nav nav-pills outline-active">
				{React.Children.map(children, (child, index) => {
					if (!child || typeof child.type === "string") return child;

					const onClick = () => {
						setActiveTabIdx(index);
						child.props.onClick?.(index);
					};

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
