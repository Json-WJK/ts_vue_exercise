
import { get } from './axios';

export const personalizedPrivatecontent = () => get('/personalized/privatecontent') // 独家放送
export const personalizedNewsong = () => get('/personalized/newsong') // 推荐新音乐
export const personalized = (data?: object) => get('/personalized', data) // 每日推荐歌单
export const toplist = () => get('/toplist') // toplist
export const topArtists = (data?: object) => get('/top/artists', data) // 热门歌手
export const cloudsearch = (data?: object) => get('/search', data) // 搜索
export const searchDefault = (data?: object) => get('/search/default', data) // 搜索默认关键词
export const songDetail = (data?: object) => get('/song/detail', data) // 单曲详情
export const songUrl = (data?: object) => get('/song/url', data) // 单曲播放地址

