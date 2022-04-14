declare namespace Express {
  export interface Request {
    user: {
      id: string;
      sender_id: string;
    }
  }
}
