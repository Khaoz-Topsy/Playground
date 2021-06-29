import React from 'react';

import { KhaozBlogItem } from '../../../contracts/interface/IBlogRssFeed';
import { BasicImage } from '../../../components/core/image';
import { BasicLink } from '../../core/link';

interface IProps extends KhaozBlogItem { };

export const NotificationDrawerIcon: React.FC<IProps> = (props: IProps) => {
    return (
        <BasicLink key={props.guid} href={props.link} additionalClassNames="blog-post noselect">
            <BasicImage imageUrl={props.image} />
            <div className="content">{props.title}</div>
        </BasicLink>
    );
}
