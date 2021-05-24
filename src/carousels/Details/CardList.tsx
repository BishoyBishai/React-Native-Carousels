import React from "react";
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from "react-native";
import data from "./data";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
const { height } = Dimensions.get("screen");
const SPACING = 16;
const ITEM_HEIGHT = height * 0.16;
const CardList = () => {
  const { navigate } = useNavigation();

  const navigateTo = (item: any) => () => navigate("CardDetails", { item });
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_) => _.key}
        contentContainerStyle={{ padding: SPACING}}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={navigateTo(item)}>
              <View style={styles.cardContainer}>
                <View
                  style={[
                    styles.cardBG,
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: item.color },
                  ]}
                />
                <View>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardTitle}>{item.jobTitle}</Text>
                </View>
                <Image style={styles.cardImage} source={{ uri: item.image }} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Flat List Item,
  cardContainer: {
    padding: SPACING,
    marginBottom: SPACING,
    height: ITEM_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBG: {
    borderRadius: 16,
    zIndex: 0,
  },
  cardImage: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    right: SPACING,
    bottom: 0
  },
  cardName: {
    fontWeight: "700",
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 12,
    opacity: 0.8,
  },
});
