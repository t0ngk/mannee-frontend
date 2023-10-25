import * as SecureStore from 'expo-secure-store';

const editSubscription = async (url, data) => {
  const token = await SecureStore.getItemAsync("token");
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    Alert.alert("Create Subscription Success");
    navigation.navigate("DetailSub", {
      ...data,
      img: data.icon,
      firstbill: dayjs(data.firstbill).format("DD-MMM-YYYY"),
      daytopay: 0,
    });
  } else {
    const error = await response.json();
    console.log(error);
    Alert.alert("Create Subscription Fail");
  }
}

export default api = {
  editSubscription
};
