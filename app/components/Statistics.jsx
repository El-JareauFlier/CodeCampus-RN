import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Statistics = ({ courses }) => {
  const [expanded, setExpanded] = useState(false);
  const isValidData = Array.isArray(courses);

  const getTotalMembers = () => {
    if (!isValidData) return 0;
    return courses.reduce((total, course) => total + (course.members || 0), 0);
  };

  const getTotalViews = () => {
    if (!isValidData) return 0;
    return courses.reduce((total, course) => total + (course.views || 0), 0);
  };

  const getAverageRating = () => {
    try {
      const avg =
        courses.reduce((total, course) => total + (course.rating || 0), 0) /
        courses.length;
      return isNaN(avg) ? '0.0' : avg.toFixed(1);
    } catch (error) {
      console.warn('Error bij het berekenen van gemiddelde rating:', error);
      return '0.0';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
        <Text style={styles.title}>
          Statistieken {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Totaal Leden</Text>
            <Text style={styles.statValue}>{getTotalMembers()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Totaal Weergaven</Text>
            <Text style={styles.statValue}>{getTotalViews()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Gemiddelde Rating</Text>
            <Text style={styles.statValue}>⭐ {getAverageRating()}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#f39c12',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '30%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  statValue: {
    fontWeight: '600',
    fontSize: 16,
    color: '#3498db',
  },
});

export default Statistics;