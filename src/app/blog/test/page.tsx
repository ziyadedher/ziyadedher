import {
  Article,
  Aside,
  CodeBlock,
  CodeInline,
  Section,
} from "@/components/blog";

export default function Page() {
  return (
    <Article
      category="some test category"
      title={
        <>
          doing a bit of a <CodeInline language="plain">think</CodeInline> on
          the title
        </>
      }
      subtitle="discussion of the Linux system boot from the ground up, through the lens of my kernel ring buffer messages"
      date={new Date(1970, 0, 1)}
    >
      <Section id="introduction">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Volutpat velit
        pulvinar tempus nascetur dolor quis curabitur habitant. Lacus curae
        facilisi id erat sem venenatis proin maecenas. Orci fermentum
        pellentesque purus suscipit mauris ac massa. Nostra iaculis taciti
        nulla; vulputate lectus maecenas. Faucibus nisi ornare posuere pulvinar
        sollicitudin eros. Dui commodo feugiat massa mattis habitasse lectus sed
        et. Venenatis pellentesque posuere litora luctus torquent eu duis erat.
        Metus nisi congue pulvinar phasellus{" "}
        <CodeInline language="bash">code</CodeInline> <code>asd</code> maximus
        fusce eleifend ridiculus. Duis congue nostra dapibus rutrum sociosqu sem
        aliquam arcu. Auctor arcu diam lacus non non. Donec parturient mus
        auctor pellentesque nisi justo eget quam diam. Integer justo
        <Aside id="1">
          Faucibus nisi ornare posuere pulvinar sollicitudin eros.
        </Aside>{" "}
        aliquam dignissim class ultricies auctor. Nisi eu fusce commodo purus
        consequat molestie amet. Rhoncus metus ultrices faucibus praesent ipsum
        potenti. Habitant tempus at vehicula porta mus turpis metus. Semper
        faucibus ex nullam commodo nullam ut massa sollicitudin hac. Hac duis
        velit; dapibus integer ridiculus posuere ad morbi hac. Neque vehicula
        massa morbi fames efficitur torquent. Vel justo vel ullamcorper metus
        ullamcorper augue sapien. Ultrices suscipit imperdiet facilisi aliquet
        nascetur, praesent laoreet torquent. Nostra ut sapien penatibus, porta
        ex penatibus. Magna luctus elit urna curae lacus risus consequat. Eu
        aenean tempus nisi aptent nostra curae conubia. Aliquam mi volutpat
        mattis pulvinar augue arcu. Facilisi platea feugiat velit sollicitudin
        venenatis malesuada, nascetur rutrum senectus. Conubia netus orci curae
        pulvinar morbi; bibendum dictumst molestie. Finibus dis tempor laoreet
        senectus metus. Aliquam ultricies massa eros torquent posuere nec
        vehicula. Turpis sociosqu enim ultricies et tellus elementum tristique.
        <CodeBlock filename="example.ts" language="typescript">
          {`
const foo = 42;
const bar = foo * 2;
console.log(bar);
        `.trim()}
        </CodeBlock>
        Dictum felis posuere vivamus cras mus
        <Aside id="2">
          Venenatis pellentesque posuere litora luctus torquent eu duis erat.
          Metus nisi congue pulvinar phasellus maximus fusce eleifend ridiculus.
        </Aside>
        . Quis curae
        <Aside id="3">
          Aliquam mi volutpat mattis pulvinar augue arcu.
        </Aside>{" "}
        efficitur condimentum metus semper quam. Metus lacinia nascetur nulla
        torquent varius natoque rutrum iaculis suspendisse. Mus arcu pretium hac
        efficitur habitant duis in. Tellus nunc finibus potenti consectetur mi
        facilisi ante. Aliquam ad parturient erat; at blandit auctor auctor.
        Consequat eget ultricies aenean aliquet, quisque quis. Leo mus magnis
        magna dignissim; potenti laoreet.
      </Section>
      <Section id="section-one" title="how do headings even work">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Volutpat velit
        pulvinar tempus nascetur dolor quis curabitur habitant. Lacus curae
        facilisi id erat sem venenatis proin maecenas. Orci fermentum
        pellentesque purus suscipit mauris ac massa. Nostra iaculis taciti
        nulla; vulputate lectus maecenas. Faucibus nisi ornare posuere pulvinar
        sollicitudin eros. Dui commodo feugiat massa mattis habitasse lectus sed
        et. Venenatis pellentesque posuere litora luctus torquent eu duis erat.
        Metus nisi congue pulvinar phasellus maximus fusce eleifend ridiculus.
        Duis congue nostra dapibus rutrum sociosqu sem aliquam arcu. Auctor arcu
        diam lacus non non. Donec parturient mus auctor pellentesque nisi justo
        eget quam diam. Integer justo aliquam dignissim class ultricies auctor.
        Nisi eu fusce commodo purus consequat molestie amet. Rhoncus metus
        ultrices faucibus praesent ipsum potenti. Habitant tempus at vehicula
        porta mus turpis metus. Semper faucibus ex nullam commodo nullam ut
        massa sollicitudin hac. Hac duis velit; dapibus integer ridiculus
        posuere ad morbi hac. Neque vehicula massa morbi fames efficitur
        torquent. Vel justo vel ullamcorper metus ullamcorper augue sapien.
        Ultrices suscipit imperdiet facilisi aliquet nascetur, praesent laoreet
        torquent. Nostra ut sapien penatibus, porta ex penatibus. Magna luctus
        elit urna curae lacus risus consequat. Eu aenean tempus nisi aptent
        nostra curae conubia. Aliquam mi volutpat mattis pulvinar augue arcu.
        Facilisi platea feugiat velit sollicitudin venenatis malesuada, nascetur
        rutrum senectus. Conubia netus orci curae pulvinar morbi; bibendum
        dictumst molestie. Finibus dis tempor laoreet senectus metus. Aliquam
        ultricies massa eros torquent posuere nec vehicula. Turpis sociosqu enim
        ultricies et tellus elementum tristique. Dictum felis posuere vivamus
        cras mus. Quis curae efficitur condimentum metus semper quam. Metus
        lacinia nascetur nulla torquent varius natoque rutrum iaculis
        suspendisse. Mus arcu pretium hac efficitur habitant duis in. Tellus
        nunc finibus potenti consectetur mi facilisi ante. Aliquam ad parturient
        erat; at blandit auctor auctor. Consequat eget ultricies aenean aliquet,
        quisque quis. Leo mus magnis magna dignissim; potenti laoreet.
      </Section>
      <Section
        id="section-two"
        title={
          <>
            thinking about some cool
            <Aside id="4">
              the aforementioned cool stuff is not actually that cool I just
              need to fill some footnotes out
            </Aside>{" "}
            stuff
          </>
        }
      >
        Lorem ipsum odor amet, consectetuer adipiscing elit. Volutpat velit
        pulvinar tempus nascetur dolor quis curabitur habitant. Lacus curae
        facilisi id erat sem venenatis proin maecenas. Orci fermentum
        pellentesque purus suscipit mauris ac massa. Nostra iaculis taciti
        nulla; vulputate lectus maecenas. Faucibus nisi ornare posuere pulvinar
        sollicitudin eros. Dui commodo feugiat massa mattis habitasse lectus sed
        et. Venenatis pellentesque posuere litora luctus torquent eu duis erat.
        Metus nisi congue pulvinar phasellus maximus fusce eleifend ridiculus.
        Duis congue nostra dapibus rutrum sociosqu sem aliquam arcu. Auctor arcu
        diam lacus non non. Donec parturient mus auctor pellentesque nisi justo
        eget quam diam. Integer justo aliquam dignissim class ultricies auctor.
        Nisi eu fusce commodo purus consequat molestie amet. Rhoncus metus
        ultrices faucibus praesent ipsum potenti. Habitant tempus at vehicula
        porta mus turpis metus. Semper faucibus ex nullam commodo nullam ut
        massa sollicitudin hac. Hac duis velit; dapibus integer ridiculus
        posuere ad morbi hac. Neque vehicula massa morbi fames efficitur
        torquent. Vel justo vel ullamcorper metus ullamcorper augue sapien.
        Ultrices suscipit imperdiet facilisi aliquet nascetur, praesent laoreet
        torquent. Nostra ut sapien penatibus, porta ex penatibus. Magna luctus
        elit urna curae lacus risus consequat. Eu aenean tempus nisi aptent
        nostra curae conubia. Aliquam mi volutpat mattis pulvinar augue arcu.
        Facilisi platea feugiat velit sollicitudin venenatis malesuada, nascetur
        rutrum senectus. Conubia netus orci curae pulvinar morbi; bibendum
        dictumst molestie. Finibus dis tempor laoreet senectus metus. Aliquam
        ultricies massa eros torquent posuere nec vehicula. Turpis sociosqu enim
        ultricies et tellus elementum tristique. Dictum felis posuere vivamus
        cras mus. Quis curae efficitur condimentum metus semper quam. Metus
        lacinia nascetur nulla torquent varius natoque rutrum iaculis
        suspendisse. Mus arcu pretium hac efficitur habitant duis in. Tellus
        nunc finibus potenti consectetur mi facilisi ante. Aliquam ad parturient
        erat; at blandit auctor auctor. Consequat eget ultricies aenean aliquet,
        quisque quis. Leo mus magnis magna dignissim; potenti laoreet.
      </Section>
    </Article>
  );
}
