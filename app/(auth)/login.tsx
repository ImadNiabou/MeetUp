import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, AppState, TextInput, Pressable, Text } from 'react-native';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="flex-1 gap-3 p-5 pt-10">
      <Stack.Screen options={{ title: 'Sign in' }} />
      <TextInput
        className="rounded-md border border-gray-400 p-3"
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={'none'}
      />
      <TextInput
        label="Password"
        className="rounded-md border border-gray-400 p-3"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={'none'}
      />
      <View className="flex-row gap-2">
        <Pressable
          className="flex-1 rounded-lg border border-red-400 p-5"
          disabled={loading}
          onPress={() => signInWithEmail()}>
          <Text className="text-center text-lg font-semibold text-red-400">Sign In</Text>
        </Pressable>
        <Pressable
          className="flex-1 rounded-lg bg-red-400 p-5 text-white "
          disabled={loading}
          onPress={() => signUpWithEmail()}>
          <Text className="text-center text-lg font-semibold text-white">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
