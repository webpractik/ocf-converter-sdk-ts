/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ReadStream } from 'fs';

export type EnterParamsDto = {
    /**
     * Current file
     */
    file: ReadStream;
    /**
     * The target subreddit
     */
    to: string;
    /**
     * The target subreddit
     */
    token: string;
};

