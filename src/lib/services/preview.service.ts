import {BaseHttpService} from "./base-http.service";

export class PreviewService extends BaseHttpService {
    async generatePreviewUrl(module: string, itemId: string, type: 'item'|'category' = 'item') {
        return await this.get(`previews/getUrl/${module}/${type}/${itemId}`)
    }

    async dumpData() {
        return await this.get(`previews/dumpData`)
    }
}
