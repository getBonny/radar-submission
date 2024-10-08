# Bonny Architecture - Streamlining Web2 Data into the Open Web

#### Bonny tries to make consumer data more accessible to everyone by leveraging the power of decentralization and Web3.
To achieve this the system has multiple components that interact with each other, namely: 

Producer ([Bonny App](https://github.com/getBonny/radar-submission/tree/main/bonny-beta) User that uploads data)

Developer (Every entity that wants to work with the aggregated data)

Data Layer ([Ceramic](https://ceramic.network/) / IPFS)

Access-Rights Layer ([Lit Protocol](https://www.litprotocol.com/))

Application Layer (Solana)

Bonny Backend

A overview of the architecture:
![Architecture Diagram](https://github.com/getBonny/radar-submission/blob/main/Architecture.png)



## Producer

A Producer is a user of the Bonny App who is generating data by uploading their consumer data like receipts. He has an unique identifier inside the system a so called DID (decentralized identifier) by either bringing it’s own wallet or using the wallet-as-a-service feature inside the Bonny App. Every piece of consumer data he uploads is first getting encrypted through the Lit Protocol and then stored onto a decentralized storage like Ceramic in his own data stream. Before he uploads the data he can decide by himself on who can access his data by setting his own rules.

## Developer
A Developer is an entity that wants to work with the consumer data for either data analysis or AI training purposes to offer services to third parties. He can openly stream all the encrypted data from the Data Layer and save it locally. Now to get access to the encrypted data he needs to interact with the Bonny Protocol on Solana to buy the access rights inside the native ecosystem token. Then he can request the decryption keys at the Lit Protocol by proving his access rights he bought on Solana  and start to consume the data. For this rather complex flow of buying and accessing the data Bonny will provide some sort of SDK to simplify the usage.

## Data Layer
The Data Layer describes where and how all the user data and aggregated anonymized data is stored. The current status is to use the https://ceramic.network which is built on top of IPFS to generate data streams around DIDs which can be streamed by consumers (Other hot options are also https://streamr.network or https://cere.network).
The Data Layer handles all the storing and association of the user data in a decentralized context. This can either be done through defining GraphQL Models with Ceramic or using their other solution useorbis.com which has a more relational database approach.
It is important to mention here that only encrypted data is uploaded here which can only be decrypted by the decryption keys that are stored in the Lit Protocol.
To access the network we have to set up our own Node so we can access the ceramic network and streamline data into it.

## Access-Rights Layer

The Access-Rights Layer describes how decryption keys of the user data is handled in a decentralized context. Lit Protocol built a network around decentralized Key Management with user-defined access-rights based on [Threshold Cryptography](https://en.wikipedia.org/wiki/Threshold_cryptosystem).
When the User wants to upload some piece of data he first lets it encrypt through the Lit Protocol thus generating the corresponding decryption key which is shared inside the network. Now when a Data Consumer wants to access some piece of data he first streams the data from the Data Layer and then requests the decryption of the data through Lit. The protocol will check if the authenticated user has the corresponding access rights and decrypts the ciphertext into the original data.
All the defined access-rights are Conditions that are dependent on state on the Application Layer (Solana). You can bind access-rights of specific data to Solana state for example the ownership of an specific NFT or some state inside a PDA. So ultimately all the access-rights are directly bonded to Tokens or state on Solana thus tokenizing the produced consumer data.


## Application Layer

The Application Layer defines all the business logic inside the decentralized system and is home to the native $Bonny SPL-Token. Through the programming of Solana Programs we can develop some sort of Data Marketplace which allows buying the access to the data with $Bonny.
This will all be handled by the Bonny Protocol which defines the scope of how the access-rights can be bought directly on Solana.
A Data Consumer would connect to the Solana Blockchain and interact with the Solana Program to buy for example an Soulbound Access NFT whose ownership he can prove to the Lit Protocol to get access to the decryption keys.
Current Lit Examples that are working with Solana can be found here.

## Bonny Backend

The Bonny Backend acts as a support role for the Bonny App to help streamline the data into the decentralized storage. Even though most of the data handling will be happening in the Bonny Client, the backend will enrich the client with Web2 user profiles and gamification elements.
For now on we will use a custom MMLLM to parse the receipt images via OCR to to get structured data out of the images. Later on we can extend the data streams to also scrape online data from users that can be streamlined onto the Data Layer.



