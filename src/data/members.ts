export interface SocialProfile {
  username?: string;
  name?: string;
  url: string;
  actionText?: string;
}

export interface CouncilMember {
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  designation: string;
  department: string;
  college: string;
  tenure: string;
  memberId: string;
  badgeCode: string;
  category: "Executive Board" | "Secretariat" | "Department Head" | "Council Representative";
  photo: string;
  campusPhoto: string;
  introNote?: string;
  message: string;
  roleDescription: {
    roleTitle: string;
    domain: string;
    responsibilitySummary: string;
    focusAreas: string[];
  };
  socials: {
    instagram: SocialProfile;
    linkedin: SocialProfile;
    contact: {
      type: "whatsapp" | "email" | "portal";
      label: string;
      actionUrl: string;
      displayHandle: string;
      note?: string;
    };
  };
  verification: {
    status: "ACTIVE" | "VERIFIED" | "HONORARY";
    authCode: string;
    issuedAt: string;
    expiresAt: string;
    securityLevel: string;
  };
}

export const COUNCIL_INFO = {
  institution: "AISSMS Institute of Information Technology",
  institutionShort: "AISSMS IOIT",
  councilName: "Student Council",
  fullTitle: "Student Council • AISSMS IOIT",
  tenureYear: "2026–27",
  motto: "LEARN • BUILD • COLLABORATE • CREATE • GROW",
  visionStatement: "A BRIGHTER TOMORROW, TOGETHER.",
  logoPath: "/assets/council/student_council_logo.png",
  campusPhotoPath: "/assets/campus/aissms_campus.png",
  portalUrl: "https://council.aissmsioit.org",
  contactEmail: "studentcouncil@aissmsioit.org",
  copyrightYear: "2026"
};

export const MEMBERS_DATA: Record<string, CouncilMember> = {
  "ashutosh-charpe": {
    username: "ashutosh-charpe",
    name: "Ashutosh Charpe",
    firstName: "Ashutosh",
    lastName: "Charpe",
    designation: "Joint Media Secretary",
    department: "Information Technology",
    college: "AISSMS Institute of Information Technology",
    tenure: "2026–27",
    memberId: "COUNCIL-2026-JMS-08",
    badgeCode: "STUDENT COUNCIL • 2026–27",
    category: "Secretariat",
    photo: "/assets/members/ashutosh_charpe.jpg",
    campusPhoto: "/assets/campus/aissms_campus.png",
    introNote: "Leading visual communications, campus storytelling and official media broadcasts.",
    message:
      "Serving the Student Council is more than holding a position — it is about turning ideas into action, giving students a voice, and creating moments that people remember. As Joint Media Secretary, I aim to capture, communicate and amplify the spirit of our campus.",
    roleDescription: {
      roleTitle: "Joint Media Secretary",
      domain: "Media & Communication",
      responsibilitySummary: "Media • Communication • Visual Storytelling",
      focusAreas: [
        "Campus Media Coverage & Broadcasts",
        "Visual Storytelling & Narrative Direction",
        "Council Digital Publications & Brand Systems",
        "Student Community Outreach & Public Relations"
      ]
    },
    socials: {
      instagram: {
        username: "@ashutosh_charpe",
        url: "https://instagram.com/ashutosh_charpe",
        actionText: "Follow on Instagram"
      },
      linkedin: {
        name: "Ashutosh Charpe",
        url: "https://www.linkedin.com/in/ashutosh-charpe",
        actionText: "Connect on LinkedIn"
      },
      contact: {
        type: "whatsapp",
        label: "WhatsApp / Contact",
        actionUrl: "https://wa.me/917620443842?text=Hello%20Ashutosh,%20reaching%20out%20via%20the%20official%20Student%20Council%20Digital%20ID.",
        displayHandle: "+91 76204 43842",
        note: "Official council correspondence & student initiatives"
      }
    },
    verification: {
      status: "ACTIVE",
      authCode: "AISSMS-COUNCIL-26-8842-JMS",
      issuedAt: "August 2026",
      expiresAt: "July 2027",
      securityLevel: "SECRETARIAT LEVEL-II"
    }
  }
};

export function getMemberByUsername(username: string): CouncilMember | undefined {
  const normalized = username.toLowerCase().trim();
  return MEMBERS_DATA[normalized];
}

export function getAllMemberUsernames(): string[] {
  return Object.keys(MEMBERS_DATA);
}

export function getAllMembers(): CouncilMember[] {
  return Object.values(MEMBERS_DATA);
}
