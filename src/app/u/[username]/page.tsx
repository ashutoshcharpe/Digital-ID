import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMemberByUsername, getAllMemberUsernames, COUNCIL_INFO } from "@/data/members";
import MemberProfile from "@/components/council/MemberProfile";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateStaticParams() {
  const usernames = getAllMemberUsernames();
  return usernames.map((username) => ({ username }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const member = getMemberByUsername(username);

  if (!member) {
    return {
      title: "Council Member Not Found • Student Council",
      description: "The requested Student Council digital ID record could not be verified."
    };
  }

  const pageTitle = `${member.name} — ${member.designation} | ${COUNCIL_INFO.fullTitle}`;
  const pageDescription = `Official Digital Identity of ${member.name}, ${member.designation} (${member.tenure}) at ${member.college}.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "profile",
      images: [
        {
          url: member.photo,
          width: 800,
          height: 1000,
          alt: `${member.name} - ${member.designation}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [member.photo]
    }
  };
}

export default async function MemberPage({ params }: PageProps) {
  const { username } = await params;
  const member = getMemberByUsername(username);

  if (!member) {
    notFound();
  }

  return <MemberProfile member={member} />;
}
