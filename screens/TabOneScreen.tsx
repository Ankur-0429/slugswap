import { collection, Firestore, getFirestore } from 'firebase/firestore/lite';
import { StyleSheet, Image, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import UserProfile from '../components/UserProfile';
import { RootTabScreenProps } from '../types';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const tempData = [{
  profileUri: 'https://news.ucsc.edu/2020/07/images/strongslugredwood4001.jpg',
  name: 'Ankur Ahir',
  bio: 'testing this out...',
  collegeAffiliation: 'Crown',
  slugPoints: 2323,
  wantsSlugPoints: false,
}]

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const firestore = getFirestore();
  const userRef = collection(firestore, 'user');
  // const [data] = useCollectionData(userRef);
  // console.log(data);
  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={{marginVertical: 20, marginTop: 150}}
        data={tempData}
        renderItem={({item}) => {
          return (
            <UserProfile profileUri={item.profileUri} name={item.name} bio={item.bio} collegeAffiliation={item.collegeAffiliation} slugPoints={item.slugPoints} wantsSlugPoints={item.wantsSlugPoints} />
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
