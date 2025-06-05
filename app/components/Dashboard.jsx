import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';
import FilterList from './FilterList';

const filterItems = [
  'all',
  'beginner',
  'gevorderd',
  'populair',
  'favorieten', // nieuw
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
  favorieten: 'Favorieten', // nieuw
};

const Dashboard = ({ courseData, navigation }) => {
  const [activeTabs, setActiveTabs] = useState(['all']);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('populariteit');
  const [selectedCategories, setSelectedCategories] = useState([]); // NEW
  const [favorites, setFavorites] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Extract unique categories from courseData
  const categories = Array.from(
    new Set((courseData || []).flatMap(course => course.categories || []))
  );

  // Load filters on mount
  useEffect(() => {
    AsyncStorage.getItem('activeTabs').then((value) => {
      if (value) {
        try {
          setActiveTabs(JSON.parse(value));
        } catch (e) {
          setActiveTabs(['all']);
        }
      }
    });
  }, []);

  // Save filters when they change
  useEffect(() => {
    AsyncStorage.setItem('activeTabs', JSON.stringify(activeTabs));
  }, [activeTabs]);

  // Load favorites on mount
  useEffect(() => {
    AsyncStorage.getItem('favorites').then((value) => {
      if (value) setFavorites(JSON.parse(value));
    });
  }, []);

  // Save favorites when they change
  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load selected categories on mount
  useEffect(() => {
    AsyncStorage.getItem('selectedCategories').then((value) => {
      if (value) {
        try {
          setSelectedCategories(JSON.parse(value));
        } catch (e) {
          setSelectedCategories([]);
        }
      }
    });
  }, []);

  // Save selected categories when they change
  useEffect(() => {
    AsyncStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  const toggleFavorite = (courseId) => {
    setFavorites((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let filtered = courseData;

    // Filtering by multiple tabs
    if (!activeTabs.includes('all')) {
      filtered = filtered.filter((course) => {
        if (activeTabs.includes('beginner') && course.level === 'Beginner') return true;
        if (activeTabs.includes('gevorderd') && course.level === 'Gevorderd') return true;
        if (activeTabs.includes('populair')) return true;
        if (activeTabs.includes('favorieten') && favorites.includes(course.id)) return true; // nieuw
        return false;
      });
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course =>
        selectedCategories.every(cat =>
          (course.categories || []).includes(cat)
        )
      );
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting logic
    if (sortBy === 'populariteit' || activeTabs.includes('populair')) {
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
                selected={activeTabs.map((key) => filterLabels[key])}
                onSelect={(label) => {
                  const key = Object.keys(filterLabels).find(
                    (a) => filterLabels[a] === label
                  );
                  setActiveTabs((prev) => {
                    if (key === 'all') return ['all'];
                    let next = prev.includes(key)
                      ? prev.filter((k) => k !== key)
                      : [...prev.filter((k) => k !== 'all'), key];
                    if (next.length === 0) next = ['all'];
                    return next;
                  });
                }}
              />

              {/* CATEGORY FILTER LIST */}
              <Text style={styles.modalTitle}>Categorieën</Text>
              <FilterList
                items={categories}
                selected={selectedCategories}
                onSelect={(category) => {
                  setSelectedCategories((prev) =>
                    prev.includes(category)
                      ? prev.filter((c) => c !== category)
                      : [...prev, category]
                  );
                }}
              />

              <Text style={styles.modalTitle}>Sort by</Text>
              <View style={{
                backgroundColor: '#f6fafd',
                borderRadius: 8,
                padding: 8,
              }}
              >
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      paddingVertical: 8,
                      paddingHorizontal: 0,
                    }}
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

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity
                  style={[styles.closeBtn, { flex: 1, marginRight: 10 }]}
                  onPress={() => setFilterMenuVisible(false)}
                >
                  <Text style={styles.closeBtnText}>apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.resetBtn, { flex: 1, marginLeft: 10 }]}
                  onPress={() => {
                    setActiveTabs(['all']);
                    setSelectedCategories([]);
                    setSortBy('populariteit');
                    setSearchQuery('');
                  }}
                >
                  <Text style={styles.resetBtnText}>reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {activeTabs.map((key) => filterLabels[key]).join(', ')}
        </Text>

        <CourseList
          courses={filteredCourses()}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onPressCourse={course => navigation.navigate('CourseDetail', { course })}
        />

        <View style={styles.sidebarContainer}>
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </View>
      </View>

      {/* Detail Modal */}
      <Modal
        visible={!!selectedCourse}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedCourse(null)}
      >
        <View style={styles.detailModalOverlay}>
          <View style={styles.detailModalContent}>
            <ScrollView>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginBottom: 10 }}
                onPress={() => setSelectedCourse(null)}
              >
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              {selectedCourse && (
                <>
                  <Image
                    source={{ uri: selectedCourse.imageUrl }}
                    style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 16 }}
                    resizeMode="cover"
                  />
                  <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
                    {selectedCourse.title}
                  </Text>
                  <Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
                    {selectedCourse.description}
                  </Text>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Leerdoelen:</Text>
                  {selectedCourse.goals && selectedCourse.goals.length > 0 ? (
                    selectedCourse.goals.map((goal, idx) => (
                      <Text key={idx} style={{ marginLeft: 8, marginBottom: 2 }}>• {goal}</Text>
                    ))
                  ) : (
                    <Text style={{ marginLeft: 8, marginBottom: 8, color: '#aaa' }}>Geen leerdoelen beschikbaar.</Text>
                  )}
                  {/* Voeg hier meer relevante info toe indien gewenst */}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'flex-end', // push to bottom
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 20,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resetBtn: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 20,

  },
  resetBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  filterItem: {
    paddingVertical: 6, // was 12
    paddingHorizontal: 12, // was 12 or 16
    borderRadius: 8,
    marginVertical: 2, // was 4
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#3498db',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14, // add or adjust as needed
  },
  selectedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14, // add or adjust as needed
  },
  selectedText2: {
    color: '#3498db',
    fontWeight: '700',
    fontSize: 14, // add or adjust as needed
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
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '85%',
    elevation: 5,
  },
});

export default Dashboard;