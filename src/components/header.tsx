import Link from "next/link";
import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
  TwitterLogo,
} from "phosphor-react";

import IconLink from "../components/links/icon";
import Anchor from "../logic/anchor";

const Header = () => (
  <header className="flex flex-col py-12 text-center">
    <div className="text-2xl font-light uppercase hover:opacity-70 transition-all">
      <Link href="/" passHref>
        <Anchor>Ziyad Edher</Anchor>
      </Link>
    </div>

    <div className="flex flex-row pt-2 space-x-2">
      <IconLink
        href="https://twitter.com/ziyadedher"
        label="Twitter"
        isExternal
      >
        <TwitterLogo size={24} weight="light" />
      </IconLink>
      <IconLink
        href="https://linkedin.com/in/ziyad-edher"
        label="LinkedIn"
        isExternal
      >
        <LinkedinLogo size={24} weight="light" />
      </IconLink>
      <IconLink href="https://github.com/ziyadedher" label="GitHub" isExternal>
        <GithubLogo size={24} weight="light" />
      </IconLink>
      <IconLink
        href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvrr"
        label="Spotify"
        isExternal
      >
        <SpotifyLogo size={24} weight="light" />
      </IconLink>
      <IconLink
        href="https://facebook.com/ziyadedher"
        label="Facebook"
        isExternal
      >
        <FacebookLogo size={24} weight="light" />
      </IconLink>
      <IconLink
        href="https://instagram.com/ziyadedher"
        label="Instagram"
        isExternal
      >
        <InstagramLogo size={24} weight="light" />
      </IconLink>
    </div>
  </header>
);

export default Header;
