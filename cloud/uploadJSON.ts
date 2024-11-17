"use server"

import GenerateUrl from "./presignedUrl"

interface MetadataJSON {
    name: string,
    symbol: string,
    image: string,
    externa_url: string,
    attributes: string[]
}

export const HandleJsonUpload = async (metadataJSON: MetadataJSON) => {
    try {
        const { key, url } = await GenerateUrl()
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(metadataJSON)
        })

        return key
    } catch(e) {
        console.error("Error while uploading metadata:", e)
        // TODO: add toast here, even above
        return null
    }
}