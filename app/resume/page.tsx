import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
  title: "Resume | Bikramdeep Singh",
  description: "View and download Bikramdeep Singh's resume.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
