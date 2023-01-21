import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import firebase from '../constants/FirebaseConfig';
import { SocialIcon } from 'react-native-elements';
import useColorScheme from '../hooks/useColorScheme';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const [,response,] = Google.useAuthRequest({
    expoClientId: '459340367432-6tsrps7g66lpsrgph0ufthgmh2vle5pt.apps.googleusercontent.com',
    iosClientId: '459340367432-butpennjc5fsnklpnh6m7bclte1b5i7o.apps.googleusercontent.com',
    androidClientId: '459340367432-1h9346his2n28toi1ra266bbladujie3.apps.googleusercontent.com',
  });
  React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const colorScheme = useColorScheme();
  
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const auth = getAuth(firebase);
      const credential = GoogleAuthProvider.credential(authentication?.idToken, authentication?.accessToken);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    // @ts-ignore
    <SocialIcon fontStyle={{color: colorScheme === "dark" ? "black":"white"}} iconStyle={{color: colorScheme === "dark" ? "black":"white"}} light={colorScheme === "dark"} title='Sign in with Google' button style={{width: 250, borderRadius: 5,}} type='google'
    />
  );
}
