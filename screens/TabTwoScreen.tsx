
import { View, Text } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';
import useConnection from '../hooks/useConnection';
import useUser from '../hooks/useUser';
import { Button } from "react-native-paper";
import { StyleSheet, Image, FlatList, ListRenderItem } from "react-native";
import { Feather } from "@expo/vector-icons";
import follow from '../api/follow';

interface DirectMessageUserProps {
  uid: string;
  index: number
}

const DirectMessageUser = ({uid, index}: DirectMessageUserProps) => {
  const {user} = useUser(uid);
  const colorScheme = useColorScheme();
  const boxColor = colorScheme === "dark" ? "#1c1c1e" : "#ccc";
  
  return (
    <View style={{marginBottom: 20}}>
      <Text style={{fontWeight: 'bold', fontSize: 30, marginBottom: 5}}>{index === 0 && "Direct Message"}</Text>
      <View>
          <View style={{backgroundColor: boxColor, borderRadius: 10, paddingVertical: 10}}>
            <View style={{flexDirection: 'row', backgroundColor: boxColor}}>
              <Image source={{uri: user?.image}} style={{width: 50, height: 50, borderRadius: 25, overflow: 'hidden', marginHorizontal: 10}} />
              <View style={{backgroundColor: boxColor, marginTop: 8}}>
                <Text style={{fontWeight: 'bold'}}>{user?.name}</Text>
                <Text style={{opacity: 0.8, fontSize: 12}}>{user?.slugPoints} slugPoints</Text>
              </View>
              <View style={{marginLeft: 'auto', backgroundColor: 'transparent'}}>
                <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
                  <Text style={{marginLeft: 'auto', marginRight: 5, textAlignVertical: 'center', fontWeight: 'bold'}}>{user?.collegeAffiliation}</Text>
                  <Feather name="home" size={18} color={colorScheme === "dark" ? "white": "black"} style={{marginRight: 10}} />
                </View>
                <Button mode='text' style={{marginLeft: 23}} textColor='#1DA1F2'>
                  Message
                </Button>
              </View>
            </View>
          </View>
      </View>
    </View>
  )
}

const FollowerRequestUser = ({uid, index}: DirectMessageUserProps) => {
  const {user} = useUser(uid);
  const colorScheme = useColorScheme();
  const boxColor = colorScheme === "dark" ? "#1c1c1e" : "#ccc";
  
  return (
    <View style={{marginBottom: 20}}>
      <Text style={{fontWeight: 'bold', fontSize: 30, marginBottom: 5}}>{index === 0 && "Follower Request"}</Text>
      <View>
          <View style={{backgroundColor: boxColor, borderRadius: 10, paddingVertical: 10}}>
            <View style={{flexDirection: 'row', backgroundColor: boxColor}}>
              <Image source={{uri: user?.image}} style={{width: 50, height: 50, borderRadius: 25, overflow: 'hidden', marginHorizontal: 10}} />
              <View style={{backgroundColor: boxColor, marginTop: 8}}>
                <Text style={{fontWeight: 'bold'}}>{user?.name}</Text>
                <Text style={{opacity: 0.8, fontSize: 12}}>{user?.slugPoints} slugPoints</Text>
              </View>
              <View style={{marginLeft: 'auto', backgroundColor: 'transparent'}}>
                <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
                  <Text style={{marginLeft: 'auto', marginRight: 5, textAlignVertical: 'center', fontWeight: 'bold'}}>{user?.collegeAffiliation}</Text>
                  <Feather name="home" size={18} color={colorScheme === "dark" ? "white": "black"} style={{marginRight: 10}} />
                </View>
                <Button onPress={() => {follow(user?.uid || '')}} mode='text' style={{marginLeft: 23}} textColor='#1DA1F2'>
                  Follow Back
                </Button>
              </View>
            </View>
          </View>
      </View>
    </View>
  )
}


export default function TabTwoScreen() {

  const {dms, request} = useConnection();

  return (
    <View style={styles.container}>
      <FlatList contentContainerStyle={{marginVertical: 20, marginTop: 150}} data={dms} renderItem={
        ({item, index}) => <DirectMessageUser uid={item} index={index} />
      } />

      <FlatList data={request} renderItem={
        ({item, index}) => <FollowerRequestUser uid={item} index={index} />
      } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    width: 200,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    width: 250,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 0.5,
    padding: 10,
  },
});
