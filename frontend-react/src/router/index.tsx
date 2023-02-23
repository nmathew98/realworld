import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Navigate,
} from "react-router-dom";

import { SignIn as _SignIn } from "../pages/Auth/SignIn";
import { SignUp as _SignUp } from "../pages/Auth/SignUp";
import { Home as _Home } from "../pages/Home";
import { Profile as _Profile } from "../pages/Profile";
import { grace, cho, rigsby } from "./hooks";

const NoMatch = () => <div>Ahhh!!!</div>;

export const redirect = hook => Component =>
	function ComponentWithRedirect(props) {
		const from = new URL(window.location.href);
		const details = hook(from, props);

		if (details?.redirect && details?.to)
			return <Navigate to={details.to} replace />;

		return <Component {...props} />;
	};

const hideIfAuth = redirect(cho);
const checkValidity = redirect(rigsby);
const analytics = redirect(grace);

const Home = analytics(checkValidity(_Home));
const Profile = checkValidity(_Profile);
const SignIn = hideIfAuth(_SignIn);
const SignUp = hideIfAuth(_SignUp);

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route index element={<Home />} />
			<Route path="/login" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
			<Route path="/:username" element={<Profile />} />
			<Route path="*" element={<NoMatch />} />
		</>,
	),
);
