import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/Index";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTitle from "../components/HeaderTitle";
import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";
import { Users } from "../data/Users";
import { useUser } from "../context/UserContext";

type Props = {
  showBtns: boolean;
  route: any;
  navigation: StackNavigationProp<RootStackParams, "Login">;
};

const windowWidth = Dimensions.get("window").width;

export default function Products({ showBtns, navigation, route }: Props) {
  const { params } = route;
  const user = useUser();
  const data = params.data.products;
  const [cart, setCart] = useState<any>([]);

  function drawProducts(data : any) {
    return data.map((product: any, i: number) => (
      <ProductItem
        showBtns={true}
        product={product}
        key={i}
        navigation={navigation}
      />
    ));
  }

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setData(params.data.products)
  //     setCart(user.user.cart)

  //     let changeme;
  //     data.map((p : any) => {
  //       cart.find((pr : any) => pr.title == p.title) ? (
  //         p.isInCart = true
  //         ) : p.isInCart = false;
  //     })
  //     console.log(data)
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.whiteContainer}>
        <HeaderTitle title={"Products"} />
        <View style={styles.mainContainer}>
          <SearchBar />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {drawProducts(data)}
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F6F5F5",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  productsContainer: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 20,
  },
});
