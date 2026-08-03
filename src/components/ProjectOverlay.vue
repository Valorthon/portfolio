<template>
    <div>

        <v-overlay :model-value="openOverlay" class="projects-overlay" scrim="black" persistent
            @click:outside="onClose">

            <div class="overlay-container">

                <!-- CLOSE -->

                <v-btn icon class="close-btn" variant="text" @click="onClose">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <!-- PROJECT CARD -->

                <v-card class="project-card">

                    <div class="media-container">

                        <!-- IMAGE -->

                        <v-img v-if="projects[projectId].slides[current].type === 'image'"
                            :src="projects[projectId].slides[current].src" class="media" />

                        <!-- VIDEO -->

                        <video v-else-if="projects[projectId].slides[current].type === 'video'" :key="current"
                            :src="projects[projectId].slides[current].src" class="media" autoplay muted loop playsinline
                            controls />

                        <!-- PDF -->

                        <iframe v-else-if="projects[projectId].slides[current].type === 'pdf'"
                            :src="projects[projectId].slides[current].src" class="media" />

                    </div>

                    <v-card-text>

                        <h2 class="project-title">
                            {{ projects[projectId].title }}
                        </h2>

                        <h3 class="slide-subtitle">
                            {{ projects[projectId].slides[current].subtitle }}
                        </h3>

                        <p class="project-description">
                            {{ projects[projectId].slides[current].description }}
                        </p>

                        <div class="tech-stack">

                            <v-chip v-for="tech in projects[projectId].tech" :key="tech" size="small">
                                {{ tech }}
                            </v-chip>

                        </div>

                        <div class="actions">

                            <v-btn v-if="projects[projectId].github" variant="outlined"
                                :href="projects[projectId].github" target="_blank">
                                GitHub
                            </v-btn>

                            <v-btn v-if="projects[projectId].demo" color="#ff7a2f" :href="projects[projectId].demo"
                                target="_blank">
                                Live Demo
                            </v-btn>

                        </div>

                    </v-card-text>

                </v-card>

                <!-- NAVIGATION -->

                <div class="nav">

                    <v-btn icon @click="prevProject">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>

                    <span>
                        {{ current + 1 }} / {{ projects[projectId].slides.length }}
                    </span>

                    <v-btn icon @click="nextProject">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>

                </div>

            </div>

        </v-overlay>

    </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
    projectId: Number,
    openOverlay: Boolean,
})

const emit = defineEmits(["closed"])

const current = ref(0)

watch(
    () => props.openOverlay,
    () => {
        current.value = 0
    }
)

function onClose() {
    emit("closed")
}

