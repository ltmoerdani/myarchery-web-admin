import { panah, target, userPlus, fileText, branch, user, group } from "./icon-svgs";

const eventMenus = {
  1: {
    id: 1,
    icon: panah,
    title: "Pertandingan",
    description:
      "Mengatur jenis pertandingan, kategori, jadwal, kuota, biaya registrasi, dan lainnya",
    computeLink: (eventId) => `/dashboard/event/${eventId}/manage`,
  },
  2: {
    id: 2,
    icon: user,
    title: "Peserta Individu",
    description: "Melihat data peserta, mengubah kategori, status pembayaran, dan lainnya",
    computeLink: (eventId) => `/dashboard/member/${eventId}`,
  },
  3: {
    id: 3,
    icon: group,
    title: "Peserta Beregu",
    description: "Melihat data peserta, mengubah kategori, status pembayaran, dan lainnya",
    computeLink: () => `#`,
  },
  4: {
    id: 4,
    icon: target,
    title: "Jadwal & Skor",
    description:
      "Mengatur jadwal pertandingan, pengaturan score, dan hasil score babak kualifikasi dan eliminasi",
    computeLink: () => "",
  },
  5: {
    id: 5,
    icon: userPlus,
    title: "Panitia",
    description: "Profil panitia, wasit/scorer",
    computeLink: () => "",
  },
  6: {
    id: 6,
    icon: fileText,
    title: "Dokumen",
    description: "Master e-sertifikat",
    computeLink: (eventId) => `/dashboard/certificate/new?event_id=${eventId}`,
  },
  7: {
    id: 7,
    icon: branch,
    title: "Registrasi Series",
    description: "Daftarkan event Anda menjadi bagian dari series",
    computeLink: () => "#",
  },
};

export { eventMenus };
