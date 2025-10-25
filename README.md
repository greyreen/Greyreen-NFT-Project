# 💎 Greyreen NFT Collection (Secure ERC-721)

## 🌟 Proje Özeti

Bu proje, bir sonraki nesil NFT koleksiyonları için oluşturulmuş güvenli bir **ERC-721** sözleşmesi uygulamasıdır. Temel odak noktası, **Access Control (Erişim Kontrolü)** kullanarak basım (mint) yetkisini sadece belirli adreslerle kısıtlamaktır.

Bu sözleşme, endüstri standardı **OpenZeppelin** kütüphanesini kullanır ve **Hardhat** ile geliştirilmiş, tamamen test edilmeye hazır bir yapıdır.

---

## ⚙️ Geliştirme Ortamı ve Zorluklar (Başarı Kanıtı)

Bu projede karşılaşılan inatçı Node/Hardhat uyumsuzlukları nedeniyle, projenin başarılı bir şekilde çalıştırılması için **stabil bir geliştirme ortamı** kurulmuştur.

| Bileşen | Sürüm/Durum | Açıklama |
| :--- | :--- | :--- |
| **Sözleşme Dili** | Solidity (`^0.8.20`) | Akıllı Sözleşme dili. |
| **Geliştirme Ortamı** | Hardhat (`v2.14.0`) | Node V18 ile uyumluluğu garantilenmiş stabil sürüm. |
| **Test Ortamı** | Node.js (`v18.x.x` LTS) | Hardhat'ın eski/yeni versiyon uyumsuzluklarını aşmak için kurulmuştur. |
| **ERC-721** | OpenZeppelin | Güvenli ve standartlara uygun NFT yapısı. |
| **Erişim Kontrolü** | AccessControl.sol | Basım yetkisi sadece `MINTER_ROLE` sahiplerindedir. |

## 💡 Temel Sözleşme Özellikleri (`GreyreenNFT.sol`)

1.  **Güvenli Basım (`safeMint`):** Basım (mint) fonksiyonu, yalnızca `MINTER_ROLE` yetkisine sahip adresler tarafından çağrılabilir.
2.  **Rol Atama:** Sözleşmeyi dağıtan (deploy eden) adres, otomatik olarak hem **Yönetici** hem de **Basımcı (Minter)** rolünü alır.
3.  **URI Desteği:** NFT'lerin meta verilerini (resim, özellikler) takip etmek için **`ERC721URIStorage`** uzantısı kullanılır.

## 🧪 Testler ve İşlevsellik Kanıtı

Projenin tüm temel mantığı, yerel Hardhat ağı üzerinde **tamamen test edilmiştir.**

Test senaryoları (`test/GreyreenNFT.test.js`) şunları doğrular:
* Sözleşme sahibinin doğru rollere sahip olduğunu.
* Rolü olmayan bir hesabın basım yapmaya çalıştığında **hata fırlattığını** (`revert`).
* Basılan token ID'lerinin doğru şekilde arttığını ve sahipliğin doğru atandığını.

### Testleri Çalıştırma (Yerel)

Projeyi yerel olarak çalıştırmak ve test etmek için terminalde şu komutları kullanın:

```bash
npx hardhat compile
npx hardhat test