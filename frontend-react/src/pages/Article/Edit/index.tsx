import { Title } from "react-head";

import { LayoutArticle } from "../../../layouts/Article";

export const ArticleEdit = () => (
	<LayoutArticle>
		<Title>Editor - {BRAND_NAME}</Title>
		<Body />
	</LayoutArticle>
);

const Body = () => <></>;
