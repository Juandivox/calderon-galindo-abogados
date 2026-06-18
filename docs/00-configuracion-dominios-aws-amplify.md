# 00 · Configuración de Dominios en AWS (Route 53 + Amplify) — Plan de Implementación

> **Para ejecutores (humano o agente):** este plan se ejecuta tarea por tarea. Los pasos usan casillas (`- [ ]`) para seguimiento. Cada paso trae el comando exacto y la salida esperada. No avances al siguiente paso hasta confirmar la salida esperada del anterior.

**Objetivo:** Poner operativos los dominios `calderongalindoabogados.com` (canónico, sirve la web) y `abogadodegenerado.com` (redirige 301 al canónico) sobre la app de AWS Amplify `calderon-galindo-abogados` (App ID `d22jyci90y1h79`), gestionando el DNS desde **Amazon Route 53** y delegando los nameservers desde **Hostinger**.

**Arquitectura:**
- Dos **zonas alojadas públicas** en Route 53, una por dominio. Los nameservers de cada zona se configuran en Hostinger (delegación de DNS a AWS).
- `calderongalindoabogados.com`: se asocia como **dominio personalizado en Amplify** (ápice `@` + `www`), apuntando a la rama `main`. Amplify emite el certificado SSL gestionado y crea automáticamente los registros DNS de validación y de tráfico en la zona de Route 53 (misma cuenta).
- `abogadodegenerado.com`: patrón estándar de **redirección 301 con HTTPS** = bucket S3 (redirect-all) + distribución CloudFront + certificado ACM en `us-east-1` + alias en Route 53. Redirige ápice y `www` a `https://calderongalindoabogados.com`.

**Stack/Servicios:** AWS Route 53, AWS Amplify Hosting, AWS Certificate Manager (ACM), Amazon S3 (website redirect), Amazon CloudFront, AWS CLI v2, panel DNS de Hostinger.

**Convención de seguimiento del DNS:** la propagación de nameservers en Hostinger puede tardar de minutos a 48 h. El plan separa "crear recursos" (inmediato) de "verificar propagación" (con espera).

---

## Mapa de archivos / recursos

Este plan no modifica código de la app. Crea **recursos en AWS** y **documentación**. Recursos que se crearán:

| Recurso | Servicio | Propósito |
|---|---|---|
| Zona alojada `calderongalindoabogados.com` | Route 53 | DNS del dominio canónico |
| Zona alojada `abogadodegenerado.com` | Route 53 | DNS del dominio de redirección |
| Asociación de dominio `calderongalindoabogados.com` | Amplify (`d22jyci90y1h79`) | Servir la web en `@` y `www` con SSL |
| Bucket `abogadodegenerado-redirect` | S3 | Redirección 301 al canónico |
| Certificado ACM (`us-east-1`) para `abogadodegenerado.com` + `www` | ACM | HTTPS de la redirección |
| Distribución CloudFront | CloudFront | HTTPS + alias del dominio de redirección |
| Registros alias `@`/`www` de `abogadodegenerado.com` | Route 53 | Apuntar a CloudFront |

Archivos de documentación:
- Crear: `docs/00-configuracion-dominios-aws-amplify.md` (este archivo).
- Crear al final: `docs/recursos-aws.md` (registro de IDs reales generados durante la ejecución).

> **Variables a fijar antes de empezar** (rellénalas en `docs/recursos-aws.md` conforme las obtengas):
> - `AMPLIFY_APP_ID=d22jyci90y1h79`
> - `AMPLIFY_REGION=` (se descubre en Tarea 1)
> - `BRANCH=main` (verificar en Tarea 1)
> - `ZONE_ID_CANONICO=` (Tarea 3)
> - `ZONE_ID_REDIRECT=` (Tarea 3)
> - `ACM_ARN_REDIRECT=` (Tarea 6)
> - `CF_DOMAIN=` (Tarea 7, p. ej. `dxxxx.cloudfront.net`)

---

## Tarea 1: Configurar credenciales AWS y descubrir región/rama de Amplify

**Objetivo:** dejar el CLI autenticado y confirmar en qué región vive la app Amplify (los comandos de Amplify deben usar esa región).

- [ ] **Paso 1: Configurar credenciales**

