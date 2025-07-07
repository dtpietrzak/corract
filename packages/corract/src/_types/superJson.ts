export type PrimitiveJsonValue =
  | string
  | number
  | boolean
  | undefined
  | null;
export type JsonValue = PrimitiveJsonValue | JsonArray | JsonObject;
export interface JsonArray extends Array<JsonValue> {
}
type SerializableJsonValue =
  | Symbol
  | Set<SuperJsonValue>
  | Map<SuperJsonValue, SuperJsonValue>
  | undefined
  | bigint
  | Date
  | RegExp;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type SuperJsonValue =
  | JsonValue
  | SerializableJsonValue
  | SuperJsonArray
  | SuperJsonObject;
export interface SuperJsonArray extends Array<SuperJsonValue> {
}
export interface SuperJsonObject {
  [key: string]: SuperJsonValue;
}
