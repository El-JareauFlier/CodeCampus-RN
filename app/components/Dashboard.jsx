import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';
import FilterList from './FilterList';

const filterItems = [
  'all',
  'beginner',
  'gevorderd',
  'populair',
];

const sortOptions = [
  { key: 'populariteit', label: 'Populariteit' },
  { key: 'rating', label: 'Rating' },
  { key: 'duur', label: 'Duur' },
];

const filterLabels = {
  all: 'Alle Cursussen',
  beginner: 'Voor Beginners',
  gevorderd: 'Gevorderd',
  populair: 'Meest Bekeken',
};

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('populariteit'); // <-- Added sortBy state

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = courseData;

    if (activeTab === 'beginner') {
      filtered = filtered.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gevorderd') {
      filtered = filtered.filter((course) => course.level === 'Gevorderd');
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting logic
    if (sortBy === 'populariteit') {
      filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'duur') {
      filtered = [...filtered].sort((a, b) => (a.duration || 0) - (b.duration || 0));
    }

    return filtered;
  };

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

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterMenuVisible(true)}
        >
          <Ionicons name="filter" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.filterBtnText}>Filters</Text>
        </TouchableOpacity>

        <Modal
          visible={filterMenuVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setFilterMenuVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filters</Text>
              <FilterList
                items={filterItems.map((item) => filterLabels[item])}
                selected={filterLabels[activeTab]}
                onSelect={(label) => {
                  const key = Object.keys(filterLabels).find(
                    (a) => filterLabels[a] === label
                  );
                  setActiveTab(key);
                  setFilterMenuVisible(false);
                }}
              />

              <Text style={styles.modalTitle}>Sort by</Text>
              <View>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.filterItem,
                      { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' } // Always transparent
                    ]}
                    onPress={() => setSortBy(option.key)}
                  >
                    <View style={[
                      styles.checkbox,
                      sortBy === option.key && styles.checkboxChecked
                    ]}>
                      {sortBy === option.key && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                    <Text style={[
                      styles.filterText,
                      sortBy === option.key && styles.selectedText2,
                      { marginLeft: 8 }
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setFilterMenuVisible(false)}
              >
                <Text style={styles.closeBtnText}>Sluiten</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {filterLabels[activeTab]}
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 0,
    backgroundColor: '#f1f3f5',
  },
  filterBtn: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 0,
  },
  filterBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'left',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  filterItem: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
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
   selectedText2: {
    color: '#3498db',
    fontWeight: '700',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3498db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
});

export default Dashboard;