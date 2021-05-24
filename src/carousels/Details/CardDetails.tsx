import { Route } from "@react-navigation/routers";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");
import { AntDesign } from "@expo/vector-icons";
import { CardProps, detailsIcons } from "./data";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

const SPACING = 16;
const DURATION = 400;
const ITEM_HEIGHT = height * 0.16;
const TOP_HEADER_HEIGHT = height * 0.32;

const CardDetails = ({ route }: { route: Route<any> }) => {
  const { item } = route.params as { item: CardProps };
  let cardNameID, CardID;
  return (
    <View style={styles.container}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: item.color,
            height: TOP_HEADER_HEIGHT + 32,
          },
        ]}
      />
      <View>
        <Text style={styles.cardName}>{item.name}</Text>
      </View>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <View style={styles.cardDetails}>
        <ScrollView>
          <View style={styles.cardActions}>
            {detailsIcons.map((_, index) => (
              <Animatable.View
                animation="bounceIn"
                delay={DURATION + index * 100}
                key={_.icon}
                style={[styles.actionIcon, { backgroundColor: _.color }]}
              >
                <AntDesign name={_.icon as any} color={"white"} size={24} />
              </Animatable.View>
            ))}
          </View>
          <View style={styles.categoriesContainer}>
            {item.categories.map((cat, index) => {
              return (
                <Animatable.View
                  animation="fadeInUp"
                  delay={DURATION * 2 + index * 200}
                  key={cat.key}
                  style={styles.category}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      marginVertical: SPACING / 2,
                    }}
                  >
                    {cat.title}
                  </Text>
                  <View style={styles.subCategoryContainer}>
                    {cat.subCats.map((sub, index) => (
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 12,
                          opacity: 0.8,
                          marginVertical: SPACING / 2,
                        }}
                        key={sub + index}
                      >
                        {" "}
                        {sub}
                      </Text>
                    ))}
                  </View>
                </Animatable.View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Flat List Item,
  cardContainer: {
    padding: SPACING,
    marginBottom: SPACING,
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
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8,
    right: SPACING,
  },
  cardName: {
    fontWeight: "700",
    fontSize: 16,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 2,
    left: SPACING,
  },

  cardDetails: {
    height,
    width,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: SPACING,
    paddingTop: SPACING * 2,
    transform: [
      {
        translateY: TOP_HEADER_HEIGHT,
      },
    ],
  },

  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: SPACING,
    marginBottom: SPACING + 16,
  },
  actionIcon: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  categoriesContainer: {},
  category: {},
  subCategoryContainer: {},
  subCategory: {},
});
