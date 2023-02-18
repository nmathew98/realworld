import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { FormButtonCancel } from ".";

describe("<FormButtonCancel />", () => {
	afterEach(() => {
		cleanup();
	});

	it("is clickable", () => {
		const onClick = vi.fn();

		render(
			<FormButtonCancel onClick={onClick}>
				Or click here to logout.
			</FormButtonCancel>,
		);

		const cancelButton = screen.getByText("Or click here to logout.");

		fireEvent.click(cancelButton);

		expect(onClick).toBeCalledTimes(1);
	});
});
