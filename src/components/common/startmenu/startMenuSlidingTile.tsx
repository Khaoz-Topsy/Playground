import React from 'react';

import { StartMenuAnimation, StartMenuSize } from '../../../contracts/interface/IFile';
import { wait } from '../../../helper/timeoutHelper';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { StartMenuSlidingTileImage } from './startMenuSlidingTileImage';

interface IState {
    index: number;
    oldIndex: number;
    indexIsNew: boolean;
    images: Array<string>;
    animationIsPaused: boolean;
}

interface IProps {
    id: number;
    name: LocaleKey;
    isFull?: boolean;
    backgroundColour?: string;
    backgroundImage?: string;
    textColour?: string;
    size: StartMenuSize;

    secondsPerImage?: number
    images: Array<string>;
    animatedTile?: StartMenuAnimation;
    onClick: (e: any) => void;
}

export class StartMenuSlidingTile extends React.Component<IProps, IState> {
    intervalId: any = 0;
    constructor(props: IProps) {
        super(props);

        this.state = {
            index: 0,
            oldIndex: 0,
            indexIsNew: false,
            animationIsPaused: false,
            images: props.images,
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
        if (this.state.animationIsPaused) return;
        this.setState(({ index, images }) => {
            return ({
                index: ((index + 1) >= images.length) ? 0 : index + 1,
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
        const currentImage = this.state.images[this.state.index];
        const baseCss = `tile tile-${StartMenuSize[this.props.size]} tile-slider full`;
        const animationCss = 'anim-' + StartMenuAnimation[this.props?.animatedTile ?? StartMenuAnimation.slidevertical];
        const transitionCss = (this.state.indexIsNew ? 'transitioning ' : '') + animationCss;
        const styleObj = {
            backgroundColor: this.props.backgroundColour,
            backgroundImage: this.props.backgroundImage,
            color: this.props.textColour,
        };
        return (
            <div key={this.props.id}
                onClick={this.props.onClick}
                className={baseCss}
                style={styleObj}
            >
                <StartMenuSlidingTileImage imageUrl={this.state.images[this.state.oldIndex]} className={animationCss} />
                <StartMenuSlidingTileImage imageUrl={currentImage} className={transitionCss} />
                <p>{translate(this.props.name)}</p>
            </div>
        );
    }
};