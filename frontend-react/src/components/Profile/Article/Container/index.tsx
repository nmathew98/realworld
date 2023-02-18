// Navigation = TabContainer + TabItem
export const ProfileArticleContainer = ({ Navigation, children }) => (
	<div className="container">
		<div className="row">
			<div className="col-xs-12 col-md-10 offset-md-1">
				<Navigation />

				{children}
			</div>
		</div>
	</div>
);
