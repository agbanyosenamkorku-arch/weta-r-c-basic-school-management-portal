import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AttendanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      <Text style={styles.item}>Present: 27</Text>
      <Text style={styles.item}>Absent: 2</Text>
      <Text style={styles.item}>Late: 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10 },
});
