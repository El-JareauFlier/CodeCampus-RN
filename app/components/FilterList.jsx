import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterList = ({ items, selected, onSelect }) => (
  <View style={styles.scrollContainer}>
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
  scrollContainer: {
    display: 'flex',
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'none',
  },
  filterItem: {
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: '',  
    minHeight: 32,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3498db',
    marginLeft: 4,
    marginBottom: 4,
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
