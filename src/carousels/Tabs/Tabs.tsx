import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { round, useAnimatedRef } from "react-native-reanimated";
import data from "./data";
const { width, height } = Dimensions.get("screen");

interface IndicatorMeasure{
    x: number;
    y: number;
    width: number;
    height: number;
}

const Indicator = ({ measures, scrollX }: { measures: IndicatorMeasure[], scrollX: Animated.Value }) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorW = scrollX.interpolate({
      inputRange,
      outputRange: measures.map((m) => m.width),
    });
    const indicatorX = scrollX.interpolate({
      inputRange,
      outputRange: measures.map((m) => m.x),
    });

  return (
    <Animated.View
      style={[
        styles.indicator,
        { left: indicatorX, width: indicatorW },
      ]}
    />
  );
};

const TabItems = ({
  scrollX,
  onTabPressed,
}: {
  scrollX: Animated.Value;
  onTabPressed: (index: any) => void;
}) => {
  const tabData = data.map((i) => ({ ...i, ref: createRef<TouchableOpacity>() }));
  const containerRef = useRef<View>();
  const [measures, setMeasures] = useState<IndicatorMeasure[]>([]);

  useEffect(() => {
    const _measures: IndicatorMeasure[] = [];
    tabData.forEach((item) => {
      item.ref?.current?.measureLayout(
        containerRef.current as any,
        (x, y, width, height) => {
          _measures.push({ x, y, width, height });
          if (_measures.length === tabData.length) {
            // all tabs has been completed
            setMeasures(_measures);
          }
        }, // on success
        () => {} // on failed
      );
    });
  }, []);

  return (
    <View
      style={styles.tabItemsContainer}
      ref={containerRef as React.LegacyRef<View>}
    >
      {tabData.map((item,index) => {
        return (
          <TouchableOpacity key={item.key} ref={item.ref} onPress={()=>onTabPressed(index)}>
            <Text style={styles.tabItemText}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
      {measures.length ? (
        <Indicator measures={measures} scrollX={scrollX} />
      ) : null}
    </View>
  );
};

const Tabs = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef<FlatList<any>>();

    const handleNavigate = useCallback((index) => {
      ref.current?.scrollToOffset({
        offset: index * width,
      });
    }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={(ref as any)}
        data={data}
        keyExtractor={(_) => _.key}
        horizontal
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        scrollEventThrottle={16}
        snapToInterval={width}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false, // because useNativeDriver work only for transform and opacity
          }
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image source={{ uri: item.image }} style={[styles.tabImage]} />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: "rgba(0,0,0,.3)",
                  },
                ]}
              />
            </View>
          );
        }}
      />
      <TabItems scrollX={scrollX} onTabPressed={handleNavigate} />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabImage: {
    flex: 1,
    resizeMode: "cover",
  },

  tabItemsContainer: {
    position: "absolute",
    top: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    width,
  },

  tabItemText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 70 / data.length,
    textTransform: "uppercase",
  },

  indicator: {
    position: "absolute",
    height: 4,
    backgroundColor: "#fff",
    bottom: -8,
    zIndex: 100,
  },
});
