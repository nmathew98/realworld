import React from "react";

export const PaginationContainer = ({ children }) => {
	const [activePage, setActivePage] = useState(0);

	return (
		<ul className="pagination">
			{React.Children.map(children, (child, index) => {
				const onClick = useCallback(() => {
					setActivePage(index);
					child.props.onClick?.(index);
				}, [index, setActivePage]);

				if (typeof child.type === "string") return child;

				return React.cloneElement(child, {
					...child.props,
					isActive: activePage === index,
					onClick,
				});
			})}
		</ul>
	);
};
