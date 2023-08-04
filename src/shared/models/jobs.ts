export interface IJob {
    name: string;
    data: IJobData;
    opts: IJobOpts;
    id: string;
    progress: number;
    returnvalue?: null;
    stacktrace?: any[] | null;
    attemptsMade: number;
    delay: number;
    timestamp: number;
    processedOn: number;
}
export interface IJobData {
    clientId: string;
    url: string;
}
export interface IJobOpts {
    attempts: number;
    delay: number;
    removeOnComplete: IRemoveOnComplete;
}
export interface IRemoveOnComplete {
    count: number;
}


export interface IRepeatableJob {
    key: string;
    name: string;
    id: string;
    endDate?: null;
    tz?: null;
    pattern: string;
    next: number;
    data: IJobData;
    opts: IRepeatableJobOpts;
    progress: number;
    returnvalue?: null;
    stacktrace?: any[] | null;
    attemptsMade: number;
    delay: number;
    repeatJobKey: string;
    timestamp: number;
}

export interface IRepeatableJobOpts {
    attempts: number;
    delay: number;
    prevMillis: number;
    timestamp: number;
    repeat: IRepeatableJobRepeatEvery;
    jobId: string;
    removeOnComplete: boolean;
}
export interface IRepeatableJobRepeatEvery {
    every: number;
    count: number;
}

