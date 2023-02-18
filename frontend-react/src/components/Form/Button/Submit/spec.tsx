import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { FormButtonSubmit } from ".";

describe("<FormButtonSubmit />", () => {
	afterEach(() => {
		cleanup();
	});

	it("is clickable", () => {
		const onClick = vi.fn();

		render(<FormButtonSubmit onClick={onClick}>Submit</FormButtonSubmit>);

		const cancelButton = screen.getByText("Submit");

		fireEvent.click(cancelButton);

		expect(onClick).toBeCalledTimes(1);
	});
});
