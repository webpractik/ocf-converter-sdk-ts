/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteDto } from '../models/DeleteDto';
import type { EnterParamsDto } from '../models/EnterParamsDto';
import type { FileStatusDto } from '../models/FileStatusDto';
import type { GetFileDto } from '../models/GetFileDto';
import type { OldGetFileDto } from '../models/OldGetFileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MainOcfApiService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health/check',
        });
    }

    /**
     * Checking the status of a file received for conversion
     * @param token
     * @param fileId
     * @returns OldGetFileDto
     * @throws ApiError
     */
    public static appControllerCheckFileStatus(
        token: string,
        fileId: string,
    ): CancelablePromise<OldGetFileDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api',
            query: {
                'token': token,
                'fileId': fileId,
            },
        });
    }

    /**
     * Checking the status of a file received for conversion v1
     * @param token
     * @param fileId
     * @returns GetFileDto
     * @throws ApiError
     */
    public static appControllerCheckFileStatusV1(
        token: string,
        fileId: string,
    ): CancelablePromise<GetFileDto> {
        return __request(OpenAPI, {
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

    /**
     * Upload file for conversion
     * @param formData
     * @returns FileStatusDto
     * @throws ApiError
     */
    public static appControllerUploadFile(
        formData: EnterParamsDto,
    ): CancelablePromise<FileStatusDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Get a list of conversions
     * @param token
     * @returns OldGetFileDto
     * @throws ApiError
     */
    public static appControllerGetList(
        token: string,
    ): CancelablePromise<Array<OldGetFileDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/list',
            query: {
                'token': token,
            },
        });
    }

    /**
     * Get a list of conversions V1
     * @param token
     * @returns GetFileDto
     * @throws ApiError
     */
    public static appControllerGetListV1(
        token: string,
    ): CancelablePromise<Array<GetFileDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/files/list',
            query: {
                'token': token,
            },
        });
    }

    /**
     * Delete file sent for conversion
     * @param fileId
     * @param token
     * @returns DeleteDto
     * @throws ApiError
     */
    public static appControllerDeleteFile(
        fileId: string,
        token: string,
    ): CancelablePromise<DeleteDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/{fileId}',
            path: {
                'fileId': fileId,
            },
            query: {
                'token': token,
            },
        });
    }

    /**
     * @param token
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetJsonApi(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/json/content',
            query: {
                'token': token,
            },
        });
    }

}
