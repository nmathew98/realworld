import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

import { Resources } from "../../resources/api";
import { STORAGE_KEYS } from "../../utilities/constants";

export const FormRegister = (props) => {
  const [registrationDetails, setRegistrationDetails] = createStore({
    username: null,
    email: null,
    password: null,
  });
  const [errors, setErrors] = createSignal([]);

  const onClickSignUp = async (event: MouseEvent) => {
    event.stopImmediatePropagation();
    event.preventDefault();

    const result = await Resources.Auth.register({
      user: {
        username: registrationDetails.username,
        email: registrationDetails.email,
        password: registrationDetails.password,
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

  const onChangeUsername = (event: any) =>
    setRegistrationDetails("username", event.target.value);
  const onChangeEmail = (event: any) =>
    setRegistrationDetails("email", event.target.value);
  const onChangePassword = (event: any) =>
    setRegistrationDetails("password", event.target.value);

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
            placeholder="Username"
            value={registrationDetails.username}
            onChange={onChangeUsername}
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Email"
            value={registrationDetails.email}
            onChange={onChangeEmail}
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="password"
            placeholder="Password"
            value={registrationDetails.password}
            onChange={onChangePassword}
          />
        </fieldset>
        <button
          type="submit"
          onClick={onClickSignUp}
          class="btn btn-lg btn-primary pull-xs-right"
        >
          Sign up
        </button>
      </form>
    </>
  );
};
