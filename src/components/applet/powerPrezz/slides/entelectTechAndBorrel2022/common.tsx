import { Center } from "@chakra-ui/react";
import { Presentation } from "../../../../../constants/appImage";
import { BasicLazyImage } from "../../../../core/image";
import { Loader } from "../../../../core/loader";


export const entelectSlideBackground = (<img src={Presentation.entelectbg2} alt="entelect background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />);

export const entelectSlideBackgroundLookup: any = {
    default: {
        id: 'default',
        render: () => (entelectSlideBackground),
    },
    googleEarth: {
        id: 'googleEarth',
        render: () => (<div style={{ width: '100%', height: '100%', backgroundColor: '#CCD8BE' }}></div>),
    },
    googleEarthWater: {
        id: 'googleEarthWater',
        render: () => (<div style={{ width: '100%', height: '100%', backgroundColor: '#8AB4F8' }}></div>),
    },
    greyBackground: {
        id: 'greyBackground',
        render: () => (<div style={{ width: '100%', height: '100%', backgroundColor: '#322D2A' }}></div>),
    },
    rabobank: {
        id: 'rabobank',
        render: () => (<img src={Presentation.rabobank} alt="rabobank background" className="fullscreen-bg sway" />),
    },
    gaming: {
        id: 'gaming',
        render: () => (<img src={Presentation.gaming} alt="gaming background" className="fullscreen-bg" />),
    },
};

export const imgSlide = (imgUrl: string, imgName: string, backgroundId?: string) => (
    {
        backgroundId: backgroundId ?? entelectSlideBackgroundLookup.default.id,
        render: () => (
            <Center>
                <BasicLazyImage imageUrl={imgUrl} alt={imgName} style={{ borderRadius: '1em', margin: '2em', maxWidth: '80vw', maxHeight: '80vh' }} />
            </Center>
        ),
    }
);

export const iframeSlide = (iframeUrl: string, iframeTitle: string) => (
    {
        backgroundId: entelectSlideBackgroundLookup.default.id,
        render: () => (
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <Center height="100%">
                        <Loader text="Loading..." />
                    </Center>
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <iframe title={iframeTitle} src={iframeUrl} width="100%" height="100%" style={{ border: '0' }} allowFullScreen={false} loading="lazy" referrerPolicy={'no-referrer-when-downgrade'}></iframe>
                </div>
            </div>
        ),
    }
);