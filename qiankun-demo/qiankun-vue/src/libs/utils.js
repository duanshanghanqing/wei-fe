import * as config from './config'
/**
 * 获取系统Token
 */
export const getToken = () => ({
  [config.accessToken]: getItem(config.accessToken),
  [config.individualAccessToken]: getItem(config.individualAccessToken),
  [config.amToken]: getItem(config.amToken)
})
/**
 * 设置系统Token
 */
export const setToken = ({
  accessToken,
  individualAccessToken,
  amToken
}) => {
  setItem(config.accessToken, accessToken)
  setItem(config.individualAccessToken, individualAccessToken)
  setItem(config.amToken, amToken)
}

// setItem
export const setItem = (key, value) => {
  window.sessionStorage.setItem(key, value)
}

// getItem
export const getItem = (key) => {
  return window.sessionStorage.getItem(key)
}

// removeItem
export const removeItem = (key) => {
  window.sessionStorage.removeItem(key)
}

// clear
export const clearItem = () => {
  window.sessionStorage.clear()
}

/**
 * 检查文件后缀，是否有这个图标，没有的话，给unknow
 * console.log(isHasSuffix('doc'))
 */
export const isHasSuffix = suffix => {
  let suffixArray = ['xls', 'doc', 'docx', 'ppt', 'pptx', 'avi', 'rar', 'mp3', 'mp4', 'zip', 'html', 'pdf', 'eps', 'xlsx', 'jpg']
  suffix = suffix.toLowerCase()
  return suffixArray.indexOf(suffix) === -1 ? 'unknow' : suffix
}

/* 文件大小计算 */
export const byteCalc = size => {
  if (size > 1048576) {
    return (size / 1048576).toFixed(2) + ' M'
  } else {
    return (size / 1024).toFixed(2) + ' KB'
  }
}

/**
 * 判断是否是对象
 */
