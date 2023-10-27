import { expect, test, describe } from "bun:test";
import { validate } from "../src/validate";



describe("validate", () => {

    test("will handle payload not containing a type", () => {
        const payload = {}

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(false);
        expect(errors).toEqual(["type is required"]);
    });

    test("can validate valid review offer", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            id: "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
            origin: {
                "id": "https://research.org/repository",
                "inbox": "https://research.org/inbox",
                "type": "Service"
            },
            target: {
                "id": "https://review-service.com/system",
                "inbox": "https://review-service.com/inbox",
                "type": "Service"
            },
            object: {
                "id": "doi.org/10.5555/12345680",
                "ietf:cite-as": "https://doi.org/10.5555/12345680",
            },
            actor: {
                "id": "https://orcid.org/0000-0002-1825-1234",
                "name": "John Doe",
                "type": "Person"
            },
            type: [
                "Offer",
                "coar-notify:ReviewAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid review accept", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            id: "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
            origin: {
                "id": "https://review-service.com/system",
                "inbox": "https://review-service.com/inbox",
                "type": "Service"
            },
            target: {
                "id": "https://research.org/repository",
                "inbox": "https://research.org/inbox",
                "type": "Service"
            },
            object: {
                id: "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
                object: "https://research-organisation.org/repository/preprint/201203/421/",
                type: [
                    "Offer",
                    "coar-notify:ReviewAction"
                ]
            },
            actor: {
                "id": "https://review-service.com",
                "name": "Review Service",
                "type": "Service"
            },
            type: [
                "Accept",
                "coar-notify:ReviewAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

});

