import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState(courseData || []);

  useEffect(() => {
    let filtered = courseData || [];

    // Filter by tab
    if (activeTab === 'beginner') {
      filtered = filtered.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter((course) => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, activeTab, courseData]);

  return (
    <View style={styles.dashboard}>
      <View style={styles.tabContainer}>
        <TextInput
          placeholder='search...'
          clearButtonMode='always'
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="rgba(0,0,0,0.4)"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
        >
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText,
              ]}
            >
              Alle Cursussen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'beginner' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('beginner')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'beginner' && styles.activeTabText,
              ]}
            >
              Voor Beginners
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'gevorderd' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('gevorderd')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'gevorderd' && styles.activeTabText,
              ]}
            >
              Gevorderd
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'populair' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('populair')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'populair' && styles.activeTabText,
              ]}
            >
              Meest Bekeken
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {activeTab === 'all'
            ? 'Alle Cursussen'
            : activeTab === 'beginner'
            ? 'Cursussen voor Beginners'
            : activeTab === 'gevorderd'
            ? 'Gevorderde Cursussen'
            : 'Meest Bekeken Cursussen'}
        </Text>

        <CourseList courses={filteredCourses} />

        <View style={styles.sidebarContainer}>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f1f3f5',
  },
  tabScroll: {
    paddingHorizontal: 15,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f1f3f5',
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  sidebarContainer: {
    marginTop: 20,
  },
});

export default Dashboard;