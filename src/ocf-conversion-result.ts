import {
    GetFileDto,
    MainOcfApiService,
} from './api';
import { OcfFileStatus } from './ocf-file-status.enum';

/**
 * onlineconvertfree.com file conversion result
 */
export class OcfConversionResult {
    constructor(private readonly apiKey: string, private readonly fileId: string, private readonly fileStatus: GetFileDto) {
    }

    /**
     * Check if file converted successfully
     */
    public isSuccess(): boolean {
        return this.fileStatus.status === OcfFileStatus.Ready;
    }

    /**
     * Get resulting file URL
     */
    public getResultingFileUrl(): string | null {
        const isSuccess = this.isSuccess();

        if (isSuccess) {
            return this.fileStatus.path;
        }

        return null;
    }

    /**
     * Delete file
     */
    public async deleteFile(): Promise<void> {
        await MainOcfApiService.appControllerDeleteFile(this.fileId, this.apiKey);
    }
}
