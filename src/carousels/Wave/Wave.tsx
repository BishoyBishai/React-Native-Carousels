import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  Platform,
  FlatList,
} from "react-native";
import { data } from "./data";
const { width, height } = Dimensions.get("screen");
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const BackDrop = ({
  scrollX,
  data,
}: {
  data: string[];
  scrollX: Animated.Value;
}) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          if (!item) {
            return null;
          }
          return (
            <Animated.View
              style={{
                position: "absolute",
                height,
                overflow: "hidden",
                transform: [{translateX}],
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

const Wave = () => {
  const insets = useSafeAreaInsets();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const _data = ["", ...data, ""];

  return (
    <WaveContainer>
      <BackDrop data={_data} scrollX={scrollX} />
      <WaveList
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        data={_data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToInterval={ITEM_SIZE}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });
          if (!item) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }
          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Slide
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ translateY }],
                }}
              >
                <Poster
                  source={{ uri: item as string }}
                  style={{
                    height: ITEM_SIZE * 1.2,
                    resizeMode: "cover",
                    borderRadius: 16,
                  }}
                />
                <View
                  style={{
                    width: ITEM_SIZE,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </Text>
                </View>
              </Slide>
            </Animated.View>
          );
        }}
      />
    </WaveContainer>
  );
};

export default Wave;

const WaveContainer = styled(View)`
  height: 100%;
  background-color: #fff;
`;
const WaveList = styled(Animated.FlatList)`
  height: 200px;
`;
const Slide = styled(Animated.View)`
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  background-color: #fff;
`;
const Poster = styled(Image)`
  padding: 20px;
  width: 100%;
`;
