import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const SimplePromoItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.imageUrl }}
        style={{
          width: 40,
          height: 40,
          borderBottomLeftRadius: 12,
            borderTopRightRadius: 12,
        }}
      />
      <View style={{ justifyContent: "center", flex: 1, paddingRight: 4 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }} numberOfLines={1}>
          {data.name}
        </Text>
      </View>
    </View>
  );
};

export default SimplePromoItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 240, 229)",
    flexDirection: "row",
    borderRadius: 8,
    width: 130,
    height: 40,
    gap: 8,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  },
});
