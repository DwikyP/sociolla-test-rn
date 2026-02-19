import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator, Platform, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimplePromoItem from "../components/SimplePromoItem";
import BottomSheet from "../components/BottomSheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import PromoItem from "../components/PromoItem";
import usePromos from "../hooks/usePromos";

const PromoBottomSheet = ({ bottomSheetRef, snapPoints, data}) => {
    return (
      <BottomSheet bottomSheetRef={bottomSheetRef} snapPoints={snapPoints}>
        <View
          style={{
            gap: 20,
            paddingHorizontal: 16,
            flex: 1,
            paddingBottom: 20,
            position: "relative",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Special Promo
            </Text>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.dismiss()}
              accessibilityLabel="Close"
            >
              <Text style={{ fontSize: 18, fontWeight: "900" }}>✕</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 10 }}>
              {data.map((item, index) => (
                <PromoItem key={index} data={item} />
              ))}
            </View>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    );
};
const SpecialPromo = () => {
  const { data, loading, error } = usePromos();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%"], []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
        <ActivityIndicator size="large" color="rgb(189, 152, 214)" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const promoData = data || [];

  return (
    <SafeAreaView style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
      <View style={{ gap: 8 }}>
        <Pressable onPress={() => bottomSheetRef.current?.present()}>
          <Text style={styles.text}>Special Promo</Text>
        </Pressable>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={promoData}
          contentContainerStyle={{ gap: 8 }}
          style={{paddingBottom: 20}}
          keyExtractor={(item, index) => (item.id ?? index).toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => bottomSheetRef.current?.present()}>
              <SimplePromoItem data={item} />
            </Pressable>
          )}
        />
      </View>
      <PromoBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        data={promoData}
      />
    </SafeAreaView>
  );
};

export default SpecialPromo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  text: {
    fontSize: 16,
    fontWeight: "900",
  },
  webContainer: {
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
});
