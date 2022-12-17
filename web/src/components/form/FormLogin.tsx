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

    if (result.errors) {
      const combinedErrors = Object.keys(result.errors).map(
        (key) => `${key}: ${result.errors[key]}`
      );

      setErrors(combinedErrors);

      return;
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

  const onChangeEmail = (event: any) =>
    setLoginDetails("email", event.target.value);
  const onChangePassword = (event: any) =>
    setLoginDetails("password", event.target.value);

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
            onChange={onChangeEmail}
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={onChangePassword}
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
