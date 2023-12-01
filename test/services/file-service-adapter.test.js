import {expect} from 'chai';
import FileServiceMapper from '../../src/services/file-service-mapper.js';
import FileService from '../../src/services/file-service.js'
import AxiosMock from '../mocks/axios.js';

describe('FileService', () => {

  describe('getFiles', () => {
    it('When request all files only 1 file return 200 and is well formed then return only 1 row', async () => {
      const fileName = 'file1.csv';
      const text ='vrBoWhRNlYPWcNuTwionGuIX';
      const number ='67515';
      const hex ='02354d5037ced46d61c63f0302f8bf5e';
      const rowsAsString = `file,text,number,hex
      ${fileName},${text},${number},${hex}`;

      const axiosMock =new AxiosMock([{fileName:fileName,csv:rowsAsString}, {fileName:''}]);
      const fileService = new FileService(axiosMock, FileServiceMapper);

      const result = await fileService.getFiles();

      expect(result).to.be.an('array').that.has.lengthOf(1);

      expect(result[0]).to.deep.equal({
        file: 'file1.csv',
        lines: [{ text, number: Number(number), hex }],
      });
    });

    it('When request all files only 2 file return 200, 1 is does not have all the value and the other have all then retun a list with 1 row', async () => {
      const fileName = 'file1.csv';
      const text ='vrBoWhRNlYPWcNuTwionGuIX';
      const number ='67515';
      const hex ='02354d5037ced46d61c63f0302f8bf5e';
      const rowsAsString = `file,text,number,hex
      ${fileName},${text},${number},${hex}`;
      const fileName2 = 'file1.csv';
      const rowsAsString2 = `file,text,number,hex
      ${fileName2},${text},${number},`
      const axiosMock =new AxiosMock([{fileName:fileName,csv:rowsAsString}, {fileName:''},{fileName:fileName2,csv:rowsAsString2}]);
      const fileService = new FileService(axiosMock, FileServiceMapper);

      const result = await fileService.getFiles();

      expect(result).to.be.an('array').that.has.lengthOf(1);

      expect(result[0]).to.deep.equal({
        file: 'file1.csv',
        lines: [{ text, number: Number(number), hex }],
      });
    });
  });
});