<template>
<section class="contact-section">

<v-container>

<!-- HEADER -->
<div class="section-header">
<h2>
Contact <span class="accent">Me</span>
</h2>

<p class="subtitle">
I'll be awaiting for your message through the form below!
</p>
</div>

<div class="contact-layout">

<!-- CONTACT INFO -->
<div class="contact-info">

<div class="contact-item">
<v-icon class="contact-icon">mdi-email</v-icon>
<span>mychalpejana.mp@gmail.com</span>
</div>

<div class="contact-item">
<v-icon class="contact-icon">mdi-github</v-icon>
<a href="https://github.com/saltinstillwaters" target="_blank">
github.com/saltinstillwaters
</a>
</div>

<div class="contact-item">
<v-icon class="contact-icon">mdi-phone</v-icon>
<span>09554813800</span>
</div>

</div>

<!-- CONTACT FORM -->
<v-card class="contact-card">

<v-form ref="form">
<v-card-text>

<v-text-field
v-model="name"
label="Name"
variant="outlined"
density="comfortable"
:rules="nameRules"
class="contact-input"
/>

<v-text-field
v-model="email"
label="Email"
variant="outlined"
density="comfortable"
:rules="emailRules"
class="contact-input"
/>

<v-textarea
v-model="message"
label="Message"
rows="4"
variant="outlined"
density="comfortable"
:rules="messageRules"
class="contact-input"
/>

<v-btn
class="send-btn"
size="large"
block
:loading="loading"
@click="sendMessage"
>
SEND MESSAGE
</v-btn>

</v-card-text>
</v-form>

</v-card>

</div>

</v-container>

</section>
</template>

<script setup>
import { ref } from "vue"
import emailjs from "@emailjs/browser"

const name = ref("")
const email = ref("")
const message = ref("")
const loading = ref(false)

const form = ref(null)

const nameRules = [
v => v.length < 100 || "Too long"
]

const emailRules = [
v => !!v || "Email is required",
v => /.+@.+\..+/.test(v) || "Email must be valid",
v => v.length < 100 || "Too long"
]
const messageRules = [
    v => !!v || "Message is required",
    v => v.length >= 5 || "Message must be at least 5 characters",
    v => v.length < 100 || "Too long"
]

const sendMessage = async () => {

const { valid } = await form.value.validate()

if (!valid) return

loading.value = true

try {

await emailjs.send(
"service_ozshpxi",
"template_b5rpqvy",
{
name: name.value,
email: email.value,
message: message.value
},
"YdV_0ntuoaO-qeRMH"
)

alert("Message sent successfully!")

name.value = ""
email.value = ""
message.value = ""

form.value.reset()

} catch (error) {

alert("Failed to send message.")
console.error(error)

}

loading.value = false

}
</script>

<style scoped>
.contact-section {
padding: 140px 0;

background: linear-gradient(
180deg,
#232323 0%,
#1a1a1a 100%
);

border-top-left-radius: 50px;
border-top-right-radius: 50px;
}

/* HEADER */

.section-header {
text-align: center;
margin-bottom: 90px;
color: white;
}

.section-header h2 {
font-size: 44px;
font-weight: 700;
}

.subtitle {
margin-top: 14px;
color: #9aa4b2;
font-size: 17px;
}

.accent {
color: #ff7a2f;
}

/* LAYOUT */

.contact-layout {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 70px;
align-items: start;
}

/* CONTACT INFO */

.contact-info {
display: flex;
flex-direction: column;
gap: 26px;
}

.contact-item {
display: flex;
align-items: center;
gap: 16px;

font-size: 18px;
color: #e6e6e6;

padding: 14px 18px;
border-radius: 10px;

transition: all 0.25s ease;
}

.contact-item:hover {
background: rgba(255,255,255,0.06);
transform: translateY(-2px);
}

.contact-item a {
text-decoration: none;
color: #ff7a2f;
font-weight: 500;
}

.contact-icon {
color: #ff7a2f;
}

/* CARD */

.contact-card {
padding: 28px;
border-radius: 16px;

background: rgba(255,255,255,0.3);

border: 1px solid rgba(255,255,255,0.12);

backdrop-filter: blur(12px);

box-shadow:
0 12px 35px rgba(0,0,0,0.35),
inset 0 1px 0 rgba(255,255,255,0.05);
}

/* INPUT */

.contact-input {
margin-bottom: 16px;
}

.contact-input :deep(.v-field) {
background: rgba(255,255,255,0.95);
border-radius: 10px;
}

/* BUTTON */

.send-btn {
margin-top: 10px;

background: #ff7a2f;
color: white;

font-weight: 700;
letter-spacing: 0.6px;

border-radius: 12px;

box-shadow: 0 8px 25px rgba(255,122,47,0.35);

transition: all 0.25s ease;
}

.send-btn:hover {
transform: translateY(-2px);
box-shadow: 0 12px 30px rgba(255,122,47,0.45);
}
</style>