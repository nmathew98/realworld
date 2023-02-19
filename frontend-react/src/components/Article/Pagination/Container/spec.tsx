import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { PaginationContainer } from ".";
import { PaginationItem } from "../Item";

describe("<PaginationContainer />", () => {
	afterEach(() => {
		cleanup();
	});

	it("is clickable", () => {
		const onClick = vi.fn();

		render(
			<PaginationContainer>
				<PaginationItem onClick={onClick}>Hello world</PaginationItem>
			</PaginationContainer>,
		);

		const tab = screen.getByText("Hello world");

		fireEvent.click(tab);

		expect(onClick).toBeCalledTimes(1);
	});

	it("controls which tab is currently marked as active", () => {
		render(
			<PaginationContainer>
				<PaginationItem>Hello world</PaginationItem>
				<PaginationItem>!!!</PaginationItem>
			</PaginationContainer>,
		);

		const firstTabItemInitial = screen.getByText("Hello world");
		const secondTabItemInitial = screen.getByText("!!!");

		expect(firstTabItemInitial).toBeTruthy();
		expect(secondTabItemInitial).toBeTruthy();

		{
			fireEvent.click(firstTabItemInitial);

			const firstTabItemFinal = screen.getByText("Hello world");
			const secondTabItemFinal = screen.getByText("!!!");

			expect(firstTabItemFinal.parentNode.className).toContain("active");
			expect(secondTabItemFinal.parentNode.className).not.toContain("active");
		}

		{
			fireEvent.click(secondTabItemInitial);

			const firstTabItemFinal = screen.getByText("Hello world");
			const secondTabItemFinal = screen.getByText("!!!");

			expect(firstTabItemFinal.parentNode.className).not.toContain("active");
			expect(secondTabItemFinal.parentNode.className).toContain("active");
		}
	});

	it("renders native dom elements correctly", () => {
		render(
			<PaginationContainer>
				<PaginationItem>Hello world</PaginationItem>
				<PaginationItem>!!!</PaginationItem>
				<span>AHHH!!!</span>
			</PaginationContainer>,
		);

		expect(screen.getByText("AHHH!!!")).toBeTruthy();
	});
});
