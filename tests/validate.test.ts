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

    test("can validate valid review announce", () => {
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
                id: "https://review-service.com/review/geo/202103/0021",
                "ietf:cite-as": "https://doi.org/10.3214/987654",
                type: [
                    "Document",
                    "sorg:Review"
                ]
            },
            actor: {
                "id": "https://review-service.com",
                "name": "Review Service",
                "type": "Service"
            },
            type: [
                "Announce",
                "coar-notify:ReviewAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid endorsement announce", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            actor: {
                id: "https://overlay-journal.com",
                name: "Overlay Journal",
                type: "Service"
            },
            context: {
                id: "https://research-organisation.org/repository/preprint/201203/421/",
                "ietf:cite-as": "https://doi.org/10.5555/12345680",
                type: "sorg:AboutPage",
                url: {
                    id: "https://research-organisation.org/repository/preprint/201203/421/content.pdf",
                    mediaType: "application/pdf",
                    type: [
                        "Article",
                        "sorg:ScholarlyArticle"
                    ]
                }
            },
            id: "urn:uuid:94ecae35-dcfd-4182-8550-22c7164fe23f",
            object: {
                id: "https://overlay-journal.com/articles/00001/",
                "ietf:cite-as": "https://overlay-journal.com/articles/00001/",
                type: [
                    "Page",
                    "sorg:WebPage"
                ]
            },
            origin: {
                id: "https://overlay-journal.com/system",
                inbox: "https://overlay-journal.com/inbox/",
                type: "Service"
            },
            target: {
                id: "https://research-organisation.org/repository",
                inbox: "https://research-organisation.org/inbox/",
                type: "Service"
            },
            type: [
                "Announce",
                "coar-notify:EndorsementAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid endorsement offer", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            "actor": {
                "id": "https://orcid.org/0000-0002-1825-0097",
                "name": "Josiah Carberry",
                "type": "Person"
            },
            "id": "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
            "object": {
                "id": "https://research-organisation.org/repository/preprint/201203/421/",
                "ietf:cite-as": "https://doi.org/10.5555/12345680",
                "type": "sorg:AboutPage",
                "url": {
                    "id": "https://research-organisation.org/repository/preprint/201203/421/content.pdf",
                    "mediaType": "application/pdf",
                    "type": [
                        "Article",
                        "sorg:ScholarlyArticle"
                    ]
                }
            },
            "origin": {
                "id": "https://research-organisation.org/repository",
                "inbox": "https://research-organisation.org/inbox/",
                "type": "Service"
            },
            "target": {
                "id": "https://overlay-journal.com/system",
                "inbox": "https://overlay-journal.com/inbox/",
                "type": "Service"
            },
            "type": [
                "Offer",
                "coar-notify:EndorsementAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid ingest announce", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            "actor": {
                "id": "https://research-organisation.org",
                "name": "Research Organisation",
                "type": "Organization"
            },
            "context": {
                "id": "https://research-organisation.org/repository/preprint/201203/421/",
                "ietf:cite-as": "https://doi.org/10.5555/12345680",
                "type": "sorg:AboutPage",
                "url": {
                    "id": "https://research-organisation.org/repository/preprint/201203/421/content.pdf",
                    "mediaType": "application/pdf",
                    "type": [
                        "Article",
                        "sorg:ScholarlyArticle"
                    ]
                }
            },
            "id": "urn:uuid:94ecae35-dcfd-4182-8550-22c7164fe23f",
            "inReplyTo": "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
            "object": {
                "id": "https://research-organisation.org/repository/preprint/201203/421/",
                "ietf:cite-as": "https://doi.org/10.5555/12345680",
                "type": "sorg:AboutPage",
                "url": {
                    "id": "https://research-organisation.org/repository/preprint/201203/421/content.pdf",
                    "mediaType": "application/pdf",
                    "type": [
                        "Article",
                        "sorg:ScholarlyArticle"
                    ]
                }
            },
            "origin": {
                "id": "https://research-organisation.org/repository",
                "inbox": "https://research-organisation.org/inbox/",
                "type": "Service"
            },
            "target": {
                "id": "https://overlay-journal.com/system",
                "inbox": "https://overlay-journal.com/inbox/",
                "type": "Service"
            },
            "type": [
                "Announce",
                "coar-notify:IngestAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });
});

