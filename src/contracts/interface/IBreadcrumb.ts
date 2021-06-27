import { LocaleKey } from "../../localization/LocaleKey";

export interface IBreadcrumb {
    id: number;
    name: LocaleKey;
    isActive: boolean;
}