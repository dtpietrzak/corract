export type PrimitiveJsonValue =
  | string |
  number |
  boolean |
  undefined |
  null
export type JsonValue = PrimitiveJsonValue | JsonArray | JsonObject
export type JsonArray = Array<JsonValue>
type SerializableJsonValue =
  | symbol |
  Set<SuperJsonValue> |
  Map<SuperJsonValue, SuperJsonValue> |
  undefined |
  bigint |
  Date |
  RegExp
export interface JsonObject {
  [key: string]: JsonValue;
}
export type SuperJsonValue =
  | JsonValue |
  SerializableJsonValue |
  SuperJsonArray |
  SuperJsonObject
export type SuperJsonArray = Array<SuperJsonValue>
export interface SuperJsonObject {
  [key: string]: SuperJsonValue;
}
