import React from "react";
import { useMutation } from "react-query";

export const AuthContext = React.createContext(Object.create(null));

export const AuthProvider = ({ children }) => {
	const [status, setStatus] = useState(AUTHENTICATION_STATUS.Unauthenticated);
	const [token, setToken] = useState<string | null>(null);

	const logout = () => {
		setToken(null);
		setStatus(AUTHENTICATION_STATUS.Unauthenticated);
	};
	const register = useMutation(Resources.User.create, {
		onSuccess: result => {
			setToken(result.token);
			setStatus(AUTHENTICATION_STATUS.Authenticated);
		},
		onError: logout,
	});
	const authenticate = useMutation(Resources.User.read.login, {
		onSuccess: result => {
			setToken(result.token);
			setStatus(AUTHENTICATION_STATUS.Authenticated);
		},
		onError: logout,
	});

	const verify = () => {
		if (!import.meta.env.API) {
			const token = window.localStorage.getItem(STORAGE_KEYS.Token);

			if (token) {
				setToken(token);
				setStatus(AUTHENTICATION_STATUS.Authenticated);
			} else {
				logout();
			}
		} else {
			Resources.Auth.read
				.verify({ body: null })
				.then(() => setStatus(AUTHENTICATION_STATUS.Authenticated))
				.catch(logout);
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
					logout,
					isAuthenticated:
						!!token || status === AUTHENTICATION_STATUS.Authenticated,
				}),
				[register, authenticate, verify, logout],
			)}>
			{children}
		</AuthContext.Provider>
	);
};
