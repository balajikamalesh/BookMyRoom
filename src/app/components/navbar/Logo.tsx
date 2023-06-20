"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Heading from "../Heading";

const Logo = () => {
  const router = useRouter();
  return (
    <div>
      {/* <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo2.png"
      /> */}
      <div onClick={() => router.push("/")} className="hidden md:block cursor-pointer">
      <Heading
        title="BookMyRoom"
        color="rgb(244,63,94)"
      />
      </div>
    </div>
  );
};

export default Logo;
