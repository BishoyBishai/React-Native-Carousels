import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import data from "./data";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

const { height, width } = Dimensions.get("screen");
const SPACING = 16;
const ITEM_HEIGHT = height * 0.16;
const CardList = () => {
  const { navigate } = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigateTo = (item: any) => () => navigate("CardDetails", { item });
  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={(_) => _.key}
        contentContainerStyle={{ padding: SPACING }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_HEIGHT * index,
            ITEM_HEIGHT * (index + 2),
          ];
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <TouchableOpacity onPress={navigateTo(item)}>
              <Animated.View
                style={[
                  styles.cardContainer,
                  { opacity, transform: [{ scale }] },
                ]}
              >
                <SharedElement
                  id={`item.${item.key}.bg`}
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: item.color },
                    styles.cardBG,
                  ]}
                >
                  <View />
                </SharedElement>
                <View>
                  <SharedElement id={`item.${item.key}.name`}>
                    <Text style={styles.cardName}>{item.name}</Text>
                  </SharedElement>
                  <Text style={styles.cardTitle}>{item.jobTitle}</Text>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                  />
                </SharedElement>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <SharedElement id="item.details">
        <View style={styles.cardDetails} />
      </SharedElement>
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
    right: SPACING,
  },
  cardName: {
    fontWeight: "700",
    fontSize: 16,
    position: "absolute",
    left: 0,
    width: 500
  },
  cardTitle: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: SPACING + 8,
  },

  cardDetails: {
    height: height,
    width,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: SPACING,
    paddingTop: SPACING * 2,
    transform: [
      {
        translateY: height,
      },
    ],
  }
});
