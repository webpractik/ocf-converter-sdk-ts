import * as fs from 'fs';
import { MainOcfApiService } from './api';
import { OcfFileTask } from './ocf-file-task';

/**
 * onlineconvertfree.com API client
 */
export class OcfClient {
    constructor(private readonly apiKey: string) {
    }

    /**
     * Send file to conversion
     *
     * @param filePath
     * @param toFormat
     */
    public async uploadFile(filePath: string, toFormat: string): Promise<OcfFileTask> {
        const result = await MainOcfApiService.appControllerUploadFile({
            file: fs.createReadStream(filePath),
            to: toFormat,
            token: this.apiKey,
        });

        return new OcfFileTask(this.apiKey, result.ID_FILE);
    }
}
