import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import { ProfileArticleContainer } from ".";

describe("<ProfileArticleContainer />", () => {
	afterEach(() => {
		cleanup();
	});

	it("accepts a Navigation prop which is a React component", () => {
		const Navigation = () => <span>Hello world</span>;

		render(
			<ProfileArticleContainer Navigation={Navigation}>
				<span>Hello!</span>
			</ProfileArticleContainer>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(screen.getByText("Hello!")).toBeTruthy();
	});
});
