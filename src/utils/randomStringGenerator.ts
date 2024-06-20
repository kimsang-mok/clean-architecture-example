export default function randomUUID(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)

  // set the version to 4 (UUIDv4)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  // set the variant to RFC 4122
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  // convert to string
  const uuid = [...bytes]
    .map((byte, index) => {
      let hex = byte.toString(16)
      if (hex.length === 1) {
        hex = "0" + hex
      }
      if (index === 4 || index === 6 || index === 8 || index === 10) {
        return `-${hex}`
      }
      return hex
    })
    .join("")

  return uuid
}
