import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { Avatar, Accessory } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react';
import useColorScheme from '../hooks/useColorScheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';

interface DropDownProps {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  data: {
    key: string;
    value: string;
  }[];
  title?: string;
}

import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { guest } from '../constants/Profile';
import { Button } from 'react-native-paper';
import convertToURL from '../constants/ConvertToURL';
import { getAuth } from "firebase/auth";
import createUser from '../api/createUser';
import { useAtom } from 'jotai';
import { currentUser, ifSignedIn } from '../constants/Atoms';

const DropDown = ({setSelected, data, title}:DropDownProps) => {
  const colorScheme = useColorScheme();
  const BoxColor = colorScheme === "dark" ? "#1c1c1e":"#ccc";
  
  return(
    <View style={{marginVertical: 10}}>
      <Text style={{paddingLeft: 5}}>{title}</Text>
      <SelectList
          setSelected={(val: any) => setSelected(val)} 
          dropdownStyles={{backgroundColor:  BoxColor, borderColor: 'transparent'}}
          arrowicon={<FontAwesome name="chevron-down" size={12} color={colorScheme === "dark" ? "white":"black"} />} 
          searchicon={<FontAwesome name="search" size={12} style={{marginRight: 5}} color={colorScheme === "dark" ? "white":"black"} />} 
          closeicon={<FontAwesome name="close" size={12} color={colorScheme === "dark" ? "white":"black"} />}
          inputStyles={{color: colorScheme === "dark" ? "white":"black"}}
          dropdownTextStyles={{color: colorScheme === "dark" ? "white":"black"}}
          boxStyles={{backgroundColor: BoxColor, borderColor: 'transparent', width: 250}}
          data={data} 
          save="value"
      />
    </View>
  )

};

const Collegedata = [
  {key:'0', value: 'Off Campus'},
  {key:'1', value:'Cowell'},
  {key:'2', value:'Stevenson'},
  {key:'3', value:'Crown'},
  {key:'4', value:'Merill'},
  {key:'5', value:'Porter'},
  {key:'6', value:'Kresge'},
  {key:'7', value:'Oaks'},
  {key:'8', value: 'Rachel Carson'},
  {key:'9', value: 'College 9'},
  {key: '10', value: 'John R. Lewis'}
]

const SlugPointData = [
  {key:'1', value:'I want to receive slugPoints'},
  {key:'2', value:'I want to send slugPoints'}
]

export default function TabTwoScreen() {
  const [college, setCollege] = useState(undefined as undefined | string);
  const [name, setName] = useState(undefined as undefined | string);
  const [ifSendSlugPoints, setIfSendSlugPoints] = useState(undefined as undefined | string);
  const [bio, setBio] = useState(undefined as undefined | string);
  const [slugPoints, setSlugPoints] = useState(undefined as undefined | string);
  const colorSheme = useColorScheme();
  const [image, setImage] = useState(null as any);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const [,setIfSignedIn] = useAtom(ifSignedIn);
  const [,setCurrentUser] = useAtom(currentUser);

  const disabled = bio === undefined || name === undefined || name === "" || college === undefined || ifSendSlugPoints === undefined || slugPoints === undefined || slugPoints === '' || bio === '' || college === '';

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const text_color = colorSheme === "dark" ? "white":"black";

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome! Please enter your details below</Text>
      {/* @ts-ignore */}
      <Avatar
        rounded
        onPress={pickImage}
        size="xlarge"
        source={{
          uri:
          image || guest,
        }}
        >
        <Accessory onPress={pickImage} size={40} color="black" />
      </Avatar>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Text style={{paddingLeft: 8}}>Bio</Text>
        <TextInput
          style={[styles.input, {backgroundColor: colorSheme === "dark" ? "#1c1c1e":"#ccc", color: text_color}]}
          selectionColor={text_color}
          placeholderTextColor={text_color}
          onChangeText={(text) => {setBio(text)}}
          value={bio}
          placeholder="What's happening?"
          keyboardType="twitter"
        />
      </View>
      <View>
        <Text style={{paddingLeft: 8}}>Full Name</Text>
        <TextInput
          style={[styles.input, {backgroundColor: colorSheme === "dark" ? "#1c1c1e":"#ccc", color: text_color}]}
          selectionColor={text_color}
          placeholderTextColor={text_color}
          onChangeText={(text) => {setName(text)}}
          value={name}
          placeholder="Name here"
          keyboardType="twitter"
        />
      </View>
      <DropDown setSelected={setCollege} data={Collegedata} title={'College Affiliation'} />
      <DropDown setSelected={setIfSendSlugPoints} data={SlugPointData} title={'Send or Receive SlugPoints?'} />
      <View>
        <Text style={{paddingLeft: 8}}>How many SlugPoints do you have?</Text>
        <TextInput
          style={[styles.input, {backgroundColor: colorSheme === "dark" ? "#1c1c1e":"#ccc", color: text_color}]}
          selectionColor={text_color}
          placeholder="0"
          onChangeText={(text) => {setSlugPoints(text)}}
          value={slugPoints}
          keyboardType="numeric"
        />
      </View>
      <Button loading={submitButtonLoading} style={{marginHorizontal: 20, marginTop: 10, width: 250, borderRadius: 10}} disabled={disabled} buttonColor="#1DA1F2" mode="contained" onPress={async () => {
        setSubmitButtonLoading(true);
        const url = await convertToURL(image, uuid.v4() as string)
        await createUser({name: name || '', bio: bio || '', collegeAffiliation: college || '', ifSendSlugPoints: ifSendSlugPoints || '', slugPoints: slugPoints as any || 0, uid: user!.uid, image: url})
        setCurrentUser({name: name || '', bio: bio || '', collegeAffiliation: college || '', ifSendSlugPoints: ifSendSlugPoints || '', slugPoints: slugPoints as any || 0, image: url || guest, uid: user!.uid});
        setSubmitButtonLoading(false);
        setIfSignedIn(true);
        }}>
        Submit
      </Button>
    </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
