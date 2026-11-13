import { createFileRoute } from "@tanstack/react-router";
import { MembersFrame } from "@/components/MembersFrame";

export const Route = createFileRoute("/faith-app")({
  component: FaithAppView,
  head: () => ({
    meta: [
      { title: "Members Area | Plan Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      {
        name: "description",
        content:
          "Access your Faith & Abundance materials, prayer audios, and daily declarations.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function FaithAppView() {
  return <MembersFrame />;
}
