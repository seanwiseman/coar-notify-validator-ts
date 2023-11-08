# coar-notify-validator

## Prerequisites

https://bun.sh/docs/installation

## Setup

```bash
# install dependencies
bun install

# test the app
bun test

# build the app, available under dist
bun run build
```

## Publish

```bash
# login to npm
npm login

# publish the app
npm publish
```

## Usage

### validate()

#### Validate a COAR Notify payload against a schema determined by the payload's `type` value:

```typescript
import { validate } from "coar-notify-validator";


const validPayload = {
    "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://purl.org/coar/notify"
    ],
    "actor": {
        "id": "https://review-service.org/",
        "name": "Review Service",
        "type": "Service"
    },
    "context": {
        "id": "https://doi.org/10.1101/2022.10.06.511170"
    },
    "id": "urn:uuid:572b8e81-d92f-4ed5-8178-cc7f04f44cd1",
    "object": {
        "id": "https://review-service.org/reviews/1223155",
        "ietf:cite-as": "10.5072/zenodo.1223155",
        "type": [
            "Document",
            "sorg:Review"
        ]
    },
    "origin": {
        "id": "https://review-service.org/",
        "inbox": "https://review-service.org/inbox",
        "type": "Service"
    },
    "target": {
        "id": "https://preprint-repository.org/",
        "inbox": "https://preprint-repository.org/inbox",
        "type": "Service"
    },
    "type": [
        "Announce",
        "coar-notify:ReviewAction"
    ]
}


const result = validate(validPayload);
// {
//     isValid: true,
//     errors: []
// }

```

```typescript
import { validate } from "coar-notify-validator";

const invalidPayload = {
    "@context": [
        "https://www.w3.org/ns/activitystreams",
        "https://purl.org/coar/notify"
    ],
    "actor": {
        "id": "https://review-service.org/",
        "name": "Review Service",
        "type": "Service"
    },
    "context": {
        "id": "https://doi.org/10.1101/2022.10.06.511170"
    },
    "id": "urn:uuid:572b8e81-d92f-4ed5-8178-cc7f04f44cd1",
    "object": {
        "id": "https://review-service.org/reviews/1223155",
        "ietf:cite-as": "10.5072/zenodo.1223155",
        "type": [
            "Document",
            "sorg:Review"
        ]
    },
    "origin": {
        "id": "https://review-service.org/",
        "inbox": "https://review-service.org/inbox",
        "type": "Service"
    },
    "target": {
        "id": "https://preprint-repository.org/",
        // Missing inbox - should be required
        "type": "Service"
    },
    "type": [
        "Announce",
        "coar-notify:ReviewAction"
    ]
}

const result = validate(invalidPayload);
// {
//     isValid: false,
//     errors: [
//     {
//         code: "invalid_type",
//         expected: "string",
//         received: "undefined",
//         path: [ "target", "inbox" ],
//         message: "Required"
//     }
// ]
// }


```

## License

MIT