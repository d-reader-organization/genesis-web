export const convertFileToBlob = async (file: File): Promise<Blob> =>
	new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type }) as Blob
