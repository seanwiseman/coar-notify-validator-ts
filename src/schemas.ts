import { z } from "zod";

const UUIDPattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
export const IdSchema = z.string()
    .regex(
        new RegExp(`^urn:uuid:${UUIDPattern.source}$`),
        "Must be a valid UUID format prefixed with 'urn:uuid:'"
    );

export const ContextSchema = z.tuple([
    z.literal("https://www.w3.org/ns/activitystreams"),
    z.literal("https://purl.org/coar/notify")
]);

export const OriginOrTargetSchema = z.object({
    id: z.string().url(),
    inbox: z.string().url(),
    type: z.literal("Service"),
});

export const ObjectSchema = z.object({
    id: z.string(),
});

export const ActorSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["Person", "Service"]),
});

export const BaseNotificationSchema = z.object({
    "@context": ContextSchema,
    id: IdSchema,
    origin: OriginOrTargetSchema,
    target: OriginOrTargetSchema,
    object: ObjectSchema,
    actor: ActorSchema,
});

export type CoarNotifyNotificationSchema = typeof ReviewAcceptNotificationSchema
    | typeof ReviewAnnounceNotificationSchema
    | typeof ReviewOfferNotificationSchema;

export const ReviewAnnounceNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Announce"),
        z.literal("coar-notify:ReviewAction")
    ]),
});
export const ReviewAcceptNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Accept"),
        z.literal("coar-notify:ReviewAction")
    ]),
});
export const ReviewOfferNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Offer"),
        z.literal("coar-notify:ReviewAction")
    ]),
});

export const coarNotificationTypeSchemaMap = {
    "Accept:coar-notify:ReviewAction": ReviewAcceptNotificationSchema,
    "Announce:coar-notify:ReviewAction": ReviewAnnounceNotificationSchema,
    "Offer:coar-notify:ReviewAction": ReviewOfferNotificationSchema,
};
