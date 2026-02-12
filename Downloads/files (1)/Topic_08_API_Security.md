# ⚠️ API Security

> **Topic 8 of 10** | Cybersecurity Content Series 2026

---

## 📱 X (Twitter) Post
**Character Count:** 270/280

```
🔌 APIs are everywhere. And attackers know it.

83% of web traffic is API calls.
94% of orgs had API security incident in 2025.

Your mobile app? API.
Your SaaS integrations? APIs.
Your IoT devices? All APIs.

And most are completely unsecured. 😱

#APISecurity #DevSecOps
```

---

## 💼 LinkedIn Post
**Word Count:** ~297 words

🔌 **API Security: The Attack Surface You Forgot to Secure**

APIs power everything in 2026. Your mobile app, your integrations, your automation, your microservices.

And **94% of organizations had an API security incident in 2025**. 🚨

**The API explosion:**

→ **83% of all web traffic** is now API calls (up from 64% in 2023)
→ Average organization has **15,000+ APIs** (and that's just the ones they know about)
→ **Shadow APIs:** 42% of APIs are undocumented/unknown
→ **API vulnerabilities:** OWASP API Security Top 10 constantly exploited

**Why APIs are targeted:**

✅ **Direct data access** - No UI obscurity, straight to the database
✅ **Authentication weaknesses** - Broken object-level authorization
✅ **Rate limiting failures** - No throttling = easy scraping/brute forcing
✅ **Excessive data exposure** - Returning entire objects when only partial needed
✅ **Lack of visibility** - Security teams don't know APIs exist

**Real breaches:**

• **Optus (Australia):** 10M customer records via unauthenticated API endpoint
• **Peloton:** User data exposed via BOLA (Broken Object Level Authorization)
• **T-Mobile:** Multiple API-based breaches exposing millions
• **Facebook:** 533M users' data scraped via unprotected API

**What's changing in 2026:**

✅ **API discovery and inventory** tools becoming mandatory
✅ **Runtime API protection** (RASP for APIs)
✅ **API security testing** in CI/CD pipelines
✅ **GraphQL security** emerging as critical focus
✅ **API threat intelligence** integration

💡 **Reality check:** You probably have APIs you don't know about, exposed to the internet right now, with zero security controls.

**Quick test:**
- Do you have a complete API inventory? (Most don't)
- Are all APIs authenticated? (Many aren't)
- Do you rate limit API calls? (Often forgotten)
- Are you testing API security before production? (Rarely)

If you answered "no" to any of these, you have an API security problem.

#APISecurity #DevSecOps #ApplicationSecurity #Cybersecurity #InfoSec

---

## 📝 Medium Article
**Word Count:** ~1885 words | **Reading Time:** 5-10 minutes

# API Security Vulnerabilities: The Invisible Attack Surface Bleeding Data

## The Breach That Shouldn't Have Happened

September 2022. Optus, Australia's second-largest telecom, suffered a massive breach. 10 million customer records exposed—names, dates of birth, addresses, driver's license numbers, passport numbers.

The attack vector? An unauthenticated API endpoint. No login required. No security controls. Just direct access to customer data.

The attacker literally just... asked for it. And the API said "here you go."

Cost: $140M+ in remediation, compensation, reputation damage.

**The worst part:** This API was probably documented internally. Security just never reviewed it.

## The API Security Crisis

APIs are the backbone of modern applications. Every mobile app, every SaaS integration, every microservice communication—it's all APIs.

**The numbers:**
- 83% of all internet traffic is API calls
- Average organization: 15,000-20,000 APIs
- Shadow APIs (unknown to security): 42% of total
- API attacks increased 681% between 2021-2025
- 94% of organizations experienced API security incidents in 2025

**Why the explosion:**
- Mobile apps (every feature is an API call)
- Microservices architecture (services communicate via APIs)
- Third-party integrations (connect to everything)
- IoT devices (millions of API endpoints)
- Automation and CI/CD (automated API calls everywhere)

**The problem:** APIs expose business logic and data directly. No UI to hide behind. No human in the loop to notice weird behavior.

## OWASP API Security Top 10 (The Playbook Attackers Use)

### 1. Broken Object Level Authorization (BOLA)

**What it is:** API doesn't verify user has permission to access specific object.

**Example attack:**
```
GET /api/users/123/billing
→ Returns user 123's billing info

GET /api/users/124/billing  
→ Returns user 124's billing info (but you're user 123!)
```

**Why it happens:** Developers assume API consumers won't guess other IDs. They do.

**Real case:** Peloton API allowed any user to view any other user's account details, private activity data, and location history just by changing user ID in request.

**Impact:** Massive data exposure, privacy violations, compliance nightmares.

### 2. Broken Authentication

**What it is:** Weak or missing authentication on API endpoints.

**Common failures:**
- No authentication required at all
- Weak password requirements
- Missing rate limiting on login attempts
- Predictable API keys
- Tokens that don't expire

**Real case:** T-Mobile API breach (2021) - No authentication on customer account lookup API.

**Impact:** Unauthorized access to entire API functionality.

### 3. Broken Object Property Level Authorization

**What it is:** API returns more data than user should access (excessive data exposure).

**Example:**
```json
GET /api/users/me
Returns:
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "ssn": "123-45-6789",  ← Should not be exposed
  "credit_score": 750,    ← Should not be exposed
  "internal_notes": "..."  ← Definitely should not be exposed
}
```

**Why it happens:** Backend returns entire database object; frontend displays subset. But API consumers can see everything.

### 4. Unrestricted Resource Consumption

**What it is:** No limits on API requests, allowing resource exhaustion or economic damage.

**Attack scenarios:**
- Request massive datasets (retrieve entire database via pagination)
- Denial of service (flood API with requests)
- Cost amplification (expensive operations without limits)
- Scraping all data

**Real case:** LinkedIn data scraping - 700M+ user profiles scraped via API without rate limits.

**Impact:** Service degradation, excessive costs, complete data exfiltration.

### 5. Broken Function Level Authorization (BFLA)

**What it is:** API doesn't verify user can perform admin/privileged functions.

**Example:**
```
POST /api/users/delete  ← Should be admin-only
But regular users can call it if they know the endpoint exists
```

**Real case:** Financial services API allowed regular users to call admin endpoints for account manipulation.

**Impact:** Privilege escalation, unauthorized actions, data manipulation.

### 6. Unrestricted Access to Sensitive Business Flows

**What it is:** Critical business functions accessible without proper controls.

**Examples:**
- Purchase flow with no fraud checks
- Password reset with weak verification
- Account creation without CAPTCHA (bot abuse)
- Money transfer without multi-factor confirmation

**Real case:** Retailer's API allowed bots to purchase all limited-edition items before humans could complete checkout.

### 7. Server Side Request Forgery (SSRF)

**What it is:** API fetches remote resource based on user input without validation.

**Attack:**
```
GET /api/fetch?url=http://internal-admin-panel.local/
→ API fetches internal resource and returns it
```

**Why it's dangerous:** Bypasses firewalls, accesses internal services, exfiltrates internal data.

### 8. Security Misconfiguration

**What it is:** Improper API configuration.

**Common misconfigurations:**
- Debug endpoints in production
- Verbose error messages exposing internals
- CORS misconfiguration allowing any origin
- Missing security headers
- Default credentials still active
- Unnecessary HTTP methods enabled

**Example:** API accepting OPTIONS, PUT, DELETE when only GET, POST needed.

### 9. Improper Inventory Management

**What it is:** Not knowing which APIs exist, versions, endpoints.

**The problem:**
- Old API versions still running (with known vulnerabilities)
- Documentation doesn't match reality
- Deprecated endpoints still accessible
- Shadow APIs (unknown to security)
- Zombie APIs (forgotten, unmaintained)

**Real case:** Company found 87 undocumented API endpoints during security audit—all exposed to internet, several critical vulnerabilities.

### 10. Unsafe Consumption of APIs

**What it is:** Trusting third-party APIs without validation.

**Risk scenarios:**
- Third-party API compromised (supply chain attack via API)
- Malicious data from external API
- No validation of API responses
- Weak encryption between API calls

**Example:** SaaS app trusts external API responses without validation → attacker controls external API → injects malicious data → compromises app.

## API Security in Modern Architectures

### REST APIs
**Common vulnerabilities:**
- Predictable resource IDs (sequential integers)
- Lack of input validation
- Missing authentication on certain endpoints
- Over-fetching data

### GraphQL APIs
**Unique challenges:**
- Complex queries enabling DoS
- Deeply nested queries
- Introspection exposure (reveals entire schema)
- No built-in rate limiting

**GraphQL-specific attack:**
```graphql
query {
  users {
    posts {
      comments {
        author {
          posts {
            comments {
              # Infinite nesting → server crash
            }
          }
        }
      }
    }
  }
}
```

### Microservices APIs
**Internal API risks:**
- Assumed trust between services (wrong!)
- No authentication on internal APIs
- Lateral movement after initial compromise
- Service mesh complexity hiding vulnerabilities

### Serverless/Function APIs
**Challenges:**
- Function-level permissions (over-privileged functions)
- API Gateway misconfiguration
- No visibility into function-to-function calls
- Excessive data in environment variables

## Defending the API Attack Surface

### 1. API Discovery & Inventory

**You can't secure what you don't know exists.**

**Automated discovery:**
- Traffic analysis (observe API calls in production)
- Code repository scanning (find API definitions)
- API gateway logs
- Cloud configuration review

**Tools:** Salt Security, Traceable AI, Noname Security, 42Crunch

**Inventory must include:**
- Endpoint URLs
- Authentication methods
- Data sensitivity level
- Owner/team responsible
- Last security review date
- Deprecation status

### 2. API Security Testing

**Integrate into CI/CD pipeline:**

**Static testing (design/code review):**
- OpenAPI/Swagger spec analysis
- Code scanning for common API vulnerabilities
- Security linting for API frameworks

**Dynamic testing (runtime):**
- Automated penetration testing
- Fuzzing API endpoints
- BOLA/BFLA testing
- Rate limit verification

**Tools:** OWASP ZAP, Burp Suite, Postman security testing, Astra Security

### 3. API Gateways with Security

**Modern API gateways provide:**
- Authentication and authorization
- Rate limiting and throttling
- Input validation
- Response sanitization
- Logging and monitoring
- DDoS protection

**Leading gateways:** Kong, Apigee, AWS API Gateway, Azure API Management

### 4. Runtime API Protection

**Real-time threat detection:**
- Anomaly detection (unusual API patterns)
- Bot detection
- Data loss prevention
- Account takeover prevention
- API abuse detection

**RASP for APIs:** Salt Security, Traceable AI, Noname Security

### 5. Authentication & Authorization

**Best practices:**

**OAuth 2.0 / OpenID Connect:**
- Industry standard
- Token-based authentication
- Scoped permissions

**API Keys:**
- Unique per client
- Rotated regularly
- Never in URLs (use headers)
- Encrypted in storage

**JWT (JSON Web Tokens):**
- Stateless authentication
- Short expiration times
- Validated signature
- Not for sensitive data (they're base64, not encrypted!)

**mTLS (mutual TLS):**
- Both client and server authenticate
- Certificate-based trust
- Strong for service-to-service

### 6. Rate Limiting & Throttling

**Why it matters:**
- Prevents brute force
- Stops scraping
- Mitigates DoS
- Controls costs

**Implementation:**
- Per-user limits
- Per-IP limits
- Per-endpoint limits
- Burst allowances
- Progressive penalties

**Example policy:**
- 100 requests/minute per user
- 1,000 requests/hour per IP
- 10 login attempts/hour per account

### 7. Input Validation & Output Encoding

**Validate everything:**
- Data type
- Format (regex patterns)
- Range (min/max values)
- Length limits
- Allowed characters
- Business logic rules

**Sanitize output:**
- Remove sensitive fields
- Encode for context (JSON, XML, HTML)
- Consistent error messages (no info disclosure)

### 8. Monitoring & Logging

**What to log:**
- All API calls (endpoint, method, parameters)
- Authentication events (success/failure)
- Authorization decisions
- Unusual patterns
- Errors and exceptions
- Performance metrics

**Alerts for:**
- Failed authentication spikes
- Privilege escalation attempts
- Excessive data requests
- Unusual access patterns
- Geographic anomalies

### 9. API Versioning & Deprecation

**Version control:**
- Semantic versioning (v1, v2, v3)
- Clear deprecation timeline
- Forced migration to secure versions
- Sunset old vulnerable versions

**Process:**
- Announce deprecation (6-12 months advance notice)
- Provide migration guide
- Monitor usage of old versions
- Disable after deadline

### 10. Third-Party API Security

**When consuming external APIs:**
- Validate all responses
- Don't trust data from third parties
- Implement timeouts
- Handle failures gracefully
- Use API keys securely (not in code)
- Monitor third-party API health

## The 2026 API Security Landscape

### AI-Generated APIs
**Challenge:** LLM-generated API code may have vulnerabilities
**Solution:** Automated security scanning of AI-generated code

### API Supply Chain Attacks
**Threat:** Compromised third-party APIs as entry points
**Defense:** Zero-trust approach to external API consumption

### GraphQL Complexity Exploits
**Growing attack surface:** GraphQL's flexibility enables complex attacks
**Response:** Query complexity limits, depth limits, persistent queries only

### Serverless API Vulnerabilities
**Risk:** Function-level permissions too broad, event injection attacks
**Mitigation:** Principle of least privilege, input validation on events

## Common API Security Mistakes

### Mistake 1: "It's an internal API, doesn't need security"
**Wrong:** Internal APIs get exposed (cloud misconfiguration, VPN breach, insider threat)
**Right:** Secure ALL APIs as if internet-exposed

### Mistake 2: Relying on client-side validation
**Wrong:** Attackers bypass clients and call APIs directly
**Right:** Server-side validation for everything

### Mistake 3: Security by obscurity
**Wrong:** "They won't find this undocumented endpoint"
**Right:** Attackers enumerate endpoints; assume they'll find everything

### Mistake 4: Returning database objects directly
**Wrong:** Entire user object with password hashes, internal IDs returned
**Right:** DTOs (Data Transfer Objects) with only needed fields

### Mistake 5: No rate limiting
**Wrong:** "Our API isn't public, don't need limits"
**Right:** Rate limit everything to prevent abuse and scraping

## The Bottom Line

APIs are your application's front door, back door, and probably several windows you forgot existed.

**API security isn't optional anymore:**
✅ Maintain complete API inventory
✅ Test API security in CI/CD pipeline
✅ Implement authentication/authorization everywhere
✅ Rate limit all endpoints
✅ Monitor and log all API activity
✅ Version and deprecate securely
✅ Validate input, sanitize output
✅ Assume APIs will be discovered and tested by attackers

**Remember:** Every API endpoint is a potential attack vector. Secure them all, or attackers will find the one you missed.

Your data is one unauthenticated API call away from being public. Make sure that call never succeeds.

---

*Last Updated: February 2026*
