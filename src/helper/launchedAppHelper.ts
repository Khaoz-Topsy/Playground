import { LaunchedApp } from '../contracts/launchedApp';

export const sortByOpenOrder = (a: LaunchedApp, b: LaunchedApp) => a.openOrder - b.openOrder;
