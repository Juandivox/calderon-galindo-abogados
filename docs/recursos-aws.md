# Recursos AWS — Dominios (ver plan [00](00-configuracion-dominios-aws-amplify.md))

- **Cuenta AWS:** 072471709377 (perfil CLI `prodmiraylabs`)
- **AMPLIFY_APP_ID:** d22jyci90y1h79
- **AMPLIFY_REGION:** us-east-1
- **BRANCH:** main (PRODUCTION)

## Route 53

### Zona canónico — calderongalindoabogados.com
- **ZONE_ID:** `Z088962720B0PZ91E3E9V`
- **Nameservers (poner en Hostinger):**
  - `ns-1258.awsdns-29.org`
  - `ns-830.awsdns-39.net`
  - `ns-388.awsdns-48.com`
  - `ns-1923.awsdns-48.co.uk`

### Zona redirect — abogadodegenerado.com
- **ZONE_ID:** `Z08024143B5TFZJC5KMEP`
- **Nameservers (poner en Hostinger):**
  - `ns-1551.awsdns-01.co.uk`
  - `ns-121.awsdns-15.com`
  - `ns-1492.awsdns-58.org`
  - `ns-1001.awsdns-61.net`

## Amplify
- Domain association: calderongalindoabogados.com (@ + www) -> rama main — **AVAILABLE** ✅
- App default domain: d22jyci90y1h79.amplifyapp.com
- SSL: certificado gestionado por Amplify (validación DNS automática en Route 53)
- CloudFront de Amplify (alias del ápice/www): d2d5cy78try86k.cloudfront.net

## Redirección abogadodegenerado.com
- **ACM (us-east-1):** `arn:aws:acm:us-east-1:072471709377:certificate/594893ec-fe16-4e57-a08d-73396aad2385` — ISSUED ✅
- **Bucket S3:** `abogadodegenerado-redirect` (RedirectAllRequestsTo calderongalindoabogados.com, https)
- **CloudFront:** ID `E5DL4I6761AGV`, dominio `dnf7h5owr3rjt.cloudfront.net` — Deployed ✅
- **Destino 301:** https://calderongalindoabogados.com (conserva la ruta)

## Estado / Notas
- Zonas Route 53 creadas: 2026-06-18.
- DNS previo (Hostinger): ambos dominios aparcados en `dns-parking.com`, IP `2.57.91.91`, **sin MX ni TXT reales**.
- Nameservers de reversión (Hostinger originales): `*.dns-parking.com` (parking por defecto de Hostinger).
- Nameservers cambiados en Hostinger el: **2026-06-18** ✅
- **Verificación E2E (2026-06-18):** canónico `@`/`www` = 200 OK; `abogadodegenerado.com` `@`/`www` (http y https) = 301 → canónico, conservando ruta. **Operativo.** ✅
