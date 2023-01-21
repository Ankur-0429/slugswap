import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';
import {getAuth, OAuthProvider, signInWithCredential} from 'firebase/auth';
import firebase from '../constants/FirebaseConfig';
import * as Crypto from 'expo-crypto';

export default function AppleSignInButton() {
  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{width: 300, height: 200}}
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
            signInWithCredential(auth, credential);
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