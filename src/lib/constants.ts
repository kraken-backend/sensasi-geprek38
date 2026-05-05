export const RESTAURANT = {
  name: "Sensasi Geprek 38",
  tagline: "Geprek Asli Semarang, Bumbu Rempah Warisan Keluarga",
  address: "Jl. Gemah Tengah No.38, Gemah, Kec. Pedurungan, Kota Semarang, Jawa Tengah 50246",
  whatsapp: "62812921319",
  whatsappLink: "https://wa.me/62812921319",
  instagram: "https://www.instagram.com/sensasigeprek",
  instagramHandle: "@sensasigeprek",
  gofood: "https://gofood.co.id/semarang/restaurant/ayam-geprek-sensasi-geprek-38-gemah-2e7cdd62-7060-4578-9027-64adf3b74763",
  maps: "https://maps.app.goo.gl/mWe5xx7mkNUf7Z1b8",
  founded: "23 Oktober 2019",
  owner: "Yuki Hendrawan Arfianto",
  ownerTitle: "Pendiri & Pemilik",
} as const;

export const HOURS = {
  schedule: [
    { day: "Senin", dayEn: "Monday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Selasa", dayEn: "Tuesday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Rabu", dayEn: "Wednesday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Kamis", dayEn: "Thursday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Jumat", dayEn: "Friday", open: null, close: null, isOpen: false },
    { day: "Sabtu", dayEn: "Saturday", open: "09:00", close: "17:00", isOpen: true },
    { day: "Minggu", dayEn: "Sunday", open: null, close: null, isOpen: false },
  ],
} as const;

export const SEO = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://sensasigeprek38.com",
  defaultTitle: "Sensasi Geprek 38 Semarang | Ayam Geprek Bumbu Rempah Asli",
  defaultDescription: "Ayam geprek bumbu rempah warisan keluarga sejak 23 Oktober 2019. Pesan via GoFood atau hubungi kami di Jl. Gemah Tengah No.38, Pedurungan, Semarang.",
  keywords: [
    "ayam geprek semarang",
    "ayam geprek pedurungan",
    "ayam geprek gemah semarang",
    "sensasi geprek 38",
    "ayam geprek bumbu rempah semarang",
    "ayam geprek halal semarang",
    "warung ayam geprek semarang",
  ] as string[],
  ogImage: "/og-image.jpg",
} as const;
