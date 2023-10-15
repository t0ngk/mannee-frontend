import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/SearchBar";
import MemberStructure from "../components/MemberStructure";
const MemberData = [
  {
    id: 1,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "user 01",
    price: 169,
    amount_of_member: 2,
  },
  {
    id: 2,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "user 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 3,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "food 03",
    price: 159,
    amount_of_member: 3,
  },
  {
    id: 3,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "food 03",
    price: 159,
    amount_of_member: 3,
  },
];
const FoodData = [
  {
    id: 1,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "food 01",
    price: 169,
    amount_of_member: 2,
  },
  {
    id: 2,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "food 02",
    price: 129,
    amount_of_member: 3,
  },

  {
    id: 3,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "food 03",
    price: 159,
    amount_of_member: 3,
  },
  {
    id: 4,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    name: "food 04",
    price: 159,
    amount_of_member: 3,
  },
];
export default function AddMember({ navigation }) {
  const keyExtractor = (item) => item.id.toString();
  return (
    <View className="my-2  m-[20px] h-full">
      <SearchBar />
      <ScrollView className="w-full">
        <FlatList
          keyExtractor={keyExtractor}
          data={MemberData}
          renderItem={({ item }) => (
            <MemberStructure
              memberType="add"
              id={item.id}
              img={item.img}
              name={item.name}
            ></MemberStructure>
          )}
        />
      </ScrollView>
    </View>
  );
}
