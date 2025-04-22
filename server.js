const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('database.db');

// پشتیبانی از فرم‌ها
app.use(bodyParser.urlencoded({ extended: true }));

// نمایش فایل‌های public
app.use(express.static(path.join(__dirname, 'public')));

// ذخیره نام در دیتابیس
app.post('/submit', (req, res) => {
  const name = req.body.name;
  db.run('INSERT INTO product (name) VALUES (?)', [name], (err) => {
    if (err) return res.send('خطا در ذخیره');
    res.send('اطلاعات با موفقیت ذخیره شد!');
  });
});

// اجرای سرور
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// برای دریافت اطلاعات محصول و ذخیره در دیتابیس
app.post('/add-product', (req, res) => {
  const { name, price, description, image } = req.body;

  db.run(`
    INSERT INTO products (name, price, description, image)
    VALUES (?, ?, ?, ?)
  `, [name, price, description, image], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("خطا در ذخیره محصول");
    }
    res.send("✅ محصول با موفقیت ذخیره شد!");
  });
});
// 