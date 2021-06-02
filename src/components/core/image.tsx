import React from "react";

interface IBasicImageProps {
    alt?: string;
    imageUrl: string;
    imageName?: string;
    classNames?: string;
    style?: any;
}
export const BasicImage: React.FC<IBasicImageProps> = (props: IBasicImageProps) => {
    return (
        <img
            src={props.imageUrl}
            className={props.classNames}
            style={props.style}
            alt={(props.alt ?? props.imageName) ?? 'unknown image'}
            draggable={false}
        />
    );
}

// interface IAnimatedImageProps {
//     alt?: string;
//     imageUrl: string;
//     imageName?: string;
//     classNames?: string;
//     style?: any;
// }
// export const AnimatedImage: React.FC<IAnimatedImageProps> = (props: IAnimatedImageProps) => {
//     return (
//         <ImageFadeIn
//             src={props.imageUrl}
//             className={props.classNames}
//             style={props.style}
//             alt={(props.alt ?? props.imageName) ?? 'unknown image'}
//             draggable={false}
//         />
//     );
// }