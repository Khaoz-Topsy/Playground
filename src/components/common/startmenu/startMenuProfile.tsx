import React from 'react';

import { BasicLazyImage } from '../../core/image';
import { site } from '../../../constants/site';

interface IProps {
    onClick: (e: any) => void;
}

export const StartMenuProfile: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="profile" onClick={props.onClick}>
            <BasicLazyImage
                classNames="profile-pic"
                imageUrl={site.kurt.profilePic}
                imageName={site.kurt.fullName}
                alt={site.kurt.fullName}
            />
            <p>{site.kurt.fullName}</p>
        </div>
    );
}

