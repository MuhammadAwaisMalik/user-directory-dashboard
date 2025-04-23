// @ import pages
import HomePage from "@/js/pages/home";
// @ import components
import Loader from "@/js/components/loader";
import EmptyState from "@/js/components/emptyStates";
import ErrorMessage from "@/js/components/errorMessage";

export default async function Home() {
  let users = [];
  let errorMessage = "";
  let isLoading = false;

  try {
    isLoading = true;
    const res = await fetch("https://randomuser.me/api/?results=50");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    users = data.results;
  } catch (error) {
    errorMessage = error;
  } finally {
    isLoading = false;
  }

  if (isLoading) return <Loader />;
  if (errorMessage) return <ErrorMessage message={isError} />;
  if (users?.length === 0) return <EmptyState message="No users found." />;

  return <HomePage data={users} />;
}
