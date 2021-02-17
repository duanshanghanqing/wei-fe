export const STAGE_ENV = process.env.STAGE_ENV

// if (process.env.NODE_ENV === 'development') {

// } else if (process.env.NODE_ENV === 'production') {

// }

let _imgBaseUrl = ''
let _uploadUrl = ''
if (STAGE_ENV === 'dev') {
  _imgBaseUrl = 'https://aapi.laifuyun.com/v2/image/'
  _uploadUrl = 'https://aapi.laifuyun.com/v2/uploadTest'
} else if (STAGE_ENV === 'test') {
  _imgBaseUrl = 'https://aapi.laifuyun.com/v2/image/'
  _uploadUrl = 'https://aapi.laifuyun.com/v2/uploadTest'
} else if (STAGE_ENV === 'sim') {
  _imgBaseUrl = 'https://aapi.laifuyun.com/v2/image/'
  _uploadUrl = 'https://aapi.laifuyun.com/v2/uploadTest'
} else if (STAGE_ENV === 'prod') {
  _imgBaseUrl = 'https://up.fumamx.com/v2/image/'
  _uploadUrl = 'https://up.fumamx.com/v2/uploadTest'
}

// 图片展示接口根路径
export const imgBaseURL = _imgBaseUrl

// 上传文件到文件服务器接口
export const uploadUrl = _uploadUrl

// 接口返回成功，并且数据有效状态
export const RES_OK = '0'

// 企业Token key
export const accessToken = 'accessToken'

// 个人Token key
export const individualAccessToken = 'individualAccessToken'

// AMToken key
export const amToken = 'amToken'
