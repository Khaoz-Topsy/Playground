import React, { useEffect, useState } from 'react';
import { Center, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from '@chakra-ui/react';

import { KhaozBlogItem } from '../../../contracts/interface/IBlogRssFeed';
import { withServices } from '../../../integration/dependencyInjection';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { dependencyInjectionToProps, IExpectedServices } from './notificationDrawer.dependencyInjection';
import { NotificationDrawerIcon } from './notificationDrawerIcon';
import { NetworkState } from '../../../constants/enum/networkState';

interface IWithoutExpectedServices {
    onClose(): void
};
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

export const NotificationDrawerUnconnected: React.FC<IProps> = (props: IProps) => {
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
    const [blogItems, setBlogItems] = useState<Array<KhaozBlogItem>>([]);

    useEffect(() => {
        props.assistantAppsService.getBlogPosts().then((blog: ResultWithValue<Array<KhaozBlogItem>>) => {
            if (!blog.isSuccess) {
                setNetworkState(NetworkState.Error);
                return;
            }
            setBlogItems(blog.value);
            setNetworkState(NetworkState.Success);
        });
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
                        (networkState === NetworkState.Loading) && <Center><Spinner size="xl" /></Center>
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
