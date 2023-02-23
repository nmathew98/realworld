import React from "react";

export const ArticlePaginationContainer = ({ children }) => {
	const [activePage, setActivePage] = useState(null);

	useEffect(() => {
		const activeChild = React.Children.toArray(children)
			.map((child, index) => [!!child.props?.isActive, index])
			.filter(([isActive]) => Boolean(isActive))
			.flat()
			.pop();

		setActivePage(activeChild);
	}, []);

	return (
		<ul className="pagination">
			{React.Children.map(children, (child, index) => {
				if (!child || typeof child.type === "string") return child;

				const onClick = () => {
					setActivePage(index);
					child.props.onClick?.(index);
				};

				return React.cloneElement(child, {
					...child.props,
					isActive: child.props?.isActive ?? activePage === index,
					onClick,
				});
			})}
		</ul>
	);
};
