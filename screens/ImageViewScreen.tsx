import { Modal, Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import Layout from "../constants/Layout";
import ImageViewer from "react-native-image-zoom-viewer";
import { View, Text } from "../components/Themed";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { showMessage } from "react-native-flash-message";
import { findCache } from "../constants/findCache";
import * as FileSystem from "expo-file-system";

// npm i react-native-image-gallery-refis360movil

const gifDir = FileSystem.cacheDirectory + "giphy/";
const gifFileUri = (gifId: string) => gifDir + `gif_${gifId}_200.gif`;
const gifUrl = (gifId: string) =>
  `https://media1.giphy.com/media/${gifId}/200.gif`;

// Checks if gif directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(gifDir);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
  }
}

// Downloads all gifs specified as array of IDs
export async function addMultipleGifs(gifIds: string[]) {
  try {
    await ensureDirExists();

    console.log("Downloading", gifIds.length, "gif files...");
    await Promise.all(
      gifIds.map((id) => FileSystem.downloadAsync(gifUrl(id), gifFileUri(id)))
    );
  } catch (e) {
    console.error("Couldn't download gif files:", e);
  }
}

// Returns URI to our local gif file
// If our gif doesn't exist locally, it downloads it
export async function getSingleGif(gifId: string) {
  await ensureDirExists();

  const fileUri = gifFileUri(gifId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    console.log("Gif isn't cached locally. Downloading...");
    await FileSystem.downloadAsync(gifUrl(gifId), fileUri);
  }

  return fileUri;
}

// Exports shareable URI - it can be shared outside your app
export async function getGifContentUri(gifId: string) {
  return FileSystem.getContentUriAsync(await getSingleGif(gifId));
}

interface ImageViewProps {
  postUri: { url: string }[];
  ifVisible: boolean;
  setIfVisible: any;
}

const ImageView: React.FC<ImageViewProps> = ({
  postUri,
  ifVisible,
  setIfVisible,
}) => {
  const desiredWidth = Layout.window.width;

  const images = postUri;

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [ifDone, setIfDone] = useState(false);
  const showSuccess = (check: boolean) => {
    if (check) {
      showMessage({
        message: "Successfully Downloaded",
        type: "success",
      });
      setIfDone(true);
      setTimeout(() => {
        setIfDone(false);
      }, 2000);
    }
  };

  function get_url_extension(url:any) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  const shareFile = async (uri: string) => {
    if (!uri.startsWith("file:///")) {
      const data = await findCache(uri, get_url_extension(uri));
      console.log(data);
      uri = data;
    }
    const UTI = "public.item";
    await Sharing.shareAsync(uri, { UTI }).then((res) => {
      console.log(res);
    });
  };

  const saveFile = async (uri: string) => {
    if (!uri.startsWith("file:///")) {
      const data = await findCache(uri, get_url_extension(uri));
      console.log(data);
      uri = data;
    }

    if (status) {
      console.log("testing...");
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset);
      const album = await MediaLibrary.getAlbumAsync("Waypoint");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Waypoint", asset, false).then(
          () => {
            showSuccess(true);
          }
        );
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false).then(
          (res) => {
            if (res) {
              showSuccess(res);
            }
          }
        );
      }
    } else {
      await requestPermission().then((onFullfilled) => {
        console.log(onFullfilled);
      });
    }
  };

  const [swipe, setSwipe] = useState(0);

  return (
    <Modal
      visible={ifVisible}
      onRequestClose={() => {
        setIfVisible(false);
        setSwipe(0);
      }}
      animationType={"slide"}>
      <StatusBar hidden showHideTransition={"slide"} translucent />
      <View style={{ flex: 1 }}>
        <ImageViewer
          enablePreload
          onSwipeDown={() => {
            setIfVisible(false);
            setSwipe(0);
          }}
          enableImageZoom
          enableSwipeDown
          onMove={(res) => {
            if (res) {
              if (res.positionY >= 0) {
                setSwipe(res.positionY);
              }
            }
          }}
          useNativeDriver
          imageUrls={images}
          renderHeader={(currentIndex) => {
            return (
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "transparent",
                  width: Layout.window.width,
                  top: getStatusBarHeight(false) - swipe,
                  zIndex: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIfVisible(false);
                    setSwipe(0);
                  }}>
                  <AntDesign
                    name="close"
                    size={24}
                    color="white"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: 12,
                      overflow: "hidden",
                      padding: 5,
                    }}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "transparent",
                  }}>
                  <TouchableOpacity
                    onPress={async () => {
                      if (currentIndex !== undefined) {
                        await shareFile(images[currentIndex].url);
                      }
                    }}>
                    <Ionicons
                      name="share-outline"
                      size={24}
                      color="white"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: 12,
                        overflow: "hidden",
                        padding: 5,
                        marginRight: 5,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={async () => {
                      if (currentIndex !== undefined) {
                        await saveFile(images[currentIndex].url);
                      }
                    }}>
                    {ifDone ? (
                      <MaterialIcons
                        name="file-download-done"
                        size={24}
                        color="white"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          borderRadius: 12,
                          overflow: "hidden",
                          padding: 5,
                        }}
                      />
                    ) : (
                      <MaterialIcons
                        name="file-download"
                        size={24}
                        color="white"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          borderRadius: 12,
                          overflow: "hidden",
                          padding: 5,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ImageView;