import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default NotificationBadge = ({ count }) => {
  return (
    <View className="bg-red-700 rounded-xl w-5 h-5 justify-center items-center absolute -right-5 -top-3">
      <Text className="text-white font-bold">{count}</Text>
    </View>
  );
};