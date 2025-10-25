// test/GreyreenNFT.test.js

const { expect } = require("chai");
// HRE (Hardhat Runtime Environment) ile doğru yükleme yapılıyor
const hre = require("hardhat"); 
const ethers = hre.ethers;

describe("GreyreenNFT Sözleşmesi", function () {
    let GreyreenNFT;
    let greyreenNFT;
    let owner; 
    let addr1; 
    let addr2;
    
    // Ethers v5 sözdizimine dönüldü (utils.keccak256)
    const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")); 

    beforeEach(async function () {
        // Hesapları al
        [owner, addr1, addr2] = await ethers.getSigners();
        
        // Sözleşmeyi hazırla (Basit ve doğru isimle)
        GreyreenNFT = await ethers.getContractFactory("GreyreenNFT");

        // Sözleşmeyi deploy et
        greyreenNFT = await GreyreenNFT.deploy();
        await greyreenNFT.waitForDeployment();
    });

    describe("Dağıtım ve Rol Atamaları", function () {
        it("Sözleşme sahibine (owner) hem ADMIN hem de MINTER rolleri atanmalı.", async function () {
            expect(await greyreenNFT.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(true);
            expect(await greyreenNFT.hasRole(MINTER_ROLE, owner.address)).to.equal(true);
        });

        it("Başka hesapların MINTER rolüne sahip olmadığını kontrol et.", async function () {
            expect(await greyreenNFT.hasRole(MINTER_ROLE, addr1.address)).to.equal(false);
        });
    });

    describe("NFT Basımı (Minting)", function () {
        const URI = "https://example.com/nft-metadata/1";
        
        it("Sadece MINTER rolü olan hesap NFT basabilir (Mint).", async function () {
            await expect(greyreenNFT.safeMint(addr1.address, URI)).to.not.be.reverted; 
            
            // Adresleri normalleştirerek kontrol et
            expect(await greyreenNFT.ownerOf(1)).to.equal(addr1.address);
        });

        it("MINTER rolü olmayan hesap basım yapamaz ve hata fırlatır.", async function () {
            // Hata mesajı kontrolü
            await expect(greyreenNFT.connect(addr1).safeMint(addr1.address, URI)).to.be.revertedWith("AccessControl: account");
        });

        it("Basılan her NFT için Token ID doğru artırılmalı.", async function () {
            await greyreenNFT.safeMint(addr1.address, URI);
            await greyreenNFT.safeMint(addr2.address, URI);

            expect(await greyreenNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await greyreenNFT.ownerOf(2)).to.equal(addr2.address);
            expect(await greyreenNFT.totalSupply()).to.equal(2);
        });
    });
});