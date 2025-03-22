import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome to Calendar</Text>
     <View>
       <Button title="Go to Calendar" onPress={() => router.push("/calendar")} />
      </View>
     
     <View style={{paddingTop:20}}>
       <Button  title="View Appointments"  onPress={() => router.push("/appointments")} />
      </View>
    </View>
  );
}
