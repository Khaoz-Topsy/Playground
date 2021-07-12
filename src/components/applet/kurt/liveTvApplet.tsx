import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Spinner } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { MiscIcon } from '../../../constants/appImage';
import { IApplet } from '../../../contracts/interface/IApplet';
import { NetworkState } from '../../../constants/enum/networkState';
import { ScheduleItem, WeeklySchedule } from '../../../constants/liveTvSchedule';
import { translate } from '../../../integration/i18n';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { AssistantAppsService } from '../../../services/api/AssistantAppsService';
import { Applet } from '../../window/applet/applet';

export interface IExpectedServices {
    assistantAppsService: AssistantAppsService;
}
interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

export const LiveTvAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const [isKurtLive, setKurtLive] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        if (networkState === NetworkState.Success) return;
        getIsKurtLive();
        // eslint-disable-next-line
    }, []);

    const getIsKurtLive = async () => {
        const liveResult = await props.assistantAppsService.getIsLive();
        if (liveResult.isSuccess) {
            setKurtLive(true);
        }

        setNetworkState(NetworkState.Success);
    }

    const weekDayIndex = (new Date()).getDay();

    const renderBackground = () => {
        if (
            networkState === NetworkState.Loading ||
            networkState === NetworkState.Success /* And not live */
        ) return (
            <>
                <div className="cover-img bg"></div>
                <BasicImage imageUrl={MiscIcon.static} classNames="cover-img" />
            </>
        );

        return (<div className="cover-img"></div>);
    }

    const renderBody = () => {
        if (networkState === NetworkState.Loading) return (
            <Center style={{ height: '100%' }}>
                <Spinner size="xl" thickness="2px" />
            </Center>
        );

        if (!isKurtLive) {
            return (
                <Box className="pos-abs-top-left" style={{ height: '100%', minWidth: '100%' }}>
                    <Center style={{ height: '100%' }}>
                        <Box>
                            <h1 style={{ textAlign: 'center' }}>Nothing live right now <br />😢</h1>
                            <Button colorScheme="twitter" mt="5">View available videos</Button>
                        </Box>
                    </Center>
                </Box>
            );
        }

        return (
            <iframe
                title={props.name.toString()}
                className="pos-abs-top-left"
                style={{ height: '100%', minWidth: '100%' }}
                src="https://player.twitch.tv/?channel=khaoztopsy&parent=playground.kurtlourens.com&muted=true"
                frameBorder="0"
            />
        );
    }

    return (
        <Applet
            {...props}
            isFullscreen={true}
            classNames={classNames('live-tv', 'noselect', { 'is-open': isSidebarOpen })}
            sidebar={
                <Box p={4} className="tv-sidebar">
                    <div className="tv-open-close-icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        {
                            isSidebarOpen
                                ? <CloseIcon />
                                : <HamburgerIcon />
                        }
                    </div>
                    <strong>Schedule</strong>
                    {
                        WeeklySchedule.map((scheduledItems: Array<ScheduleItem>, dayIndex: number) => {
                            if (scheduledItems.length < 1) return (
                                <p key={dayIndex} className={classNames({ 'today': dayIndex === weekDayIndex })}>...</p>
                            );

                            return (
                                <p key={dayIndex}>
                                    {
                                        scheduledItems.map((item: ScheduleItem, itemIndex: number) => {
                                            return <span key={`${dayIndex}-${itemIndex}`}>
                                                {translate(item.title)}
                                            </span>
                                        })
                                    }
                                </p>
                            )
                        })
                    }
                </Box>
            }
        >
            <Box style={{ height: '100%', textAlign: 'center' }} onClick={() => setSidebarOpen(false)}>
                {renderBackground()}
                {renderBody()}
            </Box>
        </Applet>
    );
}

export const LiveTvApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    LiveTvAppletUnconnected,
    (services: IDependencyInjection): IExpectedServices => {
        return {
            assistantAppsService: services.assistantAppsService,
        }
    }
);