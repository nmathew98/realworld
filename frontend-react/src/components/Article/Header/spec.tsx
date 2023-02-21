import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { format } from "date-fns";

import { ArticleHeader } from ".";

describe("<ArticleHeader />", () => {
	afterEach(() => {
		cleanup();
	});

	it("createdAt is formatted like 'January 29th'", () => {
		const currentDate = new Date();

		render(<ArticleHeader createdAt={currentDate} />);

		const expectedFormat = format(currentDate, "LLLL wo");

		expect(screen.getByText(expectedFormat)).toBeTruthy();
	});
});
