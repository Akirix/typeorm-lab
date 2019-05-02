# Some Typeorm Tests

## Configuration

Add this to the `config` dir like so:

`config/config.yml`  

```yaml
type: postgres
logging: true
sync: true
dropSchema: true
host: example.com
port: 5432
name: typeorm
schema: public
username: postgres
password: postgres
```

## Different Modes to Run

### Simple Test

A simple one to many. 

```
npm run start:simple
```

### Inherited Details

A test where the details each have an inherited class and a specific attribute on the contact. 

```
npm run start:inheritedDetails
```

### Inherited Details

A test where each contact is a specific type extended from the abstract contact. 

```
npm run start:inheritedContact
```