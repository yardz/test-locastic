import { authSelectors } from 'store/authReducer';
import { useSelector } from 'react-redux';

type Auth = 'pristine' | 'authenticated' | 'unauthenticated';
export function useAuth(): Auth {
	return useSelector(authSelectors.authState);
}
