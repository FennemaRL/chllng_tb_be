export default class FileServiceMapper {
  /**
     *
     * @param {*} fileName a string that represent the fileName
     * @param {*} rowsAsString a string that cotains the following structure
     *           const rowsAsString = `file,text,number,hex
     *           ${fileName},${text},${number},${hex}`;
     * @returns
     *      an {file: name, lines: {text:string,number:number,hex:string}[]} |MappedFile
     *           A line when follow the next rules :
     *                  - All values (text,number,hex) must exist,
     *                  - number must be a number
     *                  - hex must be a string with a 32 hex number inside
     */
  static mapAndFilterRows (fileName, rowsAsString) {
    const splittedRows = rowsAsString.split('\n')
    const mappedToJsonRow = { file: fileName, lines: [] }
    const rowKeys = splittedRows[0].split(',')
    // we start after the fist in order to skip mapping the first row wich is the header of the csv
    for (let index = 1; index < splittedRows.length; index++) {
      const row = splittedRows[index]
      const rowValues = row.split(',')
      const numberIndex = 2
      const hexIndex = 3
      const hasSameAmountOfValuesAndKeys = rowKeys.length === rowValues.length
      const emptyValues = rowValues.some(value => value === '')
      const isValidNumber = !Number.isNaN(Number(rowValues[numberIndex]))
      const isValidHex = this.#validateHex(rowValues[hexIndex])
      if (hasSameAmountOfValuesAndKeys && !emptyValues && isValidNumber && isValidHex) {
        mappedToJsonRow.lines.push(this.#constructObjectFromCSV(rowKeys, rowValues))
      }
    }
    return mappedToJsonRow
  }

  /**
     * validates if is a string 32hex value
     * @param hexString string to validate
     * @returns a boolean when the Regular expression to match a 32-digit hexadecimal string
     * @example
     *          validateHex("70ad29aacf0b690b0467fe2b2767f765") => true
     */
  static #validateHex (hexString) {
    // Regular expression to match a 32-digit hexadecimal string
    const hexRegex = /^[0-9a-fA-F]{32}$/
    return hexRegex.test(hexString)
  }

  /**
     * is a funtion that return a new object matching the position of the rowKeys with
     *  rowValues, where the first parameter will be the keys and the second thevalues
     * @param rowKeys
     * @param rowValues
     * @returns a boolean when the Regular expression to match a 32-digit hexadecimal string
     * @example
     *      constructObjectFromCSV(['key1','key2'],[1,'value2']) => {key1:1,key2:'value2'}}
     */
  static #constructObjectFromCSV (rowKeys, rowValues) {
    const objectToConstructFromRow = {}
    for (let index = 0; index < rowKeys.length; index++) {
      objectToConstructFromRow[rowKeys[index]] = this.#parseValue(rowKeys[index], rowValues[index])
    }
    // here we remove the file name inside the object
    delete objectToConstructFromRow.file
    return objectToConstructFromRow
  }

  /**
     * transform the value passed to a Number if the key match with the string 'number'
     * @param key
     * @param value
     * returns a number | string
     * @example
     *          parseValue('number','a2')=> NaN
     *          parseValue('number','2')=> 2
     *          parseValue(_,'2')=> '2'
     */
  static #parseValue (key, value) {
    if (key === 'number') {
      return Number(value)
    } else {
      return value.replace(/\s/g, '')
    }
  }
}
