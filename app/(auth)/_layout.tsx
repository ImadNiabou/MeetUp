import { Stack } from 'expo-router';
import { useAuth } from '~/contexts/AuthProvider';
import { Redirect } from 'expo-router';
export default function AuthLayout() {
  const { isAutenticated } = useAuth;
  if (isAutenticated) {
    return <Redirect href="/" />;
  }
  return <Stack />;
}
