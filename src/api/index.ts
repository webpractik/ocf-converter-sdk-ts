/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export {
    CancelablePromise,
    CancelError,
} from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { DeleteDto } from './models/DeleteDto';
export type { EnterParamsDto } from './models/EnterParamsDto';
export type { FileStatusDto } from './models/FileStatusDto';
export type { GetFileDto } from './models/GetFileDto';
export type { OldGetFileDto } from './models/OldGetFileDto';

export { MainOcfApiService } from './services/MainOcfApiService';
