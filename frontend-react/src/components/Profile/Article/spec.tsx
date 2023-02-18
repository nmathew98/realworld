import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { format } from "date-fns";

import { ProfileArticle } from ".";

describe("<ProfileArticle />", () => {
	afterEach(() => {
		cleanup();
	});

	it("createdAt is formatted like 'January 29th'", () => {
		const currentDate = new Date();

		render(<ProfileArticle createdAt={currentDate} />);

		const expectedFormat = format(currentDate, "LLLL wo");

		expect(screen.getByText(expectedFormat)).toBeTruthy();
	});
});
