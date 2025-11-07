<img src="/screenshots/login.jpg" alt="Banner">

<h1>Task Management App</h1>
<p>Aplikasi ini saya buat menggunakan Next JS dan Laravel untuk memonitoring task karyawan. Aplikasi ini sudah memiliki fitur seperti: Login, Register, Task Management, Privacy Security, Filter, dan Sorting.</p>

<h3>System Requirement</h3>
<ul>
  <li>PHP 8.2</li>
  <li>Node JS 22.0</li>
</ul>

<p>Clone repository:  <code>git clone -b master https://github.com/RianHidayatSaputra/task-management.git</code></p>
<h3>Backend</h3>
<ol type="1">
  <li>Buka terminal dan masuk ke folder backend kemudian ketik perintah <code>composer install</code> atau <code>composer update</code> untuk menginstall packages</li>
  <li>Kemudian ketik perintah <code>cp .env.example .env</code> untuk copy paste file .env.example</li>
  <li>Untuk memastikan jwt auth terinstall ketik perintah <code>composer require tymon/jwt-auth</code> atau kalau error <code>composer require tymon/jwt-auth --ignore-platform-reqs</code></li>
  <li>Kemudian ketik perintah <code>php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"</code> untuk publish package</li>
  <li>Ketik perintah <code>php artisan jwt:secret</code> untuk generate secret key</li>
  <li>Kemudian ketik perintah <code>php artisan key:generate</code> untuk generate key laravel</li>
  <li>Kemudian edit settingan database di file .env nya supaya terhubung ke database kita</li>
  <li>Kemudian ketik perintah <code>php artisan migrate</code> untuk menjalankan migration nya</li>
  <li>Kemudian generate User Seeder nya dengan perintah <code>php artisan db:seed --class=UserSeeder</code></li>
  <li>Jalankan laravelnya dengan perintah <code>php artisan serve</code></li>
</ol>

<h3>Frontend</h3>
<ol type="1">
  <li>Buka terminal dan masuk ke folder frontend kemudian ketik perintah <code>npm install</code> untuk menginstall packages</li>
  <li>Jalankan Next JSnya dengan perintah <code>npm run dev</code></li>
</ol>

<h3>Frontend</h3>
<ul>
  <li>Laravel 11</li>
  <li>Next JS 14</li>
  <li>JWT Auth</li>
</ul>

<h3>Akun Login Dummy</h3>
<p>Username: johndoe</p>
<p>Password: 123456</p>

<h3>Struktur Database</h3>
<h6>Untuk strukturnya ada 2 table:</h6>
<p>Table User</p>
<ul>
  <li>user_id PK AI</li>
  <li>name VARCHAR(50)</li>
  <li>username VARCHAR(50)</li>
  <li>password VARCHAR(255)</li>
</ul>

<p>Table Task</p>
<ul>
  <li>task_id PK AI</li>
  <li>user_id FK</li>
  <li>title VARCHAR(255)</li>
  <li>description TEXT</li>
  <li>status ENUM('todo','in_progress','done')</li>
  <li>deadline DATE</li>
  <li>created_by VARCHAR(255)</li>
</ul>

















