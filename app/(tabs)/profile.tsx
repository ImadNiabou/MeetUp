import { Stack } from 'expo-router';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Button } from '~/components/Button';
import { useState, useEffect } from 'react';
import { ScreenContent } from '~/components/ScreenContent';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { session } = useAuth();
  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <View className="flex-1 gap-3 bg-white p-6">
      <Stack.Screen options={{ title: 'Profile' }} />
      <TextInput
        editable={false}
        className="rounded-md border border-gray-400 p-3 text-gray-500"
        label="Email"
        onChangeText={(text) => setUsername(text)}
        value={session.user.email}
        placeholder="email"
        autoCapitalize={'none'}
      />
      <TextInput
        className="rounded-md border border-gray-500 p-3"
        label="Email"
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="username"
        autoCapitalize={'none'}
      />
      <TextInput
        className="rounded-md border border-gray-500 p-3"
        label="Email"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        placeholder="full name"
        autoCapitalize={'none'}
      />
      <TextInput
        className="rounded-md border border-gray-400 p-3"
        label="Email"
        onChangeText={(text) => setWebsite(text)}
        value={website}
        placeholder="website"
        autoCapitalize={'none'}
      />
      <Pressable
        className="rounded-lg border border-red-400 p-4 "
        disabled={loading}
        onPress={() =>
          updateProfile({ username, website, avatar_url: avatarUrl, full_name: fullName })
        }>
        <Text className="text-center text-lg font-semibold text-red-400">Save</Text>
      </Pressable>
      <Pressable className="rounded-xl bg-red-400 p-4 px-8" onPress={() => supabase.auth.signOut()}>
        <Text className="text-center text-xl font-semibold text-white"> Sign out</Text>
      </Pressable>
    </View>
  );
}
