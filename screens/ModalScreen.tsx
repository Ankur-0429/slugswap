import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { useAtom } from 'jotai';
import { Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ifSignedIn } from '../constants/Atoms';

export default function ModalScreen() {
  const auth = getAuth();
  const [,setIfSignedIn] = useAtom(ifSignedIn);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button style={{marginHorizontal: 20, marginTop: 10, width: 250, borderRadius: 10}} textColor="#1DA1F2" mode="text" onPress={async () => {
        await auth.signOut();
        setIfSignedIn(false);
        }}>
        Logout
      </Button>
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
