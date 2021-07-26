import React from 'react';
import classNames from 'classnames';
import { BasicLazyImage } from './image';
import { MiscIcon } from '../../constants/appImage';

interface IProps {
    text?: string;
    isSmall?: boolean;
}

export const Loader: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="loading-container">
            {LoadingImage(props.isSmall)}
            {
                (props.text != null) &&
                <h1>Loading...</h1>
            }
        </div>
    );
}


export const LoadingImage = (isSmall?: boolean) => {
    return (
        <div className={classNames('loader', { 'small': isSmall })}>
            <span className="pip-0"></span>
            <span className="pip-1"></span>
            <span className="pip-2"></span>
            <span className="pip-3"></span>
            <span className="pip-4"></span>
            <span className="pip-5"></span>
        </div>
    );
}


export const TerminalLoadingImage = () => (<BasicLazyImage imageUrl={MiscIcon.threeDotsLoader} classNames="loading" />);


