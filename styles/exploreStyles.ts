import { StyleSheet } from "react-native";

export const exploreStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  section: {
    marginVertical: 8,
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
  },
  horizontalScrollContent: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  chatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  incidentCard: {
    marginBottom: 16,
  },
  incidentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  incidentTabs: {
    flexDirection: "row",
  },
  incidentTab: {
    marginRight: 8,
    borderRadius: 20,
  },
  incidentTabActive: {
    marginRight: 8,
    borderRadius: 20,
  },
  incidentTabLabel: {
    fontSize: 12,
  },
  chartContainer: {
    height: 180,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  chartImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  incidentFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  incidentFilter: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
  },
  incidentFilterActive: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
  },
  incidentFilterLabel: {
    fontSize: 12,
  },
  volunteerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
