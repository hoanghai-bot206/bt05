
const { MongoClient } = require('mongodb');

// Kết nối MongoDB trên máy local
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        // Kết nối MongoDB
        await client.connect();
        console.log('Kết nối MongoDB thành công!');

        // Chọn database và collection
        const db = client.db('qlsinhvien');
        const collection = db.collection('students');

        // 1. Tìm sinh viên có điểm >= 7
        console.log('\nDANH SÁCH SINH VIÊN CÓ ĐIỂM >= 7:');

        const students = await collection.find({
            diem: { $gte: 7 }
        })
        .sort({ diem: -1 })
        .toArray();

        console.log(students);

        // 2. Cập nhật điểm sinh viên theo masv
        console.log('\nCẬP NHẬT ĐIỂM SINH VIÊN:');

        const result = await collection.updateOne(
            { masv: 'SV001' },
            { $set: { diem: 9.5 } }
        );

        if (result.matchedCount > 0) {
            console.log('Cập nhật điểm sinh viên thành công!');
        } else {
            console.log('Không tìm thấy sinh viên SV001!');
        }

        // 3. Hiển thị thông tin sau cập nhật
        console.log('\nTHÔNG TIN SINH VIÊN SAU KHI CẬP NHẬT:');

        const student = await collection.findOne({
            masv: 'SV001'
        });

        console.log(student);

    } catch (error) {
        console.error('Lỗi:', error);
    } finally {
        await client.close();
        console.log('\nĐã đóng kết nối MongoDB!');
    }
}

main();
