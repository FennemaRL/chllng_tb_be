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
    /**
     * fetch all document based in all fileNames that are fetched from the API, filtering the files with structure problem, empty files, or unfetchable files
     * @returns 
     *  an Array of {file: name, lines: {text:string,number:number,hex:string}[]} | MappedFiles filtering the rows that the length of lines === 0
     */
    async getFiles() {
        const fileNameList = await this.#getFileNames();
        // we are using Promise.allSettled beacuse we only want the promises 'fulfilled' that are the ones without errors
        const promiseList = await Promise.allSettled( fileNameList.map(fileName => this.#getFile(fileName)));
        const fileList = promiseList.filter(promise => 'fulfilled' ===promise.status ).map(promise=> promise.value);
        return this.#filterEmptyFiles(fileList);s
    }
/**
 * fetch all fileNames
 * @returns an Array of strings, that contains the name of each file in the external API
 */
    async #getFileNames() {
        const { data}  = await this.#http.get(`${this.#url}/v1/secret/files`);
        return  data.files;
    }
/**
 * fetch the file content from the provided fileName with the following structure (in the best case)
 * `file,text,number,hex/n
 *  ${fileName},${text},${number},${hex}`; 
 * @param {*} name fileName 'file1.csv'
 * @returns return a {file: name, lines: {text:string,number:number,hex:string}[]} | MappedFile
 */
    async #getFile(name) {
        const {data} = await this.#http.get (`${this.#url}/v1/secret/file/${name}`);
        return this.#mapper.mapAndFilterRows(name,data);   
    }
    /**
     * 
     * @param {*} fileList 
     * @returns a list of MappedFiles that all each rows atleast contains more than 1 lines 
     */
    #filterEmptyFiles(fileList){
        return fileList.filter(fileObject => fileObject.lines.length >0);
    }
}
