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

    test("can validate valid ingest offer", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            "actor": {
                "id": "https://overlay-journal.com",
                "name": "Overlay Journal",
                "type": "Service"
            },
            "id": "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
            "object": {
                "id": "https://overlay-journal.com/submissions/00001/",
                "type": "sorg:AboutPage",
                "url": {
                    "id": "https://overlay-journal.com/submissions/00001/files/content.pdf",
                    "mediaType": "application/pdf",
                    "type": [
                        "Article",
                        "sorg:ScholarlyArticle"
                    ]
                }
            },
            "origin": {
                "id": "https://overlay-journal.com/system",
                "inbox": "https://overlay-journal.com/inbox/",
                "type": "Service"
            },
            "target": {
                "id": "https://research-organisation.org/repository",
                "inbox": "https://research-organisation.org/inbox/",
                "type": "Service"
            },
            "type": [
                "Offer",
                "coar-notify:IngestAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid relationship announce offer", () => {
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
                "id": "https://another-research-organisation.org/repository/datasets/item/201203421/",
                "ietf:cite-as": "https://doi.org/10.5555/999555666",
                "type": "sorg:AboutPage",
                "url": {
                    "id": "https://another-research-organisation.org/repository/datasets/item/201203421/data_archive.zip",
                    "mediaType": "application/zip",
                    "type": [
                        "Article",
                        "sorg:Dataset"
                    ]
                }
            },
            "id": "urn:uuid:94ecae35-dcfd-4182-8550-22c7164fe23f",
            "object": {
                "as:object": "https://another-research-organisation.org/repository/datasets/item/201203421/",
                "as:relationship": "http://purl.org/vocab/frbr/core#supplement",
                "as:subject": "https://research-organisation.org/repository/item/201203/421/",
                "id": "urn:uuid:74FFB356-0632-44D9-B176-888DA85758DC",
                "type": "Relationship"
            },
            "origin": {
                "id": "https://research-organisation.org/repository",
                "inbox": "https://research-organisation.org/inbox/",
                "type": "Service"
            },
            "target": {
                "id": "https://another-research-organisation.org/repository",
                "inbox": "https://another-research-organisation.org/inbox/",
                "type": "Service"
            },
            "type": [
                "Announce",
                "coar-notify:RelationshipAction"
            ]
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid undo action", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            "actor": {
                "id": "https://some-organisation.org",
                "name": "Some Organisation",
                "type": "Organization"
            },
            "id": "urn:uuid:46956915-e3fe-4528-8789-1d325a356e4f",
            "object": {
                "id": "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
                "object": "https://some-organisation.org/resource/0021",
                "type": "Offer"
            },
            "origin": {
                "id": "https://some-organisation.org",
                "inbox": "https://some-organisation.org/inbox/",
                "type": "Organization"
            },
            "target": {
                "id": "https://generic-service.com/system",
                "inbox": "https://generic-service.com/system/inbox/",
                "type": "Service"
            },
            "type": "Undo"
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });

    test("can validate valid tentative accept action", () => {
        const payload = {
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://purl.org/coar/notify"
            ],
            "actor": {
                "id": "https://generic-service.com",
                "name": "Generic Service",
                "type": "Service"
            },
            "context": {
                "id": "https://some-organisation.org/resource/0021",
                "ietf:cite-as": "https://doi.org/10.4598/12123487",
                "type": "Document"
            },
            "id": "urn:uuid:4fb3af44-d4f8-4226-9475-2d09c2d8d9e0",
            "inReplyTo": "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
            "object": {
                "id": "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd",
                "object": "https://some-organisation.org/resource/0021",
                "type": "Offer"
            },
            "origin": {
                "id": "https://generic-service.com/system",
                "inbox": "https://generic-service.com/system/inbox/",
                "type": "Service"
            },
            "target": {
                "id": "https://some-organisation.org",
                "inbox": "https://some-organisation.org/inbox/",
                "type": "Organization"
            },
            "type": "TentativeAccept"
        }

        const { isValid, errors } = validate(payload);

        expect(isValid).toBe(true);
        expect(errors).toEqual([]);
    });
});

