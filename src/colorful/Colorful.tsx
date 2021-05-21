import React from "react";
import { View, Dimensions, Image, StyleSheet, Animated } from "react-native";
import { data } from "./data";
import { StatusBar } from "expo-status-bar";
const { width, height } = Dimensions.get("screen");

const imageW = width * 0.7;
const imageH = imageW * 1.4;

const Colorful = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      <StatusBar />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((img, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
          ]; // [previous, current, next]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1],
          });
          return (
            <Animated.Image
              key={index}
              source={{ uri: img }}
              blurRadius={50}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(_) => _}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                height,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Colorful;
