export default class FileService{
    #http;
    #url = 'https://echo-serv.tbxnet.com'
    #mapper;

    constructor(httpinstance,mapper) {
        this.#http = httpinstance;
        const token = "aSuperSecretKey";
        this.#http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.#mapper =mapper;
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
        return this.#mapper.mapAndFilterRows(name,data);   
    }
    #filterEmptyFiles(fileList){
        return fileList.filter(fileObject => fileObject.lines.length >0);
    }
}
