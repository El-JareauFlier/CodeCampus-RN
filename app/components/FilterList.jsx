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
            isSelected && styles.selectedItem,
            !isSelected && styles.unselectedItem,
          ]}
          activeOpacity={0.8}
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
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 20,
    backgroundColor: '#f6fafd',
    marginBottom: 20,
  },
  filterItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    marginBottom: 8,
    minHeight: 36,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#3498db',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    transition: 'all 0.2s',
  },
  selectedItem: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  unselectedItem: {
    backgroundColor: '#fff',
    borderColor: '#3498db',
  },
  filterText: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default FilterList;
