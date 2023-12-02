export default class AxiosMock {
  files
  constructor (files) {
    this.files = files
  }

  defaults = { headers: { common: { Authorization: '' } } }
  async get (stringUrl) {
    if (stringUrl.includes('/v1/secret/files')) {
      return Promise.resolve({ data: { files: ['file1.csv', 'file2.csv'] } })
    }
    if (stringUrl.includes('/v1/secret/file/')) {
      const splitUrl = stringUrl.split('/')
      const fileName = splitUrl[splitUrl.length - 1]
      return this.#handleByFileName(fileName)
    } else {
      throw new Error('url not implemented')
    }
  }

  #handleByFileName (fileName) {
    if (this.files[1].filename === fileName) {
      return Promise.reject({ status: 500 })
    }
    const file = this.files.find(file => file.fileName === fileName)
    if (file) {
      return Promise.resolve({ data: file.csv })
    } else {
      return Promise.reject({ status: 404 })
    }
  }
}
