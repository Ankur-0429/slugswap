import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import me from '../api/me';
import {useAtom} from 'jotai';
import { ifSignedIn } from '../constants/Atoms';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [, setIfSignedIn] = useAtom(ifSignedIn);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const auth = getAuth();
        auth.onAuthStateChanged(async (user) => {
          if (user?.uid) {
            const check = await me(user.uid);
            setIfSignedIn(check);
          }
        })
        

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
