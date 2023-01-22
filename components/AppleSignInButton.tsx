import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';
import {getAuth, OAuthProvider, signInWithCredential} from 'firebase/auth';
import firebase from '../constants/FirebaseConfig';
import * as Crypto from 'expo-crypto';
import useColorScheme from '../hooks/useColorScheme';
import me from '../api/me';
import { useAtom } from 'jotai';
import { ifSignedIn, currentUser } from '../constants/Atoms';

export default function AppleSignInButton({navigation}: any) {
  const colorScheme = useColorScheme();
  const [,setIfSignedIn] = useAtom(ifSignedIn);
  const [,setCurrentUser] = useAtom(currentUser);
  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={colorScheme === "dark" ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{width: 250, height: 50}}
        onPress={async () => {
          try {
            const nonce = Math.random().toString(36).substring(2, 10);

          return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
        .then((hashedNonce) =>
            AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ],
                nonce: hashedNonce
            })
        )
        .then((appleCredential) => {
            const auth = getAuth(firebase)
            const { identityToken } = appleCredential;
            const provider = new OAuthProvider('apple.com');
            const credential = provider.credential({
                idToken: identityToken!,
                rawNonce: nonce
            });
            signInWithCredential(auth, credential).then(async () => {
              if (auth.currentUser?.uid) {
                const check = await me(auth.currentUser.uid);
                if (!check) {
                  navigation.navigate('UserCreate')
                } else {
                  setCurrentUser(check as any);
                  setIfSignedIn(true);
                }
              } else {
                navigation.navigate('UserCreate')
              }
            });
            // Successful sign in is handled by firebase.auth().onAuthStateChanged
        })
          } catch (e: any) {
            if (e.code === 'ERR_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    </View>
  );
}