"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("./admin"));
const member_1 = __importDefault(require("./member"));
const category_1 = __importDefault(require("./category"));
const author_1 = __importDefault(require("./author"));
const publisher_1 = __importDefault(require("./publisher"));
const shelf_1 = __importDefault(require("./shelf"));
const libraryProfile_1 = __importDefault(require("./libraryProfile"));
const book_1 = __importDefault(require("./book"));
const bookDetail_1 = __importDefault(require("./bookDetail"));
const stock_1 = __importDefault(require("./stock"));
const borrowing_1 = __importDefault(require("./borrowing"));
const schedule_1 = __importDefault(require("./schedule"));
const dokter_1 = __importDefault(require("./dokter"));
const pasien_1 = __importDefault(require("./pasien"));
const petugas_1 = __importDefault(require("./petugas"));
const layanan_1 = __importDefault(require("./layanan"));
const pemeriksaan_1 = __importDefault(require("./pemeriksaan"));
const spesimen_1 = __importDefault(require("./spesimen"));
const rekamMedis_1 = __importDefault(require("./rekamMedis"));
const router = (0, express_1.Router)();
router
    .use('/admin', admin_1.default)
    .use('/member', member_1.default)
    .use('/category', category_1.default)
    .use('/author', author_1.default)
    .use('/publisher', publisher_1.default)
    .use('/shelf', shelf_1.default)
    .use('/library-profile', libraryProfile_1.default)
    .use('/book', book_1.default)
    .use('/book-detail', bookDetail_1.default)
    .use('/stock', stock_1.default)
    .use('/borrowing', borrowing_1.default)
    .use('/schedule', schedule_1.default)
    .use('/dokter', dokter_1.default)
    .use('/pasien', pasien_1.default)
    .use('/petugas', petugas_1.default)
    .use('/layanan', layanan_1.default)
    .use('/pemeriksaan', pemeriksaan_1.default)
    .use('/spesimen', spesimen_1.default)
    .use('/rekam-medis', rekamMedis_1.default);
exports.default = router;
