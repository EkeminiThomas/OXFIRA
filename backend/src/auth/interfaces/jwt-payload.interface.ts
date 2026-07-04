export interface JwtPayload {
  sub: string;
  email: string;
  jti: string;
}

export interface DecodedJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}