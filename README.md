# Gwoup App

The application based on React.js / Amplify / GraphQL. 

## Setup env.

- setup node version (check .nvmrc)
- setup dependencies (```npm install```)
- setup amplify (```amplify init```)
- build current resources (```amplify push```)

## Amplify useful functionality

1. Verify GraphQL schema on compatibility
 
```amplify api gql-compile```

2. Delete AWS env for the project
 
```amplify delete```

3. Run resource management console (for example GraphQL console)

```amplify console```