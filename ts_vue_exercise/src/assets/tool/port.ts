
import { get } from './axios';

export const banner = () => get('/top/album') // banner
export const personalizedNewsong = () => get('/personalized/newsong') // 推荐新音乐
export const personalized = () => get('/personalized') // 每日推荐歌单