Ejecuta y rellena con las claves de un usuario/rol IAM con permisos sobre Route53, Amplify, ACM, S3 y CloudFront:

```bash
aws configure
```

- [ ] **Paso 2: Verificar identidad**

Ejecuta:

```bash
aws sts get-caller-identity
```

Esperado: JSON con `Account`, `UserId`, `Arn` (sin error "Unable to locate credentials").

- [ ] **Paso 3: Localizar la región de la app Amplify**

Amplify es regional; hay que encontrar dónde está `d22jyci90y1h79`. Recórrelo por regiones comunes:

```bash
for r in us-east-1 us-east-2 us-west-2 eu-west-1 eu-west-3 eu-central-1; do
  echo "== $r =="
  aws amplify get-app --app-id d22jyci90y1h79 --region "$r" \
    --query 'app.{name:name,region:"'"$r"'",branch:defaultDomain}' --output text 2>/dev/null
done
```

Esperado: una de las regiones devuelve el nombre `calderon-galindo-abogados`. Anota esa región como `AMPLIFY_REGION`.

- [ ] **Paso 4: Confirmar el nombre de la rama de producción**

Ejecuta (sustituye `<AMPLIFY_REGION>`):

```bash
aws amplify list-branches --app-id d22jyci90y1h79 --region <AMPLIFY_REGION> \
  --query 'branches[].branchName' --output text
```

Esperado: aparece `main` (u otra rama de producción). Anótala como `BRANCH`. Si no es `main`, usa ese valor en todas las tareas siguientes.

- [ ] **Paso 5: Crear el archivo de registro de recursos**

Crea `docs/recursos-aws.md` y anota `AMPLIFY_REGION` y `BRANCH`. (Se irá completando en las siguientes tareas.)

---

## Tarea 2: Inspeccionar la zona DNS actual en Hostinger (red de seguridad)

**Objetivo:** confirmar que no hay registros que perdamos al delegar a Route 53. Decidiste que **no hay correo/MX**, pero verificamos por si hubiera verificaciones de terceros (Google Search Console, etc.).

- [ ] **Paso 1: Volcar los registros públicos actuales de ambos dominios**

```bash
for d in calderongalindoabogados.com abogadodegenerado.com; do
  echo "===== $d ====="
  echo "-- NS --";  nslookup -type=ns  "$d"
  echo "-- A  --";  nslookup -type=a   "$d"
  echo "-- MX --";  nslookup -type=mx  "$d"
  echo "-- TXT --"; nslookup -type=txt "$d"
done
```

Esperado: registros NS de Hostinger. **Si aparece algún MX o TXT importante** (SPF, verificación de dominio), anótalo en `docs/recursos-aws.md` para recrearlo en Route 53 más adelante. Si solo hay NS de Hostinger y registros básicos, seguimos sin riesgo.

- [ ] **Paso 2: Acceder al panel de Hostinger**

Entra en hPanel → **Dominios** → selecciona cada dominio → **DNS / Nameservers**. Localiza la sección **Nameservers** (no la "DNS Zone"). Déjala abierta; la usaremos en la Tarea 4.

---

## Tarea 3: Crear las zonas alojadas en Route 53

**Objetivo:** crear una zona pública por dominio y obtener sus nameservers.

- [ ] **Paso 1: Crear la zona del dominio canónico**

```bash
aws route53 create-hosted-zone \
  --name calderongalindoabogados.com \
  --caller-reference "cga-canonico-$(date +%s)" \
  --hosted-zone-config Comment="Dominio canonico - sirve la web (Amplify d22jyci90y1h79)"
```

Esperado: JSON con `HostedZone.Id` (formato `/hostedzone/Z...`). Anota la parte `Z...` como `ZONE_ID_CANONICO`. En `DelegationSet.NameServers` vienen 4 nameservers (`ns-xxxx.awsdns-xx.org`, etc.).

- [ ] **Paso 2: Crear la zona del dominio de redirección**

```bash
aws route53 create-hosted-zone \
  --name abogadodegenerado.com \
  --caller-reference "cga-redirect-$(date +%s)" \
  --hosted-zone-config Comment="Dominio de redireccion 301 -> calderongalindoabogados.com"
```

Esperado: JSON con `HostedZone.Id`. Anótalo como `ZONE_ID_REDIRECT` y guarda sus 4 nameservers.

