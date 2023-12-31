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
    type: z.enum(["Organization", "Service"]),
});

export const ObjectSchema = z.object({
    id: z.string(),
});

export const ActorSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["Application", "Group", "Organization", "Person", "Service"]),
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
    | typeof ReviewOfferNotificationSchema
    | typeof EndorsementAnnounceNotificationSchema
    | typeof EndorsementOfferNotificationSchema
    | typeof IngestAnnounceNotificationSchema
    | typeof IngestOfferNotificationSchema
    | typeof RelationshipAnnounceNotificationSchema
    | typeof AnnounceNotificationSchema
    | typeof TentativeAcceptNotificationSchema
    | typeof TentativeRejectNotificationSchema
    | typeof UndoNotificationSchema;

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

export const EndorsementAnnounceNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Announce"),
        z.literal("coar-notify:EndorsementAction")
    ]),
});

export const EndorsementOfferNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Offer"),
        z.literal("coar-notify:EndorsementAction")
    ]),
});

export const IngestAnnounceNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Announce"),
        z.literal("coar-notify:IngestAction")
    ]),
});

export const IngestOfferNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Offer"),
        z.literal("coar-notify:IngestAction")
    ]),
});

export const RelationshipAnnounceNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.tuple([
        z.literal("Announce"),
        z.literal("coar-notify:RelationshipAction")
    ]),
});

export const AnnounceNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.literal("Announce")
});

export const RejectNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.literal("Reject")
});

export const TentativeAcceptNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.literal("TentativeAccept")
});

export const TentativeRejectNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.literal("TentativeReject")
});

export const UndoNotificationSchema = z.object({
    ...BaseNotificationSchema.shape,
    type: z.literal("Undo")
});

export const CoarNotificationTypeSchemaMap = {
    // Review Actions
    "Accept:coar-notify:ReviewAction": ReviewAcceptNotificationSchema,
    "Announce:coar-notify:ReviewAction": ReviewAnnounceNotificationSchema,
    "Offer:coar-notify:ReviewAction": ReviewOfferNotificationSchema,

    // Endorsement Actions
    "Announce:coar-notify:EndorsementAction": EndorsementAnnounceNotificationSchema,
    "Offer:coar-notify:EndorsementAction": EndorsementOfferNotificationSchema,

    // Ingest Actions
    "Announce:coar-notify:IngestAction": IngestAnnounceNotificationSchema,
    "Offer:coar-notify:IngestAction": IngestOfferNotificationSchema,

    // Relationship Actions
    "Announce:coar-notify:RelationshipAction": RelationshipAnnounceNotificationSchema,

    // Misc
    "Announce": AnnounceNotificationSchema,
    "Reject": RejectNotificationSchema,
    "TentativeAccept": TentativeAcceptNotificationSchema,
    "TentativeReject": TentativeRejectNotificationSchema,
    "Undo": UndoNotificationSchema,

};
