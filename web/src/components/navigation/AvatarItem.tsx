import { Show } from "solid-js";

import { STORAGE_KEYS } from "../../utilities/constants";

export const AvatarItem = (props) => {
  const activeLinkClasses = "active nav-link";
  const inactiveLinkClasses = "nav-link";

  const hasToken = window.localStorage.getItem(STORAGE_KEYS.Token);
  const userInformation = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.User) ?? "{}"
  );

  const profileHref = `/@${userInformation.username}`;
  const isActive = window.location.pathname === profileHref;

  return (
    <>
      <Show when={!!hasToken}>
        <a
          class={isActive ? activeLinkClasses : inactiveLinkClasses}
          href={profileHref}
        >
          <img class="user-pic" src={userInformation.image} />
          &nbsp;
          {userInformation.username}
        </a>
      </Show>
    </>
  );
};
