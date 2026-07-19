export type loginPayload = {
    email: string;
    password: string;
}

export type CardProps = {
tags: string;
time : string;
description: string;

}

export type Platform = "instagram" | "facebook" | "x";

export interface Post {
  id: string;
  title: string;
  status: string;
  scheduledLabel: string;
  description: string;
  imageUrl: string;
  platforms: Platform[];
  extraPlatformCount: number;
}