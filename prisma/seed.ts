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
                            image_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTcxMjE5Nzk5MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1366",
                            title: "Rainy Preparations, Unexpected Punches, and Unraveling Truth",
                            summary: "In this collection of intriguing scenarios, the characters find themselves facing unexpected challenges and decisions.",
                            content: {
                                "ops": [{ "insert": "It was going to rain. The weather forecast didn't say that, but the steel plate in his hip did. He had learned over the years to trust his hip over the weatherman. It was going to rain, so he better get outside and prepare.\n\nTerrance knew that sometimes it was simply best to stay out of it. He kept repeating this to himself as he watched the scene unfold. He knew that nothing good would come of him getting involved. It was far better for him to stay on the sidelines and observe. He kept yelling this to himself inside his head as he walked over to the couple and punched the man in the face.\n\nDave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.\n\nAfter hunting for several hours, we finally saw a large seal sunning itself on a flat rock. I took one of the wooden clubs while Larry took the longer one. We slowly snuck up behind the seal until we were close enough to club it over its head. The seal slumped over and died. This seal would help us survive. We could eat the meat and fat. The fat could be burned in a shell for light and the fur could be used to make a blanket. We declared our first day of hunting a great success.\n\nFinding the truth wouldn't be easy, that's for sure. Then there was the question of whether or not Jane really wanted to know the truth. That's the thing that bothered her most. It wasn't the difficulty of actually finding out what happened that was the obstacle, but having to live with that information once it was found.\n" }],
                            },
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
                            image_url: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTcxMjE5Nzk3Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1366",
                            title: "Ethical Dilemmas, Nostalgic Trees, Perceptions of Tim",
                            summary: "This collection of thought-provoking scenarios delves into various themes and emotions.",
                            content: {
                                "ops": [{ "insert": "\"Explain to me again why I shouldn't cheat?\" he asked. \"All the others do and nobody ever gets punished for doing so. I should go about being happy losing to cheaters because I know that I don't? That's what you're telling me?\"\n\nThe tree missed the days the kids used to come by and play. It still wore the tire swing the kids had put up in its branches years ago although both the tire and the rope had seen better days. The tree had watched all the kids in the neighborhood grow up and leave, and it wondered if there would ever be a time when another child played and laughed again under its branches. That was the hope that the tree wished every day as the swing gently swung empty in the wind.\n\nTime is all relative based on age and experience. When you are a child an hour is a long time to wait but a very short time when that’s all the time you are allowed on your iPad. As a teenager time goes faster the more deadlines you have and the more you procrastinate. As a young adult, you think you have forever to live and don’t appreciate the time you spend with others. As a middle-aged adult, time flies by as you watch your children grow up. And finally, as you get old and you have fewer responsibilities and fewer demands on you, time slows. You appreciate each day and are thankful you are alive. An hour is the same amount of time for everyone yet it can feel so different in how it goes by.\n\nHe stepped away from the mic. This was the best take he had done so far, but something seemed missing. Then it struck him all at once. Visuals ran in front of his eyes and music rang in his ears. His eager fingers went to work in an attempt to capture his thoughts hoping the results would produce something that was at least half their glory.\n\nThe paper was blank. It shouldn't have been. There should have been writing on the paper, at least a paragraph if not more. The fact that the writing wasn't there was frustrating. Actually, it was even more than frustrating. It was downright distressing.\n" }],
                            },
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
