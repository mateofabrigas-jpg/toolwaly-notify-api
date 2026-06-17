╔══════════════════════════════════════════════════╗
║   TOOLWALY NOTIFY API — Setup Guide              ║
║   GitHub + Vercel + Resend                       ║
╚══════════════════════════════════════════════════╝

Ye chhota sa API hai jo Vercel pe FREE deploy hoga.
Kaam: jab client ka tool 500 domains complete kare, ye API
tumhe email bhej dega (Resend ke through) — bina kisi password
ke client ke tool mein jaaye.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 1 — GitHub pe Upload karo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. github.com pe login karo
2. Top-right "+" icon → "New repository"
3. Naam do: toolwaly-notify-api
4. "Create repository" click karo
5. Us naye (empty) repo ke page par "uploading an existing file"
   wala link milega — usi pe click karo
6. Is folder ke andar ke SAARI files (api/notify.js, package.json,
   README.txt) drag-and-drop karke upload karo
7. Neeche "Commit changes" green button dabao

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 2 — Vercel pe Deploy karo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. vercel.com pe jao, "Continue with GitHub" se login karo
2. Dashboard mein "Add New..." → "Project" click karo
3. Apna "toolwaly-notify-api" repo dhundo aur "Import" karo
4. Settings default rakho, "Deploy" click karo
5. 30-60 second mein deploy ho jayega
6. Tumhe ek URL milega jaisa:
   https://toolwaly-notify-api.vercel.app
   (ye apna actual URL kahin save kar lo)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 3 — Resend se API Key lo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. resend.com pe login karo
2. Left menu mein "API Keys" pe jao
3. "Create API Key" — naam "toolwaly" rakho
4. Jo key mile (re_xxxxxxx...) usko copy kar lo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 4 — Vercel mein Environment Variables daalo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vercel project ke andar:
Settings → Environment Variables → "Add New" se ye 4 daalo:

  RESEND_API_KEY  = re_xxxxxxx (Resend wali key)
  FROM_EMAIL      = onboarding@resend.dev
                    (Resend ka free test sender — apna domain
                     verify karoge to khud ka bhi use kar sakte ho)
  TO_EMAIL        = tumhari_apni_email@gmail.com
                    (jahan tumhe alert chahiye)
  TOOL_SECRET     = koi bhi random lamba password tum khud banao
                    (jaise: tlwy_8x92kPq_secret)
                    Ye secret tool ke andar bhi jayega — taake
                    koi aur random API ko spam na kar sake.

Sab 4 add karne ke baad, ek baar "Redeploy" karo (Deployments
tab → latest deployment → "..." → Redeploy) taake variables
load ho jayein.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 5 — Test karo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apne PC pe terminal/cmd kholo aur ye chalao (URL + secret apna
daalo):

curl -X POST https://toolwaly-notify-api.vercel.app/api/notify ^
  -H "Content-Type: application/json" ^
  -d "{\"client_name\":\"Test\",\"domain_count\":500,\"date_time\":\"17-06-2026\",\"secret\":\"tlwy_8x92kPq_secret\"}"

Agar sab theek hai to {"success":true} aayega aur email bhi
turant mil jayegi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ZAROORI: Apna URL + Secret mujhe wapas bhejo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Jab deploy ho jaye, mujhe ye 2 cheezein bhejo:
  1. Tumhara Vercel URL (https://....vercel.app)
  2. Tumhara TOOL_SECRET

Main inko Python tool ke andar daal dunga — taake jab 500
domains complete ho, tool khud ye API ko ping kar de aur
tumhe email mil jaye. Password kabhi tool ke code mein nahi
jayega — bas yeh URL + secret jayega, jo agar leak ho bhi jaye
to sirf "notify" trigger kar sakta hai, aur kuch nahi.
