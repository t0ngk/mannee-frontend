import { View, Image, Button, Alert, Text } from "react-native";
import Input from "../components/Input";
import { Formik } from "formik";
import * as SecureStore from 'expo-secure-store';
import * as Yup from "yup";
import { useUser } from "../stores/userContext";


export default function Login({ navigation }) {
  const { updateUser } = useUser();

  const login = async (value) => {
    const data = {
      username: value.username,
      password: value.password,
    }
    console.log(data)
    const api = await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    console.log(api)
    if (api.ok) {
      const res = await api.json();
      Alert.alert("Login Success");
      SecureStore.setItemAsync('token', res.token);
      const user = await fetch('http://localhost:3000/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${res.token}`,
        },
      });
      if (user.ok) {
        const data = await user.json();
        updateUser(data);
      } else {
        const err = await user.json();
        Alert.alert("Error : " + err.error);
        console.log(err)
      }
      navigation.navigate("MainNavigation")
      console.log(res)
    } else {
      const err = await api.json();
      Alert.alert("Error : " + err.error);
      console.log(err)
    }
    const token = await SecureStore.getItemAsync('token');
    console.log(token)
  }

  const LoginSchema = Yup.object().shape({
    username: Yup.string().min(4, "Too Short!").max(100, "Too Long!").required("Required"),
    password: Yup.string().min(6, "Too Short!").max(100, "Too Long!").required("Required"),
  });


  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values) => { await login(values) }}>
      {({ handleChange, handleSubmit, values, handleBlur, errors, touched }) => (
        <View className="flex flex-col items-center justify-center content-center my-auto py-52">
          <View className="mb-5">
            <Image
              className="h-20 w-20"
              source={{ uri: "https://cdn.logo.com/hotlink-ok/logo-social.png" }}
            />
          </View>
          <View className="flex flex-col w-80">
            <View className="py-3">
              <Input
                icon="user"
                placeholder="Your Username"
                error={errors.username}
                touched={touched.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <Text className="text-red-500 pt-1">{errors.username}</Text>
              ) : null}
            </View>
            <View className="py-3">
              <Input
                placeholder="Your password"
                icon="lock"
                error={errors.password}
                touched={touched.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              {errors.password && touched.password ? (
                <Text className="text-red-500 pt-1">{errors.password}</Text>
              ) : null
              }
            </View>
          </View>
          <View className="border-2 w-80 rounded-md bg-black mt-3">
            <Button
              color="#FFFF"
              title="Login"
              onPress={handleSubmit}
              disabled={errors.username || errors.password}
            />
          </View>
          <View className="border-[1px] w-80 rounded-md mt-3 top-2/4">
            <Button
              color="#000"
              title="Create Account"
              onPress={() => {
                navigation.navigate("Registor");
              }}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
