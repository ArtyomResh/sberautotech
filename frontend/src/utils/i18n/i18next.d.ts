/* eslint-disable @typescript-eslint/naming-convention */
import { defaultNS, TLocale, TLanguageResource } from '.';


declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS,
        resources: TLanguageResource,
        lng: TLocale
    }

}
