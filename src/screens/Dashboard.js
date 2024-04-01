import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { surahNames } from "./Qurandata";
import { surahDetails } from "./Qurandata";
import themeStyles from "../styles/theme";

const Dashboard = () => {
  const navigation = useNavigation();
  const { loading, userLoggedIn, currentUser } = useAuth();
  const { bgColor, textColor } = themeStyles();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState([]);

  if (loading) {
    return (
      <View style={[styles.container, bgColor, { paddingTop: 30 }]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  useEffect(() => {
    if (!loading && !userLoggedIn) {
      navigation.navigate("Login");
    }
  }, []);

  useEffect(() => {
    const filteredSurahs = surahNames.filter((surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSurahs(filteredSurahs);
  }, [searchQuery]);

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={styles.fullWidthCard}
      onPress={() => navigation.navigate("SurahDetails", { surah: item })}
    >
      <Text style={[styles.text]}>{item.arabicName}</Text>
      <Text style={[styles.text]}>{item.englishName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, bgColor]}>
      {userLoggedIn && (
        <View style={styles.userDetail}>
          <TextInput
            style={[styles.searchInput]}
            placeholder="Search Surah..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <FlatList
            data={filteredSurahs}
            renderItem={renderSurahItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.surrah}
          />
        </View>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  userDetail: {
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#CCCCCC", // Gray background color
    color: "#000000", // Black text color
  },

  fullWidthCard: {
    backgroundColor: "lightgray",

    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
    width: "100%", // Make the card take full width
  },
});
