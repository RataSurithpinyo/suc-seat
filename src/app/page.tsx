import Image from "next/image";
import Link from "next/link";
import Login from "./(LogandSign)/signin/page";
import { searchPlaces } from "@/libs/grpc-client";
export default function Home() {
  // searchPlaces({ name: "toilet" })
  return (
    <Login/>
  );
}
