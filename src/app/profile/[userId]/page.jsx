import UserLongCard from "@/components/Cards/UserLongCard/UserLongCard";
import UserFeed from "@/components/Feed/UserFeed";
import Container from "@/components/Layouts/Container/Container";

export default function ProfilePage() {
  return (
    <Container>
      <div className="my-5" />
      {/* User Details Card */}
      <UserLongCard />
      {/* User Posts */}
      <h1 className="text-neutral-500 text-xl font-bold p-2 w-full text-left">
        Posts
      </h1>
      <UserFeed />
    </Container>
  );
}
