import React from 'react';

import { IStartMenuItemProps, StartMenuAnimation, StartMenuSize } from '../../../contracts/interface/IFile';
import { wait } from '../../../helper/timeoutHelper';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ContextMenuWrapper } from '../../core/contextMenu';
import { getContextWrapperItems } from './startMenuContextMenuItems';
import { StartMenuSlidingTileImage } from './startMenuSlidingTileImage';

interface IProps extends IStartMenuItemProps {
    id: number;
    name: LocaleKey;
    animatedTile?: StartMenuAnimation;
    onClick: (e: any) => void;
}

interface IState {
    index: number;
    oldIndex: number;
    indexIsNew: boolean;
}

export class StartMenuSlidingTile extends React.Component<IProps, IState> {
    intervalId: any = 0;
    constructor(props: IProps) {
        super(props);

        this.state = {
            index: 0,
            oldIndex: 0,
            indexIsNew: false,
        };
    }

    async componentDidMount() {
        await wait(2000);

        this.transitionImages();
        const secondsPerImage = this.props.secondsPerImage || 5;
        this.intervalId = setInterval(() => this.transitionImages(), secondsPerImage * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    transitionImages = async () => {
        this.setState(({ index }) => {
            return ({
                index: ((index + 1) >= (this.props.images ?? []).length) ? 0 : index + 1,
                indexIsNew: true,
            });
        });

        await wait(1000);
        this.setState(() => ({
            indexIsNew: false
        }));

        await wait(500);
        this.setState(({ index }) => ({
            oldIndex: index,
        }));
    }

    render() {
        const currentImage = (this.props.images ?? [])?.[this.state.index];
        const baseCss = `tile tile-${StartMenuSize[this.props.size]} tile-slider full`;
        const animationCss = 'anim-' + StartMenuAnimation[this.props?.animatedTile ?? StartMenuAnimation.slidevertical];
        const transitionCss = (this.state.indexIsNew ? 'transitioning ' : '') + animationCss;
        const styleObj = {
            backgroundColor: this.props.backgroundColour,
            backgroundImage: this.props.backgroundImage,
            color: this.props.textColour,
        };
        return (
            <ContextMenuWrapper
                key={this.props.id}
                className={baseCss}
                style={styleObj}
                items={getContextWrapperItems({ sMenu: this.props, showUninstall: true, openApp: this.props?.onClick })}
            >
                <StartMenuSlidingTileImage imageUrl={(this.props.images ?? [])?.[this.state.oldIndex]} className={animationCss} onClick={this.props?.onClick} />
                <StartMenuSlidingTileImage imageUrl={currentImage} className={transitionCss} onClick={this.props?.onClick} />
                <p onClick={this.props?.onClick}>{translate(this.props.name)}</p>
            </ContextMenuWrapper>
        );
    }
};