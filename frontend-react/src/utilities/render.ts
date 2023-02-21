import { MemoryRouter } from "react-router-dom";
import { render as testingLibraryRender } from "@testing-library/react";

export const render = (...args: any[]) =>
	testingLibraryRender(...args, { wrapper: MemoryRouter });
