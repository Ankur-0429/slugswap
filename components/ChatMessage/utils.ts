const util = (
  type: "start" | "middle" | "end" | "single",
  isMyMessage: boolean
) => {
  let small = 2;
  let large = 16;

  let borderTopLeftRadius: number = 16;
  let borderTopRightRadius: number = 16;
  let borderBottomLeftRadius: number = 16;
  let borderBottomRightRadius: number = 16;

  if (type === "start") {
    borderTopLeftRadius = !isMyMessage ? small : large;
    borderTopRightRadius = !isMyMessage ? large : small;
    borderBottomLeftRadius = large;
    borderBottomRightRadius = large;
  } else if (type === "end") {
    borderBottomLeftRadius = !isMyMessage ? small : large;
    borderBottomRightRadius = !isMyMessage ? large : small;
    borderTopLeftRadius = large;
    borderTopRightRadius = large;
  } else if (type === "middle") {
    borderTopLeftRadius = !isMyMessage ? small : large;
    borderTopRightRadius = !isMyMessage ? large : small;
    borderBottomLeftRadius = !isMyMessage ? small : large;
    borderBottomRightRadius = !isMyMessage ? large : small;
  } else if (type === "single") {
    borderTopLeftRadius = large;
    borderTopRightRadius = large;
    borderBottomLeftRadius = large;
    borderBottomRightRadius = large;
  }

  return {
    borderBottomLeftRadius: borderBottomLeftRadius,
    borderBottomRightRadius: borderBottomRightRadius,
    borderTopLeftRadius: borderTopLeftRadius,
    borderTopRightRadius: borderTopRightRadius,
  };
};

export default util;
