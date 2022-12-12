const { BadRequestError } = require("../expressError");

// Function turns js into sql 
// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Get keys from param
  const keys = Object.keys(dataToUpdate);

  // Throw error if no keys
  if (keys.length === 0) throw new BadRequestError("No data");

  // Map each key's column and index into conversion func
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // join and return values
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
