import React, { useEffect, useState } from 'react';
import { Box, Center, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, SimpleGrid, Spinner } from '@chakra-ui/react';

import { BasicLazyImage } from '../../core/image';
import { MiscIcon } from '../../../constants/appImage';
import { DocumentFile } from '../../../constants/documentFile';
import { AppletType } from '../../../constants/enum/appletType';
import { NetworkState } from '../../../constants/enum/networkState';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { FileType, IAppletFile } from '../../../contracts/interface/IFile';
import { KhaozBlogItem } from '../../../contracts/interface/IBlogRssFeed';
import { openAppletOrFile } from '../../../helper/appletHelper';
import { withServices } from '../../../integration/dependencyInjection';
import { WindowStore } from '../../../state/window/store';

import { dependencyInjectionToProps, IExpectedServices } from './notificationDrawer.dependencyInjection';
import { NotificationDrawerIcon } from './notificationDrawerIcon';

interface IWithoutExpectedServices {
    onClose: () => void
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

    const openIotPublicationInIframe = () => {
        props.onClose();
        const tempApplet: IAppletFile = {
            id: 444,
            parentId: 444,
            appletType: AppletType.iotPublication,
            name: 'IoT Publication' as any,
            type: FileType.applet,
            info: null as any,
            meta: { src: DocumentFile.iotPublications },
        };
        openAppletOrFile(WindowStore, tempApplet);
    }

    return (
        <>
            <DrawerOverlay />
            <DrawerContent className="notification-drawer">
                <DrawerCloseButton />
                <DrawerHeader>Notifications</DrawerHeader>
                <hr />

                <DrawerBody>
                    {
                        (blogItems?.length > 0) &&
                        <>
                            <h3>Latest blog posts</h3>
                            <SimpleGrid minChildWidth="150px" columnGap="10px" rowGap="10px" className="mt1">
                                {
                                    (blogItems?.slice?.(0, 6) ?? []).map(item => {
                                        return (
                                            <NotificationDrawerIcon key={item.guid} {...item} />
                                        );
                                    })
                                }
                            </SimpleGrid>
                        </>
                    }
                    {
                        (networkState === NetworkState.Loading) && <Center><Spinner size="xl" /></Center>
                    }
                    <br />
                    <hr />
                    <Flex px={2} className="iot-container" onClick={openIotPublicationInIframe}>
                        <Box mt={10} className="book-container">
                            <div className="book">
                                <BasicLazyImage imageUrl={MiscIcon.iotPublication} />
                            </div>
                        </Box>
                        <Box ml={7} className="mt2 ta-center">
                            <h2>IoT Publication</h2>
                            <p>I had the opportunity to contribute to this beautiful document that gives some fantastic info on the Internet of Things. Its free for you to look at and download!</p>
                        </Box>
                    </Flex>
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
