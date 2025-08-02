const fs = jest.createMockFromModule('fs');

fs.readFile= (url, cbFunc) => {
console.log('Inside mock readFile:',url);
    cbFunc();
}
export default fs;