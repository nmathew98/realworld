import React from "react";
import { useMutation } from "react-query";

export const AuthContext = React.createContext(Object.create(null));

export const AuthProvider = ({ children }) => {
	const [status, setStatus] = useState(AUTHENTICATION_STATUS.Unauthenticated);
	const [token, setToken] = useState<string | null>(null);

	const onAuthenticationSuccess = useCallback(
		result => {
			setToken(result?.token);
			setStatus(AUTHENTICATION_STATUS.Authenticated);
		},
		[setToken, setStatus],
	);
	const onAuthenticationError = useCallback(() => {
		setToken(null);
		setStatus(AUTHENTICATION_STATUS.Unauthenticated);
	}, [setToken, setStatus]);

	const register = useMutation(Resources.User.create, {
		onSuccess: onAuthenticationSuccess,
		onError: onAuthenticationError,
	});
	const authenticate = useMutation(Resources.User.read.login, {
		onSuccess: onAuthenticationSuccess,
		onError: onAuthenticationError,
	});

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
					verify,
					onAuthenticationError,
					isAuthenticated:
						!!token || status === AUTHENTICATION_STATUS.Authenticated,
				}),
				[register, authenticate, verify, onAuthenticationError, token, status],
			)}>
			{children}
		</AuthContext.Provider>
	);
};
