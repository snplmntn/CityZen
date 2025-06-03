import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

// Import data
import exploreData from "../../data/exploreData.json";

// Import styles
import { exploreStyles as styles } from "../../styles/exploreStyles";

// Import components
import AlertBanner from "../../components/explore/AlertBanner";
import CampaignCard from "../../components/explore/CampaignCard";
import ChatInterface from "../../components/explore/ChatInterface";
import EmergencyContactCard from "../../components/explore/EmergencyContactCard";
import LegalResourceCard from "../../components/explore/LegalResourceCard";
import PollCard from "../../components/explore/PollCard";
import SafetyTipCard from "../../components/explore/SafetyTipCard";
import VolunteerCard from "../../components/explore/VolunteerCard";
import SidebarMenu from "../../components/SidebarMenu";
import TopBar from "../../components/TopBar";

const HomeScreen = () => {
  const { colors } = useTheme();
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [activePoll, setActivePoll] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleContact = (category: string) => {
    setExpandedContact(expandedContact === category ? null : category);
  };

  const togglePoll = (index: number) => {
    setActivePoll(activePoll === index ? null : index);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  // All the data dictionaries are now imported from the JSON file
  const {
    safetyTips,
    emergencyContacts,
    pollOptions,
    legalResources,
    volunteerOpportunities,
  } = exploreData;

  return (
    <Surface style={styles.rootContainer} elevation={0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Use the TopBar component instead of the inline header */}
        <TopBar title="Explore" onMenuPress={() => setSidebarVisible(true)} />

        {/* Alert Banner */}
        <AlertBanner />

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
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {safetyTips.map((tip, index) => (
              <SafetyTipCard
                key={index}
                {...{
                  ...tip,
                  // Type assertion for the icon property
                  icon: tip.icon as ComponentProps<
                    typeof MaterialCommunityIcons
                  >["name"],
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Emergency Contacts Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Emergency Contacts
          </Text>

          {emergencyContacts.map((contact) => (
            <EmergencyContactCard
              key={contact.category}
              {...{
                ...contact,
                // Type assertion for the icon property
                icon: contact.icon as ComponentProps<
                  typeof MaterialCommunityIcons
                >["name"],
              }}
              expanded={expandedContact === contact.category}
              onToggle={() => toggleContact(contact.category)}
            />
          ))}
        </View>

        {/* Awareness Campaigns */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Awareness Campaigns
          </Text>
          <CampaignCard />
        </View>

        {/* Community Polls */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Community Polls & Surveys
          </Text>
          <PollCard
            question="Have you noticed road damage in your area?"
            options={pollOptions}
            votes={243}
            selectedOption={activePoll}
            onSelect={togglePoll}
          />
        </View>

        {/* Legal Resources */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Citizen Legal Resources
          </Text>
          {legalResources.map((resource, index) => (
            <LegalResourceCard key={index} {...resource} />
          ))}
        </View>

        {/* Volunteer Opportunities */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Volunteer Opportunities
          </Text>
          <View style={styles.volunteerGrid}>
            {volunteerOpportunities.map((opportunity, index) => (
              <VolunteerCard key={index} {...opportunity} />
            ))}
          </View>
        </View>

        {/* AI Incident Patterns - Added from first component */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            AI-Detected Incident Patterns
          </Text>
          <Card style={styles.incidentCard}>
            <Card.Content>
              <View style={styles.incidentHeader}>
                <View style={styles.incidentTabs}>
                  <Button
                    mode="contained"
                    style={styles.incidentTabActive}
                    labelStyle={styles.incidentTabLabelActive}
                  >
                    Weekly
                  </Button>
                  <Button
                    mode="outlined"
                    style={styles.incidentTab}
                    labelStyle={styles.incidentTabLabel}
                    onPress={() => setActiveTab("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button
                    mode="outlined"
                    style={styles.incidentTab}
                    labelStyle={styles.incidentTabLabel}
                    onPress={() => setActiveTab("yearly")}
                  >
                    Yearly
                  </Button>
                </View>
                <IconButton icon="dots-vertical" size={20} onPress={() => {}} />
              </View>
              <View style={styles.chartContainer}>
                <Image
                  source={{
                    uri: "https://readdy.ai/api/search-image?query=A%20clean%2C%20minimalist%20data%20visualization%20showing%20incident%20trends%20with%20bar%20charts%20and%20line%20graphs%2C%20blue%20and%20orange%20color%20scheme%2C%20white%20background%2C%20professional%20analytics%20dashboard%20style%2C%20no%20text%20labels%2C%20simple%20grid%20lines%2C%20data%20points%20clearly%20marked&width=600&height=300&seq=2&orientation=landscape",
                  }}
                  style={styles.chartImage}
                />
              </View>
              <View style={styles.incidentFilters}>
                <Button
                  mode="contained"
                  style={styles.incidentFilterActive}
                  labelStyle={styles.incidentFilterLabelActive}
                >
                  All
                </Button>
                <Button
                  mode="outlined"
                  style={styles.incidentFilter}
                  labelStyle={styles.incidentFilterLabel}
                >
                  Fire
                </Button>
                <Button
                  mode="outlined"
                  style={styles.incidentFilter}
                  labelStyle={styles.incidentFilterLabel}
                >
                  Traffic
                </Button>
                <Button
                  mode="outlined"
                  style={styles.incidentFilter}
                  labelStyle={styles.incidentFilterLabel}
                >
                  Crime
                </Button>
                <Button
                  mode="outlined"
                  style={styles.incidentFilter}
                  labelStyle={styles.incidentFilterLabel}
                >
                  Hazard
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        style={[styles.chatButton, { backgroundColor: colors.primary }]}
        onPress={toggleChat}
      >
        <MaterialCommunityIcons name="robot" size={24} color="white" />
      </TouchableOpacity>

      {/* AI Chatbot Panel */}
      {chatOpen && <ChatInterface onClose={toggleChat} />}

      {/* Sidebar Menu */}
      <SidebarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        userName="John Doe"
      />
    </Surface>
  );
};

export default HomeScreen;
