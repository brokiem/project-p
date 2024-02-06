import type { user_attributes as UserAttributes } from "@prisma/client";

export enum Roles {
    // Kepala sekolah
    HEADMASTER = 1 << 0,
    // Wakil kepala sekolah
    VICE_PRINCIPAL = 1 << 1,
    // Ketua tata usaha
    HEAD_ADMINISTRATION = 1 << 2,
    // Tata usaha
    ADMINISTRATION = 1 << 3,
    // Guru normatif
    NORMATIVE = 1 << 4,
    // Guru adaptif
    ADAPTIVE = 1 << 5,
    // Guru produktif
    PRODUCTIVE = 1 << 6,
    // BK
    COUNSELING = 1 << 7,
    // Siswa
    STUDENT = 1 << 8,
    // Web Admin
    ADMIN = 1 << 9,
}
