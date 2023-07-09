import { createSignal, createEffect, createResource } from "solid-js";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import UserInfo from "./components/UserInfo";
import { User } from "./types";

function App() {
  const [isLoading, setLoading] = createSignal(false);
  const [notFound, setNotFound] = createSignal(false);

  const fetchUser = async (id: string): Promise<User | null> => {
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 200));
      const res = await fetch(`https://api.github.com/users/${id}`);
      setNotFound(res.status === 404);
      setLoading(false);
      return res.json();
    } catch (error) {
      console.log(error);
      setLoading(false);
      return null;
    }
  };
  const [userId, setUserId] = createSignal<string | null>(null);
  const [user] = createResource(userId, fetchUser);

  createEffect(() => {
    console.log(user());
  });

  return (
    <div class="h-screen w-screen flex justify-center">
      <div class="flex flex-col mt-[1.9375rem] sm:mt-36 mx-6 sm:mx-[6.125rem] w-full max-w-[45.625rem]">
        <Header />
        <main>
          <SearchBox setUserId={setUserId} notFound={notFound} />
          <UserInfo isLoading={isLoading} user={user} />
        </main>
      </div>
    </div>
  );
}

export default App;
