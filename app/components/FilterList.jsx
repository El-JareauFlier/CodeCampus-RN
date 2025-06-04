import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterList = ({ items, selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
    {items.map((label) => {
      const isSelected = selected.includes(label);
      return (
        <TouchableOpacity
          key={label}
          style={[
            styles.filterItem,
            isSelected && styles.selectedItem
          ]}
          onPress={() => onSelect(label)}
        >
          <Text style={[
            styles.filterText,
            isSelected && styles.selectedText
          ]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  filterItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: '#f1f3f5',  
    minHeight: 32,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#3498db',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 13,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default FilterList;
