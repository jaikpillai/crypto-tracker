import Link from "next/link";
import appInfo from "../../general";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <div className="flex flex-col gap-5 md:flex-row border-t justify-between p-4  w-full border-gray-700 bg-gray-900 md:px-5 px-2 xl:px-60">
      {/* App Name */}
      <div className="flex flex-col md:flex-row items-center gap-2">
        <Link href={"/"}>
          <a className="text-xl font-bold text-white ">{appInfo.app_name}</a>
        </Link>
        <p className="hidden md:block text-gray-500">|</p>
        <p className="text-sm text-gray-300">{appInfo.brief}</p>
      </div>

      <div className="gap-5 flex  flex-col md:flex-row items-center">
        {/* Site Navigation Links */}
        <div className="flex gap-3">
          <Link href={"/about"}>
            <a className="font-medium text-gray-600 hover:text-primary-600">
              ABOUT
            </a>
          </Link>
          <p className="text-gray-500">|</p>
          <Link href={"/contact"}>
            <a className="font-medium text-gray-600 hover:text-primary-600">
              CONTACT
            </a>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-3">
          <Link href={appInfo.links.github}>
            <a target={"_blank"}>
              <GitHubLogoIcon className="h-8 w-8 fill-gray-400 text-gray-700 hover:text-primary-600" />
            </a>
          </Link>
          <Link href={appInfo.links.linkedin}>
            <a target={"_blank"}>
              <LinkedInLogoIcon className="h-8 w-8 fill-gray-400 text-gray-700 hover:text-primary-600" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
