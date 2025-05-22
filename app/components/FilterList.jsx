import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterList = ({ items, selected, onSelect }) => (
  <View>
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
  </View>
);

const styles = StyleSheet.create({
  filterItem: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#f1f3f5',
  },
  selectedItem: {
    backgroundColor: '#3498db',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default FilterList;