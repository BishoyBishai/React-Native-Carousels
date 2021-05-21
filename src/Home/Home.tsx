import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const carousels = ["Colorful"];

const Home = () => {
  const { navigate } = useNavigation();

  const goToCarousel = (route: string) => () => {
    navigate(route);
  };
  return (
    <View>
      <FlatList
        data={carousels}
        keyExtractor={(_) => _}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={goToCarousel(item)}
              style={{
                borderColor: "#c7c7c7",
                borderWidth: 1,
                marginBottom: "16px",
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
