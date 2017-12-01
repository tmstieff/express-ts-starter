import { AppUser } from '../app_user';

interface AuthLoginResponse {
  token: string,
  user: AppUser
}

export default AuthLoginResponse;
