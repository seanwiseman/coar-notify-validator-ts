import { coarNotificationTypeSchemaMap, CoarNotifyNotificationSchema } from "./schemas.ts";


export function getSchemaByType(notificationType: string | string[]): CoarNotifyNotificationSchema | undefined {
    let _type;

    if (Array.isArray(notificationType)) {
        _type = notificationType.join(":")
    } else {
        _type = notificationType
    }

    return coarNotificationTypeSchemaMap[_type as keyof typeof coarNotificationTypeSchemaMap] as CoarNotifyNotificationSchema;
}