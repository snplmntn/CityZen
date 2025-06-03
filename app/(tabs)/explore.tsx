import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Divider,
  IconButton,
  RadioButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

const HomeScreen = () => {
  const { colors } = useTheme();
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [activePoll, setActivePoll] = useState<number | null>(null);

  const toggleContact = (category: string) => {
    setExpandedContact(expandedContact === category ? null : category);
  };

  const togglePoll = (index: number) => {
    setActivePoll(activePoll === index ? null : index);
  };

  return (
    <Surface style={styles.rootContainer} elevation={0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header - Keeping the existing header */}
        <View style={styles.header}>
          <View style={styles.headerIcons}>
            <IconButton icon="magnify" size={24} onPress={() => {}} />
            <IconButton icon="bell" size={24} onPress={() => {}} />
          </View>
        </View>

        {/* Alert Banner */}
        <Card style={styles.alertBanner}>
          <Card.Content style={styles.alertContent}>
            <View style={styles.alertRow}>
              <MaterialCommunityIcons
                name="alert"
                size={24}
                color="#EF4444"
                style={styles.alertIcon}
              />
              <Text style={styles.alertTitle}>1.2km Nearby Incident</Text>
            </View>
            <Text style={styles.alertText}>
              Fire reported at Gen. Luna Avenue. Tap for details.
            </Text>
          </Card.Content>
        </Card>

        {/* AI Safety Tips Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge">AI-Powered Safety Tips</Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            <Card style={[styles.tipCard, { backgroundColor: "#3B82F6" }]}>
              <Card.Content>
                <View style={styles.tipContent}>
                  <MaterialCommunityIcons
                    name="umbrella"
                    size={24}
                    color="white"
                    style={styles.tipIcon}
                  />
                  <View>
                    <Text variant="titleMedium" style={styles.whiteText}>
                      Flood Safety
                    </Text>
                    <Text style={styles.tipText}>
                      Stay informed about weather alerts and avoid flood-prone
                      areas during heavy rain.
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <Card style={[styles.tipCard, { backgroundColor: "#22C55E" }]}>
              <Card.Content>
                <View style={styles.tipContent}>
                  <MaterialCommunityIcons
                    name="shield"
                    size={24}
                    color="white"
                    style={styles.tipIcon}
                  />
                  <View>
                    <Text variant="titleMedium" style={styles.whiteText}>
                      Personal Security
                    </Text>
                    <Text style={styles.tipText}>
                      Stay alert in crowded areas and keep valuables secure when
                      in public spaces.
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <Card style={[styles.tipCard, { backgroundColor: "#8B5CF6" }]}>
              <Card.Content>
                <View style={styles.tipContent}>
                  <MaterialCommunityIcons
                    name="car"
                    size={24}
                    color="white"
                    style={styles.tipIcon}
                  />
                  <View>
                    <Text variant="titleMedium" style={styles.whiteText}>
                      Road Safety
                    </Text>
                    <Text style={styles.tipText}>
                      Drive cautiously during peak hours and be aware of traffic
                      conditions.
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>

        {/* Emergency Contacts Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Emergency Contacts
          </Text>

          <Card style={styles.contactCard}>
            <TouchableOpacity onPress={() => toggleContact("police")}>
              <View style={styles.contactHeader}>
                <View style={styles.contactTitleRow}>
                  <View
                    style={[
                      styles.contactIconBg,
                      { backgroundColor: "#EBF5FF" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="shield"
                      size={20}
                      color="#3B82F6"
                    />
                  </View>
                  <Text variant="titleMedium">Police</Text>
                </View>
                <MaterialCommunityIcons
                  name={
                    expandedContact === "police" ? "chevron-up" : "chevron-down"
                  }
                  size={24}
                  color="#9CA3AF"
                />
              </View>
            </TouchableOpacity>

            {expandedContact === "police" && (
              <View style={styles.contactDetail}>
                <Divider />
                <View style={styles.contactItem}>
                  <View>
                    <Text variant="titleSmall">Emergency Hotline</Text>
                    <Text style={styles.contactSubtitle}>Available 24/7</Text>
                  </View>
                  <Button
                    mode="contained"
                    style={styles.callButton}
                    labelStyle={styles.buttonLabel}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    911
                  </Button>
                </View>
                <View style={styles.contactItem}>
                  <View>
                    <Text variant="titleSmall">Local Police Station</Text>
                    <Text style={styles.contactSubtitle}>
                      San Mateo District
                    </Text>
                  </View>
                  <Button
                    mode="contained"
                    style={styles.callButton}
                    labelStyle={styles.buttonLabel}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    Call
                  </Button>
                </View>
              </View>
            )}
          </Card>

          <Card style={styles.contactCard}>
            <TouchableOpacity onPress={() => toggleContact("fire")}>
              <View style={styles.contactHeader}>
                <View style={styles.contactTitleRow}>
                  <View
                    style={[
                      styles.contactIconBg,
                      { backgroundColor: "#FEF2F2" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="fire"
                      size={20}
                      color="#EF4444"
                    />
                  </View>
                  <Text variant="titleMedium">Fire Department</Text>
                </View>
                <MaterialCommunityIcons
                  name={
                    expandedContact === "fire" ? "chevron-up" : "chevron-down"
                  }
                  size={24}
                  color="#9CA3AF"
                />
              </View>
            </TouchableOpacity>

            {expandedContact === "fire" && (
              <View style={styles.contactDetail}>
                <Divider />
                <View style={styles.contactItem}>
                  <View>
                    <Text variant="titleSmall">Fire Emergency</Text>
                    <Text style={styles.contactSubtitle}>Available 24/7</Text>
                  </View>
                  <Button
                    mode="contained"
                    color="#EF4444"
                    style={[styles.callButton, { backgroundColor: "#EF4444" }]}
                    labelStyle={styles.buttonLabel}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    911
                  </Button>
                </View>
              </View>
            )}
          </Card>

          <Card style={styles.contactCard}>
            <TouchableOpacity onPress={() => toggleContact("medical")}>
              <View style={styles.contactHeader}>
                <View style={styles.contactTitleRow}>
                  <View
                    style={[
                      styles.contactIconBg,
                      { backgroundColor: "#ECFDF5" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="medical-bag"
                      size={20}
                      color="#10B981"
                    />
                  </View>
                  <Text variant="titleMedium">Medical Services</Text>S{" "}
                </View>
                <MaterialCommunityIcons
                  name={
                    expandedContact === "medical"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={24}
                  color="#9CA3AF"
                />
              </View>
            </TouchableOpacity>

            {expandedContact === "medical" && (
              <View style={styles.contactDetail}>
                <Divider />
                <View style={styles.contactItem}>
                  <View>
                    <Text variant="titleSmall">Medical Emergency</Text>
                    <Text style={styles.contactSubtitle}>Available 24/7</Text>
                  </View>
                  <Button
                    mode="contained"
                    color="#10B981"
                    style={[styles.callButton, { backgroundColor: "#10B981" }]}
                    labelStyle={styles.buttonLabel}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    911
                  </Button>
                </View>
              </View>
            )}
          </Card>
        </View>

        {/* Awareness Campaigns */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Awareness Campaigns
          </Text>
          <Card style={styles.campaignCard}>
            <Image
              source={{
                uri: "https://readdy.ai/api/search-image?query=A%20community%20safety%20awareness%20campaign%20event%20with%20people%20gathered%20around%20information%20booths%2C%20vibrant%20banners%20and%20educational%20materials%2C%20warm%20lighting%2C%20diverse%20crowd%20of%20participants%2C%20urban%20setting%2C%20community%20engagement%20atmosphere&width=800&height=400&seq=1&orientation=landscape",
              }}
              style={styles.campaignImage}
            />
            <View style={styles.campaignOverlay} />
            <View style={styles.campaignContent}>
              <Text variant="titleLarge" style={styles.whiteText}>
                Community Safety Month
              </Text>
              <Text style={styles.campaignDate}>
                June 5-30, 2025 • San Mateo Safety Council
              </Text>
              <Button
                mode="contained"
                style={styles.learnMoreButton}
                labelStyle={styles.learnMoreLabel}
                onPress={() => {}}
              >
                Learn More
              </Button>
            </View>
          </Card>
        </View>

        {/* Community Polls */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Community Polls & Surveys
          </Text>
          <Card style={styles.pollCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.pollTitle}>
                Have you noticed road damage in your area?
              </Text>

              <TouchableOpacity
                style={[
                  styles.pollOption,
                  activePoll === 0 && styles.pollOptionActive,
                ]}
                onPress={() => togglePoll(0)}
              >
                <RadioButton
                  value="significant"
                  status={activePoll === 0 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(0)}
                  color={colors.primary}
                />
                <Text style={styles.pollOptionText}>
                  Yes, significant damage
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pollOption,
                  activePoll === 1 && styles.pollOptionActive,
                ]}
                onPress={() => togglePoll(1)}
              >
                <RadioButton
                  value="minor"
                  status={activePoll === 1 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(1)}
                  color={colors.primary}
                />
                <Text style={styles.pollOptionText}>Yes, minor damage</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pollOption,
                  activePoll === 2 && styles.pollOptionActive,
                ]}
                onPress={() => togglePoll(2)}
              >
                <RadioButton
                  value="none"
                  status={activePoll === 2 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(2)}
                  color={colors.primary}
                />
                <Text style={styles.pollOptionText}>No damage observed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pollOption,
                  activePoll === 3 && styles.pollOptionActive,
                ]}
                onPress={() => togglePoll(3)}
              >
                <RadioButton
                  value="unsure"
                  status={activePoll === 3 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(3)}
                  color={colors.primary}
                />
                <Text style={styles.pollOptionText}>Not sure</Text>
              </TouchableOpacity>

              <View style={styles.pollFooter}>
                <Text style={styles.pollVotes}>243 votes</Text>
                <Button mode="contained" onPress={() => {}}>
                  Submit
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerIcons: {
    flexDirection: "row",
  },
  section: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  horizontalScroll: {
    marginLeft: -8,
    paddingLeft: 8,
  },
  alertBanner: {
    backgroundColor: "#FEF2F2",
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  alertContent: {
    padding: 8,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertIcon: {
    marginRight: 8,
  },
  alertTitle: {
    fontWeight: "bold",
    color: "#B91C1C",
  },
  alertText: {
    color: "#B91C1C",
    marginTop: 4,
  },
  tipCard: {
    width: 250,
    marginRight: 12,
    elevation: 2,
  },
  tipContent: {
    flexDirection: "row",
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  tipText: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  whiteText: {
    color: "white",
  },
  contactCard: {
    marginBottom: 12,
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  contactTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactIconBg: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  contactDetail: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  contactSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  callButton: {
    borderRadius: 20,
  },
  buttonLabel: {
    fontSize: 12,
  },
  campaignCard: {
    height: 200,
    position: "relative",
  },
  campaignImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  campaignOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 8,
  },
  campaignContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  campaignDate: {
    color: "#E5E7EB",
    marginBottom: 8,
    fontSize: 12,
  },
  learnMoreButton: {
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  learnMoreLabel: {
    color: "#3B82F6",
  },
  pollCard: {
    marginBottom: 16,
  },
  pollTitle: {
    marginBottom: 16,
  },
  pollOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 8,
  },
  pollOptionActive: {
    backgroundColor: "#EBF5FF",
    borderColor: "#BFDBFE",
  },
  pollOptionText: {
    marginLeft: 8,
  },
  pollFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  pollVotes: {
    color: "#6B7280",
    fontSize: 12,
  },
});

export default HomeScreen;
