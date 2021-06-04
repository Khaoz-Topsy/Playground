import React from "react";
import classNames from "classnames";
import { Center, Spinner } from "@chakra-ui/react";

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

interface IBasicImageProps {
    alt?: string;
    imageUrl: string;
    imageName?: string;
    classNames?: string;
    style?: any;
}
export const BasicLazyImage: React.FC<IBasicImageProps> = (props: IBasicImageProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const classes = classNames('smooth', props.classNames, {
        'visible': isLoaded,
    });

    return (
        <div className={props.classNames}>
            <img
                src={props.imageUrl}
                className={classes}
                style={props.style}
                alt={(props.alt ?? props.imageName) ?? 'unknown image'}
                draggable={false}
                onLoad={() => setIsLoaded(true)}
            />
            {(isLoaded === false) && <Center>
                <Spinner size="xl" thickness="2px" />
            </Center>}
        </div>
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