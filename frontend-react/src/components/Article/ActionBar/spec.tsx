import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { format } from "date-fns";

import { ArticleActionBar } from ".";

describe("<ArticleActionBar />", () => {
	afterEach(() => {
		cleanup();
	});

	it("createdAt is formatted like 'January 29th'", () => {
		const currentDate = new Date();

		render(<ArticleActionBar createdAt={currentDate} />);

		const expectedFormat = format(currentDate, "LLLL wo");

		expect(screen.getByText(expectedFormat)).toBeTruthy();
	});
});
