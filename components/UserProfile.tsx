import { Button } from "react-native-paper";
import { View, Text } from "./Themed"
import { StyleSheet, Image } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";
import follow from "../api/follow";

interface UserProfileProps {
  profileUri: string;
  name: string;
  bio: string;
  collegeAffiliation: string;
  slugPoints: number;
  wantsSlugPoints: boolean;
  uid: string;
}

const UserProfile = ({profileUri, name, bio, collegeAffiliation, slugPoints, wantsSlugPoints, uid}: UserProfileProps) => {
    const colorScheme = useColorScheme();
    const boxColor = colorScheme === "dark" ? "#1c1c1e" : "#ccc";
    return (
      <View style={{marginBottom: 20}}>
        <View style={styles.container}>
            <View style={{backgroundColor: boxColor, borderRadius: 10, width: 350, alignSelf: 'center', paddingVertical: 10}}>
              <View style={{flexDirection: 'row', backgroundColor: boxColor}}>
                <Image source={{uri: profileUri}} style={{width: 50, height: 50, borderRadius: 25, overflow: 'hidden', marginHorizontal: 10, marginBottom: 10}} />
                <View style={{backgroundColor: boxColor}}>
                  <Text style={{fontWeight: 'bold'}}>{name}</Text>
                  <Text style={{opacity: 0.8, fontSize: 12}}>{slugPoints} slugPoints</Text>
                </View>
                <Text style={{marginLeft: 'auto', marginRight: 5, textAlignVertical: 'center', fontWeight: 'bold'}}>{collegeAffiliation}</Text>
                <Feather name="home" size={18} color={colorScheme === "dark" ? "white": "black"} style={{marginRight: 10}} />
              </View>
              <Text style={styles.paragraph}>
                {bio}
              </Text>
              <Button style={{marginHorizontal: 20, marginTop: 10}} buttonColor="#1DA1F2" icon={wantsSlugPoints ? "currency-usd":"send"} mode="contained" onPress={() => {follow(uid)}}>
                {wantsSlugPoints ? "Request SlugPoints":"Give SlugPoints"}
              </Button>
            </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    paragraph: {
      fontSize: 12,
      paddingHorizontal: 20,
      paddingLeft: 70
    },
  });
  

export default UserProfile;