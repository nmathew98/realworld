import { Title } from "react-head";

import { LayoutAuth } from "../../../layouts/Auth";
import { FormHeader } from "../../../components/Form/Header";
import { FormInput } from "../../../components/Form/Input";
import { FormErrorContainer } from "../../../components/Form/Error/Container";
import { FormErrorItem } from "../../../components/Form/Error/Item";
import { ButtonSubmit } from "../../../components/Button/Submit";
import { useAuthorization } from "../../../hooks/auth/useAuthorization";

export const SignUp = () => {
	const {
		register,
		isErrorRegister,
		errorRegister,
		formErrors,
		onChangeUsername,
		onChangeEmail,
		onChangePassword,
		makeOnSubmitForm,
	} = useAuthorization();

	const onSubmitForm = makeOnSubmitForm((event, form) => {
		register({
			body: {
				user: {
					username: form.username,
					email: form.email,
					password: form.password,
				},
			},
		});
	});

	return (
		<LayoutAuth>
			<Title>Sign up - {BRAND_NAME}</Title>
			<FormHeader
				title="Sign up"
				subtitle="Have an account?"
				subtitleHref="/login"
			/>
			{!isErrorRegister ? null : (
				<FormErrorContainer>
					{formErrors.map(([key, value]) => (
						<FormErrorItem key={key}>{value}</FormErrorItem>
					))}
					{!(errorRegister instanceof AggregateError)
						? null
						: errorRegister?.errors?.map(([key, value]) => (
								<FormErrorItem key={key}>
									{key}&nbsp;{value}
								</FormErrorItem>
						  ))}
					{!(errorRegister instanceof HTTPError) ? null : (
						<FormErrorItem>
							Received status code: {errorRegister.status}&nbsp;-&nbsp;
							{errorRegister.statusText}
						</FormErrorItem>
					)}
				</FormErrorContainer>
			)}
			<form>
				<FormInput
					onChange={onChangeUsername}
					size="lg"
					type="text"
					placeholder="Username"
				/>
				<FormInput
					onChange={onChangeEmail}
					size="lg"
					type="email"
					placeholder="Email"
				/>
				<FormInput
					onChange={onChangePassword}
					size="lg"
					type="password"
					placeholder="Password"
				/>
				<ButtonSubmit onClick={onSubmitForm}>Sign up</ButtonSubmit>
			</form>
		</LayoutAuth>
	);
};
