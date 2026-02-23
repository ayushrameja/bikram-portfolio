export const LINKS = {
  email: 'deepbikram1999@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bikramdeep-singh-b00492201/',
  github: 'https://github.com/BikramdeepSingh',
} as const;

export const RESUME = {
  driveId: '1EL3j0oVhSZcKbd_hiJ6TSXdWZdF0Jbry',
  get previewUrl() {
    return `https://drive.google.com/file/d/${this.driveId}/preview`;
  },
  get downloadUrl() {
    return `https://drive.google.com/uc?export=download&id=${this.driveId}`;
  },
} as const;

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bikramdeep.dev';
