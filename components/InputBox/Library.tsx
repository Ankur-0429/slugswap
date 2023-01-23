import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "../Themed";
import {
  FlatList,
  ImageBackground,
  Platform,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import Layout from "../../constants/Layout";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface LibraryProps {
  albums: MediaLibrary.Album[];
}

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 100;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const Library: React.FC<LibraryProps> = ({ albums }) => {
  const [photos, setPhotos] = useState(
    undefined as MediaLibrary.PagedInfo<MediaLibrary.Asset> | undefined
  );

  const [message, setMessage] = useState('' as any);

  albums.sort((a, b) => b.assetCount - a.assetCount);

  let als = [];
  for (let i = 0; i < albums.length; i++) {
    als.push({ label: albums[i].title, value: `${i}` });
    if (i > 5) {
      break;
    }
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(als);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const get_pics = async (album: MediaLibrary.Album) => {
      if (album) {
        let getPhotos = await MediaLibrary.getAlbumAsync(album.title);
        let getAllPhotos = await MediaLibrary.getAssetsAsync({
          first: 100,
          album: getPhotos,
          sortBy: "creationTime",
          mediaType: ["photo", "video"],
        });
        setPhotos(getAllPhotos);
      }
    };

    get_pics(albums[index]);
    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [index]);

  const [addData, setAddData] = useState(false);
  useEffect(() => {
    const adding = async () => {
      if (photos && photos.hasNextPage) {
        const getPhotos = await MediaLibrary.getAlbumAsync(albums[index].title);
        const getAllPhotos = await MediaLibrary.getAssetsAsync({
          first: 100,
          after: photos.assets[photos.assets.length - 1],
          album: getPhotos,
          sortBy: "creationTime",
          mediaType: ["photo", "video"],
        });
        let temp = JSON.parse(
          JSON.stringify(photos)
        ) as MediaLibrary.PagedInfo<MediaLibrary.Asset>;
        temp.assets.push(...getAllPhotos.assets);
        setPhotos(temp);
      }
    };
    adding();
  }, [addData]);

  const deviceWidth = Layout.window.width;

  const colorScheme = useColorScheme();

  return (
    <View>
      {Platform.OS === "android" && (
        <DropDownPicker
          open={open}
          mode="BADGE"
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => {
            setIndex(parseInt(item.value || "0"));
          }}
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderColor: Colors[colorScheme].background,
            backgroundColor: Colors[colorScheme].background,
            overflow: "hidden",
          }}
          textStyle={{
            color: "grey",
          }}
          dropDownContainerStyle={{
            backgroundColor: Colors[colorScheme].background,
          }}
        />
      )}
      <FlatList
        ref={flatListRef}
        data={photos?.assets}
        numColumns={3}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setAddData(!addData);
          }
        }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        renderItem={(item) => {
          const e = item.item;
          const i = item.index;

          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => {
               
              }}
              style={{ padding: 1 }}>
              <ImageBackground
                source={{ uri: e.uri }}
                style={{
                  width: deviceWidth / 3 - 2,
                  height: deviceWidth / 3 - 2,
                }}>
                {e.mediaType === "video" && (
                  <View
                    style={{
                      marginTop: "auto",
                      backgroundColor: "transparent",
                      alignItems: "flex-end",
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        paddingHorizontal: 3,
                        paddingVertical: 2,
                        borderRadius: 5,
                        color: Colors[colorScheme].text,
                      }}>
                      {new Date(Math.round(e.duration) * 1000)
                      .toISOString()
                      .substring(14, 19)}
                    </Text>
                  </View>
                )}
              </ImageBackground>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

export default Library;