const projects = ref([
    {
        title: "Math Speech-to-Text Virtual Whiteboard",
        tech: ["Python", "Tkinter", "Transformers", "SpaCy", "Machine Learning"],
        github: "",
        demo: "",
        slides: [

            {
                type: "image",
                subtitle: "Overview",
                description: "A virtual whiteboard powered by the spaCy NLP pipeline and a custom Named Entity Recognition (NER) model.",
                src: "/TalkboardPoster.png"
            },

            {
                type: "video",
                subtitle: "Main Features",
                description: "Spoken mathematical expressions are transcribed into formatted equations and graphs.",
                src: "/video/talkboard/board.mp4"
            },

            {
                type: "video",
                subtitle: "Sub Features",
                description: "Boards can be organized, sorted, and managed with a Trash Bin feature.",
                src: "/video/talkboard/equation.mp4"
            },

            {
                type: "video",
                subtitle: "Exporting",
                description: "Boards can be exported to PDF with a single click.",
                src: "/video/talkboard/pdf.mp4"
            }

        ]
    },
    {
        title: "Flappy Bird (No Game Engine)",
        tech: ["C", "OpenGL", "GLUT"],
        github: "",
        demo: "",
        slides: [
            {
                type: "image",
                subtitle: "Overview",
                description: "A Flappy Bird game developed without a game engine! Built entirely from scratch using C++ and OpenGL.",
                src: "/Flappybird.webp"
            },
            {
                type: "video",
                subtitle: "Core Gameplay Mechanics",
                description: "This project recreates the core mechanics of the original Flappy Bird. It includes infinite obstacle generation, precise collision detection, dynamic score tracking, and a gravity-based movement system that closely mirrors the feel of the classic game.",
                src: "/video/flappybird/overview.mp4"
            },
            {
                type: "video",
                subtitle: "Interactive Scenery & Rendering",
                description: "The game also supports dynamic scenery changes through mouse scrolling, allowing the background to shift while playing for a more immersive experience. Every element on screen is rendered using Linear Algebra calculations, transforming each pixel’s size, color, and position in real time.",
                src: "/video/flappybird/scene.mp4"
            }
        ]
    },
    {
        title: "Quiz Reviewer Aggregator for Canvas LMS",
        tech: ["JavaScript/TypeScript", "Canvas LMS API", "Google Sheets API"],
        github: "",
        demo: "",
        slides: [
            {
                type: "image",
                subtitle: "Overview",
                description: "A  web extension that automates quiz reviewer compilation from Canvas LMS.",
                src: "/FACompiler.png"
            },
            {
                type: "image",
                subtitle: "Purpose",
                description: "Developed in order to eliminate manual reviewer compilation by making use of various APIs to extract question and answers for FORMATIVE or UNGRADED tests.",
                src: "/FACompilerCanvas.png"
            },
            {
                type: "image",
                subtitle: "Users",
                description: "Was actively used by 7 concurrent users which helped them focus more on reviewing deeper concepts rather than memorizing key words. ",
                src: "/FACompilerSheets.png"
            }
        ]
    },
    {
        title: "Chess",
        tech: ["Java", "Java Swing", "MVC"],
        github: "",
        demo: "",
        slides: [
            {
                type: "image",
                subtitle: "Overview",
                description: "A standard Chess game built entirely with Java Swing. It features an interactive GUI that mimics a real chessboard and enforces all standard rules of play.",
                src: "/Chess.webp"
            },
            {
                type: "video",
                subtitle: "Game Mechanics",
                description: "A classic two-player chess game designed to run on a single desktop computer. The system enforces standard chess rules by restricting illegal moves and supports special mechanics such as castling and en passant.",
                src: "/video/chess/chess-overview.mp4"
            },
            {
                type: "video",
                subtitle: "Interface & Player Experience",
                description: "To simulate a real over-the-board experience, the board rotates after each player’s turn so both players can view the game from their perspective. The interface is built using Java Swing components, enabling real-time interaction and smooth visual updates.",
                src: "/video/chess/chess-2.mp4"
            }
        ]
    },
    {
        title: "POS (Front-end sitll in progress)",
        tech: [ "NestJS", "MongoDB", "ReactJS" ],
        github: "",
        demo: "",
        slides: [
            {
                type: "image",
                subtitle: "Overview",
                description: "A POS system that supports the management of: Users, Inventory, Restocking, and Selling. The API is already finished, however the front-end is sitll in progress. As of now, the whole system is being remade with the help of 3 other developers.",
                src: "/POS.avif"
            },
            {
                type: "video",
                subtitle: "User Management",
                description: "Supports multiple users with different roles. Also allows editing current user info.",
                src: "/POS-user.mp4"
            },
            {
                type: "video",
                subtitle: "Inventory Management",
                description: "Allows editing of current inventory details. Front-end does not yet support adding new items to the inventory.",
                src: "/POS-inventory.mp4"
            }
        ]
    },
    {
        title: "Enrollment System API (Still in progress)",
        tech: [ "NestJS", "MongoDB", "Docker" ],
        github: "",
        demo: "",
        slides: [
            {
                type: "image",
                subtitle: "Overview",
                description: "A school enrollment system API that includes the following modules: Authentication, Enrollment, Registration, and Management. Currently put on hold due to internship",
                src: "/enroll.png"
            }
        ]
    },
])

function nextProject() {
    current.value =
        (current.value + 1) %
        projects.value[props.projectId].slides.length
}

function prevProject() {
    current.value =
        (current.value - 1 +
            projects.value[props.projectId].slides.length) %
        projects.value[props.projectId].slides.length
}
</script>

<style scoped>
.projects-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* CONTAINER */

.overlay-container {
    position: relative;
    width: 900px;
    max-width: 90vw;
}

/* CLOSE */

.close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
}

/* CARD */

.project-card {
    border-radius: 16px;
    overflow: hidden;
    background: #1e1e1e;
    color: white;
}

/* MEDIA */

.media-container {
    height: 420px;
    width: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.media {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* TEXT */

.project-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
}

.slide-subtitle {
    font-size: 16px;
    font-weight: 600;
    color: #ff7a2f;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
}

.project-description {
    color: #bbb;
    margin-bottom: 20px;
}

/* TECH */

.tech-stack {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

/* BUTTONS */

.actions {
    display: flex;
    gap: 12px;
}

/* NAV */

.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    color: white;
}
</style>