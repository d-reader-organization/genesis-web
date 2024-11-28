type AspectRatio = {
  width: number
  height: number
}

export const COMIC_IMAGE_SIZES: Record<string, AspectRatio> = {
  cover: { width: 1000, height: 895 },
  banner: { width: 1536, height: 300 },
  logo: { width: 800, height: 450 },
}

export const COMIC_ISSUE_IMAGE_SIZES: Record<string, AspectRatio> = {
  cover: { width: 210, height: 304 },
  signature: { width: 380, height: 240 },
}

export const CREATOR_IMAGE_SIZES: Record<string, AspectRatio> = {
  banner: { width: 1920, height: 900 },
  avatar: { width: 500, height: 500 },
  logo: { width: 800, height: 450 },
}

export const GENERAL_IMAGE_SIZES: Record<string, AspectRatio> = {}
