/* eslint-disable */

import stringify from "fast-json-stable-stringify";

export function encodeOptions(options: any) {
    const json = stringify(options);
    return encodeURI(json);
}

export function decodeOptions(path: any) {
    // console.log(decodeURI(path))
    console.log(path)
    return JSON.parse(decodeURI(path));
}