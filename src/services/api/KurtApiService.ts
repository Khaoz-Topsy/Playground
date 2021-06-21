import { blogItems } from '../../constants/enum/storageType';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { KhaozBlogItem } from '../../contracts/interface/IBlogRssFeed';
import { StorageService } from '../StorageService';
import { addDays } from '../../helper/dateHelper';
import { BaseApiService } from './BaseApiService';


export class KurtApiService extends BaseApiService {
    private _storageService: StorageService;

    constructor(storageService: StorageService) {
        super('https://api.assistantapps.com');
        this._storageService = storageService;
    }

    async getBlogPosts(): Promise<ResultWithValue<Array<KhaozBlogItem>>> {

        if (this._storageService != null) {
            const storedFeed = this._storageService.get<Array<KhaozBlogItem>>(blogItems);
            if (storedFeed.isSuccess) return storedFeed;
        }

        const blogItemsResult = await this.get<Array<KhaozBlogItem>>('Kurt/Blog');
        if (!blogItemsResult.isSuccess) return blogItemsResult;

        this._storageService.set(blogItems, blogItemsResult.value, addDays(new Date(), 1));
        return blogItemsResult;
    }
}