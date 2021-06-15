import { IFolder } from "../contracts/interface/IFolder";

export const createFolder = (name: string): IFolder => {
    return {
        name,
        id: 0,
        parentId: 0,
        contents: []
    };
}