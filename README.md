# Transmute Tech Challange

## Running the app...

Well there's not much to run tbh. To run what there is to run you can run npm start in the client directory. In the server directory either compile and run the js or run server.ts with ta-node. Assumes you've got metamask and ipfs running on your machine.

## Reflection 

I probably started with too ambitious a goal to begin with, which was to demonstrate both VCs and DIDs, by looking at a real-world scenario. The idea was to look at the new appellations allowed by California law, by taking on, in turn, the roles of the state regulator, a cultivator in a particular appellation district, and the consumer. Respectively, each of these roles provides the opportunity to talk about the various stages of a Verifiable Credential's lifecycle: issuance, presentation and verification. I hoped to demonstrate DIDs by having the user spin up the identities for each of those roles. If I had it to do again, I would stick to just demoing the VCs perhaps using a singular identity on the client side

### My Approach

My principle design considerations were that I wanted to 1) use Transmute libraries, and 2) demonstrate DIDs, and VCs as described above. I thought it best to implement my solution with the did:elem method, in order to accomplish those goals. The idea was to have a 3 panel demo-space utilizing the material-did ui library on the front end.  Each space would represent one of the aforementioned roles: regulator, cultivator, or consumer. In the regulator space you'd be taken through the steps of creating a pair-wise DID for the particular relationship (in this case between the regulator and the cultivator) and then issuing a Verifiable Credential to the cultivator. In the cultivator panel you'd be taken through making a presentation of your Certificate of Appellation as issued by the regulator. (An even more ambitious undertaking would have been to show how  a presentation  could incorporate information from different sources. In our example the certificate of Appellation could encompass not only a valid license from the state but also county and municipal licenses as well as an independent certifier of the fact that the product was sun grown for instance, and it's certificate of analysis showing that it passed testing.) In the consumer panel you would simply be able to verify the presentation made to you by the cultivator.

So on the front end the plan was to use React, and material-did. On the backend I hoped to spin up a node express server written in typescript which would implement the Sidetree API. My "stretch" goal at the start of the project was to implement service workers on the client side to keep things moving considering there are obviously some pretty heavy tasks for a browser. In hindsight that would better have been looked at as shooting the moon.

### My development process.

(this is from memory without my laptop to reference so it may be a little out of order)

My first step was just to set up a repo. Then I decided to take some time and read over the DID and VC specs again. Then I took some time to visualize my plan, particularly the parts I was having trouble imagining fully. Then I got to work trying to get the front end ready to 'meet' the back end as it were. Imagining the steps it would take to get the user from point A to point B.

The first problem to tackle was how to generate the proper Sidetree request to create a new DID. In order to do that I needed some sort of key material so I decided to try to use the generate component from Material DID.  Turned out that didn't work the way I thought it did, so I switched up and just tried using imported keys from the metamask wallet. My thinking was that I could pass the key to the Operation component get a request that could be sent back to the server to anchor the creation payload. Turns out that was a misunderstanding on my part but with that it mind I turned my attention to standing up the backend.

Here as I mentioned, I was simply hoping to implement the API as spec'd.  So I went to the spec and set up and endpoint for each endpoint it suggested and tried to also match them with the functions from the Element did method implementation in the Sidetree library.  The controllers for those routes are incomplete.The Sidetree node should be live though and periodic reads and writes do seem to happen. 

As I turned to revisit the front end and begin making actual requests to the server, I realized my mistake regarding the function of the Operation component and also, recognized that I was getting short on time and that I needed to make some adjustments. I narrowed the scope a bit to just focus on VCs and tried to simply use the autogenerated element/metamask Id to signed a credential. Here I ran into the question of Secp256k1 signatures for VCs which I gather may be a field that's still in development...

So that's about where I think I ran out of time.
**
If I had it all to do again starting today here's the approach I'd take:**

1. Stick to a VC demo. Keep it simple
2. Use the universal wallet implementation from the start.
3. Work with one actor... Don't involve extra complexity unless it's truly needed. I could've met the specs with fewer moving parts and I should have tried to do just that. It's a demo after all.
4. Ask more questions about things that seem confusing or interesting earlier on. I think more than one time I was kinda clued in to the fact that something was a little funky and had I asked a question about it when I first had the inkling I might've saved some time.
**
If I had 1 more day to finish this project in a way that met spec I would:**

1. Swap wallets (metamask for universal).
2. Demonstrate issuing a VC
3. Demonstrate verifying a proof.
4. Polish the front end.
5. Get rid of sidtree server in favor of simple http server.
6. Publish it to a server so it could be accessed on the internet.