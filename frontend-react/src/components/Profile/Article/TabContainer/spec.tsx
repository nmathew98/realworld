import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { ProfileArticleTabContainer } from ".";
import { ProfileArticleTabItem } from "../TabItem";

describe("<ProfileArticleTabContainer />", () => {
	afterEach(() => {
		cleanup();
	});

	it("controls which tab is currently marked as active", () => {
		render(
			<ProfileArticleTabContainer>
				<ProfileArticleTabItem>Hello world</ProfileArticleTabItem>
				<ProfileArticleTabItem>!!!</ProfileArticleTabItem>
			</ProfileArticleTabContainer>,
		);

		const firstTabItemInitial = screen.getByText("Hello world");
		const secondTabItemInitial = screen.getByText("!!!");

		expect(firstTabItemInitial).toBeTruthy();
		expect(secondTabItemInitial).toBeTruthy();

		{
			fireEvent.click(firstTabItemInitial);

			const firstTabItemFinal = screen.getByText("Hello world");
			const secondTabItemFinal = screen.getByText("!!!");

			expect(firstTabItemFinal.className).toContain("active");
			expect(secondTabItemFinal.className).not.toContain("active");
		}

		{
			fireEvent.click(secondTabItemInitial);

			const firstTabItemFinal = screen.getByText("Hello world");
			const secondTabItemFinal = screen.getByText("!!!");

			expect(firstTabItemFinal.className).not.toContain("active");
			expect(secondTabItemFinal.className).toContain("active");
		}
	});
});
