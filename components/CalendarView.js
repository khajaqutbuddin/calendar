import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { View, StyleSheet, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function CalendarView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointment, setAppointment] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem("appointments");
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error("Error while get Appointments ");
    }
  };

  const handleDateSelect = (day) => {
    setModalVisible(!modalVisible);
    setSelectedDate(day.dateString);
  };
  const SavedAppointment = async () => {
    if (!appointment.trim()) return;

    try {
      const updatedAppointments = { ...appointments };
      if (!updatedAppointments[selectedDate]) {
        updatedAppointments[selectedDate] = [];
      }
      updatedAppointments[selectedDate].push(appointment);
      await AsyncStorage.setItem(
        "appointments",
        JSON.stringify(updatedAppointments)
      );
      setAppointments(updatedAppointments);
      setModalVisible(!modalVisible);
      setAppointment(" ");
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Calendar
          enableSwipeMonths={true}
          onDayPress={(day) => handleDateSelect(day)}
          theme={{
            todayTextColor: "white",
            todayBackgroundColor: "green",
            arrowColor: "black",
          }}
        />
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.container}>
            <View style={styles.appointmentTitle}>
          
              <Text> Add Appointment </Text>
            </View>
            <View>
          
              <Text> Enter Appointment for {selectedDate} </Text>
            </View>

            <TextInput
              style={styles.input}
              onChangeText={setAppointment}
              value={appointment}
              placeholder="Appointment text "
            />
            <Button title="Save" onPress={SavedAppointment} />
            <Button title="Cancle" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  appointmentTitle: {
    padding: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
