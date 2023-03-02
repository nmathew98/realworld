import { createRouter, eventHandler } from "h3";

export const Tags = createRouter().get(
	"/tags",
	eventHandler(() => "Hi from tags"),
);
