"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  const profileImage = session?.user.image;
  const isUserLoggedIn = session?.user;

  useEffect(() => {
    const getAllProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    getAllProviders();
  }, []);

  return (
    <nav className="flex-between w-full p-3 mb-16">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Promptopia Logo"
          src="/assets/images/logo.svg"
          width={40}
          height={40}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <DesktopNavigation
        isUserLoggedIn={isUserLoggedIn}
        providers={providers}
        image={profileImage}
      />
      <MobileNavigation
        isUserLoggedIn={isUserLoggedIn}
        providers={providers}
        image={profileImage}
      />
    </nav>
  );
};

const DesktopNavigation = ({ isUserLoggedIn, providers, image }) => {
  return (
    <div className="sm:flex hidden">
      {isUserLoggedIn ? (
        <div className="flex-between gap-4">
          <Link href="/prompts/create" className="primary_button">
            Create Prompt
          </Link>
          <button type="button" onClick={signOut} className="secondary_button">
            Sign Out
          </button>
          <Link href="/profile">
            <Image
              alt="Profile"
              loader={() => image}
              src={image}
              width={40}
              height={40}
              className="rounded-[50%]"
            />
          </Link>
        </div>
      ) : (
        <Providers providers={providers} />
      )}
    </div>
  );
};

const MobileNavigation = ({ isUserLoggedIn, providers, image }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="sm:hidden flex relative">
      {isUserLoggedIn ? (
        <div>
          <Image
            alt="Profile"
            loader={() => image}
            src={image}
            width={40}
            height={40}
            className="cursor-pointer rounded-[50%]"
            onClick={() => {
              setToggleDropdown((previousState) => !previousState);
            }}
          />
        </div>
      ) : (
        <Providers providers={providers} />
      )}
      <MobileNavigationDropdown
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
      />
    </div>
  );
};

const Providers = ({ providers }) => {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="primary_button"
          >
            Sign In
          </button>
        ))}
    </>
  );
};

const MobileNavigationDropdown = ({ toggleDropdown, setToggleDropdown }) => {
  return (
    <>
      {toggleDropdown && (
        <div className="dropdown">
          <Link
            href="/profile"
            onClick={() => {
              setToggleDropdown(false);
            }}
          >
            My Profile
          </Link>
          <Link
            href="/prompts/create"
            onClick={() => {
              setToggleDropdown(false);
            }}
          >
            Create Prompt
          </Link>
          <button
            type="button"
            onClick={() => {
              setToggleDropdown(false);
              signOut();
            }}
            className="primary_button w-full mt-3"
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default Nav;
