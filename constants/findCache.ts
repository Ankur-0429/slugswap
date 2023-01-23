// @ts-ignore
import shorthash from "shorthash";

import * as FileSystem from "expo-file-system";

export const findCache = async (uri:string, type:string) => {
  const name = shorthash.unique(uri);
  const path = FileSystem.cacheDirectory + name + "." + type.toLocaleLowerCase();
    
  const image = await FileSystem.getInfoAsync(path);

  if (image.exists) {
    return image.uri;
  }

  const data = await FileSystem.downloadAsync(uri, path)
  .then((res)=>{
    return res.uri;
  })
  .catch((err)=>{
    console.log(err)
    return uri;
  })
  return data;
};