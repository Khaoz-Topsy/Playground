import React, { useEffect, useState } from 'react';
import { DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

import { KhaozBlogType } from '../../../contracts/interface/IBlogRssFeed';
import { withServices } from '../../../integration/dependencyInjection';
import { dependencyInjectionToProps, IExpectedServices } from './notificationDrawer.dependencyInjection';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';

interface IWithoutExpectedServices {
    onClose(): void
};
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const NotificationDrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [blogfeed, setBlogFeed] = useState<KhaozBlogType>({ title: '', items: [] });

    useEffect(() => {
        props.blogRssService.getBlogPosts().then((blog: ResultWithValue<KhaozBlogType>) => {
            if (!blog.isSuccess) return;
            setBlogFeed(blog.value);
        }).catch((_) => { });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <DrawerOverlay />
            <DrawerContent className="notification-drawer">
                <DrawerCloseButton />
                <DrawerHeader>Notifications</DrawerHeader>
                <hr />

                <DrawerBody>
                    <p>Welcome! to Kurt's Playground 🕹🎮</p>
                    <br />
                    {
                        (blogfeed?.title?.length > 5) &&
                        <>
                            <h3>Latest blog posts</h3>
                            <ul>
                                {
                                    (blogfeed?.items?.slice?.(0, 5) ?? []).map(item => {
                                        return (
                                            <li key={item.guid}>{item.title}</li>
                                        );
                                    })
                                }
                            </ul>
                        </>
                    }

                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </>
    );
}


export const NotificationDrawer = withServices<IWithoutExpectedServices, IExpectedServices>(
    NotificationDrawerUnconnected,
    dependencyInjectionToProps
);
