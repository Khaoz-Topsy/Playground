import axios from 'axios';
import * as storageType from '../../constants/enum/storageType';
import { Result, ResultWithValue } from '../../contracts/results/ResultWithValue';
import { anyObject } from '../../helper/typescriptHacks';
import { StorageService } from '../StorageService';


declare global {
  interface Window { config: any }
}

export class BaseApiService {
  private _baseUrl: String = '';
  private _client;

  constructor(newBaseUrl?: String) {
    this._baseUrl = (newBaseUrl != null)
      ? newBaseUrl
      : window.config.apiUrl;
    this._client = axios.create();
    this._client.defaults.timeout = 2000;

    try {
      const storageServ = new StorageService();
      const tokenFromStorage = storageServ.get<string>(storageType.token);
      if (tokenFromStorage.isSuccess) this.setInterceptors(tokenFromStorage.value);
    } catch (ex) { }
  }

  setInterceptors = (token: string) => {
    this._client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  };

  protected async get<T>(url: string): Promise<ResultWithValue<T>> {
    try {
      const result = await this._client.get<T>(`${this._baseUrl}/${url}`);
      return {
        isSuccess: true,
        value: result.data,
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

  protected async post<T>(url: string, data: any, manipulateHeaders?: (headers: any) => void): Promise<ResultWithValue<T>> {
    try {
      const result = await this._client.post<T>(`${this._baseUrl}/${url}`, data);
      if (manipulateHeaders != null) manipulateHeaders(result.headers);
      return {
        isSuccess: true,
        statusCode: result?.status ?? 200,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        statusCode: (ex as any).response?.status,
        errorMessage: (ex as any).message
      }
    }
  }

  protected async delete(url: string, manipulateHeaders?: (headers: any) => void): Promise<Result> {
    try {
      const result = await this._client.delete(`${this._baseUrl}/${url}`);
      if (manipulateHeaders != null) manipulateHeaders(result.headers);
      return {
        isSuccess: true,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        errorMessage: (ex as any).message
      }
    }
  }
}
