import { imagesToPrecache } from '../constants/appImage';
import { wait } from '../helper/timeoutHelper';

export const appPreloadAssets = async () => {
    const promises = imagesToPrecache.map(src => {
        return new Promise((resolve, reject) => {
            const img: any = new Image();
            img.src = src;
            img.onload = resolve('');
            img.onerror = reject();
        });
    });
    promises.push(wait(1000));

    await Promise.all(promises);
}