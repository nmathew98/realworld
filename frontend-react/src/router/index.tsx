import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";

import { SignIn as _SignIn } from "../pages/Auth/SignIn";
import { SignUp as _SignUp } from "../pages/Auth/SignUp";
import { Home as _Home } from "../pages/Home";
import { Profile as _Profile } from "../pages/Profile";
import { ifAuthenticated, ifIncorrectParams } from "./hooks";

const REDIRECT_PATH = Date.now();

const NoMatch = () => <div>Ahhh!!!</div>;

const Redirect = () => {
	const location = useLocation();

	return <Navigate to={location.state.to} replace />;
};

export const redirect = hook => Component =>
	function ComponentWithRedirect(props) {
		const from = new URL(window.location.href);
		const details = hook(from);

		if (details?.redirect && details?.to)
			return (
				<Navigate to={`/${REDIRECT_PATH}`} state={{ to: details.to }} replace />
			);

		return <Component {...props} />;
	};

const hideIfAuth = redirect(ifAuthenticated);
const checkValidity = redirect(ifIncorrectParams);

const Home = checkValidity(_Home);
const Profile = checkValidity(_Profile);
const SignIn = hideIfAuth(_SignIn);
const SignUp = hideIfAuth(_SignUp);

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Home />} />
			<Route path={`${REDIRECT_PATH}`} element={<Redirect />} />
			<Route path="login" element={<SignIn />} />
			<Route path="register" element={<SignUp />} />
			<Route path="profile">
				<Route path=":username" element={<Profile />} />
			</Route>
			<Route path="*" element={<NoMatch />} />
		</Route>,
	),
);
