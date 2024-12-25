import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { supabase } from '~/utils/supabase';
export default function Participant() {
  const { id } = useLocalSearchParams();
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    fetchParticipants();
  }, [id]);

  const fetchParticipants = async () => {
    const { data } = await supabase
      .from('Participation')
      .select('*, profiles(*)')
      .eq('event_id', id);
    setParticipants(data);
    console.log(participants);
  };
  return (
    <View>
      <FlatList
        data={participants}
        renderItem={({ item }) => (
          <View>
            <Text>{item.profiles.full_name || 'User'}</Text>
          </View>
        )}
      />
    </View>
  );
}
