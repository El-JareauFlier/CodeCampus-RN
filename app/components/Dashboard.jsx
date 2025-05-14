import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    if (activeTab === 'all') {
      return courseData;
    } else if (activeTab === 'beginner') {
      return courseData.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      return courseData.filter((course) => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      return [...courseData].sort((a, b) => b.views - a.views);
    }

    return courseData;
  };

  return (
    <View style={styles.dashboard}>
      <View style={styles.tabContainer}>
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

        <CourseList courses={filteredCourses()} />

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
