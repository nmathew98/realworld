import React from "react";

export const AuthContext = React.createContext(Object.create(null));

export const AuthProvider = ({ children }) => {
	const [status, setStatus] = useState(AUTHENTICATION_STATUS.Unauthenticated);
	const [token, setToken] = useState<string | null>(null);

	const onAuthenticationSuccess = useCallback(
		result => {
			if (!import.meta.env.API && result?.token) {
				window.localStorage.setItem(STORAGE_KEYS.Token, result.token);

				setToken(result.token);
			} else {
				setToken(null);
			}

			setStatus(AUTHENTICATION_STATUS.Authenticated);
		},
		[setToken, setStatus],
	);
	const onAuthenticationError = useCallback(() => {
		setToken(null);
		setStatus(AUTHENTICATION_STATUS.Unauthenticated);
	}, [setToken, setStatus]);

	const register = Resources.User.create;
	const authenticate = Resources.User.read.login;

	const verify = () => {
		if (!import.meta.env.API) {
			const token = window.localStorage.getItem(STORAGE_KEYS.Token);

			if (token) onAuthenticationSuccess({ token });
			else onAuthenticationError();
		} else {
			Resources.Auth.read
				.verify({ body: null })
				.then(onAuthenticationSuccess)
				.catch(onAuthenticationError);
		}
	};

	useEffect(verify, []);

	return (
		<AuthContext.Provider
			value={useMemo(
				() => ({
					register,
					authenticate,
					revoke: onAuthenticationError,
					verify,
					onAuthenticationSuccess,
					onAuthenticationError,
					isAuthenticated:
						!!token || status === AUTHENTICATION_STATUS.Authenticated,
				}),
				[
					register,
					authenticate,
					verify,
					onAuthenticationSuccess,
					onAuthenticationError,
					token,
					status,
				],
			)}>
			{children}
		</AuthContext.Provider>
	);
};
