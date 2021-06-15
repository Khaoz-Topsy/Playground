export type KhaozBlogType = {
    title: string;
    items: Array<KhaozBlogItemType>;
};

export type KhaozBlogItemType = {
    guid: string,
    creator: string,
    isoDate: Date,
    pubDate: Date,
    link: string,
    imageUrl: any,
    'media:content': any,
    title: string,
    content: string,
    contentSnippet: string,
    categories: Array<String>,
};
