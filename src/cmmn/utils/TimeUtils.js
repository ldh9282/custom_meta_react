export class TimeUtils {
    static getTimestamp() {
        let now = new Date();

        let formatter = new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        return formatter.format(now);
    }
}
