// ✅ get ALL elements whose ID starts with `box`
const elements1 = document.querySelectorAll(`[id^="box"]`);
console.log(elements1); // 👉️ [div#box1, div#box2, div#box3]

// ✅ get FIRST element whose ID starts with `box`
const element1 = document.querySelector(`[id^="box"]`);
console.log(element1); // 👉️ [div#box1]