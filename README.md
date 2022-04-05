# Blockchain application

This repository implements Blockchain platform using hyperledger fabric as part of course CSE-545 to store sensitive hospital records.

In order to make it work locally:

1) Make sure you have Docker installed and running.

2) You can install the fabric binaries and docker images from [here](https://hyperledger-fabric.readthedocs.io/en/latest/install.html)

3) Next task, would be to bring blockchain network using 
```
sh startFabric.sh
```

3) Install the required node modules using >npm install

4) Make sure you set following environment variable before enrolling the admin and registering the user:
```
USER_AFFILIATION
ENROLLMENT_ID
USER_ROLE
ENROLLMENT_SECRET
```

5) Subsequently, you need to enrollAdmin, registerUser and run the server boilerplate
```
node enrollAdmin.js
node registerUser.js
node server-boilerplate.js 
```


This should get up the server at http://localhost:8081

Implemented using Node 14.16.0