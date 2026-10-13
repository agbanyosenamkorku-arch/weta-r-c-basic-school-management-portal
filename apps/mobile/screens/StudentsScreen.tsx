import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StudentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <Text style={styles.item}>Jane Doe - Grade 7A</Text>
      <Text style={styles.item}>John Mensah - Grade 6B</Text>
      <Text style={styles.item}>Ama Boateng - Grade 5A</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10 },
});
