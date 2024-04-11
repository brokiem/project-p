import HttpFactory from "~/repository/factory";
import type IKResponse from "imagekit/dist/libs/interfaces/IKResponse";
import type { UploadResponse } from "imagekit/dist/libs/interfaces";

class MediaModule extends HttpFactory {
    private readonly ROUTE = `${this.API_URL}/media`;

    async upload(file: string, fileName: string, token: string): Promise<{ success: boolean, message: { result: IKResponse<UploadResponse> }, error: string }> {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("file_name", fileName);

        return this.request(this.ROUTE, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formdata,
        });
    }
}

export default MediaModule;
