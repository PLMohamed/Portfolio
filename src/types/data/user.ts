import { type JWTPayload } from "jose";

export interface UserTokenPayload extends JWTPayload {
  uuid: string;
  type: string;
}
