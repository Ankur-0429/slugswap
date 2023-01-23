import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import UserProfile from '../components/UserProfile';
import { currentUser } from '../constants/Atoms';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const firestore = getFirestore();
  const userRef = collection(firestore, 'users');
  const [data, setData] = useState([]);
  const [currUser] = useAtom(currentUser);

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const d = [] as any;
      snapshot.docs.forEach((doc) => {
        d.push({...doc.data(), id: doc.id})
      })
      setData(d);
    })
    return unsubscribe;
}, []);


  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={{marginVertical: 20, marginTop: 150}}
        data={data.filter((e:any) => {return (e.uid != currUser?.uid)})}
        renderItem={({item}: any) => {
          return (
            <UserProfile profileUri={item.image} name={item.name} bio={item.bio} collegeAffiliation={item.collegeAffiliation} slugPoints={item.slugPoints} wantsSlugPoints={item.ifSendSlugPoints} uid={item.uid} />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
