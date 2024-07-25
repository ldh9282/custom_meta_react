import { useState } from "react";
import { TimeUtils } from "../utils/TimeUtils";

const Timer = () => {
    const [time, setTime] = useState(TimeUtils.getTimestamp());

    let interval = setInterval(() => {
        setTime(TimeUtils.getTimestamp());
    }, 1000);
    return <div>{time}</div>;
};
export default Timer;
