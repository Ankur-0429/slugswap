import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button } from "react-native-paper";
import follow from "../api/follow";
import Colors from "../constants/Colors";
import useConnection from "../hooks/useConnection";

interface FollowButtonProps {
    wantsSlugPoints ?: boolean;
    uid: string;
}

const FollowButton = ({wantsSlugPoints, uid}: FollowButtonProps) => {
    const {requested, dms} = useConnection();
    const [loading, setLoading] = useState(false);
    
    const get_text = () => {
        if (dms.includes(uid)) {
            return "Message"
        }
        if (requested.includes(uid)) {
            return "Requested";
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

    const navigation = useNavigation();

    return (
        <Button loading={loading} buttonColor={text === "Requested" ? "grey":Colors.constants.primary} icon={icon} mode="contained" onPress={async () => {
            if (text === "Give SlugPoints" || text === "Request SlugPoints") {
                setLoading(true);
                await follow(uid);
                setLoading(false);
            }
            if (text === "Message") {
                navigation.navigate("message", {uid: uid})
            }
        }}>
            {text}
        </Button>
    )
}

export default FollowButton;