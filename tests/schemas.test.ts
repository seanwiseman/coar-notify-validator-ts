import { expect, test, describe } from "bun:test";
// @ts-ignore
import { SafeParseReturnType } from "zod/lib/types";
import {
    ActorSchema,
    ContextSchema,
    IdSchema,
    ObjectSchema,
    OriginOrTargetSchema,
} from "../src/schemas.ts";

describe("IdSchema", () => {
    test("can validate valid id", () => {
        const payload = "urn:uuid:0370c0fb-bb78-4a9b-87f5-bed307a509dd";

        const { success } = IdSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(true);
    });

    test("can detect invalid id", () => {
        const payload = "INVALID-ID";

        const { success, error } = IdSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_string",
                    message: "Must be a valid UUID format prefixed with 'urn:uuid:'",
                    path: [],
                    validation: "regex"
                }

            ]
        );
    });
});

describe("ContextSchema", () => {
    test("can validate valid @context", () => {
        const payload = [
            "https://www.w3.org/ns/activitystreams",
            "https://purl.org/coar/notify"
        ];

        const { success } = ContextSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(true);
    });

    test("can detect invalid @context", () => {
        const payload = [
            "https://www.w3.org/ns/activitystreams",
            "INVALID-CONTEXT",
        ];

        const { success, error } = ContextSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_literal",
                    expected: "https://purl.org/coar/notify",
                    message: "Invalid literal value, expected \"https://purl.org/coar/notify\"",
                    path: [1],
                    received: "INVALID-CONTEXT"
                }
            ]
        );
    });
});

describe("OriginOrTargetSchema", () => {
    test("can validate valid payload", () => {
        const payload = {
            id: "https://research.org/repository",
            inbox: "https://research.org/inbox",
            type: "Service",
        };

        const { success } = OriginOrTargetSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(true);
    });

    test("can detect invalid type", () => {
        const payload = {
            id: "https://research.org/repository",
            inbox: "https://research.org/inbox",
            type: "INVALID-TYPE",
        };

        const { success, error } = OriginOrTargetSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_enum_value",
                    message: "Invalid enum value. Expected 'Organization' | 'Service', received 'INVALID-TYPE'",
                    options: [
                        "Organization",
                        "Service"
                    ],
                    path: [
                        "type"
                    ],
                    received: "INVALID-TYPE"
                }
            ]
        );
    });

    test("can detect missing id", () => {
        const payload = {
            id: undefined,
            inbox: "https://research.org/inbox",
            type: "Service",
        };

        const { success, error } = OriginOrTargetSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_type",
                    expected: "string",
                    message: "Required",
                    path: ["id"],
                    received: "undefined"
                }
            ]
        );
    });

    test("can detect missing inbox", () => {
        const payload = {
            id: "https://research.org/repository",
            inbox: undefined,
            type: "Service",
        };

        const { success, error } = OriginOrTargetSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_type",
                    expected: "string",
                    message: "Required",
                    path: ["inbox"],
                    received: "undefined"
                }
            ]
        );
    });
});

describe("ObjectSchema", () => {
    test("can validate valid payload", () => {
        const payload = {
            id: "doi.org/10.5555/12345680",
            "ietf:cite-as": "https://doi.org/10.5555/12345680",
        };

        const { success } = ObjectSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(true);
    });

    test("can detect missing id", () => {
        const payload = {
            id: undefined,
            "ietf:cite-as": "https://doi.org/10.5555/12345680",
        };

        const { success, error } = ObjectSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_type",
                    expected: "string",
                    message: "Required",
                    path: ["id"],
                    received: "undefined"
                }
            ]
        );
    });

    test("can allow pass through of additional keys", () => {
        const payload = {
            id: "doi.org/10.5555/12345680",
            "ietf:cite-as": "https://doi.org/10.5555/12345680",
            type: [
                "Document",
                "sorg:Review"
            ]
        };

        const { success } = ObjectSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(true);
    });
});

describe("ActorSchema", () => {
    test("can validate valid payload", () => {
        const payload = {
            id: "https://orcid.org/0000-0002-1825-1234",
            name: "John Doe",
            type: "Person",
        };

        const { success } = ActorSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(true);
    });

    test("can detect invalid type", () => {
        const payload = {
            id: "https://orcid.org/0000-0002-1825-1234",
            name: "John Doe",
            type: "INVALID-TYPE",
        };

        const { success, error } = ActorSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
                {
                    code: "invalid_enum_value",
                    message: "Invalid enum value. Expected 'Application' | 'Group' | 'Organization' | 'Person' | 'Service', received 'INVALID-TYPE'",
                    options: ["Application", "Group", "Organization", "Person", "Service"],
                    path: [
                        "type"
                    ],
                    received: "INVALID-TYPE"
                }

            ]
        );
    });

    test("can detect missing id", () => {
        const payload = {
            id: undefined,
            name: "John Doe",
            type: "Person",
        };

        const { success, error } = ActorSchema.safeParse(payload) as SafeParseReturnType;
        expect(success).toBe(false);
        expect(error.issues).toEqual([
            {
                code: "invalid_type",
                expected: "string",
                message: "Required",
                path: ["id"],
                received: "undefined"
            }
        ]);
    });
});
