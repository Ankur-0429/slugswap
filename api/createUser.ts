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
  await setDoc(doc(db, "users", props.uid), {
    name: props.name,
    image: props.image || guest,
    collegeAffiliation: props.collegeAffiliation,
    ifSendSlugPoints: props.ifSendSlugPoints === "I want to send slugPoints",
    slugPoints: props.slugPoints,
    bio: props.bio
  });
};

export default createUser;
