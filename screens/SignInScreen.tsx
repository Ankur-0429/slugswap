import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image } from 'react-native';
import AppleSignInButton from '../components/AppleSignInButton';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { Text, View } from '../components/Themed';

export default function SignInScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Text style={styles.title}>SlugSwap</Text>
        <Image source={require("../assets/images/slugIcon.jpeg")} style={{width: 200, height: 200, borderRadius: 100, marginVertical: 10}} />
        <Text style={styles.subtitle}>Meal Plan Sharing made easy</Text>
        <GoogleSignInButton navigation={navigation} />
        <AppleSignInButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
