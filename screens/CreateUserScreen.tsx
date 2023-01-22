import { KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Avatar, Accessory } from 'react-native-elements';


import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react';
import useColorScheme from '../hooks/useColorScheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

interface DropDownProps {
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  data: {
    key: string;
    value: string;
  }[];
  title?: string;
}


const DropDown = ({setSelected, data, title}:DropDownProps) => {
  const colorScheme = useColorScheme();
  const BoxColor = colorScheme === "dark" ? "white":"#ccc";
  
  return(
    <View style={{marginVertical: 10}}>
      <Text style={{paddingLeft: 5}}>{title}</Text>
      <SelectList 
          setSelected={(val: any) => setSelected(val)} 
          dropdownStyles={{backgroundColor:  BoxColor}}
          boxStyles={{backgroundColor: BoxColor, width: 250, height: 40}}
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
  const [college, setCollege] = useState(null as any);
  const [ifSendSlugPoints, setIfSendSlugPoints] = useState(null as any);
  const [bio, setBio] = useState(null as any);
  const [slugPoints, setSlugPoints] = useState(null as any);
  const colorSheme = useColorScheme();
  const [image, setImage] = useState(null as any);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
          'https://news.ucsc.edu/2020/07/images/strongslugredwood4001.jpg',
        }}
        >
        <Accessory onPress={pickImage} size={40} color="black" />
      </Avatar>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Text style={{paddingLeft: 8}}>Bio</Text>
        <TextInput
          style={[styles.input, {backgroundColor: colorSheme === "dark" ? "white":"#ccc"}]}
          selectionColor="black"
          placeholderTextColor="black"
          onChangeText={(text) => {setBio(text)}}
          value={bio}
          placeholder="What's happening?"
          keyboardType="twitter"
        />
      </View>
      <DropDown setSelected={setCollege} data={Collegedata} title={'College Affiliation'} />
      <DropDown setSelected={setIfSendSlugPoints} data={SlugPointData} title={'Send or Receive SlugPoints?'} />
      <View>
        <Text style={{paddingLeft: 8}}>How many SlugPoints do you have?</Text>
        <TextInput
          style={[styles.input, {backgroundColor: colorSheme === "dark" ? "white":"#ccc"}]}
          selectionColor="black"
          placeholderTextColor="black"
          onChangeText={(text) => {setSlugPoints(text)}}
          value={slugPoints}
          keyboardType="numeric"
        />
      </View>
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
