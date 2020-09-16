
import axios from 'axios'

const instance: any = axios.create({
  // baseURL: 'http://noname.wang:3000',
  baseURL: '/v1',
  timeout: 15000
});

const get: any =
  (url: string, params: object | null | undefined): any =>
    instance.get(url, { params })

const post: any =
  (url: string, data: object | null | undefined): any =>
    instance.post(url, data)

export {
  instance,
  get,
  post
}