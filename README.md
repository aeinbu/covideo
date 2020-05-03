# CoVideo

Socializing in an isolated world...

## Set up nginx
- On `my-hostname.local`, go to `/etc/nginx/sites-enabled/my-hostname.local.conf`
- In server section, add sub-section for 
```
    location ~ ^/covideo/(.*)$ {
        proxy_pass http://localhost:3000;
    }
```

## Open on client
- Set ip-address of `my-hostname.local` in `/etc/hosts file`
- Start dev-server on `my-hostname.local` with `npm start`
- Navigate to `https://arjan-imac.local/covideo/index.html`
