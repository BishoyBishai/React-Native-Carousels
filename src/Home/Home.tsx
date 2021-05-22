import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const carouselsList = ["Colorful", "Wave", "Product"];

const Home = () => {
  const { navigate } = useNavigation();

  const goToCarousel = (route: string) => () => {
    navigate(route);
  };
  return (
    <View>
      <FlatList
        data={carouselsList}
        keyExtractor={(_) => _}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={goToCarousel(item)}
              style={{
                borderColor: "#c7c7c7",
                borderBottomWidth: 1,
                marginBottom: 8,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
