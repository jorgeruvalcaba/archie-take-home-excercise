/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query launchesPast($limit: Int, $find: LaunchFind) {\n    launchesPast(limit: $limit, find: $find) {\n      id\n      mission_name\n      launch_date_local\n      launch_site {\n        site_name_long\n      }\n      links {\n        article_link\n        video_link\n        flickr_images\n      }\n      rocket {\n        rocket_name\n        rocket_type\n      }\n    }\n  }\n": types.LaunchesPastDocument,
};

export function graphql(source: "\n  query launchesPast($limit: Int, $find: LaunchFind) {\n    launchesPast(limit: $limit, find: $find) {\n      id\n      mission_name\n      launch_date_local\n      launch_site {\n        site_name_long\n      }\n      links {\n        article_link\n        video_link\n        flickr_images\n      }\n      rocket {\n        rocket_name\n        rocket_type\n      }\n    }\n  }\n"): (typeof documents)["\n  query launchesPast($limit: Int, $find: LaunchFind) {\n    launchesPast(limit: $limit, find: $find) {\n      id\n      mission_name\n      launch_date_local\n      launch_site {\n        site_name_long\n      }\n      links {\n        article_link\n        video_link\n        flickr_images\n      }\n      rocket {\n        rocket_name\n        rocket_type\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;