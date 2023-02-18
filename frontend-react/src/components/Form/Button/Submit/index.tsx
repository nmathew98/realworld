export const FormButtonSubmit = ({ onClick, children }) => (
	<button onClick={onClick} className="btn btn-lg btn-primary pull-xs-right">
		{children}
	</button>
);
