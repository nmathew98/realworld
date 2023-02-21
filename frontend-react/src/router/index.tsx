import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import { SignIn } from "../pages/Auth/SignIn";
import { SignUp } from "../pages/Auth/SignUp";
import { Home } from "../pages/Home";

const NoMatch = () => <div>Ahhh!!!</div>;

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Home />} />
			<Route path="/login" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
			<Route path="*" element={<NoMatch />} />
		</Route>,
	),
);