- [ ] **Paso 3: Listar nameservers de cada zona (para Hostinger)**

```bash
for z in <ZONE_ID_CANONICO> <ZONE_ID_REDIRECT>; do
  echo "== zona $z =="
  aws route53 get-hosted-zone --id "$z" --query 'DelegationSet.NameServers' --output text
done
```

Esperado: 4 nameservers por zona. Cópialos a `docs/recursos-aws.md`.

---

## Tarea 4: Delegar los nameservers en Hostinger

**Objetivo:** que Hostinger delegue el DNS de cada dominio a los nameservers de Route 53. **Este es el paso que activa AWS como autoridad DNS.**

- [ ] **Paso 1: Cambiar nameservers del dominio canónico**

En hPanel → Dominios → `calderongalindoabogados.com` → **Nameservers** → elige "**Usar nameservers personalizados / Change nameservers**" e introduce los **4 nameservers de `ZONE_ID_CANONICO`** (uno por campo, sin punto final). Guarda.

- [ ] **Paso 2: Cambiar nameservers del dominio de redirección**

Repite con `abogadodegenerado.com` usando los **4 nameservers de `ZONE_ID_REDIRECT`**. Guarda.

- [ ] **Paso 3: Verificar la delegación (puede tardar; reintenta)**

```bash
for d in calderongalindoabogados.com abogadodegenerado.com; do
  echo "== $d =="; nslookup -type=ns "$d" 8.8.8.8
done
```

Esperado (tras propagar): los NS devueltos terminan en `awsdns`. Si aún muestran Hostinger, espera y reintenta (propagación de minutos a 48 h; normalmente < 1 h). **No continúes con las Tareas 5–8 hasta que al menos el dominio implicado resuelva a `awsdns`** — la validación de certificados depende de ello.

---

## Tarea 5: Asociar el dominio canónico en Amplify

**Objetivo:** servir la web en `calderongalindoabogados.com` y `www.calderongalindoabogados.com` con SSL gestionado. Como la zona está en Route 53 en la misma cuenta, Amplify crea solo los registros de validación y de tráfico.

- [ ] **Paso 1: Crear la asociación de dominio**

```bash
aws amplify create-domain-association \
  --app-id d22jyci90y1h79 \
  --region <AMPLIFY_REGION> \
  --domain-name calderongalindoabogados.com \
  --sub-domain-settings prefix="",branchName=<BRANCH> prefix=www,branchName=<BRANCH>
```

Esperado: JSON con `domainAssociation.domainStatus` en `CREATING` o `PENDING_VERIFICATION`. Se asocian dos subdominios: ápice (`prefix` vacío) y `www`.

- [ ] **Paso 2: Sondear el estado hasta `AVAILABLE`**

```bash
aws amplify get-domain-association \
  --app-id d22jyci90y1h79 --region <AMPLIFY_REGION> \
  --domain-name calderongalindoabogados.com \
  --query 'domainAssociation.{status:domainStatus,reason:statusReason,subs:subDomains[].{p:subDomainSetting.prefix,v:verified,dns:dnsRecord}}'
```

Esperado: progresa `CREATING` → `PENDING_VERIFICATION` → `PENDING_DEPLOYMENT` → `AVAILABLE`. Repite el comando cada pocos minutos. Si tras ~30 min sigue en `PENDING_VERIFICATION`, ve al Paso 3.

- [ ] **Paso 3 (solo si la validación no avanza): comprobar/crear registros DNS manualmente**

En cuentas con la zona en Route 53, Amplify suele crear los CNAME de validación automáticamente. Si no, el comando del Paso 2 muestra en `dnsRecord` los registros `CNAME` requeridos (validación ACM y tráfico). Créalos en la zona canónica:

```bash
# Ejemplo: sustituye NOMBRE y VALOR por los que muestre dnsRecord (formato "NOMBRE CNAME VALOR")
aws route53 change-resource-record-sets --hosted-zone-id <ZONE_ID_CANONICO> --change-batch '{
  "Changes":[{"Action":"UPSERT","ResourceRecordSet":{
    "Name":"<NOMBRE>","Type":"CNAME","TTL":300,
    "ResourceRecords":[{"Value":"<VALOR>"}]}}]
}'
```

