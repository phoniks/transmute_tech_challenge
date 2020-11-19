/// <reference types="node" />
declare const operations: (request: Buffer) => Promise<import("@sidetree/common").ResponseModel>;
declare const readDID: (didOrDidDocument: string) => Promise<import("@sidetree/common").ResponseModel>;
declare const getSideTreeVersion: () => Promise<import("@sidetree/common").ResponseModel>;
export { operations, readDID, getSideTreeVersion };
