import { Message } from "../types";

// id: string,
//   attachmentType: "none" | "image",
//   content: string,
//   createdAt: string,
//   fileUri: string,

const messages = [
  {
    id: "m2",
    fileUri: "",
    content: "How are you, Suchi!",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
  {
    id: "m2",
    content: "I am good, good",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
  {
    id: "m2",
    content: "What about you?",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
  {
    id: "m2",
    content: "Good as well, preparing for the stream now.",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
  {
    id: "m2",
    content: "How is your uni going?",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
  {
    id: "m2",
    content:
      "It is a bit tough, as I have 2 specializations. How about yours? Do you enjoy it?",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
  {
    id: "m7",
    content:
      "Big Data is really interesting. Cannot wait to go through all the material.",
    createdAt: "2022-05-06T03:53:00.000Z",
    attachmentType: 'none',
  },
] as Message[];

export default messages
