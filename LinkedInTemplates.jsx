import { useState, useRef, useEffect, useCallback } from "react";

const emailTemplates = {
  "salary negotiation": [
    {
      id: "accept-offer",
      label: "acceptance of offer",
      subject: "Acceptance of Job Offer [YOUR NAME]",
      message: `Dear ( FIRST NAME ),


I am pleased to accept the position of ( JOB TITLE ) with ( COMPANY ). Thank you for this exciting opportunity. I look forward to making a positive impact as a member of the ( COMPANY ) team starting on ( DATE ). To confirm my starting salary will be ( $ ) and ( ADD ANY ADDITIONAL PACKAGE DETAILS ). If there is any additional information you need from me prior to my start date please let me know.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "counter-offer",
      label: "confirmation of counter offer",
      subject: "Follow Up on Our Conversation Offer Details",
      message: `Dear ( FIRST NAME ),


Thank you for meeting with me today regarding the job offer for ( JOB TITLE ) with ( COMPANY ). I am very excited about coming on board. Per our conversation I am excited to accept the offer with the following changes ( LIST ADJUSTMENTS ). I look forward to receiving a written confirmation of these changes and will return the revised offer as soon as possible. If you need any additional information from me in the meantime please let me know.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
  ],
  "networking": [
    {
      id: "new-contact",
      label: "follow up: new contact",
      subject: "Nice Meeting You at ( PLACE/EVENT )",
      message: `Hi ( FIRST NAME ),


It was a pleasure meeting you at ( PLACE/EVENT ). It was great learning about your passion for ( ADD DETAIL ) and your successful career path. Thank you for taking the time to share your insight and experiences.


As I mentioned, I am trying to break into the industry and would like to ask you 2-3 questions about your experience working at ( COMPANY ). Would you be free to chat over coffee this week? I know you're busy, so I will make myself available whenever you have 15-20 minutes. If you prefer, I would be happy to send my questions via email. Otherwise feel free to call me on my cell at ( CELL NUMBER ).


In our conversation last night, you mentioned your interest in ( ADD ). Attached is a great ( ADD ) that speaks to the future of this field. I thought you would find it interesting.


I really appreciate your willingness to help.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "referral",
      label: "follow up: referral",
      subject: "Introduction via ( REFERRAL NAME )",
      message: `Dear ( FIRST NAME ),


I am writing to you at the recommendation of ( FIRST & LAST NAME ), who you know through ( ADD ). ( FIRST NAME ) has been kind enough to introduce me to people as I explore the ( ADD ) industry in ( CITY NAME ). She mentioned that you hold a senior role at ( COMPANY ), which is of interest to me, specifically because of the company's strong focus on ( ADD ). I'd like to ask you 2-3 questions about your experience working at ( COMPANY ).


Would you be free to chat over coffee or on the phone this week? I know you're busy, so I will make myself available whenever you have 15-20 minutes.


I appreciate your willingness to help.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "referred-contact",
      label: "follow up: contact who referred you to someone",
      subject: "Thank You for the Introduction!",
      message: `Dear ( FIRST NAME ),


Thank you so much for referring me to ( ADD ). We met ( WHEN YOU MET ). You were absolutely right, ( HE/SHE ) is an accomplished ( ADD ). ( HE/SHE ) shared some great ideas and advice on how to ( ADD ). Because of your referral I feel better equipped to tackle the ( INDUSTRY ) job market.


On another note, I came across an interesting ( ADD ) related to ( ADD ). I thought you would find it useful since you mentioned ( ADD ). The link is attached.


Thank you again for your help. Do you mind if I drop you an occasional email to stay in touch?


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
  ],
  "applying to jobs": [
    {
      id: "target-company",
      label: "reach out: contact at a target company",
      subject: "Admirer of ( COMPANY ) Would Love to Connect",
      message: `Dear ( Mr./Ms. ) ( LAST NAME ),


I've applied online for the ( COMPANY ) ( JOB TITLE ) position. While researching the company, I came across your profile. As the ( JOB TITLE ), you may well be the hiring manager for this role, or at least involved in the hiring decision.


My extensive experience in ( ADD ) would allow me to add value in the following ways: ( ADD ). Furthermore, as it relates to the job posting, I believe I can help in this manner:
( TOP REQUIREMENT AND HOW YOU MEET IT )
( 2ND REQUIREMENT AND HOW YOU MEET IT )
( ANOTHER REQUIREMENT AND HOW YOU MEET IT )


I can be reached at ( CELL NUMBER ) or via email at ( EMAIL ADDRESS ) and am available to speak with you at your convenience. I look forward to hearing from you.


Kind regards,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "forwarded-resume",
      label: "follow up: person who forwarded your resume",
      subject: "Thank You for Forwarding My Resume",
      message: `Hi ( FIRST NAME ),


I hope this finds you well. I wanted to connect with you regarding my resume. Thank you once again for sharing it with your team. I am sure your personal endorsement will speak volumes in my favor! As mentioned in our previous discussions, I am very interested in the role of ( JOB TITLE ) at ( COMPANY ), specifically because I believe I will be able to make an impact in the following ways:
( TOP REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )
( 2ND REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )
( ANOTHER REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )


Should I be following up with you or with the person you shared my resume with? You have been so kind to me and I appreciate all your advice. I am happy to take this off your plate and follow up with others on your team or Human Resources. Let me know what you are comfortable with. You are doing me a huge favor and I want to make this easy for you!


By the way, I remember you mentioning your new interest in ( ADD ). I found the following which may be helpful to you ( INSERT USEFUL INFORMATION ).


Feel free to call me on my cell ( CELL NUMBER ) or reply to this email. If I don't hear from you in a week, would it be okay if I drop you an email?


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
  ],
  "interviewing": [
    {
      id: "post-info-interview",
      label: "post informational interview follow up",
      subject: "Thank You Informational Interview",
      message: `Dear ( FIRST NAME ),


It was wonderful to connect with you yesterday. I appreciate your advice on my job search strategy with ( INDUSTRY ) firms and your perspective on what areas are growing. I came away with a much better sense of the field and what it takes to be successful.


Thank you also for your suggestion to reach out to ( FIRST & LAST NAME ). I sent ( HIM/HER ) an email after our meeting and I will be meeting ( HIM/HER ) for coffee in ( TIME/DATE ). I truly appreciate the referral. If you have any other suggestions, I welcome them. As promised I have attached the research I compiled on ( ADD ). I hope you find this helpful as you ( ADD ).


If there is anything else I can help you with please let me know. I will keep you posted on my progress.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "1st-post-interview",
      label: "1st post interview follow up",
      subject: "Thank You ( POSITION ) Interview",
      message: `Dear ( FIRST NAME ),


I enjoyed meeting ( OR SPEAKING WITH ) you today and learning about your needs for the ( JOB TITLE ) position at ( COMPANY ).


Among my takeaways from our conversation are that ( TAILOR BASED ON WHAT YOU LEARNED DURING YOUR INTERVIEW; FOR EXAMPLE YOU MIGHT SAY: "SOMEONE TAKING ON THIS ROLE SHOULD BE PREPARED TO IMPROVE CUSTOMER SERVICE RATINGS NO LESS THAN 20%" OR "SOMEONE TAKING ON THIS ROLE POSSESSES DAY-ONE SKILLS IN ACCOUNT MANAGEMENT, ESCALATION RESOLUTION AND SALES" ETC. ).


I am uniquely qualified to take on this challenge. For example ( SHARE A FEW EXAMPLES FROM YOUR BACKGROUND OF ACCOMPLISHMENTS YOU HAVE THAT ALIGN WITH THESE NEEDS; INCLUDE METRICS (#, $, %) WHENEVER POSSIBLE. YOU CAN ALSO PROPOSE RECOMMENDATIONS, PROJECTS, OR IDEAS THAT SHOW-CASE YOUR INITIATIVE AND CREATIVITY. )


Thanks again for your time and, regardless of the outcome of your search, I thoroughly enjoyed our conversation and the opportunity to learn more about your organization. I look forward to following up with you on ( MUTUALLY AGREED UPON DATE ) to discuss possible next steps.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "2nd-post-interview",
      label: "2nd post interview follow up",
      subject: "Following Up ( POSITION ) at ( COMPANY )",
      message: `Dear ( FIRST NAME ),


I hope this finds you well. I wanted to reach out regarding my candidacy for ( JOB TITLE ) at ( COMPANY ). In our meeting, you mentioned you might know of next steps by ( MUTUALLY AGREED UPON DATE ). I want to express my continued interest in this opportunity. Specifically I think I can make an impact in the following ways:
( TOP REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )
( 2ND REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )
( ANOTHER REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )


If you require any other information from me to help your decision making process, please let me know. I can be reached at ( CELL NUMBER ) or via email at ( EMAIL ADDRESS ).


If I don't hear from you in a week or so, would you mind if I drop you an email? Thank you once again for your time.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
    {
      id: "final-post-interview",
      label: "final post interview follow up",
      subject: "Final Follow Up ( POSITION ) Role",
      message: `Dear ( FIRST NAME ),


I hope this finds you well. I want to express my continued interest in the ( JOB TITLE ) role at ( COMPANY ). As it has been some time since I interviewed for the role you may have made your final decision; please let me know if this is the case because I have you in my follow up calendar. I don't want to keep bothering you! Additionally I would greatly appreciate your feedback on my interview. I am always looking to improve and strengthen my marketability.


If instead the position is still active and I am a viable candidate, let me know and I will continue to follow up. Based on the conversations we had, I believe the following will allow me to make a measurable impact in the role:
( TOP REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )
( 2ND REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )
( ANOTHER REQUIREMENT AND HOW YOU MEET IT / COMPANY CHALLENGE AND HOW YOU'LL SOLVE IT )


I will plan on reaching out to you in a month unless I hear from you otherwise. I look forward to hearing from you either way.


Sincerely,
( YOUR FIRST & LAST NAME )`,
    },
  ],
};

const phoneTemplates = {
  "networking": [
    {
      id: "general-networking",
      label: "general networking call",
      points: ["Introduce self","Explain reason for call","Deliver PVP","Request introduction / information","Thank you"],
    },
    {
      id: "decision-maker",
      label: "network with company decision maker",
      points: ["Brief introduction","How you're connected","Ask questions to uncover challenge","Position yourself as solution (PVP)","Request in person meeting","Thank you"],
    },
  ],
  "applying to jobs": [
    {
      id: "reach-out-target",
      label: "reach out: contact at target company",
      points: ["Introduce yourself and how you found them","Express your interest in the company specifically","Ask about their experience and role","Mention any relevant skills or background","Ask if they know of any openings or can refer you","Thank them and ask to stay connected"],
    },
    {
      id: "forwarded-resume-phone",
      label: "follow up: person who forwarded your resume",
      points: ["Greeting","Reminder of original interaction","Check status of process","Ask how you can help them","Ask to stay in touch","Thank you"],
    },
  ],
  "interviewing": [
    {
      id: "post-interview-phone",
      label: "post interview follow up",
      points: ["Introduce self","Explain reason for call","Inquire about whether decision has been made","Reiterate interest in position and PVP","Ask to check back in a week if haven't heard back","Thank you"],
    },
    {
      id: "rejection-followup",
      label: "follow up after rejection",
      points: ["Greeting","Express gratitude for opportunity to interview","Ask for feedback about interview performance","Ask to stay in touch in case of future openings","Thank you"],
    },
  ],
  "salary negotiation": [
    {
      id: "request-conversation",
      label: "request for conversation regarding offer",
      points: ["Greeting","Thank them for the offer","Request time to review offer (2 to 3 days)","Schedule conversation to discuss","Thank you"],
    },
    {
      id: "conversation-offer",
      label: "conversation about offer",
      points: ["Greeting","Express excitement about job and appreciation of offer","Negotiate your chosen points","Confirm new terms","Ask when you can expect to receive new written offer","Thank you"],
    },
    {
      id: "accept-offer-phone",
      label: "acceptance of offer",
      points: ["Greeting","Express gratitude for offer and excitement about job","Accept the offer","Schedule next steps","Thank you"],
    },
  ],
};

export default function LinkedInTemplates() {
  const [activeTab, setActiveTab] = useState("about");
  const [activeCategory, setActiveCategory] = useState("networking");
  const [activeTemplate, setActiveTemplate] = useState(emailTemplates["networking"][0]);
  const [toEmail, setToEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [pipFontSize, setPipFontSize] = useState(12);
  const [pipPos, setPipPos] = useState({
    x: typeof window !== "undefined" ? Math.round(window.innerWidth / 2 - 170) : 400,
    y: typeof window !== "undefined" ? Math.round(window.innerHeight / 2 - 210) : 300,
  });
  const [openCategories, setOpenCategories] = useState({
    "salary negotiation": false, networking: false, "applying to jobs": false, interviewing: false,
  });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    dragOffset.current = { x: e.clientX - pipPos.x, y: e.clientY - pipPos.y };
    e.preventDefault();
  }, [pipPos]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      setPipPos({
        x: Math.min(Math.max(0, e.clientX - dragOffset.current.x), window.innerWidth - 340),
        y: Math.min(Math.max(-10, e.clientY - dragOffset.current.y), window.innerHeight - 60),
      });
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const templates = activeTab === "email" ? emailTemplates : phoneTemplates;
  const toggleCategory = (cat) => setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  const selectTemplate = (tpl) => { setActiveTemplate(tpl); setCopied(false); };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== "about") {
      const firstCat = Object.keys(tab === "email" ? emailTemplates : phoneTemplates)[0];
      setActiveCategory(firstCat);
      setActiveTemplate((tab === "email" ? emailTemplates : phoneTemplates)[firstCat][0]);
    }
    setCopied(false);
  };

  const copyToClipboard = () => {
    const text = activeTab === "email"
      ? `Subject: ${activeTemplate.subject}\n\n${activeTemplate.message}`
      : activeTemplate.points.join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ NEW: pop-out into a floating browser popup window
  const popOut = () => {
    const isEmail = activeTab === "email";
    const content = isEmail
      ? `<strong style="color:#1a2744;font-size:11px">subject:</strong> <span style="color:#555;font-size:11px">${activeTemplate?.subject}</span><hr style="border:none;border-top:1px solid #eee;margin:8px 0"/><pre style="font-size:12px;color:#333;line-height:1.65;white-space:pre-wrap;font-family:Georgia,serif;margin:0">${activeTemplate?.message}</pre>`
      : `<p style="font-size:11px;font-weight:700;color:#1a2744;margin:0 0 8px">talking points:</p>${activeTemplate?.points?.map(p => `<div style="padding:5px 0;border-bottom:1px solid #f0ede8;font-size:12px;color:#444;font-family:Georgia,serif">${p}</div>`).join("")}`;

    const popup = window.open("", "_blank", "width=360,height=480,top=100,left=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no");
    popup.document.write(`
      <html>
        <head>
          <title>${activeTemplate?.label}</title>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; font-family: Georgia, serif; background: #fff; }
            .header { background: linear-gradient(135deg, #1a2744, #2d4a7a); padding: 10px 14px; color: #fff; font-size: 11px; font-style: italic; }
            .body { padding: 14px; overflow-y: auto; height: calc(100vh - 80px); }
            .copy-btn { display: block; width: 100%; padding: 10px; background: #2d5fa3; color: #fff; border: none; font-family: Georgia, serif; font-size: 13px; font-weight: 600; cursor: pointer; }
            .copy-btn:hover { background: #1a3e6f; }
            .footer { padding: 10px 14px; border-top: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="header">${activeTemplate?.label}</div>
          <div class="body">${content}</div>
          <div class="footer">
            <button class="copy-btn" onclick="
              const text = document.querySelector('pre') ? document.querySelector('pre').innerText : Array.from(document.querySelectorAll('.body div')).map(d => d.innerText).join('\\n');
              navigator.clipboard.writeText(text).then(() => { this.innerText = 'copied!'; setTimeout(() => this.innerText = 'copy to clipboard', 2000); });
            ">copy to clipboard</button>
          </div>
        </body>
      </html>
    `);
    popup.document.close();
  };

  if (minimized) {
    const isEmail = activeTab === "email";
    return (
      <div style={{ position: "fixed", left: pipPos.x, top: pipPos.y, width: 340, height: 420, background: "#fff", borderRadius: "14px", boxShadow: "0 12px 48px rgba(0,0,0,0.28)", cursor: "default", zIndex: 99999, display: "flex", flexDirection: "column", userSelect: "none", border: "1px solid #d0ccc4", overflow: "hidden" }}>

        {/* drag handle — header only */}
        <div onMouseDown={onMouseDown} style={{ background: "linear-gradient(135deg, #1a2744 0%, #2d4a7a 100%)", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, cursor: "grab" }}>
          <div style={{ color: "#fff", fontSize: "11px", fontFamily: "Georgia, serif", fontStyle: "italic", opacity: 0.9 }}>{activeTemplate?.label}</div>
          <div style={{ display: "flex", gap: "6px" }}>
            {/* ✅ NEW: pop-out button */}
            <button onMouseDown={(e) => e.stopPropagation()} onClick={popOut} title="Float over other windows" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "6px", padding: "3px 8px", fontSize: "13px", cursor: "pointer", fontFamily: "Georgia, serif" }}>⤢</button>
            <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setMinimized(false)} style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", cursor: "pointer", fontFamily: "Georgia, serif" }}>expand</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", padding: "12px 14px", gap: "8px" }}>
          {isEmail ? (
            <>
              <div style={{ fontSize: `${pipFontSize - 1}px`, color: "#888", borderBottom: "1px solid #eee", paddingBottom: "6px", fontFamily: "Georgia, serif" }}>
                <strong style={{ color: "#1a2744" }}>subject:</strong> {activeTemplate?.subject}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: `${pipFontSize}px`, color: "#333", lineHeight: "1.65", fontFamily: "Georgia, serif", whiteSpace: "pre-wrap" }}>{activeTemplate?.message}</div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: `${pipFontSize - 1}px`, fontWeight: "700", color: "#1a2744", letterSpacing: "0.06em", fontFamily: "Georgia, serif" }}>talking points:</div>
              <div style={{ flex: 1 }}>
                {activeTemplate?.points?.map((point, i) => (
                  <div key={i} style={{ padding: "5px 0", borderBottom: "1px solid #f0ede8", fontSize: `${pipFontSize}px`, color: "#444", fontFamily: "Georgia, serif" }}>{point}</div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ padding: "10px 14px", borderTop: "1px solid #eee", flexShrink: 0, display: "flex", gap: "8px", alignItems: "center" }}>
          <button onMouseDown={(e) => e.stopPropagation()} onClick={copyToClipboard} style={{ flex: 1, padding: "8px", background: copied ? "#27a96c" : "#2d5fa3", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontFamily: "Georgia, serif", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }}>
            {copied ? "copied!" : isEmail ? "copy message" : "copy talking points"}
          </button>
          <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setPipFontSize(s => Math.max(9, s - 1))} style={{ width: "30px", height: "30px", background: "#f0ede8", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a2744", fontWeight: "700", flexShrink: 0 }}>−</button>
          <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setPipFontSize(s => Math.min(20, s + 1))} style={{ width: "30px", height: "30px", background: "#f0ede8", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a2744", fontWeight: "700", flexShrink: 0 }}>+</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#f4f1eb" }}>
      <div style={{ background: "linear-gradient(135deg, #1a2744 0%, #2d4a7a 60%, #3d6b9e 100%)", padding: "32px 40px 0", position: "relative" }}>
        <button onClick={() => setMinimized(true)}
          style={{ position: "absolute", top: "16px", right: "20px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "8px", padding: "5px 14px", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "6px" }}
          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
          <span style={{ fontSize: "14px" }}>⊟</span> minimize
        </button>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "300", letterSpacing: "0.02em", margin: "0 0 28px", fontStyle: "italic" }}>
          Email & phone templates
        </h1>
        <div style={{ display: "flex" }}>
          {["about", "email", "phone"].map((tab) => (
            <button key={tab} onClick={() => handleTabChange(tab)} style={{ padding: "10px 28px", background: activeTab === tab ? "#1a2744" : "transparent", color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.75)", border: "none", cursor: "pointer", fontSize: "15px", fontFamily: "inherit", fontWeight: activeTab === tab ? "600" : "400", letterSpacing: "0.04em", borderRadius: "6px 6px 0 0", transition: "all 0.2s" }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 140px)" }}>

        {activeTab === "about" && (
          <div style={{ flex: 1, padding: "48px 56px", overflowY: "auto", height: "100%" }}>
            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2ddd5", padding: "44px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", maxWidth: "760px" }}>
              <p style={{ fontSize: "13px", fontWeight: "700", color: "#2d5fa3", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>a personal note</p>
              <h2 style={{ fontSize: "28px", fontWeight: "300", color: "#1a2744", fontStyle: "italic", marginBottom: "28px", lineHeight: "1.3" }}>why I built this</h2>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.85", marginBottom: "22px" }}>
                After a layoff, I found myself in the middle of a career transition and I wasn't alone. Suddenly, I found myself more active than ever in the communities I had been part of for a long time, and I started to notice something. Driven, capable, talented people were quietly struggling with one specific part of the job search.
              </p>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.85", marginBottom: "22px" }}>Not the applications. The <em>connecting</em>.</p>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.85", marginBottom: "22px" }}>
                I was told by a professional in the job search industry that follow ups and networking were a must-have and that 90% of my time should be spent on connecting with people, not just submitting applications. And when I looked around at my community, I saw the same pattern: this was exactly where so many of us were getting stuck.
              </p>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.85", marginBottom: "32px" }}>
                For those of us who are neurodivergent, this kind of unstructured social communication can feel especially overwhelming. It doesn't mean we're less capable. It just means we sometimes need a place to start.
              </p>
              <div style={{ borderLeft: "3px solid #2d5fa3", paddingLeft: "24px", marginBottom: "32px" }}>
                <p style={{ fontSize: "16px", color: "#1a2744", lineHeight: "1.8", fontStyle: "italic", margin: 0 }}>
                  "This tool is a guide, a scaffold to lean on while you find your footing. Use the minimized widget alongside your email or LinkedIn so you always have a reference nearby. Read the template, then put it in your own words."
                </p>
              </div>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.85", marginBottom: "22px" }}>
                The placeholders in each template are intentional. They are your invitation to personalize, to think, to practice.
              </p>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.85", marginBottom: "40px" }}>
                I have the utmost confidence that with practice, we won't need this widget anymore. That's not a loss, that's the whole point. The goal was never dependency. It's growth.
              </p>
              <div style={{ background: "#f4f1eb", borderRadius: "8px", padding: "24px 28px", borderTop: "3px solid #2d5fa3" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#1a2744", letterSpacing: "0.08em", marginBottom: "12px", textTransform: "uppercase" }}>how to use the widget</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "Select the email or phone tab and find the template that matches your situation.",
                    "Click minimize. The widget will float on your screen, ready to move wherever you need it.",
                    "Click ⤢ in the widget header to pop it out into a floating window you can drag over Gmail or LinkedIn.",
                    "Use the template as a guide. Read each line, then write it in your own voice.",
                    "Copy the full message when you're ready, or type it out from scratch using the structure.",
                    "With time and practice, you'll need it less and less. That's the goal."
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#2d5fa3", color: "#fff", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{i + 1}</div>
                      <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7", margin: 0 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" />
                <p style={{ fontSize: "28px", color: "#aaa", marginTop: "36px", textAlign: "right", fontFamily: "'Dancing Script', cursive", lineHeight: 1 }}>-Lillian</p>
              </>
            </div>
          </div>
        )}

        {activeTab !== "about" && (
          <div style={{ width: "280px", minWidth: "240px", background: "#fff", borderRight: "1px solid #e2ddd5", padding: "24px 0", overflowY: "auto" }}>
            {Object.entries(templates).map(([category, items]) => (
              <div key={category} style={{ marginBottom: "4px" }}>
                <button onClick={() => toggleCategory(category)} style={{ width: "100%", textAlign: "left", padding: "8px 20px", background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "700", color: "#1a2744", letterSpacing: "0.05em", textTransform: "lowercase", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit" }}>
                  <span>{category} ({items.length})</span>
                  <span style={{ fontSize: "10px", opacity: 0.6 }}>{openCategories[category] ? "▲" : "▼"}</span>
                </button>
                {openCategories[category] && items.map((tpl) => (
                  <button key={tpl.id} onClick={() => { selectTemplate(tpl); setActiveCategory(category); }} style={{ width: "100%", textAlign: "left", padding: "7px 20px 7px 32px", background: activeTemplate?.id === tpl.id ? "#e8f0f8" : "none", border: "none", borderLeft: activeTemplate?.id === tpl.id ? "3px solid #2d4a7a" : "3px solid transparent", cursor: "pointer", fontSize: "13px", color: activeTemplate?.id === tpl.id ? "#1a2744" : "#555", fontFamily: "inherit", transition: "all 0.15s", lineHeight: "1.4" }}>
                    {tpl.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab !== "about" && (
          <div style={{ flex: 1, padding: "32px 40px", maxWidth: "760px" }}>
            {activeTab === "email" ? (
              <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2ddd5", padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontSize: "13px", color: "#444", marginBottom: "6px" }}><strong>from :</strong> <span style={{ color: "#666" }}>your name &lt;your@email.com&gt;</span></div>
                  <div style={{ fontSize: "13px", color: "#444" }}><strong>reply to :</strong> <span style={{ color: "#666" }}>your@email.com</span></div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1a2744", marginBottom: "6px", letterSpacing: "0.04em" }}>to :</label>
                  <input value={toEmail} onChange={(e) => setToEmail(e.target.value)} placeholder="Enter email address here" style={{ width: "100%", padding: "10px 14px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box", outline: "none", color: "#333" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1a2744", marginBottom: "6px", letterSpacing: "0.04em" }}>subject line</label>
                  <input value={activeTemplate?.subject || ""} readOnly style={{ width: "100%", padding: "10px 14px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box", background: "#fafafa", color: "#333" }} />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1a2744", marginBottom: "6px", letterSpacing: "0.04em" }}>message</label>
                  <textarea value={activeTemplate?.message || ""} readOnly rows={16} style={{ width: "100%", padding: "14px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "13.5px", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", lineHeight: "1.7", background: "#fafafa", color: "#333" }} />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button style={{ padding: "11px 28px", background: "#2d5fa3", color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600", letterSpacing: "0.04em" }}
                    onMouseOver={(e) => e.target.style.background = "#1a3e6f"} onMouseOut={(e) => e.target.style.background = "#2d5fa3"}>send email</button>
                  <button onClick={copyToClipboard} style={{ padding: "11px 28px", background: copied ? "#27a96c" : "#f0ede8", color: copied ? "#fff" : "#1a2744", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600", letterSpacing: "0.04em", transition: "all 0.2s" }}>
                    {copied ? "copied!" : "copy message"}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2ddd5", padding: "36px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: "26px", fontWeight: "300", color: "#1a2744", marginBottom: "28px", fontStyle: "italic", letterSpacing: "0.01em" }}>{activeTemplate?.label}</h2>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#1a2744", letterSpacing: "0.08em", marginBottom: "20px", textTransform: "lowercase" }}>talking points:</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {activeTemplate?.points?.map((point, i) => (
                    <li key={i} style={{ fontSize: "15px", color: "#444", padding: "8px 0", borderBottom: i < activeTemplate.points.length - 1 ? "1px solid #f0ede8" : "none", lineHeight: "1.6" }}>{point}</li>
                  ))}
                </ul>
                <button onClick={copyToClipboard} style={{ marginTop: "28px", padding: "11px 28px", background: copied ? "#27a96c" : "#2d5fa3", color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600", letterSpacing: "0.04em", transition: "all 0.2s" }}>
                  {copied ? "copied!" : "copy talking points"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
