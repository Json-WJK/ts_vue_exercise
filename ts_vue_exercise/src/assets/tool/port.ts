
import { get, post } from './axios';

export const getRecommend: any = (): any => get('/getRecommend') // 获取首页推荐
export const getSongListCategories: any = (): any => get('/getSongListCategories') // 获取歌单分类
