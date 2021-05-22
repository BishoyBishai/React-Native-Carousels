import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { data } from "./data";
import { StyleSheet } from "react-native";
import { Animated } from "react-native";
const { width, height } = Dimensions.get("screen");

const PRODUCT_HEIGHT = height * 0.5;
const TICKER_HEIGHT = 40;
const CIRCLE_HEIGHT = width * 0.6;

const Pagination = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-24, 0, 24],
  });
  return (
    <View style={styles.paginationContainer}>
      <Animated.View
        style={[styles.paginationItemWrapper, { transform: [{ translateX }] }]}
      />
      {data.map((product) => (
        <View
          key={product.id}
          style={[styles.paginationItem, { backgroundColor: product.color }]}
        />
      ))}
    </View>
  );
};

const Ticker = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      {data.map((product) => {
        return (
          <Animated.Text
            key={product.id}
            style={[styles.tickerText, { transform: [{ translateY }] }]}
          >
            {product.type}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const Circle = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={styles.circleContainer}>
      {data.map((product, index) => {
        const inputRange = [
          (index - .5) * width,
          index * width,
          (index + .5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate:'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, .2, 0],
          extrapolate:'clamp',
        });
        return (
          <Animated.View
            key={product.id}
            style={[
              styles.circle,
              {
                backgroundColor: product.color,
                transform: [{ scale }],
                opacity,
              },
            ]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const Product = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Circle scrollX={scrollX} />

      <Animated.FlatList
        horizontal
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const inputRangeOpacity = [
            (index - 0.5) * width,
            index * width,
            (index + 0.5) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const opacity = scrollX.interpolate({
            inputRange: inputRangeOpacity,
            outputRange: [0, 1, 0],
          });

          const translateXText = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.2, 0, -width * 0.2],
          });
          return (
            <View style={styles.productItem}>
              <Animated.Image
                source={item.imageUri}
                style={[styles.productImage, { transform: [{ scale }] }]}
              />
              <Animated.Text
                style={[
                  styles.productName,
                  { transform: [{ translateX: translateXText }], opacity },
                ]}
              >
                {item.header}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.productDescription,
                  { transform: [{ translateX: translateXText }], opacity },
                ]}
              >
                {item.description}
              </Animated.Text>
            </View>
          );
        }}
      />
      <Pagination scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  productItem: {
    width,
    height,
    alignItems: "center",
  },

  productImage: {
    width: "70%",
    height: PRODUCT_HEIGHT,
    resizeMode: "contain",
  },

  productName: {
    textTransform: "uppercase",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  productDescription: {
    fontSize: 14,
    fontWeight: "500",
    width: width * 0.75,
    color: "#746c6c",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
    position: "absolute",
    right: 20,
    bottom: 40,
    height: 16,
  },

  paginationItemWrapper: {
    width: 16,
    height: 16,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#adadad",
    position: "absolute",
    left: 0,
    top: -4
  },

  paginationItem: {
    width: 8,
    height: 8,
    borderRadius: 6,
    margin: 8
  },

  tickerContainer: {
    position: "absolute",
    overflow: "hidden",
    height: TICKER_HEIGHT,
  },

  tickerText: {
    textTransform: "uppercase",
    fontSize: 22,
    lineHeight: TICKER_HEIGHT,
    fontWeight: "bold",
    paddingLeft: 16,
  },

  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    width: CIRCLE_HEIGHT,
    height: CIRCLE_HEIGHT,
    borderRadius: CIRCLE_HEIGHT / 2,
    position: "absolute",
    top: CIRCLE_HEIGHT / 3.5,
  },
});
