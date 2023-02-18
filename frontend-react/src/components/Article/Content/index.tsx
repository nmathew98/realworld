import { Markdown } from "../../Markdown";
import { TagContainer } from "../../TagContainer";
import { Tag } from "../../Tag";

export const ArticleContent = ({ text, tags }) => (
	<div className="col-md-12">
		<Markdown>{text}</Markdown>
		<TagContainer>
			{tags.map(tag => (
				<Tag key={tag}>{tag}</Tag>
			))}
		</TagContainer>
	</div>
);
