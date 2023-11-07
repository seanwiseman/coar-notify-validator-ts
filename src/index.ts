import { getSchemaByType } from "./notifications.ts";
// @ts-ignore
import { SafeParseReturnType } from "zod/lib/types";

type ValidateResult = {
    isValid: boolean,
    errors: string[] | object[]
}

export function validate(payload: any): ValidateResult {
    if (!payload.type) {
        return {
            isValid: false,
            errors: ["type is required"]
        }
    }

    const schema = getSchemaByType(payload.type);

    if (!schema) {
        return {
            isValid: false,
            errors: [`No schema found for type: ${payload.type}`]
        }
    }

    const result = schema.safeParse(payload) as SafeParseReturnType;

    return {
        isValid: result.success,
        errors: result.success ? [] : result.error.issues
    }
}
