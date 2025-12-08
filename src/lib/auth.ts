/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

// Get environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
// Convert string values to the expected format
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Validate that secrets exist
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

if (!JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET environment variable is not set');
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate ACCESS token (short-lived)
export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_ACCESS_EXPIRES_IN as any, // Use type assertion
    issuer: 'localeyes',
    audience: 'user'
  });
}

// Generate REFRESH token (long-lived)
export function generateRefreshToken(payload: object): string {
  return jwt.sign({ ...payload, type: 'refresh' }, JWT_REFRESH_SECRET, { 
    expiresIn: JWT_REFRESH_EXPIRES_IN as any, // Use type assertion
    issuer: 'localeyes',
    audience: 'user'
  });
}

// Verify ACCESS token
export function verifyAccessToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Access token verification failed:', error);
    return null;
  }
}

// Verify REFRESH token
export function verifyRefreshToken(token: string): any {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

// Generate both tokens at once
export function generateTokenPair(user: any) {
  const accessPayload = {
    id: user._id?.toString() || user.id,
    email: user.email,
    role: user.role,
    type: 'access'
  };

  const refreshPayload = {
    id: user._id?.toString() || user.id,
    type: 'refresh'
  };

  return {
    accessToken: generateAccessToken(accessPayload),
    refreshToken: generateRefreshToken(refreshPayload)
  };
}

// Simple token generation (backward compatibility)
export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_ACCESS_EXPIRES_IN as any 
  });
}

// Simple token verification (backward compatibility)
export function verifyToken(token: string): any {
  return verifyAccessToken(token);
}