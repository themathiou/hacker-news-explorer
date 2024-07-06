export interface HNResponse {
  exhaustive: Exhaustive;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: Hit[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
  query: Query;
  serverTimeMS: number;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  _highlightResult: HighlightResult;
  _tags: string[];
  author: string;
  children: number[];
  created_at: Date;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  points: number;
  story_id: number;
  title: string;
  updated_at: Date;
  url: string;
}

export interface HighlightResult {
  author: Author;
  title: Author;
  url: Author;
}

export interface Author {
  matchLevel: MatchLevel;
  matchedWords: Query[];
  value: string;
  fullyHighlighted?: boolean;
}

export enum MatchLevel {
  Full = 'full',
  None = 'none'
}

export enum Query {
  React = 'react'
}

export interface ProcessingTimingsMS {
  _request: Request;
  afterFetch: AfterFetch;
  fetch: Fetch;
  total: number;
}

export interface Request {
  roundTrip: number;
}

export interface AfterFetch {
  merge: Merge;
  total: number;
}

export interface Merge {
  total: number;
}

export interface Fetch {
  query: number;
  scanning: number;
  total: number;
}
