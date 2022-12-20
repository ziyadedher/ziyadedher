import { Dialog, Transition } from "@headlessui/react";
import { PerspectiveCamera, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import Link from "next/link";
import { X } from "phosphor-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-shadow -- custom Image
import Image from "../../components/image";
import Anchor from "../../logic/anchor";
import { getImageWithBlur } from "../../logic/image_with_blur";
import { getStorageURI } from "../../utils/storage";

import type { ImageWithBlur } from "../../logic/image_with_blur";
import type { GetStaticProps, NextPage } from "next";
import type { Mesh } from "three";

const OttawexitBanner: React.FunctionComponent = () => {
  const [rotation, setRotation] = useState(0);
  const [textMesh, setTextMesh] = useState<Mesh | null>(null);

  useEffect(() => {
    if (textMesh === null) {
      return;
    }
    textMesh.geometry.center();
  }, [textMesh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => r + 0.25);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Canvas>
        <PerspectiveCamera makeDefault fov={1.25} />

        {/* eslint-disable-next-line react/no-unknown-property -- ThreeJS intrinsic */}
        <ambientLight intensity={0.1} />

        <Text3D
          ref={setTextMesh}
          font={getStorageURI("goofs/ottawexit/comic_neue_bold.json")}
          size={10}
          height={1}
          curveSegments={32}
          bevelEnabled
          bevelThickness={2}
          bevelSize={1}
          bevelOffset={0}
          bevelSegments={8}
          letterSpacing={2}
          position={[0, 0, -1000]}
          rotation={[0, (rotation * Math.PI) / 180, 0]}
        >
          Ottawexit Portal
          <meshNormalMaterial />
        </Text3D>
      </Canvas>
    </div>
  );
};

interface ActionDialogProps {
  readonly title?: string;
  readonly description?: string;
  readonly children?: React.ReactNode;

  readonly isOpen: boolean;
  readonly onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const ActionDialog: React.FunctionComponent<ActionDialogProps> = ({
  title,
  description,
  children,
  isOpen,
  onClose: handleClose,
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    {/* eslint-disable-next-line react/forbid-component-props -- Dialog */}
    <Dialog as="div" className="relative z-10" onClose={handleClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* eslint-disable-next-line react/forbid-component-props -- Dialog */}
            <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <button
                type="button"
                className="absolute top-3 right-3 opacity-25 transition-all hover:opacity-50"
                onClick={handleClose}
              >
                <X size={16} />
              </button>
              <Dialog.Title
                as="h3"
                // eslint-disable-next-line react/forbid-component-props -- Dialog
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

interface ComingSoonActionDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const ComingSoonActionDialog: React.FunctionComponent<
  ComingSoonActionDialogProps
> = ({ isOpen, onClose: handleClose }) => (
  <ActionDialog isOpen={isOpen} onClose={handleClose}>
    <div className="m-16 flex flex-col items-center">
      <span className="text-3xl font-bold">COMING SOON&trade;</span>
    </div>
  </ActionDialog>
);

interface ActionSectionProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const ActionSection: React.FunctionComponent<ActionSectionProps> = ({
  title,
  children,
}) => (
  <div className="flex flex-col gap-8 rounded-2xl p-8 backdrop-blur-xl backdrop-brightness-50">
    <h3 className="text-center text-base font-bold">{title}</h3>
    <div className="flex flex-col gap-4 text-sm">{children}</div>
  </div>
);

interface TextLinkProps {
  readonly href: string;
  readonly isExternal?: boolean;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const TextLink: React.FunctionComponent<TextLinkProps> = ({
  href,
  isExternal = false,
  children,
}) => (
  <span className="not-prose underline decoration-1 underline-offset-4 transition-all hover:opacity-70">
    <Link href={href} passHref legacyBehavior>
      <Anchor shouldOpenInNewPage={isExternal}>{children}</Anchor>
    </Link>
  </span>
);

interface ActionProps {
  readonly onClick: () => void;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const Action: React.FunctionComponent<ActionProps> = ({
  onClick: handleClick,
  children,
}) => (
  <button
    type="button"
    className="not-prose inline-block text-left underline decoration-1 underline-offset-4 transition-all hover:opacity-70"
    onClick={handleClick}
  >
    {children}
  </button>
);

const PropagandaSection: React.FunctionComponent = () => (
  <ActionSection title="Propaganda">
    <p>
      <TextLink href="http://greg.guevara.angelfire.com/" isExternal>
        Read the Campaign Platform
      </TextLink>
    </p>
    <p>
      <TextLink href="https://www.youtube.com/c/Jregory" isExternal>
        Keep Up To Date With Developments
      </TextLink>
    </p>
  </ActionSection>
);

const ImperialismAndMilitarizationSection: React.FunctionComponent = () => {
  const [isEnlistDialogOpen, setIsEnlistDialogOpen] = useState(false);
  const [isAnnexDialogOpen, setIsAnnexDialogOpen] = useState(false);

  const handleEnlistDialogClose = useCallback(() => {
    setIsEnlistDialogOpen(false);
  }, []);
  const handleAnnexDialogClose = useCallback(() => {
    setIsAnnexDialogOpen(false);
  }, []);

  const handleEnlist = useCallback(() => {
    setIsEnlistDialogOpen(true);
  }, []);
  const handleAnnex = useCallback(() => {
    setIsAnnexDialogOpen(true);
  }, []);

  return (
    <ActionSection title="Imperialism &amp; Militarization">
      <div>
        <ComingSoonActionDialog
          isOpen={isEnlistDialogOpen}
          onClose={handleEnlistDialogClose}
        />
        <p>
          <Action onClick={handleEnlist}>Enlist</Action>
        </p>
      </div>
      <div>
        <ComingSoonActionDialog
          isOpen={isAnnexDialogOpen}
          onClose={handleAnnexDialogClose}
        />
        <p>
          <Action onClick={handleAnnex}>Request an Annex</Action>
        </p>
      </div>
    </ActionSection>
  );
};

const CommerceSection: React.FunctionComponent = () => {
  const [isLocalDialogOpen, setIsLocalDialogOpen] = useState(false);
  const [isInternationalDialogOpen, setIsInternationalDialogOpen] =
    useState(false);

  const handleLocalDialogClose = useCallback(() => {
    setIsLocalDialogOpen(false);
  }, []);
  const handleInternationalDialogClose = useCallback(() => {
    setIsInternationalDialogOpen(false);
  }, []);

  const handleLocal = useCallback(() => {
    setIsLocalDialogOpen(true);
  }, []);
  const handleInternational = useCallback(() => {
    setIsInternationalDialogOpen(true);
  }, []);

  return (
    <ActionSection title="Commerce">
      <div>
        <ComingSoonActionDialog
          isOpen={isLocalDialogOpen}
          onClose={handleLocalDialogClose}
        />
        <p>
          <Action onClick={handleLocal}>
            Apply for a Local Business License
          </Action>
        </p>
      </div>
      <div>
        <ComingSoonActionDialog
          isOpen={isInternationalDialogOpen}
          onClose={handleInternationalDialogClose}
        />
        <p>
          <Action onClick={handleInternational}>
            Apply for an International Business or Chain License
          </Action>
        </p>
      </div>
    </ActionSection>
  );
};

const JobsAndHousingSection: React.FunctionComponent = () => {
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isHousingDialogOpen, setIsHousingDialogOpen] = useState(false);

  const handleJobDialogClose = useCallback(() => {
    setIsJobDialogOpen(false);
  }, []);
  const handleHousingDialogClose = useCallback(() => {
    setIsHousingDialogOpen(false);
  }, []);

  const handleJob = useCallback(() => {
    setIsJobDialogOpen(true);
  }, []);
  const handleHousing = useCallback(() => {
    setIsHousingDialogOpen(true);
  }, []);

  return (
    <ActionSection title="Jobs &amp; Housing">
      <div>
        <ComingSoonActionDialog
          isOpen={isJobDialogOpen}
          onClose={handleJobDialogClose}
        />
        <p>
          <Action onClick={handleJob}>
            Claim Universal Basic Government Job
          </Action>
        </p>
      </div>
      <div>
        <ComingSoonActionDialog
          isOpen={isHousingDialogOpen}
          onClose={handleHousingDialogClose}
        />
        <p>
          <Action onClick={handleHousing}>
            Petition For Housing Development
          </Action>
        </p>
      </div>
    </ActionSection>
  );
};

const ImmigrationAndEmigrationSection: React.FunctionComponent = () => {
  const [isImmigrateDialogOpen, setIsImmigrateDialogOpen] = useState(false);
  const [isEmigrateDialogOpen, setIsEmigrateDialogOpen] = useState(false);

  const handleImmigrateDialogClose = useCallback(() => {
    setIsImmigrateDialogOpen(false);
  }, []);
  const handleEmigrateDialogClose = useCallback(() => {
    setIsEmigrateDialogOpen(false);
  }, []);

  const handleImmigrate = useCallback(() => {
    setIsImmigrateDialogOpen(true);
  }, []);
  const handleEmigrate = useCallback(() => {
    setIsEmigrateDialogOpen(true);
  }, []);
  return (
    <ActionSection title="Immigration &amp; Emigration">
      <div>
        <ActionDialog
          isOpen={isImmigrateDialogOpen}
          onClose={handleImmigrateDialogClose}
        >
          <div className="flex flex-col items-center">uh, nope.</div>
        </ActionDialog>
        <p>
          <Action onClick={handleImmigrate}>Request to Enter Ottawa</Action>
        </p>
      </div>
      <div>
        <ActionDialog
          isOpen={isEmigrateDialogOpen}
          onClose={handleEmigrateDialogClose}
        >
          <div className="flex flex-col items-center">
            we&apos;ll get to it when we get to it
          </div>
        </ActionDialog>
        <p>
          <Action onClick={handleEmigrate}>Request To Leave Ottawa</Action>
        </p>
      </div>
    </ActionSection>
  );
};

const OttawallSection: React.FunctionComponent = () => {
  const [isGrowDialogOpen, setIsGrowDialogOpen] = useState(false);
  const [isShrinkDialogOpen, setIsShrinkDialogOpen] = useState(false);

  const handleGrowDialogClose = useCallback(() => {
    setIsGrowDialogOpen(false);
  }, []);
  const handleShrinkDialogClose = useCallback(() => {
    setIsShrinkDialogOpen(false);
  }, []);

  const handleGrow = useCallback(() => {
    setIsGrowDialogOpen(true);
  }, []);
  const handleShrink = useCallback(() => {
    setIsShrinkDialogOpen(true);
  }, []);

  return (
    <ActionSection title="Ottawall">
      <div>
        <ComingSoonActionDialog
          isOpen={isGrowDialogOpen}
          onClose={handleGrowDialogClose}
        />
        <p>
          <Action onClick={handleGrow}>Grow the Ottawall</Action>
        </p>
      </div>
      <div>
        <ActionDialog
          isOpen={isShrinkDialogOpen}
          onClose={handleShrinkDialogClose}
        >
          <div className="flex flex-col items-center">no</div>
        </ActionDialog>
        <p>
          <Action onClick={handleShrink}>Shrink the Ottawall</Action>
        </p>
      </div>
    </ActionSection>
  );
};

interface OttawexitProps {
  readonly images: {
    readonly jregSocietyFace: ImageWithBlur;
  };
}

const Ottawexit: NextPage<OttawexitProps> = ({ images }: OttawexitProps) => (
  <>
    <Head>
      <title>Ottawexit Portal</title>
      <meta
        name="description"
        content="Your safe home for everything related to the Ottawexit."
      />

      <meta property="og:title" content="Ottawexit Portal" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ottawexit.ca" />
      <meta property="og:image" content={images.jregSocietyFace.url} />
      <meta
        property="og:description"
        content="Your safe home for everything related to the Ottawexit."
      />
      <meta property="og:site_name" content="Ottawexit Portal" />
      <meta property="twitter:card" content="summary" />
    </Head>
    <div className="h-screen items-center justify-center overflow-y-auto text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          alt="Gregory 'Jreg' Guevara wearing a clown wig with white makeup and the word 'Society' drawn on his forehead in red lipstick"
          image={images.jregSocietyFace}
          layout="fill"
        />
      </div>

      <div className="flex min-h-full w-full flex-col items-center justify-between gap-16 py-16">
        <div className="h-16 w-full sm:h-24 md:h-32 lg:h-48 xl:h-64">
          <OttawexitBanner />
        </div>

        <div className="grid grid-cols-1 gap-16 text-sm font-light md:grid-cols-2 lg:grid-cols-3">
          <PropagandaSection />
          <ImperialismAndMilitarizationSection />
          <CommerceSection />
          <JobsAndHousingSection />
          <ImmigrationAndEmigrationSection />
          <OttawallSection />
        </div>

        <div className="flex flex-col gap-2 rounded-2xl p-8 backdrop-blur-xl backdrop-brightness-50">
          <h3 className="text-center text-xs font-bold">
            Ottawa National Anthem
          </h3>
          <div className="flex flex-row gap-8 text-xs font-light">
            <div>
              <p>We love the government</p>
              <p>We love our giant wall</p>
              <p>We don&apos;t take risks</p>
              <p>No we take none at all!</p>
            </div>
            <div>
              <p>Ottawa! Ottawa!</p>
              <p>SSC and DND!</p>
              <p>Ottawa! Ottawa!</p>
              <p>CRA, RCMP!</p>
            </div>
            <div>
              <p>Ottawa! Ottawa!</p>
              <p>FAC and IRCC</p>
              <p>Ottawa! Ottawa!</p>
              <p>TBS and GAC!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const getStaticProps: GetStaticProps<OttawexitProps> = async () => ({
  props: {
    images: {
      jregSocietyFace: await getImageWithBlur(
        getStorageURI("goofs/ottawexit/jreg_society_face.jpg"),
        60
      ),
    },
  },
});

export { getStaticProps };
export default Ottawexit;
