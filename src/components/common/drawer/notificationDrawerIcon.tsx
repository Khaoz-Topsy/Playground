import React from 'react';

import { KhaozBlogItemType } from '../../../contracts/interface/IBlogRssFeed';
import { BasicImage } from '../../../components/core/image';

interface IProps extends KhaozBlogItemType { };

export const NotificationDrawerIcon: React.FC<IProps> = (props: IProps) => {
    return (
        <li key={props.guid} className="blog-post noselect">
            <BasicImage imageUrl={props.imageUrl} />
            <div className="content">{props.title}</div>
        </li>
    );
}
