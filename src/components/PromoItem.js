import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View, Platform, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from 'expo-clipboard'
import formatDate from '../helpers/formatDate'

const PromoItem = ({ data }) => {
  const [toggleDetail, setToggleDetail] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() => setToggleDetail(!toggleDetail)}
      >
        <Image
          source={{ uri: data.imageUrl }}
          style={{
            width: 40,
            height: 40,
            borderBottomLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={styles.title}>{data.name}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
                <Text style={styles.subtitle}>Berlaku sampai {formatDate(data.endDate)}</Text>
            <Text style={styles.toggleText}>
              {toggleDetail ? "See Less" : "See More"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {toggleDetail && (
        <View style={styles.detailerContainer}>
          <Text style={styles.termsTitle}>Syarat dan Ketentuan</Text>
          <View style={{ marginHorizontal: 12, gap: 8 }}>
            {data.termsAndConditions.map((item, index) => (
              <Text key={index}>
                {index + 1}. {item}
              </Text>
            ))}
          </View>
          {data.isVoucher && (
            <View style={styles.voucherContainer}>
              <View>
                <Text style={{ fontSize: 12 }}>Voucher Code</Text>
                <Text style={{ fontSize: 16, fontWeight: "900" }}>
                  {data.voucherCode}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={async () => {
                  try {
                    await Clipboard.setStringAsync(String(data.voucherCode));
                    if (Platform.OS === "android") {
                      ToastAndroid.show(
                        "Voucher code copied",
                        ToastAndroid.SHORT,
                      );
                    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
                      window.alert('Voucher code copied');
                    } else {
                      Alert.alert("Copied", "Voucher code copied");
                    }
                  } catch (e) {
                    console.warn("Copy failed", e);
                    if (Platform.OS === "android") {
                      ToastAndroid.show("Copy failed", ToastAndroid.SHORT);
                    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
                      window.alert('Copy failed');
                    } else {
                      Alert.alert("Error", "Copy failed");
                    }
                  }
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "900", color: "white" }}
                >
                  Copy Voucher
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default PromoItem

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "rgb(189, 152, 214)",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    color: "rgb(137, 130, 142)",
    fontWeight: "600",
  },
  toggleText: {
    color: "rgb(167, 117, 200)",
    fontSize: 12,
    fontWeight: "bold",
  },
  termsTitle: {
    fontSize: 15,
    fontWeight: "900",
  },
  detailerContainer: {
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgb(229, 229, 229)",
    marginTop: 12,
    paddingVertical: 12,
  },
  voucherContainer: {
    backgroundColor: "rgb(246, 246, 247)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  copyButton: {
    backgroundColor: "rgb(167, 117, 200)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  copiedText: {
    marginTop: 6,
    color: "green",
    fontSize: 12,
    fontWeight: "600",
  },
});