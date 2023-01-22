import { getFirestore, setDoc, doc } from 'firebase/firestore/lite';
import { guest } from '../constants/Profile';

interface createUserProps {
    uid: string;
    bio: string;
    collegeAffiliation: string;
    ifSendSlugPoints: string;
    image?: string;
    name: string;
    slugPoints: number;
}

const createUser = async (props: createUserProps) => {
  const db = getFirestore();
  let date = new Date().toJSON();
  console.log(props.ifSendSlugPoints);
  console.log(props.ifSendSlugPoints === "I want to send slugPoints");
  await setDoc(doc(db, "users", props.uid), {
    name: props.name,
    image: props.image || guest,
    collegeAffiliation: props.collegeAffiliation,
    ifSendSlugPoints: props.ifSendSlugPoints === "I want to send slugPoints",
    slugPoints: props.slugPoints,
    bio: props.bio,
    dateCreated: date,
  });
};

export default createUser;
