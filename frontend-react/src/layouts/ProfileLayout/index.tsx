// ArticleNavigation = ArticleTabContainer + ArticleTabItem
export const ProfileLayout = ({ ArticleNavigation, Header, children }) => {
	return (
		<>
			<div className="profile-page">
				<div className="user-info">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-10 offset-md-1">
								<Header />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-10 offset-md-1">
							<ArticleNavigation />

							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
