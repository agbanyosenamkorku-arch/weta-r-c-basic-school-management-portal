import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Students</Text>
        <Text style={styles.value}>1,285</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Teachers</Text>
        <Text style={styles.value}>84</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Classes</Text>
        <Text style={styles.value}>32</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
});