Esperado: `ChangeInfo.Status = PENDING`. Vuelve al Paso 2 hasta `AVAILABLE`.

- [ ] **Paso 4: Verificar que la web responde en ambos hosts**

```bash
curl -sI https://calderongalindoabogados.com      | head -n 1
curl -sI https://www.calderongalindoabogados.com  | head -n 1
```

Esperado: `HTTP/2 200` (o 200/301 a `www` según la config de Amplify). El certificado SSL debe ser válido (sin error de TLS). Abre también la URL en el navegador y confirma que carga el sitio React.

---

## Tarea 6: Solicitar el certificado ACM para el dominio de redirección

**Objetivo:** certificado HTTPS para `abogadodegenerado.com` y `www`, **obligatoriamente en `us-east-1`** (requisito de CloudFront), validado por DNS en Route 53.

- [ ] **Paso 1: Solicitar el certificado**

```bash
aws acm request-certificate \
  --region us-east-1 \
  --domain-name abogadodegenerado.com \
  --subject-alternative-names www.abogadodegenerado.com \
  --validation-method DNS \
  --query 'CertificateArn' --output text
```

Esperado: un ARN `arn:aws:acm:us-east-1:...:certificate/...`. Anótalo como `ACM_ARN_REDIRECT`.

- [ ] **Paso 2: Obtener los registros CNAME de validación**

```bash
aws acm describe-certificate --region us-east-1 --certificate-arn <ACM_ARN_REDIRECT> \
  --query 'Certificate.DomainValidationOptions[].ResourceRecord'
```

Esperado: uno o dos objetos con `Name`, `Type=CNAME`, `Value`. (Si ápice y `www` comparten validación, puede salir uno solo.)

- [ ] **Paso 3: Crear los CNAME de validación en la zona de redirección**

Por cada registro del paso anterior:

```bash
aws route53 change-resource-record-sets --hosted-zone-id <ZONE_ID_REDIRECT> --change-batch '{
  "Changes":[{"Action":"UPSERT","ResourceRecordSet":{
    "Name":"<Name>","Type":"CNAME","TTL":300,
    "ResourceRecords":[{"Value":"<Value>"}]}}]
}'
```

Esperado: `ChangeInfo.Status = PENDING`.

- [ ] **Paso 4: Esperar a que el certificado quede emitido**

```bash
aws acm wait certificate-validated --region us-east-1 --certificate-arn <ACM_ARN_REDIRECT> \
  && echo "CERT ISSUED"
```

Esperado: termina imprimiendo `CERT ISSUED` (puede tardar varios minutos tras propagar el CNAME). Si agota el tiempo, revisa que los NS de `abogadodegenerado.com` ya apunten a `awsdns` (Tarea 4) y reintenta.

---

## Tarea 7: Crear bucket S3 de redirección y distribución CloudFront

**Objetivo:** servir un **301** desde `abogadodegenerado.com` (y `www`) hacia `https://calderongalindoabogados.com`, con HTTPS válido.

- [ ] **Paso 1: Crear el bucket S3**

> Los nombres de bucket son globales. Si `abogadodegenerado-redirect` está tomado, añade un sufijo y úsalo de forma consistente.

```bash
aws s3api create-bucket --bucket abogadodegenerado-redirect --region us-east-1
```

Esperado: JSON con `Location`. (En regiones distintas de `us-east-1` habría que añadir `--create-bucket-configuration LocationConstraint=<region>`; aquí usamos `us-east-1`.)

- [ ] **Paso 2: Configurar el bucket como sitio web con redirección total**

```bash
aws s3api put-bucket-website --bucket abogadodegenerado-redirect --website-configuration '{
  "RedirectAllRequestsTo": { "HostName": "calderongalindoabogados.com", "Protocol": "https" }
}'
```

Esperado: sin salida (éxito). Este endpoint devolverá `301` a `https://calderongalindoabogados.com` conservando la ruta.

- [ ] **Paso 3: Obtener el endpoint web del bucket**

El endpoint web S3 para `us-east-1` es:
`abogadodegenerado-redirect.s3-website-us-east-1.amazonaws.com`

Confírmalo:

```bash
aws s3api get-bucket-website --bucket abogadodegenerado-redirect
```

