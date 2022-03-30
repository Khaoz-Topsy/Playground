import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { IApplet } from '../../../contracts/interface/IApplet';
import { defaultSettingWidth, defaultSettingHeight } from '../../../constants/window';
import { LocaleKey } from '../../../localization/LocaleKey';

import { WindowHeader } from '../../window/windowHeader';
import { windowIcon } from '../../window/windowIcon';
import { Window } from '../../window/window';
import { SettingItem } from './settingItem';
import { settingPages } from './settingPages';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { virtualAssistantAnimations } from '../../../constants/virtualAssistantAnim';

interface IWithoutExpectedServices {
}

interface IExpectedServices {
    virtualAssistantService: VirtualAssistantService;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices, IApplet {
    currentSelectedSubPage?: LocaleKey;
}

interface IState {
    pageIndex: number;
}

export const SettingAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const passedInPageIndex = props.currentSelectedSubPage != null
        ? settingPages.findIndex(p => p.title === props.currentSelectedSubPage)
        : -1;
    const [state, setState] = useState<IState>({
        pageIndex: passedInPageIndex > -1 ? passedInPageIndex : 0,
    });

    useEffect(() => {
        props.virtualAssistantService.say?.(translate(LocaleKey.clippySettings));
        // eslint-disable-next-line
    }, []);

    return (
        <Window
            {...props}
            isFullscreen={true}
            classNames="setting"
            headerFunc={() => <WindowHeader {...props} windowIcon={windowIcon(props.appletType)} />}
            defaultWidth={defaultSettingWidth}
            defaultHeight={defaultSettingHeight}
            sidebar={
                <Box borderColor={'whiteAlpha.400'} borderRadius={'md'} borderWidth={'1px'} >
                    {
                        settingPages.map((page, index: number) => {
                            return (
                                <SettingItem
                                    key={page.title}
                                    name={page.title}
                                    icon={page.icon()}
                                    isActive={index === state.pageIndex}
                                    onClick={() => setState({ ...state, pageIndex: index })}
                                    isFirst={index === 0}
                                    isLast={index === (settingPages.length - 1)}
                                />
                            );
                        })
                    }
                </Box>
            }
        >
            <Box mt={4} mx={4}>
                {settingPages[state.pageIndex].comp()}
            </Box>
        </Window>
    );
}

export const SettingApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    SettingAppletUnconnected,
    (services: IDependencyInjection): IExpectedServices => {
        return {
            virtualAssistantService: services.virtualAssistantService,
        }
    }
);
