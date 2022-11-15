# ocf-converter-sdk for TypeScript

SDK for [onlineconvertfree.com](https://onlineconvertfree.com/) [file conversion API](https://onlineconvertfree.com/file-conversion-api/).

## Installation & Usage

### Requirements

Node.js 16.15.1.

### Install

```shell
npm install ocf-converter-sdk
```

## Getting Started

Please follow the [installation procedure](#installation--usage) and then start from the following:

```typescript
import * as fs from 'fs';
import * as https from 'https';
import { OcfClient } from 'ocf-converter-sdk';

const apiKey = 'myApiKey';

const client = new OcfClient(apiKey);

const filePath = '/path/to/file/to/convert.png';
const extensionToConvertTo = 'pdf';

const task = await client.uploadFile(filePath, extensionToConvertTo);

const result = await task.waitForConversion();

if (result.isSuccess()) {
    const resultUrl = result.getResultingFileUrl() as string;

    https.get(resultUrl, (response => {
        const path = `${__dirname}/result.${extensionToConvertTo}`;
        const filePath = fs.createWriteStream(path);
        response.pipe(filePath);
        filePath.on('finish', async () => {
            filePath.close();

            await result.deleteFile();
        });
    }));
}
```

## License

SDK is made available under the MIT License (MIT). Please see [License File](LICENSE) for more information.

## Contribution

[OpenAPI Typescript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen/) is used for the client generation.

### Requirements

[OpenAPI Typescript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen/) is required for the client generation.

### Client generation

To regenerate the client do the following:

- run generation command:

```shell
npm run api-codegen
```

- reformat the generated code with your IDE.