Esperado: muestra la `RedirectAllRequestsTo` configurada. Guarda el endpoint web (lo usa CloudFront como **origen personalizado HTTP**).

- [ ] **Paso 4: Crear la distribución CloudFront**

Crea el archivo `cf-redirect.json` con esta configuración (sustituye `<ACM_ARN_REDIRECT>`; el endpoint S3 ya va puesto para `us-east-1`):

```json
{
  "CallerReference": "abogadodegenerado-redirect-cf",
  "Aliases": { "Quantity": 2, "Items": ["abogadodegenerado.com", "www.abogadodegenerado.com"] },
  "Origins": { "Quantity": 1, "Items": [{
    "Id": "s3-redirect-origin",
    "DomainName": "abogadodegenerado-redirect.s3-website-us-east-1.amazonaws.com",
    "CustomOriginConfig": {
      "HTTPPort": 80, "HTTPSPort": 443, "OriginProtocolPolicy": "http-only",
      "OriginSslProtocols": { "Quantity": 1, "Items": ["TLSv1.2"] }
    }
  }]},
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-redirect-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": { "Quantity": 2, "Items": ["GET","HEAD"],
      "CachedMethods": { "Quantity": 2, "Items": ["GET","HEAD"] } },
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  },
  "Comment": "Redirige abogadodegenerado.com -> calderongalindoabogados.com",
  "Enabled": true,
  "ViewerCertificate": {
    "ACMCertificateArn": "<ACM_ARN_REDIRECT>",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }
}
```

> El `CachePolicyId` `658327ea-...` es la policy gestionada **CachingOptimized** de AWS (válida en todas las cuentas).

Crea la distribución:

```bash
aws cloudfront create-distribution --distribution-config file://cf-redirect.json \
  --query 'Distribution.{id:Id,domain:DomainName,status:Status}'
```

Esperado: JSON con `id` (`E...`), `domain` (`dxxxx.cloudfront.net`) y `status=InProgress`. Anota el dominio como `CF_DOMAIN`.

- [ ] **Paso 5: Esperar a que CloudFront termine de desplegar**

```bash
aws cloudfront wait distribution-deployed --id <DISTRIBUTION_ID> && echo "CF DEPLOYED"
```

Esperado: imprime `CF DEPLOYED` (suele tardar varios minutos).

---

## Tarea 8: Crear los alias en Route 53 para el dominio de redirección

**Objetivo:** apuntar `abogadodegenerado.com` y `www` a la distribución CloudFront mediante registros **ALIAS A/AAAA**.

> Para alias hacia CloudFront, el `HostedZoneId` del alias es **siempre** `Z2FDTNDATAQYW2` (constante global de CloudFront).

- [ ] **Paso 1: Crear alias A y AAAA para ápice y www**

```bash
aws route53 change-resource-record-sets --hosted-zone-id <ZONE_ID_REDIRECT> --change-batch '{
  "Comment": "Alias a CloudFront para redireccion 301",
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"abogadodegenerado.com","Type":"A",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<CF_DOMAIN>","EvaluateTargetHealth":false}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"abogadodegenerado.com","Type":"AAAA",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<CF_DOMAIN>","EvaluateTargetHealth":false}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"www.abogadodegenerado.com","Type":"A",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<CF_DOMAIN>","EvaluateTargetHealth":false}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"www.abogadodegenerado.com","Type":"AAAA",
      "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"<CF_DOMAIN>","EvaluateTargetHealth":false}}}
  ]
}'
```

Esperado: `ChangeInfo.Status = PENDING`.

- [ ] **Paso 2: Confirmar que el cambio se aplicó**

```bash
aws route53 wait resource-record-sets-changed --id <CHANGE_ID> && echo "DNS APPLIED"
```

(`<CHANGE_ID>` es el `ChangeInfo.Id` que devolvió el paso anterior.) Esperado: `DNS APPLIED`.

---

## Tarea 9: Verificación de extremo a extremo

**Objetivo:** confirmar que todo está operativo.

- [ ] **Paso 1: La web canónica sirve contenido con HTTPS**

```bash
curl -sI https://calderongalindoabogados.com     | head -n 1
curl -sI https://www.calderongalindoabogados.com | head -n 1
```

Esperado: `HTTP/2 200` (o `www` → 301 → ápice, según Amplify), TLS válido.

