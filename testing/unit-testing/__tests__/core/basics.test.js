 import {addValues,getValues,subtractValues} from './../../src/core/basics';


describe('Basics of Javascript', () => {    
    test('`check addValues method returns addition of a+b values`', () => {
        expect(addValues(2,3)).toBe(5);
    })

    test('check subtract method returns subtraion of a-b', () => {
        expect(subtractValues(5,2)).toBe(3);
    })

    test('check getValues method returns array of numbers', () => {
        expect(getValues().length).toBe(5);
    })
})