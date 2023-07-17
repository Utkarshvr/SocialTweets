import CreatePostCard from "@/components/Cards/CreatePosts/CreatePostCard";
import Feed from "@/components/Feed/Feed";
import Container from "@/components/Layouts/Container/Container";
import CreatePostModal from "@/components/Modals/CreatePostModal";

export const metadata = {
  title: "Feed | SocialTweets",
  description: "Create by create next app",
};
export default function FeedPage() {
  return (
    <Container>
      <CreatePostCard />
      <hr className="my-2 border-zinc-900" />
      <Feed />
      <CreatePostModal />
    </Container>
  );
}
