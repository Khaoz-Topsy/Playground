import Parser from 'rss-parser';

import { blogFeed } from '../constants/enum/storageType';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { KhaozBlogType, KhaozBlogItemType } from '../contracts/interface/IBlogRssFeed';
import { StorageService } from './StorageService';
import { addDays } from '../helper/dateHelper';


export class BlogRssService {
    private _storageService: StorageService;

    constructor(storageService: StorageService) {
        this._storageService = storageService;
    }
    async getBlogPosts(): Promise<ResultWithValue<KhaozBlogType>> {

        if (this._storageService != null) {
            const storedFeed = this._storageService.get<KhaozBlogType>(blogFeed);
            if (storedFeed.isSuccess) return storedFeed;
        }

        const parser: Parser<KhaozBlogType, KhaozBlogItemType> = new Parser();
        const feed = await parser.parseURL('https://blog.kurtlourens.com/rss/');

        this._storageService.set(blogFeed, feed, addDays(new Date(), 1));
        return {
            isSuccess: true,
            errorMessage: '',
            value: feed,
        };
    }
}