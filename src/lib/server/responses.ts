export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export function okResponse<T>(data: T): ApiResponse<T> {
  return { ok: true, data };
}

export function errorResponse(message: string): ApiResponse {
  return { ok: false, error: message };
}
