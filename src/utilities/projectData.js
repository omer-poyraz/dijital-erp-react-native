export const projectData = [
    {
        id: 1,
        sorumlu: 'Ahmet Yılmaz',
        projeAdi: 'Gürz',
        parcaKodu: 'DGT-345',
        sorumluKisi: 'Mehmet Demir',
        seriNo: 'SN00123',
        uretimAdedi: 150,
        sure: 8,
        tarih: '01.04.2025',
        dosya: null,
        aciklama: 'Proje başlangıç aşamasında',
        teknisyenTarih: '01.04.2025 09:00',
        basariliDurumlar: [
            { id: 1, aciklama: 'Başarılı Durum 1', teknisyen: 'Ali Can', parcaKodu: 'DGT-001', durum: 'Aktif', onay: 'Onaylandı', bekleyenAdet: 0, kaliteAciklama: 'Test başarılı', tarih: '02.04.2025' },
            { id: 2, aciklama: 'Başarılı Durum 2', teknisyen: 'Ali Can', parcaKodu: 'DGT-001', durum: 'Pasif', onay: 'Onaylandı', bekleyenAdet: 0, kaliteAciklama: 'İkinci test başarılı', tarih: '03.04.2025' }
        ],
        basarisizDurumlar: []
    },
    {
        id: 2,
        sorumlu: 'Ayşe Kaya',
        projeAdi: 'Tulgar',
        parcaKodu: 'DGT-132',
        sorumluKisi: 'Fatma Şahin',
        seriNo: 'SN00124',
        uretimAdedi: 200,
        sure: 15,
        tarih: '02.04.2025',
        dosya: null,
        aciklama: 'Tasarım aşamasında',
        teknisyenTarih: '02.04.2025 10:30',
        basariliDurumlar: [],
        basarisizDurumlar: [
            { id: 1, uygunsuzluk: 'Uygunsuzluk 1', teknisyen: 'Fatma Şahin', parcaKodu: 'DGT-002', durum: 'Beklemede', bekleyenAdet: 5, kaliteAciklama: 'Kalite kontrol bekliyor', tarih: '03.04.2025' }
        ]
    },
    {
        id: 3,
        sorumlu: 'Mustafa Öztürk',
        projeAdi: 'S-300',
        parcaKodu: 'DGT-543',
        sorumluKisi: 'Zeynep Yıldız',
        seriNo: 'SN00125',
        uretimAdedi: 100,
        sure: 10,
        tarih: '03.04.2025',
        dosya: null,
        aciklama: 'Geliştirme devam ediyor',
        teknisyenTarih: '03.04.2025 08:45',
        basariliDurumlar: [
            { id: 3, aciklama: 'Başarılı Durum 3', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 4, aciklama: 'Başarılı Durum 4', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' }
        ],
        basarisizDurumlar: [
            { id: 2, uygunsuzluk: 'Uygunsuzluk 2', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', bekleyenAdet: 3, kaliteAciklama: 'Düzeltme gerekiyor', tarih: '04.04.2025' },
            { id: 3, uygunsuzluk: 'Uygunsuzluk 3', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', bekleyenAdet: 3, kaliteAciklama: 'Düzeltme gerekiyor', tarih: '04.04.2025' },
            { id: 4, uygunsuzluk: 'Uygunsuzluk 4', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', bekleyenAdet: 3, kaliteAciklama: 'Düzeltme gerekiyor', tarih: '04.04.2025' }
        ]
    },
    {
        id: 4,
        sorumlu: 'Ömer Poyraz',
        projeAdi: 'SIHA',
        parcaKodu: 'DGT-123',
        sorumluKisi: 'Zeynep Yıldız',
        seriNo: 'SN00125',
        uretimAdedi: 34,
        sure: 20,
        tarih: '03.04.2025',
        dosya: null,
        aciklama: 'Geliştirme devam ediyor',
        teknisyenTarih: '03.04.2025 08:45',
        basariliDurumlar: [
            { id: 3, aciklama: 'Başarılı Durum 3', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' }
        ],
        basarisizDurumlar: [
            { id: 2, uygunsuzluk: 'Uygunsuzluk 2', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', bekleyenAdet: 3, kaliteAciklama: 'Düzeltme gerekiyor', tarih: '04.04.2025' },
            { id: 3, uygunsuzluk: 'Uygunsuzluk 4', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', bekleyenAdet: 3, kaliteAciklama: 'Düzeltme gerekiyor', tarih: '04.04.2025' }
        ]
    },
    {
        id: 5,
        sorumlu: 'Beyza Kaya',
        projeAdi: 'Tufan',
        parcaKodu: 'DGT-435',
        sorumluKisi: 'Fatma Şahin',
        seriNo: 'SN00124',
        uretimAdedi: 200,
        sure: 15,
        tarih: '02.04.2025',
        dosya: null,
        aciklama: 'Tasarım aşamasında',
        teknisyenTarih: '02.04.2025 10:30',
        basariliDurumlar: [
            { id: 4, aciklama: 'Başarılı Durum 5', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 5, aciklama: 'Başarılı Durum 6', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 6, aciklama: 'Başarılı Durum 7', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 7, aciklama: 'Başarılı Durum 8', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' }
        ],
        basarisizDurumlar: [
            { id: 1, uygunsuzluk: 'Uygunsuzluk 1', teknisyen: 'Fatma Şahin', parcaKodu: 'DGT-002', durum: 'Beklemede', bekleyenAdet: 5, kaliteAciklama: 'Kalite kontrol bekliyor', tarih: '03.04.2025' },
            { id: 2, uygunsuzluk: 'Uygunsuzluk 2', teknisyen: 'Fatma Şahin', parcaKodu: 'DGT-002', durum: 'Beklemede', bekleyenAdet: 5, kaliteAciklama: 'Kalite kontrol bekliyor', tarih: '03.04.2025' },
            { id: 3, uygunsuzluk: 'Uygunsuzluk 3', teknisyen: 'Fatma Şahin', parcaKodu: 'DGT-002', durum: 'Beklemede', bekleyenAdet: 5, kaliteAciklama: 'Kalite kontrol bekliyor', tarih: '03.04.2025' }
        ]
    },
    {
        id: 6,
        sorumlu: 'Alim Kalfa',
        projeAdi: 'Karat',
        parcaKodu: 'DGT-453',
        sorumluKisi: 'Medine Derli',
        seriNo: 'SN56124',
        uretimAdedi: 120,
        sure: 50,
        tarih: '02.04.2025',
        dosya: null,
        aciklama: 'Tasarım aşamasında',
        teknisyenTarih: '02.04.2025 10:30',
        basariliDurumlar: [
            { id: 4, aciklama: 'Başarılı Durum 3', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 5, aciklama: 'Başarılı Durum 4', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 6, aciklama: 'Başarılı Durum 5', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' },
            { id: 7, aciklama: 'Başarılı Durum 6', teknisyen: 'Zeynep Yıldız', parcaKodu: 'DGT-003', durum: 'Aktif', onay: 'Bekliyor', bekleyenAdet: 2, kaliteAciklama: 'Kontrol aşamasında', tarih: '04.04.2025' }
        ],
        basarisizDurumlar: [
            { id: 1, uygunsuzluk: 'Uygunsuzluk 1', teknisyen: 'Fatma Şahin', parcaKodu: 'DGT-002', durum: 'Beklemede', bekleyenAdet: 5, kaliteAciklama: 'Kalite kontrol bekliyor', tarih: '03.04.2025' },
            { id: 2, uygunsuzluk: 'Uygunsuzluk 2', teknisyen: 'Fatma Şahin', parcaKodu: 'DGT-002', durum: 'Beklemede', bekleyenAdet: 5, kaliteAciklama: 'Kalite kontrol bekliyor', tarih: '03.04.2025' }
        ]
    },
];