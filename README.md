
# TLS Crypto Hub

TLS Crypto Hub is a centralized directory for cryptocurrency resources, designed to allow users to discover, link, and organize external cryptocurrency-related content. The platform aims to simplify the vast landscape of crypto resources, providing a user-friendly interface for easy navigation.


## Table of Contents

1. [TLS Crypto Hub](#tls-crypto-hub) - Brief introduction and description of the project.
2. [Features](#features) - Highlighted features of the platform.
3. [Project Overview](#project-overview) - High-level overview of the project's structure and data organization.
4. [Future Enhancements](#future-enhancements) - Planned features and improvements for upcoming releases.
5. [Known Issues](#known-issues) - Current known bugs or issues in the platform.
6. [Technologies & Libraries](#technologies-&-libraries) - List of technologies, libraries, and tools used in the project.
7. [Setup & Installation](#setup-&-installation) - Step-by-step guide to set up and run the project locally.
8. [Contributing](#contributing) - Information for developers interested in contributing to the project.
9. [License](#license) - Licensing information for the project.


## Features

- **User-Friendly Interface**: Navigate through the platform to explore various cryptocurrency resources organized under categories and groups.
- **Link Aggregation**: Users can submit links to external resources, categorizing them under specific cryptocurrencies or broader topics.
- **Accessing Admin**: To access the admin side of the platform, navigate to `<domain>/login`. There is no visible login button on the main interface to keep the admin side discreet. This is intentional, as the admin is designed only for those who wish to participate and contribute to this project. 
- **Manage Content**: Once logged in as an admin or content manager, you can add, edit, or delete categories, groups, and resources as needed.


## Project Overview

TLS Crypto Hub is structured around a hierarchical organization of cryptocurrency resources, following the breadcrumb trail of `Category > Group > Coin/Token > Resources`. Here's a breakdown of this structure:

### 1. Category

- **Description**: Categories are the highest level of organization and represent broad classifications of cryptocurrencies or related topics. Examples include "Coins", "NFTs", and "Tokens".
- **Implementation**: Categories are defined in the `models` directory, specifically in the `category.js` model. They are managed through the corresponding controller in the `controllers` directory.

### 2. Group

- **Description**: Groups are subdivisions within a category, providing a more granular classification based on the group's general purpose or use case. For instance, under the "Coins" category, you might have groups like "Privacy Coins", "Memes", "Metaverse", etc.
- **Implementation**: Groups are associated with a specific category and are defined in the `models` directory, in the `group.js` model. They are managed through the corresponding controller.

### 3. Coin/Token

- **Description**: Coins or tokens are individual cryptocurrency entities. Each coin/token belongs to a specific group. Examples include "Bitcoin", "Ethereum", "Dogecoin", etc.
- **Implementation**: Coins are associated with a specific group and are defined in the `models` directory, in the `coin.js` model. They are managed through the corresponding controller.

### 4. Resources

- **Description**: Resources are external links or references associated with a specific coin/token. These can be links to official websites, whitepapers, community forums, or any other relevant external content.
- **Implementation**: Resources are associated with a specific coin/token and are defined in the `models` directory, in the `resource.js` model. They are managed through the corresponding controller.


## Future Enhancements

- **Rate & Review**: A feature to allow users to rate and review linked resources, fostering a community-driven approach to content discovery, is planned for future releases.


## Known Issues

1. **URL Encoding**: Some forms include inputs that are incorporated into the URL of sub-pages. Adding special characters like "?" in these fields can disrupt the site's route structure. It's recommended to avoid using special characters in these fields until a fix is implemented.
2. **Group Deletion**: Deleting a Group doesn't remove the associated coins from the database. While these coins won't be visible to site visitors, they remain in the backend. It's advisable to delete all coins within a group before deleting the group itself. A future update will address this, allowing for automatic deletion of coins when a group is removed.


## Technologies & Libraries

- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS
- **Authentication**: bcryptjs for password hashing
- **Session Management**: express-session with connect-mongodb-session
- **Environment Variables**: dotenv
- **Email Service**: node-mailjet
- **Development Tool**: nodemon for hot-reloading during development


## Setup & Installation

1. Clone the repository:
   ```
   git clone https://github.com/wteo/tls_crypto.git
   ```

2. Navigate to the project directory:
   ```
   cd tls_crypto
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm run start:dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port you've configured).


## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please fork the repository and submit a pull request.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.