export const isObject = (obj, isEffective = false) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    if (isEffective) {
      return !!Object.keys(obj).length
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
 * 判断是否是数组类型，
 * 并且是否是有效数组
 */
export const isArray = (array, isEffective = false) => {
  if (Object.prototype.toString.call(array) === '[object Array]') {
    if (isEffective) {
      return array.length > 0
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
 * 批注圆点色彩
 */
export const commentsColor = flag => {
  let colors = [
    '#909399',
    '#FF7165',
    '#5EA3F6',
    '#FFB735',
    '#37CBE3',
    '#8BD867',
    '#9B80F2',
    '#763626',
    '#FD8EC4',
    '#BFBF17',
    '#D0021B'
  ]
  return 'color:' + colors[flag - 1]
}
/**
 * 标签背景色
 */
export const tagsBgColor = colorId => {
  let str = 'color:#fff;background-color:'
  let colors = [
    '#FF7165',
    '#5EA3F6',
    '#FFB735',
    '#37CBE3',
    '#8BD867',
    '#9B80F2',
    '#763626',
    '#FD8EC4',
    '#BFBF17',
    '#909399',
    '#D0021B'
  ]
  return str + colors[colorId - 1]
}

/**
 * 上传文件到文件文件服务器
 */
export const fileUpload = option => {
  var uploadUrl
  if (option && option.url && option.url !== '') {
    uploadUrl = option.url
  } else {
    console.error('upload url undefined')
    return
  }

  var FileList = []
  if (option.FileList && option.FileList.length > 0) {
    FileList = option.FileList
  } else {
    console.log('no FileList')
    return
  }
  // 上传方式
  var method
  if (option.method && option.method !== '') {
    method = option.method
  } else {
    method = 'PUT'
  }

  // FormData 对象 key
  var formName = option.formName || 'fileToUpload'
  var i = 0
  var xhr

  function Upload(file) {
    // console.log(file);
    // 1.准备FormData
    var fd = new FormData()
    var fileSize = file.size
    var fileName = file.name === undefined ? new Date() * 1 + '.' + file.type.split('/')[1].toLowerCase() : file.name
    fd.append(formName, file, fileName)

    // 2.创建xhr对象
    if (!xhr) {
      xhr = new XMLHttpRequest()
    }

    // 监听状态，实时响应
    // xhr 和 xhr.upload 都有progress事件，xhr.progress是下载进度，xhr.upload.progress是上传进度
    // 这里监听上传进度事件，文件在上次的过程中，会多次触发该事件，返回一个event事件对象
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) { // 返回一个  长度可计算的属性，文件特别小时，监听不到，返回false
        // 四舍五入
        var percent = Math.round(event.loaded * 100 / event.total) // event.loaded:表示当前已经传输完成的字节数。
        // event.total:当前要传输的一个总的大小.通过传输完成的除以总的，就得到一个传输比率
        event['percent'] = percent
        option && option.onprogress && option.onprogress(event)
      }
    }

    // 传输开始事件
    xhr.onloadstart = function (event) {
      option && option.onloadstart && option.onloadstart(event)
    }
    // xhr.abort();//调用该方法停止ajax上传，停止当前的网络请求

    // 每个文件上传成功
    xhr.onload = function (event) {
      option && option.onload && option.onload(Object.assign(JSON.parse(event.target.response), {
        name: fileName,
        size: fileSize
      }))
      i++
      if (i < FileList.length) {
        setTimeout(function () {
          Upload(FileList[i])
        }, 200)
      }
    }

    // ajax过程发生错误事件
    xhr.onerror = function (event) {
      option && option.onerror && option.onerror(event)
    }

    // ajax被取消，文件上传被取消，说明调用了 xhr.abort();  方法，所触发的事件
    xhr.onabort = function (event) {
      option && option.onabort && option.onabort(event)
    }

    // loadend传输结束，不管成功失败都会被触发
    xhr.onloadend = function (event) {
      option && option.onloadend && option.onloadend(event)
    }

    // 发起ajax请求传送数据
    xhr.open(method, uploadUrl, true)
    xhr.send(fd) // 发送文件
  }
  Upload(FileList[i])
  return {
    abort: function () {
      xhr.abort()
    }
  }
}

/*
 * 上传到api接口，支持接口数据和文件上传
 */
export const sendDataFile = _option => {
  let {
    data,
    files,
    fileKey,
    method,
    url,
    onprogress,
    onloadstart,
    onload,
    onerror,
    onabort,
    onloadend
  } = Object.assign({
    data: {},
    files: [],
    fileKey: '',
    method: 'post',
    url: '',
    onprogress(event) {},
    onloadstart(event) {},
    onload(res) {},
    onerror(event) {},
    onabort(event) {},
    onloadend(event) {}
  }, _option)
  let fd = new FormData()
  Object.keys(data).forEach(key => {
    fd.append(key, data[key])
  })
  for (let i = 0; i < files.length; i++) {
    fd.append(`${fileKey}${i + 1}`, files[i], files[i].name)
  }
  let xhr = new XMLHttpRequest()
  // 监听状态，实时响应
  // xhr 和 xhr.upload 都有progress事件，xhr.progress是下载进度，xhr.upload.progress是上传进度
  // 这里监听上传进度事件，文件在上次的过程中，会多次触发该事件，返回一个event事件对象
  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      // 返回一个  长度可计算的属性，文件特别小时，监听不到，返回false
      // 四舍五入
      var percent = Math.round(event.loaded * 100 / event.total) // event.loaded:表示当前已经传输完成的字节数。
      // event.total:当前要传输的一个总的大小.通过传输完成的除以总的，就得到一个传输比率
      event['percent'] = percent
      onprogress(event)
    }
  }

  // 传输开始事件
  xhr.onloadstart = function (event) {
    onloadstart(event)
  }
  // xhr.abort();//调用该方法停止ajax上传，停止当前的网络请求

  // 文件上传成功
  xhr.onload = function (event) {
    try {
      if (typeof event.target.response === 'string') {
        onload(JSON.parse(event.target.response))
      } else {
        onload(event.target.response)
      }
    } catch (e) {
      onload(event.target.response)
    }
  }

  // ajax过程发生错误事件
  xhr.onerror = function (event) {
    onerror(event)
  }

  // ajax被取消，文件上传被取消，说明调用了 xhr.abort();  方法，所触发的事件
  xhr.onabort = function (event) {
    onabort(event)
  }

  // loadend传输结束，不管成功失败都会被触发
  xhr.onloadend = function (event) {
    onloadend(event)
  }

  // 发起ajax请求传送数据
  xhr.open(method, url, true)
  xhr.send(fd) // 发送文件
  return xhr
}
/**
 * js获取文件后缀
 */
export const getSuffix = function (fileName) {
  var fileNameArray = fileName.split('.')
  return fileNameArray[fileNameArray.length - 1]
}
