# 3on3 Social
3on3 Social is an social media app for people who desire to be 3/3 in life.(Intelligence, Strength and Social Skills)

## Tech Used
- Application: React
- State Management: Redux Toolkit
- Routing: React Router v6
- Firebase: Authentication, Database, and Storage
- CSS: Tailwind
- Testing: `Yet To Be Done`

## Packages Used
- react-toastify: to show toast text for actions completion
- emoji-picker-react: to pick emojis for post

## Features
- Authentication
  - Sign-up
  - Login
  - Logout
- Create a Post
  - Upload Images
  - Emoji
  - Like
  - Comment & Replies
- Edit & Delete Post
- Explore Feed
  - Sort by Trending, Hot, Newest and Oldest
- User Profile
  - Add Profile Picture
  - Bio
  - Portfolio URL
- Follow/Unfollow
- User Feed
- Bookmark Post
- Responsive

## Video Preview

## Get App From Here
[3on3 Social](https://3on3social.netlify.app/)

## How to run app locally
- Clone the repository
  - On Terminal change directory to `3on3 Social` directory.
  - Add .env file to the root directory
  - Place all your app related keys from the created firebase project and place it in the .env as below
  ```
   REACT_APP_API_KEY=<your key>
   REACT_APP_AUTH_DOMAIN=<your domain>
   REACT_APP_PROJECT_ID=<your project id>
   REACT_APP_STORAGE_BUCKET=<your storage bucket>
   REACT_APP_MESSAGING_SENDER_ID=<your sender id>
   REACT_APP_APP_ID= <your app id>
  ```
  - Type npm start and hit enter.
  - Project is running locally.

## Contribution
- For folder naming convention follow camelCase naming
  convention.
- For components and pages follow PascalCase naming
  convention for files.
- For javascript code follow camelCase naming convention.
- For components and pages create file with jsx extension type, and
  if code repeats more than twice break code into hooks for modularity.
- For rest, except css use camelCase convention.
