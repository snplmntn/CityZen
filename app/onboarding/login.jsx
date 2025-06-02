import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1e3a8a", "#000000"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Logo */}
          <View style={styles.logo}>
            <FontAwesome name="shield" size={60} color="#93c5fd" />
          </View>

          {/* Login Title */}
          <Text style={styles.title}>Login</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {/* Email */}
            <View style={styles.inputWrapper}>
              <FontAwesome name="envelope" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email Address Input"
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <FontAwesome name="lock" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Password Input"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel="Toggle Password Visibility"
              >
                <FontAwesome
                  name={showPassword ? "eye-slash" : "eye"}
                  color="#ccc"
                  size={18}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          {/* OR Separator */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* OAuth Buttons */}
          <View style={styles.oauthContainer}>
            <TouchableOpacity style={styles.oauthButton}>
              <FontAwesome name="google" color="#fff" size={18} />
              <Text style={styles.oauthText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oauthButton}>
              <FontAwesome name="apple" color="#fff" size={18} />
              <Text style={styles.oauthText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>

          {/* Terms */}
          <View style={styles.terms}>
            <Text style={styles.termsText}>
              By continuing, you agree to our
            </Text>
            <Text style={styles.termsText}>
              <Text style={styles.link}>Terms of Service</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#000000", // Match the end color of gradient
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  logo: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 40,
  },
  inputIcon: {
    color: "#aaa",
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: "#fff",
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 8,
  },
  forgotButton: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#93c5fd",
    fontSize: 14,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 32,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
  separatorText: {
    color: "#ccc",
    marginHorizontal: 8,
    fontSize: 14,
  },
  oauthContainer: {
    gap: 12,
  },
  oauthButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  oauthText: {
    color: "#fff",
    fontSize: 14,
  },
  signUpText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 24,
  },
  signUpLink: {
    color: "#93c5fd",
    fontWeight: "bold",
  },
  terms: {
    marginTop: 16,
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
    color: "#93c5fd",
  },
});
