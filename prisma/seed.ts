import { articles_type as ArticleType, PrismaClient } from "@prisma/client";
import { Permissions } from "~/lib/Permissions";

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.users.upsert({
        where: { uuid: "b600a28a-0c1d-4b28-9f38-9d49ca07e9b6" },
        update: {},
        create: {
            uuid: "b600a28a-0c1d-4b28-9f38-9d49ca07e9b6",
            username: "Admin",
            email: "admin@seed.prisma",
            password_hash: "$2b$16$VHocQGsasMgVAKhmhv4wQ.UdTwLqW3n1oLJ4ejbz1CSANNSuz9ki2",
        },
    });

    const permission = await prisma.user_permissions.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_uuid: admin.uuid,
            permissions: Permissions.ADMINISTRATOR,
        },
    });

    const newsArticle = await prisma.articles.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            image_url: "https://source.unsplash.com/random/1366x768/?landscape",
            title: "This is a news title!",
            content: "This is a news article!",
            author_uuid: admin.uuid,
            type: ArticleType.NEWS,
        },
    });

    const announcementArticle = await prisma.articles.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            image_url: "https://source.unsplash.com/random/1366x768/?landscape",
            title: "This is an announcement title!",
            content: "This is an announcement article!",
            author_uuid: admin.uuid,
            type: ArticleType.ANNOUNCEMENT,
        },
    });

    const extracurriculars: {
        title: string,
        description: string
    }[] = JSON.parse(`[{"title":"Pramuka","description":"Pramuka merupakan wadah proses pendidikan non formal dalam pembentukan karakter. Pramuka adalah kegiatan ekstrakulikuler wajib di sekolah."},{"title":"PKS","description":"Tugas PKS adalah mengatur lalu lintas silingkungan sekolah dan lingkungan sekitar sekolah, terutama pada saat menyebrangkan siswa-siswi yang akan menuju kesekolah"},{"title":"Sepak Bola / Futsal","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Sepak Bola"},{"title":"Tari","description":"Kegiatan Ekstrakulikuler untuk memperdalam pengetahuan dan mangasah skill peserta didik tentang tari tradisional."},{"title":"Pencak Silat","description":"Wadah bagi peserta didik yang ingin mengenal dan yang telah memiliki kemampuan dalam beladiri pencak silat. Sehingga mereka bisa mengembangkan kemampuan diri mereka melalui beladiri pencak silat."},{"title":"Voly","description":"Kegiatan Ekstrakulikuler untuk mendorong prestasi non akademik, pertumbuhan fisik dan perkembangan psikis, meningkatkan kemampuan dan keterampilan dalam bermain bola voli."},{"title":"Catur","description":"EkstraKulikuler untuk mengenal dan mengasah kemampuan peserta didik dalam bermain Catur. Serta untuk melatih cara berfikir peserta didik dalam membuat strategi permainan."},{"title":"Tata Rias","description":"Kegiatan kesiswaan dalam mengembangkan keterampilan peserta didik dalam bidang Tata Rias."},{"title":"PMR","description":"Ekstrakurikuler yang bergerak dibidang kepalangmerahan. Memberi pertolongan pertama merupakan tugas utama anggota PMR kepada teman atau siswa di sekolah yang sakit atau mengalami kecelakaan ringan"},{"title":"Yoga Asana","description":"Merupakan jenis olahraga yang bertujuan untuk meningkatkan kesehatan dan kesejahteraan tubuh, dengan melibatkan aktivitas fisik, latihan pernapasan, teknik relaksasi, dan latihan meditasi."},{"title":"Dharma Gita","description":"Ekstrakuliler untuk menambah pengetahuan tentang nyanyian Dharma Gita dan mengasah kemampuan menyanyikan tembang - tembang keagamaan Hindu, terutama dalam pelaksanaan Yadnya"},{"title":"Vocal Group / Musik","description":"Kegiatan Ekstrakulikuler dalam mengasah kemampuan peserta didik tentang seni musik, selain Alat Musik, juga melatih vokal bagi peserta didik yang masuk dalam bidang bernyanyi."},{"title":"Bulu Tangkis","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Bulu Tangkis"},{"title":"Fruit Carving","description":"Fruit Carving merupakan seni mengukir buah atau sebuah kegiatan memahat dan mengukir buah menggunakan alat sederhana seperti cutter, pisau, dan tusuk gigi menjadi maha karya yang menakjubkan."},{"title":"Basket","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Basket"},{"title":"Siklus Akuntansi","description":"Mangasah kemampuan setiap tindakan akuntansi yang mengidentifikasi, analisis, dan mencatat transaksi keuangan menggunakan proses yang berulang."},{"title":"KSPAN","description":"Program kegiatan dalam memberikan informasi kepada siswa terkait informasi mengenai kesehatan reproduksi (Kespro), alat reproduksi laki-laki dan perempuan, narkoba, infeksi menular seksual (IMS), HIV dan AIDS."},{"title":"Cinematography","description":"Belajar cara memposisikan kamera, atur angle, dan ciptakan tangkapan gambar yang mengesankan. Tak sampai disitu, extra cinematography akan memfokuskan siswa untuk bisa menyampaikan pesan yang dalam melalui visualisasi gambar."},{"title":"Praktek Upakara Agama (Mejejahit)","description":"Ekstrakulikuler yang mengajarkan proses pembuatan dan mengasah kemampuan dalam membuat Upakara kepada peserta didik."},{"title":"Komputer Akuntansi (MYOB)","description":"Belajar mengenai program aplikasi yang digunakan untuk mengolah transaksi akuntansi dan menghasilkan laporan keuangan."},{"title":"Jurnalistik","description":"Menyelidiki fenomena, kasus, dan me-wawancarai orang disekitar untuk dapat menyampaikan berita yang akurat, presisi, dan aktual."},{"title":"UKS","description":"Program UKS mencakup kegiatan aktivitas fisik, sarapan dengan menu sehat, menerapkan Cuci Tangan Pakai Sabun, buku raport kesehatanku untuk gerakan literasi di lingkungan sekolah"},{"title":"Club English","description":"Kegiatan Ekstrakurikuler untuk membantu pengembangan potensi, bakat, dan minat peserta didik dalam bidang Bahasa Inggris"},{"title":"Club Matematika","description":"Memiliki ketertarikan lebih dalam hal hitung menghitung? Ini adalah extra yang tepat untuk mempelajari matematika ke titik yang jauh lebih dalam lagi."}]`);

    for (let i = 0; i < extracurriculars.length; i++) {
        const extracurricular = extracurriculars[i];
        const id = i + 1;

        await prisma.extracurriculars.upsert({
            where: { id },
            update: {},
            create: {
                id,
                title: extracurricular.title,
                description: extracurricular.description,
            },
        });
    }

    console.log("Seeding done!");
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});
