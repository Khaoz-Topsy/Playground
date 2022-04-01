import axios from 'axios';
import { anyObject } from '../helper/typescriptHacks';
import { ResultWithValue } from '../contracts/results/ResultWithValue';

export class DataService {

    async getJsonFile<T>(url: string): Promise<ResultWithValue<T>> {
        const jsonFolder = '/assets/json';
        try {
            const result = await axios.get<T>(`${jsonFolder}/${url}`);
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

    async getMarkdownFile<T>(url: string): Promise<ResultWithValue<T>> {
        const markdownFolder = '/assets/markdown';
        try {
            const result = await axios.get<T>(`${markdownFolder}/${url}`);
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
}