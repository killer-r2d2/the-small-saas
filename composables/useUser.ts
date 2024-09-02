import { useState } from 'nuxt/app';
import type { User } from 'lucia'; // Replace with the correct import based on your setup

export const useUser = () => {
  return useState<User | null>('user', () => null);
};
