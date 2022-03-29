import axios from 'axios';
import { ApiUrl } from '../../constants/apiUrls';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { anyObject } from '../../helper/typescriptHacks';


export class ExternalApiService {
    private _client;

    constructor() {
        this._client = axios.create();
        this._client.defaults.timeout = 2000;
    }

    getWeather = async (): Promise<ResultWithValue<any>> => {
        try {
            const wttrResult = await this._client.get<any>(ApiUrl.wttr);
            // if (!wttrResult.isSuccess) return wttrResult;
            return {
                isSuccess: true,
                value: wttrResult.data,
                errorMessage: ''
            }
        } catch (ex) {
            return {
                isSuccess: false,
                value: anyObject,
                errorMessage: (ex as any).message
            }
        }
    }
}