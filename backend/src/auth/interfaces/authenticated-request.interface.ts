import { Request } from 'express';
import { GoogleProfile } from './google-profile.interface';

export interface GoogleAuthRequest extends Request {
  user: GoogleProfile;
}
