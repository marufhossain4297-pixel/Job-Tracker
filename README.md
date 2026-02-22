1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: 
getElementById() ডকুমেন্ট থেকে নির্দিষ্ট id ব্যবহার করে একটি element বের করা ।
getElementsByClassName() ডকুমেন্ট থেকে নির্দিষ্ট class name ব্যবহার এক বা একাধিক element বের করা ।
querySelector() CSS selector এর মত ব্যবহার করে ডকুমেন্ট থেকে প্রথম matching element বের করা ।
querySelectorAll() CSS selector ব্যবহার করে ডকুমেন্ট থেকে সব matching element বের করা ।
এইগুলোর মধ্যে মূল পার্থক্য হলো:
getElementById → id দিয়ে একটি element
getElementsByClassName দিয়ে একাধিক class বের করা ।
querySelector দিয়ে CSS selector এর শুধু প্রথম element বের করা ।
querySelectorAll দিয়ে CSS selector এর যতগুলো matching element আছে সবগুলো বের করা যায় ।

2. How do you create and insert a new element into the DOM?
Ans: 
প্রথমে createElement() ব্যবহার করে element তৈরি করা হয়।
তারপর element এ content বা attribute যোগ করা হয়।
এরপর appendChild() বা append() ব্যবহার করে parent এ insert করা হয়।

3. What is Event Bubbling? And how does it work?
Ans:
Event Bubbling এর মাধ্যমে Event ঘটালে তখন সে নিচ থেকে আস্তে আস্তে উপরে parent এর দিকে যায় ।
কোন Event ঘটালে প্রথমে event target element এ যায়। 
তারপর parent element এ যায়।
এরপর উপরের দিকে যেতে থাকে।

4. What is Event Delegation in JavaScript? Why is it useful?
Ans:
Event Delegation হলো parent element এ event listener add করলে child element এর event handle করা যায়। এটি event bubbling ব্যবহার করে কাজ করে।
এটি useful কিছু কারণ:
আলাদা আলাদা Eventlistener add করতে হয় না।
browser memory কম লাগে।
performance ভালো হয়।
নতুন element যোগ হলেও সহজে কাজ করে।
code সহজ হয়।

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans:
preventDefault() browser এর default কাজ বন্ধ করে।
stopPropagation() event উপরের দিকে যাওয়া বন্ধ করে।