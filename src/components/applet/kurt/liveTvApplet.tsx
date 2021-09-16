import React, { useEffect, useState } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { site } from '../../../constants/site';
import { MiscIcon } from '../../../constants/appImage';
import { IApplet } from '../../../contracts/interface/IApplet';
import { NetworkState } from '../../../constants/enum/networkState';
import { ScheduleItem, WeeklySchedule } from '../../../constants/liveTvSchedule';
import { translate } from '../../../integration/i18n';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { AssistantAppsService } from '../../../services/api/AssistantAppsService';
import { Applet } from '../../window/applet/applet';
import { addDays, get24HourLocalTimeFromUtcHour, getIntlWeekdayText } from '../../../helper/dateHelper';
import { LocaleKey } from '../../../localization/LocaleKey';

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
        } else {
            setSidebarOpen(true);
        }

        setNetworkState(NetworkState.Success);
    }

    const baseDate = new Date('2021/07/11');
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
                            <h1 style={{ textAlign: 'center' }}>{translate(LocaleKey.noStream)}</h1>
                            <h3 style={{ textAlign: 'center' }}>{translate(LocaleKey.noStreamSubtitle)}</h3>
                            {/* <Button colorScheme="twitter" mt="5">View available videos</Button> */}
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
                src={site.kurt.twitchLivePlayer}
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
                <Box className="tv-sidebar">
                    <div className="tv-open-close-icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        {
                            isSidebarOpen
                                ? <CloseIcon />
                                : <HamburgerIcon />
                        }
                    </div>
                    <strong>{translate(LocaleKey.schedule)}</strong>
                    <div className="tv-schedule">
                        {
                            WeeklySchedule.map((scheduledItems: Array<ScheduleItem>, dayIndex: number) => {
                                const today = dayIndex === weekDayIndex;
                                const itemClass = classNames('item', { today });
                                const dayOfTheWeek = getIntlWeekdayText(addDays(new Date(baseDate), dayIndex));
                                if (scheduledItems.length < 1) return (
                                    <div key={dayIndex} className={itemClass}>
                                        <div className="wrapper">
                                            <span className="day-of-the-week">{dayOfTheWeek}</span>
                                            {today && <span className="title">{translate(LocaleKey.noStreamToday)}</span>}
                                        </div>
                                    </div>
                                );

                                return (
                                    <div key={dayIndex} className={itemClass}>
                                        {
                                            scheduledItems.map((item: ScheduleItem, itemIndex: number) => {
                                                return <div key={`${dayIndex}-${itemIndex}`} className="wrapper">
                                                    <span className="day-of-the-week">{dayOfTheWeek}</span>
                                                    <span className="title">{get24HourLocalTimeFromUtcHour(item.utcHour)} - {translate(item.title)}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        <br />
                        <div className="item">
                            <div className="wrapper">
                                <span className="day-of-the-week ta-center">⏸ Streaming paused ⏸</span>
                                <span className="title ta-center">Sorry I am currently moving <img src="/assets/img/dutch.png" alt="dutch flag" style={{ display: 'inline', height: '1.5em' }} /></span>
                            </div>
                        </div>
                    </div>
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