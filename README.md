## Learning object repository

**Install**
```bash
npm install
```

Create local .env file with the correct configuration. These are the keys that are used right now:

- NODE_ENV = development
- HTTP_PORT = 8085
- HTTPS_PORT = 44300
- KEY_FILE = "./certs/key.pem"
- CERT_FILE = "./certs/cert.pem"
- CA_FILE = ""
- LEARNING_OBJECT_STORAGE_LOCATION = "storage"
- DATABASE_URL=mongodb://localhost:27017/learing_object_test_database
- ERASE_DATABASE_ON_SYNC=true

**Test**
```bash
npm run test
```

**Run**
```bash
npm run start
```