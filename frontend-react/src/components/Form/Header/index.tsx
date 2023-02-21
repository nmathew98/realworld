import { Link } from "react-router-dom";

export const FormHeader = ({ title, subtitle, subtitleHref }) => (
	<>
		<h1 className="text-xs-center">{title}</h1>
		<p className="text-xs-center">
			<Link to={subtitleHref}>{subtitle}</Link>
		</p>
	</>
);
