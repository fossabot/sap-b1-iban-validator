import * as fs from "fs";
import { get_connection_string } from "./config";
import * as IBAN from "iban";
import { sortBy } from "lodash";
const sql = require("mssql");

(async () => {
  try {
    await sql.connect(get_connection_string());
    const sql_string = fs.readFileSync("query.sql", "utf8");
    const result = await sql.query(sql_string);
    console.log(`Number of entries found: ${result.recordset.length}`);

    let matches = [];
    for (const BP of result.recordset) {
      const correct_iban = await IBAN.isValid(BP.DflIBAN);
      if (!correct_iban && BP.ValidFor == "Y") {
        matches.push({
          CardCode: BP.CardCode,
          CardName: BP.CardName,
          DflIban: BP.DflIBAN,
          ValidFor: BP.ValidFor,
          FrozenComm: BP.FrozenComm,
          PymntGroup: BP.PymntGroup
        });
      }
    }
    console.log(`Number of matches: ${matches.length}`);
    const output = await sortBy(matches, "CardName");
    console.table(output);
    process.exit(0);
  } catch (err) {
    throw new Error(err);
  }
})();
