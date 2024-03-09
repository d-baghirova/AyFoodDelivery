import { useEffect, useState } from "react";
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Users } from "../data/Users";
import ProductItem from "../components/ProductItem";
import RefreshButton from "../components/RefreshButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/Index";

const windowWidth = Dimensions.get("window").width;

type Props = {
  navigation: StackNavigationProp<RootStackParams, "Categories">;
};

const Cart = ({navigation} : Props) => {
  const [ifPressed, setIfPressed] = useState(false);
  const [textContent, setTextContent] = useState("");
  let user = useUser();
  let cart = useCart();

  const updateCart = () => {
    const updatedUser =  Users.find((u: any, i: number) => u.email == user.user.email);
    return updatedUser?.cart;
  };

  const [ucart, setUcart] = useState(updateCart());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const nucart = updateCart()
      setUcart(nucart || [])
      setTextContent(JSON.stringify(ucart));
    });

    // Return the function to unsubscribe from the event when the component unmounts
    return unsubscribe;
  }, [navigation]);

  const showUserCart = () => {
    if (ucart) return ucart.map((p : any, n : number) => <ProductItem product={p} key={n} />)
  }

  return (
    <View style={styles.container}>
      <View style={styles.refreshContainer}>
        {/* <RefreshButton refresh={() => setIfPressed((prev) => !prev)} /> */}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {showUserCart()}
        <Text></Text>
        {/* {showUserCart()} */}
        {/* {showUserProducts()} */}
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
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
    paddingVertical: 15,
    width: windowWidth * 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 20,
  },
  refreshContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});