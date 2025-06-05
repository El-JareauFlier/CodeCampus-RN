import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import courses from '../data/_coursesData.js';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const course = courses.find(c => String(c.id) === String(id));

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Cursus niet gevonden.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: course.imageUrl }} style={styles.image} />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
          <Text style={{ marginRight: 16, fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Niveau:</Text> {course.level}
          </Text>
          <Text style={{ marginRight: 16, fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Duur:</Text> {course.duration}
          </Text>
          <Text style={{ marginRight: 16, fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Leden:</Text> {course.members}
          </Text>
          <Text style={{ marginRight: 16, fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Weergaven:</Text> {course.views}
          </Text>
          <Text style={{ fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Rating:</Text> ⭐ {course.rating}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Categorieën</Text>
        {course.categories && course.categories.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
            {course.categories.map((cat, idx) => (
              <Text
                key={idx}
                style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  marginRight: 8,
                  marginBottom: 4,
                  fontSize: 13,
                }}
              >
                {cat}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={{ color: '#aaa', marginBottom: 8 }}>Geen categorieën beschikbaar.</Text>
        )}

        {course.videoUrl && (
          <TouchableOpacity
            style={{
              backgroundColor: '#3498db',
              padding: 14,
              borderRadius: 8,
              marginTop: 16,
              alignItems: 'center',
            }}
            onPress={() => Linking.openURL(course.videoUrl)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Bekijk video</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 220 },
  backBtn: {
    position: 'absolute',
    top: 36,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#666', marginBottom: 16 },
  sectionTitle: { fontWeight: 'bold', marginTop: 10, marginBottom: 4 },
  goal: { marginLeft: 8, marginBottom: 2, fontSize: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});