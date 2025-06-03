import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

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
    <Surface className="flex-1" elevation={0}>
      <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header - Swapped and replaced icon */}
        <StyledView className="flex-row justify-between items-center p-4">
          <Text variant="displayLarge" className="text-indigo-600">
            Explore
          </Text>
          <StyledView className="flex-row">
            <IconButton icon="bell" size={24} onPress={() => {}} />
            <IconButton icon="cog" size={24} onPress={() => {}} />
          </StyledView>
        </StyledView>

        {/* Alert Banner */}
        <Card className="bg-red-50 mx-4 border-l-4 border-red-500">
          <Card.Content className="p-2">
            <StyledView className="flex-row items-center">
              <MaterialCommunityIcons
                name="alert"
                size={24}
                color="#EF4444"
                className="mr-2"
              />
              <StyledText className="font-bold text-red-800">
                1.2km Nearby Incident
              </StyledText>
            </StyledView>
            <StyledText className="text-red-700 mt-1">
              Fire reported at Gen. Luna Avenue. Tap for details.
            </StyledText>
          </Card.Content>
        </Card>

        {/* AI Safety Tips Section */}
        <StyledView className="my-4 px-4">
          <StyledView className="flex-row justify-between items-center mb-3">
            <Text variant="titleLarge">AI-Powered Safety Tips</Text>
            <StyledTouchableOpacity>
              <StyledText style={{ color: colors.primary }}>See All</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-ml-2 pl-2"
          >
            <Card
              className="w-64 mr-3 elevation-2"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <Card.Content>
                <StyledView className="flex-row">
                  <MaterialCommunityIcons
                    name="umbrella"
                    size={24}
                    color="white"
                    className="mr-3 mt-1"
                  />
                  <StyledView className="flex-1">
                    <Text
                      variant="titleMedium"
                      className="text-white"
                      numberOfLines={1}
                    >
                      Flood Safety
                    </Text>
                    <StyledText
                      className="text-white opacity-80"
                      numberOfLines={3}
                    >
                      Stay informed about weather alerts and avoid flood-prone
                      areas during heavy rain.
                    </StyledText>
                  </StyledView>
                </StyledView>
              </Card.Content>
            </Card>

            <Card
              className="w-64 mr-3 elevation-2"
              style={{ backgroundColor: "#22C55E" }}
            >
              <Card.Content>
                <StyledView className="flex-row">
                  <MaterialCommunityIcons
                    name="shield"
                    size={24}
                    color="white"
                    className="mr-3 mt-1"
                  />
                  <StyledView className="flex-1">
                    <Text
                      variant="titleMedium"
                      className="text-white"
                      numberOfLines={1}
                    >
                      Personal Security
                    </Text>
                    <StyledText
                      className="text-white opacity-80"
                      numberOfLines={3}
                    >
                      Stay alert in crowded areas and keep valuables secure when
                      in public spaces.
                    </StyledText>
                  </StyledView>
                </StyledView>
              </Card.Content>
            </Card>

            <Card
              className="w-64 mr-3 elevation-2"
              style={{ backgroundColor: "#8B5CF6" }}
            >
              <Card.Content>
                <StyledView className="flex-row">
                  <MaterialCommunityIcons
                    name="car"
                    size={24}
                    color="white"
                    className="mr-3 mt-1"
                  />
                  <StyledView className="flex-1">
                    <Text
                      variant="titleMedium"
                      className="text-white"
                      numberOfLines={1}
                    >
                      Road Safety
                    </Text>
                    <StyledText
                      className="text-white opacity-80"
                      numberOfLines={3}
                    >
                      Drive cautiously during peak hours and be aware of traffic
                      conditions.
                    </StyledText>
                  </StyledView>
                </StyledView>
              </Card.Content>
            </Card>
          </StyledScrollView>
        </StyledView>

        {/* Emergency Contacts Section */}
        <StyledView className="my-4 px-4">
          <Text variant="titleLarge" className="mb-3">
            Emergency Contacts
          </Text>

          <Card className="mb-3">
            <StyledTouchableOpacity onPress={() => toggleContact("police")}>
              <StyledView className="flex-row justify-between items-center p-4">
                <StyledView className="flex-row items-center">
                  <StyledView className="p-2 rounded-full bg-blue-50 mr-3">
                    <MaterialCommunityIcons
                      name="shield"
                      size={20}
                      color="#3B82F6"
                    />
                  </StyledView>
                  <Text variant="titleMedium">Police</Text>
                </StyledView>
                <MaterialCommunityIcons
                  name={
                    expandedContact === "police" ? "chevron-up" : "chevron-down"
                  }
                  size={24}
                  color="#9CA3AF"
                />
              </StyledView>
            </StyledTouchableOpacity>

            {expandedContact === "police" && (
              <StyledView className="px-4 pb-4">
                <Divider />
                <StyledView className="flex-row justify-between items-center py-3">
                  <StyledView>
                    <Text variant="titleSmall">Emergency Hotline</Text>
                    <StyledText className="text-xs text-gray-500">
                      Available 24/7
                    </StyledText>
                  </StyledView>
                  <Button
                    mode="contained"
                    className="rounded-full"
                    labelStyle={{ fontSize: 12 }}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    911
                  </Button>
                </StyledView>
                <StyledView className="flex-row justify-between items-center py-3">
                  <StyledView>
                    <Text variant="titleSmall">Local Police Station</Text>
                    <StyledText className="text-xs text-gray-500">
                      San Mateo District
                    </StyledText>
                  </StyledView>
                  <Button
                    mode="contained"
                    className="rounded-full"
                    labelStyle={{ fontSize: 12 }}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    Call
                  </Button>
                </StyledView>
              </StyledView>
            )}
          </Card>

          <Card className="mb-3">
            <StyledTouchableOpacity onPress={() => toggleContact("fire")}>
              <StyledView className="flex-row justify-between items-center p-4">
                <StyledView className="flex-row items-center">
                  <StyledView className="p-2 rounded-full bg-red-50 mr-3">
                    <MaterialCommunityIcons
                      name="fire"
                      size={20}
                      color="#EF4444"
                    />
                  </StyledView>
                  <Text variant="titleMedium">Fire Department</Text>
                </StyledView>
                <MaterialCommunityIcons
                  name={
                    expandedContact === "fire" ? "chevron-up" : "chevron-down"
                  }
                  size={24}
                  color="#9CA3AF"
                />
              </StyledView>
            </StyledTouchableOpacity>

            {expandedContact === "fire" && (
              <StyledView className="px-4 pb-4">
                <Divider />
                <StyledView className="flex-row justify-between items-center py-3">
                  <StyledView>
                    <Text variant="titleSmall">Fire Emergency</Text>
                    <StyledText className="text-xs text-gray-500">
                      Available 24/7
                    </StyledText>
                  </StyledView>
                  <Button
                    mode="contained"
                    className="rounded-full bg-red-500"
                    labelStyle={{ fontSize: 12 }}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    911
                  </Button>
                </StyledView>
              </StyledView>
            )}
          </Card>

          <Card className="mb-3">
            <StyledTouchableOpacity onPress={() => toggleContact("medical")}>
              <StyledView className="flex-row justify-between items-center p-4">
                <StyledView className="flex-row items-center">
                  <StyledView className="p-2 rounded-full bg-green-50 mr-3">
                    <MaterialCommunityIcons
                      name="medical-bag"
                      size={20}
                      color="#10B981"
                    />
                  </StyledView>
                  <Text variant="titleMedium">Medical Services</Text>
                </StyledView>
                <MaterialCommunityIcons
                  name={
                    expandedContact === "medical"
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={24}
                  color="#9CA3AF"
                />
              </StyledView>
            </StyledTouchableOpacity>

            {expandedContact === "medical" && (
              <StyledView className="px-4 pb-4">
                <Divider />
                <StyledView className="flex-row justify-between items-center py-3">
                  <StyledView>
                    <Text variant="titleSmall">Medical Emergency</Text>
                    <StyledText className="text-xs text-gray-500">
                      Available 24/7
                    </StyledText>
                  </StyledView>
                  <Button
                    mode="contained"
                    className="rounded-full bg-green-500"
                    labelStyle={{ fontSize: 12 }}
                    onPress={() => {}}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={16}
                      color="white"
                    />{" "}
                    911
                  </Button>
                </StyledView>
              </StyledView>
            )}
          </Card>
        </StyledView>

        {/* Awareness Campaigns */}
        <StyledView className="my-4 px-4">
          <Text variant="titleLarge" className="mb-3">
            Awareness Campaigns
          </Text>
          <StyledView className="h-48 relative">
            <StyledImage
              source={{
                uri: "https://readdy.ai/api/search-image?query=A%20community%20safety%20awareness%20campaign%20event%20with%20people%20gathered%20around%20information%20booths%2C%20vibrant%20banners%20and%20educational%20materials%2C%20warm%20lighting%2C%20diverse%20crowd%20of%20participants%2C%20urban%20setting%2C%20community%20engagement%20atmosphere&width=800&height=400&seq=1&orientation=landscape",
              }}
              className="w-full h-full rounded-lg"
            />
            <StyledView className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
            <StyledView className="absolute inset-x-0 bottom-0 p-4">
              <Text variant="titleLarge" className="text-white">
                Community Safety Month
              </Text>
              <StyledText className="text-gray-200 text-xs mb-2">
                June 5-30, 2025 • San Mateo Safety Council
              </StyledText>
              <Button
                mode="contained"
                className="bg-white self-start rounded-full"
                labelStyle={{ color: "#3B82F6" }}
                onPress={() => {}}
              >
                Learn More
              </Button>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Community Polls */}
        <StyledView className="my-4 px-4">
          <Text variant="titleLarge" className="mb-3">
            Community Polls & Surveys
          </Text>
          <Card className="mb-4">
            <Card.Content>
              <Text variant="titleMedium" className="mb-4">
                Have you noticed road damage in your area?
              </Text>

              <StyledTouchableOpacity
                className={`flex-row items-center p-2 border rounded-lg mb-2 ${
                  activePoll === 0
                    ? "bg-blue-50 border-blue-200"
                    : "border-gray-200"
                }`}
                onPress={() => togglePoll(0)}
              >
                <RadioButton
                  value="significant"
                  status={activePoll === 0 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(0)}
                  color={colors.primary}
                />
                <StyledText className="ml-2">
                  Yes, significant damage
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className={`flex-row items-center p-2 border rounded-lg mb-2 ${
                  activePoll === 1
                    ? "bg-blue-50 border-blue-200"
                    : "border-gray-200"
                }`}
                onPress={() => togglePoll(1)}
              >
                <RadioButton
                  value="minor"
                  status={activePoll === 1 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(1)}
                  color={colors.primary}
                />
                <StyledText className="ml-2">Yes, minor damage</StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className={`flex-row items-center p-2 border rounded-lg mb-2 ${
                  activePoll === 2
                    ? "bg-blue-50 border-blue-200"
                    : "border-gray-200"
                }`}
                onPress={() => togglePoll(2)}
              >
                <RadioButton
                  value="none"
                  status={activePoll === 2 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(2)}
                  color={colors.primary}
                />
                <StyledText className="ml-2">No damage observed</StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className={`flex-row items-center p-2 border rounded-lg mb-2 ${
                  activePoll === 3
                    ? "bg-blue-50 border-blue-200"
                    : "border-gray-200"
                }`}
                onPress={() => togglePoll(3)}
              >
                <RadioButton
                  value="unsure"
                  status={activePoll === 3 ? "checked" : "unchecked"}
                  onPress={() => togglePoll(3)}
                  color={colors.primary}
                />
                <StyledText className="ml-2">Not sure</StyledText>
              </StyledTouchableOpacity>

              <StyledView className="flex-row justify-between items-center mt-2">
                <StyledText className="text-xs text-gray-500">
                  243 votes
                </StyledText>
                <Button mode="contained" onPress={() => {}}>
                  Submit
                </Button>
              </StyledView>
            </Card.Content>
          </Card>
        </StyledView>
      </StyledScrollView>
    </Surface>
  );
};

export default HomeScreen;
