import React, { useEffect, useState } from 'react';
import { Center, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Spinner } from '@chakra-ui/react';

import { KhaozBlogItem } from '../../../contracts/interface/IBlogRssFeed';
import { withServices } from '../../../integration/dependencyInjection';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { dependencyInjectionToProps, IExpectedServices } from './notificationDrawer.dependencyInjection';
import { NotificationDrawerIcon } from './notificationDrawerIcon';

interface IWithoutExpectedServices {
    onClose(): void
};
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const NotificationDrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [blogItems, setBlogItems] = useState<Array<KhaozBlogItem>>([]);

    useEffect(() => {
        props.kurtApiService.getBlogPosts().then((blog: ResultWithValue<Array<KhaozBlogItem>>) => {
            if (!blog.isSuccess) return;
            setBlogItems(blog.value);
            setIsLoaded(true);
        }).catch((_) => { });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <DrawerContent className="notification-drawer">
                <DrawerCloseButton />
                <DrawerHeader>Notifications</DrawerHeader>
                <hr />

                <DrawerBody>
                    <p>Welcome! to Kurt's Playground 🕹🎮</p>
                    <br />
                    {
                        (blogItems?.length > 0) &&
                        <>
                            <h3>Latest blog posts</h3>
                            <ul>
                                {
                                    (blogItems?.slice?.(0, 5) ?? []).map(item => {
                                        return (
                                            <NotificationDrawerIcon key={item.guid} {...item} />
                                        );
                                    })
                                }
                            </ul>
                        </>
                    }
                    {
                        (isLoaded === false) && <Center><Spinner size="xl" /></Center>
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
