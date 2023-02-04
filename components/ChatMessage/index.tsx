import moment from "moment";
import React from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Message } from "../../types";
import { View, Text } from "../Themed";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import util from "./utils";
import { useAtom } from "jotai";
import { currentUser } from "../../constants/Atoms";
import {Image} from 'react-native';

export type ChatMessageProps = {
  message: Message;
  type: "start" | "middle" | "end" | "single";
  users: any;
  setPostUri: any;
  setIfVisible: any;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message, type, users, setPostUri, setIfVisible } = props;
  const [currUser] = useAtom(currentUser);
  const isMyMessage = () => {
    return message.uid === currUser!.uid;
  };

  const { borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius } = util(type, isMyMessage());

  const colorScheme = useColorScheme();
  const boxColor = Colors.light.box;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: isMyMessage() ? "flex-end" : "flex-start" }}>
        {message.attachmentType === "none" && (
          <View
            style={[
              styles.messageBox,
              {
                backgroundColor: isMyMessage()
                  ? Colors["constants"].primary
                  : boxColor,
                marginLeft: isMyMessage() ? 50 : 0,
                marginRight: isMyMessage() ? 0 : 50,
                borderBottomLeftRadius,
                borderBottomRightRadius,
                borderTopLeftRadius,
                borderTopRightRadius
              },
            ]}>
            {!isMyMessage() && (
              <Text style={styles.name}>{users.name}</Text>
            )}

            <Text
              style={{
                color: isMyMessage() ? "white" : Colors.light.text,
              }}>
              {message.content}
            </Text>

            <Text
              style={{
                alignSelf: "flex-end",
                color: isMyMessage() ? "#D3D3D3" : "grey",
              }}>
              {moment(message.createdAt).fromNow()}
            </Text>
          </View>
        )}
        {message.attachmentType === "image" && (
          <View>
            <TouchableWithoutFeedback
              onPress={()=>{setIfVisible(true); setPostUri(message.fileUri)}}
              style={[
                {
                  backgroundColor: isMyMessage()
                    ? Colors["constants"].primary
                    : Colors.light.background,
                  padding: 2,
                  alignSelf: isMyMessage() ? "flex-end" : "flex-start",
                }
              ]}>
              <Image
                source={{ uri: message.fileUri }}
                style={
                  {
                    width: 200,
                    height: 200,
                    alignSelf: "center",
                    overflow: "hidden",
                  }
                }
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatMessage;