import React from "react";
import { useMutation } from "react-query";

export const AuthContext = React.createContext(Object.create(null));

export const AuthProvider = ({ children }) => {
	const [status, setStatus] = useState(AUTHENTICATION_STATUS.Unauthenticated);
	const [token, setToken] = useState<string | null>(null);

	const register = useMutation(Resources.User.create, {
		onSuccess: result => {
			setToken(result.token);
			setStatus(AUTHENTICATION_STATUS.Authenticated);
		},
		onError: () => {
			setToken(null);
			setStatus(AUTHENTICATION_STATUS.Unauthenticated);
		},
	});
	const authenticate = useMutation(Resources.User.read.login, {
		onSuccess: result => {
			setToken(result.token);
			setStatus(AUTHENTICATION_STATUS.Authenticated);
		},
		onError: () => {
			setToken(null);
			setStatus(AUTHENTICATION_STATUS.Unauthenticated);
		},
	});

	const verify = () => {
		if (!import.meta.env.API) {
			const token = window.localStorage.getItem(STORAGE_KEYS.Token);

			if (token) {
				setToken(token);
				setStatus(AUTHENTICATION_STATUS.Authenticated);
			} else {
				setToken(null);
				setStatus(AUTHENTICATION_STATUS.Unauthenticated);
			}
		} else {
			Resources.Auth.read
				.verify({ body: null })
				.then(() => setStatus(AUTHENTICATION_STATUS.Authenticated))
				.catch(() => setStatus(AUTHENTICATION_STATUS.Unauthenticated));
		}
	};

	useEffect(verify, []);

	return (
		<AuthContext.Provider
			value={{
				register,
				authenticate,
				verify,
				isAuthenticated:
					!!token || status === AUTHENTICATION_STATUS.Authenticated,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
