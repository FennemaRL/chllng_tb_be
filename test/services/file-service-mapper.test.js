import {expect} from 'chai';
import FileServiceMapper from '../../src/services/file-service-mapper.js';


describe('FileServiceMapper Test', () => {
  describe('mapAndFilterRows', () => {
    it('Test mapAndFIlterRows when a file with just 1 row correctly mapped an return a object with an array of 1 element in "lines"', () => {
      const fileName = 'file1.csv';
      const text ='vrBoWhRNlYPWcNuTwionGuIX';
      const number ='67515';
      const hex ='02354d5037ced46d61c63f0302f8bf5e'
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

    it('Test mapAndFIlterRows when a file with just 1 row with less info and return a object with a emptylist of lines', () => {
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

  it('Test mapAndFIlterRows when a file with just 1 row with a number that is not a number and return a object with a emptylist of lines', () => {
    const fileName = 'file1.csv';
    const text ='vrBoWhRNlYPWcNuTwionGuIX';
    const number ='6751a5';
    const hex ='02354d5037ced46d61c63f0302f8bf5e'
    const rowsAsString = `file,text,number,hex
    ${fileName},${text},${number},${hex}`;

    const result = FileServiceMapper.mapAndFilterRows(fileName, rowsAsString);

    // check the global structure of the object
    expect(result.file).to.equal(fileName);
    expect(result.lines).to.be.an('array').that.has.lengthOf(0);

  });

  it('Test mapAndFIlterRows when a file with just 1 row with a hex that is not a hex and return a object with a emptylist of lines', () => {
    const fileName = 'file1.csv';
    const text ='vrBoWhRNlYPWcNuTwionGuIX';
    const number ='67515';
    const hex ='z9e1bcdb9e3784acc448af34f4727252'
    const rowsAsString = `file,text,number,hex
    ${fileName},${text},${number},${hex}`;

    const result = FileServiceMapper.mapAndFilterRows(fileName, rowsAsString);

    // check the global structure of the object
    expect(result.file).to.equal(fileName);
    expect(result.lines).to.be.an('array').that.has.lengthOf(0);

  });

  it('Test mapAndFIlterRows when a file with just 1 row with a hex that is not a 32hex and return a object with a emptylist of lines', () => {
    const fileName = 'file1.csv';
    const text ='vrBoWhRNlYPWcNuTwionGuIX';
    const number ='67515';
    const hex ='bcdb9e3784acc448af34f4727252'
    const rowsAsString = `file,text,number,hex
    ${fileName},${text},${number},${hex}`;

    const result = FileServiceMapper.mapAndFilterRows(fileName, rowsAsString);

    // check the global structure of the object
    expect(result.file).to.equal(fileName);
    expect(result.lines).to.be.an('array').that.has.lengthOf(0);

  });
});