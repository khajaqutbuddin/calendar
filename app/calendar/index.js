import { View, Text } from "react-native";
import CalendarView from "../../components/CalendarView";
// import CalendarView from "../../components/CalendarView";

export default function CalendarScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Select a Date
      </Text>
      <CalendarView />
    </View>
  );
}
