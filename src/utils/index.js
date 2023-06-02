import { EncryptFns } from "./EncyptsUtils.js";
import { NumbersFns } from "./NumbersUtils.js";
import { ObjectsFns } from "./ObjectsUtils.js";
import { TableFns } from "./TablesUtils.js";
import { TokenFns } from "./TokensUtils.js";

export class Utils {
  static encrypt = EncryptFns;
  static numbers = NumbersFns;
  static objects = ObjectsFns;
  static tables  = TableFns;
  static tokens  = TokenFns;
}
