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

});

