import { LayoutBase } from "../";

export const LayoutArticle = ({ children }) => (
	<LayoutBase>
		<div className="article-page">
			<div className="banner">
				<div className="container">{children?.[0]}</div>
				<div className="container page">
					<div className="row article-content">{children?.[4]}</div>

					<hr />

					<div className="article-actions">
						<div className="article-meta">{children?.[1]}</div>
					</div>

					<div className="row">
						<div className="col-xs-12 col-md-8 offset-md-2">
							{children?.[2]}
							{children?.[3]}
						</div>
					</div>
				</div>
			</div>
		</div>
	</LayoutBase>
);
