/* eslint-disable @stylistic/max-len */
import { Page } from 'corract'
import { Text, Link } from 'src/components'
import { Header } from 'src/pages/docs/_components'
import { colors } from 'src/styles'

const Docs: Page<'/docs', AppPages> = (props) => {
  return (
    <>
      <Header>
        What is Corract?
      </Header>
      <Text tag={'h2'} color={'gold.soft'} className={'font-bold text-xl'}>
        The Corr<s>e</s>ct way to build <s>React</s> Preact apps, of course!
      </Text>
      <Text tag={'p'} color={'black.soft'} className={'text-lg'}>
        Corract is a super-opinionated, config focused, <Link href={'https://preactjs.com/guide/v10/getting-started'} color={'black.hard'}>Preact</Link> framework that makes server-side rendering (SSR) simple and low-effort. Designed for developers who want to write code as if they’re building a traditional single-page app (SPA), Corract handles routing, layouts, and server/client data syncing through a strict, configuration-driven system. No server components neccesary, just client components that work seamlessly with server-side rendering. <i>A clear separation between front end and back end you say?!</i>
      </Text>
      <Text tag={'p'} color={'green.hard'}>
        <i className={colors['text']['purple.soft']}>Corract doesn't aim to give you more flexibility—it intentionally gives you less.</i> By taking control of your app’s structure and behavior through a <Link href={'/docs/app/def'} color={'green.hard'}>central config</Link>, Corract eliminates architectural guesswork, file / directory organization problems, and general codebase decision fatigue. You focus on your components and data; Corract handles the rest.
      </Text>
      <Text tag={'p'} color={'black.faint'} className={'text-2xl font-black text-center'}>
        <span className={colors['text']['gold.soft']}>User</span> {'>'} <span className={colors['text']['green.soft']}>Developer</span> {'>'} <span className={colors['text']['purple.soft']}>Framework</span>
      </Text>
      <Text tag={'p'} color={'black.soft'}>
        <span className={colors['text']['purple.soft']}>Using the most familiar third party libraries like <Link href={'/docs/third-party/preact'} color={'purple.hard'}>Preact</Link>, <Link href={''} color={'purple.hard'}>Express</Link>, <Link href={''} color={'purple.hard'}>Vite</Link>, and <Link href={'/docs/third-party/tailwindcss'} color={'purple.hard'}>Tailwind CSS</Link>, Corract provides a robust foundation for building modern web applications without the complexity of some other frameworks.</span> 👀 <span className={colors['text']['gold.hard']}>If you’re looking for a framework that prioritizes simplicity and developer experience, Corract is the right choice. It’s not just about building apps; it’s about building them the right way—with less hassle and more focus on what matters. The end user.</span>
      </Text>
      <div className={'mx-1 md:mx-4 lg:mx-8 bg-gray-300 dark:bg-gray-800 rounded-lg'}>
        <Text tag={'h2'} color={'black.soft'} className={'font-bold text-2xl p-4'}>
          Key Ideas
        </Text>
        <Text tag={'p'} color={'black.soft'} className={'text-sm pb-4 px-4'}>
          🧠 <span className={colors['text']['green.soft']}>“Just build the SPA” mentality</span> – Write your app like a client-rendered SPA. Corract handles SSR and routing under the hood.
          <br/><br/>
          🗺 <span className={colors['text']['purple.soft']}>Config = Everything</span> – Your config defines your routes, page structure, layouts, and server-side middleware behavior.
          <br/><br/>
          🏗 <span className={colors['text']['gold.soft']}>Auto-generated file structure</span> – Corract generates exact file locations like src/pages/home/john/poo/index.tsx for the route /home/john/poo. You can drop in any extra files, but Corract only cares about index.tsx at each route.
          <br/><br/>
          🧩 <span className={colors['text']['green.soft']}>Layout and middleware control per route</span> – Each route can declare which layout wraps it and what server-side logic runs.
          <br/><br/>
          🔁 <span className={colors['text']['purple.soft']}>SSR without hydration mismatch</span> – Corract guarantees that the HTML rendered on the server matches what the client expects, so no hydration surprises. The client simply takes over.
          <br/><br/>
          🛣 <span className={colors['text']['gold.soft']}>Client-side routing triggers backend middleware</span> – When navigating on the client, Corract still fetches the route’s server middleware data to keep things in sync.
        </Text>
      </div>
      <Text tag={'p'} color={'gold.faint'} className={'text-sm'}>
        NOTE: <i>Corract is still in early development, so expect some rough edges and missing features. But it’s already a solid foundation for building Preact apps with SSR.</i>
      </Text>
    </>
  )
}

export default Docs
