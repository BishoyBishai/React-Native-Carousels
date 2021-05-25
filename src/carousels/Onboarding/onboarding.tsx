import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef } from "react";
const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const data = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571572.png",
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571747.png",
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571680.png",
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "https://image.flaticon.com/icons/png/256/3571/3571603.png",
  },
];

const Indicator = ({
  scrollX,
  handleSwipe,
}: {
  scrollX: Animated.Value;
  handleSwipe: (i: number) => void;
}) => {
  return (
    <View style={{ position: "absolute", flexDirection: "row", bottom: 100 }}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.2, 1],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
          extrapolate: "clamp",
        });
        return (
          <TouchableOpacity key={_.key} onPress={() => handleSwipe(index)}>
            <Animated.View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#333",
                margin: 8,
                opacity,
                transform: [{ scale }],
              }}
            ></Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BackDrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: data.map((_, i) => i * width),
    outputRange: data.map((_, i) => bgs[i % bgs.length]),
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    ></Animated.View>
  );
};

const Square = ({ scrollX }: { scrollX: Animated.Value }) => {
    const newCalc = Animated.divide(
      Animated.modulo(scrollX, width),
      new Animated.Value(width)
    );

    const inputRange = [0, .5, 1];
    const rotate = newCalc.interpolate({
      inputRange,
      outputRange: ["35deg", "-35deg", "35deg"],
    });

    const translateX = newCalc.interpolate({
      inputRange,
      outputRange: [0, -height, 0],
    });
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            width: height,
            height,
            borderRadius: 84,
            top: -height * 0.6,
            left: -height * 0.3,
            zIndex: 0,
            backgroundColor: "#fff",
            transform: [{ rotate }, { translateX }],
          },
        ]}
      ></Animated.View>
    );
}

export default function Onboarding() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>();

  const handleNavigateToScreen = (i: number) => {
    flatListRef.current?.scrollToOffset({ offset: i * width });
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        ref={flatListRef as any}
        horizontal
        pagingEnabled
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(_) => _.key}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, alignItems: "center", padding: 16 }}>
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Image
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.image }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 24,
                    marginBottom: 10,
                    color: "white",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ fontWeight: "400", fontSize: 16, color: "white" }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} handleSwipe={handleNavigateToScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
