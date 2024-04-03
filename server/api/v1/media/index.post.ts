import { badRequestResponse, errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import ImageKit from "imagekit";
import sharp from "sharp";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to create announcement
        if (!hasPermission(user.permissions, Permissions.UPLOAD_MEDIA)) {
            return forbiddenResponse("You do not have permission to do this!");
        }

        const files = await readMultipartFormData(event);
        if (!files) return badRequestResponse("No file provided");

        // file MUST be a string of base64 encoded data
        const file = files.find((f) => f.name === "file")?.data.toString();
        const file_name = files.find((f) => f.name === "file_name")?.data.toString();

        if (!file) return badRequestResponse("No file provided");
        if (!file_name) return badRequestResponse("No file name provided");

        // Convert the image to webp format and optimize
        const fileBuffer = await sharp(Buffer.from(file, "base64"))
            .toFormat("webp")
            .webp({ quality: 85 })
            .toBuffer();

        const { imageKitPublicKey, imageKitPrivateKey, imageKitUrlEndpoint } = useRuntimeConfig();

        const imagekit = new ImageKit({
            publicKey: imageKitPublicKey,
            privateKey: imageKitPrivateKey,
            urlEndpoint: imageKitUrlEndpoint,
        });

        const result = await imagekit.upload({
            file: fileBuffer,
            fileName: file_name,
        });

        return successResponse({ result }, 201);
    } catch (e) {
        return errorResponse("Failed to upload media");
    }
});
