import { blogItems } from '../../constants/enum/storageType';
import { ApiUrl } from '../../constants/apiUrls';
import { Result, ResultWithValue } from '../../contracts/results/ResultWithValue';
import { ContactFormViewModel } from '../../contracts/generated/ViewModel/contactFormViewModel';
import { KhaozBlogItem } from '../../contracts/interface/IBlogRssFeed';
import { addDays } from '../../helper/dateHelper';

import { StorageService } from '../StorageService';
import { BaseApiService } from './BaseApiService';


export class AssistantAppsService extends BaseApiService {
    private _storageService: StorageService;

    constructor(storageService: StorageService) {
        super('https://api.assistantapps.com');
        this._storageService = storageService;
    }

    getBlogPosts = async (): Promise<ResultWithValue<Array<KhaozBlogItem>>> => {
        if (this._storageService != null) {
            const storedFeed = this._storageService.get<Array<KhaozBlogItem>>(blogItems);
            if (storedFeed.isSuccess) return storedFeed;
        }

        const blogItemsResult = await this.get<Array<KhaozBlogItem>>(ApiUrl.kurt.blog);
        if (!blogItemsResult.isSuccess) return blogItemsResult;

        this._storageService.set(blogItems, blogItemsResult.value, addDays(new Date(), 1));
        return blogItemsResult;
    }

    submitContactForm = (form: ContactFormViewModel): Promise<Result> => this.post(ApiUrl.contactForm, form);
}