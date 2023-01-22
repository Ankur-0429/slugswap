import { Button } from "react-native-paper";
import { View, Text } from "./Themed"
import { StyleSheet, Image } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";

const tempData = {
    profileUri: 'https://news.ucsc.edu/2020/07/images/strongslugredwood4001.jpg',
    name: 'Ankur Ahir',
    bio: 'testing this out...',
    collegeAffiliation: 'Crown',
    slugPoints: 2323,
    wantsSlugPoints: false,
}

const UserProfile = () => {
    const colorScheme = useColorScheme();
    const boxColor = colorScheme === "dark" ? "#1c1c1e" : "#ccc";
    return (
      <View>
        <View style={styles.container}>
            <View style={{backgroundColor: boxColor, borderRadius: 10, width: 350, alignSelf: 'center', paddingVertical: 10}}>
              <View style={{flexDirection: 'row', backgroundColor: boxColor}}>
                <Image source={{uri: tempData.profileUri}} style={{width: 50, height: 50, borderRadius: 25, overflow: 'hidden', marginHorizontal: 10, marginBottom: 10}} />
                <View style={{backgroundColor: boxColor}}>
                  <Text style={{fontWeight: 'bold'}}>{tempData.name}</Text>
                  <Text style={{opacity: 0.8, fontSize: 12}}>{tempData.slugPoints} slugPoints</Text>
                </View>
                <Text style={{marginLeft: 'auto', marginRight: 5, textAlignVertical: 'center', fontWeight: 'bold'}}>{tempData.collegeAffiliation}</Text>
                <Feather name="home" size={18} color={colorScheme === "dark" ? "white": "black"} style={{marginRight: 10}} />
              </View>
              <Text style={styles.paragraph}>
                {tempData.bio}
              </Text>
              <Button style={{marginHorizontal: 20, marginTop: 10}} buttonColor="#1DA1F2" icon={tempData.wantsSlugPoints ? "currency-usd":"send"} mode="contained" onPress={() => console.log('Pressed')}>
                {tempData.wantsSlugPoints ? "Request SlugPoints":"Give Away SlugPoints"}
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