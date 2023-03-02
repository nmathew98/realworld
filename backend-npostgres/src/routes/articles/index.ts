import { createRouter, eventHandler } from "h3";

export const Articles = createRouter().get(
	"/articles",
	eventHandler(() => "Hi from articles"),
);
