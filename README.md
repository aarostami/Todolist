# پروژه Todo list
## نحوه اجرای پروژه
دستور اجرا: npm start
در تکست باکس متنی نوشته و با زدن دکمه + به لیست اضافه کنید و اون رو ویرایش و حذف کنید.
در تیک ها یک مشکلاتی وجود داره که کامل حل نشده هست.
## این پروژه به صورت زیر اجرا میشود:
اول) متغیرها و state ها تعریف میشود که اگر  local storage وجود داشت از اون خوانده بشه.

دوم html اجرا میشه که یک textbox وجود داره که اگر چیزی نوشته شود در متغیر inputvalue ذخیره میشه و اگر دکمه + زده شود فانکشن add اجرا میشه و در متغیر todo ذخیره میکنه.
در لیست اگر روی دکمه سطل زباله کلیک کنیم فانکشن remove اجرا میشه و اون item رو حذف میکنه، اگر روی دکمه مداد کلیک بشه فانکشن edit اجرا میشه و یک textbox قابل تغییر نشون میده که میشه نوشته رو تغییر داد و بعد از زدن تیک فانکشن editAccept اجرا میشه و در متغیر todo ثبت میشه.

سوم اگر آیتمی تیک زده بشه فانکشن done اجرا میشه و اون رو در دوتا متغیر checkbox و checkedTodo اضافه میکنه. که هم تیک چک باکس زده میشه هم روی اون آیتم به عنوان انجام شده خط کشیده میشه.
در این فانکشن ها مقدارها در local storage ذخیره یا حذف میشه.
در قسمت سه دکمه وضعیف (همه – انجام شده – در حال انجام) با استفاده از کامپوننت Todo در قسمت "همه" از متغیر todo نشان داده میشه و در قسمت "در حال انجام" متغیر checkedTodo از todo کم میشود و به عنوان انجام شده میشود و در قسمت "انجام شده" از متغیر checkedTodo نشان داده میشود.
زمان تحویل یک هفته میباشد.
