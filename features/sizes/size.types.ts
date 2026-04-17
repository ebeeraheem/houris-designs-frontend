export interface ApiSizeLength {
  code: string
  fullLength: number
  fullSleeve: number
}

export interface ApiSizeWidth {
  code: number
  bustMin: number
  bustMax: number
  waistMin: number
  waistMax: number
  hipsMin: number
  hipsMax: number
  shoulder?: number
}

export interface ApiSizeGuideResponse {
  lengths: ApiSizeLength[]
  widths: ApiSizeWidth[]
}

export interface SizeLength {
  code: string
  fullLength: number
  fullSleeve: number
}

export interface SizeWidth {
  code: number
  bustMin: number
  bustMax: number
  waistMin: number
  waistMax: number
  hipsMin: number
  hipsMax: number
  shoulder?: number
}

export interface SizeGuide {
  lengths: SizeLength[]
  widths: SizeWidth[]
}
