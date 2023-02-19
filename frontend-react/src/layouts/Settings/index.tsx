import { LayoutBase } from "../";
import { ButtonCancel } from "../../components/Button/Cancel";

export const LayoutSettings = ({ children }) => {
	const { revoke } = useContext(AuthContext);

	return (
		<LayoutBase>
			<div className="settings-page">
				<div className="container page">
					<div className="row">
						<div className="col-md-6 offset-md-3 col-xs-12">
							<h1 className="text-xs-center">Your Settings</h1>

							{children}

							<hr />

							<ButtonCancel onClick={revoke}>
								Or click here to logout.
							</ButtonCancel>
						</div>
					</div>
				</div>
			</div>
		</LayoutBase>
	);
};
