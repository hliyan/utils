
/**
 * Returns any failed validations as an error object; else returns null
 * 
 * USAGE: const error = is(6.5, { type: 'integer', range: [1, 5] });
 * if (error) {
 *  for (let rule in error)
 *    console.log(rule + ' should be ' + error[rule]);
 * }
 * OUTPUT:
 *   type should be integer
 *   range should be [1, 5]
 */
export const is = (value, rules) => {
  let errors = {};
  for (const rule in rules) {
    let error = null;
    const criterion = rules[rule];
    switch (rule) {
      case 'type':  error = isType(value, criterion); break;
      case 'range': error = isRange(value, criterion); break;
      case 'length': error = isLength(value, criterion); break;
      case 'regex': error = isRegex(value, criterion); break;
    }
    if (error)
      Object.assign(errors, error);
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

/**
 * Similar to is() in validations, but throws an Error with a ready-made message
 * USAGE: const error = check({'theFieldName': 6.5}, { type: 'integer', range: [1, 5] });
 */
export const check = (nameValue, rules) => {
  const name = Object.keys(nameValue)[0];
  const value = nameValue[name];
  const errors = is(value, rules);
  if (errors) {
    let message = 'Value of [' + name + '] does not match following criteria: ';
    for (let i in errors)
      message += ('\n  ' + i + ' should be ' + errors[i]);
    let e = new Error(message);
    e.errors = errors;
    throw e;
  }
  return true;
};

const isType = (value, criterion) => {
  let error = { type: criterion };
  switch(criterion) {
    case 'string':
      return (typeof value === 'string') ? null : error;
    case 'number':
      return (typeof value === 'number') ? null : error;
    case 'integer':
      return Number.isInteger(value) ? null : error;
    case 'boolean':
      return (typeof value === 'boolean') ? null : error;
    case 'object':
      return (typeof value === 'object') ? null : error;
    case 'function':
      return (typeof value === 'function') ? null : error;
  }
  return null;
};

const isRange = (value, criterion) => {
  const [min, max] = criterion;
  if (min !== null && value < min) return {range: criterion};
  if (max !== null && value > max) return {range: criterion};
  return null;
};

const isLength = (value, criterion) => {
  const [min, max] = criterion;
  if (min !== null && value.length < min) return {length: criterion};
  if (max !== null && value.length > max) return {length: criterion};
  return null;
};

const isRegex = (value, criterion) => {
  if (!value.match(criterion)) return {regex: criterion};
  return null;
};
