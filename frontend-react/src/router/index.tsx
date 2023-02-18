import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

const Test = () => <div>Hello world!</div>;

const NoMatch = () => <div>Ahhh!!!</div>;

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Test />} />
			<Route path="*" element={<NoMatch />} />
		</Route>,
	),
);
