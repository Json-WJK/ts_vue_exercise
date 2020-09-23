
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://noname.wang:666/v1',
  baseURL: '',
  timeout: 15000
});

const get =
  (url: string, params?: object | null | undefined) =>
    instance.get(url, { params })

const post =
  (url: string, data?: object | null | undefined) =>
    instance.post(url, data)

export {
  instance,
  get,
  post
}