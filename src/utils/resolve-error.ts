import { ApolloError } from "@apollo/client";

type ErrorCode =
  | "UNKNOWN_ERROR"
  | "SERVER_ERROR"
  | "BAD_REQUEST"
  | "INVALID_CREDENTIALS"
  | "FORBIDDEN"
  | "UNAUTHENTICATED"
  | "PRECONDITION_REQUIRED"
  | "USER_COMPLETION_NOT_GUEST";

export type ResolveErrorReturn = {
  message: string;
  code: ErrorCode;
};

export default function resolveError(err: unknown): ResolveErrorReturn {
  if (err instanceof ApolloError) {
    return {
      message: err.message,
      code:
        (err.graphQLErrors[0].extensions?.code as ErrorCode) ?? "SERVER_ERROR",
    };
  }
  if (err instanceof Error) {
    return {
      message: err.message,
      code: "UNKNOWN_ERROR",
    };
  }
  return {
    message: "Something went wrong.",
    code: "UNKNOWN_ERROR",
  };
}
