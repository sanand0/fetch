# Fetch - An API Proxy

Fetch is a CloudFlare worker at <https://fetch.sanand.workers.dev/> that proxies these APIs

- [Singapore Land Transport Authority Dynamic Datasets](https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html)
  - Example: <https://fetch.sanand.workers.dev/lta/BicycleParkingv2?Lat=1.3&Long=103.8>

## Setup

```shell
# From https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html
wrangler secret put LTA_API_KEY

# Deploy
npm test
wrangler deploy
```
