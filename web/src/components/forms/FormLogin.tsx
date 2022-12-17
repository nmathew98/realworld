import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

import { Resources } from "../../resources/api";
import { STORAGE_KEYS } from "../../utilities/constants";

export const FormLogin = (props) => {
  const [loginDetails, setLoginDetails] = createStore({
    email: null,
    password: null,
  });
  const [errors, setErrors] = createSignal([]);

  const onClickSignIn = async (event: MouseEvent) => {
    event.stopImmediatePropagation();
    event.preventDefault();

    const result = await Resources.Auth.login({
      user: {
        email: loginDetails.email,
        password: loginDetails.password,
      },
    });

    if (!result) {
      setErrors(["Unexpected error occurred"]);
    }

    if (result) {
      window.localStorage.setItem(
        "conduit-user",
        JSON.stringify(result, null, 2)
      );
      window.localStorage.setItem(STORAGE_KEYS.Token, result.token);

      window.location.pathname = "/";
    }
  };

  return (
    <>
      <ul id="errors" class="error-messages">
        <For each={errors()}>{(item) => <li>{item}</li>}</For>
      </ul>

      <form>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Email"
            value={loginDetails.email}
            onChange={(event: any) =>
              setLoginDetails("email", event.target.value)
            }
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={(event: any) =>
              setLoginDetails("password", event.target.value)
            }
          />
        </fieldset>
        <button
          type="submit"
          onClick={onClickSignIn}
          class="btn btn-lg btn-primary pull-xs-right"
        >
          Sign in
        </button>
      </form>
    </>
  );
};
