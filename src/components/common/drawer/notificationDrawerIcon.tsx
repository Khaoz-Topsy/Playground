import React from 'react';

import { KhaozBlogItem } from '../../../contracts/interface/IBlogRssFeed';
import { BasicImage } from '../../../components/core/image';

interface IProps extends KhaozBlogItem { };

export const NotificationDrawerIcon: React.FC<IProps> = (props: IProps) => {
    return (
        <li key={props.guid} className="blog-post noselect">
            <BasicImage imageUrl={props.image} />
            <div className="content">{props.title}</div>
        </li>
    );
}
