import { Response } from 'express';

export type userInfo = { userId: string, role: string }
declare global {
  namespace Express {
    interface Request {
      userInfo: userInfo,
      data: any;
    }
  }
}
export interface ErrorDetail {
  errorCode: number;
  errorMessage: string;
}

export interface BodyResponse {
  message: string;
  data?: any;
  errors?: ErrorDetail[] | ErrorDetail;
}

export type ResponseCustom = Response<BodyResponse>;
