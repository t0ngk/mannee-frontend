import { View, Image, Button, Alert, TextInput, Text } from "react-native";
import Input from "../components/Input";
import { Formik } from "formik";
import * as Yup from 'yup';

export default function Registor({ navigation }) {
  const signup = async (value) => {
    const data = {
      username: value.username,
      password: value.password,
      email: value.email,
      confirmPassword: value.confirmPassword,
    }
    console.log(data)
    const api = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    console.log(api)
    if (api.ok) {
      const res = await api.json();
      Alert.alert("Success : " + res.message);
      navigation.navigate("Login")
      console.log(res)
    } else {
      const err = await api.json();
      Alert.alert("Error : " + err.error);
      console.log(err)
    }
  }

  const RegistorSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too Short!').max(100, 'Too Long!').required('Required'),
    password: Yup.string().min(6, 'Too Short!').max(100, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().equals([Yup.ref('password')], 'Password not match').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });



  return (
    <View className="flex flex-col items-center justify-center content-center my-auto py-52" >
      <View className="mb-5">
        <Image className="h-20 w-20" source={{ uri: 'https://cdn.logo.com/hotlink-ok/logo-social.png' }} />
      </View>

      <Formik
        validationSchema={RegistorSchema}
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={async (values) => { await signup(values) }}>
        {({ handleChange, handleSubmit, values, handleBlur, errors, touched }) => (
          <View className="flex flex-col w-80">
            <View className="py-3">
              <Input
                onBlur={handleBlur('username')}
                error={errors.username}
                touched={touched.username}
                icon="user"
                placeholder="Your Username"
                onChangeText={handleChange('username')}
                value={values.username} />
              {errors.username && touched.username ? (
                <Text className="text-red-500 pt-1">{errors.username}</Text>
              ) : null}
            </View>
            <View className="py-3">
              <Input
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                icon="mail"
                placeholder="Your Email"
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address" />
              {errors.email && touched.email ? (
                <Text className="text-red-500 pt-1">{errors.email}</Text>
              ) : null}
            </View>
            <View className="py-3">
              <Input
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                icon="lock"
                placeholder="Your Password"
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry={true} />
              {errors.password && touched.password ? (
                <Text className="text-red-500 pt-1">{errors.password}</Text>
              ) : null}
            </View>
            <View className="py-3">
              <Input
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                icon="lock"
                secureTextEntry={true}
                placeholder="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword} />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text className="text-red-500 pt-1">{errors.confirmPassword}</Text>
              ) : null}
            </View>
            <View className="border-2 w-80 rounded-md bg-black mt-3">
              <Button color="#FFFF" title="Register" onPress={handleSubmit} disabled={errors.username || errors.password || errors.email || errors.confirmPassword}/>
            </View>
          </View>

        )}
      </Formik>
      <View className="border-[1px] w-80 rounded-md mt-3 top-20">
        <Button color="#000" title="Login" onPress={() => { navigation.navigate("Login") }} />
      </View>
    </View>
  );
}
