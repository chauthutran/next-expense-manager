import { JSONObject } from "@/libs/definations";
import { Document } from "mongoose";

/** 
 * Relate to JSONObject 
 * */ 
export const converDbObjectToJson = ( obj: Document | Document[]) => {
    return JSON.parse(JSON.stringify(obj));
}

export const cloneJSONObject = ( obj: JSONObject | JSONObject[]) => {
    return JSON.parse(JSON.stringify(obj));
}

export const isEmptyJSON = ( obj: JSONObject ): boolean => {
    return obj === null || Object.keys(obj).length === 0;
}
