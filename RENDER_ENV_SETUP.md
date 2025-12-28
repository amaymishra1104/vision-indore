# Render Environment Variables Setup

## ⚠️ CRITICAL: Your backend is running but Firebase is NOT connected!

You MUST add these environment variables to Render NOW for the app to work.

## 🚀 Go here to add environment variables:

**Direct Link:** https://dashboard.render.com → Click "vision-indore" service → "Environment" tab (left sidebar)

Add ALL 5 variables below:

### 1. FIREBASE_PROJECT_ID
```
vision-indore
```

### 2. FIREBASE_CLIENT_EMAIL
```
firebase-adminsdk-fbsvc@vision-indore.iam.gserviceaccount.com
```

### 3. FIREBASE_PRIVATE_KEY
**Important:** Copy the entire private key INCLUDING the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.

```
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZM0Ywdar7wqAa
1ZCkkeiRtNFeWDINPp0dIySq9uK29cl+5kbCKnpAPT4lASNWPBCDlbs357moqSAF
UaMfCdk1zd8ETpUUVx3w9L8SgmNYxlCNeiY/cVb6eSA/+vaK1Ei5X0l5lKxjmhq0
WIp8K7W/zSs6zWhPRhoorILykLEX6Wa2QEx8nRQRzQ53kekm69Bz18UafNelEAJm
UQFcQG1V30FGpf/ST/0bQGHkSlQT3Qmn+uaswlDGMOp6HkJf1xJblePsnIh9LcaW
kUxUPB/HdzFfd/Bgwc2mSaNWgx0GgJBBYCm2GOZKJPeGl+z/o2QZaIZBdW7TMy/D
EqwC7ib3AgMBAAECggEAXWPJkz6U9Ula9A7N8aT3Hedkeq9rXfyFK6kXtBcRpl+K
cvDqjcQb6pEqrliN7B9JbnqsFD6jupx1szPF8quWZKcPdFehjCxlKFzj5z5/HwWu
TxataWv/XRVFw5zR8yGR33rUKd2+PdleEBtd+EQHEuBR7Sey6RsYVlLOvyNtsfyT
VUz+csoEN1JBst6+mxV0oSrENHfg244g4aaBKkFjqmkcYDwIirUAsdL75aUxLmB5
UUOwDlRyWCYV4dR80i7Uf0faZOmcBoixdQ+nnLPQvrMh0C4+MNLuJdvBX9qSHd/t
iYp/Yt2bp7MeTG6VG9HMn85WJOrNsGyYemgta1zYAQKBgQD6NX9JwMUulF3j8bZS
uBrE5drnaUX/w6U1xuRNbmI/CuYvTGneLGyePzdfszMie0OlRvLEFaG1ZdjRs8FP
0uiS81/L5inIGFcjcTH2iUJEO5hFwyk3aP6tDsLlOh6JhVtKqg5Lhgxst4fOdD3Q
hg6y29qKCfesbe2pzmIGOtlsAQKBgQDeOjLWDomx0l9lDhIn08ZyIA7upsHDx/Pi
eUGGShdvD2D5i51pzTq54/y/I+9eHYyKODIV8bUHJxsqNZWtDhDb9jitR/oK6kA/
eFMS2lya50rC2CYATQfmO7LBml88DzaFJNnsF9sjypr/ju7CtF6IsIguNT9uqLuJ
EmZ/yw7y9wKBgD5EzhbWyLvc5Ljz0MIpW1AhPCdXRbpvQFBv3SWAESdLWRnwVHCc
cbO4W9mPSWyNbLpXO9ec4o+4dwtJRxTMkmDv/KlL8J4BoL4LT7nhUwKUKkNCXKGT
mb4L7GkL28mxzJR6WfBlvfXYfw3cU/3vPv04Rd0QufjJqtoVqMOQJcgBAoGAc8SD
ySmHp+A9G+rpoF/dqIR04vRySqi2r4uVi/y7Gns7fKSz23MznbVcbMKupyvjk/nU
dcQWF2TS7Pk/QQjr1Xr+aZ7ubpM75xSqyk6BIZ1OQBTULyHx9ImzBNKDvEj8kP3y
nOCMo6efeXSfg0TtXm4Ac3n/0okKMU0pondJEV8CgYAalk1rsocq6xRIVkefwX8k
UCWIbr8teHKdRuz7VuYVJ2GxTI7lrvWwcVf/T38aRDTBQK6VOaMArpT10dqw08U3
fP9Zfog/L2KifUi3xPERsfnlrEIvw6QT5yw6nRRsvsZpgoZJFzAmeweJyNzYrHZn
6j+wskFN0500uxyqDHIdUQ==
-----END PRIVATE KEY-----
```

### 4. GEMINI_API_KEY
```
AIzaSyDDyglTHQxZKQJKjV0Q8t09tpnWHCWcMjA
```

### 5. PORT
```
5000
```

---

## ✅ After adding these variables:

1. Render will automatically redeploy your backend
2. Wait 2-3 minutes for deployment to complete
3. Check logs at: https://dashboard.render.com/web/your-service-id/logs
4. Test backend: https://vision-indore.onrender.com/api/health

---

## 📱 Next: Update Netlify

After Render redeploys successfully, update Netlify environment variable:

Go to: https://app.netlify.com/sites/visionindore/settings/deploys#environment

Add/Update:
- **REACT_APP_API_URL** = `https://vision-indore.onrender.com`

Then trigger a new deploy at: https://app.netlify.com/sites/visionindore/deploys
