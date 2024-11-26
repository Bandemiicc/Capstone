# Playlist App

## Overview

This is a full-stack **playlist manager** where users can create, manage, and share playlists with their favorite songs. The app combines the power of the **MERN** stack (MongoDB, Express, React, Node.js) with **Tailwind CSS** for styling and **Shadcn** for UI components. While it currently supports basic playlist management features, I originally envisioned it as a **Spotify clone** with some cool added features. To check out the backend repo, visit: "https://github.com/Bandemiicc/Capstone-Server".

---

## Technologies Used

- **MERN Stack**: This app is built using the classic **MERN** stack. MongoDB is used for storing songs and playlists, Express and Node.js are used for the backend API, and React powers the frontend. It's a solid stack that I’m getting pretty comfortable with, and I’m excited to keep building with it.
  
- **Tailwind CSS**: For styling, I used **Tailwind CSS**. I love how it speeds up the design process and gives me flexibility to style the app quickly with utility classes. It's been awesome for making the app responsive and good-looking without too much effort.
  
- **Shadcn**: For UI components, I used **Shadcn**. It’s been a game-changer for creating clean and modern UI elements like buttons, modals, and inputs, and it integrates well with React.

---

## The Vision

Originally, I wanted to create a **Spotify clone** where users could:

- **Search for songs, albums, and artists**: Imagine having a huge music library at your fingertips, and you could save your favorite songs and albums to your own personal playlist.
  
- **Play songs directly from the app**: Users could play songs and enjoy them without leaving the platform. I was planning to use the **Spotify API** to make this possible, pulling song metadata and streaming content directly from there.

- **AI-Powered Playlist Suggestions with ChatGPT**: One of the features that sets this app apart is the integration of **OpenAI's ChatGPT**. Users could enter a prompt or mood (like "chill vibes" or "party music"), and ChatGPT would suggest playlists based on that. I wanted to train the model to focus solely on music-related queries, so it could provide users with the perfect playlist for their vibe.

- **Lyrics Integration with ChatGPT**: Another feature I thought would be awesome is displaying **lyrics** when a song is played. Then, users could copy the lyrics and ask ChatGPT to interpret the meaning behind the song—kind of like what **Rap Genius** does. It would be a cool way to dive deeper into music and connect with the meaning of the lyrics.

---

## Future Features & Improvements

There’s so much more I want to do with this app, and I’m excited about the possibilities. Here are a few things I’m hoping to implement in the future:

- **Spotify API Integration**: The biggest future feature would be **Spotify API integration**, where users can search for songs, albums, and artists directly from Spotify’s database and add them to their playlists. I also want to implement song streaming from Spotify directly within the app, so you can listen to your playlists without leaving the platform.

- **ChatGPT-Driven Playlist Creation**: I want to refine the **ChatGPT** feature to make it even more personalized. Users could enter specific moods, activities, or even certain genres, and the model would generate a custom playlist for them based on that input. It would be cool to offer suggestions based on a user’s music taste and current mood.

- **Song Lyrics and Interpretation**: Adding **lyrics** to the player is something I’m really excited about. Once the lyrics are shown, users could interact with them, copy them, and even ask ChatGPT to explain or interpret them in more depth, giving them insights into the song’s meaning.

- **User Accounts and Playlists**: I want to add **user authentication** so that people can create an account and save their playlists to their personal profiles. It would be great to allow users to share playlists with others as well, adding a social aspect to the app.

- **Song Search and Filters**: I also want to implement better **search functionality**—being able to filter and sort songs based on artist, album, genre, and even mood would make it a lot easier for users to find what they’re looking for.

- **Mobile-First Design**: Right now, the app works well on desktop, but I want to optimize it for mobile, so it’s more responsive and provides a smooth experience on all devices.

---

## Installation

To run this app locally, follow these steps:

1. Clone this repo:
    ```bash
    git clone <repo-url>
    ```

2. Install dependencies for both the frontend and backend:

    - Frontend:
    ```bash
    cd frontend
    npm install
    ```

    - Backend:
    ```bash
    cd backend
    npm install
    ```

3. Start the development servers:

    - Frontend:
    ```bash
    npm run dev
    ```

    - Backend:
    ```bash
    npm start
    ```

---

## Conclusion

This app is a work in progress, and I’m excited to see where it goes! Right now, it’s a solid playlist manager, but there’s so much potential to make it a full-featured music app with integration to Spotify, AI-powered playlist creation, lyrics, and much more. If you want to try it out, feel free to clone it and contribute—there’s a lot of room to grow!

Let me know if you have any ideas or suggestions for future features!
