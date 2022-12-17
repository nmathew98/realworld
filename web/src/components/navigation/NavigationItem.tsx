import { createSignal, onMount, Show } from "solid-js";

import { STORAGE_KEYS } from "../../utilities/constants";

export const NavigationItem = (props) => {
  const activeLinkClasses = "active nav-link";
  const inactiveLinkClasses = "nav-link";

  const [hasToken, setHasToken] = createSignal(false);
  const [isActive, setIsActive] = createSignal(false);

  const isVisible = () => {
    if (props.requiresAuth && !hasToken()) return false;
    if (props.hideIfAuthenticated && hasToken()) return false;

    return true;
  };

  onMount(() => {
    setIsActive(window.location.pathname === props.href);
    setHasToken(!!window.localStorage.getItem(STORAGE_KEYS.Token));
  });

  return (
    <>
      <Show when={isVisible()}>
        <a
          class={isActive() ? activeLinkClasses : inactiveLinkClasses}
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
