"use client";

import Link from "next/link";
import {
  PiFacebookLogoLight,
  PiGithubLogoLight,
  PiInstagramLogoLight,
  PiLinkedinLogoLight,
  PiMediumLogoLight,
  PiSpotifyLogoLight,
  PiXLogoLight,
  PiCompassRoseLight,
  PiYoutubeLogoLight,
} from "react-icons/pi";

import IconLink from "@/components/links/icon";

const Header = () => (
  <header className="flex flex-col items-center text-center">
    <div className="text-lg font-light lowercase transition-all hover:opacity-70">
      <Link href="/">Ziyad Edher</Link>
    </div>

    <div className="flex flex-row space-x-2 pt-2">
      <IconLink
        href="https://twitter.com/ziyadedher"
        label="Twitter"
        isExternal
      >
        <PiXLogoLight size={20} />
      </IconLink>
      <IconLink
        href="https://linkedin.com/in/ziyad-edher"
        label="LinkedIn"
        isExternal
      >
        <PiLinkedinLogoLight size={20} />
      </IconLink>
      <IconLink href="https://github.com/ziyadedher" label="GitHub" isExternal>
        <PiGithubLogoLight size={20} />
      </IconLink>
      <IconLink
        href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvr"
        label="Spotify"
        isExternal
      >
        <PiSpotifyLogoLight size={20} />
      </IconLink>
      <IconLink
        href="https://facebook.com/ziyadedher"
        label="Facebook"
        isExternal
      >
        <PiFacebookLogoLight size={20} />
      </IconLink>
      <IconLink
        href="https://instagram.com/ziyad.edher"
        label="Instagram"
        isExternal
      >
        <PiInstagramLogoLight size={20} />
      </IconLink>
      <IconLink
        href="https://www.lesswrong.com/users/ziyad-edher"
        label="LessWrong"
        isExternal
      >
        <PiCompassRoseLight size={20} />
      </IconLink>
      <IconLink
        href="https://www.youtube.com/@ziyadedher"
        label="YouTube"
        isExternal
      >
        <PiYoutubeLogoLight size={20} />
      </IconLink>
    </div>
  </header>
);

export default Header;
