import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SearchComponent } from "./components/SearchComponents";
import { GoogleMap } from "@react-google-maps/api";
import GoogleMapView from "./components/GoogleMapView";
export default async function Home() {
  const session = await getServerSession(options);
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signin");
  //   },
  // });
  const data = [
    "test",
    "testing",
    "test 1",
    "test 2",
    "testing 1",
    "data",
    "kevin",
    "jason",
  ];
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <>
      {session ? (
        <div>
          <div>{session.user?.name}</div>
          <div>{session.user?.email}</div>
          {/* <button className="text black">login</button> */}
          {/* <SearchComponent data={data} /> */}
          <GoogleMapView />
        </div>
      ) : (
        <div>
          {/* <a href="/">Login</a> */}
          <a className="link" href="https://google.com">
            Google
          </a>
          <a className="link" href="https://twitter.com">
            twitter
          </a>
          <a className="link" href="https://genshin.com">
            genshin
          </a>
        </div>
      )}
    </>
  );
}