- [ ] **Paso 2: El dominio de redirección devuelve 301 al canónico**

```bash
curl -sI https://abogadodegenerado.com     | grep -iE 'HTTP/|location'
curl -sI https://www.abogadodegenerado.com | grep -iE 'HTTP/|location'
curl -sI http://abogadodegenerado.com      | grep -iE 'HTTP/|location'
```

Esperado: respuesta `301` con `location: https://calderongalindoabogados.com/...`. La variante `http://` debe acabar también en HTTPS del canónico (CloudFront fuerza HTTPS).

- [ ] **Paso 3: Comprobar conservación de ruta**

```bash
curl -sIL https://abogadodegenerado.com/nosotros | grep -iE 'HTTP/|location'
```

Esperado: redirige a `https://calderongalindoabogados.com/nosotros`.

- [ ] **Paso 4: Validación en navegador**

Abre en un navegador limpio (o incógnito): `https://calderongalindoabogados.com`, `https://www.calderongalindoabogados.com`, `https://abogadodegenerado.com`. Confirma: candado SSL válido, carga el sitio, y la redirección termina en el canónico.

---

## Tarea 10: Documentar los recursos reales creados

**Objetivo:** dejar registro de IDs/ARNs para futuras operaciones (renovaciones, borrados, traspasos).

- [ ] **Paso 1: Completar `docs/recursos-aws.md`**

Rellena con los valores reales obtenidos:

```markdown
# Recursos AWS — Dominios (ver plan docs/00-...)

- AMPLIFY_APP_ID: d22jyci90y1h79
- AMPLIFY_REGION: <...>
- BRANCH: <...>

## Route 53
- Zona canónico (calderongalindoabogados.com): ZONE_ID=<...>
  - NS: <4 nameservers>
- Zona redirect (abogadodegenerado.com): ZONE_ID=<...>
  - NS: <4 nameservers>

## Amplify
- Domain association: calderongalindoabogados.com (@ + www) -> rama <BRANCH>

## Redirección abogadodegenerado.com
- ACM (us-east-1): <ARN>
- Bucket S3: abogadodegenerado-redirect
- CloudFront: ID=<E...>, dominio=<dxxxx.cloudfront.net>
- Destino 301: https://calderongalindoabogados.com

## Notas
- Nameservers cambiados en Hostinger el <fecha>.
- Sin registros MX/correo en estos dominios.
```

- [ ] **Paso 2: Commit de la documentación**

```bash
git add docs/00-configuracion-dominios-aws-amplify.md docs/recursos-aws.md
git commit -m "docs: plan y registro de configuracion de dominios AWS (Amplify + Route53)"
```

---

## Notas y riesgos

- **Propagación DNS (Tarea 4):** es el único paso que puede tardar horas. Las Tareas 5–8 dependen de que los NS ya apunten a `awsdns`; si la validación de certificados se atasca, casi siempre es porque la delegación aún no propagó.
- **Región de ACM:** el certificado de CloudFront (Tarea 6) **debe** estar en `us-east-1`. El de Amplify (Tarea 5) lo gestiona Amplify automáticamente y no requiere acción.
- **Sin correo:** confirmado que no hay MX; si en el futuro se añade correo a estos dominios, los registros MX/SPF/DKIM deberán crearse en las zonas de Route 53 (ya no en Hostinger).
- **Coste:** zonas Route 53 (~0,50 USD/zona/mes) + consultas; CloudFront y S3 de redirección tienen coste mínimo; ACM y Amplify SSL son gratuitos.
- **Reversión:** para volver a Hostinger basta con restaurar sus nameservers originales (anotados en Tarea 2) en el panel de Hostinger.

## Autorrevisión (cobertura del spec)

- Crear zona en AWS → Tarea 3. ✅
- Configurar dominios para el proyecto Amplify `d22jyci90y1h79` → Tarea 5 (canónico) + Tareas 6–8 (redirección). ✅
- Pasos en Hostinger → Tarea 4 (cambio de nameservers) + Tarea 2 (inspección previa). ✅
- Poner ambos dominios operativos → Tarea 9 (verificación E2E). ✅
- Documentar en `docs` como "00" → este archivo + `docs/recursos-aws.md` (Tarea 10). ✅
