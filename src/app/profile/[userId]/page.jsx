import UserLongCard from "@/components/Cards/UserLongCard/UserLongCard";
import UserFeed from "@/components/Feed/UserFeed";
import Container from "@/components/Layouts/Container/Container";
import { baseUrl, userRoute } from "@/services/routes";

export async function generateMetadata({ params }) {
  try {
    // fetch data
    const user = await fetch(`${baseUrl}${userRoute}/${params?.userId}`).then(
      (res) => res.json()
    );

    return {
      title: user?.username,
    };
  } catch (error) {
    // Handle the error appropriately, log it, or provide a default value for 'title'
    console.error("Error fetching user data:", error);
    return {
      title: "Profile | Strings", // Provide a fallback title or handle the error accordingly
    };
  }
}

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
