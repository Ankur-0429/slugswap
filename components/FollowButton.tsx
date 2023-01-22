import { getAuth } from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { Button } from "react-native-paper";
import follow from "../api/follow";
import { currentUser } from "../constants/Atoms";
import useConnection from "../hooks/useConnection";

interface FollowButtonProps {
    wantsSlugPoints ?: boolean;
    uid: string;
}

const FollowButton = ({wantsSlugPoints, uid}: FollowButtonProps) => {
    const {requested, dms} = useConnection();
    const [loading, setLoading] = useState(false);
    
    const get_text = () => {
        if (requested.includes(uid)) {
            return "Requested";
        }
        if (dms.includes(uid)) {
            return "Message"
        }
        return wantsSlugPoints ? "Request SlugPoints" : "Give SlugPoints";
    }

    const get_icon = () => {
        if (requested.includes(uid)) {
            return "account";
        }
        if (dms.includes(uid)) {
            return "message"
        }
        return wantsSlugPoints ? "currency-usd" : "send";
    }

    const text = get_text();
    const icon = get_icon();

    return (
        <Button loading={loading} buttonColor={text === "Requested" ? "grey":"#1DA1F2"} icon={icon} mode="contained" onPress={async () => {
            if (text === "Give SlugPoints" || text === "Request SlugPoints") {
                setLoading(true);
                await follow(uid);
                setLoading(false);
            }
        }}>
            {text}
        </Button>
    )
}

export default FollowButton;