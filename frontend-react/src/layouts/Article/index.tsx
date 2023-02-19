import { LayoutBase } from "../";

export const LayoutArticle = ({
	Header,
	ActionBar,
	CommentForm,
	CommentCards,
	children,
}) => {
	return (
		<LayoutBase>
			<div className="article-page">
				<div className="banner">
					<div className="container">
						<Header />
					</div>
					<div className="container page">
						<div className="row article-content">{children}</div>

						<hr />

						<div className="article-actions">
							<div className="article-meta">
								<ActionBar />
							</div>
						</div>

						<div className="row">
							<div className="col-xs-12 col-md-8 offset-md-2">
								<CommentForm />

								<CommentCards />
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutBase>
	);
};
