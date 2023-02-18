import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { format } from "date-fns";

import { CommentCard } from ".";

describe("<CommentCard />", () => {
	afterEach(() => {
		cleanup();
	});

	it("createdAt is formatted like 'Jan 29th'", () => {
		const currentDate = new Date();

		render(<CommentCard createdAt={currentDate} />);

		const expectedFormat = format(currentDate, "LLL wo");

		expect(screen.getByText(expectedFormat)).toBeTruthy();
	});
});
