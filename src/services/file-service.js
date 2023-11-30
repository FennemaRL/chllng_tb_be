

import axios from 'axios';
import FileServiceMapper from './file-service-mapper.js'

export default class FileService{
    #http;
    #url = 'https://echo-serv.tbxnet.com'
    constructor() {
        this.#http = axios.create();
        const token = "aSuperSecretKey";
        this.#http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
    }
    async getFiles() {
    const fileNameList = await this.#getFileNames();
    // we are using Promise.allSettled beacuse we only want the promises 'fulfilled' that are the ones without errors
    const promiseList = await Promise.allSettled( fileNameList.map(fileName => this.#getFile(fileName)));
    const fileList = promiseList.filter(promise => 'fulfilled' ===promise.status ).map(promise=> promise.value);
    return this.#filterEmptyFiles(fileList);s
}
    async #getFileNames() {
        const { data}  = await this.#http.get(`${this.#url}/v1/secret/files`);
        return  data.files;
    }

    async #getFile(name) {
        const {data} = await this.#http.get (`${this.#url}/v1/secret/file/${name}`);
        return FileServiceMapper.mapAndFilterRows(name,data);   
    }
    #filterEmptyFiles(fileList){
        return fileList.filter(fileObject => fileObject.lines.length >0);
    }
}
