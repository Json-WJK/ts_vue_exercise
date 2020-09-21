
import { get } from './axios';

export const personalizedPrivatecontent = () => get('/personalized/privatecontent') // 独家放送
export const personalizedNewsong = () => get('/personalized/newsong') // 推荐新音乐
export const personalized = () => get('/personalized') // 每日推荐歌单
export const toplist = () => get('/toplist') // toplist
export const topArtist = (data?: object) => get('/top/artist', data) // 热门歌手
export const cloudsearch = (data?: object) => get('/search', data) // 搜索
export const musicDetail = (data?: object) => get('/music/detail', data) // 单曲详情
export const musicUrl = (data?: object) => get('/music/url', data) // 单曲播放地址

