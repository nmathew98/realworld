import React from "react";
import { render, screen } from "@testing-library/react";

import { Test } from ".";

describe("<Test />", () => {
	it("renders", () => {
		render(<Test />);

		expect(screen.getByText("Hello world!")).toBeTruthy();
	});
});
