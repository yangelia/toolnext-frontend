export async function dataUrlToFile(dataUrl: string, filenameBase: string) {
  const blob = await (await fetch(dataUrl)).blob();
  const ext = blob.type === "image/png" ? "png" : "jpg";
  return new File([blob], `${filenameBase}.${ext}`, { type: blob.type });
}
