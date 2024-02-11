class HttpFactory {
    protected readonly API_VERSION: string = "v1";
    protected readonly API_URL: string = "";

    constructor(apiBaseUrl: string) {
        this.API_URL = `${apiBaseUrl}/${this.API_VERSION}`;
    }

    async request<T>(url: string, options: RequestInit): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();

                if (result.success) {
                    resolve(result);
                } else {
                    reject(result);
                }
            } catch (e: any) {
                const error = {
                    success: false,
                    error: e.message,
                };
                reject(error);
            }
        });
    }
}

export default HttpFactory;
