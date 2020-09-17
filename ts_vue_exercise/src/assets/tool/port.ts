
import { get } from './axios';

export const personalizedPrivatecontent = () => get('/personalized/privatecontent') // 独家放送
export const personalizedNewsong = () => get('/personalized/newsong') // 推荐新音乐
export const personalized = () => get('/personalized') // 每日推荐歌单
export const toplist = () => get('/toplist') // toplist
export const playlistAll = () => get('/playlist/all') // playlistAll
