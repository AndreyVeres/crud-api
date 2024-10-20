# Installation

use NodeJS version 22.x.x or later and install dependencies

```
npm install
```

## Local start

```
npm run start:dev
```

Server should be started on http://localhost:3000

### For start in cluster mode

```
npm run start:multi
```

Load balancer will be launched on http://localhost:4000 and will proxy requests to Clusters<br>
Clusters will be launched on ports starting from 4001 by the number of CPUs

## Build

#### Build for PRODUCTION

```
npm run start:prod
```

After build server should be started on http://localhost:3000
