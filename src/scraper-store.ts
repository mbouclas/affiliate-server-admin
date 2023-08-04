import {writable} from "svelte/store";
import type {INewProductJob} from "./lib/services/product.service";
import type {IJob, IRepeatableJob} from "./shared/models/jobs";
import {ProductService} from "./lib/services/product.service";


export const scraperStore = writable<INewProductJob[]>([]);
export const activeJobsStore = writable<IJob[]>([]);
export const repeatableJobsStore = writable<IRepeatableJob[]>([]);
export const failedJobsStore = writable<IJob[]>([]);
export const repeatableJobsStopRequestsStore = writable<boolean>(false);
export const refreshProductListStore = writable<boolean>(false);

export function setScraperStoreAction(data: INewProductJob[]) {
    scraperStore.update(state => {
        return [...data, ...state];
    });
}

export function setActiveJobsStoreAction(data: IJob[]) {
    activeJobsStore.update(state => {
        return [...data, ...state];
    });
}

export function setRepeatableJobsStopRequestsAction(data: boolean) {
    repeatableJobsStopRequestsStore.set(data);
}

export function triggerGetActiveJobsAction() {
    getActiveJobs().then((data) => {
        setActiveJobsStoreAction(data);
    });
}

export function triggerGetRepeatableJobsAction() {
    getRepeatableJobs().then((data) => {
        repeatableJobsStore.set(data);
    });
}

export function triggerGetFailedJobsAction() {
    getFailedJobs().then((data) => {
        failedJobsStore.set(data);
    });
}


export async function getActiveJobs() {
    return await (new ProductService()).getActiveJobs();
}

export async function getRepeatableJobs() {
    return await (new ProductService()).getRepeatableJobs();
}

export async function getFailedJobs() {
    return await (new ProductService()).getFailedJobs();
}

export function setRefreshProductListAction(data: boolean) {
    refreshProductListStore.set(data);
}
