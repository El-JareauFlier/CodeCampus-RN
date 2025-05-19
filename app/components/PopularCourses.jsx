import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PopularCourses = ({ courses }) => {
  const [expanded, setExpanded] = useState(false);

  const topCourses = Array.isArray(courses)
    ? [...courses].sort((a, b) => b.views - a.views).slice(0, 3)
    : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
        <Text style={styles.title}>
          Populaire Cursussen {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {expanded && (
        Array.isArray(topCourses) && topCourses.length > 0 ? (
          <FlatList
            data={topCourses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.popularItem}>
                <Text style={styles.popularTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.popularViews}>{item.views} views</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyText}>Geen cursusgegevens beschikbaar</Text>
        )
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
  popularItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  popularTitle: {
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  popularViews: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    padding: 10,
  },
});

export default PopularCourses;