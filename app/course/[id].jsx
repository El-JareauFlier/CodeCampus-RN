import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
        <Text style={styles.sectionTitle}>Leerdoelen</Text>
        {course.goals && course.goals.length > 0 ? (
          course.goals.map((goal, idx) => (
            <Text key={idx} style={styles.goal}>• {goal}</Text>
          ))
        ) : (
          <Text style={styles.goal}>Geen leerdoelen beschikbaar.</Text>
        )}
        {/* Voeg hier meer relevante info toe */}
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