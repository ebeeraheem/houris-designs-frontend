export function formatSizeCode(
  lengthCode?: string | null,
  widthCode?: number | null
): string {
  if (!lengthCode && (widthCode === null || widthCode === undefined)) {
    return "Select"
  }

  if (!lengthCode) {
    return String(widthCode ?? "")
  }

  if (widthCode === null || widthCode === undefined) {
    return lengthCode
  }

  return `${lengthCode}${widthCode}`
}

export function parseLegacyBaseSize(baseSize?: string | null): {
  sizeLengthCode: string | null
  sizeWidthCode: number | null
} {
  if (!baseSize) {
    return {
      sizeLengthCode: null,
      sizeWidthCode: null,
    }
  }

  const match = baseSize.trim().match(/^([A-Za-z]+)(\d+)$/)

  if (!match) {
    return {
      sizeLengthCode: null,
      sizeWidthCode: null,
    }
  }

  return {
    sizeLengthCode: match[1].toUpperCase(),
    sizeWidthCode: Number(match[2]),
  }
}
