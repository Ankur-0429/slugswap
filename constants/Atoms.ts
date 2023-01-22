import { atom } from "jotai";

interface userType {
    bio: string;
    collegeAffiliation: string;
    ifSendSlugPoints: string;
    image?: string;
    name: string;
    slugPoints: number;
    uid: string;
}

export const ifSignedIn = atom(false);
export const currentUser = atom(null as null | userType)