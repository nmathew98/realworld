import { Show } from "solid-js";

import { STORAGE_KEYS } from "../../utilities/constants";

export const NavigationItem = (props) => {
  const activeLinkClasses = "active nav-link";
  const inactiveLinkClasses = "nav-link";
  const hasToken = window.localStorage.getItem(STORAGE_KEYS.Token);

  const isVisible = () => {
    if (props.requiresAuth && !hasToken) return false;
    if (props.hideIfAuthenticated && hasToken) return false;

    return true;
  };

  return (
    <>
      <Show when={isVisible()}>
        <a
          class={props.isActive ? activeLinkClasses : inactiveLinkClasses}
          href={props.href}
        >
          {!!props.icon && (
            <>
              <i class={props.icon} />
              &nbsp;
            </>
          )}
          {props.title}
        </a>
      </Show>
    </>
  );
};
