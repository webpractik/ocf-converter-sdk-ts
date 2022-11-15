export enum OcfFileStatus {
    /**
     * File is waiting for processing
     */
    Wait = 'WAIT',
    /**
     * File was processed with error
     */
    Error = 'ERROR',
    /**
     * File was processed and is ready
     */
    Ready = 'READY',
}
