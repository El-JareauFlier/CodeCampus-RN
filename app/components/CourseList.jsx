import { View, Text, StyleSheet, FlatList } from 'react-native';
import CourseCard from './CourseCard';

const CourseList = ({ courses, favorites = [], onToggleFavorite = () => { }, onPressCourse = () => { } }) => {
  return (
    <View style={styles.container}>
      {courses.length === 0 ? (
        <Text style={styles.emptyMessage}>Geen cursussen gevonden.</Text>
      ) : (
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <CourseCard
                course={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
                onPress={() => onPressCourse(item)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default CourseList;