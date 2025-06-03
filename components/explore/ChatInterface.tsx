import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons name="robot" size={24} color="#3B82F6" />
          <Text variant="titleMedium" style={styles.headerTitle}>
            CityZen AI Assistant
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.messagesContainer}>
        <View style={styles.messageAI}>
          <Text style={styles.messageText}>
            Hello CityZen! I'm Zen, your dedicated AI assistant. How can I help
            you today?
          </Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#A0AEC0"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <MaterialCommunityIcons name="send" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    right: 16,
    width: "90%",
    maxWidth: 350,
    height: 450,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
  },
  header: {
    padding: 16,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 12,
    fontWeight: "600",
    color: "black",
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  messageAI: {
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    maxWidth: "85%",
  },
  messageText: {
    color: "#1E293B",
    fontSize: 14,
  },
  inputContainer: {
    padding: 12,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sendButton: {
    backgroundColor: "#3B82F6",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});

export default ChatInterface;
