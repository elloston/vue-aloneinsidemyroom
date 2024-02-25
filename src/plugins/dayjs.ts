import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default {
  install(app) {
    app.config.globalProperties.$dateFormat = function (date) {
      return dayjs(date).fromNow();
    };
  },
};
