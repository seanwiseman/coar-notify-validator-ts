import { expect, test, describe } from "bun:test";
import { getSchemaByType } from "../src/notifications";
import {
    ReviewAcceptNotificationSchema,
    ReviewAnnounceNotificationSchema,
    ReviewOfferNotificationSchema,
} from "../src/schemas.ts";

describe("notifications", () => {

    test("can get review offer notification schema based on type", () => {
        const notificationType = "Offer:coar-notify:ReviewAction"
        const schema = getSchemaByType(notificationType);
        expect(schema).toBe(ReviewOfferNotificationSchema);
    });

    test("can get review announce notification schema based on type", () => {
        const notificationType = "Announce:coar-notify:ReviewAction"
        const schema = getSchemaByType(notificationType);
        expect(schema).toBe(ReviewAnnounceNotificationSchema);
    });

    test("can get review accept notification schema based on type", () => {
        const notificationType = "Accept:coar-notify:ReviewAction"
        const schema = getSchemaByType(notificationType);
        expect(schema).toBe(ReviewAcceptNotificationSchema);
    });

    test("will receive undefined when a type does not match a schema", () => {
        const notificationType = "INVALID-TYPE"
        const schema = getSchemaByType(notificationType);
        expect(schema).toBeUndefined();
    });

});

