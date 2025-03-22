import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem("appointments");
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);

        const formattedAppointments = Object.entries(parsedAppointments).map(
          ([date, appts]) => ({ date, appts })
        );
        setAppointments(formattedAppointments);
      }
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  const handleClearAppointments = async () => {
    await AsyncStorage.removeItem("appointments");
    Alert.alert("Appointments Clear", "All Appointments are Clear", [
      {
        text: "OK",
        onPress: () => router.push("/"),
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointments}>No appointments found.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dateText}>{item.date}</Text>
              {item.appts.map((appt, index) => (
                <Text key={index} style={styles.apptText}>
                  • {appt}
                </Text>
              ))}
            </View>
          )}
        />
      )}

      <View
        style={{
          position: "absolute", // Absolute positioning
          bottom: 16, // Distance from the bottom
          left: 16, // Distance from the left
          flexDirection: "row", // Align Text and Button horizontally
          alignItems: "center", // Center items vertically
        }}
      >
        <Text style={{ marginRight: 8 }}>Clear All Appointments:</Text>
        <Button title="Delete" onPress={handleClearAppointments} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  noAppointments: { textAlign: "center", marginTop: 20, fontSize: 16 },
  card: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  dateText: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  apptText: { fontSize: 16 },
});
