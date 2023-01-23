import moment from "moment";
import React, { useRef } from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Message } from "../../types";
import { View, Text } from "../Themed";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import util from "./utils";
import { useAtom } from "jotai";
import { currentUser } from "../../constants/Atoms";

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

  const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback
  );

  const colorScheme = useColorScheme();
  const boxColor = colorScheme === "dark" ? "#1c1c1e" : "#ccc";

  return (
    <View style={styles.container}>
      <View style={{ alignItems: isMyMessage() ? "flex-end" : "flex-start" }}>
        {message.attachmentType === "none" && (
          <Animated.View
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
                color: isMyMessage() ? "white" : Colors[colorScheme].text,
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
          </Animated.View>
        )}
        {message.attachmentType === "image" && (
          <View>
            <AnimatedTouchableWithoutFeedback
              onPress={()=>{setIfVisible(true); setPostUri(message.fileUri)}}
              style={[
                {
                  backgroundColor: isMyMessage()
                    ? Colors["constants"].primary
                    : Colors[colorScheme].background,
                  padding: 2,
                  alignSelf: isMyMessage() ? "flex-end" : "flex-start",
                }
              ]}>
              <Animated.Image
                source={{ uri: message.fileUri }}
                style={[
                  {
                    width: 200,
                    height: 200,
                    alignSelf: "center",
                    overflow: "hidden",
                  }
                ]}
              />
            </AnimatedTouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatMessage;