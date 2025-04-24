import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const isFetchBaseQueryErrorType = (error?: string | object): error is FetchBaseQueryError =>
  typeof error === 'object' && 'status' in error;


type FetchApiQueryError = FetchBaseQueryError & { data: { error: string }}
export const isAPIErrorType = (error?: string | object): error is FetchApiQueryError => isFetchBaseQueryErrorType(error) && 'error' in error;