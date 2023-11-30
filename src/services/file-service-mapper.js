export default class FileServiceMapper{
    static mapAndFilterRows(fileName,rowsAsString){
        const splittedRows = rowsAsString.split('\n');
        const mappedToJsonRow = {file: fileName, lines: []};
        const rowKeys = splittedRows[0].split(',');
        // we start after the fist in order to skip mapping the first row wich is the header of the csv
        for( let index = 1 ; index < splittedRows.length; index++){
            const row = splittedRows[index]
            const rowValues = row.split(',');
            const hasSameAmountOfValuesAndKeys = rowKeys.length === rowValues.length;
            const emptyValues = rowValues.some((value => "" ===value ));
            if(hasSameAmountOfValuesAndKeys && ! emptyValues){
                mappedToJsonRow.lines.push(this.#constructObjectFromCSV(rowKeys,rowValues))
            }
        }
        return mappedToJsonRow;
    }
 
    static #constructObjectFromCSV(rowKeys,rowValues){
        const objectToConstructFromRow = {}
        for(let index = 0; index < rowKeys.length; index++){
            objectToConstructFromRow[rowKeys[index]] = this.#parseValue(rowValues[index]);
        }
        // here we remove the file name inside the object
        delete objectToConstructFromRow["file"];
        return objectToConstructFromRow
    }
    
    static #parseValue(string){
        return string.replace(/\s/g, '')
    }

}
