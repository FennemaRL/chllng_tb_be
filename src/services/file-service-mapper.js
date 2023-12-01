export default class FileServiceMapper{
    static mapAndFilterRows(fileName,rowsAsString){
        const splittedRows = rowsAsString.split('\n');
        const mappedToJsonRow = {file: fileName, lines: []};
        const rowKeys = splittedRows[0].split(',');
        // we start after the fist in order to skip mapping the first row wich is the header of the csv
        for( let index = 1 ; index < splittedRows.length; index++){
            const row = splittedRows[index]
            const rowValues = row.split(',');
            const numberIndex=2;
            const hexIndex=3;
            const hasSameAmountOfValuesAndKeys = rowKeys.length === rowValues.length;
            const emptyValues = rowValues.some((value => "" ===value ));
            const isValidNumber = !Number.isNaN(Number(rowValues[numberIndex]))
            const isValidHex = this.#validateHex(rowValues[hexIndex])
            if(hasSameAmountOfValuesAndKeys && ! emptyValues && isValidNumber && isValidHex){
                mappedToJsonRow.lines.push(this.#constructObjectFromCSV(rowKeys,rowValues))
            }
        }
        return mappedToJsonRow;
    }

    static #validateHex(hexString) {
        // Regular expression to match a 32-digit hexadecimal string
        const hexRegex = /^[0-9a-fA-F]{32}$/;
        return hexRegex.test(hexString);
      }
      
 
    static #constructObjectFromCSV(rowKeys,rowValues){
        const objectToConstructFromRow = {}
        for(let index = 0; index < rowKeys.length; index++){
            objectToConstructFromRow[rowKeys[index]] = this.#parseValue(rowKeys[index],rowValues[index]);
        }
        // here we remove the file name inside the object
        delete objectToConstructFromRow["file"];
        return objectToConstructFromRow
    }
    
    static #parseValue(key,value){
        if('number'===key ){
            return Number(value)
        }
        else {
            return value.replace(/\s/g, '')
        }
    }

}
