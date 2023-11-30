import {expect} from 'chai';
import FileServiceMapper from '../../src/services/file-service-mapper.js';


describe('FileServiceMapper Test', () => {
  describe('mapAndFilterRows', () => {
    it('Test mapAndFIlterRows when a file with just 1 row correctly mapped an return a object with an array of 1 element in lines', () => {
      const fileName = 'file1.csv';
      const text ='vrBoWhRNlYPWcNuTwionGuIX';
      const number ='67515';
      const hex ='f9e1bcdb9e3784acc448af34f4727252'
      const rowsAsString = `file,text,number,hex
      ${fileName},${text},${number},${hex}`;

      const result = FileServiceMapper.mapAndFilterRows(fileName, rowsAsString);

      // check the global structure of the object
      expect(result.file).to.equal(fileName);
      expect(result.lines).to.be.an('array').that.has.lengthOf(1);

      // Check the line mapping in the godcase
      expect(result.lines[0]).to.deep.equal({
        "text": text,
        "number": number,
        "hex": hex
      },);
    });

    it('Test mapAndFIlterRows when a file with just 1 row incorrectly and return a object with a emptylist of lines', () => {
      const fileName = 'file1.csv';
      const text ='vrBoWhRNlYPWcNuTwionGuIX';
      const number ='67515';
      const hex ='f9e1bcdb9e3784acc448af34f4727252'
      const rowsAsString = `file,text,number,hex
      ${fileName},${text},${number}`;

      const result = FileServiceMapper.mapAndFilterRows(fileName, rowsAsString);

      // check the global structure of the object
      expect(result.file).to.equal(fileName);
      expect(result.lines).to.be.an('array').that.has.lengthOf(0);

    });
  });

});