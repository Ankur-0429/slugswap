/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Register: undefined;
  UserCreate: undefined;
  message: {uid: string};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type Message = {
  id: string,
  uid: string,
  attachmentType: "none" | "image",
  content: string,
  createdAt: string,
  fileUri?: string,
}

export type UserType = {
  id: string;
  name: string;
  username: string;
  image?: ImageType;
}

export type ImageType = {
  url: string;
  mediaType: string;
}

export type PostType = {
  id: string;
  user: UserType;
  createdAt: string;
  content: string;
  image?: ImageType;
  numberOfComments: number;
  numberOfLikes: number;
  numberOfWayPoints: number;
}

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
