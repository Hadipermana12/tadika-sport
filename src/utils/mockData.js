// Contoh cara menggunakan gambar lokal:
// 1. Simpan gambar di folder src/assets/images/products/
// 2. Import gambar di atas file ini
// 3. Gunakan nama variabel import di properti image



export const products = [
    // --- PREMIER LEAGUE ---
    {
        id: 1,
        name: "Manchester United 24/25",
        price: 1200000,
        category: "Premier League",
        variants: {
            home: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37782208_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Jersey kandang ikonik setan merah musim 24/25 dengan aksen gradasi merah modern."
            },
            away: {
                image: "https://cdn.media.amplience.net/i/frasersdev/36739718_o?fmt=auto&upscale=false&w=767&h=767&sm=scaleFit&$h-ttl$",
                description: "Jersey tandang biru tua dengan pola tekstur eksklusif."
            }
        }
    },
    {
        id: 2,
        name: "Arsenal 24/25",
        price: 1180000,
        category: "Premier League",
        variants: {
            home: {
                image: "https://cdn.media.amplience.net/i/frasersdev/36741108_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Merah klasik dengan lengan putih, simbol kebanggaan London Utara."
            },
            away: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37783118_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Desain tandang berani dengan perpaduan warna hitam dan aksen hijau-merah."
            }
        }
    },

    {
        id: 7,
        name: "Liverpool 24/25",
        price: 1180000,
        category: "Premier League",
        variants: {
            home: {
                image: "https://cdn.shoplightspeed.com/shops/611228/files/63515014/650x750x2/nike-liverpool-24-25-home-jersey-red.jpg",
                description: "Merah klasik dengan lengan putih, simbol kebanggaan London Utara."
            },
            away: {
                image: "https://cdn.shoplightspeed.com/shops/611228/files/65698591/650x750x2/nike-liverpool-24-25-away-jersey-dark-green.jpg",
                description: "Desain tandang berani dengan perpaduan warna hitam dan aksen hijau-merah."
            }
        }
    },

    {
        id: 8,
        name: "Manchester City 24/25",
        price: 1180000,
        category: "Premier League",
        variants: {
            home: {
                image: "https://cdn.shoplightspeed.com/shops/611228/files/73136162/650x750x2/puma-manchester-city-25-26-home-jersey-blue.jpg",
                description: "Merah klasik dengan lengan putih, simbol kebanggaan London Utara."
            },
            away: {
                image: "https://cdn.shoplightspeed.com/shops/611228/files/73136668/650x750x2/puma-manchester-city-25-26-away-jersey-black.jpg",
                description: "Desain tandang berani dengan perpaduan warna hitam dan aksen hijau-merah."
            }
        }
    },

    

    // --- LA LIGA ---
    {
        id: 3,
        name: "Real Madrid 24/25",
        price: 1300000,
        category: "La Liga",
        variants: {
            home: {
                image: "https://cdn.media.amplience.net/i/frasersdev/36823401_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Jersey 'Los Blancos' putih bersih dengan pola 'Hounds-tooth' yang elegan."
            },
            away: {
                image: "https://cdn.media.amplience.net/i/frasersdev/36739112_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Warna oranye cerah yang terinspirasi dari jersey legendaris 'La Decima'."
            }
        }
    },
    {
        id: 4,
        name: "Barcelona 24/25",
        price: 1250000,
        category: "La Liga",
        variants: {
            home: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37717818_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Desain setengah merah-biru (Half-Half) untuk merayakan ulang tahun ke-125 klub."
            },
            away: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37602201_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Warna hitam elegan dengan logo klub yang memiliki efek mengkilap."
            }
        }
    },

    // --- SERIE A ---
    {
        id: 5,
        name: "Juventus 24/25",
        price: 1150000,
        category: "Serie A",
        variants: {
            home: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37893103_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Garis hitam-putih klasik dengan sentuhan 'Moonscape' di permukaannya."
            },
            away: {
                image: "https://cdn.media.amplience.net/i/frasersdev/36823113_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Warna kuning-biru yang mewakili warna kota Turin."
            }
        }
    },
    {
        id: 6,
        name: "AC Milan 24/25",
        price: 1100000,
        category: "Serie A",
        variants: {
            home: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37762808_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Garis-garis Rossoneri yang tak lekang oleh waktu."
            },
            away: {
                image: "https://cdn.media.amplience.net/i/frasersdev/37765613_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
                description: "Warna putih bersih dengan detail kerah merah-hitam."
            }
        }
    }
];