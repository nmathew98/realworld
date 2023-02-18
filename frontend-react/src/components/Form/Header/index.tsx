export const FormHeader = ({ title, subtitle, subtitleHref }) => (
	<>
		<h1 className="text-xs-center">{title}</h1>
		<p className="text-xs-center">
			<a href={subtitleHref}>{subtitle}</a>
		</p>
	</>
);
