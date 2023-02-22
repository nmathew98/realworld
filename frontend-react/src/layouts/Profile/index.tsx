import { LayoutBase } from "../";
import { ProfileHeader } from "../../components/Profile/Header";

// ArticleNavigation = ArticleTabContainer + ArticleTabItem
export const LayoutProfile = ({ children }) => {
	const { profile } = useContext(UserContext);

	return (
		<LayoutBase>
			<div className="profile-page">
				<div className="user-info">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-10 offset-md-1">
								{!profile ? null : (
									<ProfileHeader
										username={profile.username}
										bio={profile.bio}
										image={profile.image}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-10 offset-md-1">{children}</div>
					</div>
				</div>
			</div>
		</LayoutBase>
	);
};
