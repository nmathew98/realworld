import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { HeadProvider } from "react-head";

import { router } from "./router";
import { Context } from "./context";

export const App = ({ children }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<HeadProvider>
				<Context>
					<RouterProvider router={router}>{children}</RouterProvider>
				</Context>
			</HeadProvider>
		</QueryClientProvider>
	);
};
