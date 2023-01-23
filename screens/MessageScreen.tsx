import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Message } from "../types";
import "react-native-get-random-values";
import uuid from "react-native-uuid";
import ImageView from "./ImageViewScreen";
import { getFirestore, where, collection, query, onSnapshot } from "firebase/firestore";
import { useAtom } from "jotai";
import { currentUser } from "../constants/Atoms";
import { useRoute } from "@react-navigation/native";
import useUser from "../hooks/useUser";

const MessageScreen = () => {

  const colorScheme = useColorScheme();
  const [currUser] = useAtom(currentUser);
  const {user} = useUser(currUser!.uid);

  const route = useRoute();
  // @ts-ignore
  const message_uid = route.params!.uid as string;

  const firestore = getFirestore();
  const dmRef = collection(firestore, "dms");
  const q =  query(dmRef, where("users", "array-contains-any", [message_uid, currUser?.uid]))

  const [messages, setMessages] = useState([] as Message[]);
  console.log(messages);
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const d = [] as any;
      snapshot.docs.forEach((doc) => {
        d.push(doc.data())
      })
      setMessages(d[0].messages || []);
    });
    return unsubscribe;
  }, []);


  const [postUri, setPostUri] = useState("");
  const [ifVisible, setIfVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={[
        {
          width: "100%",
          height: "100%",
          backgroundColor: Colors[colorScheme].background,
        },
      ]}>
      {/* <ImageView postUri={[{url: postUri}]} ifVisible={ifVisible} setIfVisible={setIfVisible}  /> */}
      <FlatList
        data={messages.sort(function(a,b){
            return new Date(b.createdAt) as any - (new Date(a.createdAt) as any);
        })}
        renderItem={({ item, index }) => {
          let type: "single" | "start" | "middle" | "end";
          const i = index;
          const e = item;

          if (
            (i + 1 === messages.length || e.id != messages[i + 1].id) &&
            (i - 1 < 0 || e.id != messages[i - 1].id)
          ) {
            type = "single";
          } else if (i + 1 === messages.length || e.id != messages[i + 1].id) {
            type = "end";
          } else if (i - 1 < 0 || e.id != messages[i - 1].id) {
            type = "start";
          } else {
            type = "middle";
          }

          return (
            <ChatMessage key={item.id} message={item} type={type} users={user} setPostUri={setPostUri} setIfVisible={setIfVisible} />
          );
        }}
        inverted
      />
      <InputBox uid={message_uid} />
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;