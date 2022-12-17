import { createSignal, onMount, Show } from "solid-js";

import { STORAGE_KEYS } from "../../utilities/constants";

export const AvatarItem = (props) => {
  const activeLinkClasses = "active nav-link";
  const inactiveLinkClasses = "nav-link";

  const [hasToken, setHasToken] = createSignal(false);
  const [userInformation, setUserInformation] = createSignal(
    Object.create(null)
  );
  const [isActive, setIsActive] = createSignal(false);
  const [profileHref, setProfileHref] = createSignal("");

  onMount(() => {
    const _userInformation = JSON.parse(
      window.localStorage.getItem(STORAGE_KEYS.User) ?? "{}"
    );
    const _profileHref = `/@${_userInformation.username}`;

    setHasToken(!!window.localStorage.getItem(STORAGE_KEYS.Token));
    setUserInformation(_userInformation);
    setIsActive(window.location.pathname === _profileHref);
    setProfileHref(_profileHref);
  });

  return (
    <>
      <Show when={!!hasToken}>
        <a
          class={isActive() ? activeLinkClasses : inactiveLinkClasses}
          href={profileHref()}
        >
          <img class="user-pic" src={userInformation().image} />
          &nbsp;
          {userInformation().username}
        </a>
      </Show>
    </>
  );
};
