import { EncryptUtils } from "./EncryptUtils.js";
import { NumberUtils } from "./NumberUtils.js";
import { ObjectUtils } from "./ObjectUtils.js";
import { TableUtils } from "./TableUtils.js";
import { TokenUtils } from "./TokenUtils.js";

export class Utils {
  static encrypt = EncryptUtils;
  static numbers = NumberUtils;
  static objects = ObjectUtils;
  static tables  = TableUtils;
  static tokens  = TokenUtils;
}
