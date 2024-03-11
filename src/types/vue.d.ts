import { Dayjs } from "dayjs";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $dateFormat: (date: string | Dayjs) => string;
  }
}
