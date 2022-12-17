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

  const isActive = window.location.pathname === props.href;

  return (
    <>
      <Show when={isVisible()}>
        <a
          class={isActive ? activeLinkClasses : inactiveLinkClasses}
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
