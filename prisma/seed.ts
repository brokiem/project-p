import { articles_type as ArticleType, PrismaClient } from "@prisma/client";
import { Permissions } from "~/utils/permissions";
import { Roles } from "~/utils/roles";
import { ArticleFlags } from "~/utils/articles";

const prisma = new PrismaClient();

async function main() {
    const startTimestamp = Date.now();

    const extracurriculars: {
        title: string,
        description: string
    }[] = JSON.parse(`[{"title":"Pramuka","description":"Pramuka merupakan wadah proses pendidikan non formal dalam pembentukan karakter. Pramuka adalah kegiatan ekstrakulikuler wajib di sekolah."},{"title":"PKS","description":"Tugas PKS adalah mengatur lalu lintas silingkungan sekolah dan lingkungan sekitar sekolah, terutama pada saat menyebrangkan siswa-siswi yang akan menuju kesekolah"},{"title":"Sepak Bola / Futsal","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Sepak Bola"},{"title":"Tari","description":"Kegiatan Ekstrakulikuler untuk memperdalam pengetahuan dan mangasah skill peserta didik tentang tari tradisional."},{"title":"Pencak Silat","description":"Wadah bagi peserta didik yang ingin mengenal dan yang telah memiliki kemampuan dalam beladiri pencak silat. Sehingga mereka bisa mengembangkan kemampuan diri mereka melalui beladiri pencak silat."},{"title":"Voly","description":"Kegiatan Ekstrakulikuler untuk mendorong prestasi non akademik, pertumbuhan fisik dan perkembangan psikis, meningkatkan kemampuan dan keterampilan dalam bermain bola voli."},{"title":"Catur","description":"EkstraKulikuler untuk mengenal dan mengasah kemampuan peserta didik dalam bermain Catur. Serta untuk melatih cara berfikir peserta didik dalam membuat strategi permainan."},{"title":"Tata Rias","description":"Kegiatan kesiswaan dalam mengembangkan keterampilan peserta didik dalam bidang Tata Rias."},{"title":"PMR","description":"Ekstrakurikuler yang bergerak dibidang kepalangmerahan. Memberi pertolongan pertama merupakan tugas utama anggota PMR kepada teman atau siswa di sekolah yang sakit atau mengalami kecelakaan ringan"},{"title":"Yoga Asana","description":"Merupakan jenis olahraga yang bertujuan untuk meningkatkan kesehatan dan kesejahteraan tubuh, dengan melibatkan aktivitas fisik, latihan pernapasan, teknik relaksasi, dan latihan meditasi."},{"title":"Dharma Gita","description":"Ekstrakuliler untuk menambah pengetahuan tentang nyanyian Dharma Gita dan mengasah kemampuan menyanyikan tembang - tembang keagamaan Hindu, terutama dalam pelaksanaan Yadnya"},{"title":"Vocal Group / Musik","description":"Kegiatan Ekstrakulikuler dalam mengasah kemampuan peserta didik tentang seni musik, selain Alat Musik, juga melatih vokal bagi peserta didik yang masuk dalam bidang bernyanyi."},{"title":"Bulu Tangkis","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Bulu Tangkis"},{"title":"Fruit Carving","description":"Fruit Carving merupakan seni mengukir buah atau sebuah kegiatan memahat dan mengukir buah menggunakan alat sederhana seperti cutter, pisau, dan tusuk gigi menjadi maha karya yang menakjubkan."},{"title":"Basket","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Basket"},{"title":"Siklus Akuntansi","description":"Mangasah kemampuan setiap tindakan akuntansi yang mengidentifikasi, analisis, dan mencatat transaksi keuangan menggunakan proses yang berulang."},{"title":"KSPAN","description":"Program kegiatan dalam memberikan informasi kepada siswa terkait informasi mengenai kesehatan reproduksi (Kespro), alat reproduksi laki-laki dan perempuan, narkoba, infeksi menular seksual (IMS), HIV dan AIDS."},{"title":"Cinematography","description":"Belajar cara memposisikan kamera, atur angle, dan ciptakan tangkapan gambar yang mengesankan. Tak sampai disitu, extra cinematography akan memfokuskan siswa untuk bisa menyampaikan pesan yang dalam melalui visualisasi gambar."},{"title":"Praktek Upakara Agama (Mejejahit)","description":"Ekstrakulikuler yang mengajarkan proses pembuatan dan mengasah kemampuan dalam membuat Upakara kepada peserta didik."},{"title":"Komputer Akuntansi (MYOB)","description":"Belajar mengenai program aplikasi yang digunakan untuk mengolah transaksi akuntansi dan menghasilkan laporan keuangan."},{"title":"Jurnalistik","description":"Menyelidiki fenomena, kasus, dan me-wawancarai orang disekitar untuk dapat menyampaikan berita yang akurat, presisi, dan aktual."},{"title":"UKS","description":"Program UKS mencakup kegiatan aktivitas fisik, sarapan dengan menu sehat, menerapkan Cuci Tangan Pakai Sabun, buku raport kesehatanku untuk gerakan literasi di lingkungan sekolah"},{"title":"Club English","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Bahasa Inggris"},{"title":"Club Matematika","description":"Memiliki ketertarikan lebih dalam hal hitung menghitung? Ini adalah extra yang tepat untuk mempelajari matematika ke titik yang jauh lebih dalam lagi."}]`);

    const addExtracurricularQueries = extracurriculars.map((extracurricular, i) => {
        const id = i + 1;

        return prisma.extracurriculars.upsert({
            where: { id },
            update: {},
            create: {
                id,
                title: extracurricular.title,
                description: extracurricular.description,
            },
        });
    });

    const competencies: {
        title: string,
        description: string
    }[] = JSON.parse(`[{"title":"Rekayasa Perangkat Lunak","description":"Biasa disebut RPL, sebuah jurusan yang mempelajari dan mendalami pengembangn perangkat lunak mulai dari pembuatan website, aplikasi, game dan semua yang berkaitan dengan pemrograman."},{"title":"Desain Komunikasi Visual","description":"Jurusan DKV merupakan suatu jurusan yang mempelajari tentang penggunaan komputer guna untuk menyajikan data teks, suara, gambar, animasi, serta video yang dibuat semenarik mungkin."},{"title":"Tata Boga","description":"Kompetensi Keahlian Kuliner memberikan pengetahuan dan keterampilan kepada peserta didik di bidang pengolahan, penyajian dan pelayanan makanan dan minuman."},{"title":"Akuntansi dan Keuangan Lembaga","description":"Kompetensi Keahlian ini membekali peserta dengan keterampilan akuntansi, pengelolaan keuangan, dan perpajakan, baik secara manual maupun komputerisasi."}]`);

    const addCompetencyQueries = competencies.map((competency, i) => {
        const id = i + 1;

        return prisma.competencies.upsert({
            where: { id },
            update: {},
            create: {
                id,
                title: competency.title,
                description: competency.description,
            },
        });
    });

    const addAdmin = prisma.users_credentials.upsert({
        where: { uuid: "b600a28a-0c1d-4b28-9f38-9d49ca07e9b6" },
        update: {},
        create: {
            uuid: "b600a28a-0c1d-4b28-9f38-9d49ca07e9b6",
            email: "admin@seed.prisma",
            password_hash: "$2b$14$IxRy14tFysTMNjtY8ofq5OFfrsK1KKsIc4kGDWPP2fi26heIsOdfS",
            user_profiles: {
                create: {
                    username: "Admin",
                    permissions: Permissions.ADMINISTRATOR,
                    roles: Roles.ADMIN,
                    articles: {
                        create: {
                            image_url: "https://source.unsplash.com/random/1366x768/?landscape",
                            title: "This is a news title!",
                            content: "This is a news article!",
                            type: ArticleType.NEWS,
                            flags: ArticleFlags.IS_PUBLISHED,
                        },
                    },
                    extracurricular_mentors: {
                        create: {
                            extracurricular_id: 1,
                        },
                    },
                },
            },
        },
    });

    const addAdmin2 = prisma.users_credentials.upsert({
        where: { uuid: "c4316f9e-1032-4f02-b63a-0f3b6c64e335" },
        update: {},
        create: {
            uuid: "c4316f9e-1032-4f02-b63a-0f3b6c64e335",
            email: "admin2@seed.prisma",
            password_hash: "$2b$14$M5DWnJPeed.Msj/Vz0.OYeH.R/93EYT6gfKA9RS.3yKFD9fTGsmWO",
            user_profiles: {
                create: {
                    username: "Admin",
                    permissions: Permissions.ADMINISTRATOR,
                    roles: Roles.ADMIN,
                    articles: {
                        create: {
                            image_url: "https://source.unsplash.com/random/1366x768/?landscape",
                            title: "This is an announcement title!",
                            content: "This is an announcement article!",
                            type: ArticleType.ANNOUNCEMENT,
                            flags: ArticleFlags.IS_PUBLISHED,
                        },
                    },
                    extracurricular_mentors: {
                        create: {
                            extracurricular_id: 2,
                        },
                    },
                },
            },
        },
    });

    await Promise.all([
        ...addExtracurricularQueries,
        ...addCompetencyQueries,
        addAdmin,
        addAdmin2,
    ]);

    const endTimestamp = Date.now();

    console.log("\nSeeding success! (Time taken:", endTimestamp - startTimestamp, "ms)");
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});
