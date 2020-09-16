
import { get, post } from './axios';

export const personalizedNewsong: any = (): any => get('/personalized/newsong') // 推荐新音乐
export const banner: any = (): any => get('/top/album') // banner
