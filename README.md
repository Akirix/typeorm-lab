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

**Passes**

A simple one to many. 

```
npm run start:simple
```

### Inherited Details  

**Passes**

A test where the details each have an inherited class and a specific attribute on the contact. 

```
npm run start:inheritedDetails
```

### Inherited Contact - Simple  

**Fails**

A test where each contact is a specific type extended from the abstract contact. This 
test will definitely fail because the contact detail can't reverse the relationship 
without the inherited type of Company or Person. 

```
npm run start:inheritedContact
```

### Inherited Contact2 - Abstract  

**Fails**

A test where each contact is a specific type extended from the abstract contact. This 
test will definitely fail because the contact detail still can't reverse the relationship 
without the inherited type of Company or Person. The difference between this one and 
the first is the Contacts details are abstract and the Company and Person each must 
implement the attribute for the relationship. 

```
npm run start:inheritedContact2
```

### Inherited Contact3 - Person Only  

**Fails**

This is almost the same as the first `Inherited Contact` but the details only references the 
Person type so the details knows what type to relate to. 

```
npm run start:inheritedContact3
```

### Inherited Contact4 - Abstract Contact and Person Only  

**Passes**  

This is almost the same as `Inherited Contact2` except the ContactDetail only two way 
references the Person. 

```
npm run start:inheritedContact4
```

### Inherited Contact5 - Abstract Contact with dynamic ContactDetails Contact type 

**Fails**  

This extends upon `Inherited Contact4` except in the ContactDetail, the type of Contact 
is dynamic to choose between Person or Company. This unfortunately fails because 
there is still no way to get the extended type, i.e. Person or Company. At least this 
test confirms the Contact needs the details to be abstract. This test will save the 
company because `type` is undefined and therfore always returns `Company`. 

```
npm run start:inheritedContact5
```