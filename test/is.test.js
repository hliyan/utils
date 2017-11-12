import {is, check} from '../src/is';

const isString = {type: 'string'};
const isNumber = {type: 'number'};
const isInteger = {type: 'integer'};
const isBoolean = {type: 'boolean'};
const isObject = {type: 'object'};
const isFunction = {type: 'function'};
const isCorrectLength = {length: [5,10]};

test('validate type: ignore typos in the type rule', () => {
  expect(is(1000, {type: ''})).toBe(null);
});

test('validate type: string', () => {
  expect(is('foo', isString)).toBe(null);
  expect(is(1000, isString)).toEqual(isString);
});

test('validate type: number', () => {
  expect(is(1000, isNumber)).toBe(null);
  expect(is(null, isNumber)).toEqual(isNumber);
});

test('validate type: integer', () => {
  expect(is(1000, isInteger)).toBe(null);
  expect(is(1.5, isInteger)).toEqual(isInteger);
});

const isRange = { type: 'integer', range: [1, 5] };

test('validate type + range', () => {
  expect(is(2, isRange)).toBe(null);
  expect(is(6, isRange)).toEqual({range: [1, 5]});
  expect(is(-1, isRange)).toEqual({range: [1, 5]});
  expect(is(1.5, isRange)).toEqual({type: 'integer'});
  expect(is(9.5, isRange)).toEqual({type: 'integer', range: [1, 5]});
});

test('validate type: boolean', () => {
  expect(is(false, isBoolean)).toBe(null);
  expect(is(0, isBoolean)).toEqual(isBoolean);
});


test('validate type: object', () => {
  expect(is({}, isObject)).toBe(null);
  expect(is(0, isObject)).toEqual(isObject);
});

test('validate type: function', () => {
  expect(is(() => {}, isFunction)).toBe(null);
  expect(is({}, isFunction)).toEqual(isFunction);
});

test('validate length', () => {
  expect(is('foobar', isCorrectLength)).toEqual(null);
  expect(is('laskdfjlaksdjfalskd', isCorrectLength)).toEqual(isCorrectLength);
  expect(is('foo', isCorrectLength)).toEqual(isCorrectLength);
});

// guard test:
test('guard length', () => {
  expect(() => {
    check({foo: 'bar'}, {type: 'string', length: [5,10]});
  }).toThrow('Value of [foo] does not match following criteria: ' + 
              '\n  length should be 5,10');
  expect(() => {
    check({foo: 'foobar'}, {type: 'string', length: [5,10]});
  }).not.toThrow();
});

const isRegex = {regex: /[a-z]+/};

test('validate regex', () => {
  expect(is('foobar', isRegex)).toEqual(null);
  expect(is('ADDDDDD', isRegex)).toEqual(isRegex);
});
