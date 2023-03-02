import { createRouter, eventHandler } from "h3";

export const Profiles = createRouter().get(
	"/profiles",
	eventHandler(() => "Hi from profiles"),
);
