import { requestWithHttpInfo as __requestWithHttpInfo } from './api/core/request';
import {
    AxiosResponseHeaders,
    RawAxiosResponseHeaders,
} from 'axios';
import {
    CancelablePromise,
    GetFileDto,
    MainOcfApiService,
    OpenAPI,
} from './api';
import { OcfConversionResult } from './ocf-conversion-result';
import { OcfFileStatus } from './ocf-file-status.enum';

/**
 * onlineconvertfree.com file conversion task
 */
export class OcfFileTask {
    private fileStatus: GetFileDto | null = null;

    private secondsUntilNextCheck = 0;

    constructor(private readonly apiKey: string, private readonly fileId: string) {
    }

    /**
     * Wait for the file to be processed
     */
    public async waitForConversion(): Promise<OcfConversionResult> {
        if (!this.fileStatus) {
            await this.waitAndRefreshFileStatus();
        }

        while (this.fileStatus!.status === OcfFileStatus.Wait) {
            await this.waitAndRefreshFileStatus();
        }

        return new OcfConversionResult(this.apiKey, this.fileId, this.fileStatus!);
    }

    /**
     * Delete file
     */
    public async deleteFile(): Promise<void> {
        await MainOcfApiService.appControllerDeleteFile(this.fileId, this.apiKey);
    }

    private async waitAndRefreshFileStatus(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, this.secondsUntilNextCheck * 1000));

        await this.refreshFileStatus();
    }

    private async refreshFileStatus(): Promise<void> {
        const result = await OcfFileTask.appControllerCheckFileStatusV1WithHttpInfo(this.apiKey, this.fileId);

        this.fileStatus = result.body;
        this.secondsUntilNextCheck = Number(result.headers?.['retry-after']) || 5;
    }

    /**
     * Checking the status of a file received for conversion v1 with http info
     * @param token
     * @param fileId
     * @returns { body: GetFileDto, status: number, headers: Headers}
     * @throws ApiError
     */
    private static appControllerCheckFileStatusV1WithHttpInfo(
        token: string,
        fileId: string,
    ): CancelablePromise<{ body: GetFileDto, status: number, headers: RawAxiosResponseHeaders | AxiosResponseHeaders }> {
        return __requestWithHttpInfo(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{fileId}',
            path: {
                'fileId': fileId,
            },
            query: {
                'token': token,
            },
        });
    }
}
