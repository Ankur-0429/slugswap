import {
    Entypo,
    FontAwesome5,
    Fontisto,
    Ionicons,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import {
    Keyboard,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import Colors from "../../constants/Colors";
  import useColorScheme from "../../hooks/useColorScheme";
  import styles from "./styles";
  import EmojiSelector from "react-native-emoji-selector";
  import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
  } from "react-native-reanimated";
  import { View } from "../Themed";
  import * as MediaLibrary from "expo-media-library";
  import * as ImagePicker from "expo-image-picker";
  import Library from "./Library";
import SubmitMessage from "../../api/submitMessage";
import { getAuth } from "firebase/auth";
import { Message } from "../../types";
import uuid from 'react-native-uuid';
import { useAtom } from "jotai";
import { currentUser } from "../../constants/Atoms";
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    return result;
  };
  
  const getCameraPermsAsync = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    return status === "granted";
  };
  
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    return result;
  };
  
  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  interface InputBoxProps {
    uid: string;
  }
  
  const InputBox = ({uid}: InputBoxProps) => {
    const height = useSharedValue(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [albums, setAlbums] = useState([] as MediaLibrary.Album[]);
    const [currUser] = useAtom(currentUser);

    const [message, setMessage] = useState({} as Message)
  
    const heightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    });
  
    useEffect(() => {
      if (showEmojiPicker || showImagePicker) {
        Keyboard.dismiss();
        height.value = withTiming(400);
      }
      if (!showEmojiPicker && !showImagePicker) {
        height.value = withTiming(0);
      }
    }, [showEmojiPicker, showImagePicker]);
  
    const colorScheme = useColorScheme();
    const boxColor = colorScheme === "dark" ? "#1c1c1e" : "#ccc";

  
    return (
      <View>
        <View style={styles.container}>
          <View
            style={[
              styles.mainContainer,
              { backgroundColor: boxColor },
            ]}>
            {/* <TouchableOpacity
              onPress={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowImagePicker(false);
              }}>
              {showEmojiPicker ? (
                <Ionicons name="close" size={24} color="grey" />
              ) : (
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
              )}
            </TouchableOpacity> */}
            <TextInput
              onFocus={() => {
                setShowEmojiPicker(false);
                setShowImagePicker(false);
              }}
              placeholder="Type a Message"
              placeholderTextColor={"grey"}
              selectionColor={Colors["constants"].primary}
              style={[styles.textInput, { color: Colors[colorScheme].text }]}
              multiline
              value={message.content}
              onChangeText={(text) => {
                setMessage({
                    id: uuid.v4() as string,
                    uid: currUser!.uid,
                    attachmentType: 'none',
                    content: text,
                    createdAt: '1',
                });
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                const loaded = await getPermissionAsync();
                if (loaded) {
                  let als = await MediaLibrary.getAlbumsAsync({
                    includeSmartAlbums: true,
                  });
                  setAlbums(als);
                  setShowImagePicker(!showImagePicker);
                  setShowEmojiPicker(false);
                }
              }}>
              {/* {showImagePicker ? (
                <Ionicons name="close" size={24} color="grey" />
              ) : (
                <Entypo
                  name="attachment"
                  size={24}
                  color="grey"
                  style={styles.icon}
                />
              )} */}
            </TouchableOpacity>
            {/* {message && (
              <TouchableOpacity
                onPress={async () => {
                  const loaded = await getCameraPermsAsync();
                  if (loaded) {
                    const result = await openCamera();
                    if (!result.canceled) {
                    }
                  }
                }}>
                <Fontisto
                  name="camera"
                  size={24}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            )} */}
          </View>
          <TouchableOpacity
            onPress={async () => {
                if (message.content.length > 0) {
                    await SubmitMessage(uid, message)
                    setMessage(m => ({
                        ...m,
                        ...{content: ""}
                    }));
                }
            }}>
            <View style={styles.buttonContainer}>
                <MaterialCommunityIcons name="send" size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <Animated.View style={heightAnimatedStyle}>
          {showEmojiPicker && (
            <EmojiSelector
              showTabs={true}
              showSectionTitles={false}
              showHistory
              showSearchBar={false}
              onEmojiSelected={(emoji) =>
              console.log(emoji)
            }
            />
          )}
          {showImagePicker && <Library albums={albums} />}
        </Animated.View>
      </View>
    );
  };
  
  export default InputBox;