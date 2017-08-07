// Type definitions for massive 3.1
// Project: https://github.com/dmfay/massive-js.git
// Definitions by: Pascal Birchler <https://github.com/swissspidy>
//                 Clarence Ho <https://github.com/clarenceh>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="node" />

export = massive;

declare function massive(
  connection: massive.ConnectionInfo | string,
  loaderConfig?: Object,
  driverConfig?: Object): Promise<massive.Database>;

declare namespace massive {
  interface ConnectionInfo {
    user?: string;
    database?: string;
    password?: string | null;
    port?: number;
    host?: string;
    ssl?: boolean;
    application_name?: string;
    fallback_application_name?: boolean;
  }

  interface QueryOptions {
    columns?: string[];
    limit?: number;
    offset?: number;
    only?: boolean;
    order?: string[];
    orderBody?: boolean;
    build?: boolean;
    document?: boolean;
    single?: boolean;
    stream?: boolean;
  }

  interface SearchCriteria {
    fields: string[];
    term: string;
  }

  interface Table<T> {
    find(criteria: Object | {}, queryOptions?: QueryOptions): Promise<T[]>;
    findOne(criteria: number | Object, queryOptions?: QueryOptions): Promise<T>;
    count(criteria: Object): Promise<string>;
    where(query: string, params: any[] | Object): Promise<T[]>;
    search(criteria: SearchCriteria, queryOptions?: QueryOptions): Promise<any>;
    save(data: Object): Promise<T>;
    insert(data: Object): Promise<T>;
    insert(data: Object[]): Promise<T[]>;
    update(dataOrCriteria: Object, changesMap?: Object): Promise<T>;
    update(dataOrCriteria: Object[], changesMap?: Object): Promise<T[]>;
    destroy(criteria: Object): Promise<T[]>;
  }

  interface Document {
    countDoc(criteria: Object): Promise<number>;
    findDoc(criteria: number | string| Object): Promise<Object>;
    searchDoc(criteria: SearchCriteria): Promise<Object[]>;
    saveDoc(doc: Object): Promise<Object>;
    modify(docId: number | string, doc: Object, fieldName?: string): Promise<Object>;
  }

  interface Database {
    attach(ctor: any, ...sources: any[]): Promise<any>;
    detach(entity: string, collection: string): void;
    reload(): void;
    query(query: any, params: any, options: any): Promise<any>;
    saveDoc(collectionName: string, doc: Object): Promise<any>;
    createDocumentTable(path: any): Promise<any>;
    getObject(path: any, collection: any): Object;
    dropTable(table: string, options: any): void;
    createSchema(schemaName: string): void;
    dropSchema(schemaName: string, options: any): void;
    run(query: string, params: any[] | Object): Promise<Object[]>;
  }
}
