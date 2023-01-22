import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import UserProfile from '../components/UserProfile';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const firestore = getFirestore();
  const userRef = collection(firestore, 'users');
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const d = [] as any;
      snapshot.docs.forEach((doc) => {
        d.push({...doc.data(), id: doc.id})
      })
      setData(d);
      console.log(d);
    })
    return unsubscribe;
}, []);

  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={{marginVertical: 20, marginTop: 150}}
        data={data}
        renderItem={({item}: any) => {
          return (
            <UserProfile profileUri={item.image} name={item.name} bio={item.bio} collegeAffiliation={item.collegeAffiliation} slugPoints={item.slugPoints} wantsSlugPoints={item.ifSendSlugPoints} />
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
