import { MEMBERS_DATA } from "@/data/members";
import MemberProfile from "@/components/council/MemberProfile";

export default function HomePage() {
  const defaultMember = MEMBERS_DATA["ashutosh-charpe"];
  return <MemberProfile member={defaultMember} />;
}
